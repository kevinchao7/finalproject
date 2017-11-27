const randomString = require('randomstring');
module.exports = {
  google : {
    clientID: '393852577124-du4hrae8odanu37sh8cgacmhk3hmolvg.apps.googleusercontent.com',
    clientSecret: 'n5jR3BfnGWOmsU4U0w-bno5S',
    // callbackURL: "https://financialbudgetapp.herokuapp.com/auth/google/callback"
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  SENDGRID_API_KEY : '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',
  session_key : randomString.generate()
}
