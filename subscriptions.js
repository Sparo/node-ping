// get enviroment variables
var ACTION = process.env.ACTION ? process.env.ACTION.toLowerCase() : 'get';
var WHAT = process.env.WHAT ? process.env.WHAT.toUpperCase() : 'CFXTEXT';
var ENVIROMENT = process.env.ENV ? process.env.ENV.toLowerCase() : 'alpha';
var FAST = process.env.FAST ? process.env.FAST.toLowerCase() : '';

console.log(FAST);

// load requiroments
var http = require('http');
var fs = require('fs');
var async = require('async');

// get file name
var file_name = WHAT + ENVIROMENT + ".json";
// check for action
switch (ACTION) {
case 'get':
    {
        // build options for getting backendIds
        options = {
            host: 'hermes-' + ENVIROMENT + '.cs.oak.vast.com',
            path: '/api/subscriptions/backendIds?applicationId=' + WHAT,
            method: 'GET',
            port: 80
        };
        // log options
        console.log('=========== options ==============');
        console.log(options);
        console.log('==================================');

        // make a request to hermes
        http.request(options, function (response) {
            // when there are results
            console.log('writing to file...');
            // create writable stream
            var writable = fs.createWriteStream(file_name).on('finish', function () {
                // inform user when finished
                console.log('All writes are now complete.');
                console.log('There is %s backendIds for %s %s', (JSON.parse(fs.readFileSync(file_name))).length, WHAT, ENVIROMENT);
            });
            // pipe response into writable stream
            response.pipe(writable);
        }).on('error', function (error) {
            // if error inform them
            console.error('error', error);
        }).end();
        break;
    }
case 'delete':
    {
        try {
            // get backendIds in from file
            var data = JSON.parse(fs.readFileSync(file_name, 'utf8'));
            // define execute functions array
            var execute = [];

            // build options for deleting data from beta
            options = {
                host: 'carfax.fe-' + ENVIROMENT + '.vast.com',
                path: '/vehicles/deletealert/[=ID=]?applicationId=' + WHAT,
                method: 'GET',
                port: 80,
                auth: 'carfax:x@fr@c'
            };
            // log options
            console.log('=========== options ==============');
            console.log(options);
            console.log('==================================');

            // loop through  backendIds and build requests
            data.forEach(function (backendId, index) {
                // if FAST create delay for parallel execution
                var setTimeoutValue = FAST ? index * 30 : 0;
                // clone options so we can change them
                // this is one smart way of cloning object without using some third party lib like lodash
                var new_options = (JSON.parse(JSON.stringify(options)));
                // replace 'placeholder' for backendId with backendId
                new_options.path = options.path.replace('[=ID=]', backendId);
                // log new options
                // console.log('=========== new options ==============');
                // console.log(new_options);
                // console.log('==================================');

                // build async object
                execute.push(function (callback) {
                    var data = '';
                    setTimeout(function () {
                        // make a request
                        var req = http.request(new_options, function (response) {
                            // on response
                            response.on('data', function (chunk) {
                                // log data so we can now if there is results
                                console.log(backendId, chunk.toString());
                                data = chunk.toString();
                            });
                        }).on('error', function (error) {
                            // if error log it
                            console.log('error', error);
                            // pass error
                            callback(error, null);
                        }).on('end', function () {
                            // pass data
                            callback(null, data);
                        });
                        req.end();
                    }, setTimeoutValue);
                });
            });
            if (FAST === 'true') {
                console.log('Go in parallel execution');
                // and Baaam  execute parallel requests
                async.parallel(execute, function (error, done) {
                    console.log(error, done);
                });
            } else {
                console.log('Go in series execution');
                // and Baaam  execute series requests
                async.series(execute, function (error, done) {
                    console.log(error, done);
                });
            }
        } catch (error) {
            console.error('Error happend', error);
        }
        break;
    }
}
