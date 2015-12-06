var bottlesApp = angular.module('bottlesApp', []);

bottlesApp.controller('PaintingListCtrl', function ($scope, $http) {

 $scope.bottles = [];

 $http.get('data/bottles.json').success(function(data) {
  $scope.bottles = data;
  $scope.bottles = partition($scope.bottles, 6);
  $scope.current = $scope.bottles[3];
}).error(function(data, status) {
  console.log(status);
});

$scope.viewDetails = function(bottle) {
 $scope.bottle = bottle;
 $scope.current = bottle;
 $scope.currentTitle = bottle.name;
 $scope.currentNumber = bottle.number;
 $scope.tap = $scope.bottle.taps && $scope.bottle.taps[0];
 $scope.secondBottleImage = bottle.image2;
 $scope.mainBottleImage = bottle.image1;
};

$scope.showTap = function showTap() {
  $scope.currentTitle = $scope.current.taps[0].name;
  $scope.currentNumber = $scope.current.taps[0].number;
  $scope.current = $scope.current.taps[0];
  if ($scope.secondBottleImage === $scope.bottle.image1) {
    $scope.secondBottleImage = $scope.bottle.image2;
  }
  else {
    $scope.secondBottleImage = $scope.bottle.image1;
  }
  $scope.mainBottleImage = $scope.tap.image1;
  $scope.tap = null;
};

$scope.changeBottleImage = function changeBottleImage() {
  $scope.currentTitle = $scope.bottle.name;
  $scope.currentNumber = $scope.bottle.number;
  $scope.current = $scope.bottle;
  if ($scope.secondBottleImage === $scope.bottle.image1) {
    $scope.secondBottleImage = $scope.bottle.image2;
    $scope.mainBottleImage =   $scope.bottle.image1;
  }
  else {
    $scope.secondBottleImage = $scope.bottle.image1;
    $scope.mainBottleImage = $scope.bottle.image2;
  }
  $scope.tap = $scope.bottle.taps && $scope.bottle.taps[0];
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
