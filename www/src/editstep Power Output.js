//---------------------------------------------------------
// This is the main initialization routine to
// initialize the Power Output step.
// It requires the following items:
//
//   * global STIMULUS_PO object filled
//   * global MEASUREMENT_PO object filled
//   * global DISPLAY_PO object filled
//   * global BOUND_PO object filled
//---------------------------------------------------------
function initStepPowerOutput(uid) {

  // create a unique menu and show tab 0
  var tabs = 5; // Power Output configuration has seven tabs

  // sets up a menu global for this panel
  eval('menu' + uid + '=initMenu(\'tab' + uid + '\', \'t' + uid + '\', ' + tabs + ', \'paneltabcontent\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menu' + uid), 0);

  setPOStimulusControls(uid);
  setPOMeasurementControls(uid);
  setPODisplayControls(uid);
  setPOBoundControls(uid);
}

//---------------------------------------------------------
// This is the main save routine to save the
// Power Output step to the DB.
// It requires the following items:
//
//   * global STIMULUS_PO object filled
//   * global MEASUREMENT_PO object filled
//   * global DISPLAY_PO object filled
//   * global BOUND_PO object filled
//---------------------------------------------------------
function saveStepPowerOutput(uid) {
  var PowerOutputKeys = "";

  PowerOuputKeys = savePOStimulusObject(uid);
  PowerOuputKeys = PowerOuputKeys + "&" + savePOMeasurementObject(uid);
  PowerOuputKeys = PowerOuputKeys + "&" + savePODisplayObject(uid);
  PowerOuputKeys = PowerOuputKeys + "&" + savePOBoundObject(uid);

  return PowerOuputKeys;
}

//---------------------------------------------------------------STIMULUS_PO OBJECT----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the STIMULUS_PO object.  These
//   are manipulated in the edit Power Ouput.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The STIMULUS_PO object is the basis for
// all stimulus parameters for the step.
//---------------------------------------------------------
function STIMULUS_PO(freqType, FREQRANGES_PO, padMN, padSN) {
  this.freqType = freqType;
  this.FREQRANGES_PO = FREQRANGES_PO;
  this.padMN = padMN;
  this.padSN = padSN;
}

//-------------------------------------------------------
//   Defines and handles the FREQRANGES_PO[] array
//   of the STIMULUS_PO object.  These are manipulated
//   in the edit Power Output.htm template page using
//   the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The RANGE_PO object is the basis for all limits in the step.
//---------------------------------------------------------
function RANGE_PO(start, stop) {
  this.start = start;
  this.stop = stop;
}

//---------------------------------------------------------
// This is the main save routine to save the
// STIMULUS_PO object to the DB.
// It requires the following items:
//
//   * global STIMULUS_PO object filled
//---------------------------------------------------------
function savePOStimulusObject(uid) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  var stimulusKeys = "";

  stimulusKeys = stimulusKeys + "freqType=" + STIMULUS_PO.freqType + "&";
  if (STIMULUS_PO.freqType == "Custom") {
    for (var i=0; i<STIMULUS_PO.FREQRANGES_PO.length; i++) {
      stimulusKeys = stimulusKeys + "start" + i + "=" + STIMULUS_PO.FREQRANGES_PO[i].start + "&";
      stimulusKeys = stimulusKeys + "stop" + i + "=" + STIMULUS_PO.FREQRANGES_PO[i].stop + "&";
    }
  }
  stimulusKeys = stimulusKeys + "padMN=" + STIMULUS_PO.padMN + "&";
  stimulusKeys = stimulusKeys + "padSN=" + STIMULUS_PO.padSN;

  return stimulusKeys
}

