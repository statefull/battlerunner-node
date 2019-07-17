(function(module, process) {
    'use strict';
    var bcrypt = require('bcrypt-nodejs'),
        emailer = require('nodemailer'),
        Random = require('random-js'),
        validator = require('validator');

    var SES_STATUS_INITIATED = "initiated",
        SES_STATUS_PAUSED = "paused",
        SES_STATUS_FINISHED = "finished";

    module.exports.SES_STATUS_INITIATED = SES_STATUS_INITIATED;
    module.exports.SES_STATUS_PAUSED = SES_STATUS_PAUSED;
    module.exports.SES_STATUS_FINISHED = SES_STATUS_FINISHED;

    module.exports.create = function createSession(models, httpStatus, statusMessage, Q) {
        return function sessionCreation(req, res) {

            var runner = req.user;
            var Session = models.session();
            var Challenge = models.challenge();

            var defer = Q.defer();

            defer.promise.then(function sessionCreatedSuccessfull(result) {
                    if (result) {
                        res.status(httpStatus.CREATED).json({ sessionId: result._id });
                    }
                },
                function sessionFailed(result) {
                    if (result) { res.status(result).send(); }
                });


            Session.findOne({
                $and: [
                    { runner: runner.runnerId }, {
                        $or: [
                            { status: SES_STATUS_INITIATED },
                            { status: SES_STATUS_PAUSED }
                        ]
                    }
                ]
            }, function createSessionIfPossible(err, session) {
                if (err) {
                    defer.reject(httpStatus.METHOD_FAILURE);
                } else {
                    if (session) {
                        res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.SESSION_ALREADY_INITIATED) });
                        defer.reject();
                    } else {

                        var reqBody = JSON.parse(JSON.stringify(req.body));

                        switch (true) {
                            case !reqBody:
                                res.status(httpStatus.BAD_REQUEST).send();
                                return defer.reject();
                            case !reqBody.hasOwnProperty('city'):
                                res.status(httpStatus.BAD_REQUEST).send();
                                return defer.reject();
                        }

                        var newSession;

                        var sessionObj = {
                            city: reqBody.city,
                            status: SES_STATUS_INITIATED,
                            runner: runner.runnerId
                        };

                        if (reqBody.date) { sessionObj.date = reqBody.date * 1000; } else { sessionObj.date = new Date().getTime(); }

                        if (reqBody.challengeId) {
                            var today = new Date();
                            Challenge.findOne({
                                $and: [{
                                    "_id": reqBody.challengeId,
                                    "initDate": { $gte: today },
                                    "finishDate": { lte: today }
                                }]
                            }, function checkIfChallengeIsValid(err, challenge) {
                                if (err) {
                                    defer.reject(httpStatus.METHOD_FAILURE);
                                    return;
                                } else if (challenge) {
                                    sessionObj.isChallenge = true;
                                    sessionObj.challengeId = reqBody.challengeId;
                                } else {
                                    res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.CHALLENGE_NOT_FOUND) });
                                    defer.reject();
                                    return;
                                }
                            });
                        }

                        newSession = new Session(sessionObj);

                        newSession.save(function saveSession(err, session) {
                            if (err) {
                                defer.reject(httpStatus.METHOD_FAILURE);
                            } else {
                                defer.resolve(session);
                            }
                        });
                    }
                }
            });
        }
    };

    module.exports.tracking = function addtrackingPoint(models, httpStatus, statusMessage, Q) {
        return function trackPoint(req, res) {

            var runner = req.user;
            var Session = models.session();
            var Runner = models.runner();

            var reqBody = JSON.parse(JSON.stringify(req.body));

            var deferUpdateSessionTracking = Q.defer();
            var deferUpdateRunnerPos = Q.defer();

            switch (true) {
                case !reqBody:
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('sessionId'):
                    return res.status(httpStatus.BAD_REQUEST).send();
            }

            Session.update({
                $and: [
                    { runner: runner.runnerId },
                    { _id: reqBody.sessionId },
                    { status: SES_STATUS_INITIATED }
                ]
            }, {
                $push: { tracking: { $each: reqBody.position } }
            }, function trackingPointAdded(err, session) {

                if (err || session.ok == 0) { deferUpdateSessionTracking.reject(httpStatus.METHOD_FAILURE) } else if (session.ok == 1 && session.n == 0) {
                    deferUpdateSessionTracking.reject(httpStatus.NOT_MODIFIED);
                } else {
                    deferUpdateSessionTracking.resolve(httpStatus.CREATED);
                }

            });

            deferUpdateSessionTracking.promise.then(function trackingPointAddedCorrectly(result) {
                deferUpdateRunnerPos.resolve(result);
            }, function trackingError(result) {
                deferUpdateRunnerPos.reject(result);
            });

            deferUpdateRunnerPos.promise.then(function updateRunnerPosition(result) {
                Runner.update({ _id: runner.runnerId }, {
                    $set: { loc: [reqBody.position[reqBody.position.length - 1].long, reqBody.position[reqBody.position.length - 1].lat] }
                }, function updateRunnerPosition(err, runner) {
                    if (err || runner.ok == 0) { // runner.ok == 0 indicates that the consult was not executed properly
                        res.status(httpStatus.NOT_MODIFIED).json({ error: statusMessage.getStatusText(statusMessage.RUNNER_POSITION_NOT_UPDATED) });
                    } else {
                        res.status(result).send();
                    }
                });

            }, function updateRunnerPositionAborted(result) {
                res.status(result).json({ error: statusMessage.getStatusText(statusMessage.RUNNER_SESSION_NOT_VALID) });
            });
        }
    };

    module.exports.offlineSessionCreation = function createOfflineSession(models, httpStatus, statusMessage, Q) {
        return function addOfflineSession(req, res) {

            var content = req.body;
            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody:
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('city'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('status'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('runner'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('tracking'):
                    return res.status(httpStatus.BAD_REQUEST).send();
            }

            var Session = models.session();
            var offlineSession = new Session(content);

            var defer = Q.defer();

            defer.promise.then(function offlineSessionCreatedSuccessfull(result) {
                    if (result) {
                        res.status(httpStatus.CREATED).json({ sessionId: result._id });
                    }
                },
                function offlineSessionCreationFailed(result) {
                    if (result) { res.status(result).send(); }
                }
            );

            offlineSession.save(function saveOfflineSession(err, offlineSession) {
                if (err) {
                    defer.reject(httpStatus.METHOD_FAILURE);
                } else {
                    defer.resolve(offlineSession);
                }
            });
        }
    };

    module.exports.finishSession = function finishSession(models, httpStatus, statusMessage, Q) {
        return function finishSession(req, res) {

            var content = req.body;
            var runner = req.user;
            var reqBody = JSON.parse(JSON.stringify(req.body));


            switch (true) {
                case !reqBody:
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('sessionId'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('information'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.information.hasOwnProperty('maxSpeed'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.information.hasOwnProperty('km'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.information.hasOwnProperty('averageSpeed'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.information.hasOwnProperty('timePerKm'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.information.hasOwnProperty('timeFastestKm'):
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.information.hasOwnProperty('totalTime'):
                    return res.status(httpStatus.BAD_REQUEST).send();
            }

            var Runner = models.runner();

            Runner.update({ _id: runner.runnerId }, {
                $set: { loc: [0, 0] }
            }, function resetRunnerPosition(err, runner) {
                if (err || runner.ok == 0) { // runner.ok == 0 indicates that the consult was not executed properly
                    res.status(httpStatus.METHOD_FAILURE).json({ error: statusMessage.getStatusText(statusMessage.SESSION_NOT_FINISHED) });
                    return; //abort due to we can not reset the user position, so session can not be finished
                }
            });

            var Session = models.session();

            Session.update({
                $and: [
                    { runner: runner.runnerId },
                    { _id: reqBody.sessionId },

                    {
                        $or: [
                            { status: SES_STATUS_INITIATED },
                            { status: SES_STATUS_PAUSED }
                        ]
                    }
                ]
            }, {
                $set: {
                    status: SES_STATUS_FINISHED,
                    information: reqBody.information
                }
            }, function finishSessionCheck(err, session) {
                if (err || !session || session.ok == 0) {
                    res.status(httpStatus.METHOD_FAILURE).json({ error: statusMessage.getStatusText(statusMessage.SESSION_NOT_FINISHED) });
                } else if (session.ok == 1 && session.n == 0) {
                    res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.SESSION_ALREADY_FINISHED) });
                } else {
                    res.status(httpStatus.ACCEPTED).send();
                }
            });
        }
    };

    module.exports.pauseSession = function pauseSession(models, httpStatus, statusMessage, Q) {
        return function pauseSession(req, res) {

            var content = req.body;
            var runner = req.user;
            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody:
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('sessionId'):
                    return res.status(httpStatus.BAD_REQUEST).send();
            }

            var Runner = models.runner();

            Runner.update({ _id: runner.runnerId }, {
                $set: { loc: [0, 0] }
            }, function resetRunnerPosition(err, runner) {
                if (err || runner.ok == 0) { // runner.ok == 0 indicates that the consult was not executed properly
                    res.status(httpStatus.METHOD_FAILURE).json({ error: statusMessage.getStatusText(statusMessage.SESSION_NOT_PAUSED) });
                    return; //abort due to we can not reset the user position, so session can not be paused
                }
            });

            var Session = models.session();

            Session.update({
                $and: [
                    { runner: runner.runnerId },
                    { _id: reqBody.sessionId },
                    { status: SES_STATUS_INITIATED }
                ]
            }, {
                $set: { status: SES_STATUS_PAUSED }
            }, function pauseSessionCheck(err, session) {
                if (err || !session || session.ok == 0) {
                    res.status(httpStatus.METHOD_FAILURE).json({ error: statusMessage.getStatusText(statusMessage.SESSION_NOT_PAUSED) });
                } else if (session.ok == 1 && session.n == 0) {
                    res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.SESSION_ALREADY_PAUSED) });
                } else {
                    res.status(httpStatus.ACCEPTED).send();
                }
            });
        }
    };

    module.exports.restartSession = function restartSession(models, httpStatus, statusMessage, Q) {
        return function restartSession(req, res) {

            var content = req.body;
            var runner = req.user;
            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody:
                    return res.status(httpStatus.BAD_REQUEST).send();
                case !reqBody.hasOwnProperty('sessionId'):
                    return res.status(httpStatus.BAD_REQUEST).send();
            }

            var Session = models.session();

            Session.update({
                $and: [
                    { runner: runner.runnerId },
                    { _id: reqBody.sessionId },
                    { status: SES_STATUS_PAUSED }
                ]
            }, {
                $set: { status: SES_STATUS_INITIATED }
            }, function restartSessionCheck(err, session) {
                if (err || !session || session.ok == 0) {
                    res.status(httpStatus.METHOD_FAILURE).json({ error: statusMessage.getStatusText(statusMessage.SESSION_NOT_INITIATED) });
                } else if (session.ok == 1 && session.n == 0) {
                    res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.SESSION_ALREADY_INITIATED) });
                } else {
                    res.status(httpStatus.ACCEPTED).send();
                }
            });
        }
    };

})(module, process);
