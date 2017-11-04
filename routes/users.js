const express = require('express');
const router = express.Router();
const { checkAuthentication } = require('../bin/helpers');
const formidable = require('formidable');
const util = require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/profile/photo', checkAuthentication, function(req, res, next) {
  debugger;
  const form = new formidable.IncomingForm();
  form.maxFieldsSize = 1 * 1024 * 1024;
  form.multiples = true;
  let files = [];
  // form.parse(req, (err, fields, files) => {
  //   debugger;
  //   if (err) {
  //     console.log(err);
  //     return res.send({ status: 'error has occured while uploading file' });
  //   }
  //   console.log(util.inspect({fields: fields, files: files}));
  //   res.statusCode = 200;
  //   res.setHeader('content-type', 'text/plain');
  //   return res.send('received upload');
  // });

  form.on('file', (field, file) => {
    console.log(field, file);
    files.push([field, file]);
  })
  .on('error', function(err) {
    console.error(err);
    process.exit(1);
  })
  .on('end', function () {
    console.log('-> upload done');
    res.writeHead(200, { 'content-type': 'text/plain' });
    //res.write('received fields:\n\n ' + util.inspect(fields));
    res.write('\n\n');
    res.end('received files:\n\n ' + util.inspect(files));
  });

  form.parse(req);
  return;
});

module.exports = router;
