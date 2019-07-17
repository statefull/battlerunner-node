(function(module, process) {
    'use strict';
    var bcrypt = require('bcrypt-nodejs'),
        emailer = require('nodemailer'),
        Random = require('random-js'),
        validator = require('validator'),
        email = require('./utils/emailSender'),
        passwordGenerator = require('password-generator');



    function validateRegisterParams(reqBody, res, app, httpStatus, statusMessage) {

        var result = false;

        switch (true) {
            case !reqBody.hasOwnProperty('email'):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_MISSING) });
                break;
            case !reqBody.hasOwnProperty('password'):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.PASSWORD_MISSING) });
                break;
            case reqBody.password.length < app.get('userPasswordLength'):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.PASSWORD_LENGTH_ERROR) });
                break;
            case !validator.isEmail(reqBody.email):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_NOT_VALID) });
                break;
            case !reqBody.hasOwnProperty('nickname'):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.NICKNAME_MISSING) });
                break;
            case reqBody.nickname.length < app.get('userNicknameMinLength') || reqBody.nickname.length > app.get('userNicknameMaxLength'):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.NICKNAME_LENGTH_ERROR) });
                break;
            default:
                result = true; //all the checks were successfully
                break;
        }

        return result;
    }


    module.exports.register = function register(models, httpStatus, statusMessage, Q, app) {
        return function runnerRegister(req, res) {

            var Runner = models.runner();

            var reqBody = JSON.parse(JSON.stringify(req.body));

            //check if the params are valid
            if (!validateRegisterParams(reqBody, res, app, httpStatus, statusMessage)) {
                return;
            }

            var defer = Q.defer();

            defer.promise.then(function registerSuccesfull(result) {

                var emailPromise = email.sendWelcomeEmail(result.email);

                emailPromise.promise.then(function emailRecoverPasswordSent() {
                    res.status(httpStatus.CREATED).send();
                }, function emailRecoverPasswordFail() {
                    // TODO send a custom error if the registration email fails
                    res.status(httpStatus.METHOD_FAILURE).send();
                });

                //TODO send an email
            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            var securePassword = bcrypt.hashSync(reqBody.password, bcrypt.genSaltSync(app.get('passwordSecurity')));

            var newRunner = new Runner({
                email: reqBody.email,
                password: securePassword,
                nickname: reqBody.nickname
            });

            newRunner.save(function savingRunnerInDatabase(err, runner) {
                if (err) {
                    var dupKey = err.errmsg.split('key: { : "')[1].split('" }')[0];
                    if (validator.isEmail(dupKey)) {
                        res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_ALREADY_EXISTS) });
                    } else if (dupKey.length != 0) {
                        res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.NICKNAME_ALREADY_EXISTS) });
                    } else {
                        defer.reject();
                    }

                } else {
                    defer.resolve(runner);
                }
            });
        }
    };

    module.exports.completeRegisterData = function completeRegisterData(models, httpStatus, statusMessage, Q, app) {
        return function runnerUpdateRegisterData(req, res) {

            var Runner = models.runner();
            var runner = req.user;

            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody.hasOwnProperty('age'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.AGE_MISSING) });
                    break;
                case !reqBody.hasOwnProperty('sex'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.SEX_MISSING) });
                    break;
                case !reqBody.hasOwnProperty('weight'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.WEIGHT_MISSING) });
                    break;
                case !reqBody.hasOwnProperty('height'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.HEIGHT_MISSING) });
                    break;
                default:
                    break;
            }

            var defer = Q.defer();

            defer.promise.then(function runnerUpdateRegisterDataSuccessfull(result) {
                res.status(httpStatus.CREATED).send();
            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            Runner.update({ _id: runner.runnerId }, {
                $set: {
                    age: reqBody.age,
                    sex: reqBody.sex,
                    weight: reqBody.weight,
                    height: reqBody.height,
                    registerComplete: true
                }
            }, function updateRunnerCompleteRegisterDataCheck(err, runner) {
                if (err) {
                    defer.reject(httpStatus.METHOD_FAILURE);
                } else if (runner.ok == 0) {
                    defer.reject(httpStatus.NOT_MODIFIED);
                } else {
                    defer.resolve();
                }
            });
        }
    };

    function validateLoginParams(reqBody, res, app, httpStatus, statusMessage) {

        var result = false;

        switch (true) {
            case !reqBody.hasOwnProperty('loginId'):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_MISSING) });
                break;
            case !reqBody.hasOwnProperty('password'):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.PASSWORD_MISSING) });
                break;
            case reqBody.password.length < app.get('userPasswordLength'):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.PASSWORD_LENGTH_ERROR) });
                break;
            case (!validator.isEmail(reqBody.loginId) && (reqBody.loginId.length < app.get('userNicknameMinLength') || reqBody.loginId.length > app.get('userNicknameMaxLength'))):
                res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_NOT_VALID) });
                break;
            default:
                result = true; //all the checks were successfully
                break;
        }

        return result;
    }

    module.exports.login = function login(models, httpStatus, statusMessage, Q, JWT, app) {
        return function runnerLogin(req, res) {

            var Runner = models.runner();
            var reqBody = JSON.parse(JSON.stringify(req.body));

            //check if the params are valid
            if (!validateLoginParams(reqBody, res, app, httpStatus, statusMessage)) {
                return;
            }

            var defer = Q.defer();

            defer.promise.then(function checkLogin(result) {
                var securePassword = result.password;

                if (!bcrypt.compareSync(reqBody.password, securePassword)) {
                    return res.status(httpStatus.UNAUTHORIZED).json({ error: httpStatus.getStatusText(httpStatus.UNAUTHORIZED) });
                }

                var random = new Random(Random.engines.mt19937().autoSeed());
                var randomValue = random.integer(app.get('hashRandomMinValue'), app.get('hashRandomMaxValue'));
                var hashKey = result.email + randomValue;

                var authToken = JWT.sign({ email: result.email, hashKey: hashKey, runnerId: result._id }, app.get('jwtSecret'), { expiresIn: app.get('jwtExpiresIn') });

                Runner.update({ _id: result._id }, { $set: { lastDate: new Date() } }, function updateLastUserEntry(err, runner) {
                    //TODO add log
                });

                res.status(httpStatus.OK).json({ 'token': authToken, 'random': randomValue, 'email': result.email, 'nickname': result.nickname, 'completion': result.registerComplete, "runnerId": result._id });

            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            Runner.findOne({
                    $or: [
                        { 'email': reqBody.loginId.toLowerCase() },
                        { 'nickname': reqBody.loginId.toLowerCase() }
                    ]
                },
                function checkLogin(err, runner) {
                    if (err) {
                        defer.reject(httpStatus.METHOD_FAILURE);
                    } else {
                        if (!runner) {
                            res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.USER_NOT_FOUND) });
                            defer.reject();
                        } else {
                            //email.sendWelcomeEmail("asniaire@gmail.com");
                            defer.resolve(runner);
                        }
                    }
                });
        }
    }

    module.exports.getFriendRunnerInformation = function friendRunnerInformation(models, httpStatus, statusMessage, Q, app) {
        return function getFriendRunnerInformation(req, res) {

            var Runner = models.runner();
            var reqBody = JSON.parse(JSON.stringify(req.body));
            var runner = req.user;

            //check if the params are valid
            switch (true) {
                case !reqBody.hasOwnProperty('friend'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.LOGIN_ID_MISSING) });
                    break;
                case (!validator.isEmail(reqBody.friend) && (reqBody.friend.length > app.get('userNicknameMaxLength')) && !(models.isObjectIdValid(reqBody.friend))):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.LOGIN_ID_NOT_VALID) });
                    break;
                case (!validator.isEmail(reqBody.friend) && (reqBody.friend.length < app.get('userNicknameMinLength') || reqBody.friend.length > app.get('userNicknameMaxLength'))):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.LOGIN_ID_NOT_VALID) });
                    break;
                default:
                    break;
            }

            var defer = Q.defer();

            defer.promise.then(function sendFriendRunnerInformation(result) {

                var object = JSON.parse(JSON.stringify(result));
                delete object.password;
                delete object.socialToken;
                delete object.__v;

                res.status(httpStatus.OK).json(object);

            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            Runner.findOne({
                    $and: [{
                        $or: [
                            { '_id': models.isObjectIdValid(reqBody.friend) ? models.ObjectId(reqBody.friend) : models.ObjectId('000000000000') },
                            { 'email': reqBody.friend.toLowerCase() },
                            { 'nickname': reqBody.friend.toLowerCase() }
                        ]
                    }, {

                    }]
                },
                function checkIfFriendRunnerInformationIsAvailable(err, runner) {
                    if (err) {
                        defer.reject(httpStatus.METHOD_FAILURE);
                    } else {
                        if (!runner) {
                            res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.USER_NOT_FOUND) });
                            defer.reject();
                        } else {
                            defer.resolve(runner);
                        }
                    }
                }
            );
        }
    }

    module.exports.getRunnerItselfInformation = function getRunnerItselfInformation(models, httpStatus, statusMessage, Q, app) {
        return function getRunnerItselfInformation(req, res) {

            var Runner = models.runner();
            var reqBody = JSON.parse(JSON.stringify(req.body));
            var runner = req.user;

            var defer = Q.defer();

            defer.promise.then(function sendFriendRunnerInformation(result) {

                var object = JSON.parse(JSON.stringify(result));
                delete object.password;
                delete object.socialToken;
                delete object.__v;

                res.status(httpStatus.OK).json(object);

            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            Runner.findOne({ '_id': runner.runnerId },
                function checkIfRunnerItselfInformationIsAvailable(err, runner) {
                    if (err) {
                        defer.reject(httpStatus.METHOD_FAILURE);
                    } else {
                        if (!runner) {
                            res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.USER_NOT_FOUND) });
                            defer.reject();
                        } else {
                            defer.resolve(runner);
                        }
                    }
                }
            );
        }
    }

    module.exports.updateRunnerInformation = function updateRunnerInformation(models, httpStatus, statusMessage, Q, app) {
        return function updateRunnerInformation(req, res) {

            var Runner = models.runner();
            var runner = req.user;

            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody.hasOwnProperty('age'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.AGE_MISSING) });
                    break;
                case !reqBody.hasOwnProperty('sex'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.SEX_MISSING) });
                    break;
                case !reqBody.hasOwnProperty('weight'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.WEIGHT_MISSING) });
                    break;
                case !reqBody.hasOwnProperty('height'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.HEIGHT_MISSING) });
                    break;
                case !reqBody.hasOwnProperty('email'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_MISSING) });
                    break;
                case !validator.isEmail(reqBody.email):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_NOT_VALID) });
                    break;
                case !reqBody.hasOwnProperty('nickname'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.NICKNAME_MISSING) });
                    break;
                case reqBody.nickname.length < app.get('userNicknameMinLength') || reqBody.nickname.length > app.get('userNicknameMaxLength'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.NICKNAME_LENGTH_ERROR) });
                    break;
                default:
                    break;
            }

            var defer = Q.defer();

            defer.promise.then(function runnerUpdateInformationSuccessfull(result) {
                res.status(httpStatus.CREATED).send();
            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            Runner.update({ _id: runner.runnerId }, {
                $set: {
                    age: reqBody.age,
                    sex: reqBody.sex,
                    weight: reqBody.weight,
                    height: reqBody.height,
                    email: reqBody.email,
                    nickname: reqBody.nickname
                }
            }, function updateRunnerCompleteInformationCheck(err, runner) {
                if (err) {
                    var dupKey = err.errmsg.split('key: { : "')[1].split('" }')[0];
                    if (validator.isEmail(dupKey)) {
                        res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_ALREADY_EXISTS) });
                    } else if (dupKey.length != 0) {
                        res.status(httpStatus.CONFLICT).json({ error: statusMessage.getStatusText(statusMessage.NICKNAME_ALREADY_EXISTS) });
                    } else {
                        defer.reject(httpStatus.METHOD_FAILURE);
                    }
                } else if (runner.ok == 0) {
                    defer.reject(httpStatus.NOT_MODIFIED);
                } else {
                    defer.resolve();
                }
            });
        }
    };

    module.exports.updateRunnerPassword = function updateRunnerPassword(models, httpStatus, statusMessage, Q, app) {
        return function runnerUpdatePassword(req, res) {

            var Runner = models.runner();
            var runner = req.user;

            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody.hasOwnProperty('currentPassword'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.CURRENT_PASSWORD_MISSING) });
                    break;
                case !reqBody.hasOwnProperty('newPassword'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.PASSWORD_MISSING) });
                    break;
                case reqBody.newPassword.length < app.get('userPasswordLength'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.PASSWORD_LENGTH_ERROR) });
                    break;
                default:
                    break;
            }

            var defer = Q.defer();
            var updatePassword = Q.defer();

            Runner.findOne({ _id: runner.runnerId }, function runnerFound(err, runner) {
                if (err) {
                    defer.reject(httpStatus.METHOD_FAILURE);
                } else if (runner) {
                    defer.resolve(runner);
                }
            });

            defer.promise.then(function runnerUpdateCheckCurrentPasswordSuccessfull(result) {
                var securePassword = result.password;

                if (!bcrypt.compareSync(reqBody.currentPassword, securePassword)) {
                    updatePassword.reject(httpStatus.UNAUTHORIZED);
                } else {
                    updatePassword.resolve();
                }

            }, function errorHandling(result) {
                updatePassword.reject(result);
            });

            updatePassword.promise.then(function runnerUpdatePassword(result) {

                var securePassword = bcrypt.hashSync(reqBody.newPassword, bcrypt.genSaltSync(app.get('passwordSecurity')));

                Runner.update({ _id: runner.runnerId }, {
                    $set: {
                        password: securePassword
                    }
                }, function updateRunnerCompletePasswordCheck(err, runner) {
                    if (err) {
                        res.status(httpStatus.METHOD_FAILURE).send();
                    } else if (runner.ok == 0) {
                        res.status(httpStatus.NOT_MODIFIED).send();
                    } else {
                        res.status(httpStatus.CREATED).send();
                    }
                });
            }, function errorUpdatePasswordHandling(result) {
                if (result == httpStatus.UNAUTHORIZED) {
                    res.status(result).json({ error: statusMessage.getStatusText(statusMessage.CURRENT_PASSWORD_ERROR) });
                } else if (result) { res.status(result).send(); }
            });
        }
    };

    module.exports.getRunnersInARangeArea = function getRunnersInARangeArea(models, session, httpStatus, statusMessage, Q, app) {
        return function getRunnersInARangeArea(req, res) {

            var Runner = models.runner();
            var Session = models.session();
            var runner = req.user;

            var runnerIsInASession = Q.defer();
            var runnerIsValid = Q.defer();

            Session.findOne({
                $and: [
                    { runner: runner.runnerId }, {
                        $or: [
                            { status: session.SES_STATUS_INITIATED },
                            { status: session.SES_STATUS_PAUSED }
                        ]
                    }
                ]
            }, function checkSession(err, session) {
                if (session) {
                    runnerIsInASession.resolve(session);
                } else {
                    runnerIsInASession.reject(err);
                }
            });

            Runner.findOne({ _id: runner.runnerId }, function getRunnerLastPosition(err, runner) {
                if (err) {
                    runnerIsValid.reject(err);
                } else if (runner) {
                    runnerIsValid.resolve(runner);
                }
            });

            Q.all([runnerIsInASession.promise, runnerIsValid.promise]).spread(function(session, runner) {

                var distance = (req.params.hasOwnProperty('range') && !isNaN(req.params.range) && isFinite(req.params.range)) ? req.params.range : app.get('defaultRunnersArea');

                Runner.find({
                    $and: [
                        { _id: { $ne: runner._id } }, {
                            'loc': {
                                $near: runner.loc,
                                $maxDistance: distance
                            }
                        }
                    ]

                }).select('nickname loc').exec(function usersInAnArea(err, runners) {
                    if (err) {
                        res.status(httpStatus.METHOD_FAILURE).json({ error: statusMessage.getStatusText(statusMessage.AREA_FAIL) });
                    } else if (runners) {
                        res.status(httpStatus.OK).json({ "runners": runners });
                    }
                });
            }, function error() {
                res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.AREA_REQUIREMENT_FAIL) });
            });
        }
    };


    module.exports.runnerDeviceAssociation = function runnerDeviceAssociation(models, httpStatus, statusMessage, Q, app) {
        return function runnerDeviceAssociation(req, res) {

            var Runner = models.runner();
            var runner = req.user;

            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody.hasOwnProperty('deviceInformation'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.DEVICE_INFORMATION_MISSING) });
                    break;
                default:
                    break;
            }

            Runner.update({
                _id: runner.runnerId,
                'devices.hwId': { $ne: reqBody.deviceInformation.hwId }
            }, {
                $push: { devices: reqBody.deviceInformation }
            }, function trackingPointAdded(err, runner) {
                if (err || runner.ok == 0) {
                    res.status(httpStatus.METHOD_FAILURE).send();
                } else if (runner.ok == 1 && runner.n == 0) {
                    res.status(httpStatus.NOT_MODIFIED).send();
                } else {
                    res.status(httpStatus.CREATED).send();
                }
            });
        }
    };

    module.exports.runnerLoginWithDevice = function runnerLoginWithDevice(models, httpStatus, statusMessage, Q, JWT, app) {
        return function runnerLoginWithDevice(req, res) {

            var Runner = models.runner();
            var runner = req.user;

            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody.hasOwnProperty('hwId'):
                    return res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.DEVICE_INFORMATION_MISSING) });
                    break;
                default:
                    break;
            }

            var defer = Q.defer();

            defer.promise.then(function checkDeviceLogin(result) {

                var random = new Random(Random.engines.mt19937().autoSeed());
                var randomValue = random.integer(app.get('hashRandomMinValue'), app.get('hashRandomMaxValue'));
                var hashKey = result.email + randomValue;

                var authToken = JWT.sign({ email: result.email, hashKey: hashKey, runnerId: result._id }, app.get('jwtSecret'), { expiresIn: app.get('jwtExpiresIn') });

                Runner.update({ _id: result._id }, { $set: { lastDate: new Date() } }, function updateLastUserEntry(err, runner) {
                    //TODO add log
                });

                res.status(httpStatus.OK).json({
                    'token': authToken,
                    'random': randomValue,
                    'email': result.email,
                    'nickname': result.nickname,
                    'completion': result.registerComplete,
                    'runnerId': result._id
                });

            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            Runner.findOne({
                    'devices.hwId': reqBody.hwId
                },
                function checkIfDeviceExist(err, runner) {
                    if (err) {
                        defer.reject(httpStatus.METHOD_FAILURE);
                    } else {
                        if (runner) {
                            defer.resolve(runner);
                        } else {
                            res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.DEVICE_NOT_FOUND) });
                            defer.reject();
                        }
                    }
                }
            );
        }
    };

    module.exports.runnerRecoverPassword = function runnerRecoverPassword(models, httpStatus, statusMessage, Q, app, endpoint, domain, CRYPTO) {
        return function runnerRecoverPassword(req, res) {

            var Runner = models.runner();
            var reqBody = JSON.parse(JSON.stringify(req.body));

            switch (true) {
                case !reqBody.hasOwnProperty('loginId'):
                    res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_MISSING) });
                    return;
                case (!validator.isEmail(reqBody.loginId) && (reqBody.loginId.length < app.get('userNicknameMinLength') || reqBody.loginId.length > app.get('userNicknameMaxLength'))):
                    res.status(httpStatus.BAD_REQUEST).json({ error: statusMessage.getStatusText(statusMessage.EMAIL_NOT_VALID) });
                    return;
                default:
                    break;
            }

            var recoverPassword = Q.defer();

            recoverPassword.promise.then(function sendRecoverPasswordToRunner(result) {

                var random = new Random(Random.engines.mt19937().autoSeed());
                var randomValue = random.integer(app.get('hashRandomMinValue'), app.get('hashRandomMaxValue'));
                var hashKey = result.email + randomValue;

                var recoverPasswordToken = CRYPTO.createHash(app.get('hashToGenerateRecoverPasswordLink')).update(hashKey).digest('hex');

                Runner.update({ _id: result._id }, {
                    $set: {
                        'pwRecovery.token': recoverPasswordToken,
                        'pwRecovery.date': new Date()
                    }
                }, function updateRunnerRecoveryPasswordToken(err, runner) {
                    //TODO add log
                    if (err || runner.ok == 0) {
                        res.status(httpStatus.METHOD_FAILURE).send();
                    } else if (runner.ok == 1 && runner.n == 0) {
                        res.status(httpStatus.NOT_MODIFIED).send();
                    } else {

                        var link = domain.APP_DOMAIN + endpoint.RUNNER_RECOVER_GENERATE_NEW_PASSWORD + recoverPasswordToken;
                        var emailPromise = email.sendRecoverPasswordEmail(result.email, result.nickname, link);

                        emailPromise.promise.then(function emailRecoverPasswordSent() {
                            res.status(httpStatus.ACCEPTED).send();
                        }, function emailRecoverPasswordFail() {
                            res.status(httpStatus.METHOD_FAILURE).send();
                        });
                    }
                });

            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            Runner.findOne({
                    $or: [
                        { 'email': reqBody.loginId.toLowerCase() },
                        { 'nickname': reqBody.loginId.toLowerCase() }
                    ]
                },
                function checkUserForPasswordRecovery(err, runner) {
                    if (err) {
                        recoverPassword.reject(httpStatus.METHOD_FAILURE);
                    } else {
                        if (!runner) {
                            res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.USER_NOT_FOUND) });
                            recoverPassword.reject();
                        } else {
                            recoverPassword.resolve(runner);
                        }
                    }
                }
            );
        }
    };

    module.exports.runnerRecoverPasswordCheck = function runnerRecoverPasswordCheck(models, httpStatus, statusMessage, Q, app) {
        return function runnerRecoverPasswordCheck(req, res) {

            var Runner = models.runner();

            var recoverPasswordCheck = Q.defer();

            recoverPasswordCheck.promise.then(function sendNewPasswordToRunner(result) {

                var password = passwordGenerator(app.get('generatedPasswordLength'), false);
                var securePassword = bcrypt.hashSync(password, bcrypt.genSaltSync(app.get('passwordSecurity')));

                Runner.update({ _id: result._id }, {
                    $unset: {
                        'pwRecovery.token': '',
                        'pwRecovery.date': ''
                    },
                    $set: {
                        password: securePassword
                    }
                }, function updateRunnerRecoveryPasswordToken(err, runner) {
                    //TODO add log
                    if (err || runner.ok == 0) {
                        res.status(httpStatus.METHOD_FAILURE).send();
                    } else if (runner.ok == 1 && runner.n == 0) {
                        res.status(httpStatus.NOT_MODIFIED).send();
                    } else {

                        var emailPromise = email.sendNewPasswordEmail(result.email, password);

                        emailPromise.promise.then(function emailRecoverPasswordSent() {
                            res.status(httpStatus.OK).send();
                        }, function emailRecoverPasswordFail() {
                            res.status(httpStatus.METHOD_FAILURE).send();
                        });
                    }
                });

            }, function errorHandling(result) {
                if (result) { res.status(result).send(); }
            });

            var maxDate = new Date();
            maxDate.setDate(maxDate.getDate() - app.get('timeRecoverPassworkLinkIsValid'));

            Runner.findOne({
                    $and: [
                        { 'pwRecovery.token': req.params.token },
                        { 'pwRecovery.date': { $gt: maxDate } }
                    ]
                },
                function checkUserForPasswordRecoveryCheck(err, runner) {
                    if (err) {
                        recoverPasswordCheck.reject(httpStatus.METHOD_FAILURE);
                    } else {
                        if (!runner) {
                            res.status(httpStatus.NOT_FOUND).json({ error: statusMessage.getStatusText(statusMessage.USER_NOT_FOUND) });
                            recoverPasswordCheck.reject();
                        } else {
                            recoverPasswordCheck.resolve(runner);
                        }
                    }
                }
            );
        }
    };

})(module, process);
