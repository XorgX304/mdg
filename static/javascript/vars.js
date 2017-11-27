var downloadBtn = '<p style="display: inline-block; font-size: 14px; text-align: left;"' +
	' id="download"><a href="#"><button class="btn btn-secondary btn-success">' +
	'<i class="fa fa-download"></i></button></a></p>';

var floatRange = '<p style="font-size: 14px; text-align: left;">Min<input min="0" max="10000000" value="1" type="number"' +
	' class="float-range-min"' + ' required="required">Max' + '<input type="number" min="0" max="10000000"' +
	' value="10" class="float-range-max" required="required"></p>';

var intRange = '<p style="font-size: 14px; text-align: left;">Min' +
	'<input min="0" max="10000000000" value="1" type="number" class="id-range-min" required="required">Max' +
	'<input min="0" max="10000000000" value="1000" type="number" class="id-range-max" required="required"></p>';

var boolInput = '<p style="font-size: 14px; text-align: left;">% Of false value' +
	'<input min="0" max="100" value="50" type="number" required="required"' +
	' class="bool-percentage"></p>';

var genderInput = '<p style="font-size: 14px; text-align: left;">% Of Male' +
	' <input min="0" max="100" value="50" type="number" required="required"' +
	' class="gender-percentage"></p>';

var dateInput = '<p style="font-size: 14px; text-align: left;"><strong>From</strong>' +
	'<input class="date-range-start" required="required" type="date"><strong>To</strong>' +
	'<input class="date-range-end" required="required" type="date"></p>';

var rowContent = '<div class="row text-center">\n' +
		' <div class="col-md-3">\n' +
		' <input required="required" type="text" placeholder="Enter Column Name" class="form-control row-input"/>\n' +
		' </div>\n' +
		' <div class="col-md-2">\n' +
		' <select required="required" class="form-control-sm">\n' +
		' <option disabled="disabled" selected="selected" value="">Choose Data Type</option>\n' +
		' <optgroup label="ID"></optgroup>\n' +
		' <option value="auto-increment">Auto Increment Id</option>\n' +
		' <option value="uuid">UUID</option>\n' +
		' <optgroup label="Numbers"></optgroup>\n' +
		' <option value="random-int">Number</option>\n' +
		' <option value="random-float">Float</option>\n' +
		' <optgroup label="Names"></optgroup>\n' +
		' <option value="first-names">First Names</option>\n' +
		' <option value="last-names">Last Names</option>\n' +
		' <optgroup label="Address"></optgroup>\n' +
		' <option value="zipcode">Zipcode</option>\n' +
		' <option value="country">Country</option>\n' +
		' <option value="lat">Latitude</option>\n' +
		' <option value="long">Longitude</option>\n' +
		' <option value="street-name">Street Name</option>\n' +
		' <option value="street-addr">Address</option>\n' +
		' <option value="phone">Phone Number</option>\n' +
		' <optgroup label="Internet"></optgroup>\n' +
		' <option value="email">Email</option>\n' +
		' <option value="username">Username</option>\n' +
		' <option value="company">Company</option>\n' +
		' <option value="domain">Domain</option>\n' +
		' <option value="url">URL</option>\n' +
		' <option value="ip">IPv4</option>\n' +
		' <option value="ipv6">IPv6</option>\n' +
		'<optgroup label="Finance"></optgroup>\n' +
		'<option value="cc-number">Credit Card Number</option>\n' +
		'<option value="cc-type">Credit Card Type</option>\n' +
		'<option value="cc-exp">Expiry Date</option>\n' +
		'<option value="cvv">CVV</option>\n' +
		'<option value="balance">Balance</option>' +
	' <optgroup label="Date"></optgroup>\n' +
	' <option value="rand-date">Date</option>\n' +
	' <option value="date-range">Date Range</option>\n' +
	' <option value="weekday">Weekday</option>\n' +
	' <option value="month">Month</option>\n' +
	' <option value="timestamp">Timestamp</option>\n' +
	'<optgroup label="Color"></optgroup>\n' +
    '<option value="color-name">Color Name</option>\n' +
    '<option value="hex">Hex </option>\n' +
   '<option value="shorthex">Short Hex</option>\n' +
    '<option value="rgb">RGB</option>\n' +
    '<option value="rgba">RGBA </option>\n' +
	' <optgroup label="Other"></optgroup>\n' +
	' <option value="gender">Gender</option>\n' +
	' <option value="null-val">Null</option>\n' +
	' <option value="bool">Boolean</option>\n' +
	' </select>\n' +
	' </div>\n' +
	' <div class="col-md-4"></div>\n' +
	' <div class="col-md-1"><a href="#" class="btn btn-sm"><i class="fa fa-times fa-lg"></i></a></div>\n' +
	'</div>';

