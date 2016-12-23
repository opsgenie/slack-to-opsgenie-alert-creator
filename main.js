/**
 * Created by Serhat Can on 09/12/16.
 */
'use strict';

const opsgenie = require('opsgenie-sdk');
const qs = require('querystring');

exports.handler = function (event, context, callback) {

    const slackToken = process.env.slackToken;
    const params = qs.parse(event.body);

    // token check to make sure that requests come from Slack
    if (params.token !== slackToken) {
        console.error(`Request token (${params.token}) does not match expected`);
        return callback('Invalid request token');
    }

    const opsgenieApiKey = process.env.opsgenieApiKey;

    opsgenie.configure({
        'api_key': opsgenieApiKey
    });

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