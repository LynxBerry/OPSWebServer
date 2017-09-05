//ops webserver
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {}; //hash table for storing cache.

//--To DO List
//--parse the command line arguments
console.log('Start to Parse the command line arguments');
console.log(process.argv);
//--We defintely need a testing configuration.



function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200,
        {"content-type": mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    if (cache[absPath]) { //If cached, return the content directly
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) { //try to load requested content from local disk
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }//end if else

                }); //end of readFile
            } else {
                send404(response);
            } //end if exists
        }); // end of fs.exists

    }// end if else
}

var server = http.createServer(function(request, response)
                               {
                                   var filePath = false;

                                   if (request.url == '/')
                                   {
                                      filePath = 'public/main.html';
                                      console.log('rabbit 0');
                                   }
                                   else
                                   {
                                      filePath = 'public' + request.url;
                                   }
console.log("FilePath:");
console.log(filePath);
                                   var absPath = './' + filePath;
                                   serveStatic(response, cache, absPath);
                               } // callback function
                              );

server.listen(3000, function()
                    {
                        console.log("Server listen on port 3000.");
                    } // callback function
             );

// var chatServer = require('./lib/chat_server');
var dataServer =  require('./lib/data_server');
dataServer.listen(server);
