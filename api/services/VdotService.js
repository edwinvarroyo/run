module.exports = {
  get: function (dist, tiemp, done) {
    var vdot = 0;
    Vdot.find({distancia: dist, sort: 'VDOT ASC'}).exec(function (err, registro){
      if (err) {
        return done(err);
      }
      else{
        for(i = 0; vdot < 30; i++){
          if(i >= registro.length){
            return done("error");
          }
          else{
            if(i == registro.length-1){
              if(!(tiemp <= registro[i].tiempo)){
                if((tiemp <= registro[i].tiempo)){
                  vdot = registro[i].VDOT;
                }
                else{
                  //vdot = 30;
                  return done("error");
                }
              }
            }
            else{
              if(!(tiemp <= registro[i+1].tiempo)){
                if((tiemp <= registro[i].tiempo)){
                  vdot = registro[i].VDOT;
                }
              }
            }
          }

        }
        return done(null, {'vdot': vdot});
      }
    });
  }
}