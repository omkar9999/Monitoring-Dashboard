var App = angular.module('myApp.login', ['ngRoute']);

//LoginCtrl.$inject = ['$window', 'loginSrv', 'notify'];

App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'testCtrl'
  });
}])
.controller('testCtrl',['$scope','$window',
  function($scope,$window) {
    console.log('testCtrl called');
     $scope.isLogged = false;
     $scope.loginError = false;
     $scope.authenticate = function(loginInfo){
          if(loginInfo!==null&&loginInfo.username!==null&&loginInfo.username==='omkar.9999'&&loginInfo.password!==null&&loginInfo.password==='omkar123'){
           console.log('Authenticated');
              $window.location.href = '/#!/view2';
           }else{     
            $scope.loginError = true;
            console.log('Wrong Username');
           } 

     };

}
])

