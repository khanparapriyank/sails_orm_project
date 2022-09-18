/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 const bcrypt = require('bcrypt-nodejs');
module.exports = {

    tableName: "users",
    autoPK: true,
    attributes: {
        name: {
            type: "string"
        },
        email: {
            type: "string"
        },
        password: {
            type: "string"
        }
    },

    customToJSON: function() {
        return _.omit(this, ['password'])
     },
     beforeCreate: function(user, cb){
       bcrypt.genSalt(10, function(err, salt){
         bcrypt.hash(user.password, salt, null, function(err, hash){
           if(err) return cb(err);
           user.password = hash;
           return cb();
         });
       });
     },
     beforeUpdate: function(user, cb){
      if (user.password) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        return cb();
      }
    }
};

