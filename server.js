(function(process, logger) {
    'use strict';
    var express = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        http = require('http'),
        compress = require('compression'),
        //loading local files
        models = require('./app/models/model'),
        routes = require('./app/routes'),
        // config
        config = require('./config/config.json');

    var app = module.exports = express();

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.disable('x-powered-by');
    app.use(compress());

    mongoose.set('debug', true);

    //adding configuration vars
    app.set('mongoSrv', config.mongodb.connectionString);
    app.set('appPort', config.app.listeningPort);
    app.set('passwordSecurity', config.app.passwordSecurity);
    app.set('jwtExpiresIn', config.app.jwtExpiresIn);
    app.set('jwtSecret', config.app.jwtSecret);
    app.set('userPasswordLength', config.app.userPasswordLength);
    app.set('userNicknameMinLength', config.app.userNicknameMinLength);
    app.set('userNicknameMaxLength', config.app.userNicknameMaxLength);
    app.set('hashRandomMinValue', config.app.hashRandomMinValue);
    app.set('hashRandomMaxValue', config.app.hashRandomMaxValue);
    app.set('earthRadio', config.app.earthRadio);
    app.set('challengeDefaultDistance', config.app.challengeDefaultDistance);
    app.set('passwordRecoverySecurity', config.app.passwordRecoverySecurity);
    app.set('timeRecoverPassworkLinkIsValid', config.app.timeRecoverPassworkLinkIsValid);
    app.set('generatedPasswordLength', config.app.generatedPasswordLength);
    app.set('hashToGenerateRecoverPasswordLink', config.app.hashToGenerateRecoverPasswordLink);
    app.set('defaultRunnersArea', config.app.defaultRunnersArea);

    logger.log('Connecting to ' + app.get('mongoSrv'));
    //Initializing mongoose
    mongoose.connect(app.get('mongoSrv'));
    models.init(mongoose);

    routes.load(models, app);

    var server = http.createServer(app);
    server.listen(app.get('appPort'), function() {
        logger.log('Server listening on port ' + app.get('appPort'));
    });
})(process, console);
