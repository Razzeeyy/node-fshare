# node-fshare
Simple filesharing express-style middleware.

## Installation
Install it with
    npm install TODO:installAppNameHere

Mount it!
    app.use('/', fshare())

##Usage
### Uploading
POST multipart/form-data file with name="file" to fshare_mountpoint and after upload you will receive a file id which you can use to retrieve a file from server.

### Downloading
To retrieve a file from server GET to fshare_mountpoint/id where id is your file id returned when file was uploaded. And the file will be sent to the browser.

## Options
One can pass options object to the fshare(options) middleware function.
Current options are:
- "dest": specifies a destination folder for uploads, by default files go into /tmp/fshare or similar tmp dir for your OS.
- "limits": this are passed straight to multer "limits" options atribute. Read more about it on [multer][].

[multer](https://github.com/expressjs/multer)

**NOTE**: you may have to tweak limits fileSize to prevent a spam attacks of uploading huge files to the server.