//---------------------------------------------------------
// This is the main function to set
// the stimulus parameters from the STIMULUS_PO object.
// It requires the following items:
//
//   * global STIMULUS_PO object filled
//   * control with id 'freqType'
//   * control with id 'FREQRANGES_PO'
//   * control with id 'padMN'
//   * control with id 'padSN'
//---------------------------------------------------------
function setPOStimulusControls(uid) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  var freqTypeList = [];
  var freqType = document.getElementById('freqType' + uid).options;

  // Create lists to search
  for (var i=0; i<freqType.length; i++) {
    freqTypeList[i] = freqType[i].text;
  }

  // Set all stimulus parameters
  document.getElementById('freqType' + uid).selectedIndex = freqTypeList.indexOf(STIMULUS_PO.freqType);
  document.getElementById('padMN' + uid).value = STIMULUS_PO.padMN;
  document.getElementById('padSN' + uid).value = STIMULUS_PO.padSN;

  // Disable is Custom is not selected
  if (STIMULUS_PO.freqType == "Band Edges") {
    $('#_addPOFrequencyRange' + uid).attr("className", "adder_grayedout")
                                    .attr("title", "Band Edges is selected")
                                    .attr("onClick", "");
  }

  // Disable controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('freqType' + uid).disabled = true;
    document.getElementById('padMN' + uid).disabled = true;
    document.getElementById('padSN' + uid).disabled = true;
    $('#_addPOFrequencyRange' + uid).attr("className", "adder_grayedout")
                                    .attr("title", "Cannot change sequence")
                                    .attr("onClick", "");
  }
  
  buildPOFrequencyRangesTable(uid);
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the stimulus parameters
//---------------------------------------------------------

//---------------------------------------------------------
//  Stimulus:  Frequency Type
//---------------------------------------------------------
function savePOFrequencyType(uid) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  STIMULUS_PO.freqType = document.getElementById('freqType' + uid).options[document.getElementById('freqType' + uid).selectedIndex].value;
  
  // Disable is Custom is not selected
  if (STIMULUS_PO.freqType == "Band Edges") {
    $('#_addPOFrequencyRange' + uid).attr("className", "adder_grayedout")
                                    .attr("title", "Band Edges is selected")
                                    .attr("onClick", "");
  } else {
    $('#_addPOFrequencyRange' + uid).attr("className", "adder")
                                    .attr("title", "Add another frequency point")
                                    .attr("onClick", "addPOFrequencyPoint('" + uid + "');");
  }

  makeChanges();
  buildPOFrequencyRangesTable(uid);
}

