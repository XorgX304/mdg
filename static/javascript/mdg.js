"use strict";

// function for checking whether string has digits only

function isNumber(string) {
  return /^\d+$/.test(string);
}

// Get random alpha char. if char == number recall function
function randChar() {
  let char = Math.random()
    .toString(36)
    .substring(2, 3);
  if (isNumber(char)) {
    return randChar();
  } else {
    return char;
  }
}


// Remove all alert divs after 10 seconds
function removeAlerts() {
  setTimeout(function() {
    $(".error").remove();
    $(".successful").remove();
  }, 10000);
}
// Remove extra options on data type change
function removeExtraOptions() {
  $(".extra-options").remove();
}
// Add new field / header / column
function addNewField() {
  if ($(".row-body > .row").length === 10) {
    $(".alert-danger").remove();
    $("#main-form").before(maxCols);
    setTimeout(function() {
      $(".alert-danger").remove();
    }, 6000);
  } else {
    $(".row-body").append(rowContent);
  }
}

// Tests for duplicate or forbidden column names. If none, calls generateMockData
function checkInputValidity() {
  let $inputs = $(".row-input"),
    uniques = [],
    valid = true;
  if ($inputs.length <= 1) {
    badInputActions(null);
  } else {
    $.each($inputs, function(i, item) {
      if (
        uniques.indexOf($(item).val()) !== -1 ||
        badColNames.includes($(item).val().toLowerCase())
      )
       {
        valid = false;
        badInputActions(item);
      } else {
        uniques.push($(item).val());
      }
    });
  }
  if ($inputs.length === uniques.length && uniques.length > 1 && valid) {
    generateMockData();
  }
}

function badInputActions(item) {
  if (item) {
    $(item).css("background-color", "red");
  }
  if ($("#warning-msg").length === 0) {
    $("#main-form").before(alertMsg);
  }
}

// Loader placeholder for file generation
function downloadPlaceHolder() {
  $("#generate-data").hide();
  $(".final").append(loader);
}
// Remove placeholder and display download button
function displayDownload(downloadUrl) {
  let $final = $(".final");
  $("#loader").remove();
  $final.append(downloadBtn);
  $final.append(downloadInfo);
  $("#download")
    .find("a")
    .attr("href", downloadUrl);
  $("#download")
    .find("a")
    .attr("download", downloadUrl);
}

function displayTempErrorMsg(message) {
  let $final = $(".final");
  $("#loader").remove();
  $("#guest-limit").remove();
  $final.append(message);
  setTimeout(function() {
    $final.empty();
    $("#generate-data").show();
  }, 5000);
}

// Remove special chars from column names due to erroneous behaviour
function removeForbidden(string) {
  return string.replace(/[^a-zA-Z0-9_]/g, "")
}


function setDataTypeKeys(postData) {
  if (postData.dataType === ".sql") {
    postData.tableName = $("#table-name").val();
    postData.createTable = $("#create-table").is(":checked");
    postData.sqlExtension = $("input[name=sql-extension]:checked").val();
  } else if (postData.dataType === ".xml") {
    postData.rootNode = $("#root-node").val();
    postData.recordNode = $("#record-node").val();
  } else if (postData.dataType === ".csv") {
    postData.delimiter = $(".delimiter").val();
  }
  return postData;
}

// AJAX request to server to generate file with data from form
function generateMockData() {
  let postData = {};
  // Extract column name & type from each table row
  $(".row-body")
    .find(".row")
    .each(function(index, row) {
      let $td = $(this), // Current table cell to extract values from
        $column = $(row)
          .find("input")
          .val(), // Column name
        $type = $(row)
          .find("select")
          .val(); // Generated type
      $column = removeForbidden($column);
      if ($column.includes(" ")) {
        $column = $column.split(" ").join(""); // Remove white space from column name (causes invalid JSON & XML)
      }
      // Checking for special types & additional options
      if (isNumber($column.charAt(0)) || $column.length === 0) {
        $column = randChar() + $column;
      }
      postData[$column] = $type;
      postData = typeOptions($type, $column, $td, postData);
    });
  // Get data type, number of rows & additional options
  postData.compress = $("#compress").is(":checked");
  postData.dataType = "." + $("#data-type").val();
  postData = setDataTypeKeys(postData);
  postData.numRows = $("#num-rows").val();
  // Call DownloadPlaceHolder until server responds with the download link
  downloadPlaceHolder();
  $.ajax({
    type: "POST",
    url: "/generate",
    data: postData,
    success: function(downloadUrl) {
      displayDownload(downloadUrl);
    },
    error: function(err) {
      if (err.status === 429) {
        displayTempErrorMsg(requestLimit);
      } else if (err.status === 401) {
        let $final = $(".final");
        $final.empty();
        $final.append(verify);
      } else if (err.status === 403) {
        displayTempErrorMsg(badCookie);
      } else {
        displayTempErrorMsg(generalErr);
      }
    },
  });
  return false;
}

