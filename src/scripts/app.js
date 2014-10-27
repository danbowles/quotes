'use strict';

require('angular');

var app = angular.module('quotesApp', []);

// Controllers
var navCtrl = require('./controllers/NavCtrl.js');
var quoteCtrl = require('./controllers/QuoteCtrl.js');

app.controller('QuoteCtrl', ['$scope', quoteCtrl]);
app.controller('NavCtrl', ['$scope', navCtrl]);