
/**
 */
var io = {};


/**
 */
io.connect = function (host, details) {};


/**
 * @constructor
 */
io.SocketNamespace = function(socket, name) {};


/**
 * Send this data to the socket.io server.
 * @param {string} name is a string identifier for the event.
 * @param {...} varargs
 */
io.SocketNamespace.prototype.emit = function(name, varargs) {};
