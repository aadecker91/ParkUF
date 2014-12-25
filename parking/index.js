
var ParkingLot = function () {
	this.data = {
		number: null,
		name: null,
		decal: null,
		spotsOpen: null,
		spotsTotal: null,
		beginEnforcement: null,
		endEnforcement: null
	};

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.triggerCarExit = function () {
		this.data.spotsOpen++;
	};

	this.triggerCarEntry = function () {
		this.data.spotsOpen--;
	};

	this.getInformation = function () {
		return this.data;
	};
};

module.exports = function (info) {
	var instance = new ParkingLot();

	instance.fill(info);

	return instance;
};