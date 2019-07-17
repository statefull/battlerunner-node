(function(module, logger) {
    'use strict';

    var httpStatus = require('http-status-codes'),
        Q = require('q'),
        expressJwt = require('express-jwt'),
        JWT = require('jsonwebtoken'),
        CRYPTO = require('crypto'),
        statusMessage = require('../config/statusMessages'),
        runner = require('./api/runner'),
        session = require('./api/session'),
        challenge = require('./api/challenge'),
        endpoint = require('../config/endpoints.json').endpoint,
        domain = require('../config/endpoints.json').domain,
        endpointFormed = require('../config/endpoints.json').endpointFormed;


    module.exports.load = function loadRoutes(models, app) {

        app.use('/api/:versionId', function checkAPIVersion(req, res, next) {
            if (req.params.versionId != "v1") {
                return res.status(httpStatus.BAD_REQUEST).json({ error: httpStatus.getStatusText(httpStatus.BAD_REQUEST) });
            } else {
                if (next) { next(); }
            }
        });

        //these routes will not be protected by JWT

        app.put(endpoint.RUNNER_REGISTER, runner.register(models, httpStatus, statusMessage, Q, app));
        app.post(endpoint.RUNNER_LOGIN, runner.login(models, httpStatus, statusMessage, Q, JWT, app));
        app.post(endpoint.RUNNER_DEVICE_LOGIN, runner.runnerLoginWithDevice(models, httpStatus, statusMessage, Q, JWT, app));
        app.post(endpoint.RUNNER_RECOVER_PASSWORD, runner.runnerRecoverPassword(models, httpStatus, statusMessage, Q, app, endpointFormed, domain, CRYPTO));
        app.get(endpoint.RUNNER_RECOVER_GENERATE_NEW_PASSWORD, runner.runnerRecoverPasswordCheck(models, httpStatus, statusMessage, Q, app));

        //these routes will be protected by JWT

        app.use('/api/:versionId/secure', expressJwt({
            secret: app.get('jwtSecret'),
            getToken: function lookForTheToken(req) {
                //token will be searched in these locations
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    return req.headers.authorization.split(' ')[1];
                } else if (req.query && req.query.token) {
                    return req.query.token;
                } else if (req.body && req.body.token) {
                    return req.body.token;
                } else if (req.headers['x-access-token']) {
                    return req.headers['x-access-token'];
                }

                return null;
            }
        }));

        //Here the errors provided by checking the token will be managed.
        app.use(function jwtError(err, req, res, next) {
            if (err) {
                return res.status(httpStatus.UNAUTHORIZED).json({ error: statusMessage.getStatusText(statusMessage.TOKEN_NOT_VALID) });
            } else {
                //here the token is successfully checked
                if (next) { next(); }
            }
        });

        //check the request hash for all secured request


        // app.use('/api/:versionId/secure/', function checkReqHash(req, res, next) {

        //     if (req.method === 'GET' && Object.keys(req.body).length === 0 && JSON.stringify(req.body) === JSON.stringify({})) {
        //         if (next) {
        //             next();
        //             return;
        //         }
        //     }

        //     var reqHash = req.headers['x-hash-req'];
        //     //to obtain the key for the hash created in the login phase
        //     var tokenData = req.user;

        //     if (!reqHash) {
        //         return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.INTEGRITY_PARAM_NOT_FOUND) });
        //     }

        //     var dataHashed = CRYPTO.createHmac('sha256', tokenData.hashKey).update(JSON.stringify(req.body)).digest('base64');

        //     if (dataHashed !== reqHash) {
        //         return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.INTEGRITY_PARAM_NOT_VALID) });
        //     } else {
        //         if (next) next();
        //     }
        // });

        //session
        app.put(endpoint.SESSION_CREATE, session.create(models, httpStatus, statusMessage, Q));
        app.post(endpoint.SESSION_TRACKING, session.tracking(models, httpStatus, statusMessage, Q));
        app.put(endpoint.SESSION_OFFLINE_CREATE, session.offlineSessionCreation(models, httpStatus, statusMessage, Q));
        app.post(endpoint.SESSION_FINISH, session.finishSession(models, httpStatus, statusMessage, Q));
        app.post(endpoint.SESSION_PAUSE, session.pauseSession(models, httpStatus, statusMessage, Q));
        app.post(endpoint.SESSION_RESTART, session.restartSession(models, httpStatus, statusMessage, Q));
        //runner
        app.post(endpoint.RUNNER_FRIEND_INFORMATION, runner.getFriendRunnerInformation(models, httpStatus, statusMessage, Q, app));
        app.put(endpoint.RUNNER_REGISTER_COMPLETION, runner.completeRegisterData(models, httpStatus, statusMessage, Q, app));
        app.put(endpoint.RUNNER_DEVICE_ASSOCIATION, runner.runnerDeviceAssociation(models, httpStatus, statusMessage, Q, app));

        //here support both get or post (post for the token provided via body)
        app.get(endpoint.RUNNER_OWN_INFORMATION, runner.getRunnerItselfInformation(models, httpStatus, statusMessage, Q, app));
        app.post(endpoint.RUNNER_OWN_INFORMATION, runner.getRunnerItselfInformation(models, httpStatus, statusMessage, Q, app));
        app.post(endpoint.RUNNER_UPDATE_INFORMATION, runner.updateRunnerInformation(models, httpStatus, statusMessage, Q, app));
        app.post(endpoint.RUNNER_UPDATE_PASSWORD, runner.updateRunnerPassword(models, httpStatus, statusMessage, Q, app));
        //return the people in an certain range based on the last position of the runner
        app.get(endpoint.RUNNER_PEOPLE_IN_AREA, runner.getRunnersInARangeArea(models, session, httpStatus, statusMessage, Q, app));
        //challenges
        app.put(endpoint.CHALLENGE_CREATE, challenge.create(models, httpStatus, statusMessage, Q, app));
    };
})(module, console);
