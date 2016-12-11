/**
 * Created by Serhat Can on 09/12/16.
 */
'use strict';

const opsgenie = require('opsgenie-sdk');
const qs = require('querystring');

exports.handler = function (event, context, callback) {

    const opsgenieApiKey = process.env.opsgenieApiKey;
    const slackToken = process.env.slackToken;

    opsgenie.configure({
        'api_key': opsgenieApiKey
    });

    const params = qs.parse(event.body);
    if (params.token !== slackToken) {
        console.error(`Request token (${params.token}) does not match expected`);
        return callback('Invalid request token');
    }

    var create_alert_json = {
        message: params.text
    };

    opsgenie.alert.create(create_alert_json, function (error, alert) {
        if (error) {
            callback(error);
        } else {
            callback(null, "successful");
        }
    });
};