const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Student = require('../models/Student');

module.exports = function (passport) {
    // Google Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists
                let user = await Student.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists with email (link account)
                if (profile.emails && profile.emails.length > 0) {
                    user = await Student.findOne({ email: profile.emails[0].value });
                    if (user) {
                        user.googleId = profile.id;
                        await user.save();
                        return done(null, user);
                    }
                }

                // Create new user
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
                    // password is not required
                };

                user = await Student.create(newUser);
                done(null, user);
            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }));

    // Facebook Strategy
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'emails']
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await Student.findOne({ facebookId: profile.id });

                if (user) {
                    return done(null, user);
                }

                if (profile.emails && profile.emails.length > 0) {
                    user = await Student.findOne({ email: profile.emails[0].value });
                    if (user) {
                        user.facebookId = profile.id;
                        await user.save();
                        return done(null, user);
                    }
                }

                const newUser = {
                    facebookId: profile.id,
                    name: profile.displayName,
                    email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
                };

                user = await Student.create(newUser);
                done(null, user);
            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Student.findById(id, (err, user) => done(err, user));
    });
};
