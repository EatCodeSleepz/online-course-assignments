const UserService = require('./UserService');
const log = require('../log/ConsoleLogger')('UserController');

module.exports.create = function create(req, res) {
    console.log('UserController.create');
    UserService.create();
};
