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
  const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")
  let userObj = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required()
  })
  const schema = Joi.array().items(userObj);

  const { error } = schema.validate(req.param("users"));
	if (error) {
		return res.send(HttpStatusCode.BAD_REQUEST,error);
	} else {
		next();
	}
};