//---------------------------------------------------------
//  Stimulus:  Pad Model Number
//---------------------------------------------------------
function savePOPadMN(uid) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  STIMULUS_PO.padMN = document.getElementById('padMN' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Pad Serial Number
//---------------------------------------------------------
function savePOPadSN(uid) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  STIMULUS_PO.padSN = document.getElementById('padSN' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
// This is the main function to build
// the ranges table from the RANGES_PO array
// It requires the following items:
//
//   * global RANGES_PO[] array filled
//   * table with id 'freqRanges'
//---------------------------------------------------------
function buildPOFrequencyRangesTable(uid) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  var tbl = document.getElementById('freqRanges' + uid);

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
  for (var i=0; i<STIMULUS_PO.FREQRANGES_PO.length; i++) {
    var row = tbl.insertRow(i + 1); // there's a header row

    //---------------------------------------------------------
    //  Cell 0:  Frequency Range Number
    //    Row header showing the frequency range number with
    //    a little different method here as it's a "th" element
    var cell0 = document.createElement('th');
    cell0.className = "rowheader";
    var el0 = document.createTextNode(i + 1);
    cell0.title     = "Frequency Range Number"
    cell0.appendChild(el0);
    row.appendChild(cell0);

    //---------------------------------------------------------
    //  Cell 1:  Delete Frequency Range (row)
    //    Holds an icon/link to delete the row
    var cell1 = row.insertCell(1);
    cell1.className = "icon";
    var el1   = document.createElement('img');
    if (!EDITDISABLED && STIMULUS_PO.freqType == "Custom") {
      el1.src   = "/images/deletesmall.gif";
      el1.title = "Delete this frequency range";
      el1.onclick = new Function ("removePOFrequencyRange('" + uid + "', " + i + ");");
    } else {
      el1.src   = "/images/deletesmalldisabled.gif";
      el1.title = "Cannot edit";
    }
    cell1.appendChild(el1);

    //---------------------------------------------------------
    //  Cell 2:  Frequency Range Reordering
    //    Holds a couple of images/links to handle
    //    reordering rows of the frequency range table
    var cell2 = row.insertCell(2);
    cell2.className = "icon";

    //  Move up (toward top of list; index gets smaller)
    var el2aUp    = document.createElement('a');
    el2aUp.href   = "#nogo";
    var el2aUpImg = document.createElement('img');
    el2aUpImg.className = "movers";
    if (i==0 || EDITDISABLED || STIMULUS_PO.freqType == "Band Edges") {    // disable UP on first element
      el2aUpImg.src     = "/images/upsmalldisabled.gif";
    } else {
      el2aUp.title   = "move up"
      el2aUp.onclick = new Function("this.blur(); movePOFrequencyRange('" + uid + "', -(" + i + "));");
      el2aUpImg.src  = "/images/upsmall.gif";
    }
    el2aUp.appendChild(el2aUpImg);

    //  Move down (toward bottom of list; index gets bigger)
    var el2aDwn    = document.createElement('a');
    el2aDwn.href   = "#nogo";
    var el2aDwnImg = document.createElement('img');
    el2aDwnImg.className = "movers";
    if (i==STIMULUS_PO.FREQRANGES_PO.length - 1 || EDITDISABLED || STIMULUS_PO.freqType == "Band Edges") {  // disable DOWN on last element
      el2aDwnImg.src     = "/images/downsmalldisabled.gif";
    } else {
      el2aDwn.title      = "move down"
      el2aDwn.onclick    = new Function ("this.blur(); movePOFrequencyRange('" + uid + "', " + i + ");");
      el2aDwnImg.src     = "/images/downsmall.gif";
    }
    el2aDwn.appendChild(el2aDwnImg);

    cell2.appendChild(el2aUp);
    cell2.appendChild(el2aDwn);
    
    //---------------------------------------------------------
    //  Cell 3:  Frequency Start
    //    Holds a text entry box to define the frequency
    //    start to be used for the range
    var cell3  = row.insertCell(3);
    cell3.className = "ni";

    var el3a   = document.createElement('input');
    el3a.type  = "text"
    el3a.className = "hidden";
    el3a.id    = i + "frequencyStart" + uid;
    el3a.name  = i + "frequencyStart" + uid;
    el3a.value = STIMULUS_PO.FREQRANGES_PO[i].start;
    el3a.onblur = new Function ("saveFrequencyRangeStart(" + uid + ", " + i + ");");

    var el3b  = document.createElement('div');
    var el3c  = document.createTextNode((STIMULUS_PO.FREQRANGES_PO[i].start == "")? "--" : STIMULUS_PO.FREQRANGES_PO[i].start);
    el3b.id   = i + "frequencyStartDisplay" + uid;
    el3b.appendChild(el3c);
    
    if (!EDITDISABLED && STIMULUS_PO.freqType == "Custom") {
      cell3.title     = "Click to edit the start frequency";
      el3b.onclick   = new Function ("setPOFrequencyRangeStart('" + uid + "', " + i + ");");
    } else {
      cell3.className = "grayedout";
    }

    cell3.appendChild(el3a);
    cell3.appendChild(el3b);
    
    //---------------------------------------------------------
    //  Cell 4:  Frequency Stop
    //    Holds a text entry box to define the frequency
    //    stop to be used for the range
    var cell4  = row.insertCell(4);
    cell4.className = "ni";

    var el4a   = document.createElement('input');
    el4a.type  = "text"
    el4a.className = "hidden";
    el4a.id    = i + "frequencyStop" + uid;
    el4a.name  = i + "frequencyStop" + uid;
    el4a.value = STIMULUS_PO.FREQRANGES_PO[i].stop;
    el4a.onblur = new Function ("saveFrequencyRangeStop(" + uid + ", " + i + ");");

    var el4b  = document.createElement('div');
    var el4c  = document.createTextNode((STIMULUS_PO.FREQRANGES_PO[i].stop == "")? "--" : STIMULUS_PO.FREQRANGES_PO[i].stop);
    el4b.id   = i + "frequencyStopDisplay" + uid;
    el4b.appendChild(el4c);

    if (!EDITDISABLED && STIMULUS_PO.freqType == "Custom") {
      cell4.title     = "Click to edit the stop frequency";
      el4b.onclick   = new Function ("setPOFrequencyRangeStop('" + uid + "', " + i + ");");
    } else {
      cell4.className = "grayedout";
    }

    cell4.appendChild(el4a);
    cell4.appendChild(el4b);
    
    //---------------------------------------------------------
    //  Cell 5:  Filler Cell
    //    Holds a blank cell as a filler cell
    row.insertCell(5);
  }

  // everything's added - paint the table styles
  setPOTableRows(uid, 'freqRanges');
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the frequency
// points table
//---------------------------------------------------------

//---------------------------------------------------------
//  Frequency Ranges Table Cell 1:  Remove Frequency Range (row)
//---------------------------------------------------------
function removePOFrequencyRange(uid, i) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  STIMULUS_PO.FREQRANGES_PO.splice(i, 1);

  makeChanges();
  buildPOFrequencyRangesTable(uid);
}

//---------------------------------------------------------
//  Frequency Ranges Table Cell 2:  Reorder Frequency Ranges
//---------------------------------------------------------
function movePOFrequencyRange(uid, i) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  var dir=1;
  if (i<0) {
    dir = -1;
    i   = -i;
  }

  var temp = new copyPORange(STIMULUS_PO.FREQRANGES_PO[i + dir]); // save range above (or below)
  STIMULUS_PO.FREQRANGES_PO[i + dir] = null;
  STIMULUS_PO.FREQRANGES_PO[i + dir] = new copyPORange(STIMULUS_PO.FREQRANGES_PO[i]); // replace index with next (or prev)
  STIMULUS_PO.FREQRANGES_PO[i] = null;
  STIMULUS_PO.FREQRANGES_PO[i] = new copyPORange(temp); // move temp back
  temp = null;

  makeChanges();
  buildPOFrequencyRangesTable(uid);
}

