//---------------------------------------------------------
// This is the main initialization routine to
// initialize the Prompted Input step.
// It requires the following items:
//
//   * global BOUND_PI object filled
//---------------------------------------------------------
function initStepPromptedInputs(uid) {
  
  // create a unique menu and show tab 0
  var tabs = 2; // Prompted Inputs configuration has two tabs

  // sets up a menu global for this panel
  eval('menu' + uid + '=initMenu(\'tab' + uid + '\', \'t' + uid + '\', ' + tabs + ', \'paneltabcontent\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menu' + uid), 0);

  setPIMeasurementControls(uid);
  buildPILimitsTable(uid);
}

//---------------------------------------------------------
// This is the main save routine to save the
// Prompted Input step to the DB.
// It requires the following items:
//
//   * global BOUND_PI object filled
//---------------------------------------------------------
function saveStepPromptedInputs(uid) {
  var PromptedInputKeys = null;

  PromptedInputKeys = savePIBoundObject(uid);

  return PromptedInputKeys;
}

//---------------------------------------------------------------BOUND_PI OBJECT-----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the BOUND_PI object.  These
//   are manipulated in the edit Prompted Inputs.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The MEASUREMENTS_PI object is the basis for
// all measurements available for the step.
//---------------------------------------------------------
function MEASUREMENT_PI(sxFieldId, sDisplayName, sDataType, sValue, sUnits) {
  this.sxFieldId = sxFieldId;
  this.sDisplayName = sDisplayName;
  this.sDataType = sDataType;
  this.sValue = sValue;
  this.sUnits = sUnits;
}

//---------------------------------------------------------
// The BOUND_PI object is the basis for
// all measurement and limit parameters for the step.
//---------------------------------------------------------
function BOUND_PI(sxFieldId, sDisplayName, limitsOn, nDataType, sValue, sUnits, LIMITS_PI) {
  this.sxFieldId = sxFieldId;
  this.sDisplayName = sDisplayName;
  this.limitsOn = limitsOn;
  this.nDataType = nDataType;
  this.sValue = sValue;
  this.sUnits = sUnits;
  this.LIMITS_PI = LIMITS_PI;
}

//-------------------------------------------------------
//   Defines and handles the LIMITS_PI[] array
//   of the BOUND_PI object.  These are manipulated
//   in the edit Prompted Inputs.htm template page using
//   the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The LIMITS_PI object is the basis for all limits in the step.
//---------------------------------------------------------
function LIMIT_PI(number, comparison, value) {
  this.number = number;
  this.comparison = comparison;
  this.value = value;
}

//---------------------------------------------------------
// This is the main save routine to save the
// BOUND_PI object to the DB.
// It requires the following items:
//
//   * global BOUND_PI object filled
//---------------------------------------------------------
function savePIBoundObject(uid) {
  var BOUND_PI = getPIBoundObject(uid);
  var boundKeys = "";

  boundKeys = boundKeys + "sxFieldId=" + encodeURIComponent(BOUND_PI.sxFieldId) + "&";
  boundKeys = boundKeys + "sDisplayName=" + encodeURIComponent(BOUND_PI.sDisplayName) + "&";
  boundKeys = boundKeys + "nDataType=" + encodeURIComponent(BOUND_PI.nDataType) + "&";
  boundKeys = boundKeys + "sValue=" + encodeURIComponent(BOUND_PI.sValue) + "&";
  boundKeys = boundKeys + "sUnits=" + encodeURIComponent(BOUND_PI.sUnits);
  if (BOUND_PI.limitsOn) {
    boundKeys = boundKeys + "&limitsOn=true";
  }
  for (var i=0; i<BOUND_PI.LIMITS_PI.length; i++) {
    boundKeys = boundKeys + "&comparison" + i + "=" + BOUND_PI.LIMITS_PI[i].comparison + "&";
    boundKeys = boundKeys + "value" + i + "=" + encodeURIComponent(BOUND_PI.LIMITS_PI[i].value);
  }

  return boundKeys
}

//---------------------------------------------------------
// This is the main function to set
// the measurement & limit parameters from the BOUND_PI object.
// It requires the following items:
//
//   * global BOUND_PI object filled
//   * control with id 'measurement'
//   * table with id 'limits'
//---------------------------------------------------------
function setPIMeasurementControls(uid) {
  var BOUND_PI = getPIBoundObject(uid);

  // Set all Measure & Limt parameters
  $('#limitsOn' + uid).attr('checked', BOUND_PI.limitsOn);
  $('#limitsOn' + uid).attr('disabled', (BOUND_PI.nDataType == "Enumeration"));
  
  // Add options to measurements select
  var A = getPIMeasurementNames(uid, 'sDisplayName');
  var B = getPIMeasurementNames(uid, 'sxFieldId');
  var s = document.getElementById('measurement' + uid);
  addStringOptions(s, A, B);

  // Set measurement parameter
  $('#measurement' + uid).val(BOUND_PI.sxFieldId);
}

