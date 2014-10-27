'use strict';

require('angular');

var app = angular.module('quotesApp', []);
var navCtrl = require('./controllers/NavCtrl.js');

app.controller('NavCtrl', ['$scope', navCtrl]);