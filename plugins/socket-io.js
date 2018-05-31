import Vue from 'vue'

// io.sails.environment = process.env.NODE_ENV || 'development';
const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
const io = sailsIOClient(socketIOClient);
const Sails = require('vue-sails');
io.sails.url = 'http://18.236.65.253:1338/';

Vue.use(Sails, io)
