var parse = require('csv-parse');
var fs = require('fs');
var bottles;

fs.readFile('/Users/mpouedras/dev/benjamin/data/01BOUTEILLES5.csv', 'utf8', function(err, dataCSV) {
	if (err) {
		return console.log(err);
	}
	parse(dataCSV, {delimiter: ';'}, function(err, dataJSON) {
		if (err) {
			console.log(err);
		}
		bottles = cleanJSON(dataJSON);
		console.log(JSON.stringify(bottles, null, 2));
	});
});



function cleanJSON(data) {
	var bottles = [];
	data.shift(); // Headers
	var bottle;
	for (i = 0; i < data.length; i++) {
		object = createObject(data[i]);
		var number = data[i][0];
		if (isTap(number)) {
			if (!bottle.taps) {
				bottle.taps = [];
			}
			bottle.taps.push(object);
		}
		else {
			bottle = object;
			bottles.push(bottle);
		}
	}
	return bottles;
}

function createObject(bottleArray) {
	var object = {};
	object.number = bottleArray[0]; 
	object.name = bottleArray[1];
	object.image1 = bottleArray[2] && bottleArray[2] + '.jpg';
	object.image2 = bottleArray[3] && bottleArray[3] + '.jpg';
	object.category = bottleArray[4];
	object.reference = bottleArray[5];
	object.height = bottleArray[6];
	object.heightWithTap = bottleArray[7];
	object.capacityInML = bottleArray[8];
	object.inscription = bottleArray[9];
	object.color = bottleArray[10];
	object.glass = bottleArray[11];
	object.condition = bottleArray[12];
	object.purchaseLocation = bottleArray[13];
	object.purchaseDate = bottleArray[14];
	object.purchasePrice = bottleArray[15];

	for (var key in object) {
  		if (object.hasOwnProperty(key)) {
  			if (!isInterestingValue(object[key])) {
    			delete object[key];
    		}
  		}
	}

	return object;
}

function isInterestingValue(value) {
	if (!value) return true;

	var uselessValues = ['N/A', '?'];
	return uselessValues.indexOf(value) === -1;
}

function isTap(number) {
	return endsWith(number, 'BIS');
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


