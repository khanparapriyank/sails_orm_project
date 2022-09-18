/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
const Joi = require("joi"),
 HttpStatusCode = require('http-status-codes');   

module.exports = function(req, res, next) {
  let schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  const { error } = schema.validate(req.body);
	if (error) {
		return res.send(HttpStatusCode.BAD_REQUEST,error);
	} else {
		next();
	}
};
