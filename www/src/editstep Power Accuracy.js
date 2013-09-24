//---------------------------------------------------------
// This is the main initialization routine to
// initialize the Power Accuracy step.
// It requires the following items:
//
//   * global STIMULUS_PA object filled
//   * global MEASUREMENT_PA object filled
//   * global DISPLAY_PA object filled
//   * global BOUND_PA object filled
//---------------------------------------------------------
function initStepPowerAccuracy(uid) {

  // create a unique menu and show tab 0
  var tabs = 5; // Power Accuracy configuration has seven tabs

  // sets up a menu global for this panel
  eval('menu' + uid + '=initMenu(\'tab' + uid + '\', \'t' + uid + '\', ' + tabs + ', \'paneltabcontent\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menu' + uid), 0);

  setPAStimulusControls(uid);
  setPAMeasurementControls(uid);
  setPADisplayControls(uid);
  setPABoundControls(uid);
}

//---------------------------------------------------------
// This is the main save routine to save the
// Power Accuracy step to the DB.
// It requires the following items:
//
//   * global STIMULUS_PA object filled
//   * global MEASUREMENT_PA object filled
//   * global DISPLAY_PA object filled
//   * global BOUND_PA object filled
//---------------------------------------------------------
function saveStepPowerAccuracy(uid) {
  var PowerAccuracyKeys = "";

  PowerAccuracyKeys = savePAStimulusObject(uid);
  PowerAccuracyKeys = PowerAccuracyKeys + "&" + savePAMeasurementObject(uid);
  PowerAccuracyKeys = PowerAccuracyKeys + "&" + savePADisplayObject(uid);
  PowerAccuracyKeys = PowerAccuracyKeys + "&" + savePABoundObject(uid);

  return PowerAccuracyKeys;
}

//---------------------------------------------------------------STIMULUS_PA OBJECT----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the STIMULUS_PA object.  These
//   are manipulated in the edit Power Accuracy.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The STIMULUS_PA object is the basis for
// all stimulus parameters for the step.
//---------------------------------------------------------
function STIMULUS_PA(powerStart, powerStop, freqType, freqPoints, padMN, padSN) {
  this.powerStart = powerStart;
  this.powerStop = powerStop;
  this.freqType = freqType;
  this.freqPoints = freqPoints;
  this.padMN = padMN;
  this.padSN = padSN;
}

//---------------------------------------------------------
// This is the main save routine to save the
// STIMULUS_PA object to the DB.
// It requires the following items:
//
//   * global STIMULUS_PA object filled
//---------------------------------------------------------
function savePAStimulusObject(uid) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  var stimulusKeys = "";

  stimulusKeys = stimulusKeys + "powerStart=" + STIMULUS_PA.powerStart + "&";
  stimulusKeys = stimulusKeys + "powerStop=" + STIMULUS_PA.powerStop + "&";
  stimulusKeys = stimulusKeys + "freqType=" + STIMULUS_PA.freqType + "&";
  if (STIMULUS_PA.freqType == "Custom") {
    for (var i=0; i<STIMULUS_PA.freqPoints.length; i++) {
      stimulusKeys = stimulusKeys + "freqPoints" + i + "=" + STIMULUS_PA.freqPoints[i] + "&";
    }
  }
  stimulusKeys = stimulusKeys + "padMN=" + STIMULUS_PA.padMN + "&";
  stimulusKeys = stimulusKeys + "padSN=" + STIMULUS_PA.padSN;

  return stimulusKeys
}

