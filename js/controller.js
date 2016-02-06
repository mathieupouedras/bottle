'use strict';

var bottlesApp = angular.module('bottlesApp', []);

bottlesApp.controller('PaintingListCtrl', function ($scope, $http) {

 $scope.categories = ['TOUTES LES BOUTEILLES', 'PERSONNAGES', 'MONUMENTS', 'OBJETS', 'ANIMAUX'];
 $scope.selectedCategory = 'TOUTES LES BOUTEILLES';

 $scope.bottles = [];
  $scope.bottlesNotPartitionned = [];

 $http.get('data/bottles.json').success(function(data) {
  $scope.bottlesNotPartitionned = data;
  $scope.bottles = partition($scope.bottlesNotPartitionned, 6);
}).error(function(data, status) {
  console.log(status);
});

$scope.categorySelected = function categorySelected(category) {
  $scope.selectedCategory = category;
  $scope.bottles = partition($scope.bottlesNotPartitionned.filter(function(bottle) {
    if ($scope.selectedCategory === 'TOUTES LES BOUTEILLES') {
      return true;
    }
    else {
      return bottle.category === $scope.selectedCategory;
    }
  }), 6); 
}

$scope.viewDetails = function(bottle) {
 $scope.view = {};

 $scope.view.bottle = bottle;

 // Main image
 $scope.view.title = bottle.number + " " + bottle.name;
 $scope.view.mainImage = bottle.image1;
 $scope.view.mainLegend = "vue 1";

 // Properties
 setPropertiesToBottle(bottle);

 // firstSideImage
 $scope.view.firstSideImage = bottle.image2;
 $scope.view.firstSideLegend = "vue 2";

 // secondSideImage
 if (bottle.taps && bottle.taps[0].image1 !== '') {
  $scope.view.secondSideImage = bottle.taps[0].image1;
  $scope.view.secondSideLegend = bottle.taps[0].number +  " " + bottle.taps[0].name;
}

};

$scope.showSecondSideImage = function showSecondSideImage() {
  var tap = $scope.view.bottle.taps[0];
  if ($scope.view.mainImage === $scope.view.bottle.image1) {
    $scope.view.mainImage = tap.image1;
    $scope.view.mainLegend = tap.number + " " + tap.name;
    $scope.view.secondSideImage = $scope.view.bottle.image1;
    $scope.view.secondSideLegend = "vue 1";

    setPropertiesToTap(tap);
  }
  else if ($scope.view.mainImage === $scope.view.bottle.image2) {
    $scope.view.mainImage = tap.image1;
    $scope.view.mainLegend = tap.number + " " + tap.name;
    $scope.view.secondSideImage = $scope.view.bottle.image2;
    $scope.view.secondSideLegend = "vue 2";

    setPropertiesToTap(tap);
  }
  else {
    // Bouchon
    if ($scope.view.secondSideImage === $scope.view.bottle.image2) {
      $scope.view.mainImage = $scope.view.bottle.image1;
      $scope.view.mainLegend = "vue 1";
    }
    else {
      $scope.view.mainImage = $scope.view.bottle.image1;
      $scope.view.mainLegend = "vue 1";
    }
    $scope.view.secondSideImage = tap.image1;
    $scope.view.secondSideLegend = tap.number + " " + tap.name;

    setPropertiesToBottle($scope.view.bottle);
  }

};

$scope.showFirstSideImage = function showFirstSideImage() {
  if ($scope.view.mainImage === $scope.view.bottle.image1) {
    $scope.view.mainImage = $scope.view.bottle.image2;
    $scope.view.mainLegend = "vue 2";
    $scope.view.firstSideImage = $scope.view.bottle.image1;
    $scope.view.firstSideLegend = "vue 1";
  }
  else if ($scope.view.mainImage === $scope.view.bottle.image2) {
    $scope.view.mainImage = $scope.view.bottle.image1;
    $scope.view.mainLegend = "vue 1";
    $scope.view.firstSideImage = $scope.view.bottle.image2;
    $scope.view.firstSideLegend = "vue 2";
  }
  else {
    //Bouchon
    var tap = $scope.view.bottle.taps[0];
    $scope.view.secondSideImage = tap.image1;
    $scope.view.secondSideLegend = tap.number + " " + tap.name;
    if ($scope.view.firstSideImage === $scope.view.bottle.image1) {
      $scope.view.firstSideImage = $scope.view.bottle.image2;
      $scope.view.firstSideLegend = "vue 2";
      $scope.view.mainImage = $scope.view.bottle.image1;
      $scope.view.mainLegend = "vue 1";
    }
    else {
      $scope.view.firstSideImage = $scope.view.bottle.image1;
      $scope.view.firstSideLegend = "vue 1";
      $scope.view.mainImage = $scope.view.bottle.image2;
      $scope.view.mainLegend = "vue 2";
    }
    setPropertiesToBottle($scope.view.bottle);
  }

};

function setPropertiesToBottle(bottle) {
 $scope.view.category = bottle.category;
 $scope.view.reference = bottle.reference;
 $scope.view.height = bottle.height;
 $scope.view.heightWithTap = bottle.heightWithTap;
 $scope.view.capacity = bottle.capacity;
 $scope.view.inscription = bottle.inscription;
 $scope.view.color = bottle.color;
 $scope.view.glass = bottle.glass;
 $scope.view.condition = bottle.condition;
}

function setPropertiesToTap(tap) {
  $scope.view.category = tap.category;
  $scope.view.reference = tap.reference;
  $scope.view.height = tap.height;
  $scope.view.heightWithTap = null;
  $scope.view.capacity = null;
  $scope.view.inscription = tap.inscription;
  $scope.view.color = tap.color;
  $scope.view.glass = tap.glass;
  $scope.view.condition = tap.condition;
}

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

