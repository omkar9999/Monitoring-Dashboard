var App = angular.module('myApp.view2', ['ngRoute','ngMaterial']);


App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.controller('View2Ctrl', ['$scope','$http','$mdDialog',
  function($scope, $http, $mdDialog) {

    $scope.loading=true;
    $scope.inputCounter = 0;   

     $scope.inputs = [{
      id: 'input',
      url : '',
      scheduledMin : '',
      typeOfOperation : "GET"
     }];

$scope.submitMyForm=function(){ 
/* while compiling form , angular created this object*/ 
var data=$scope.myForm; 
console.log(data);
/* post to server*/ 
//$http.post(url, data); 
} 

   
    $scope.add = function() {
      $scope.inputTemplate = {
        id: 'input-' + $scope.inputCounter,
        name: '',
        typeOfOperation : "GET"
      };
      $scope.inputCounter += 1;
      $scope.inputs.push($scope.inputTemplate);
    };
 
      
    $scope.save = function() {
        console.log('Saved');
         //var data=angular.toJson($scope.inputs); 
        var services = { services : $scope.inputs};
        var data =angular.toJson(services);
        console.log(data);
var config = {headers: {'Content-Type': 'application/json'}};
//TODO Change the below url get it from User self link
$http.patch("http://localhost:8080/user/57e3bc72bed7b1c65671bbc3",data,config).success(function(response) {
      console.log(response.data);
     
    }).error(function() {
         console.log('error') })         

};
 

    $scope.remove = function(id) {
      console.log(id);
      for (var i = 0; i < $scope.inputs.length; i++){
        console.log($scope.inputs[i].id);
             console.log('$scope.inputs'+$scope.inputs.length);
            if($scope.inputs[i].id == id) {
                $scope.inputs.splice(i,1);                
            }
             console.log('$scope.inputs'+$scope.inputs.length);
        }
 };

    $scope.loading = function(url) {
$scope.isLoading = true;
//"http://services.groupkt.com/country/get/iso2code/IN"
$http.get(url)
    .success(function(response) {
      $scope.data = response.data;
     
    }).error(function() {
         console.log('error');
         $scope.isLoading=false;
         $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Test Result')
        .textContent("Error")
        .ariaLabel('Alert Dialog Demo')
        .ok('BACK')
        
    );
    }).finally(function () {
        $scope.isLoading=false;
        
    }).then(function(response) {
     $scope.data = response.data;
          console.log($scope.data);
$mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Test Result')
        .textContent($scope.data)
        .ariaLabel('Alert Dialog Demo')
        .ok('BACK')
        
    );

     })
    

    };

  }
])

