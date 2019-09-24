const bcrypt = require('bcrypt');

module.exports = (app, passport, db) => {

  app.post('/login', passport.authenticate('local', {
      // successRedirect: '/game',
      failureRedirect: '/',
      failerFlash: false
  }), function (req, res) {
    res.json({ message: "successful login" });
  });


  //register
  app.post("/api/users", (req, res) => {
    const unhashedpw = req.body.password;


    console.log(req.body);


    bcrypt.hash(unhashedpw, 10, function(err, hash) {

      db.User.create({
        email: req.body.email,
        password: hash
      }).then(data => {
        res.json({message: "registration successful"})}).catch(function (err){
          console.log("registration error: "+err);
        });
    });


  });
};
