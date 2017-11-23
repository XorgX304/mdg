'use strict';


function typeOptions(type, column, td,  postData) {
	switch(type) {
		case 'date-range':
			var dateRangeStart = column + 'dateRangeStart',
					dateRangeEnd = column + 'dateRangeEnd';
			// Date values of date range
			postData[dateRangeStart] = td.find('.date-range-start').val();
			postData[dateRangeEnd] = td.find('.date-range-end').val();
			return postData;
		case 'bool':
			// Boolean false percentages
			var boolPercentage = td.find('.bool-percentage').val();
			if (boolPercentage > 100 || boolPercentage < 0) {
				alert('Invalid boolean percentage');
				return
			}
			postData[column + 'boolPercentage'] = boolPercentage;
			return postData;
		case 'random-id':
			// Min & max values for range of numbers, floats
			var idRangeMin = column + 'idRangeMin',
					idRangeMax = column + 'idRangeMax';
			postData[idRangeMin] = td.find('.id-range-min').val();
			postData[idRangeMax] = td.find('.id-range-max').val();
			return postData;
		case 'random-float':
			var floatRangeMin = column + 'floatRangeMin',
					floatRangeMax = column + 'floatRangeMax',
					decimalLimit = column + 'decimalLimit';
			postData[floatRangeMin] = td.find('.float-range-min').val();
			postData[floatRangeMax] = td.find('.float-range-max').val();
			postData[decimalLimit] = td.find('.decimal-limit').val();
			return postData;
		case 'gender':
			// Gender male percentage
			let genderPercentage = td.find('.gender-percentage').val();
			if (genderPercentage > 100 || genderPercentage < 0) {
				alert('Invalid gender percentage');
				return
			}
			postData[column + 'genderPercentage'] = genderPercentage;
			return postData;
	}
	return postData
}