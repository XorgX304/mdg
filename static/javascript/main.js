'use strict';


$(function () {

	// Variables after page load
	var rowContainer = $('.row-container'),
		form = $('#main-form'),
		tooltip = $('#tooltip');

	// Prevent default behaviour of tooltip click
	tooltip.on('click', function (event) {
		event.preventDefault()
	});

	// Call add new field function
	$("#add-new").on('click', function (event) {
		addNewField();
		event.preventDefault();
	});

	// Remove current row
	rowContainer.on('click', '.btn.btn-sm', function (event) {
		$(this).parent().parent().remove();
		event.preventDefault();
	});

	// Prevent form submission and call checkInputDuplication function
	form.on('submit', function (event) {
		event.preventDefault();
		checkInputDuplication();
	});

	// Remove all alerts about column name duplication on keyup from column name input
	$('.row-body').on('keyup', '.form-control', function () {
		$.each($('.form-control'), function (i, item) {
			$(item).css('background-color', 'white');
			$('.alert-danger').remove();
		});
	});

	// Remove download button after click and restore `Generate Data` button
	form.on('click', '#download > a', function (e) {
		e.preventDefault();
		var file = $('#download > a').attr('title');
		$(this).parent().remove();
		$('#generate-data').show();
		window.open(bucketUrl + file);
	});

	// Add/Remove additional options per DATA type, change data type image and tooltip message.
	$('#data-type').on('change', function () {
		var dataImg = $('#data-img'),
				wrapContainer = $('.wrap-container');
		switch ($(this).val()) {
		case 'sql':
			removeExtraOptions();
			dataImg.attr('src', '/images/sql.png');
			tooltip.attr('title', '* Checking the "Create Table" box will also include the "DROP TABLE IF EXISTS"' +
					' statement.\r\n* Avoid using SQL keywords such as NULL, TABLE or COLUMN in in table/column name');
			wrapContainer.append(tableNameInput);
			wrapContainer.append(createTable);
			break;
		case 'json':
			removeExtraOptions();
			dataImg.attr('src', '/images/json.png');
			tooltip.attr('title', '* Use --jsonArray flag with MongoDB to import the file to a collection.');
			break;
		case 'csv':
			removeExtraOptions();
			dataImg.attr('src', '/images/csv.png');
			tooltip.attr('title', '');
			wrapContainer.append(delimiter);
			break;
		case 'xml':
			removeExtraOptions();
			dataImg.attr('src', '/images/xml.png');
			tooltip.attr('title', '* Avoid using the \'&\' sign in column/node name. This makes for an valid XML file.\r\n' +
														'* XML is the slowest to generate. Be patient :)');
			wrapContainer.append(xmlNode);
			break;
		}
	});

	// Add/Remove additional options per FIELD type on change
	rowContainer.on('change', 'select', function () {
		let options = $(this).parent().next();
		options.text('');
		switch ($(this).val()) {
		case 'date-range':
			options.append(dateInput);
			break;
		case 'bool':
			options.append(boolInput);
			break;
		case 'random-id':
			options.append(idRange);
			break;
		case 'random-float':
			options.append(floatRange);
			break;
		case 'gender':
			options.append(genderInput);
			break;
		case 'color':
			options.append(colorFormat);
			break;
		}
	});

	// Call remove alerts if page was rendered with such
	if ($('.alert')) {
		removeAlerts()
	}

	// Register button drop
	$('#bad-login-register').on('click', function (e) {
		e.stopPropagation();
		$('#reg-btn').toggleClass('show')
	});
});


/*
--------- Functions and main AJAX request ---------
 */


// Remove all alert divs after 5 seconds
function removeAlerts() {
	setTimeout(function () {
		$('.error').remove();
		$('.successful').remove();
	}, 10000)
}

// Remove extra options on data type change
function removeExtraOptions() {
	$('#table-name-row').remove();
	$('#create-table-row').remove();
	$('#xml-node-row').remove();
	$('#delimiter').remove();
}

// Add new field / header / column
function addNewField() {
	if ($('.row-body > .row').length === 10) {
		$('.alert-danger').remove();
		$('#main-form').before(maxCols);
		setTimeout(function () {
			$('.alert-danger').remove();
		}, 6000)
	} else {
		$('.row-body').append(rowContent);
	}
}

// Test for duplication in column names. If none, call generateMockData
function checkInputDuplication() {
	var inputs = $('.row-input'),
		uniques = [];
	$.each(inputs, function (i, item) {
		if (uniques.indexOf($(item).val()) !== -1) {
			$(item).css('background-color', 'red');
			if ($('#warning-msg').length === 0) {
				$('#main-form').before(alertMsg)
			}
		} else {
			uniques.push($(item).val())
		}
	});
	if (inputs.length === uniques.length) {
		generateMockData()
	}
}


// Loader placeholder for file generation
function downloadPlaceHolder() {
	$('#generate-data').hide();
	$('.final').append(loader);
	setTimeout(function() {
		$('#loader').text('Uploading...')
	}, 8000)
}

// Remove placeholder and display download button
function displayDownload(file) {
	$('#loader').remove();
	$('.final').append(downloadBtn);
	$('#download').find('a').attr('title', file)
}

function displayErrorMsg(message) {
	$('#loader').remove();
	$('#guest-limit').remove();
	$('.final').append(message);
	setTimeout(function () {
		$('.final').empty();
		$('#generate-data').show()
	}, 5000);
}


// AJAX request to server to generate file with data from form
function generateMockData() {
	var postData = {};
	// Extract column name & type from each table row
	$('.row-body').find('.row').each(function (index, row) {
		var td = $(this), // Current table cell to extract values from
				column = $(row).find('input').val(), // Column name
				type = $(row).find('select').val(); // Generated type
		if (column.includes(' ')) {
			column = column.split(' ').join('') // Remove white space from column name (causes invalid JSON & XML)
		}
		// Checking for special types & additional options
		postData = typeOptions(type, column, td, postData);
		postData[column] = type;
	});
	// Get data type, number of rows, file name & additional options
	postData.dataType = '.' + $('#data-type').val();
	if (postData.dataType === '.sql') {
		postData.tableName = $('#table-name').val();
		postData.createTable = $('#create-table').is(":checked");
	} else if (postData.dataType === '.xml') {
		postData.xmlNode = $('#xml-node').val();
	} else if (postData.dataType === '.csv') {
		postData.delimiter = $('.delimiter').val();
	}
	postData.numRows = $('#num-rows').val();
	postData.fileName = $('#file-name').val();
	// Call DownloadPlaceHolder until server responds with the download link
	downloadPlaceHolder();
	$.ajax({
		'type': 'POST',
		'url': '/generate',
		'data': postData,
		success: function (file) {
			displayDownload(file)
		},
		error: function (err) {
			if (err.status === 401) {
				displayErrorMsg(guestRowLimit);
			} else if (err.status === 429) {
				displayErrorMsg(requestLimit)
			} else {
				displayErrorMsg(generalErr)
			}
		}
	});
	return false
}

