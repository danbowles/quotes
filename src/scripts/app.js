'use strict';

require('angular');

var app = angular.module('quotesApp', []);
var helloCtrl = require('./controllers/HelloCtrl.js');

app.controller('HelloCtrl', ['$scope', helloCtrl]);