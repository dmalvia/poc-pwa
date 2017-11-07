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

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(function(registration) {
                var serviceWorker;
                if (registration.installing) {
                    serviceWorker = registration.installing;
                } else if (registration.waiting) {
                    serviceWorker = registration.waiting;
                } else if (registration.active) {
                    serviceWorker = registration.active;
                }

                if (serviceWorker) {
                    console.log("ServiceWorker phase:", serviceWorker.state);

                    serviceWorker.addEventListener('statechange', function(e) {
                        console.log("ServiceWorker phase:", e.target.state);
                    });
                }
            }).catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    }
});

app.controller('rootCtrl', function($scope, $state) {
    var appCtrl = this;
    // appCtrl.fetchServiceData('product');
    appCtrl.dispProp = {
        product: true,
        atm: false,
        branch: false,
        label:false
    }
    appCtrl.config = {
        "baseURI": "http://127.0.0.1:3000/bankapi/"
    }
    appCtrl.serviceTypes = [{ id: "product", type: "Products", class: "prod box", icon: "gift" }, { id: "atm", type: "ATM's", class: "atm box", icon: "map-marker" }, { id: "branch", type: "Branches", class: "branch box", icon: "edit" }, { id: "label", type: "Labels", class: "labelbx box", icon: "stats" }];
    appCtrl.init = function() {
        appCtrl.display = true;
        appCtrl.appCredentials = {
            username: 'admin',
            password: 'admin'
        };
        appCtrl.activeMenu = appCtrl.serviceTypes[0].type;
        appCtrl.fetchServiceData('product');
    }

    appCtrl.setActive = function(menuItem) {
        appCtrl.activeMenu = menuItem
    }

    appCtrl.login = function() {
        if (appCtrl.uName == appCtrl.appCredentials.username && appCtrl.uPass == appCtrl.appCredentials.password) {
            $state.go('dashboard', { 'type': 'branches', });
        } else {
            console.log("Invalid Credentials");
        }
    }

    appCtrl.fetchServiceData = function(type) {
        appCtrl.dispProp = {};
        appCtrl.dispProp[type] = true;
        fetch(appCtrl.config.baseURI + "services/" + type, {
                header: {}
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                appCtrl.data = data.data;
                console.log(appCtrl.data);
                $scope.$apply();
            })
    }

    appCtrl.init();
});