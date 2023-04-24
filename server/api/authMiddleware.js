// Middleware to check if the user is logged in
function isUser(req, res, next) {
  if (req.user) {
    next();
  } else {
    const error = new Error("You must be logged in to access this resource.");
    error.status = 401;
    next(error);
  }
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    const error = new Error("You must be an admin to access this resource.");
    error.status = 403;
    next(error);
  }
}

module.exports = {
  isUser,
  isAdmin,
};
