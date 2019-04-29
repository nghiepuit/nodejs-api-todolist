const passport = require("passport");
var compose = require("composable-middleware");
const { ExtractJwt, Strategy } = require("passport-jwt");
/**
 * middleware to check the if auth vaid
 */

module.exports = ({ config, usersRepository }) => {
  const params = {
    secretOrKey: config.authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  const strategy = new Strategy(params, (payload, done) => {
    usersRepository
      .getById(payload.id)
      .then(user => {
        done(null, user);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt");
    },
    hasPermissions: listPermission => {
      return compose()
        .use(passport.authenticate("jwt"))
        .use(function checkPermissions(req, res, next) {
          /**
           * Super Admin Role full permission.
           */
          if (req.user && req.user.roles) {
            const roles = req.user.roles.map(x => x.id);
            if (roles.indexOf(config.isSuperAdmin) !== -1) {
              return next();
            }
          }
          console.log("usersRepository: ", usersRepository.checkHasPermissions);
          usersRepository.checkHasPermissions(listPermission, req.user).then(result => {
            if (result) {
              return next();
            } else {
              return res.status(403).send("Unauthorized");
            }
          }).catch(() => {
            return res.status(403).send("Unauthorized");
          });
        });
    }
  };
};
