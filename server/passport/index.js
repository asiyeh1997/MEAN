const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../database/models/user')


passport.serializeUser((user, done) => {
    done(null, { _id: user._id})
})

/* first argument is an id which is the same id that was passed in done(null, user.id) 
of serializeUser(). deserializeUser() then makes a request to our DB to find the full 
profile information for the user and then calls done(null, user).*/

passport.deserializeUser((id, done) => {
    console.log('DeserializeUser called')
    User.findOne(
        {_id: id},
        'username',
        (err, user) => {
            console.log('*** Deserialize called, user: '); // only for debugging to see result in terminal
            console.log(user); // the whole raw user object - only for debugging to see result in terminal
            done(null, user)
        }
    )
})

passport.use(LocalStrategy);

module.exports = passport