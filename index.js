var os = require('os')
var path = require('path')
var express=require("express")
var serveStatic = require('serve-static')
var multer  = require('multer')

DEFAULT_OPTS = {
  dest: path.join(os.tmpdir(), 'fshare'),
  limits: null
}

module.exports = function(opts){
  opts = opts || DEFAULT_OPTS

  var storage = multer.diskStorage({
    destination: opts.dest,
    filename: function (req, file, cb) {
      //TODO: will it clash on muptiple requests at once?
      cb(null, Date.now()+path.extname(file.originalname))
    }
  })
  var upload = multer({ storage: storage, limits: opts.limits })

  var fshare = express.Router()

  fshare.get('/', serveStatic(opts.dest))

  fshare.post('/', upload.single('file'), function(req,res){
      res.set('Connection', 'close');
      res.end(req.file.filename)
  })

  return fshare;
}
