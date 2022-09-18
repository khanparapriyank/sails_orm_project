/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
const HttpStatusCode = require('http-status-codes'),
    axios = require('axios'),
    Api404Error = require('../exception/api404Error'),
    { logError, returnError } = require('../exception/errorHandler'),
    bcrypt = require('bcrypt-nodejs');

module.exports = {

    signup: function (req, res) {
        Users.create(req.param("users"))
            .then(function (result) {
                return res.ok(result);
        }).catch(function (err) {
            logError(err);
            return returnError(err, req, res);
            // return res.serverError(err);
        });
    },
    
    findOneRecord: function (req, res) {
        Users.findOne({"email": req.param("email")})
            .then(function (user) {
                if(typeof user === "undefined" || user.length === 0) {
                    throw new Api404Error("Data Not Found")
                    // return res.send(HttpStatusCode.NOT_FOUND,"User Not Found");
                }
                return res.ok(user);
        }).catch(function (err) {
            logError(err);
            return returnError(err, req, res);
            // return res.serverError(err);
        });
    },

    findAllRecords: function (req, res) {
        Users.find()
            .then(function (users){
                return res.ok(users);
        }).catch(function (err) {
            return res.serverError(err);
        })
    },

    countRecord: function (req, res) {
        Users.count()
            .then(function(usersCount){
                return res.ok({total_users: usersCount});
        }).catch(function (err) {
            return res.serverError(err);
        });
    },

    updateRecord: function (req, res) {
        Users.update({email: req.param('email')}, {password: req.param('new_password')})
            .then(function (updatedResult) {
                return res.ok(updatedResult);
        }).catch(function (err) {
            return res.serverError(err);
        });
    },

    deleteRecord: function (req, res) {
        Users.destroy({email: req.param('email')})
            .then(function (user) {
                if(typeof user === "undefined" || user.length === 0) {
                    throw new Api404Error("Data Not Found")
                    // return res.send(HttpStatusCode.NOT_FOUND,"User Not Found");
                }
                return res.ok(user);
        }).catch(function (err) {
            return res.serverError(err);
        });
    },

    login: function (req, res) {
        let loginRes = res;
        let loginReq = req;
        let self = this;
        const UserData = Users;
        
        Users.findOne({"email": loginReq.param("email")})
            .then(function (user) {
			if(!user) return loginRes.send(HttpStatusCode.NOT_FOUND,"User Not Found");
			bcrypt.compare(loginReq.param("password"), user.password, function(err, loginRes){
				if(!loginRes) return loginRes.send(HttpStatusCode.UNAUTHORIZED,"Invalid email/password!");
                self.setLogin(req, res);
			});
		});
    },

    setLogin: function (req, res) {
        console.log(req.param);
        Users.update({"email": req.param("email")}, {is_login: true})
            .then(function (user) {
                return res.send(HttpStatusCode.OK,"Successfully login!");
        }).catch(function (err) {
            return res.serverError(err);
        });
    },

    countLogin: function (req, res) {
        Users.count({is_login : true})
            .then(function(usersCount){
            return res.ok({total_login_users: usersCount});
        }).catch(function (err) {
            return res.serverError(err);
        });
    },

    profile: function (req, res) {
        let passParam = typeof req.param("email") === "undefined" ? {is_login : true} : {is_login : true, email :  req.param("email")}
        Users.find(passParam)
            .then(function (user) {
                if(typeof user === "undefined" || user.length == 0) {
                    return res.send(HttpStatusCode.UNAUTHORIZED,"Unauthenticated! Invalid session!");
                }
                return res.ok(user);
        }).catch(function (err) {
            return res.serverError(err);
        });
    },

    logout: function (req, res) {
        Users.update({"email": req.param("email"), "is_login" : true}, {is_login: false})
            .then(function (user) {
                if(user.length === 0) {
                    return res.send(HttpStatusCode.UNAUTHORIZED,"Unauthenticated! Invalid session!");
                }
                return res.send(HttpStatusCode.OK,"Successfully logout!");
        }).catch(function (err) {
            return res.serverError(err);
        });
    },

    randomJoke: function (req, res) {
        axios.get('https://api.chucknorris.io/jokes/random')
        .then((response) => {
            if(!(response && response.data)) {
                throw new Api404Error("Data Not Found")
                // return res.send(HttpStatusCode.NOT_FOUND,"Data Not Found");
            }
            return res.ok(response.data);
        }).catch(function (err) {
            return res.serverError(err);
        });
    },
	
};
