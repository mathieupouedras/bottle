var bottlesApp = angular.module('bottlesApp', []);

bottlesApp.controller('PaintingListCtrl', function ($scope, $http, $sce) {

 $scope.bottles = [];

$http.get('data/bottles.json').success(function(data) {
  $scope.bottles = data;
  $scope.bottles = partition($scope.bottles, 6);
	$scope.current = $scope.bottles[3];
	}).error(function(data, status) {
		console.log(status);
	});

	$scope.open = function(bottle) {
	    $scope.current = bottle;
	    $scope.taps = [];
	    if (bottle.taps) {
	      for (var i = 0; i < bottle.taps.length; i++) {
	        if (bottle.taps[i].image1) {
	          $scope.taps.push(bottle.taps[i]);
	        }
	      }
	    }
	};
	
		$scope.open2 = function(bottle) {
		  $scope.taps.push($scope.current);
		  console.log($scope.taps.indexOf(bottle));
		  $scope.taps.splice($scope.taps.indexOf(bottle), 1);
		  $scope.current = bottle;
	};


});

function partition(arr, size) {
	arr = arr.filter(function(element) {
		return element.image1;
	});
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
  	newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}