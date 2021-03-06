const os = require('os')
const path = require('path')
const express = require("express")
const serveStatic = require('serve-static')
const multer  = require('multer')
const uuid = require('uuid/v4')

const DEFAULT_OPTS = {
  destination: path.join(os.tmpdir(), 'fshare'),
  limits: null
}

module.exports = function(opts) {
  opts = Object.assign({}, DEFAULT_OPTS, opts) 

  const storage = multer.diskStorage({
    destination: opts.destination,
    filename: (req, file, cb) => {
      cb(null, uuid() + path.extname(file.originalname))
    }
  })
  const upload = multer({ storage: storage, limits: opts.limits })

  const fshare = express.Router()

  fshare.use('/', serveStatic(opts.destination))

  fshare.post('/', upload.single('file'), (req,res) => {
      res.set('Connection', 'close');
      res.end(req.file.filename)
  })

  return fshare;
}