//---------------------------------------------------------
// This is the main function to set
// the stimulus parameters from the STIMULUS_PA object.
// It requires the following items:
//
//   * global STIMULUS_PA object filled
//   * control with id 'powerStart'
//   * control with id 'powerStop'
//   * control with id 'freqType'
//   * control with id 'freqPoints'
//   * control with id 'padMN'
//   * control with id 'padSN'
//---------------------------------------------------------
function setPAStimulusControls(uid) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  var freqTypeList = [];
  var freqType = document.getElementById('freqType' + uid).options;

  // Create lists to search
  for (var i=0; i<freqType.length; i++) {
    freqTypeList[i] = freqType[i].text;
  }

  // Set all stimulus parameters
  document.getElementById('powerStart' + uid).value = STIMULUS_PA.powerStart;
  document.getElementById('powerStop' + uid).value = STIMULUS_PA.powerStop;
  document.getElementById('freqType' + uid).selectedIndex = freqTypeList.indexOf(STIMULUS_PA.freqType);
  document.getElementById('padMN' + uid).value = STIMULUS_PA.padMN;
  document.getElementById('padSN' + uid).value = STIMULUS_PA.padSN;

  // Disable is Custom is not selected
  if (STIMULUS_PA.freqType == "Band Edges") {
    $('#_addPAFrequencyPoint' + uid).attr("className", "adder_grayedout")
                                    .attr("title", "Band Edges is selected")
                                    .attr("onClick", "");
  }

  // Disable controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('powerStart' + uid).disabled = true;
    document.getElementById('powerStop' + uid).disabled = true;
    document.getElementById('freqType' + uid).disabled = true;
    document.getElementById('padMN' + uid).disabled = true;
    document.getElementById('padSN' + uid).disabled = true;
    $('#_addPAFrequencyPoint' + uid).attr("className", "adder_grayedout")
                                    .attr("title", "Cannot change sequence")
                                    .attr("onClick", "");
  }
  
  buildPAFrequencyPointsTable(uid);
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the stimulus parameters
//---------------------------------------------------------

