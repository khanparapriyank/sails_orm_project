const HttpStatusCode = require('http-status-codes'),
 BaseError = require('./baseError')

class Api404Error extends BaseError {
    constructor (
        name,
        statusCode = HttpStatusCode.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = Api404Error