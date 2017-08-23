/**
 * VdotController
 *
 * @description :: Server-side logic for managing Vdots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  vdot: function (req, res) {
    var dist = req.param("distancia");
    var tiemp = req.param('tiempo');
    console.log(dist);
    if(!dist || dist <= 0  || ! tiemp || tiemp <= 0){
      res.badRequest({message : 'distancia y tiempo son requeridos'});
    }
    else{
      VdotService.get(dist, tiemp, function (err, vdot) {
        if(err){
          res.serverError(err);
        }
        else{
          res.send(vdot);
        }
      });
    }
  },
  predict: function (req, res) {
    var dist = req.param("distancia");
    var tiemp = req.param('tiempo');
     if(!dist || dist <= 0  || ! tiemp || tiemp <= 0){
      res.badRequest({message : 'distancia y tiempo son requeridos'});
    }
    else{
      VdotService.get(dist, tiemp, function (err, vdot) {
        if(err){
          res.serverError(err);
        }
        else{
          Vdot.find({VDOT: vdot.vdot}).exec(function (err, times){
            if (err) {
              return res.serverError(err);
            }
            return res.json(times);
          });
        }
      });
    }
  }
};