//---------------------------------------------------------
//  Measure & Limits:  Measurement
//---------------------------------------------------------
function savePIMeasurement(uid) {
  var BOUND_PI = getPIBoundObject(uid);
  var enumeration = false;
  BOUND_PI.sxFieldId = $('#measurement' + uid).val();

  // get the type of the field
  var MEASUREMENTS_PI = getPIMeasurementsObject(uid);
  var A = getPIMeasurementNames(uid, 'sxFieldId');
  var index = A.indexOf(BOUND_PI.sxFieldId);
  BOUND_PI.sDisplayName = MEASUREMENTS_PI[index].sDisplayName;
  BOUND_PI.nDataType = MEASUREMENTS_PI[index].sDataType;
  BOUND_PI.sValue = MEASUREMENTS_PI[index].sValue;
  BOUND_PI.sUnits = MEASUREMENTS_PI[index].sUnits;

  // remove limits and disable limitsOn if it is an enumeration
  if (BOUND_PI.nDataType == "Enumeration") {
    BOUND_PI.LIMITS_PI.length = null;
    enumeration = true;
  }

  $('#limitsOn' + uid).attr('disabled', enumeration);

  makeChanges();
  buildPILimitsTable(uid);
}

//---------------------------------------------------------
//  Measure & Limits:  Limits On
//---------------------------------------------------------
function savePILimitsOn(uid) {
  var BOUND_PI = getPIBoundObject(uid);
  BOUND_PI.limitsOn = $('#limitsOn' + uid).attr('checked');
  makeChanges();
}

