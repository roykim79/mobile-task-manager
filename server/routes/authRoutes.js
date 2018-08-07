const passport = require('passport')

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // this is where you need to check for organization
      // and redirect somewhere else if they do not have an organization
      res.redirect('/projects');
    }
  );
  
  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  });

  app.get('/api/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  });
}