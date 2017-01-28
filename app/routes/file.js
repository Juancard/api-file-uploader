'use strict';


module.exports = function (app, appEnv) {

  app.route('/get-file-size')
      .post(appEnv.upload.single('theFile'), function (req, res, next) {
        res.json({size: req.file.size});
      })
}
