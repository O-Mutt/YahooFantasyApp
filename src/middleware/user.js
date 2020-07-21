
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    const path = `${req.baseUrl}${req.path}`;
    res.redirect(`/user/auth?redirect=${path}`);
  }
}

export default isUserAuthenticated;
