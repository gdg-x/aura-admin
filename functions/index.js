const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// modules
exports.team = require('./modules/team')
