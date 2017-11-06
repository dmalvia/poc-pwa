var app = angular.module('pwa-app',['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/login.html"
    })
    .when("/dashboard", {
        templateUrl : "templates/dashboard.html"
    })
    .otherwise({redirectTo: '/'});
});
// app.run(function($rootScope,$location) {
// 	$rootScope.$on("$locationChangeStart", function(event,next,current) {
// 		if($rootScope.loginFlag) {
// 			$location.path('/dashboard.html');
// 			$rootScope.loginFlag = false;
// 		}
// 		else {
// 			$location.path('');
// 		}
// 	});
// })


app.controller('mainCtrl',function($location,$rootScope) {
	var vm = this;
	vm.init = function() {
		vm.display = true;
		vm.appCredentials = {
			username : 'admin',
			password : 'admin'
		}
	}

	vm.login = function() {
		if(vm.uName == vm.appCredentials.username && vm.uPass == vm.appCredentials.password) {
			$rootScope.loginFlag = true;
			//$location.path('/dashboard.html');
			console.log("logged in successful");
		}
		else {
			console.log("Invalid Credentials");
		}
	}

	vm.init();
});



var branchApi = 'https://apis-bank-test.apigee.net/apis/v2/locations/branches';

function loadBranches() {
	fetch(branchApi, {
		header : {
			'Access-Control-Allow-Origin':'*',
			mode:'cors'
		}
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		console.log(data);
	})	
}