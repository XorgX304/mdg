'use strict';


function typeOptions(type, column, td,  postData) {
	switch(type) {
		case 'date-range':
			let dateRangeStart = column + 'dateRangeStart',
					dateRangeEnd = column + 'dateRangeEnd';
			// Date values of date range
			postData[dateRangeStart] = td.find('.date-range-start').val();
			postData[dateRangeEnd] = td.find('.date-range-end').val();
			return postData;
		case 'bool':
			// Boolean false percentages
			let boolPercentage = td.find('.bool-percentage').val();
			if (boolPercentage > 100 || boolPercentage < 0) {
				alert('Invalid boolean percentage');
				return
			}
			postData[column + 'boolPercentage'] = boolPercentage;
			return postData;
		case 'random-int':
			// Min & max values for range of numbers, floats
			let intRangeMin = column + 'intRangeMin',
					intRangeMax = column + 'intRangeMax';
			postData[intRangeMin] = td.find('.id-range-min').val();
			postData[intRangeMax] = td.find('.id-range-max').val();
			return postData;
		case 'random-float':
			let floatRangeMin = column + 'floatRangeMin',
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