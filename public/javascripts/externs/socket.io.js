
var io = {};


io.connect = function (host, details) {};


/**
 * @constructor
 */
io.SocketNamespace = function(socket, name) {};


/**
 * @param {string} name
 * @param {...} varargs
 */
io.SocketNamespace.prototype.emit = function(name, varargs) {};


/**
 * @param {string} name
 * @param {Function} callback
 */
io.SocketNamespace.prototype.on = function(name, callback) {};