//---------------------------------------------------------
//  Stimulus:  Start Power
//---------------------------------------------------------
function savePAStartPower(uid) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  var DISPLAY_PA = getPADisplayObject(uid);

  STIMULUS_PA.powerStart = document.getElementById('powerStart' + uid).value;

  // Check the bounds of the user entered value
  if (STIMULUS_PA.powerStart < 30) {
    STIMULUS_PA.powerStart = 30;
    document.getElementById('powerStart' + uid).value = 30;
  }else if (STIMULUS_PA.powerStart > 50) {
    STIMULUS_PA.powerStart = 50;
    document.getElementById('powerStart' + uid).value = 50;
  }
  if (DISPLAY_PA.powerMin <= STIMULUS_PA.powerStart && DISPLAY_PA.powerMin != -1) {
    DISPLAY_PA.powerMin = STIMULUS_PA.powerStart;
    document.getElementById('powerMin' + uid).value = STIMULUS_PA.powerStart;
  }
  if (STIMULUS_PA.powerStart > STIMULUS_PA.powerStop) {
    STIMULUS_PA.powerStart = STIMULUS_PA.powerStop;
    document.getElementById('powerStart' + uid).value = STIMULUS_PA.powerStop;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Stop Power
//---------------------------------------------------------
function savePAStopPower(uid) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  var DISPLAY_PA = getPADisplayObject(uid);

  STIMULUS_PA.powerStop = document.getElementById('powerStop' + uid).value;

  // Check the bounds of the user entered value
  if (STIMULUS_PA.powerStop < 30) {
    STIMULUS_PA.powerStop = 30;
    document.getElementById('powerStop' + uid).value = 30;
  }else if (STIMULUS_PA.powerStop > 50) {
    STIMULUS_PA.powerStop = 50;
    document.getElementById('powerStop' + uid).value = 50;
  }
  if (DISPLAY_PA.powerMax >= STIMULUS_PA.powerStop && DISPLAY_PA.powerMax != -1) {
    DISPLAY_PA.powerMax = STIMULUS_PA.powerStop;
    document.getElementById('powerMax' + uid).value = STIMULUS_PA.powerStop;
  }
  if (STIMULUS_PA.powerStop < STIMULUS_PA.powerStart) {
    STIMULUS_PA.powerStop = STIMULUS_PA.powerStart;
    document.getElementById('powerStop' + uid).value = STIMULUS_PA.powerStart;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Frequency Type
//---------------------------------------------------------
function savePAFrequencyType(uid) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  STIMULUS_PA.freqType = document.getElementById('freqType' + uid).options[document.getElementById('freqType' + uid).selectedIndex].value;
  
  // Disable is Custom is not selected
  if (STIMULUS_PA.freqType == "Band Edges") {
    $('#_addPAFrequencyPoint' + uid).attr("className", "adder_grayedout")
                                    .attr("title", "Band Edges is selected")
                                    .attr("onClick", "");
  } else {
    $('#_addPAFrequencyPoint' + uid).attr("className", "adder")
                                    .attr("title", "Add another frequency point")
                                    .attr("onClick", "addPAFrequencyPoint('" + uid + "');");
  }

  makeChanges();
  buildPAFrequencyPointsTable(uid);
}

//---------------------------------------------------------
//  Stimulus:  Pad Model Number
//---------------------------------------------------------
function savePAPadMN(uid) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  STIMULUS_PA.padMN = document.getElementById('padMN' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Pad Serial Number
//---------------------------------------------------------
function savePAPadSN(uid) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  STIMULUS_PA.padSN = document.getElementById('padSN' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
// This is the main function to build
// the frequency points table from the freqPoints array
// It requires the following items:
//
//   * global frePoints[] array filled
//   * table with id 'freqpoints'
//---------------------------------------------------------
function buildPAFrequencyPointsTable(uid) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  var tbl = document.getElementById('freqPoints' + uid);

  // first, clear existing table.  The try/catch is for Firefox...
  var i=tbl.rows.length;
  while (tbl.rows.length > 1) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }

  // This is the main loop that builds the rows
  // of the table by adding cells one at a time
  for (var i=0; i<STIMULUS_PA.freqPoints.length; i++) {
    var row = tbl.insertRow(i + 1); // there's a header row

    //---------------------------------------------------------
    //  Cell 0:  Frequency Point Number
    //    Row header showing the frequency point number with
    //    a little different method here as it's a "th" element
    var cell0 = document.createElement('th');
    cell0.className = "rowheader";
    var el0 = document.createTextNode(i + 1);
    cell0.title     = "Frequency Point Number"
    cell0.appendChild(el0);
    row.appendChild(cell0);

    //---------------------------------------------------------
    //  Cell 1:  Delete Frequency Point (row)
    //    Holds an icon/link to delete the row
    var cell1 = row.insertCell(1);
    cell1.className = "icon";
    var el1   = document.createElement('img');
    if (!EDITDISABLED && STIMULUS_PA.freqType == "Custom") {
      el1.src   = "/images/deletesmall.gif";
      el1.title = "Delete this frequency point";
      el1.onclick = new Function ("removePAFrequencyPoint('" + uid + "', " + i + ");");
    } else {
      el1.src   = "/images/deletesmalldisabled.gif";
      el1.title = "Cannot edit";
    }
    cell1.appendChild(el1);

    //---------------------------------------------------------
    //  Cell 2:  Frequency Point Reordering
    //    Holds a couple of images/links to handle
    //    reordering rows of the frequency point table
    var cell2 = row.insertCell(2);
    cell2.className = "icon";

    //  Move up (toward top of list; index gets smaller)
    var el2aUp    = document.createElement('a');
    el2aUp.href   = "#nogo";
    var el2aUpImg = document.createElement('img');
    el2aUpImg.className = "movers";
    if (i==0 || EDITDISABLED || STIMULUS_PA.freqType == "Band Edges") {    // disable UP on first element
      el2aUpImg.src     = "/images/upsmalldisabled.gif";
    } else {
      el2aUp.title   = "move up"
      el2aUp.onclick = new Function("this.blur(); movePAFrequencyPoint('" + uid + "', -(" + i + "));");
      el2aUpImg.src  = "/images/upsmall.gif";
    }
    el2aUp.appendChild(el2aUpImg);

    //  Move down (toward bottom of list; index gets bigger)
    var el2aDwn    = document.createElement('a');
    el2aDwn.href   = "#nogo";
    var el2aDwnImg = document.createElement('img');
    el2aDwnImg.className = "movers";
    if (i==STIMULUS_PA.freqPoints.length - 1 || EDITDISABLED || STIMULUS_PA.freqType == "Band Edges") {  // disable DOWN on last element
      el2aDwnImg.src     = "/images/downsmalldisabled.gif";
    } else {
      el2aDwn.title      = "move down"
      el2aDwn.onclick    = new Function ("this.blur(); movePAFrequencyPoint('" + uid + "', " + i + ");");
      el2aDwnImg.src     = "/images/downsmall.gif";
    }
    el2aDwn.appendChild(el2aDwnImg);

    cell2.appendChild(el2aUp);
    cell2.appendChild(el2aDwn);
    
    //---------------------------------------------------------
    //  Cell 3:  Frequency
    //    Holds a text entry box to define the frequency
    //    to be used for the point
    var cell3  = row.insertCell(3);
    cell3.className = "ni";

    var el3a   = document.createElement('input');
    el3a.type  = "text"
    el3a.className = "hidden";
    el3a.id    = i + "frequencyPoint" + uid;
    el3a.name  = i + "frequencyPoint" + uid;
    el3a.value = STIMULUS_PA.freqPoints[i];
//    el3a.onblur = new Function ("saveMarkerFrequency(" + uid + ", " + i + ");");

    var el3b  = document.createElement('div');
    var el3c  = document.createTextNode((STIMULUS_PA.freqPoints[i] == "")? "--" : STIMULUS_PA.freqPoints[i]);
    el3b.id   = i + "frequencyPointDisplay" + uid;
    el3b.appendChild(el3c);
    
    if (!EDITDISABLED && STIMULUS_PA.freqType == "Custom") {
      cell3.title     = "Click to edit the Frequency";
      el3b.onclick   = new Function ("setPAFrequencyPoint('" + uid + "', " + i + ");");
    } else {
      cell3.className = "grayedout";
    }

    cell3.appendChild(el3a);
    cell3.appendChild(el3b);
    
    //---------------------------------------------------------
    //  Cell 4:  Filler Cell
    //    Holds a blank cell as a filler cell
    row.insertCell(4);
  }

  // everything's added - paint the table styles
  setPATableRows(uid, 'freqPoints');
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the frequency
// points table
//---------------------------------------------------------

//---------------------------------------------------------
//  Frequency Points Table Cell 1:  Remove Point (row)
//---------------------------------------------------------
function removePAFrequencyPoint(uid, i) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  STIMULUS_PA.freqPoints.splice(i, 1);

  makeChanges();
  buildPAFrequencyPointsTable(uid);
}

//---------------------------------------------------------
//  Frequency Points Table Cell 2:  Reorder Frequency Points
//---------------------------------------------------------
function movePAFrequencyPoint(uid, i) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  var dir=1;
  if (i<0) {
    dir = -1;
    i   = -i;
  }

  var temp = STIMULUS_PA.freqPoints[i + dir]; // save point above (or below)
  STIMULUS_PA.freqPoints[i + dir] = STIMULUS_PA.freqPoints[i]; // replace index with next (or prev)
  STIMULUS_PA.freqPoints[i] = temp; // move temp back
  temp = null;

  makeChanges();
  buildPAFrequencyPointsTable(uid);
}

