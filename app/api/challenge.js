(function(module, process) {
    'use strict';
    var bcrypt = require('bcrypt-nodejs'),
        emailer = require('nodemailer'),
        Random = require('random-js'),
        validator = require('validator');

    var CHA_STATUS_CREATED = "created",
        CHA_STATUS_IN_PROGRESS = "inProgress",
        CHA_STATUS_FINISHED = "finished";

    var CHA_TYPE_DISTANCE = "distance",
        CHA_TYPE_TIME = "time",
        CHA_TYPE_DISTANCE_TIME = "distanceTime";

    module.exports.create = function createChallenge(models, httpStatus, statusMessage, Q) {
        return function createChallenge(req, res) {

            var runner = req.user;
            var Challenge = models.challenge();

            var defer = Q.defer();

            defer.promise.then(function createdChallengeSuccessfull(result) {
                    if (result) {
                        res.status(httpStatus.CREATED).json({ challengeId: result._id });
                    }
                },
                function createdChallengeFailed(result) {
                    if (result) { res.status(result).send(); }
                });


            Challenge.findOne({
                $and: [
                    { owner: runner.runnerId }, {
                        $or: [
                            { status: CHA_STATUS_CREATED },
                            { status: CHA_STATUS_IN_PROGRESS }
                        ]
                    }
                ]
            }, function createdChallengeIfPossible(err, challenge) {
                if (err) {
                    defer.reject(httpStatus.METHOD_FAILURE);
                } else {
                    if (challenge) {
                        res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.CHALLENGE_MAX_LIMIT_REACHED) });
                        defer.reject();
                    } else {
                        var reqBody = JSON.parse(JSON.stringify(req.body));

                        switch (true) {
                            case !reqBody:
                                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.CHALLENGE_ALL_PARAMS_MISSING) });
                                defer.reject();
                                return;
                            case !reqBody.hasOwnProperty('initDate'):
                                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.CHALLENGE_INIT_DATE_MISSING) });
                                defer.reject();
                                return;

                            case !reqBody.hasOwnProperty('finishDate'):
                                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.CHALLENGE_FINISH_DATE_MISSING) });
                                defer.reject();
                                return;

                            case !reqBody.hasOwnProperty('information'):
                                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.CHALLENGE_INFORMATION_MISSING) });
                                defer.reject();
                                return;
                        }


                        var newChallenge;

                        reqBody.initDate = reqBody.initDate * 1000; //for timestamp conversion
                        reqBody.finishDate = reqBody.finishDate * 1000;

                        var challengeInformation;

                        switch (true) {
                            case reqBody.information.hasOwnProperty('distance') && reqBody.information.hasOwnProperty('time'):
                                challengeInformation = {
                                    'type': CHA_TYPE_DISTANCE_TIME,
                                    'distance': reqBody.information.distance,
                                    'time': reqBody.information.time
                                };
                                break;
                            case reqBody.information.hasOwnProperty('distance'):
                                challengeInformation = {
                                    'type': CHA_TYPE_DISTANCE_TIME,
                                    'distance': reqBody.information.distance
                                };
                                break;
                            case reqBody.information.hasOwnProperty('time'):
                                challengeInformation = {
                                    'type': CHA_TYPE_DISTANCE_TIME,
                                    'time': reqBody.information.time
                                };
                                break;
                            default:
                                challengeInformation = {
                                    'type': CHA_TYPE_DISTANCE_TIME,
                                    'distance': app.get('challengeDefaultDistance')
                                };
                                break;
                        }

                        var challengeObj = {
                            status: CHA_STATUS_CREATED,
                            owner: runner.runnerId,
                            initDate: reqBody.initDate,
                            finishDate: reqBody.finishDate,
                            information: challengeInformation
                        };

                        newChallenge = new Challenge(challengeObj);

                        newChallenge.save(function saveChallenge(err, challenge) {
                            if (err) {
                                defer.reject(httpStatus.METHOD_FAILURE);
                            } else {
                                defer.resolve(challenge);
                            }
                        });
                    }
                }
            });
        }
    };

    module.exports.getChallengeInformation = function getChallengeInformation(models, httpStatus, statusMessage, Q) {
        return function getChallengeInformation(req, res) {

            var runner = req.user;
            var Challenge = models.challenge();

            var defer = Q.defer();

            defer.promise.then(function createdChallengeSuccessfull(result) {
                    if (result) {
                        var object = JSON.parse(JSON.stringify(result));
                        delete object.__v;
                        res.status(httpStatus.OK).json(object);
                    }
                },
                function createdChallengeFailed(result) {
                    if (result) { res.status(result).send(); }
                });

            if (req.params.hasOwnProperty('challengeId')) {
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.CHALLENGE_ID_MISSING) });
                defer.reject();
                return;
            }

            Challenge.findOne({ _id: req.params.challengeId },
                function createdChallengeIfPossible(err, challenge) {
                    if (err) {
                        defer.reject(httpStatus.METHOD_FAILURE);
                    } else {
                        if (challenge) {
                            defer.resolve(challege);
                        } else {
                            res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.CHALLENGE_NOT_FOUND) });
                            defer.reject();
                            return;
                        }
                    }
                });
        }
    };
})(module, process);