//---------------------------------------------------------
// This is the main function to build
// the limits table from the LIMITS_PI array
// It requires the following items:
//
//   * global LIMITS_PI[] array filled
//   * table with id 'limits'
//---------------------------------------------------------
function buildPILimitsTable(uid) {
  var BOUND_PI = getPIBoundObject(uid);
  var tbl = document.getElementById('limits' + uid);
  var i;

  // first, clear existing table.  The try/catch is for Firefox...
  i=tbl.rows.length;
  while (tbl.rows.length > 1) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }

  // Only build the table if there are LIMITS_PI to process
  if (BOUND_PI.LIMITS_PI.length != 0) {
    // This is the main loop that builds the rows
    // of the table by adding cells one at a time
    for (var i=0; i<BOUND_PI.LIMITS_PI.length; i++) {

      var row = tbl.insertRow(i + 1); // there's a header row

      //---------------------------------------------------------
      //  Cell 0:  Limit Number
      //    Row header showing limit number in step
      //    a little different method here as it's a "th" element
      var cell0 = document.createElement('th');
      cell0.className = "rh";
      var el0   = document.createTextNode(BOUND_PI.LIMITS_PI[i].number + 1);
      cell0.title = "Limit Number";
      cell0.appendChild(el0);
      row.appendChild(cell0);

      //---------------------------------------------------------
      //  Cell 1:  Delete Limit (row)
      //    Holds an icon/link to delete the row
      var cell1 = row.insertCell(1);
      cell1.className = "icon";
      var el1   = document.createElement('img');
      el1.src   = "/images/deletesmall.gif";
      el1.width = "16";
      el1.height = "16";
      el1.title = "Delete this limit";
      el1.onclick = new Function ("removePILimit('" + uid + "', " + i + ");");
      cell1.appendChild(el1);

      //---------------------------------------------------------
      //  Cell 2:  Comparison
      //    Holds a selection box to select the comparison for the limit
      var cell2      = row.insertCell(2);
      cell2.className = "ni";

      var el2a       = document.createElement('input');
      el2a.type      = "text";
      el2a.id        = BOUND_PI.LIMITS_PI[i].number + "_limitComparison" + uid;
      el2a.name      = BOUND_PI.LIMITS_PI[i].number + "_limitComparison" + uid;
      
      // This is necessary because IE converts to "<=" and ">=" casuing problems.
      var el2Value  = BOUND_PI.LIMITS_PI[i].comparison;
      if (el2Value == ">=") {
      	el2Value    = "\u2265";
      }
      else if (el2Value == "<=") {
      	el2Value    = "\u2262";
      }
      el2a.value     = el2Value;
      el2a.className = "hidden";

      var el2b       = document.createElement('div');
      var el2c       = document.createTextNode((BOUND_PI.LIMITS_PI[i].comparison == "")? "[Select]" : el2Value);
      el2b.id        = BOUND_PI.LIMITS_PI[i].number + "_limitComparison_display" + uid;
      el2b.appendChild(el2c);
      el2b.className = "";
      
      if (!EDITDISABLED) {
        cell2.title    = "Click to change the Comparison";
        el2b.onclick   = new Function ("changePIComparison('" + uid + "', " + i + ");");
      } else {
        cell2.className = "grayedout";
      }

      cell2.appendChild(el2a);
      cell2.appendChild(el2b);

      //---------------------------------------------------------
      //  Cell 3:  Value
      //    Holds a selection box to select
      //    the value for the limit
      var cell3      = row.insertCell(3);
      cell3.className = "ni";

      var el3a       = document.createElement('input');
      el3a.type      = "text";
      el3a.id        = BOUND_PI.LIMITS_PI[i].number + "_value" + uid;
      el3a.name      = BOUND_PI.LIMITS_PI[i].number + "_value" + uid;
      el3a.value     = BOUND_PI.LIMITS_PI[i].value;
      el3a.className = "hidden";
      el3a.onblur = new Function ("savePIChangedValue('" + uid + "', " + i + ");");

      var el3b       = document.createElement('span');
      var el3c       = document.createTextNode((BOUND_PI.LIMITS_PI[i].value == "")? "[Empty]" : BOUND_PI.LIMITS_PI[i].value);
      el3b.id        = BOUND_PI.LIMITS_PI[i].number + "_value_display" + uid;
      el3b.appendChild(el3c);
      
      if (!EDITDISABLED) {
        cell3.title     = "Click to edit the Value";
        el3b.onclick   = new Function ("setPIValue('" + uid + "', " + i + ");");
      } else {
        cell3.className = "grayedout";
      }

      cell3.appendChild(el3a);
      cell3.appendChild(el3b);
      
      //---------------------------------------------------------
      //  Cell 4:  Units
      //    Holds the text of the units of the measurement
      var cell4      = row.insertCell(4);
      cell4.className = "ni";

      var el4        = document.createTextNode(BOUND_PI.sUnits);
      cell4.appendChild(el4);
      
      //---------------------------------------------------------
      //  Cell 5:  Filler Cell
      //    Holds a blank cell as a filler cell
      row.insertCell(5);
    }

    // everything's added - paint the table styles
    setPILimitTableRows(uid);
  }
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the limits
// table
//---------------------------------------------------------

