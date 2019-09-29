# node-fshare

## About

Simple filesharing express-style middleware.  
**NOTE**: this library is a wrapper around `multer` and `serve-static`. It's mean for novice users or those who want easy file server bootstrapping. If you're advanced user you're better off using and configuring `multer` and `serve-static` directly.

### Version Info

This is a version 2. It has some major breaking changes:
* using uuid for uploaded file ids to minimize chance of collision
* renamed `dest` options parameter to `destination`
* updated dependency libraries to newer versions

For info on version 1 see [v1 branch](Razzeeyy/node-fshare/tree/v1).


## Installation
```
npm i fshare
```


## Usage
Include it:
```js
const fshare = require('fshare')
```
And then mount it:
```js
app.use('/', fshare())
```

### Uploading
POST multipart/form-data file under parameter name `file` to wherever your fshar mountpoint is and after upload you will receive a file id which you can use to retrieve a file from server. A response with 200 code will contain a plain text file id that is used to later retrieve file from server. Any other response that isn't 200 code should be treated as error and will most likely contain an html/plaintext error message in a body.

### Downloading
To retrieve a file from server GET to fshare_mountpoint/id where id is your file id returned when file was uploaded. And the file will be sent to the browser.


## Options
One can pass options object to the fshare(options) middleware function.

Current options are:
* `destination`: specifies a destination folder for uploads, by default files go into /tmp/fshare or similar tmp dir for your OS.
* `limits`: this are passed straight to multer "limits" options atribute. Read more about it on [multer](https://github.com/expressjs/multer).

**NOTE**: you may have to tweak limits fileSize to prevent spam attacks of uploading huge files to the server.


## Example
```js
const express = require("express")
const fshare = require('fshare')

const app = express()

app.use('/upload', fshare({ destination: __dirname+'/uploads' }))

app.listen(1337, () => {
    console.log("Listening on 1337")
})
```

You can use a curl to test uploading a file:
```sh
curl -F 'file=@/full/path/to/file' -v http://localhost:1337/upload
```
