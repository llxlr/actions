'use strict';
const core = require('@actions/core');
const email   = require("emailjs");
const request = require('request');

core.debug('start actions...');
let server = core.getInput('server');
core.debug(`server name ${server}`);
let title = core.getInput('title');
let msg = core.getInput('message');

async function run() {
    switch (server) {
        case 'serverchan':
            const serverChan = {
                key: core.getInput('serverchan-key'),
                title: title,
                msg: msg,
                run: function () {
                    let url_obj = new URL(`https://sctapi.ftqq.com/${this.key}.send?title=${this.title}&desp=${this.msg}`);
                    try {
                        request(url_obj.href, function (error, response, body) {
                            if (!error && response.statusCode === 200) {
                                console.log(body.data.error);
                            }
                        });
                    } catch (error) {
                        core.debug(error)
                    }
                }
            }
            console.log(serverChan.run());
            break;
        case 'email':
            const sendEmail = {
                smtp: core.getInput('smtp'),
                ssl: core.getInput('ssl'),
                port: core.getInput('port'),
                email: core.getInput('email'),
                to: core.getInput('to'),
                password: core.getInput('password'),
                send: function (title, msg) {
                    let server_obj  = email.server.connect({
                        user: this.email,
                        password: this.password,
                        host: this.smtp,
                        ssl: this.ssl
                    });

                    server_obj.send({
                        text: msg,
                        from: this.email,
                        to: this.to,
                        subject: title
                    }, function(err, message) {
                        console.log(err || message);
                    })
                }
            }
            console.log(sendEmail.send(title, msg))
            break;
        default: console.log();
    }
}

run();
