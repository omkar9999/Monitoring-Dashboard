var App = angular.module('myApp.login', ['ngRoute']);

//LoginCtrl.$inject = ['$window', 'loginSrv', 'notify'];

App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'testCtrl'
  });
}])
.controller('testCtrl',['$scope','$window','$http','$q','$location','$rootScope',
  function($scope,$window, $http,$q,$location,$rootScope) {
    console.log('testCtrl called');
     $scope.isLogged = false;
     $scope.loginError = false;
	 $rootScope.userDetails;
     $scope.authenticate = function(loginInfo){
          if(loginInfo!==null&&loginInfo.username!==null&&loginInfo.password!==null){
			  console.log(loginInfo.username);
              $scope.fetchUserDetails(loginInfo).then(function()  {
				 console.log($scope.isLogged);
				 if($scope.isLogged){
				  console.log('Authenticated');
			      //$window.location.href = '/#!/view2';
                  $location.path('view2');				  
				 }
			  });
           }else{     
            $scope.loginError = true;
            console.log('Wrong Username');
           } 

     };
	 
	 $scope.fetchUserDetails = function(loginInfo){
		 var defered = $q.defer()
		 $http.get("http://localhost:8080/user/search/findByUserName?user="+loginInfo.username)
			  .success(function(response)  {
				  console.log('Getting User Data');
				  console.log(response);
				  $rootScope.userDetails = response;
				  console.log(response.password);
				  var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
                  hashObj.update(loginInfo.password);
                  var hash = hashObj.getHash("HEX");
                  var hashedPassword = hash;
                  console.log(hashedPassword);
				  if(response.password === hashedPassword){
					  $scope.isLogged=true;
					  defered.resolve($scope.isLogged);
				  }else{
					  $scope.loginError = true;
                      console.log('Wrong Password');
					  $scope.isLogged=false;
					  defered.resolve($scope.isLogged);
				  }
              }).error(function() {
				console.log('Error in getting User Details')
				$scope.isLogged=false; 
                defered.resolve($scope.isLogged);                
			  });    
			  
        return defered.promise;
     }	 

}
])