//---------------------------------------------------------
//  Frequency Points Table Cell 3:  Change Frequency Point
//---------------------------------------------------------
function setPAFrequencyPoint(uid, i) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  var pname = i;
  var dtext = document.getElementById(pname + "frequencyPointDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = pname + "_text" + uid;
  t.value = STIMULUS_PA.freqPoints[i];
  t.onblur = new Function ("this.value = validateNumeric(this.value); savePAChangedFrequencyPoint('" + uid + "', " + i + ");");   // handle storing after edit
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

function savePAChangedFrequencyPoint(uid, i) {
  var STIMULUS_PA = getPAStimulusObject(uid);
  var pname = i;
  var t     = document.getElementById(pname + "_text" + uid);
  var j     = t.value; // get the model number text

  // don't make changes if they didn't select a new frequency
  if (j != STIMULUS_PA.freqPoints[i]) {
    STIMULUS_PA.freqPoints[i] = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildPAFrequencyPointsTable(uid);
}

//---------------------------------------------------------
//  Add new FREQUENCY_POINTS_SP to the table
//---------------------------------------------------------
function addPAFrequencyPoint(uid) {
  if (EDITDISABLED) return;

  var STIMULUS_PA = getPAStimulusObject(uid);

  STIMULUS_PA.freqPoints[STIMULUS_PA.freqPoints.length] = 0;

  makeChanges();
  buildPAFrequencyPointsTable(uid);
}

//---------------------------------------------------------
// STIMULUS_PA UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the STIMULUS_PA object with the unique id
//---------------------------------------------------------
function getPAStimulusObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('STIMULUS_PA' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('stimulusSetup' + uid).value);
  }
  return (eval('STIMULUS_PA' + uid));
}

