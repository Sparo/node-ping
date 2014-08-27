var ping = require('net-ping');
var fs = require('fs');
var session = ping.createSession();

if (process.argv.length < 3) {
    console.log ("usage: node ping <target> <file>");
    process.exit (-1);
}

var path = process.argv[3];

fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'error opening file: ' + err;
    } else {
        setInterval(function () {
            session.pingHost(process.argv[2], function (err, target, d1, d2) {
                if (err) {
                    var cont = "------\n"+err+" "+(d2-d1)+"ms\n------------";
                    var buffer = new Buffer(cont);
                } else {
                    var cont = "------\n"+target+" "+(d2-d1)+"ms\n------------";
                    var buffer = new Buffer(cont);
                }
                fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                    if (err) throw 'error writing file: ' + err;
                    // fs.close(fd, function() {
                    //     console.log('file written');
                    // })
                });
            });
        }, 1000);
    }
});


setInterval(function () {
    session.pingHost('4.2.2.2', function (err, target, d1, d2) {
        console.log("------------------------");
        if (err) {
            console.log(err);
        } else {
            console.log(target, d2-d1);
        }
    });
}, 1000);
