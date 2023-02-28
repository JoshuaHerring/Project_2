const routes = require("express").Router();

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://project-2-zf2s.onrender.com',
  clientID: '63HKz9dd2Sr6w5VfP45rdUCHNnPgCRz0',
  issuerBaseURL: 'https://dev-wujcaylqmgympizc.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
routes.use(auth(config));

// req.isAuthenticated is provided from the auth router
routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// sends profile if authorized

routes.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


routes.use("/bosses", /*requiresAuth(),*/ require("./bosses"));
routes.use("/items", /*requiresAuth(),*/ require("./items.js"));

module.exports = routes;