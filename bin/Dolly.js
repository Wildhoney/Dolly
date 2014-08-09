#!/usr/bin/env node

/**
 * @module Dolly
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Dolly
 */
(function Dolly() {

    /**
     * @param parameters
     * @type {Object}
     */
    var parameters = require('optimist').argv;

    /**
     * @property util
     * @type {Object}
     */
    var util = require('util');

    /**
     * @property exec
     * @type {Function}
     */
    var exec = require('child_process').exec;

    /**
     * @property request
     * @type {Object}
     */
    var request = require('request');

    /**
     * @property colour
     * @type {Object}
     */
    var colour = require('cli-color');

    /**
     * @param PrettyError
     * @type {Object}
     */
    var PrettyError = new require('pretty-error');

    if (parameters._.length === 0) {

        // Ensure the username argument exists!
        return console.log(new PrettyError().render(new Error('Dolly: You neglected to supply a username.')));

    }

    /**
     * @constant API_ENDPOINT
     * @type {String}
     */
    var API_ENDPOINT = 'https://api.github.com/users/%s/repos';

    /**
     * @method CloneRepositories
     * @return {void}
     */
    (function CloneRepositories(url) {

        /**
         * @property options
         * @type {Object}
         */
        var options = {
            url: url,
            headers: {
                'User-Agent': 'Dolly'
            }
        };

        /**
         * @method cloneNotification
         * @param name {String}
         * @param url {String}
         * @param current {Number}
         * @param total {Number}
         * @return {void}
         */
        var cloneNotification = function cloneNotification(name, url, current, total) {

            var darkGrey  = colour.xterm(8),
                lightGrey = colour.xterm(7),
                yellow    = colour.xterm(11);

            // Output the pretty message to the CLI.
            process.stdout.write(darkGrey('  - ') + yellow('Cloning ') + darkGrey(current + '/' + total) + ': ' +
                                 lightGrey(name) + darkGrey('\n    ' + url + '\n\n'));

        };

        request(options, function requestSuccess(error, response, body) {

            var repositories = JSON.parse(body);

            // Iterate over each repository to eventually clone them.
            repositories.forEach(function forEach(repository, index) {

                // Notify the user about which repository we're currently cloning.
                cloneNotification(repository.name, repository.ssh_url, (index + 1), repositories.length);

                // Begin the process of cloning the discovered repository.
                exec(util.format('git clone %s', repository.ssh_url));
                
            });

        });

    })(util.format(API_ENDPOINT, parameters._));

})();