function typeOptions(type, column, td, postData) {
  switch (type) {
    case "date-range":
      let dateRangeStart = column + "dateRangeStart",
        dateRangeEnd = column + "dateRangeEnd";
      // Date values of date range
      postData[dateRangeStart] = td.find(".date-range-start").val();
      postData[dateRangeEnd] = td.find(".date-range-end").val();
      return postData;
    case "bool":
      // Boolean false percentages
      let boolPercentage = td.find(".bool-percentage").val();
      if (boolPercentage > 100 || boolPercentage < 0) {
        alert("Invalid boolean percentage");
        return;
      }
      postData[column + "boolPercentage"] = boolPercentage;
      return postData;
    case "random-int":
      // Min & max values for range of numbers, floats
      let intRangeMin = column + "intRangeMin",
        intRangeMax = column + "intRangeMax";
      postData[intRangeMin] = td.find(".id-range-min").val();
      postData[intRangeMax] = td.find(".id-range-max").val();
      return postData;
    case "random-float":
      let floatRangeMin = column + "floatRangeMin",
        floatRangeMax = column + "floatRangeMax",
        decimalLimit = column + "decimalLimit";
      postData[floatRangeMin] = td.find(".float-range-min").val();
      postData[floatRangeMax] = td.find(".float-range-max").val();
      postData[decimalLimit] = td.find(".decimal-limit").val();
      return postData;
    case "gender":
      // Gender male percentage
      let genderPercentage = td.find(".gender-percentage").val();
      if (genderPercentage > 100 || genderPercentage < 0) {
        alert("Invalid gender percentage");
        return;
      }
      postData[column + "genderPercentage"] = genderPercentage;
      return postData;
  }
  return postData;
}


$(function() {
  // Variables after page load
  let $rowContainer = $(".row-container"),
    $form = $("#main-form"),
    $tooltip = $("#tooltip");
  // Prevent default behaviour of tooltip click
  $tooltip.on("click", function(event) {
    event.preventDefault();
  });
  // Call add new field function
  $("#add-new").on("click", function(event) {
    addNewField();
    event.preventDefault();
  });
  // Remove current row
  $rowContainer.on("click", ".btn.btn-sm", function(event) {
    $(this)
      .parent()
      .parent()
      .remove();
    event.preventDefault();
  });

  $(".final").on("click", "#verify", function() {
    let $final = $(".final");
    let $email = $("#verification-email").val();
    $final.empty();
    $final.append(loader);
    $.ajax({
      type: "GET",
      url: "/sendverification",
      data: {
        email: $email,
      },
      success: function(msg) {
        $final.empty();
        $final.append(verificationSent);
      },
      error: function(err) {
        displayTempErrorMsg(generalErr);
      },
    });
  });
  // Prevent form submission and call checkInputValidity function
  $form.on("submit", function(event) {
    event.preventDefault();
    checkInputValidity();
  });
  // Remove all alerts about column name duplication on keyup from column name input
  $(".row-body").on("keyup", ".form-control", function() {
    $.each($(".form-control"), function(i, item) {
      $(item).css("background-color", "white");
      $(".alert-danger").remove();
    });
  });

  // Remove download button after click and restore `Generate Data` button
  $form.on("click", "#download > a", function(e) {
    e.preventDefault();
    window.open($("#download > a").attr("href"));
    $(this)
      .parent()
      .remove();
    $("#download-info").remove();
    $("#generate-data").show();
  });
  // Add/Remove additional options per DATA type, change data type image and tooltip message.
  $("#data-type").on("change", function() {
    let $dataImg = $("#data-img"),
      $wrapContainer = $(".wrap-container");
    switch ($(this).val()) {
      case "sql":
        removeExtraOptions();
        $dataImg.attr("src", "/images/sql.png");
        $tooltip.attr(
          "title",
          'Checking the "Create Table" box will also include the "DROP TABLE IF EXISTS"' +
            " statement.\r\nAvoid using SQL keywords such as NULL, COLUMN, or INT in table or column names."
        );
        $wrapContainer.append(tableNameInput);
        $wrapContainer.append(sqlExtension);
        $wrapContainer.append(createTable);
        break;
      case "json":
        removeExtraOptions();
        $dataImg.attr("src", "/images/json.png");
        $tooltip.attr(
          "title",
          "Use --jsonArray flag with MongoDB to import the file to a collection."
        );
        break;
      case "csv":
        removeExtraOptions();
        $dataImg.attr("src", "/images/csv.png");
        $tooltip.attr(
          "title",
          "All files are first created in CSV format and then converted to their appropriate type."
        );
        $wrapContainer.append(delimiter);
        break;
      case "xml":
        removeExtraOptions();
        $dataImg.attr("src", "/images/xml.png");
        $tooltip.attr("title", "");
        $wrapContainer.append(rootNode);
        $wrapContainer.append(recordNode);
        break;
      case "xlsx":
        removeExtraOptions();
        $dataImg.attr("src", "/images/xlsx.png");
        $tooltip.attr("title", "");
        break;
      case "html":
        removeExtraOptions();
        $dataImg.attr("src", "/images/html.png");
        $tooltip.attr("title", "");
        break;
    }
  });
  // Add/Remove additional options per FIELD type on change
  $rowContainer.on("change", "select", function() {
    let $options = $(this)
      .parent()
      .next();
    $options.text("");
    switch ($(this).val()) {
      case "date-range":
        $options.append(dateInput);
        break;
      case "bool":
        $options.append(boolInput);
        break;
      case "random-int":
        $options.append(intRange);
        break;
      case "random-float":
        $options.append(floatRange);
        break;
      case "gender":
        $options.append(genderInput);
        break;
    }
  });
  // Call remove alerts if page was rendered with such
  if ($(".alert")) {
    removeAlerts();
  }
  // Register button drop
  $("#bad-login-register").on("click", function(e) {
    e.stopPropagation();
    $("#reg-btn").toggleClass("show");
  });
});


