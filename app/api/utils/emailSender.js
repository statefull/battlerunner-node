(function(module, process) {
    'use strict';
    var nodemailer = require('nodemailer');
    var EmailTemplate = require('email-templates').EmailTemplate;
    var path = require('path');
    var templatesDir = path.resolve(__dirname, '../../..', 'emailTemplates');
    var Q = require('q');

    var transporter;
    var init = false;

    function initTransporter() {
        if (!init) {

            var smtpConfig = {
                host: 'smtp-pulse.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'statefull@gmail.com',
                    pass: '65WW4jYsfcNPn'
                }
            };

            transporter = nodemailer.createTransport(smtpConfig);

            transporter.verify(function(error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Server is ready to take our messages');
                    init = true;
                }
            });
        }
    }


    module.exports.sendWelcomeEmail = function sendTo(to) {
        if (!init) initTransporter();

        var template = new EmailTemplate(path.join(templatesDir, 'welcome-email'));

        var emailPromise = Q.defer();

        // An example users object with formatted email function
        var locals = {
            email: to,
            name: {
                first: 'Mamma',
                last: 'Mia'
            }
        }

        // Send a single email
        template.render(locals, function(err, results) {
            if (err) {
                emailPromise.reject();
            }

            transporter.sendMail({
                from: 'battlerunners <statefull@gmail.com>',
                to: locals.email,
                subject: 'Mangia gli spaghetti con polpette!',
                html: results.html,
                text: results.text
            }, function(err, responseStatus) {
                if (responseStatus.accepted[0] == locals.email) {
                    emailPromise.resolve();
                } else {
                    emailPromise.reject();
                }

            });
        });

        return emailPromise;
    };

    module.exports.sendRecoverPasswordEmail = function sendTo(to, nickname, link) {
        if (!init) initTransporter();

        var template = new EmailTemplate(path.join(templatesDir, 'recover-password'));

        var emailPromise = Q.defer();

        var locals = {
            email: to,
            info: {
                nickname: nickname,
                link: link
            }
        }

        // Send a single email
        template.render(locals, function(err, results) {
            if (err) {
                emailPromise.reject();
            }

            transporter.sendMail({
                from: 'battlerunners <statefull@gmail.com>',
                to: locals.email,
                subject: 'Recover password request',
                html: results.html,
                text: results.text
            }, function(err, responseStatus) {
                if (responseStatus.accepted[0] == locals.email) {
                    emailPromise.resolve();
                } else {
                    emailPromise.reject();
                }

            });
        });

        return emailPromise;
    };

    module.exports.sendNewPasswordEmail = function sendTo(to, password) {
        if (!init) initTransporter();

        var template = new EmailTemplate(path.join(templatesDir, 'new-password'));

        var emailPromise = Q.defer();

        // An example users object with formatted email function
        var locals = {
            email: to,
            password: password
        }

        // Send a single email
        template.render(locals, function(err, results) {
            if (err) {
                emailPromise.reject();
            }

            transporter.sendMail({
                from: 'battlerunners <statefull@gmail.com>',
                to: locals.email,
                subject: 'Your new password',
                html: results.html,
                text: results.text
            }, function(err, responseStatus) {
                if (responseStatus.accepted[0] == locals.email) {
                    emailPromise.resolve();
                } else {
                    emailPromise.reject();
                }

            });
        });

        return emailPromise;
    };


})(module, process);