//---------------------------------------------------------
//  Limit Table Cell 1:  Remove Limit (row)
//---------------------------------------------------------
function removePILimit(uid, i) {
  var BOUND_PI = getPIBoundObject(uid);
  BOUND_PI.LIMITS_PI.splice(i, 1);
  
  for (j=i; j<BOUND_PI.LIMITS_PI.length; j++) {
    BOUND_PI.LIMITS_PI[j].number = BOUND_PI.LIMITS_PI[j].number - 1;
  }

  if (i == BOUND_PI.LIMITS_PI.length) {
    i--;
  }
  makeChanges();
  buildPILimitsTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 2:  Change Limit Comparison
//---------------------------------------------------------
function changePIComparison(uid, i) {
  var BOUND_PI = getPIBoundObject(uid);
  var lname = BOUND_PI.LIMITS_PI[i].number;
  var dtext = document.getElementById(lname + "_limitComparison_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all comparisons
  var A = getPIComparisonValues();

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);
  
  // This is necessary because IE converts to "<=", ">=", and "<>" casuing problems.
  var comparison = BOUND_PI.LIMITS_PI[i].comparison;
  if (comparison == ">=") {
    comparison = "\u2265";
  }
  else if (comparison == "<=") {
    comparison = "\u2264";
  }
  else if (comparison == "<>") {
    comparison = "\u2260";
  }

  // search array for index of comparison
  var index = A.indexOf(comparison);

  s.selectedIndex = index;
  s.onchange = new Function ("savePIChangedComparison('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("savePIChangedComparison('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function savePIChangedComparison(uid, i) {
  var BOUND_PI = getPIBoundObject(uid);
  var lname = BOUND_PI.LIMITS_PI[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j = s.options[s.selectedIndex].value; // get the comparison value
  }

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new comparison
  if (j != BOUND_PI.LIMITS_PI[i].comparison) {
    BOUND_PI.LIMITS_PI[i].comparison = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildPILimitsTable(uid);
}

function getPIComparisonValues() {
  return [">", "\u2265", "<", "\u2264", "\u2260", "="];
}

//---------------------------------------------------------
//  Limit Table Cell 3:  Change Limit Value
//---------------------------------------------------------
function setPIValue(uid, i) {
  var BOUND_PI = getPIBoundObject(uid);
  var lname = BOUND_PI.LIMITS_PI[i].number;
  var dtext = document.getElementById(lname + "_value_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text";
  t.id  = lname + "_text" + uid;
  t.value = BOUND_PI.LIMITS_PI[i].value;
  t.onblur = new Function ("this.value = validateNumeric(this.value); savePIChangedValue('" + uid + "', " + i + ");");   // handle storing after edit
  // this allows the user to press "ENTER" to confrim an entry
  if ($.browser.msie) {
    t.onkeydown = new Function ("captureReturn(this, window.event)");
  } else {
    t.setAttribute("onkeydown", "captureReturn(this, event);");
  }
  dtext.parentNode.appendChild(t);
  t.focus();
  t.select();
}

function savePIChangedValue(uid, i) {
  var BOUND_PI = getPIBoundObject(uid);
  var lname = BOUND_PI.LIMITS_PI[i].number;
  var t     = document.getElementById(lname + "_text" + uid);
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new field value
  if (j != BOUND_PI.LIMITS_PI[i].value) {
    BOUND_PI.LIMITS_PI[i].value = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildPILimitsTable(uid);
}

//---------------------------------------------------------
//  Add new limit to the table
//---------------------------------------------------------
function addPILimit(uid) {
  var BOUND_PI = getPIBoundObject(uid);
  
  if (BOUND_PI.nDataType == "Enumeration") {
    alert("List fields do not support limits!");
  } else {
    BOUND_PI.LIMITS_PI[BOUND_PI.LIMITS_PI.length] = new LIMIT_PI(BOUND_PI.LIMITS_PI.length, ">", "0");

    makeChanges();
    buildPILimitsTable(uid);
  }
}

//---------------------------------------------------------
// Sets LIMIT_PI table row styling to alternate colors
//---------------------------------------------------------
function setPILimitTableRows(uid) {
  var i, j;

  var table  = document.getElementById('limits' + uid);

  j = 0;
  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].className = "" // clear all rows
    if (table.rows[i].cells.length != 1) {
      if (j%2!=0) table.rows[i].className += " o" // odd row
      j++;
    } else {
      // this is a referential table, set the same color as previous row
      table.rows[i].className = table.rows[i - 1].className;
    }
  }
}

//---------------------------------------------------------
// BOUND_PI UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the MEASUREMENTS_PI object with the unique id
//---------------------------------------------------------
function getPIMeasurementsObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('MEASUREMENTS_PI' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('measurementsSetup' + uid).value);
  }
  return (eval('MEASUREMENTS_PI' + uid));
}

//---------------------------------------------------------
// Gets the BOUND_PI object with the unique id
//---------------------------------------------------------
function getPIBoundObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('BOUND_PI' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('boundSetup' + uid).value);
  }
  return (eval('BOUND_PI' + uid));
}

//---------------------------------------------------------
// Displays the BOUND_PI object for debugging
//---------------------------------------------------------
function displayPIBound(m) {
    var output = 'BOUND_PI:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
//  This gets the names of the measurement fields from the
//  MEASUREMENTS_PI object and returns the list
//---------------------------------------------------------
function getPIMeasurementNames(uid, type) {
  var MEASUREMENTS_PI = getPIMeasurementsObject(uid);
  var list = [];

  // add the names to the list to be returned
  for (var i=0; i<MEASUREMENTS_PI.length; i++) {
    if (type == 'sDisplayName') {
      list[i] = MEASUREMENTS_PI[i].sDisplayName;
    } else if (type == 'sxFieldId') {
      list[i] = MEASUREMENTS_PI[i].sxFieldId;
    }
  }
  
  if (list.length == 0) {
    list[0] = "<- Add Measurement Fields ->";
  }
  
  return list;
}

//---------------------------------------------------------
// last call MUST be the init using this
// temporary UID global defined in
// editstep.js - initStep() function
//---------------------------------------------------------
//initStepPromptedInputs(TEMPSTEPUID);