var tableNameInput = '<div id="table-name-row" class="row text-left extra-options">\n' +
	'  <div class="col-sm-4">\n' +
	'    <label for="table-name" id="table-name-label">Table Name</label>\n' +
	'<input id="table-name" type="text" name="table-name" required="required" style="width: 120px; margin: 3px 3px 3px 3px; height: 70%;"/>\n' +
	'  </div></div>';

var createTable = '<div id="create-table-row" class="row text-left extra-options">\n' +
	'  <div class="col-sm-4">\n' +
	'    <input id="create-table" type="checkbox" name="create-table" style="margin-right: 3px; height: 70%;"/>\n' +
	'    <label for="create-table" id="create-table-label">Create Table Statement</label>\n' +
	'  </div>\n' +
	'</div>';

var delimiter = '<div id="delimiter" class="row text-left extra-options"><div class="col-sm-4">\n' +
		'<label for="delimiter">Delimiter</label>' +
		'  <select required="required" class="form-control-sm delimiter">\n' +
		'    <option value="comma">Comma</option>\n' +
		'    <option value="tab">Tab</option>\n' +
		'    <option value="pipe">Pipe</option>\n' +
		'    <option value="semi">Semi colon</option>\n' +
		'    <option value="caret">Caret</option>\n' +
		'  </select></div></div>';

var alertMsg = '<div class="alert alert-danger">Duplicate headers are not allowed</div>';

var maxCols = '<div class="alert alert-danger">Maximum number of columns reached</div>';

var generalErr = '<div class="alert alert-danger">Oops ! Something went wrong. Please try again</div>';

var requestLimit = '<div class="alert alert-danger">Please limit your data generation requests to reasonable amount. Try again in 10 minutes.</div>';

var loader = '<div id="loader" class="loader">Generating...</div>';

var bucketUrl = 'https://storage.googleapis.com/mockdatagen_files/';

var sqlExtension = '<div id="sql-extension" class="row text-left extra-options">\n  <div class="col-sm-4">\n<label style="margin-right: 8px;">File Extension</label>    <input id="sql-text" type="radio" name="sql-extension" value=".txt" style="margin-right: 3px;" required/>\n    <label for="sql-text" >.txt</label>\n<input id="sql-sql" type="radio" name="sql-extension" value=".sql" style="margin-right: 3px;"/>\n<label for="sql-sql" >.sql</label>\n  </div>\n</div>'

var rootNode = '<div class="row text-left extra-options">\n' +
               '<div class="col-sm-4"><label for="root-node" id="root-node-label">Root Node </label>\n' +
               '<input id="root-node" name="root-node" required="required" value="root"\n' +
               'style="width: 120px; margin: 3px 3px 3px 3px; height: 70%;;"/>\n</div></div>\n';

var recordNode = '<div class="row text-left extra-options">\n' +
								 '<div class="col-sm-4"><label for="record-node" id="record-node-label">Record Node</label>\n' +
                 '<input id="record-node" name="record-node" required="required" value="record"\n' +
                 'style="width: 120px; margin: 3px 3px 3px 3px; height: 70%;;"/>\n</div>\n</div>'

var verificationSent = '<div class="alert alert-success">' +
			'Verification email send successfully. Please check your email for further instructions.</div>'