//---------------------------------------------------------
//  Frequency Ranges Table Cell 3:  Change Start Frequency
//---------------------------------------------------------
function setPOFrequencyRangeStart(uid, i) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  var pname = i;
  var dtext = document.getElementById(pname + "frequencyStartDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = pname + "_text" + uid;
  t.value = STIMULUS_PO.FREQRANGES_PO[i].start;
  t.onblur = new Function ("this.value = validateNumeric(this.value); savePOChangedFrequencyRangeStart('" + uid + "', " + i + ");");   // handle storing after edit
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

function savePOChangedFrequencyRangeStart(uid, i) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  var pname = i;
  var t     = document.getElementById(pname + "_text" + uid);
  var j     = t.value; // get the start frequency text

  // don't make changes if they didn't select a new frequency
  if (j != STIMULUS_PO.FREQRANGES_PO[i].start) {
    STIMULUS_PO.FREQRANGES_PO[i].start = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildPOFrequencyRangesTable(uid);
}

//---------------------------------------------------------
//  Frequency Ranges Table Cell 3:  Change Stop Frequency
//---------------------------------------------------------
function setPOFrequencyRangeStop(uid, i) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  var pname = i;
  var dtext = document.getElementById(pname + "frequencyStopDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = pname + "_text" + uid;
  t.value = STIMULUS_PO.FREQRANGES_PO[i].stop;
  t.onblur = new Function ("this.value = validateNumeric(this.value); savePOChangedFrequencyRangeStop('" + uid + "', " + i + ");");   // handle storing after edit
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

function savePOChangedFrequencyRangeStop(uid, i) {
  var STIMULUS_PO = getPOStimulusObject(uid);
  var pname = i;
  var t     = document.getElementById(pname + "_text" + uid);
  var j     = t.value; // get the start frequency text

  // don't make changes if they didn't select a new frequency
  if (j != STIMULUS_PO.FREQRANGES_PO[i].stop) {
    STIMULUS_PO.FREQRANGES_PO[i].stop = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildPOFrequencyRangesTable(uid);
}

//---------------------------------------------------------
//  Add new FREQUENCY_RANGES_PO to the table
//---------------------------------------------------------
function addPOFrequencyPoint(uid) {
  if (EDITDISABLED) return;
  var STIMULUS_PO = getPOStimulusObject(uid);

  STIMULUS_PO.FREQRANGES_PO[STIMULUS_PO.FREQRANGES_PO.length] = new RANGE_PO(0, 0);

  makeChanges();
  buildPOFrequencyRangesTable(uid);
}

//---------------------------------------------------------
// STIMULUS_PO UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the STIMULUS_PO object with the unique id
//---------------------------------------------------------
function getPOStimulusObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('STIMULUS_PO' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('stimulusSetup' + uid).value);
  }
  return (eval('STIMULUS_PO' + uid));
}

//---------------------------------------------------------
// Displays the STIMULUS_PO object for debugging
//---------------------------------------------------------
function displayPOStimulus(m) {
    var output = 'STIMULUS_PO:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
// returns a copy of a RANGE_PO object
//---------------------------------------------------------
function copyPORange(f) {
  for (i in f) this[i] = f[i];
}

//---------------------------------------------------------------MEASUREMENT_PO OBJECT-------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the MEASUREMENT_PO object.
//   This is manipulated in the edit Power Ouput.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The MEASUREMENT_PO object is the basis for
// all measurements in the step.
//---------------------------------------------------------
function MEASUREMENT_PO(port, direction, stepSize) {
  this.port = port;
  this.direction = direction;
  this.stepSize = stepSize;
}

//---------------------------------------------------------
// This is the main save routine to save the
// MEASUREMENT_PO object to the DB.
// It requires the following items:
//
//   * global MEASUREMENT_PO object filled
//---------------------------------------------------------
function savePOMeasurementObject(uid) {
  var MEASUREMENT_PO = getPOMeasurementObject(uid);
  var measurementKeys = "";
  
  measurementKeys = measurementKeys + "port=" + MEASUREMENT_PO.port + "&";
  measurementKeys = measurementKeys + "direction=" + MEASUREMENT_PO.direction + "&";
  measurementKeys = measurementKeys + "stepSize=" + MEASUREMENT_PO.stepSize;

  return measurementKeys
}

//---------------------------------------------------------
// This is the main function to set
// the measurement parameters from the MEASUREMENT_PO object.
// It requires the following items:
//
//   * global MEASUREMENT_PO object filled
//   * control with id 'port'
//   * control with id 'direction'
//   * control with id 'stepSize'
//---------------------------------------------------------
function setPOMeasurementControls(uid) {
  var MEASUREMENT_PO = getPOMeasurementObject(uid);

  var portList = [];
  var directionList = [];
  var stepSizeList = [];
  var port = document.getElementById('port' + uid).options;
  var direction = document.getElementById('direction' + uid).options;
  var stepSize = document.getElementById('stepSize' + uid).options;

  // Create lists to search
  for (var i=0; i<port.length; i++) {
    portList[i] = port[i].text;
  }
  for (var i=0; i<direction.length; i++) {
    directionList[i] = direction[i].text;
  }
  for (var i=0; i<stepSize.length; i++) {
    stepSizeList[i] = stepSize[i].text;
  }

  // set all measurement parameters
  document.getElementById('port' + uid).selectedIndex = portList.indexOf(MEASUREMENT_PO.port);
  document.getElementById('direction' + uid).selectedIndex = directionList.indexOf(MEASUREMENT_PO.direction);
  document.getElementById('stepSize' + uid).selectedIndex = stepSizeList.indexOf(MEASUREMENT_PO.stepSize);
  changePOParameter(uid);

  // Disable all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('port' + uid).disabled = true;
    document.getElementById('direction' + uid).disabled = true;
    document.getElementById('stepSize' + uid).disabled = true;
  }
}

//---------------------------------------------------------
//  Mearurement:  Port
//---------------------------------------------------------
function savePOPort(uid) {
  var MEASUREMENT_PO = getPOMeasurementObject(uid);
  MEASUREMENT_PO.port = document.getElementById('port' + uid).options[document.getElementById('port' + uid).selectedIndex].value;
  changePOParameter(uid);
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Direction
//---------------------------------------------------------
function savePODirection(uid) {
  var MEASUREMENT_PO = getPOMeasurementObject(uid);
  MEASUREMENT_PO.direction = document.getElementById('direction' + uid).options[document.getElementById('direction' + uid).selectedIndex].value;
  changePOParameter(uid);
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Step Size
//---------------------------------------------------------
function savePOStepSize(uid) {
  var MEASUREMENT_PO = getPOMeasurementObject(uid);
  MEASUREMENT_PO.stepSize = document.getElementById('stepSize' + uid).options[document.getElementById('stepSize' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
// MEASUREMENT_PO UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Changes the parameter label
//---------------------------------------------------------
function changePOParameter(uid) {
  var MEASUREMENT_PO = getPOMeasurementObject(uid);
  var response;
  var stimulus;

  if (MEASUREMENT_PO.port == "Port 1") {
    stimulus = 1;
    if (MEASUREMENT_PO.direction == "Reverse") response = 1;
    else response = 2;
  } else {
    stimulus = 2;
    if (MEASUREMENT_PO.direction == "Reverse") response = 2;
    else response = 1;
  }
  document.getElementById('portLabel' + uid).innerHTML = "P" + response + "" + stimulus;
}

//---------------------------------------------------------
// Gets the MEASUREMENT_PO object with the unique id
//---------------------------------------------------------
function getPOMeasurementObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('MEASUREMENT_PO' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('measurementSetup' + uid).value);
  }
  return (eval('MEASUREMENT_PO' + uid));
}

//---------------------------------------------------------
// Displays the MEASUREMENT_PO object for debugging
//---------------------------------------------------------
function displayPOMeasurement(m) {
    var output = 'MEASUREMENT_PO:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------------DISPLAY_PO OBJECT-----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the DISPLAY_PO object.  This
//   is manipulated in the edit Power Ouput.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The DISPLAY_PO object is the basis for
// all DISPLAY_PO parameters for the step.
//---------------------------------------------------------
function DISPLAY_PO(frequencyMin, frequencyMax, powerMin, powerMax) {
  this.frequencyMin = frequencyMin;
  this.frequencyMax = frequencyMax;
  this.powerMin = powerMin;
  this.powerMax = powerMax;
}

//---------------------------------------------------------
// This is the main save routine to save the
// DISPLAY_PO object to the DB.
// It requires the following items:
//
//   * global DISPLAY_PO object filled
//---------------------------------------------------------
function savePODisplayObject(uid) {
  var DISPLAY_PO = getPODisplayObject(uid);
  var displayKeys = "";

  displayKeys = displayKeys + "frequencyMin=" + DISPLAY_PO.frequencyMin + "&";
  displayKeys = displayKeys + "frequencyMax=" + DISPLAY_PO.frequencyMax + "&";
  displayKeys = displayKeys + "powerMin=" + DISPLAY_PO.powerMin + "&";
  displayKeys = displayKeys + "powerMax=" + DISPLAY_PO.powerMax;

  return displayKeys
}

//---------------------------------------------------------
// This is the main function to set
// the DISPLAY_PO parameters from the DISPLAY_PO object.
// It requires the following items:
//
//   * global DISPLAY_PO object filled
//   * control with id 'frequencyMin'
//   * control with id 'frequencyMax'
//   * control with id 'powerMin'
//   * control with id 'powerMax'
//---------------------------------------------------------
function setPODisplayControls(uid) {
  var DISPLAY_PO = getPODisplayObject(uid);
  var frequencyMin, frequencyMax, powerMin, powerMax, disabled, checked;

  // Set all display parameters
  document.getElementById('frequencyMin' + uid).value = DISPLAY_PO.frequencyMin;
  document.getElementById('frequencyMax' + uid).value = DISPLAY_PO.frequencyMax;
  document.getElementById('powerMin' + uid).value = DISPLAY_PO.powerMin;
  document.getElementById('powerMax' + uid).value = DISPLAY_PO.powerMax;
  
  if (DISPLAY_PO.frequencyMin == -1 && DISPLAY_PO.frequencyMax == -1) {
    frequencyMin = "Auto";
    frequencyMax = "Auto";
    disabled = true;
    checked = true;
  } else {
    frequencyMin = DISPLAY_PO.frequencyMin;
    frequencyMax = DISPLAY_PO.frequencyMax;
    disabled = false
    checked = false;
  }
  document.getElementById('frequencyMin' + uid).value = frequencyMin;
  document.getElementById('frequencyMax' + uid).value = frequencyMax;
  document.getElementById('frequencyMin' + uid).disabled = disabled;
  document.getElementById('frequencyMax' + uid).disabled = disabled;
  document.getElementById('autoFrequency' + uid).checked = checked;

  if (DISPLAY_PO.powerMin == -1 && DISPLAY_PO.powerMax == -1) {
    powerMin = "Auto";
    powerMax = "Auto";
    disabled = true;
    checked = true;
  } else {
    powerMin = DISPLAY_PO.powerMin;
    powerMax = DISPLAY_PO.powerMax;
    disabled = false
    checked = false;
  }
  document.getElementById('powerMin' + uid).value = powerMin;
  document.getElementById('powerMax' + uid).value = powerMax;
  document.getElementById('powerMin' + uid).disabled = disabled;
  document.getElementById('powerMax' + uid).disabled = disabled;
  document.getElementById('autoPower' + uid).checked = checked;
  
  // Disable all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('powerMin' + uid).disabled = true;
    document.getElementById('powerMax' + uid).disabled = true;
    document.getElementById('autoPower' + uid).disabled = true;
    document.getElementById('frequencyMin' + uid).disabled = true;
    document.getElementById('frequencyMax' + uid).disabled = true;
    document.getElementById('autoFrequency' + uid).disabled = true;
  }
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the display parameters
//---------------------------------------------------------

//---------------------------------------------------------
//  Display:  Frequency Minimum
//---------------------------------------------------------
function savePOFrequencyMin(uid) {
  var DISPLAY_PO = getPODisplayObject(uid);
  DISPLAY_PO.frequencyMin = document.getElementById('frequencyMin' + uid).value;
  
  // Check the bounds of the user entered value
  if (DISPLAY_PO.frequencyMin < 1) {
    DISPLAY_PO.frequencyMin = 1;
    document.getElementById('frequencyMin' + uid).value = 1;
  }
  if (DISPLAY_PO.frequencyMin > DISPLAY_PO.frequencyMax) {
    DISPLAY_PO.frequencyMax = DISPLAY_PO.frequencyMin;
    document.getElementById('frequencyMax' + uid).value = DISPLAY_PO.frequencyMin;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Frequency Maximum
//---------------------------------------------------------
function savePOFrequencyMax(uid) {
  var DISPLAY_PO = getPODisplayObject(uid);
  DISPLAY_PO.frequencyMax = document.getElementById('frequencyMax' + uid).value;
  
  // Check the bounds of the user entered value
  if (DISPLAY_PO.frequencyMax < 1) {
    DISPLAY_PO.frequencyMax = 1;
    document.getElementById('frequencyMax' + uid).value = 1;
  }
  if (DISPLAY_PO.frequencyMax < DISPLAY_PO.frequencyMin) {
    DISPLAY_PO.frequencyMin = DISPLAY_PO.frequencyMax;
    document.getElementById('frequencyMin' + uid).value = DISPLAY_PO.frequencyMax;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Auto Frequency
//---------------------------------------------------------
function savePOAutoFrequency(uid) {
  var DISPLAY_PO = getPODisplayObject(uid);
  var auto = document.getElementById('autoFrequency' + uid).checked;

  if (auto) {
    DISPLAY_PO.frequencyMin = -1;
    DISPLAY_PO.frequencyMax = -1;
  }else {
    DISPLAY_PO.frequencyMin = document.getElementById('frequencyMin' + uid).value;
    DISPLAY_PO.frequencyMax = document.getElementById('frequencyMax' + uid).value;
  }

  // Set enable state
  document.getElementById('frequencyMin' + uid).disabled = auto;
  document.getElementById('frequencyMax' + uid).disabled = auto;

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Power Minimum
//---------------------------------------------------------
function savePOPowerMin(uid) {
  var DISPLAY_PO = getPODisplayObject(uid);
  var STIMULUS_PO = getPOStimulusObject(uid);
  DISPLAY_PO.powerMin = document.getElementById('powerMin' + uid).value;
  
  // Check the bounds of the user entered value
  if (DISPLAY_PO.powerMin < 30) {
    DISPLAY_PO.powerMin = 30;
    document.getElementById('powerMin' + uid).value = 30;
  }else if (DISPLAY_PO.powerMin > 50) {
    DISPLAY_PO.powerMin = 50;
    document.getElementById('powerMin' + uid).value = 50;
  }
  if (DISPLAY_PO.powerMin < STIMULUS_PO.powerStart) {
    DISPLAY_PO.powerMin = STIMULUS_PO.powerStart;
    document.getElementById('powerMin' + uid).value = STIMULUS_PO.powerStart;
  }else if (DISPLAY_PO.powerMin > STIMULUS_PO.powerStop) {
    DISPLAY_PO.powerMin = STIMULUS_PO.powerStop;
    document.getElementById('powerMin' + uid).value = STIMULUS_PO.powerStop;
  }
  if (DISPLAY_PO.powerMin > DISPLAY_PO.powerMax) {
    DISPLAY_PO.powerMax = DISPLAY_PO.powerMin;
    document.getElementById('powerMax' + uid).value = DISPLAY_PO.powerMin;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Power Maximum
//---------------------------------------------------------
function savePOPowerMax(uid) {
  var DISPLAY_PO = getPODisplayObject(uid);
  var STIMULUS_PO = getPOStimulusObject(uid);
  DISPLAY_PO.powerMax = document.getElementById('powerMax' + uid).value;
  
  // Check the bounds of the user entered value
  if (DISPLAY_PO.powerMax < 30) {
    DISPLAY_PO.powerMax = 30;
    document.getElementById('powerMax' + uid).value = 30;
  }else if (DISPLAY_PO.powerMax > 50) {
    DISPLAY_PO.powerMax = 50;
    document.getElementById('powerMax' + uid).value = 50;
  }
  if (DISPLAY_PO.powerMax < STIMULUS_PO.powerStart) {
    DISPLAY_PO.powerMax = STIMULUS_PO.powerStart;
    document.getElementById('powerMax' + uid).value = STIMULUS_PO.powerStart;
  }else if (DISPLAY_PO.powerMax > STIMULUS_PO.powerStop) {
    DISPLAY_PO.powerMax = STIMULUS_PO.powerStop;
    document.getElementById('powerMax' + uid).value = STIMULUS_PO.powerStop;
  }
  if (DISPLAY_PO.powerMax < DISPLAY_PO.powerMin) {
    DISPLAY_PO.powerMin = DISPLAY_PO.powerMax;
    document.getElementById('powerMin' + uid).value = DISPLAY_PO.powerMax;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Auto Power
//---------------------------------------------------------
function savePOAutoPower(uid) {
  var DISPLAY_PO = getPODisplayObject(uid);
  var auto = document.getElementById('autoPower' + uid).checked;

  if (auto) {
    DISPLAY_PO.powerMin = -1;
    DISPLAY_PO.powerMax = -1;
  }else {
    DISPLAY_PO.powerMin = document.getElementById('powerMin' + uid).value;
    DISPLAY_PO.powerMax = document.getElementById('powerMax' + uid).value;
  }

  // Set enable state
  document.getElementById('powerMin' + uid).disabled = auto;
  document.getElementById('powerMax' + uid).disabled = auto;

  makeChanges();
}

//---------------------------------------------------------
// DISPLAY_PO UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the DISPLAY_PO object with the unique id
//---------------------------------------------------------
function getPODisplayObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('DISPLAY_PO' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('displaySetup' + uid).value);
  }
  return (eval('DISPLAY_PO' + uid));
}

//---------------------------------------------------------
// Displays the DISPLAY_PO object for debugging
//---------------------------------------------------------
function displayPODisplay(m) {
    var output = 'DISPLAY_PO:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------------BOUND_PO OBJECT-------------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the BOUND_PO object.  This
//   is manipulated in the edit S Parameter.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------
function BOUND_PO(minPower) {
  this.minPower = minPower;
}
//-------------------------------------------------------
//   Defines and handles the
//   BOUND_PO object.  These are manipulated
//   in the edit Power Ouput.htm template page using
//   the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// This is the main save routine to save the
// BOUND_PO object to the DB.
// It requires the following items:
//
//   * global BOUND_PO object filled
//---------------------------------------------------------
function savePOBoundObject(uid) {
  var BOUND_PO = getPOBoundObject(uid);
  var boundKeys = "";

  boundKeys = boundKeys + "minPower=" + BOUND_PO.minPower;

  return boundKeys
}

//---------------------------------------------------------
// This is the main function to set
// the BOUND_PO parameters from the BOUND_PO object.
// It requires the following items:
//
//   * global BOUND_PO object filled
//   * control with id 'minPower'
//---------------------------------------------------------
function setPOBoundControls(uid) {
  var BOUND_PO = getPOBoundObject(uid);

  // Set all display parameters
  document.getElementById('minPower' + uid).value = BOUND_PO.minPower;

  // Disable all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('minPower' + uid).disabled = true;
  }
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the bound parameters
//---------------------------------------------------------

//---------------------------------------------------------
//  Limit:  Minimum Power
//---------------------------------------------------------
function savePOMinimumPower(uid) {
  var BOUND_PO = getPOBoundObject(uid);
  BOUND_PO.minPower = document.getElementById('minPower' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
// BOUND_PO UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the BOUND_PO object with the unique id
//---------------------------------------------------------
function getPOBoundObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('BOUND_PO' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('boundSetup' + uid).value);
  }
  return (eval('BOUND_PO' + uid));
}

//---------------------------------------------------------
// Displays the BOUND_PO object for debugging
//---------------------------------------------------------
function displayPOBound(m) {
    var output = 'BOUND_PO:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
//  UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
//  Initalize the Power Ouput menu sub-tabs
//---------------------------------------------------------
function initPOSubTabs(uid) {
  // create a menu object for the PO Display tabs
  eval('menuPODisplay' + uid + '=initMenu(\'tabPODisplay' + uid + '\', \'tPODisplay' + uid + '\', 3, \'tabbody\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menuPODisplay' + uid), 0);
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
function setPOTableRows(uid, tableName) {
  var table  = document.getElementById(tableName + uid);
  var j = 0;

  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].className = "" // clear all rows
    if (j%2!=0) table.rows[i].className += " o" // odd row
    j++;
  }
}