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
    appCtrl.config = {
    	"baseURI": "http://127.0.0.1:3000/bankapi/"
    }
    appCtrl.serviceTypes = [{ id: "product", type: "Products" }, { id: "atm", type: "ATM's" }, { id: "branch", type: "Branches" }, { id: "label", type: "Labels" }];
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

    appCtrl.fetchServiceData = function(type) {
        fetch(appCtrl.config.baseURI+ "services/"+ type, {
                header: {}
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                appCtrl.data = data.data;
                console.log(data);
            })
    }

    appCtrl.init();
});