var os = require('os')
var path = require('path')
var express=require("express")
var serveStatic = require('serve-static')
var multer  = require('multer')

DEFAULT_OPTS = {
  destination: path.join(os.tmpdir(), 'fshare'),
  limits: null
}

module.exports = function(opts){
  opts = Object.assign({}, DEFAULT_OPTS, opts) 

  var storage = multer.diskStorage({
    destination: opts.destination,
    filename: function (req, file, cb) {
      //TODO: will it clash on muptiple requests at once?
      cb(null, Date.now().toString(16)+path.extname(file.originalname))
    }
  })
  var upload = multer({ storage: storage, limits: opts.limits })

  var fshare = express.Router()

  fshare.use('/', serveStatic(opts.destination))

  fshare.post('/', upload.single('file'), function(req,res){
      res.set('Connection', 'close');
      res.end(req.file.filename)
  })

  return fshare;
}
