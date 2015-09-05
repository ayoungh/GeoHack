//CONFIG
module.exports = {
  port: process.env.port || 3000,
  secret: 'roofplants',
  twitter: {
    consumerKey: '',
    consumerSecret: '',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  }
};
