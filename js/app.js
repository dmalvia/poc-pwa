var app = angular.module('pwa-app', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'templates/login.html',
            controller: 'rootCtrl as appCtrl',
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            controller: 'rootCtrl as appCtrl',
        });
});

app.controller('rootCtrl', function($state) {
    var appCtrl = this;
    appCtrl.serviceTypes = [{id: "product", type: "Products"}, {id: "atm", type: "ATM's"}, {id: "branch", type: "Branches"}, {id: "label", type: "Labels"}];
    appCtrl.init = function() {
        appCtrl.display = true;
        appCtrl.appCredentials = {
            username: 'admin',
            password: 'admin'
        }
    }

    appCtrl.login = function() {
        if (appCtrl.uName == appCtrl.appCredentials.username && appCtrl.uPass == appCtrl.appCredentials.password) {
            $state.go('dashboard', { 'type': 'branches', });
        } else {
            console.log("Invalid Credentials");
        }
    }

    var branchApi = 'https://crossorigin.me/https://apis-bank-test.apigee.net/apis/v2/locations/branches';

    appCtrl.fetchServiceData = function(type) {
        fetch(branchApi, {
                header: {
                    'Access-Control-Allow-Origin': '*',
                    mode: 'cors',
                    origin:'http://127.0.0.1:8080'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
            })
    }

    appCtrl.init();
});