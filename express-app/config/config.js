//CONFIG
module.exports = {
  port: process.env.port || 3000,
  twitter: {
    consumerKey: 'TWITTER_CONSUMER_KEY',
    consumerSecret: 'TWITTER_CONSUMER_SECRET',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  }
};