//---------------------------------------------------------
// Displays the STIMULUS_PA object for debugging
//---------------------------------------------------------
function displayPAStimulus(m) {
    var output = 'STIMULUS_PA:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------------MEASUREMENT_PA OBJECT-------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the MEASUREMENT_PA object.
//   This is manipulated in the edit Power Accuracy.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The MEASUREMENT_PA object is the basis for
// all measurements in the step.
//---------------------------------------------------------
function MEASUREMENT_PA(port, direction) {
  this.port = port;
  this.direction = direction;
}

//---------------------------------------------------------
// This is the main save routine to save the
// MEASUREMENT_PA object to the DB.
// It requires the following items:
//
//   * global MEASUREMENT_PA object filled
//---------------------------------------------------------
function savePAMeasurementObject(uid) {
  var MEASUREMENT_PA = getPAMeasurementObject(uid);
  var measurementKeys = "";
  
  measurementKeys = measurementKeys + "port=" + MEASUREMENT_PA.port + "&";
  measurementKeys = measurementKeys + "direction=" + MEASUREMENT_PA.direction;

  return measurementKeys
}

//---------------------------------------------------------
// This is the main function to set
// the measurement parameters from the MEASUREMENT_PA object.
// It requires the following items:
//
//   * global MEASUREMENT_PA object filled
//   * control with id 'port'
//   * control with id 'direction'
//---------------------------------------------------------
function setPAMeasurementControls(uid) {
  var MEASUREMENT_PA = getPAMeasurementObject(uid);

  var portList = [];
  var directionList = [];
  var port = document.getElementById('port' + uid).options;
  var direction = document.getElementById('direction' + uid).options;

  // Create lists to search
  for (var i=0; i<port.length; i++) {
    portList[i] = port[i].text;
  }
  for (var i=0; i<direction.length; i++) {
    directionList[i] = direction[i].text;
  }

  // set all measurement parameters
  document.getElementById('port' + uid).selectedIndex = portList.indexOf(MEASUREMENT_PA.port);
  document.getElementById('direction' + uid).selectedIndex = directionList.indexOf(MEASUREMENT_PA.direction);
  changePAParameter(uid);

  // Disable all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('port' + uid).disabled = true;
    document.getElementById('direction' + uid).disabled = true;
  }
}

//---------------------------------------------------------
//  Mearurement:  Port
//---------------------------------------------------------
function savePAPort(uid) {
  var MEASUREMENT_PA = getPAMeasurementObject(uid);
  MEASUREMENT_PA.port = document.getElementById('port' + uid).options[document.getElementById('port' + uid).selectedIndex].value;
  changePAParameter(uid);
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Direction
//---------------------------------------------------------
function savePADirection(uid) {
  var MEASUREMENT_PA = getPAMeasurementObject(uid);
  MEASUREMENT_PA.direction = document.getElementById('direction' + uid).options[document.getElementById('direction' + uid).selectedIndex].value;
  changePAParameter(uid);
  makeChanges();
}

//---------------------------------------------------------
// MEASUREMENT_PA UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Changes the parameter label
//---------------------------------------------------------
function changePAParameter(uid) {
  var MEASUREMENT_PA = getPAMeasurementObject(uid);
  var response;
  var stimulus;

  if (MEASUREMENT_PA.port == "Port 1") {
    stimulus = 1;
    if (MEASUREMENT_PA.direction == "Reverse") response = 1;
    else response = 2;
  } else {
    stimulus = 2;
    if (MEASUREMENT_PA.direction == "Reverse") response = 2;
    else response = 1;
  }
  document.getElementById('portLabel' + uid).innerHTML = "P" + response + "" + stimulus;
}

//---------------------------------------------------------
// Gets the MEASUREMENT_PA object with the unique id
//---------------------------------------------------------
function getPAMeasurementObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('MEASUREMENT_PA' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('measurementSetup' + uid).value);
  }
  return (eval('MEASUREMENT_PA' + uid));
}

