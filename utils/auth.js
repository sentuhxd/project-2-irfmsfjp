const withAuth = (req, res, next) => {
    // TODO: Add a comment describing the functionality of this if statement
    // if someone is not logged in you will be redirected to the loginpage
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;