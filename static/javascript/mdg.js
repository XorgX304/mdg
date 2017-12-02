/*
File also includes Bootstrap template JS code
-- Unminified version --
*/

const downloadBtn = '<p style="display: inline-block; font-size: 14px; text-align: left;"' + ' id="download"><a href="#" download><button class="btn btn-secondary btn-success">' + '<i class="fa fa-download"></i></button></a></p>';
const floatRange = '<p style="font-size: 14px; text-align: left;">Min<input min="0" max="10000000" value="1" type="number"' + ' class="float-range-min"' + ' required="required">Max' + '<input type="number" min="0" max="10000000"' + ' value="10" class="float-range-max" required="required"></p>';
const intRange = '<p style="font-size: 14px; text-align: left;">Min' + '<input min="0" max="10000000000" value="1" type="number" class="id-range-min" required="required">Max' + '<input min="0" max="10000000000" value="1000" type="number" class="id-range-max" required="required"></p>';
const boolInput = '<p style="font-size: 14px; text-align: left;">% Of false value' + '<input min="0" max="100" value="50" type="number" required="required"' + ' class="bool-percentage"></p>';
const genderInput = '<p style="font-size: 14px; text-align: left;">% Of Male' + ' <input min="0" max="100" value="50" type="number" required="required"' + ' class="gender-percentage"></p>';
const dateInput = '<p style="font-size: 14px; text-align: left;"><strong>From</strong>' + '<input class="date-range-start" required="required" type="date"><strong>To</strong>' + '<input class="date-range-end" required="required" type="date"></p>';
const rowContent = '<div class="row text-center">\n' + ' <div class="col-md-3">\n' + ' <input required="required" type="text" placeholder="Enter Column Name" class="form-control row-input"/>\n' + ' </div>\n' + ' <div class="col-md-2">\n' + ' <select required="required" class="form-control-sm">\n' + ' <option disabled="disabled" selected="selected" value="">Choose Data Type</option>\n' + ' <optgroup label="ID"></optgroup>\n' + ' <option value="auto-increment">Auto Increment Id</option>\n' + ' <option value="uuid">UUID</option>\n' + ' <optgroup label="Numbers"></optgroup>\n' + ' <option value="random-int">Number</option>\n' + ' <option value="random-float">Float</option>\n' + ' <optgroup label="Names"></optgroup>\n' + ' <option value="first-names">First Names</option>\n' + ' <option value="last-names">Last Names</option>\n' + ' <optgroup label="Address"></optgroup>\n' + ' <option value="zipcode">Zipcode</option>\n' + ' <option value="country">Country</option>\n' + ' <option value="lat">Latitude</option>\n' + ' <option value="long">Longitude</option>\n' + ' <option value="street-name">Street Name</option>\n' + ' <option value="street-addr">Address</option>\n' + ' <option value="phone">Phone Number</option>\n' + ' <optgroup label="Internet"></optgroup>\n' + ' <option value="email">Email</option>\n' + ' <option value="username">Username</option>\n' + ' <option value="company">Company</option>\n' + ' <option value="domain">Domain</option>\n' + ' <option value="url">URL</option>\n' + ' <option value="ip">IPv4</option>\n' + ' <option value="ipv6">IPv6</option>\n' + '<option value="mac-addr">Mac Address</option>\n' + '<option value="user-agent">User Agent</option>\n' + '<optgroup label="Finance"></optgroup>\n' + '<option value="cc-number">Credit Card Number</option>\n' + '<option value="cc-type">Credit Card Type</option>\n' + '<option value="cc-exp">Expiry Date</option>\n' + '<option value="cvv">CVV</option>\n' + '<option value="balance">Balance</option>' + ' <optgroup label="Date"></optgroup>\n' + ' <option value="rand-date">Date</option>\n' + ' <option value="date-range">Date Range</option>\n' + ' <option value="weekday">Weekday</option>\n' + ' <option value="month">Month</option>\n' + ' <option value="timestamp">Timestamp</option>\n' + '<optgroup label="Color"></optgroup>\n' + '<option value="color-name">Color Name</option>\n' + '<option value="hex">Hex </option>\n' + '<option value="shorthex">Short Hex</option>\n' + '<option value="rgb">RGB</option>\n' + '<option value="rgba">RGBA </option>\n' + ' <optgroup label="Other"></optgroup>\n' + ' <option value="gender">Gender</option>\n' + ' <option value="null-val">Null</option>\n' + ' <option value="bool">Boolean</option>\n' + ' </select>\n' + ' </div>\n' + ' <div class="col-md-4"></div>\n' + ' <div class="col-md-1"><a href="#" class="btn btn-sm"><i class="fa fa-times fa-lg"></i></a></div>\n' + '</div>';
const tableNameInput = '<div id="table-name-row" class="row text-left extra-options">\n' + '  <div class="col-sm-4">\n' + '    <label for="table-name" id="table-name-label">Table Name</label>\n' + '<input id="table-name" type="text" name="table-name" required="required" style="width: 120px; margin: 3px 3px 3px 3px; height: 70%;"/>\n' + '  </div></div>';
const createTable = '<div id="create-table-row" class="row text-left extra-options">\n' + '  <div class="col-sm-4">\n' + '    <input id="create-table" type="checkbox" name="create-table" style="margin-right: 3px; height: 70%;"/>\n' + '    <label for="create-table" id="create-table-label">Create Table Statement</label>\n' + '  </div>\n' + '</div>';
const delimiter = '<div id="delimiter" class="row text-left extra-options rdf-line"><div class="col-sm-4">\n' + '<label for="delimiter">Delimiter</label>' + '  <select required="required" class="rdf-input delimiter">\n' + '    <option value="comma">Comma</option>\n' + '    <option value="tab">Tab</option>\n' + '    <option value="pipe">Pipe</option>\n' + '    <option value="semi">Semi colon</option>\n' + '    <option value="caret">Caret</option>\n' + '  </select></div></div>';
const alertMsg = '<div class="alert alert-danger">Duplicate headers are not allowed</div>';
const badCookie = '<div class="alert alert-danger">"There was something wrong with the cookie set in your browser. Please clear your cookies and try again."</div>';
const maxCols = '<div class="alert alert-danger">Maximum number of columns reached</div>';
const generalErr = '<div class="alert alert-danger">Oops ! Something went wrong. Please try again</div>';
const requestLimit = '<div class="alert alert-danger">Please limit your data generation requests to a reasonable amount. Try again in 1 minute.</div>';
const loader = '<div id="loader"><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div>' + '<div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div>' + '<div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div>' + '<div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div>' + '<div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div>' + '<div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div>' + '<div class="sk-circle12 sk-circle"></div></div></div>';
const sqlExtension = '<div id="sql-extension" class="row text-left extra-options">\n  <div class="col-sm-4">\n<label style="margin-right: 8px;">File Extension</label>    <input id="sql-text" type="radio" name="sql-extension" value=".txt" style="margin-right: 3px;" required/>\n    <label for="sql-text" >.txt</label>\n<input id="sql-sql" type="radio" name="sql-extension" value=".sql" style="margin-right: 3px;"/>\n<label for="sql-sql" >.sql</label>\n  </div>\n</div>'
const rootNode = '<div class="row text-left extra-options">\n' + '<div class="col-sm-4"><label for="root-node" id="root-node-label">Root Node </label>\n' + '<input id="root-node" name="root-node" required="required" value="root"\n' + 'style="width: 120px; margin: 3px 3px 3px 3px; height: 70%;;"/>\n</div></div>\n';
const recordNode = '<div class="row text-left extra-options">\n' + '<div class="col-sm-4"><label for="record-node" id="record-node-label">Record Node</label>\n' + '<input id="record-node" name="record-node" required="required" value="record"\n' + 'style="width: 120px; margin: 3px 3px 3px 3px; height: 70%;;"/>\n</div>\n</div>'
const verificationSent = '<div class="alert alert-success">' + 'Verification email sent successfully. Please check your email for further instructions.</div>'
const verify = "<div id='verification'><label for='verification-email'>First time in Mock data generator ? Enter your email below to confirm you're human</label><br><input type='email' placeholder='Email' id='verification-email' required='required' style='margin-bottom: 5px;'><br><button type='button' id='verify' class='btn btn-outline-success'>Send verification</button></div>";
(function ($) {
  "use strict"; // Start of use strict
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });
  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });
  // Collapse Navbar
  let navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
  // Floating label headings for the contact form
  $(function () {
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });
})(jQuery); // End of use strict
! function (o) {
  "use strict";
  o('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      let a = o(this.hash);
      if ((a = a.length ? a : o("[name=" + this.hash.slice(1) + "]")).length) return o("html, body").animate({
        scrollTop: a.offset().top - 48
      }, 1e3, "easeInOutExpo"), !1
    }
  }), o(".js-scroll-trigger").click(function () {
    o(".navbar-collapse").collapse("hide")
  }), o("body").scrollspy({
    target: "#mainNav",
    offset: 54
  });
  let a = function () {
    o("#mainNav").offset().top > 100 ? o("#mainNav").addClass("navbar-shrink") : o("#mainNav").removeClass("navbar-shrink")
  };
  a(), o(window).scroll(a), o(function () {
    o("body").on("input propertychange", ".floating-label-form-group", function (a) {
      o(this).toggleClass("floating-label-form-group-with-value", !!o(a.target).val())
    }).on("focus", ".floating-label-form-group", function () {
      o(this).addClass("floating-label-form-group-with-focus")
    }).on("blur", ".floating-label-form-group", function () {
      o(this).removeClass("floating-label-form-group-with-focus")
    })
  })
}(jQuery);
'use strict';
$(function () {
  // Variables after page load
  let rowContainer = $('.row-container'),
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
  $('.final').on('click', '#verify', function (event) {
    let email = $('#verification-email').val();
    $('.final').empty();
    $('.final').append(loader);
    $.ajax({
      type: 'GET',
      url: '/sendverification',
      data: {
        email: email
      },
      success: function (msg) {
        $('.final').empty();
        $('.final').append(verificationSent)
      },
      error: function (err) {
        displayTempErrorMsg(generalErr);
      }
    })
  });
  // Prevent form submission and call checkInputDuplication function
  form.on('submit', function (event) {
    event.preventDefault();
    checkInputDuplication();
  });
  // Remove all alerts about column name duplication on keyup from column name input
  $('.row-body').on('keyup', '.form-control', function() {
    $.each($('.form-control'), function (i, item) {
      $(item).css('background-color', 'white');
      $('.alert-danger').remove();
    });
  });

  // Remove download button after click and restore `Generate Data` button
  form.on('click', '#download > a', function (e) {
    e.preventDefault();
    window.open($('#download > a').attr('href'))
    $(this).parent().remove();
    $('#generate-data').show();
  });
  // Add/Remove additional options per DATA type, change data type image and tooltip message.
  $('#data-type').on('change', function () {
    let dataImg = $('#data-img'),
      wrapContainer = $('.wrap-container');
    switch ($(this).val()) {
    case 'sql':
      removeExtraOptions();
      dataImg.attr('src', '/images/sql.png');
      tooltip.attr('title', 'Checking the "Create Table" box will also include the "DROP TABLE IF EXISTS"' + ' statement.\r\nAvoid using SQL keywords such as NULL, TABLE or COLUMN in table or column name.');
      wrapContainer.append(tableNameInput);
      wrapContainer.append(sqlExtension);
      wrapContainer.append(createTable);
      break;
    case 'json':
      removeExtraOptions();
      dataImg.attr('src', '/images/json.png');
      tooltip.attr('title', 'Use --jsonArray flag with MongoDB to import the file to a collection.');
      break;
    case 'csv':
      removeExtraOptions();
      dataImg.attr('src', '/images/csv.png');
      tooltip.attr('title', 'All files are first created in CSV format and then converted to their appropriate type.');
      wrapContainer.append(delimiter);
      break;
    case 'xml':
      removeExtraOptions();
      dataImg.attr('src', '/images/xml.png');
      tooltip.attr('title', 'Avoid using special characters in column(node) name. This makes for an invalid XML file.\r\n');
      wrapContainer.append(rootNode);
      wrapContainer.append(recordNode);
      break;
    case 'xlsx':
      removeExtraOptions();
      dataImg.attr('src', '/images/xlsx.png');
      tooltip.attr('title', '');
      break;
    case 'html':
      removeExtraOptions();
      dataImg.attr('src', '/images/html.png');
      tooltip.attr('title', '');
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
    case 'random-int':
      options.append(intRange);
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
  $('#bad-login-register').on('click', function  (e) {
    e.stopPropagation();
    $('#reg-btn').toggleClass('show')
  });
});
/*
--------- Functions and /generate POST AJAX request ---------
 */
// Remove all alert divs after 10 seconds
function removeAlerts() {
  setTimeout(function  () {
    $('.error').remove();
    $('.successful').remove();
  }, 10000)
}
// Remove extra options on data type change
function removeExtraOptions() {
  $('.extra-options').remove();
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
  let inputs = $('.row-input'),
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
    generateMockData();
  }
}
// Loader placeholder for file generation
function downloadPlaceHolder() {
  $('#generate-data').hide();
  $('.final').append(loader);
}
// Remove placeholder and display download button
function displayDownload(downloadUrl) {
  $('#loader').remove();
  $('.final').append(downloadBtn);
  $('#download').find('a').attr('href', downloadUrl)
  $('#download').find('a').attr('download', downloadUrl)
}

function displayTempErrorMsg(message) {
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
  let postData = {};
  // Extract column name & type from each table row
  $('.row-body').find('.row').each(function (index, row) {
    let td = $(this), // Current table cell to extract values from
      column = $(row).find('input').val(), // Column name
      type = $(row).find('select').val(); // Generated type
    if (column.includes(' ')) {
      column = column.split(' ').join('') // Remove white space from column name (causes invalid JSON & XML)
    }
    // Checking for special types & additional options
    postData = typeOptions(type, column, td, postData);
    postData[column] = type;
  });
  // Get data type, number of rows & additional options
  postData.compress = $('#compress').is(':checked')
  postData.dataType = '.' + $('#data-type').val();
  if (postData.dataType === '.sql') {
    postData.tableName = $('#table-name').val();
    postData.createTable = $('#create-table').is(":checked");
    postData.sqlExtension = $("input[name=sql-extension]:checked").val()
  } else if (postData.dataType === '.xml') {
    postData.rootNode = $('#root-node').val();
    postData.recordNode = $('#record-node').val();
  } else if (postData.dataType === '.csv') {
    postData.delimiter = $('.delimiter').val();
  }
  postData.numRows = $('#num-rows').val();
  // Call DownloadPlaceHolder until server responds with the download link
  downloadPlaceHolder();
  $.ajax({
    'type': 'POST',
    'url': '/generate',
    'data': postData,
    success: function (downloadUrl) {
      displayDownload(downloadUrl)
    },
    error: function (err) {
      if (err.status === 429) {
        displayTempErrorMsg(requestLimit)
      } else if (err.status === 401) {
        $('.final').empty();
        $('.final').append(verify);
      } else if (err.status === 403) {
        displayTempErrorMsg(badCookie)
      } else {
        displayTempErrorMsg(generalErr)
      }
    }
  });
  return false
}
'use strict';

function typeOptions(type, column, td, postData) {
  switch (type) {
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