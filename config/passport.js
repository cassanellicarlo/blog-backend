const   passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongoose = require('mongoose'),
        User = mongoose.model('User');

// Configure Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email' // use email as identifier
    }, (username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            if (err) { // error
                return done(err); 
            } 
            if (!user) { // user not found
                return done(null, false, {
                    message: 'User not found'
                });
            }
            if (!user.validPassword(password)) { // wrong password
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));