
/*
 * GET home page.
 */

var ParkingSchema = require('../schemas/parking');

module.exports = function (parking) {
	var park = require('../parking');

	for(var number in parking) {
		parking[number] = park(parking[number]);
	}

	var functions = {};

	functions.parking = function(req, res){
		var number = req.param('number');

		if (typeof parking[number] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			res.json(parking[number].getInformation());
		}
	};

	functions.entry = function (req, res) {
		var number = req.param('number');

		if (typeof parking[number] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			parking[number].triggerCarEntry();

			var record = new ParkingSchema(
				parking[number].getInformation()
			);

			record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				} else {
					res.json({status: 'success'});
				}
			});

			res.json({status: 'done'});
		}
	};

	functions.exit = function (req, res) {
		var number = req.param('number');

		if (typeof parking[number] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			parking[number].triggerCarExit();

			var record = new ParkingSchema(
				parking[number].getInformation()
			);

			record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				} else {
					res.json({status: 'success'});
				}
			});

			res.json({status: 'done'});
		}
	};

	// functions.list = function (req, res) {
	// 	res.render('list', {
	// 		title: 'All Parking', 
	// 		parking: parking});
	// };

	functions.listjson = function (req, res) {
		var parkingData = [];

		for(var number in parking) {
			parkingData.push(parking[number].getInformation());
		}

		res.json(parkingData);
	};

	// functions.arrivals = function(req, res) {
	// 	ParkingSchema.find()
	// 	.setOptions({sort: 'actualArrive'})
	// 	.exec(function(err, arrivals) {
	// 		if (err) {
	// 			res.status(500).json({status: 'failure'});
	// 		} else {
	// 			res.render('arrivals', {
	// 				title: 'Arrivals',
	// 				arrivals: arrivals
	// 			});
	// 		}
	// 	});
	// };

	return functions;
};
