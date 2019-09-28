# node-fshare
Simple filesharing express-style middleware.

## Version Info

This is a version 2. It has some major breaking changes:
* using uuid for uploaded file ids to minimize chance of collision
* renamed `dest` options parameter to `destination`
* updated dependency libraries to newer versions

For info on version 1 see: [v1 branch](Razzeeyy/node-fshare/tree/v1)

## Installation
Install it with
````
    npm install --save fshare
````
Mount it!
````js
    app.use('/', fshare())
````


## Usage

### Uploading
POST multipart/form-data file with name="file" to fshare_mountpoint and after upload you will receive a file id which you can use to retrieve a file from server.

### Downloading
To retrieve a file from server GET to fshare_mountpoint/id where id is your file id returned when file was uploaded. And the file will be sent to the browser.

## Options
One can pass options object to the fshare(options) middleware function.

Current options are:
- "dest": specifies a destination folder for uploads, by default files go into /tmp/fshare or similar tmp dir for your OS.
- "limits": this are passed straight to multer "limits" options atribute. Read more about it on [multer](https://github.com/expressjs/multer).

**NOTE**: you may have to tweak limits fileSize to prevent a spam attacks of uploading huge files to the server.

## Example
````js
var express=require("express")
var fshare = require('fshare')

var app = express()

app.use('/fshare', fshare({dest: __dirname+'/uploads'}))

app.listen(1337,function(){
    console.log("Listening on 1337");
});
````

Upload a file `curl -F 'file=@/full/path/to/file' -v http://localhost:1337/fshare`