//---------------------------------------------------------
// Displays the MEASUREMENT_PA object for debugging
//---------------------------------------------------------
function displayPAMeasurement(m) {
    var output = 'MEASUREMENT_PA:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------------DISPLAY_PA OBJECT-----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the DISPLAY_PA object.  This
//   is manipulated in the edit Power Accuracy.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The DISPLAY_PA object is the basis for
// all DISPLAY_PA parameters for the step.
//---------------------------------------------------------
function DISPLAY_PA(powerMin, powerMax, toleranceMin, toleranceMax) {
  this.powerMin = powerMin;
  this.powerMax = powerMax;
  this.toleranceMin = toleranceMin;
  this.toleranceMax = toleranceMax;
}

//---------------------------------------------------------
// This is the main save routine to save the
// DISPLAY_PA object to the DB.
// It requires the following items:
//
//   * global DISPLAY_PA object filled
//---------------------------------------------------------
function savePADisplayObject(uid) {
  var DISPLAY_PA = getPADisplayObject(uid);
  var displayKeys = "";

  displayKeys = displayKeys + "powerMin=" + DISPLAY_PA.powerMin + "&";
  displayKeys = displayKeys + "powerMax=" + DISPLAY_PA.powerMax + "&";
  displayKeys = displayKeys + "toleranceMin=" + DISPLAY_PA.toleranceMin + "&";
  displayKeys = displayKeys + "toleranceMax=" + DISPLAY_PA.toleranceMax;

  return displayKeys
}

//---------------------------------------------------------
// This is the main function to set
// the DISPLAY_PA parameters from the DISPLAY_PA object.
// It requires the following items:
//
//   * global DISPLAY_PA object filled
//   * control with id 'powerMin'
//   * control with id 'powerMax'
//   * control with id 'toleranceMin'
//   * control with id 'toleranceMax'
//---------------------------------------------------------
function setPADisplayControls(uid) {
  var DISPLAY_PA = getPADisplayObject(uid);
  var powerMin, powerMax, toleranceMin, toleranceMax, disabled, checked;

  // Set all display parameters
  document.getElementById('powerMin' + uid).value = DISPLAY_PA.powerMin;
  document.getElementById('powerMax' + uid).value = DISPLAY_PA.powerMax;
  document.getElementById('toleranceMin' + uid).value = DISPLAY_PA.toleranceMin;
  document.getElementById('toleranceMax' + uid).value = DISPLAY_PA.toleranceMax;

  if (DISPLAY_PA.powerMin == -1 && DISPLAY_PA.powerMax == -1) {
    powerMin = "Auto";
    powerMax = "Auto";
    disabled = true;
    checked = true;
  } else {
    powerMin = DISPLAY_PA.powerMin;
    powerMax = DISPLAY_PA.powerMax;
    disabled = false
    checked = false;
  }
  document.getElementById('powerMin' + uid).value = powerMin;
  document.getElementById('powerMax' + uid).value = powerMax;
  document.getElementById('powerMin' + uid).disabled = disabled;
  document.getElementById('powerMax' + uid).disabled = disabled;
  document.getElementById('autoPower' + uid).checked = checked;
  
  if (DISPLAY_PA.toleranceMin == -1 && DISPLAY_PA.toleranceMax == -1) {
    toleranceMin = "Auto";
    toleranceMax = "Auto";
    disabled = true;
    checked = true;
  } else {
    toleranceMin = DISPLAY_PA.toleranceMin;
    toleranceMax = DISPLAY_PA.toleranceMax;
    disabled = false
    checked = false;
  }
  document.getElementById('toleranceMin' + uid).value = toleranceMin;
  document.getElementById('toleranceMax' + uid).value = toleranceMax;
  document.getElementById('toleranceMin' + uid).disabled = disabled;
  document.getElementById('toleranceMax' + uid).disabled = disabled;
  document.getElementById('autoTolerance' + uid).checked = checked;

  // Disable all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('powerMin' + uid).disabled = true;
    document.getElementById('powerMax' + uid).disabled = true;
    document.getElementById('autoPower' + uid).disabled = true;
    document.getElementById('toleranceMin' + uid).disabled = true;
    document.getElementById('toleranceMax' + uid).disabled = true;
    document.getElementById('autoTolerance' + uid).disabled = true;
  }
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the display parameters
//---------------------------------------------------------

//---------------------------------------------------------
//  Display:  Power Minimum
//---------------------------------------------------------
function savePAPowerMin(uid) {
  var DISPLAY_PA = getPADisplayObject(uid);
  var STIMULUS_PA = getPAStimulusObject(uid);
  DISPLAY_PA.powerMin = Number(document.getElementById('powerMin' + uid).value);
  
  // Check the bounds of the user entered value
  if (DISPLAY_PA.powerMin < 30) {
    DISPLAY_PA.powerMin = 30;
    document.getElementById('powerMin' + uid).value = 30;
  }else if (DISPLAY_PA.powerMin > 50) {
    DISPLAY_PA.powerMin = 50;
    document.getElementById('powerMin' + uid).value = 50;
  }
  if (DISPLAY_PA.powerMin < STIMULUS_PA.powerStart) {
    DISPLAY_PA.powerMin = STIMULUS_PA.powerStart;
    document.getElementById('powerMin' + uid).value = STIMULUS_PA.powerStart;
  }else if (DISPLAY_PA.powerMin > STIMULUS_PA.powerStop) {
    DISPLAY_PA.powerMin = STIMULUS_PA.powerStop;
    document.getElementById('powerMin' + uid).value = STIMULUS_PA.powerStop;
  }
  if (DISPLAY_PA.powerMin > DISPLAY_PA.powerMax) {
    DISPLAY_PA.powerMax = DISPLAY_PA.powerMin;
    document.getElementById('powerMax' + uid).value = DISPLAY_PA.powerMin;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Power Maximum
//---------------------------------------------------------
function savePAPowerMax(uid) {
  var DISPLAY_PA = getPADisplayObject(uid);
  var STIMULUS_PA = getPAStimulusObject(uid);
  DISPLAY_PA.powerMax = Number(document.getElementById('powerMax' + uid).value);
  
  // Check the bounds of the user entered value
  if (DISPLAY_PA.powerMax < 30) {
    DISPLAY_PA.powerMax = 30;
    document.getElementById('powerMax' + uid).value = 30;
  }else if (DISPLAY_PA.powerMax > 50) {
    DISPLAY_PA.powerMax = 50;
    document.getElementById('powerMax' + uid).value = 50;
  }
  if (DISPLAY_PA.powerMax < STIMULUS_PA.powerStart) {
    DISPLAY_PA.powerMax = STIMULUS_PA.powerStart;
    document.getElementById('powerMax' + uid).value = STIMULUS_PA.powerStart;
  }else if (DISPLAY_PA.powerMax > STIMULUS_PA.powerStop) {
    DISPLAY_PA.powerMax = STIMULUS_PA.powerStop;
    document.getElementById('powerMax' + uid).value = STIMULUS_PA.powerStop;
  }
  if (DISPLAY_PA.powerMax < DISPLAY_PA.powerMin) {
    DISPLAY_PA.powerMin = DISPLAY_PA.powerMax;
    document.getElementById('powerMin' + uid).value = DISPLAY_PA.powerMax;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Auto Power
//---------------------------------------------------------
function savePAAutoPower(uid) {
  var DISPLAY_PA = getPADisplayObject(uid);
  var auto = document.getElementById('autoPower' + uid).checked;

  if (auto) {
    DISPLAY_PA.powerMin = -1;
    DISPLAY_PA.powerMax = -1;
  }else {
    DISPLAY_PA.powerMin = document.getElementById('powerMin' + uid).value;
    DISPLAY_PA.powerMax = document.getElementById('powerMax' + uid).value;
  }

  // Set enable state
  document.getElementById('powerMin' + uid).disabled = auto;
  document.getElementById('powerMax' + uid).disabled = auto;

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Tolerance Minimum
//---------------------------------------------------------
function savePAToleranceMin(uid) {
  var DISPLAY_PA = getPADisplayObject(uid);
  DISPLAY_PA.toleranceMin = Number(document.getElementById('toleranceMin' + uid).value);
  
  // Check the bounds of the user entered value
  if (DISPLAY_PA.toleranceMin < 0) {
    DISPLAY_PA.toleranceMin = 0;
    document.getElementById('toleranceMin' + uid).value = 0;
  }else if (DISPLAY_PA.toleranceMin > 5) {
    DISPLAY_PA.toleranceMin = 5;
    document.getElementById('toleranceMin' + uid).value = 5;
  }
  if (DISPLAY_PA.toleranceMin > DISPLAY_PA.toleranceMax) {
    DISPLAY_PA.toleranceMax = DISPLAY_PA.toleranceMin;
    document.getElementById('toleranceMax' + uid).value = DISPLAY_PA.toleranceMin;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Tolerance Maximum
//---------------------------------------------------------
function savePAToleranceMax(uid) {
  var DISPLAY_PA = getPADisplayObject(uid);
  DISPLAY_PA.toleranceMax = Number(document.getElementById('toleranceMax' + uid).value);
  
  // Check the bounds of the user entered value
  if (DISPLAY_PA.toleranceMax < 0) {
    DISPLAY_PA.toleranceMax = 0;
    document.getElementById('toleranceMax' + uid).value = 0;
  }else if (DISPLAY_PA.toleranceMax > 5) {
    DISPLAY_PA.toleranceMax = 5;
    document.getElementById('toleranceMax' + uid).value = 5;
  }
  if (DISPLAY_PA.toleranceMax < DISPLAY_PA.toleranceMin) {
    DISPLAY_PA.toleranceMin = DISPLAY_PA.toleranceMax;
    document.getElementById('toleranceMin' + uid).value = DISPLAY_PA.toleranceMax;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Auto Tolerance
//---------------------------------------------------------
function savePAAutoTolerance(uid) {
  var DISPLAY_PA = getPADisplayObject(uid);
  var auto = document.getElementById('autoTolerance' + uid).checked;

  if (auto) {
    DISPLAY_PA.toleranceMin = -1;
    DISPLAY_PA.toleranceMax = -1;
  }else {
    DISPLAY_PA.toleranceMin = document.getElementById('toleranceMin' + uid).value;
    DISPLAY_PA.toleranceMax = document.getElementById('toleranceMax' + uid).value;
  }

  // Set enable state
  document.getElementById('toleranceMin' + uid).disabled = auto;
  document.getElementById('toleranceMax' + uid).disabled = auto;

  makeChanges();
}

//---------------------------------------------------------
// DISPLAY_PA UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the DISPLAY_PA object with the unique id
//---------------------------------------------------------
function getPADisplayObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('DISPLAY_PA' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('displaySetup' + uid).value);
  }
  return (eval('DISPLAY_PA' + uid));
}

//---------------------------------------------------------
// Displays the DISPLAY_PA object for debugging
//---------------------------------------------------------
function displayPADisplay(m) {
    var output = 'DISPLAY_PA:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------------BOUND_PA OBJECT-------------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the BOUND_PA object.  This
//   is manipulated in the edit S Parameter.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------
function BOUND_PA(tolerance) {
  this.tolerance = tolerance;
}
//-------------------------------------------------------
//   Defines and handles the
//   BOUND_PA object.  These are manipulated
//   in the edit Power Accuracy.htm template page using
//   the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// This is the main save routine to save the
// BOUND_PA object to the DB.
// It requires the following items:
//
//   * global BOUND_PA object filled
//---------------------------------------------------------
function savePABoundObject(uid) {
  var BOUND_PA = getPABoundObject(uid);
  var boundKeys = "";

  boundKeys = boundKeys + "tolerance=" + BOUND_PA.tolerance;

  return boundKeys
}

//---------------------------------------------------------
// This is the main function to set
// the BOUND_PA parameters from the BOUND_PA object.
// It requires the following items:
//
//   * global BOUND_PA object filled
//   * control with id 'tolerance'
//---------------------------------------------------------
function setPABoundControls(uid) {
  var BOUND_PA = getPABoundObject(uid);

  // Set all display parameters
  document.getElementById('tolerance' + uid).value = BOUND_PA.tolerance;

  // Disable all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('tolerance' + uid).disabled = true;
  }
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the bound parameters
//---------------------------------------------------------

//---------------------------------------------------------
//  Limit:  Tolerance
//---------------------------------------------------------
function savePATolerance(uid) {
  var BOUND_PA = getPABoundObject(uid);
  BOUND_PA.tolerance = document.getElementById('tolerance' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
// BOUND_PA UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the BOUND_PA object with the unique id
//---------------------------------------------------------
function getPABoundObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('BOUND_PA' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('boundSetup' + uid).value);
  }
  return (eval('BOUND_PA' + uid));
}

//---------------------------------------------------------
// Displays the BOUND_PA object for debugging
//---------------------------------------------------------
function displayPABound(m) {
    var output = 'BOUND_PA:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
//  UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
//  Initalize the Power Accuracy menu sub-tabs
//---------------------------------------------------------
function initPASubTabs(uid) {
  // create a menu object for the PA Display tabs
  eval('menuPADisplay' + uid + '=initMenu(\'tabPADisplay' + uid + '\', \'tPADisplay' + uid + '\', 3, \'tabbody\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menuPADisplay' + uid), 0);
}

//---------------------------------------------------------
// Add numeric options to a select
//---------------------------------------------------------
function addNumericOptions(s, length) {
  var i;

  for (var i=1; i<=length; i++) {
    var o=document.createElement('option');
    o.text = i
    o.value = i
    try {
      s.add(o,null); // standards compliant
    } catch(ex) {
      s.add(o);      // IE only
    }
  }
}

//---------------------------------------------------------
// Sets table row styling to alternate colors
//---------------------------------------------------------
function setPATableRows(uid, tableName) {
  var table  = document.getElementById(tableName + uid);
  var j = 0;

  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].className = "" // clear all rows
    if (j%2!=0) table.rows[i].className += " o" // odd row
    j++;
  }
}