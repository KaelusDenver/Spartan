//---------------------------------------------------------
// This is the main initialization routine to
// initialize the S Parameter step.
// It requires the following items:
//
//   * global STIMULUS_SP object filled
//   * global MEASUREMENT_SP object filled
//   * global DEEMBED_SP object filled
//   * global DISPLAY_SP object filled
//   * global BOUND_SP object filled
//---------------------------------------------------------
function initStepSParameter(uid) {

  // create a unique menu and show tab 0
  var tabs = 7; // S Parameter configuration has seven tabs

  // sets up a menu global for this panel
  eval('menu' + uid + '=initMenu(\'tab' + uid + '\', \'t' + uid + '\', ' + tabs + ', \'paneltabcontent\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menu' + uid), 0);


  setSPStimulusControls(uid);
  setSPMeasurementControls(uid);
  setSPDeEmbedControls(uid);
  setSPDisplayControls(uid);
  setSPFilterControls(uid);
  
  // Set first limit active if present then build limits and points tables
  var BOUND_SP = getSPBoundObject(uid);
  if (BOUND_SP.LIMITS_SP.length > 0) BOUND_SP.activeLimit = 0;
  buildSPLimitsTable(uid);
  buildSPPointsTable(uid);
  
  // Disable controls if EDITDISABLED
  if(EDITDISABLED) {
    var A = ["_addSPParameter", "_addSPAdapter", "_addSPMarker", "_copySPMarkers", "_addSPLimit", "_addSPLimitCopy", "_addSPPoint", "_addSPPointCopy", "_addSPAttenuation", "_addSPAttenuationCopy", "_addSPSkirt", "_addSPSkirtCopy", "_addDatasheet"/*, "_addSPTrace"*/];
    
    for (var i=0; i<=A.length; i++) {
      $('#' + A[i] + uid).attr("className", "adder_grayedout")
                         .attr("title", "Cannot change sequence");
    }

//    document.getElementById('printall' + uid).disabled = true;
  }
}

//---------------------------------------------------------
// This is the main save routine to save the
// S Parameter step to the DB.
// It requires the following items:
//
//   * global STIMULUS_SP object filled
//   * global MEASUREMENT_SP object filled
//   * global DEEMBED_SP object filled
//   * global DISPLAY_SP object filled
//   * global BOUND_SP object filled
//---------------------------------------------------------
function saveStepSParameter(uid) {
  var SParameterKeys = "";

  SParameterKeys = saveSPStimulusObject(uid);
  SParameterKeys = SParameterKeys + "&" + saveSPMeasurementObject(uid);
  SParameterKeys = SParameterKeys + "&" + saveSPDeEmbedObject(uid);
  SParameterKeys = SParameterKeys + "&" + saveSPDisplayObject(uid);
  SParameterKeys = SParameterKeys + "&" + saveSPBoundObject(uid);
  SParameterKeys = SParameterKeys + "&" + saveSPFilterObject(uid);

  return SParameterKeys;
}

//---------------------------------------------------------------STIMULUS_SP OBJECT----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the STIMULUS_SP object.  These
//   are manipulated in the edit S Parameter.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The STIMULUS_SP object is the basis for
// all stimulus parameters for the step.
//---------------------------------------------------------
function STIMULUS_SP(instrumentState, calibrate, blank, sweepType, startFreq, stopFreq, units, points, power, ifbw, sweepTime) {
  this.instrumentState = instrumentState;
  this.calibrate = calibrate;
  this.blank = blank;
  this.sweepType = sweepType;
  this.startFreq = startFreq;
  this.stopFreq = stopFreq;
  this.units = units;
  this.points = points;
  this.power = power;
  this.ifbw = ifbw;
  this.sweepTime = sweepTime;
}

//---------------------------------------------------------
// This is the main save routine to save the
// STIMULUS_SP object to the DB.
// It requires the following items:
//
//   * global STIMULUS_SP object filled
//---------------------------------------------------------
function saveSPStimulusObject(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var stimulusKeys = "";

  if (STIMULUS_SP.instrumentState) {
    stimulusKeys = stimulusKeys + "instrumentState=true&";
  }
  if (STIMULUS_SP.calibrate) {
    stimulusKeys = stimulusKeys + "calibrate=true&";
  }
  if (STIMULUS_SP.blank) {
    stimulusKeys = stimulusKeys + "blank=true&";
  }
  stimulusKeys = stimulusKeys + "sweepType=" + STIMULUS_SP.sweepType + "&";
  stimulusKeys = stimulusKeys + "startFreq=" + STIMULUS_SP.startFreq + "&";
  stimulusKeys = stimulusKeys + "stopFreq=" + STIMULUS_SP.stopFreq + "&";
  stimulusKeys = stimulusKeys + "units=" + STIMULUS_SP.units + "&";
  stimulusKeys = stimulusKeys + "points=" + STIMULUS_SP.points + "&";
  stimulusKeys = stimulusKeys + "power=" + STIMULUS_SP.power + "&";
  stimulusKeys = stimulusKeys + "ifbw=" + STIMULUS_SP.ifbw + "&";
  stimulusKeys = stimulusKeys + "sweepTime=" + STIMULUS_SP.sweepTime;
  
  return stimulusKeys
}

//---------------------------------------------------------
// This is the main function to set
// the stimulus parameters from the STIMULUS_SP object.
// It requires the following items:
//
//   * global STIMULUS_SP object filled
//   * control with id 'instrumentState'
//   * control with id 'calibrate'
//   * control with id 'blank'
//   * control with id 'sweepType'
//   * control with id 'startFreq'
//   * control with id 'stopFreq'
//   * control with id 'units'
//   * control with id 'points'
//   * control with id 'power'
//   * control with id 'ifbw'
//   * control with id 'sweepTime'
//   * control with id 'autoPower'
//   * control with id 'autoIFBW'
//   * control with id 'autoSweepTime'
//---------------------------------------------------------
function setSPStimulusControls(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var power, ifbw, sweepTime, disabled, checked;
  var sweepTypeList = [];
  var unitsList = [];
  var sweepType = document.getElementById('sweepType' + uid).options;
  var units = document.getElementById('units' + uid).options;
  
  // Create lists to search
  for (var i=0; i<sweepType.length; i++) {
    sweepTypeList[i] = sweepType[i].text;
  }
  for (var i=0; i<units.length; i++) {
    unitsList[i] = units[i].text;
  }

  // Set all stimulus parameters
  document.getElementById('instrumentState' + uid).checked = STIMULUS_SP.instrumentState;
  document.getElementById('calibrate' + uid).checked = STIMULUS_SP.calibrate;
  document.getElementById('blank' + uid).checked = STIMULUS_SP.blank;
  document.getElementById('sweepType' + uid).selectedIndex = sweepTypeList.indexOf(STIMULUS_SP.sweepType);
  document.getElementById('startFreq' + uid).value = STIMULUS_SP.startFreq;
  document.getElementById('stopFreq' + uid).value = STIMULUS_SP.stopFreq;
  document.getElementById('units' + uid).selectedIndex = unitsList.indexOf(STIMULUS_SP.units);
  document.getElementById('points' + uid).value = STIMULUS_SP.points;
  if (STIMULUS_SP.power == 999) {
    power = "Auto";
    disabled = true;
    checked = true;
  } else {
    power = STIMULUS_SP.power;
    disabled = STIMULUS_SP.instrumentState; // Disable if UCIS
    checked = false;
  }
  document.getElementById('power' + uid).value = power;
  document.getElementById('power' + uid).disabled = disabled;
  document.getElementById('autoPower' + uid).checked = checked;
  if (STIMULUS_SP.ifbw == -1) {
    ifbw = "Auto";
    disabled = true;
    checked = true;
  } else {
    ifbw = STIMULUS_SP.ifbw;
    disabled = STIMULUS_SP.instrumentState; // Disable if UCIS
    checked = false;
  }
  document.getElementById('ifbw' + uid).value = ifbw;
  document.getElementById('ifbw' + uid).disabled = disabled;
  document.getElementById('autoIFBW' + uid).checked = checked;
  if (STIMULUS_SP.sweepTime == -1) {
    sweepTime = "Auto";
    disabled = true;
    checked = true;
  } else {
    sweepTime = STIMULUS_SP.sweepTime;
    disabled = STIMULUS_SP.instrumentState; // Disable if UCIS
    checked = false;
  }
  document.getElementById('sweepTime' + uid).value = sweepTime;
  document.getElementById('sweepTime' + uid).disabled = disabled;
  document.getElementById('autoSweepTime' + uid).checked = checked;
  
  // Disable controls if Use Current Instrument State is selected or EDITDISABLED
  if (STIMULUS_SP.instrumentState || EDITDISABLED) {
    document.getElementById('blank' + uid).disabled = true;
    document.getElementById('sweepType' + uid).disabled = true;
    document.getElementById('startFreq' + uid).disabled = true;
    document.getElementById('stopFreq' + uid).disabled = true;
    document.getElementById('units' + uid).disabled = true;
    document.getElementById('points' + uid).disabled = true;
    document.getElementById('autoPower' + uid).disabled = true;
    document.getElementById('autoIFBW' + uid).disabled = true;
    document.getElementById('autoSweepTime' + uid).disabled = true;
  }
  
  // Disable all other controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('instrumentState' + uid).disabled = true;
    document.getElementById('power' + uid).disabled = true;
    document.getElementById('ifbw' + uid).disabled = true;
    document.getElementById('sweepTime' + uid).disabled = true;
  }
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the stimulus parameters
//---------------------------------------------------------

//---------------------------------------------------------
//  Stimulus:  Use Current Instrument State
//---------------------------------------------------------
function saveSPInstrumentState(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  STIMULUS_SP.instrumentState = document.getElementById('instrumentState' + uid).checked;
  // Disable controls if Use Current Instrument State is selected
  document.getElementById('calibrate' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('blank' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('sweepType' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('startFreq' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('stopFreq' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('units' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('points' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('power' + uid).disabled = (STIMULUS_SP.instrumentState || STIMULUS_SP.power == 999);
  document.getElementById('autoPower' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('ifbw' + uid).disabled = (STIMULUS_SP.instrumentState || STIMULUS_SP.ifbw == -1);
  document.getElementById('autoIFBW' + uid).disabled = STIMULUS_SP.instrumentState;
  document.getElementById('sweepTime' + uid).disabled = (STIMULUS_SP.instrumentState || STIMULUS_SP.sweepTime == -1);
  document.getElementById('autoSweepTime' + uid).disabled = STIMULUS_SP.instrumentState;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Calibrate
//---------------------------------------------------------
function saveSPCalibrate(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  STIMULUS_SP.calibrate = document.getElementById('calibrate' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Blank Frequencies
//---------------------------------------------------------
function saveSPBlankFrequencies(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  STIMULUS_SP.blank = document.getElementById('blank' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Sweep Type
//---------------------------------------------------------
function saveSPSweepType(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  STIMULUS_SP.sweepType = document.getElementById('sweepType' + uid).options[document.getElementById('sweepType' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Start Frequency
//---------------------------------------------------------
function saveSPStartFrequency(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var DISPLAY_SP = getSPDisplayObject(uid);

  STIMULUS_SP.startFreq = document.getElementById('startFreq' + uid).value;
  
  // Set the display start frequency if necessary
  for (var i=0; i<DISPLAY_SP.PLOTS_SP.length; i++) {
    if (!DISPLAY_SP.PLOTS_SP[i].changeFreq) {
      DISPLAY_SP.PLOTS_SP[i].startFreq = STIMULUS_SP.startFreq;
      if (i == DISPLAY_SP.selectedPlot) {
      	document.getElementById('displayStartFreq' + uid).value = STIMULUS_SP.startFreq;
      }
    }
  }
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Stop Frequency
//---------------------------------------------------------
function saveSPStopFrequency(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var DISPLAY_SP = getSPDisplayObject(uid);

  STIMULUS_SP.stopFreq = document.getElementById('stopFreq' + uid).value;

  // Set the display stop frequency if necessary
  for (var i=0; i<DISPLAY_SP.PLOTS_SP.length; i++) {
    if (!DISPLAY_SP.PLOTS_SP[i].changeFreq) {
      DISPLAY_SP.PLOTS_SP[i].stopFreq = STIMULUS_SP.stopFreq;
      if (i == DISPLAY_SP.selectedPlot) {
      	document.getElementById('displayStopFreq' + uid).value = STIMULUS_SP.stopFreq;
      }
    }
  }
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Frequency Units
//---------------------------------------------------------
function saveSPFrequencyUnits(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var DISPLAY_SP = getSPDisplayObject(uid);

  STIMULUS_SP.units = document.getElementById('units' + uid).options[document.getElementById('units' + uid).selectedIndex].value;
  
  // Set the display uints if necessary
  for (var i=0; i<DISPLAY_SP.PLOTS_SP.length; i++) {
    if (!DISPLAY_SP.PLOTS_SP[i].changeFreq) {
      DISPLAY_SP.PLOTS_SP[i].units = STIMULUS_SP.units;
      if (i == DISPLAY_SP.selectedPlot) {
      	document.getElementById('displayUnits' + uid).selectedIndex = document.getElementById('units' + uid).selectedIndex;
      	buildSPMarkersTable(uid);
      }
    }
  }
  buildSPPointsTable(uid);
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Number of Data Points
//---------------------------------------------------------
function saveSPNumberOfPoints(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  STIMULUS_SP.points = document.getElementById('points' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Power
//---------------------------------------------------------
function saveSPPower(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var disabled = false;
  if (document.getElementById('autoPower' + uid).checked) {
    STIMULUS_SP.power = 999;
    disabled = true;
  } else {
    STIMULUS_SP.power = document.getElementById('power' + uid).value;
  }
  document.getElementById('power' + uid).disabled = disabled;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  IF Bandwidth
//---------------------------------------------------------
function saveSPIFBW(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var disabled = false;
  if (document.getElementById('autoIFBW' + uid).checked) {
    STIMULUS_SP.ifbw = -1;
    disabled = true;
  } else {
    STIMULUS_SP.ifbw = document.getElementById('ifbw' + uid).value;
  }
  document.getElementById('ifbw' + uid).disabled = disabled;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Sweep Time
//---------------------------------------------------------
function saveSPSweepTime(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var disabled = false;
  if (document.getElementById('autoSweepTime' + uid).checked) {
    STIMULUS_SP.sweepTime = -1;
    disabled = true;
  } else {
    STIMULUS_SP.sweepTime = document.getElementById('sweepTime' + uid).value;
  }
  document.getElementById('sweepTime' + uid).disabled = disabled;
  makeChanges();
}

//---------------------------------------------------------
// STIMULUS_SP UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the STIMULUS_SP object with the unique id
//---------------------------------------------------------
function getSPStimulusObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('STIMULUS_SP' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('stimulusSetup' + uid).value);
  }
  return (eval('STIMULUS_SP' + uid));
}

//---------------------------------------------------------
// Displays the STIMULUS_SP object for debugging
//---------------------------------------------------------
function displaySPStimulus(m) {
    var output = 'STIMULUS_SP:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------------MEASUREMENT_SP OBJECT-------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the MEASUREMENT_SP object.
//   This is manipulated in the edit S Parameter.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The MEASUREMENT_SP object is the basis for
// all measurements in the step.
//---------------------------------------------------------
function MEASUREMENT_SP(dataSource, ports, autoSelect, PARAMETERS_SP) {
  this.dataSource = dataSource;
  this.ports = ports;
  this.autoSelect = autoSelect;
  this.PARAMETERS_SP = PARAMETERS_SP;
}

//---------------------------------------------------------
// The PARAMETER_SP object is the basis for
// all parameters in the measurement.
//---------------------------------------------------------
function PARAMETER_SP(name, channel, response, stimulus) {
  this.name = name;
  this.channel = channel;
  this.response = response;
  this.stimulus = stimulus;
}

//---------------------------------------------------------
// This is the main save routine to save the
// MEASUREMENT_SP object to the DB.
// It requires the following items:
//
//   * global MEASUREMENT_SP object filled
//---------------------------------------------------------
function saveSPMeasurementObject(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var measurementKeys = "";
  
  measurementKeys = measurementKeys + "dataSource=" + MEASUREMENT_SP.dataSource + "&";
  measurementKeys = measurementKeys + "ports=" + MEASUREMENT_SP.ports;
  if (MEASUREMENT_SP.autoSelect) {
    measurementKeys = measurementKeys + "&autoSelect=true";
  }
  for (var i=0; i<MEASUREMENT_SP.PARAMETERS_SP.length; i++) {
    measurementKeys = measurementKeys + "&channel" + i + "=" + MEASUREMENT_SP.PARAMETERS_SP[i].channel + "&";
    measurementKeys = measurementKeys + "response" + i + "=" + MEASUREMENT_SP.PARAMETERS_SP[i].response + "&";
    measurementKeys = measurementKeys + "stimulus" + i + "=" + MEASUREMENT_SP.PARAMETERS_SP[i].stimulus;
  }

  return measurementKeys
}

//---------------------------------------------------------
// This is the main function to set
// the measurement parameters from the MEASUREMENT_SP object.
// It requires the following items:
//
//   * global MEASUREMENT_SP object filled
//   * control with id 'dataSource'
//   * control with id 'ports'
//   * control with id 'autoSelect'
//---------------------------------------------------------
function setSPMeasurementControls(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  // set all measurement parameters
  document.getElementById('dataSource' + MEASUREMENT_SP.dataSource + uid).checked = true;
  document.getElementById('ports' + MEASUREMENT_SP.ports + uid).checked = true;
  document.getElementById('autoSelect' + uid).checked = MEASUREMENT_SP.autoSelect;

  // Setup other port drop downs
  // Update parameter list on summary tab
  var parameterSelect = document.getElementById('add_parameter_list' + uid);
  parameterSelect.options.length = 0;

  var A = [];
  for (var i=1; i<=MEASUREMENT_SP.ports; i++) {
    for (var j=1; j<=MEASUREMENT_SP.ports; j++) {
      A[A.length] = "S" + j + i;
    }
  }
  addStringOptions(parameterSelect, A, A);

  // Update adapter port list on adapter tab
  var adapterSelect = document.getElementById('adapterPort' + uid);
  adapterSelect.options.length = 0;
  addNumericOptions(adapterSelect, MEASUREMENT_SP.ports);

  // Setup the PARAMETER_SP boxes
  setSPParameterBoxes(uid);
  // Build the PARAMETER_SPS table
  buildSPParametersTable(uid);
  
  // Disable all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('calibrate' + uid).disabled = true;
    var dataSource = document.getElementsByName('dataSource' + uid);
    for (var i=0; i<dataSource.length; i++) {
      dataSource[i].disabled = true;
    }
    var ports = document.getElementsByName('ports' + uid);
    for (var i=0; i<ports.length; i++) {
      ports[i].disabled = true;
    }
    document.getElementById('select' + uid).disabled = true;
    document.getElementById('autoSelect' + uid).disabled = true;
  }
}

//---------------------------------------------------------
//  Mearurement:  Data Source
//---------------------------------------------------------
function saveSPDataSource(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var dataSource = document.getElementsByName('dataSource' + uid);
  for (var i=0; i<dataSource.length; i++) {
    if (dataSource[i].checked) {
      break;
    }
  }
  MEASUREMENT_SP.dataSource = dataSource[i].value;
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Number of Ports
//---------------------------------------------------------
function saveSPPorts(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var ports = document.getElementsByName('ports' + uid);
  for (var i=0; i<ports.length; i++) {
    if (ports[i].checked) {
      break;
    }
  }
  MEASUREMENT_SP.ports = ports[i].value;

  // Update parameter list on summary tab
  var parameterSelect = document.getElementById('add_parameter_list' + uid);
  parameterSelect.options.length = 0;

  var A = [];
  for (var i=1; i<=MEASUREMENT_SP.ports; i++) {
    for (var j=1; j<=MEASUREMENT_SP.ports; j++) {
      A[A.length] = "S" + j + i;
    }
  }
  addStringOptions(parameterSelect, A, A);

  // Update adapter port list on adapter tab
  var adapterSelect = document.getElementById('adapterPort' + uid);
  adapterSelect.options.length = 0;
  addNumericOptions(adapterSelect, MEASUREMENT_SP.ports);

  // Setup the parameter boxes
  setSPParameterBoxes(uid);
  buildSPParametersTable(uid);

  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Select/De-Select All
//---------------------------------------------------------
function measurementSPSelectAll(uid, checked) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var checkboxes = document.getElementById('parameterBoxes' + uid).childNodes;

  for (var i=0; i<checkboxes.length; i++) {
    if (checkboxes[i].type == "checkbox") {
      if (checked && !checkboxes[i].checked) {
        MEASUREMENT_SP.PARAMETERS_SP[MEASUREMENT_SP.PARAMETERS_SP.length] = new PARAMETER_SP(MEASUREMENT_SP.PARAMETERS_SP.length, 1, checkboxes[i].title.substring(1,2), checkboxes[i].title.substring(2,3));
      } else if (!checked && checkboxes[i].checked) {
        removeSPParameterByName(uid, checkboxes[i].title);
      }
      checkboxes[i].checked = checked;
    }
  }
  
  makeChanges();
  buildSPParametersTable(uid);
}

//---------------------------------------------------------
//  Mearurement:  Select/De-Select Single
//---------------------------------------------------------
function measurementSPSelectSingle(uid, parameter, checked) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var response = parameter.substring(1,2);
  var stimulus = parameter.substring(2,3);

  if (checked) {
    MEASUREMENT_SP.PARAMETERS_SP[MEASUREMENT_SP.PARAMETERS_SP.length] = new PARAMETER_SP(MEASUREMENT_SP.PARAMETERS_SP.length, 1, response, stimulus);
  } else {
    removeSPParameterByName(uid, parameter);
  }
  makeChanges();
  
  // Handle the select all checkbox
  handleSPSelectAll(uid);
  buildSPParametersTable(uid);
}

//---------------------------------------------------------
//  Mearurement:  Auto Select
//---------------------------------------------------------
function setSPChannelAutoSelect(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  MEASUREMENT_SP.autoSelect = !MEASUREMENT_SP.autoSelect;
  buildSPParametersTable(uid);
  makeChanges();
}

//---------------------------------------------------------
// This is the main function to build
// the parameters table from the PARAMETER_SP array
// It requires the following items:
//
//   * global PARAMETERS_SP[] array filled
//   * table with id 'parameters'
//---------------------------------------------------------
function buildSPParametersTable(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var tbl = document.getElementById('parameters' + uid);
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

  // This is the main loop that builds the rows
  // of the table by adding cells one at a time
  for (var i=0; i<MEASUREMENT_SP.PARAMETERS_SP.length; i++) {

    var row = tbl.insertRow(i + 1); // there's a header row
    
    //---------------------------------------------------------
    //  Cell 0:  Parameter
    //    Row header showing the parameter name with
    //    a little different method here as it's a "th" element
    var cell0 = document.createElement('th');
    cell0.className = "rowheader";
    var el0 = document.createTextNode('S');
    var el0a = document.createElement('span');
    el0a.className = "sub";
    el0a.innerHTML = MEASUREMENT_SP.PARAMETERS_SP[i].response + '' + MEASUREMENT_SP.PARAMETERS_SP[i].stimulus;
    cell0.title     = "Parameter to be measured"
    cell0.appendChild(el0);
    cell0.appendChild(el0a);
    row.appendChild(cell0);

    //---------------------------------------------------------
    //  Cell 1:  Delete Parameter (row)
    //    Holds an icon/link to delete the row
    var cell1 = row.insertCell(1);
    cell1.className = "icon";
    var el1   = document.createElement('img');
    if (!EDITDISABLED) {
      el1.src   = "/images/deletesmall.gif";
      el1.title = "Delete this measurement";
      el1.onclick = new Function ("removeSPMeasurement('" + uid + "', " + i + ");");
    } else {
      el1.src   = "/images/deletesmalldisabled.gif";
      el1.title = "Cannot edit sequence";
    }
    cell1.appendChild(el1);
    
    //---------------------------------------------------------
    //  Cell 2:  Parameter Reordering
    //    Holds a couple of images/links to handle
    //    reordering rows of the adapters table
    var cell2 = row.insertCell(2);
    cell2.className = "icon";

    //  Move up (toward top of list; index gets smaller)
    var el2aUp    = document.createElement('a');
    el2aUp.href   = "#nogo";
    var el2aUpImg = document.createElement('img');
    el2aUpImg.className = "movers";
    if (i==0 || EDITDISABLED) {    // disable UP on first element
      el2aUpImg.src     = "/images/upsmalldisabled.gif";
    } else {
      el2aUp.title   = "move up"
      el2aUp.onclick = new Function("this.blur(); moveSPParameter('" + uid + "', -(" + i + "));");
      el2aUpImg.src  = "/images/upsmall.gif";
    }
    el2aUp.appendChild(el2aUpImg);

    //  Move down (toward bottom of list; index gets bigger)
    var el2aDwn    = document.createElement('a');
    el2aDwn.href   = "#nogo";
    var el2aDwnImg = document.createElement('img');
    el2aDwnImg.className = "movers";
    if (i==MEASUREMENT_SP.PARAMETERS_SP.length - 1 || EDITDISABLED) {  // disable DOWN on last element
      el2aDwnImg.src     = "/images/downsmalldisabled.gif";
    } else {
      el2aDwn.title      = "move down"
      el2aDwn.onclick    = new Function ("this.blur(); moveSPParameter('" + uid + "', " + i + ");");
      el2aDwnImg.src     = "/images/downsmall.gif";
    }
    el2aDwn.appendChild(el2aDwnImg);

    cell2.appendChild(el2aUp);
    cell2.appendChild(el2aDwn);
    
    //---------------------------------------------------------
    //  Cell 3:  Response Port
    //    Holds a selection box to select
    //    the response port for the parameter
    var cell3      = row.insertCell(3);
    cell3.className = "ni";

    var el3a       = document.createElement('input');
    el3a.type      = "text";
    el3a.id        = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_response" + uid;
    el3a.name      = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_response" + uid;
    el3a.value     = MEASUREMENT_SP.PARAMETERS_SP[i].response;
    el3a.className = "hidden";

    var el3b       = document.createElement('div');
    var el3c       = document.createTextNode(MEASUREMENT_SP.PARAMETERS_SP[i].response);
    el3b.id        = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_response_display" + uid;
    el3b.appendChild(el3c);
    el3b.className = "";

    if (!EDITDISABLED) {
      cell3.title    = "Click to change the Response Port";
      el3b.onclick   = new Function ("changeSPResponsePort('" + uid + "', " + i + ");");
    } else {
      cell3.className = "grayedout";
    }

    cell3.appendChild(el3a);
    cell3.appendChild(el3b);

    //---------------------------------------------------------
    //  Cell 4:  Stimulus Port
    //    Holds a selection box to select
    //    the stimulus port for the parameter
    var cell4      = row.insertCell(4);
    cell4.className = "ni";

    var el4a       = document.createElement('input');
    el4a.type      = "text";
    el4a.id        = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_stimulus" + uid;
    el4a.name      = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_stimulus" + uid;
    el4a.value     = MEASUREMENT_SP.PARAMETERS_SP[i].stimulus;
    el4a.className = "hidden";

    var el4b       = document.createElement('div');
    el4b.id        = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_stimulus_display" + uid;
    el4b.className = "";

    var el4c       = document.createTextNode(MEASUREMENT_SP.PARAMETERS_SP[i].stimulus);
    el4b.appendChild(el4c);

    if (!EDITDISABLED) {
      cell4.title    = "Click to change the Stimulus Port";
      el4b.onclick   = new Function ("changeSPStimulusPort('" + uid + "', " + i + ");");
    } else {
      cell4.className = "grayedout";
    }

    cell4.appendChild(el4a);
    cell4.appendChild(el4b);
    
    //---------------------------------------------------------
    //  Cell 5:  Channel
    //    Holds a selection box to select
    //    the channel the parameter will be measured on
    var cell5      = row.insertCell(5);
    cell5.className = "ni";

    var el5a       = document.createElement('input');
    el5a.type      = "text";
    el5a.id        = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_channel" + uid;
    el5a.name      = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_channel" + uid;
    el5a.value     = MEASUREMENT_SP.PARAMETERS_SP[i].channel;
    el5a.className = "hidden";

    var el5b       = document.createElement('div');
    el5b.id        = MEASUREMENT_SP.PARAMETERS_SP[i].name + "_channel_display" + uid;
    el5b.className = "";

    if (MEASUREMENT_SP.autoSelect) {
      var el5d = "Auto";
    } else {
      var el5d = MEASUREMENT_SP.PARAMETERS_SP[i].channel;
    }

    if (!EDITDISABLED) {
      if (MEASUREMENT_SP.autoSelect) {
        cell5.className = "grayedout";
      } else {
        cell5.title    = "Click to change the Channel";
        el5b.onclick   = new Function ("changeSPChannel('" + uid + "', " + i + ");");
      }
    } else {
      cell5.className = "grayedout";
    }

    var el5c       = document.createTextNode(el5d);
    el5b.appendChild(el5c);

    cell5.appendChild(el5a);
    cell5.appendChild(el5b);

    //---------------------------------------------------------
    //  Cell 6:  Filler Cell
    //    Holds a blank cell as a filler cell
    row.insertCell(6);
  }

  // everything's added - paint the table styles
  setSPTableRows(uid, 'parameters');
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the parameters
// table
//---------------------------------------------------------

//---------------------------------------------------------
//  Parameter Table Cell 1:  Remove Measurement (row)
//---------------------------------------------------------
function removeSPMeasurement(uid, i) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  MEASUREMENT_SP.PARAMETERS_SP.splice(i, 1);
  makeChanges();
  buildSPParametersTable(uid);
  // Setup the parameter boxes
  setSPParameterBoxes(uid);
}

//---------------------------------------------------------
//  Parameter Table Cell 2:  Reorder Parameters
//---------------------------------------------------------
function moveSPParameter(uid, i) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var dir=1;
  if (i<0) {
    dir = -1;
    i   = -i;
  }

  var temp = new copySPParameter(MEASUREMENT_SP.PARAMETERS_SP[i + dir]); // save parameter above (or below)
  MEASUREMENT_SP.PARAMETERS_SP[i + dir] = null;
  MEASUREMENT_SP.PARAMETERS_SP[i + dir] = new copySPParameter(MEASUREMENT_SP.PARAMETERS_SP[i]); // replace index with next (or prev)
  MEASUREMENT_SP.PARAMETERS_SP[i] = null;
  MEASUREMENT_SP.PARAMETERS_SP[i] = new copySPMarker(temp); // move temp back
  temp = null;

  makeChanges();
  buildSPParametersTable(uid);
}

//---------------------------------------------------------
//  Parameter Table Cell 3:  Change Parameter Response Port
//---------------------------------------------------------
function changeSPResponsePort(uid, i) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var mname = MEASUREMENT_SP.PARAMETERS_SP[i].name;
  var dtext = document.getElementById(mname + "_response_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = mname + "_select" + uid;
  addNumericOptions(s, MEASUREMENT_SP.ports);
  s.selectedIndex = MEASUREMENT_SP.PARAMETERS_SP[i].response - 1;
  s.onchange = new Function ("saveSPChangedResponse('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedResponse('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedResponse(uid, i) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var mname = MEASUREMENT_SP.PARAMETERS_SP[i].name;
  var s     = document.getElementById(mname + "_select" + uid);
  var j     = s.selectedIndex + 1; // port number is 1 plus the index
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");
  
  for (var k=0; k<MEASUREMENT_SP.PARAMETERS_SP.length; k++) {
    if (j == MEASUREMENT_SP.PARAMETERS_SP[k].response && MEASUREMENT_SP.PARAMETERS_SP[i].stimulus == MEASUREMENT_SP.PARAMETERS_SP[k].stimulus && k != i) {
      var duplicate = true;
      break;
    }
  }

  if (duplicate) {
    alert("This parameter is already added to the measurement." + '\n' + "Please select a different parameter to measure.");
  } else {
    // don't make changes if they didn't select a new response port
    if (j != MEASUREMENT_SP.PARAMETERS_SP[i].response) {
      MEASUREMENT_SP.PARAMETERS_SP[i].response = j;
      makeChanges();
    }
  }
  s.parentNode.removeChild(s);
  buildSPParametersTable(uid);
  // Setup the parameter boxes
  setSPParameterBoxes(uid);
}

//---------------------------------------------------------
//  Parameter Table Cell 4:  Change Parameter Stimulus Port
//---------------------------------------------------------
function changeSPStimulusPort(uid, i) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var mname = MEASUREMENT_SP.PARAMETERS_SP[i].name;
  var dtext = document.getElementById(mname + "_stimulus_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = mname + "_select" + uid;
  addNumericOptions(s, MEASUREMENT_SP.ports);
  s.selectedIndex = MEASUREMENT_SP.PARAMETERS_SP[i].stimulus - 1;
  s.onchange = new Function ("saveSPChangedStimulus('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedStimulus('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedStimulus(uid, i) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var mname = MEASUREMENT_SP.PARAMETERS_SP[i].name;
  var s     = document.getElementById(mname + "_select" + uid);
  var j     = s.selectedIndex + 1; // port number is 1 plus the index
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");
  
  for (var k=0; k<MEASUREMENT_SP.PARAMETERS_SP.length; k++) {
    if (j == MEASUREMENT_SP.PARAMETERS_SP[k].stimulus && MEASUREMENT_SP.PARAMETERS_SP[i].response == MEASUREMENT_SP.PARAMETERS_SP[k].response && k != i) {
      var duplicate = true;
      break;
    }
  }

  if (duplicate) {
    alert("This parameter is already added to the measurement." + '\n' + "Please select a different parameter to measure.");
  } else {
    // don't make changes if they didn't select a new stimulus port
    if (j != MEASUREMENT_SP.PARAMETERS_SP[i].stimulus) {
      MEASUREMENT_SP.PARAMETERS_SP[i].stimulus = j;
      makeChanges();
    }
  }
  s.parentNode.removeChild(s);
  buildSPParametersTable(uid);
  // Setup the parameter boxes
  setSPParameterBoxes(uid);
}

//---------------------------------------------------------
//  Parameter Table Cell 5:  Change Parameter Channel
//---------------------------------------------------------
function changeSPChannel(uid, i) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var mname = MEASUREMENT_SP.PARAMETERS_SP[i].name;
  var dtext = document.getElementById(mname + "_channel_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = mname + "_select" + uid;
  addNumericOptions(s, 32);
  s.selectedIndex = MEASUREMENT_SP.PARAMETERS_SP[i].channel - 1;
  s.onchange = new Function ("saveSPChangedChannel('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedChannel('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedChannel(uid, i) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var mname = MEASUREMENT_SP.PARAMETERS_SP[i].name;
  var s     = document.getElementById(mname + "_select" + uid);
  var j     = s.selectedIndex + 1; // channel number is 1 plus the index
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new channel
  if (j != MEASUREMENT_SP.PARAMETERS_SP[i].channel) {
    MEASUREMENT_SP.PARAMETERS_SP[i].channel = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPParametersTable(uid);
}

//---------------------------------------------------------
//  Add new PARAMETER_SP to the table
//---------------------------------------------------------
function addSPParameter(uid) {
  if (EDITDISABLED) return;
  toggleVisible('add_parameter' + uid);
  toggleVisible('aAddSPParameter' + uid);

  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var parameterSelect = document.getElementById('add_parameter_list' + uid);
  parameterSelect.options.length = 0;

  var A = [];
  for (var i=1; i<=MEASUREMENT_SP.ports; i++) {
    for (var j=1; j<=MEASUREMENT_SP.ports; j++) {
      A[A.length] = "S" + j + i;
    }
  }
  addStringOptions(parameterSelect, A, A);

  parameterSelect.selectedIndex = 0;
  parameterSelect.focus();
}

function saveSPAddedParameter(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var parameter = document.getElementById('add_parameter_list' + uid);
  var i1 = parameter.options[parameter.selectedIndex].value.substr(1, 1);
  var i2 = parameter.options[parameter.selectedIndex].value.substr(2, 1);

  for (var i=0; i<MEASUREMENT_SP.PARAMETERS_SP.length; i++) {
    if (i1 == MEASUREMENT_SP.PARAMETERS_SP[i].response && i2 == MEASUREMENT_SP.PARAMETERS_SP[i].stimulus) {
      var duplicate = true;
      break;
    }
  }

  if (duplicate) {
    alert("This parameter is already added to the measurement." + '\n' + "Please select a different parameter to measure.");
  } else {
    MEASUREMENT_SP.PARAMETERS_SP[MEASUREMENT_SP.PARAMETERS_SP.length] = new PARAMETER_SP(MEASUREMENT_SP.PARAMETERS_SP.length, 1, i1, i2);
    toggleVisible('add_parameter' + uid);
    toggleVisible('aAddSPParameter' + uid);
    makeChanges();
    buildSPParametersTable(uid);
    setSPParameterBoxes(uid);
  }
}

//---------------------------------------------------------
// MEASUREMENT_SP UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the MEASUREMENT_SP object with the unique id
//---------------------------------------------------------
function getSPMeasurementObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('MEASUREMENT_SP' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('measurementSetup' + uid).value);
  }
  return (eval('MEASUREMENT_SP' + uid));
}

//---------------------------------------------------------
// Displays the MEASUREMENT_SP object for debugging
//---------------------------------------------------------
function displaySPMeasurement(m) {
    var output = 'MEASUREMENT_SP:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
// Removes a PARAMETER_SP by searching the PARAMETERS_SP by name
//---------------------------------------------------------
function removeSPParameterByName(uid, name) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var response = name.substring(1, 2);
  var stimulus = name.substring(2, 3);

  for (var i=0; i<MEASUREMENT_SP.PARAMETERS_SP.length; i++) {
    if (response == MEASUREMENT_SP.PARAMETERS_SP[i].response && stimulus == MEASUREMENT_SP.PARAMETERS_SP[i].stimulus) {
      MEASUREMENT_SP.PARAMETERS_SP.splice(i, 1);
      break;
    }
  }
}

//---------------------------------------------------------
// Sets up SP checkboxes
//---------------------------------------------------------
function setSPParameterBoxes(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var div = document.getElementById('parameterBoxes' + uid);
  var checkbox, label;

  var k = 0;
  while (k!=div.childNodes.length)   //remove all checkboxes
  {
    if (div.childNodes[k].nodeName != "DIV") {
      div.removeChild(div.childNodes[k]);
    } else {
      k++;
    }
  };

  // Create the checkboxes for the number of ports
  for (var i=1; i<=MEASUREMENT_SP.ports; i++) {
    for (var j=1; j<=MEASUREMENT_SP.ports; j++) {
      checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.id = "S" + j + i + uid;
      checkbox.name = "S" + j + i + uid;
      checkbox.title = "S" + j + i;
      checkbox.onclick = new Function ("measurementSPSelectSingle('" + uid + "', 'S" + j + i + "', this.checked);");
      div.appendChild(checkbox);

      // Create the label for the checkbox
      label = document.createElement('label');
      label.innerHTML = "S<sub>" + j + i + "</sub>";
      div.appendChild(label);
      
      // Disable the checkbox if EDITDISABLED
      checkbox.disabled = EDITDISABLED;
    }
    div.appendChild(document.createElement('br'));
  }

  // Check the boxes that are already PARAMETERS_SP
  for (var i=0; i<MEASUREMENT_SP.PARAMETERS_SP.length; i++) {
    // Remove any PARAMETERS_SP that are not longer valid
    if (MEASUREMENT_SP.PARAMETERS_SP[i].response > MEASUREMENT_SP.ports || MEASUREMENT_SP.PARAMETERS_SP[i].stimulus > MEASUREMENT_SP.ports) {
      removeSPParameterByName(uid, 'S' + MEASUREMENT_SP.PARAMETERS_SP[i].response + MEASUREMENT_SP.PARAMETERS_SP[i].stimulus);
      i--;
    } else {
      document.getElementById("S" + MEASUREMENT_SP.PARAMETERS_SP[i].response + MEASUREMENT_SP.PARAMETERS_SP[i].stimulus + uid).checked = true;
    }
  }
  // Handle the select all checkbox
  handleSPSelectAll(uid);
}

//---------------------------------------------------------
// Sets up SP checkboxes
//---------------------------------------------------------
function handleSPSelectAll(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var children = document.getElementById('parameterBoxes' + uid).childNodes;
  var selectAll = true;

  for (var i=0; i<children.length; i++) {
    if (children[i].type == "checkbox") {
      if (!children[i].checked) {
      	selectAll = false;
      	break;
      }
    }
  }
  document.getElementById('select' + uid).checked = selectAll;
}

//---------------------------------------------------------
// returns a copy of a PARAMETER_SP object
//---------------------------------------------------------
function copySPParameter(f) {
  for (i in f) this[i] = f[i];
}

//---------------------------------------------------------------DISPLAY_SP OBJECT-----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the DISPLAY_SP object.  This
//   is manipulated in the edit S Parameter.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The DISPLAY_SP object is the basis for
// all DISPLAY_SP parameters for the step.
//---------------------------------------------------------
function DISPLAY_SP(lock, retain, formatted, plotOrientation, selectedPlot, selectedTrace, PLOTS_SP) {
  this.lock = lock;
  this.retain = retain;
  this.formatted = formatted;
  this.plotOrientation = plotOrientation;
  this.selectedPlot = selectedPlot;
  this.selectedTrace = selectedTrace;
  this.PLOTS_SP = PLOTS_SP;
}

//---------------------------------------------------------
// The PLOT_SP object is the basis for
// all plots in the display.
//---------------------------------------------------------
function PLOT_SP(name, traceOrientation, changeFreq, startFreq, stopFreq, units, TRACES_SP, MARKERS_SP) {
  this.name = name;
  this.traceOrientation = traceOrientation;
  this.changeFreq = changeFreq;
  this.startFreq = startFreq;
  this.stopFreq = stopFreq;
  this.units = units;
  this.TRACES_SP = TRACES_SP;
  this.MARKERS_SP = MARKERS_SP;
}

//---------------------------------------------------------
// The TRACE_SP object is the basis for
// all trace controls in the plot.
//---------------------------------------------------------
function TRACE_SP(show, parameter, format, scale, position, reference, autoscale, showMarkers, showLimits, fillLimits) {
  this.show = show;
  this.parameter = parameter;
  this.format = format;
  this.scale = scale;
  this.position = position;
  this.reference = reference;
  this.autoscale = autoscale;
  this.showMarkers = showMarkers;
  this.showLimits = showLimits;
  this.fillLimits = fillLimits;
}

//---------------------------------------------------------
// The MARKER_SP object is the basis for
// all markers in the plot.
//---------------------------------------------------------
function MARKER_SP(type, frequency) {
  this.type = type;
  this.frequency = frequency;
}

//---------------------------------------------------------
// This is the main save routine to save the
// DISPLAY_SP object to the DB.
// It requires the following items:
//
//   * global DISPLAY_SP object filled
//---------------------------------------------------------
function saveSPDisplayObject(uid) {
  var STIMULUS_SP = getSPStimulusObject(uid);
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var DISPLAY_SP = getSPDisplayObject(uid);
  var displayKeys = "";

  if (DISPLAY_SP.lock) {
    displayKeys = displayKeys + "lock=true&";
  }
  if (DISPLAY_SP.retain) {
    displayKeys = displayKeys + "retain=true&";
  }
  if (DISPLAY_SP.formatted) {
    displayKeys = displayKeys + "formatted=true&";
  }
  displayKeys = displayKeys + "plotOrientation=" + DISPLAY_SP.plotOrientation;
  for (var i=0; i<DISPLAY_SP.PLOTS_SP.length; i++) {
    displayKeys = displayKeys + "&traceOrientation" + i + "=" + DISPLAY_SP.PLOTS_SP[i].traceOrientation;
    if (DISPLAY_SP.PLOTS_SP[i].changeFreq) {
      displayKeys = displayKeys + "&changeFreq" + i + "=true";
      displayKeys = displayKeys + "&startFreq" + i + "=" + DISPLAY_SP.PLOTS_SP[i].startFreq;
      displayKeys = displayKeys + "&stopFreq" + i + "=" + DISPLAY_SP.PLOTS_SP[i].stopFreq;
      displayKeys = displayKeys + "&units" + i + "=" + DISPLAY_SP.PLOTS_SP[i].units;
    }
    else {
      displayKeys = displayKeys + "&startFreq" + i + "=" + STIMULUS_SP.startFreq;
      displayKeys = displayKeys + "&stopFreq" + i + "=" + STIMULUS_SP.stopFreq;
      displayKeys = displayKeys + "&units" + i + "=" + STIMULUS_SP.units;
    }
    for (j=0; j<DISPLAY_SP.PLOTS_SP[i].TRACES_SP.length; j++) {
      if (DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].show) {
        displayKeys = displayKeys + "&show" + i + j + "=true";
      }
      if (DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].parameter == "" && MEASUREMENT_SP.PARAMETERS_SP.length != 0) {
      	displayKeys = displayKeys + "&parameter" + i + j + "=S" + MEASUREMENT_SP.PARAMETERS_SP[0].response + "" + MEASUREMENT_SP.PARAMETERS_SP[0].stimulus;
      }
      else if (MEASUREMENT_SP.PARAMETERS_SP.length == 0) {
      	displayKeys = displayKeys + "&parameter" + i + j + "=";
      }
      else {
      	var parameters = getSPParameterValues(uid);

	if (parameters.indexOf(DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].parameter) >= 0) {
          displayKeys = displayKeys + "&parameter" + i + j + "=" + DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].parameter;
        }
        else {
          displayKeys = displayKeys + "&parameter" + i + j + "=S" + MEASUREMENT_SP.PARAMETERS_SP[0].response + "" + MEASUREMENT_SP.PARAMETERS_SP[0].stimulus;
	}
      }
      if (DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].format == "") {
        displayKeys = displayKeys + "&format" + i + j + "=Log Mag";
      }
      else {
        if (DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].format == "Return Loss" || DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].format == "Insertion Loss" || DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].format == "Isolation") {
          DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].format = "Loss";
        }
        displayKeys = displayKeys + "&format" + i + j + "=" + DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].format;
      }
      displayKeys = displayKeys + "&scale" + i + j + "=" + DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].scale;
      displayKeys = displayKeys + "&position" + i + j + "=" + DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].position;
      displayKeys = displayKeys + "&reference" + i + j + "=" + DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].reference;
      if (DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].autoscale) {
        displayKeys = displayKeys + "&autoscale" + i + j + "=true";
      }
      if (DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].showMarkers) {
        displayKeys = displayKeys + "&showMarkers" + i + j + "=true";
      }
      if (DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].showLimits) {
        displayKeys = displayKeys + "&showLimits" + i + j + "=true";
      }
      if (DISPLAY_SP.PLOTS_SP[i].TRACES_SP[j].fillLimits) {
        displayKeys = displayKeys + "&fillLimits" + i + j + "=true";
      }
    }
    for (k=0; k<DISPLAY_SP.PLOTS_SP[i].MARKERS_SP.length; k++) {
      displayKeys = displayKeys + "&mtype" + i + k + "=" + DISPLAY_SP.PLOTS_SP[i].MARKERS_SP[k].type;
      displayKeys = displayKeys + "&mfrequency" + i + k + "=" + DISPLAY_SP.PLOTS_SP[i].MARKERS_SP[k].frequency;
    }
  }

  return displayKeys
}

//---------------------------------------------------------
// This is the main function to set
// the DISPLAY_SP parameters from the DISPLAY_SP object.
// It requires the following items:
//
//   * global DISPLAY_SP object filled
//   * control with id 'lockControl'
//   * control with id 'retainSettings'
//   * control with id 'formattedData'
//   * control with id 'plotOrientation'
//   * control with id 'traceOrientation'
//   * control with id 'displayStartFreq'
//   * control with id 'displayStopFreq'
//   * control with id 'displayUnits'
//---------------------------------------------------------
function setSPDisplayControls(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  // Set all display parameters
  document.getElementById('lockControl' + uid).checked = DISPLAY_SP.lock;
  document.getElementById('retainSettings' + uid).checked = DISPLAY_SP.retain;
  document.getElementById('formattedData' + uid).checked = DISPLAY_SP.formatted;
  document.getElementById('plotOrientation' + DISPLAY_SP.plotOrientation + uid).checked = true;
  toggleVisible("plotOrientationPictures" + DISPLAY_SP.plotOrientation + uid);
  // The display plot controls are set inside of this function
  selectSPPlot(uid, DISPLAY_SP.selectedPlot);
  
  // Disable retainSettings and set to false if lockControl is true
  document.getElementById('retainSettings' + uid).disabled = DISPLAY_SP.lock;

  // Disable all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('lockControl' + uid).disabled = true;
    document.getElementById('retainSettings' + uid).disabled = true;
    document.getElementById('formattedData' + uid).disabled = true;
    var plotOrientation = document.getElementsByName('plotOrientation' + uid);
    for (var i=0; i<plotOrientation.length; i++) {
      plotOrientation[i].disabled = true;
    }
    document.getElementById('changeFrequency' + uid).disabled = true;
    var traceOrientation = document.getElementsByName('traceOrientation' + uid);
    for (var i=0; i<traceOrientation.length; i++) {
      traceOrientation[i].disabled = true;
    }
  }
}

//---------------------------------------------------------
//  This sets all of the controls specific to the selected plot
//---------------------------------------------------------
function setSPDisplayPlotControls(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);

  var displayUnitsList = [];
  var displayUnits = document.getElementById('displayUnits' + uid).options;

  // Create lists to search
  for (var i=0; i<displayUnits.length; i++) {
    displayUnitsList[i] = displayUnits[i].text;
  }

  document.getElementById('changeFrequency' + uid).checked = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].changeFreq;
  document.getElementById('displayUnits' + uid).selectedIndex = displayUnitsList.indexOf(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].units);
  document.getElementById('traceOrientation' + DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].traceOrientation + uid).checked = true;
  document.getElementById('displayStartFreq' + uid).value = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].startFreq;
  document.getElementById('displayStopFreq' + uid).value = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].stopFreq;

  // Disable all controls if EDITDISABLED
  if (!EDITDISABLED) {
    document.getElementById('displayUnits' + uid).disabled = !DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].changeFreq;
    document.getElementById('displayStartFreq' + uid).disabled = !DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].changeFreq;
    document.getElementById('displayStopFreq' + uid).disabled = !DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].changeFreq;
  } else {
    document.getElementById('displayUnits' + uid).disabled = true;
    document.getElementById('displayStartFreq' + uid).disabled = true;
    document.getElementById('displayStopFreq' + uid).disabled = true;
  }

  // Build the traces table
  buildSPTracesTable(uid);
  // Build the markers table
  buildSPMarkersTable(uid);
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the display parameters
//---------------------------------------------------------

//---------------------------------------------------------
//  Display:  Lock Control From Operator
//---------------------------------------------------------
function saveSPLockControl(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.lock = document.getElementById('lockControl' + uid).checked;
  
  // Disable retainSettings and set to false if lockControl is true
  document.getElementById('retainSettings' + uid).disabled = DISPLAY_SP.lock;

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Retain Operator's Settings
//---------------------------------------------------------
function saveSPRetainSettings(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.retain = document.getElementById('retainSettings' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Display:  Capture Formatted Data
//---------------------------------------------------------
function saveSPFormattedData(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.formatted = document.getElementById('formattedData' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Display:  Change Display Frequency
//---------------------------------------------------------
function saveSPChangeFrequency(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].changeFreq = document.getElementById('changeFrequency' + uid).checked;
  
  // Disable/enable frequency controls
  document.getElementById('displayStartFreq' + uid).disabled = !DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].changeFreq;
  document.getElementById('displayStopFreq' + uid).disabled = !DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].changeFreq;
  document.getElementById('displayUnits' + uid).disabled = !DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].changeFreq;

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Plot Orientation
//---------------------------------------------------------
function saveSPPlotOrientation(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);

  var plotOrientation = document.getElementsByName('plotOrientation' + uid);
  for (var i=0; i<plotOrientation.length; i++) {
    if (plotOrientation[i].checked) {
      DISPLAY_SP.plotOrientation = plotOrientation[i].value;
      break;
    }
  }

  // Show the correct picture controls
  var pictures = ["plotOrientationPicturesSingle", "plotOrientationPicturesDual", "plotOrientationPicturesQuad"];
  for (var i=0; i<pictures.length; i++) {
    document.getElementById(pictures[i] + uid).style.display = "none";
  }
  toggleVisible("plotOrientationPictures" + DISPLAY_SP.plotOrientation + uid);
  // Adjust selected plot if no longer visible
  var plots = document.getElementsByName(DISPLAY_SP.plotOrientation.toLowerCase() + "Plot" + uid).length
  if (DISPLAY_SP.selectedPlot >= plots) {
    DISPLAY_SP.selectedPlot = plots - 1;
    selectSPPlot(uid, DISPLAY_SP.selectedPlot);
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Trace Orientation
//---------------------------------------------------------
function saveSPTraceOrientation(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  
  var traceOrientation = document.getElementsByName('traceOrientation' + uid);
  for (var i=0; i<traceOrientation.length; i++) {
    if (traceOrientation[i].checked) {
      DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].traceOrientation = traceOrientation[i].value;
      break;
    }
  }

  makeChanges();
}

//---------------------------------------------------------
//  Display:  Display Start Frequency
//---------------------------------------------------------
function saveSPDisplayStartFreq(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].startFreq = document.getElementById('displayStartFreq' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Display:  Display Stop Frequency
//---------------------------------------------------------
function saveSPDisplayStopFreq(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].stopFreq = document.getElementById('displayStopFreq' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Display:  Display Units
//---------------------------------------------------------
function saveSPDisplayUnits(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].units = document.getElementById('displayUnits' + uid).options[document.getElementById('displayUnits' + uid).selectedIndex].value;
  buildSPMarkersTable(uid);
  makeChanges();
}

//---------------------------------------------------------
// This is the main function to build
// the traces table from the TRACES_SP array
// It requires the following items:
//
//   * global TRACES_SP[] array filled
//   * table with id 'traces' + uid
//---------------------------------------------------------
function buildSPTracesTable(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var tbl = document.getElementById('traces' + uid);

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
  for (var i=0; i<DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP.length; i++) {
    // There should not be more that two traces per plot right now.
    // Somehow more were created, so we will double check here.
    if (i >= 2) {
      DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP.splice(i,1);
    } else {
      var row = tbl.insertRow(i + 1); // there's a header row

      //---------------------------------------------------------
      //  Cell 0:  Number
      //    Row header showing the trace number with
      //    a little different method here as it's a "th" element
      var cell0 = document.createElement('th');
      cell0.className = "rowheader";
      var el0 = document.createTextNode(i + 1);
      cell0.title     = "Trace to be displayed"
      cell0.appendChild(el0);
      row.appendChild(cell0);

      //---------------------------------------------------------
      //  Cell 1:  Delete Trace (row)
      //    Holds an icon/link to delete the row
//      var cell1 = row.insertCell(1);
//      cell1.className = "icon";
//      var el1   = document.createElement('img');
//      el1.src   = "/images/deletesmall.gif";
//      el1.title = "Delete this trace";
//      el1.onclick = new Function ("removeSPTrace('" + uid + "', " + i + ");");
//      cell1.appendChild(el1);

      //---------------------------------------------------------
      //  Cell 2:  Show Trace
      //    Holds an checkbox to show/hide the trace
      var cell2 = row.insertCell(1);
      cell2.className = "icon";
      var el2   = document.createElement('input');
      el2.type  = "checkbox";
      el2.id    = i + "_show" + uid;
      el2.name  = i + "_show" + uid;
      cell2.appendChild(el2);   // have to append before setting attributes for IE6

      el2.disabled = false;
      el2.checked  = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].show;
      el2.onclick  = new Function ("saveSPTraceShow('" + uid + "', " + i + ");");
      el2.title    = "Show Trace: if checked the trace will be shown on the plot";

      if (EDITDISABLED) el2.disabled = true;

      //---------------------------------------------------------
      //  Cell 3:  Auto-Scale
      //    Holds an checkbox to auto-scale the trace
      var cell3 = row.insertCell(2);
      cell3.className = "icon";
      var el3   = document.createElement('input');
      el3.type  = "checkbox";
      el3.id    = i + "_autoscale" + uid;
      el3.name  = i + "_autoscale" + uid;
      cell3.appendChild(el3);   // have to append before setting attributes for IE6

      el3.disabled = false;
      el3.checked  = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].autoscale;
      el3.onclick  = new Function ("saveSPTraceAutoScale('" + uid + "', " + i + ");");
      el3.title    = "Auto-Scale: if checked the trace scale will be automatically determined";

      if (EDITDISABLED) el3.disabled = true;

      //---------------------------------------------------------
      //  Cell 4:  Show Markers
      //    Holds an checkbox to show/hide the trace markers
      var cell4 = row.insertCell(3);
      cell4.className = "icon";
      var el4   = document.createElement('input');
      el4.type  = "checkbox";
      el4.id    = i + "_showMarkers" + uid;
      el4.name  = i + "_showMarkers" + uid;
      cell4.appendChild(el4);   // have to append before setting attributes for IE6

      el4.disabled = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length == 0;  // disable the checkbox if no markers
      el4.checked  = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].showMarkers;
      el4.onclick  = new Function ("saveSPTraceShowMarkers('" + uid + "', " + i + ");");
      el4.title    = "Show Markers: if checked the trace markers will be shown on the plot";

      if (EDITDISABLED) el4.disabled = true;

      //---------------------------------------------------------
      //  Cell 5:  Show Limits
      //    Holds an checkbox to show/hide the trace limits
      var cell5 = row.insertCell(4);
      cell5.className = "icon";
      var el5   = document.createElement('input');
      el5.type  = "checkbox";
      el5.id    = i + "_showLimits" + uid;
      el5.name  = i + "_showLimits" + uid;
      cell5.appendChild(el5);   // have to append before setting attributes for IE6

      el5.disabled = false;
      el5.checked  = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].showLimits;
      el5.onclick  = new Function ("saveSPTraceShowLimits('" + uid + "', " + i + ");");
      el5.title    = "Show Limits: if checked the trace limits will be shown on the plot";

      if (EDITDISABLED) el5.disabled = true;

      //---------------------------------------------------------
      //  Cell 6:  Fill Limits
      //    Holds an checkbox to fill/not fill the trace limits
      var cell6 = row.insertCell(5);
      cell6.className = "icon";
      var el6   = document.createElement('input');
      el6.type  = "checkbox";
      el6.id    = i + "_fillLimits" + uid;
      el6.name  = i + "_fillLimits" + uid;
      cell6.appendChild(el6);   // have to append before setting attributes for IE6

      el6.disabled = false;
      el6.checked  = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].fillLimits;
      el6.onclick  = new Function ("saveSPTraceFillLimits('" + uid + "', " + i + ");");
      el6.title    = "Fill Limits: if checked the trace limits will be filled on the plot";

      if (EDITDISABLED) el6.disabled = true;

      //---------------------------------------------------------
      //  Cell 7:  Parameter
      //    Holds a selection box to select
      //    the s-parameter to be displayed
      var cell7      = row.insertCell(6);
      cell7.className = "ni";

      var el7a       = document.createElement('input');
      el7a.type      = "text";
      el7a.id        = i + "_parameter" + uid;
      el7a.name      = i + "_parameter" + uid;
      el7a.value     = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter;
      el7a.className = "hidden";

      var el7b       = document.createElement('div');
      el7b.id        = i + "_parameter_display" + uid;
      el7b.className = "";

      var el7c       = document.createTextNode((DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter == "" || DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter == "None Measured")? "[Select]" : DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter);
      el7b.appendChild(el7c);

      if (!EDITDISABLED) {
        cell7.title    = "Click to change the Parameter";
        el7b.onclick   = new Function ("changeSPTraceParameter('" + uid + "', " + i + ");");
      } else {
        cell7.className = "grayedout";
      }

      cell7.appendChild(el7a);
      cell7.appendChild(el7b);

      //---------------------------------------------------------
      //  Cell 8:  Format
      //    Holds a selection box to select
      //    the format to display the s-parameter in
      var cell8      = row.insertCell(7);
      cell8.className = "ni";

      var el8a       = document.createElement('input');
      el8a.type      = "text";
      el8a.id        = i + "_format" + uid;
      el8a.name      = i + "_format" + uid;
      el8a.value     = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].format;
      el8a.className = "hidden";

      var el8b       = document.createElement('div');
      el8b.id        = i + "_format_display" + uid;
      el8b.className = "";

      var el8c       = document.createTextNode((DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].format == "")? "[Select]" : DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].format);
      el8b.appendChild(el8c);

      if (!EDITDISABLED) {
        cell8.title    = "Click to change the Format";
        el8b.onclick   = new Function ("changeSPTraceFormat('" + uid + "', " + i + ");");
      } else {
        cell8.className = "grayedout";
      }

      cell8.appendChild(el8a);
      cell8.appendChild(el8b);

      //---------------------------------------------------------
      //  Cell 9:  Scale
      //    integer value to tell what the scale of the
      //    display is
      var cell9       = row.insertCell(8);

      var el9a       = document.createElement('input');
      el9a.type      = "text";
      el9a.id        = i + "_scale" + uid;
      el9a.name      = i + "_scale" + uid;
      el9a.value     = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].scale;
      el9a.title     = "Change the Scale";
      el9a.onblur    = new Function ("armSPSaveTraceScale('" + uid + "', " + i + ")");  // handle saving changes
      // this allows the user to press "ENTER" to confrim an entry
      if ($.browser.msie) {
        el9a.onkeydown = new Function ("captureReturn(this, window.event)");
      } else {
        el9a.setAttribute("onkeydown", "captureReturn(this, event);");
      }
      el9a.className = "hidden";

      cell9.className = "ctl";
      cell9.appendChild(el9a);

      // create and show numeric Increase/Decrease buttons
      var el9Ctl       = document.createElement('span');
      el9Ctl.id        = i + "_scale_control" + uid;
      el9Ctl.name      = i + "_scale_control" + uid;
      el9Ctl.className = "hidden";

      // numeric Increase
      var el9Up      = document.createElement('a');
      el9Up.href     = "#nogo";
      var el9UpImg   = document.createElement('img');
      el9Up.title    = "Increase";
      el9Up.onclick  = new Function ("editSPTraceScale('" + uid + "', " + i + ", 1);");
      el9UpImg.src   = "/images/scrollup.gif";
      el9Up.appendChild(el9UpImg);

      // numeric Decrease
      var el9Dwn     = document.createElement('a');
      el9Dwn.href    = "#nogo";
      var el9DwnImg  = document.createElement('img');
      el9Dwn.title   = "Decrease";
      el9Dwn.onclick = new Function ("editSPTraceScale('" + uid + "', " + i + ", -1);");
      el9DwnImg.src  = "/images/scrolldown.gif";
      el9DwnImg.id   = "down";
      el9Dwn.appendChild(el9DwnImg);

      el9Ctl.appendChild(el9Up);
      el9Ctl.appendChild(el9Dwn);
      cell9.appendChild(el9Ctl);
      
      var el9b     = document.createElement('div');
      el9b.id      = i + "_scale_display" + uid;
      el9b.name    = i + "_scale_display" + uid;
      var el9c     = document.createTextNode(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].scale);
      el9b.appendChild(el9c);
      cell9.appendChild(el9b);

      if (!EDITDISABLED) {
        if (DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].autoscale) {
          cell9.className = "grayedout";
        } else {
          cell9.title     = "Click to change the Scale";
          el9b.onclick = new Function ("editSPTraceScale('" + uid + "', " + i + ", 0);");
        }
      } else {
        cell9.className = "grayedout";
      }

      //---------------------------------------------------------
      //  Cell 10:  Position
      //    integer value to tell what the position of the
      //    display is
      var cell10       = row.insertCell(9);

      var el10a       = document.createElement('input');
      el10a.type      = "text";
      el10a.id        = i + "_position" + uid;
      el10a.name      = i + "_position" + uid;
      el10a.value     = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].position;
      el10a.title     = "Change the Position";
      el10a.onblur    = new Function ("armSPSaveTracePosition('" + uid + "', " + i + ")");  // handle saving changes
      // this allows the user to press "ENTER" to confrim an entry
      if ($.browser.msie) {
        el10a.onkeydown = new Function ("captureReturn(this, window.event)");
      } else {
        el10a.setAttribute("onkeydown", "captureReturn(this, event);");
      }
      el10a.className = "hidden";
      
      cell10.className = "ctl";
      cell10.appendChild(el10a);

      // create and show numeric Increase/Decrease buttons
      var el10Ctl     = document.createElement('span');
      el10Ctl.id      = i + "_position_control" + uid;
      el10Ctl.name    = i + "_position_control" + uid;
      el10Ctl.className = "hidden";

      // numeric Increase
      var el10Up      = document.createElement('a');
      el10Up.href     = "#nogo";
      var el10UpImg   = document.createElement('img');
      el10Up.title    = "Increase";
      el10Up.onclick  = new Function("editSPTracePosition('" + uid + "', " + i + ", 1);");
      el10UpImg.src   = "/images/scrollup.gif";
      el10Up.appendChild(el10UpImg);

      // numeric Decrease
      var el10Dwn     = document.createElement('a');
      el10Dwn.href    = "#nogo";
      var el10DwnImg  = document.createElement('img');
      el10Dwn.title   = "Decrease";
      el10Dwn.onclick = new Function ("editSPTracePosition('" + uid + "', " + i + ", -1);");
      el10DwnImg.src  = "/images/scrolldown.gif";
      el10DwnImg.id   = "down";
      el10Dwn.appendChild(el10DwnImg);

      el10Ctl.appendChild(el10Up);
      el10Ctl.appendChild(el10Dwn);
      cell10.appendChild(el10Ctl);

      var el10b     = document.createElement('div');
      el10b.id      = i + "_position_display" + uid;
      el10b.name    = i + "_position_display" + uid;
      var el10c     = document.createTextNode(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].position);
      el10b.appendChild(el10c);
      cell10.appendChild(el10b);
      
      if (!EDITDISABLED) {
        if (DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].autoscale) {
          cell10.className = "grayedout";
        } else {
          cell10.title     = "Click to change the Position";
          el10b.onclick = new Function ("editSPTracePosition('" + uid + "', " + i + ", 0);");
        }
      } else {
        cell10.className = "grayedout";
      }

      //---------------------------------------------------------
      //  Cell 11:  Reference
      //    integer value to tell what the reference of the
      //    display is
      var cell11       = row.insertCell(10);

      var el11a       = document.createElement('input');
      el11a.type      = "text";
      el11a.id        = i + "_reference" + uid;
      el11a.name      = i + "_reference" + uid;
      el11a.value     = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].reference;
      el11a.title     = "Change the Reference";
      el11a.onblur    = new Function ("armSPSaveTraceReference('" + uid + "', " + i + ")");  // handle saving changes
      // this allows the user to press "ENTER" to confrim an entry
      if ($.browser.msie) {
        el11a.onkeydown = new Function ("captureReturn(this, window.event)");
      } else {
        el11a.setAttribute("onkeydown", "captureReturn(this, event);");
      }
      el11a.className = "hidden";

      cell11.className = "ctl";
      cell11.appendChild(el11a);

      // create and show numeric Increase/Decrease buttons
       var el11Ctl     = document.createElement('span');
      el11Ctl.id      = i + "_reference_control" + uid;
      el11Ctl.name    = i + "_reference_control" + uid;
      el11Ctl.className = "hidden";

      // numeric Increase
      var el11Up      = document.createElement('a');
      el11Up.href     = "#nogo";
      var el11UpImg   = document.createElement('img');
      el11Up.title    = "Increase";
      el11Up.onclick  = new Function("editSPTraceReference('" + uid + "', " + i + ", 1);");
      el11UpImg.src   = "/images/scrollup.gif";
      el11Up.appendChild(el11UpImg);

      // numeric Decrease
      var el11Dwn     = document.createElement('a');
      el11Dwn.href    = "#nogo";
      var el11DwnImg  = document.createElement('img');
      el11Dwn.title   = "Decrease";
      el11Dwn.onclick = new Function ("editSPTraceReference('" + uid + "', " + i + ", -1);");
      el11DwnImg.src  = "/images/scrolldown.gif";
      el11DwnImg.id   = "down";
      el11Dwn.appendChild(el11DwnImg);

      el11Ctl.appendChild(el11Up);
      el11Ctl.appendChild(el11Dwn);
      cell11.appendChild(el11Ctl);
      
      var el11b     = document.createElement('div');
      el11b.id      = i + "_reference_display" + uid;
      el11b.name    = i + "_reference_display" + uid;
      var el11c     = document.createTextNode(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].reference);
      el11b.appendChild(el11c);
      cell11.appendChild(el11b);

      if (!EDITDISABLED) {
        if (DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].autoscale) {
          cell11.className = "grayedout";
        } else {
          cell11.title     = "Click to change the Reference";
          el11b.onclick = new Function ("editSPTraceReference('" + uid + "', " + i + ", 0);");
        }
      } else {
        cell11.className = "grayedout";
      }

      //---------------------------------------------------------
      //  Cell 12:  Filler Cell
      //    Holds a blank cell as a filler cell
      row.insertCell(11);
    }
  }

  // everything's added - paint the table styles
  setSPTableRows(uid, 'traces');
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the traces
// table
//---------------------------------------------------------

//---------------------------------------------------------
//  Trace Table Cell 1:  Remove Trace (row)
//---------------------------------------------------------
function removeSPTrace(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP.splice(i, 1);
  makeChanges();
  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 2:  Show Trace
//---------------------------------------------------------
function saveSPTraceShow(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].show = !(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].show);
  makeChanges();
  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 3:  Auto Scale
//---------------------------------------------------------
function saveSPTraceAutoScale(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].autoscale = !(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].autoscale);//document.getElementById(i + '_show' + uid).checked;
  makeChanges();
  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 4:  Show Markers
//---------------------------------------------------------
function saveSPTraceShowMarkers(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].showMarkers = !(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].showMarkers);
  makeChanges();
  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 5:  Show Limits
//---------------------------------------------------------
function saveSPTraceShowLimits(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].showLimits = !(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].showLimits);
  makeChanges();
  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 6:  Fill Limits
//---------------------------------------------------------
function saveSPTraceFillLimits(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].fillLimits = !(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].fillLimits);
  makeChanges();
  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 7:  Parameter
//---------------------------------------------------------
function changeSPTraceParameter(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var dtext = document.getElementById(i + "_parameter_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = i + "_select" + uid;
  var A = getSPParameterValues(uid);
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter);
  s.onchange = new Function ("saveSPChangedTraceParameter('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedTraceParameter('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedTraceParameter(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var s     = document.getElementById(i + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the parameter
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new parameter
  if (j != DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter) {
    DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter = j;
    
    // check that current format is still valid
    var A = getSPFormatValues(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter);
    if (A.indexOf(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].format) < 0) {
      DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].format = "";
    }

    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 8:  Format
//---------------------------------------------------------
function changeSPTraceFormat(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var dtext = document.getElementById(i + "_format_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = i + "_select" + uid;
  var A = getSPFormatValues(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].parameter);
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].format);
  s.onchange = new Function ("saveSPChangedTraceFormat('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedTraceFormat('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedTraceFormat(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var s = document.getElementById(i + "_select" + uid);
  var j = "";
  if (s.selectedIndex >= 0) {
    var j = s.options[s.selectedIndex].value; // get the format
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new parameter
  if (j != DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].format) {
    DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].format = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 9:  Scale
//---------------------------------------------------------
// the global and armSPSaveTraceScale() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPTraceScale() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Scale table cell -> editSPTraceScale(i) runs
//   2a) User clicks off now visible control -> armSPSaveTraceScale()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveTraceScale() function will be cleared by the newest
//       editSPTraceScale() call.
var SCALETIMER = [0,0];
function armSPSaveTraceScale(uid, i) {
  SCALETIMER[i] = setTimeout("saveSPTraceScale('" + uid + "', " + i + ")", 250);
}
function editSPTraceScale(uid, i, scroll) {
  // clear pending changes since
  // we're making more
  clearTimeout(SCALETIMER[i]);

  var s = document.getElementById(i + "_scale" + uid);

  s.value = Number(s.value) + scroll;
  (s.value < 0) ? s.value = "0" : s.value += '';

  document.getElementById(i + "_scale_display" + uid).className = "hidden";
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  document.getElementById(i + "_scale_control" + uid).className = "";
}

function saveSPTraceScale(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var s = document.getElementById(i + "_scale" + uid);

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value) {
    s.value = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].scale;
  }

  if (s.value != DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].scale) {
    DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].scale = s.value;  // update changes to TRACES_SP array
    makeChanges();
  }

  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 10:  Position
//---------------------------------------------------------
// the global and armSPSaveTracePosition() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPTracePosition() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Position table cell -> editSPTracePosition(i) runs
//   2a) User clicks off now visible control -> armSPSaveTracePosition()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveTracePosition() function will be cleared by the newest
//       editSPTracePosition() call.
var POSITIONTIMER = [0,0];
function armSPSaveTracePosition(uid, i) {
  POSITIONTIMER[i] = setTimeout("saveSPTracePosition('" + uid + "', " + i + ")", 250);
}
function editSPTracePosition(uid, i, scroll) {
  // clear pending changes since
  // we're making more
  clearTimeout(POSITIONTIMER[i]);

  var s = document.getElementById(i + "_position" + uid);

  s.value = Number(s.value) + scroll;

  document.getElementById(i + "_position_display" + uid).className = "hidden";
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  document.getElementById(i + "_position_control" + uid).className = "";
}

function saveSPTracePosition(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var s = document.getElementById(i + "_position" + uid);

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value) {
    s.value = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].position;
  }

  if (s.value != DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].position) {
    DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].position = s.value;  // update changes to TRACES_SP array
    makeChanges();
  }

  buildSPTracesTable(uid);
}

//---------------------------------------------------------
//  Display Table Cell 11:  Reference
//---------------------------------------------------------
// the global and armSPSaveTraceReference() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPTraceReference() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Reference table cell -> editSPTraceReference(i) runs
//   2a) User clicks off now visible control -> armSPSaveTraceReference()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveTraceReference() function will be cleared by the newest
//       editSPTraceReference() call.
var REFERENCETIMER = [0,0];
function armSPSaveTraceReference(uid, i) {
  REFERENCETIMER[i] = setTimeout("saveSPTraceReference('" + uid + "', " + i + ")", 250);
}
function editSPTraceReference(uid, i, scroll) {
  // clear pending changes since
  // we're making more
  clearTimeout(REFERENCETIMER[i]);

  var s = document.getElementById(i + "_reference" + uid);

  s.value = Number(s.value) + scroll;

  document.getElementById(i + "_reference_display" + uid).className = "hidden";
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  document.getElementById(i + "_reference_control" + uid).className = "";
}

function saveSPTraceReference(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var s = document.getElementById(i + "_reference" + uid);

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value) {
    s.value = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].reference;
  }

  if (s.value != DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].reference) {
    DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].reference = s.value;  // update changes to TRACES_SP array
    makeChanges();
  }

  buildSPTracesTable(uid);
}

//---------------------------------------------------------
// This is the main function to build
// the markers table from the MARKERS_SP array
// It requires the following items:
//
//   * global MARKERS_SP[] array filled
//   * table with id 'markers'
//---------------------------------------------------------
function buildSPMarkersTable(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var tbl = document.getElementById('markers' + uid);

  // first, clear existing table.  The try/catch is for Firefox...
  var i=tbl.rows.length;
  while (tbl.rows.length > 1) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }

  // Remove old text node for frequency units
  if (tbl.rows[0].cells[4].childNodes.length > 1) {
    tbl.rows[0].cells[4].removeChild(tbl.rows[0].cells[4].childNodes[1]);
  }

  // Display the units for the frequencies
  var pointFreqUnits = document.createTextNode("Frequency (" + DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].units + ")");
  tbl.rows[0].cells[4].appendChild(pointFreqUnits);

  // This is the main loop that builds the rows
  // of the table by adding cells one at a time
  for (var i=0; i<DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length; i++) {
    var row = tbl.insertRow(i + 1); // there's a header row

    //---------------------------------------------------------
    //  Cell 0:  Marker Number
    //    Row header showing the marker number with
    //    a little different method here as it's a "th" element
    var cell0 = document.createElement('th');
    cell0.className = "rowheader";
    var el0 = document.createTextNode(i + 1);
    cell0.title     = "Marker number"
    cell0.appendChild(el0);
    row.appendChild(cell0);

    //---------------------------------------------------------
    //  Cell 1:  Delete Marker (row)
    //    Holds an icon/link to delete the row
    var cell1 = row.insertCell(1);
    cell1.className = "icon";
    var el1   = document.createElement('img');
    if (!EDITDISABLED) {
      el1.src   = "/images/deletesmall.gif";
      el1.title = "Delete this marker";
      el1.onclick = new Function ("removeSPMarker('" + uid + "', " + i + ");");
    } else {
      el1.src   = "/images/deletesmalldisabled.gif";
      el1.title = "Cannot edit sequence";
    }
    cell1.appendChild(el1);

    //---------------------------------------------------------
    //  Cell 2:  Marker Reordering
    //    Holds a couple of images/links to handle
    //    reordering rows of the markers table
    var cell2 = row.insertCell(2);
    cell2.className = "icon";

    //  Move up (toward top of list; index gets smaller)
    var el2aUp    = document.createElement('a');
    el2aUp.href   = "#nogo";
    var el2aUpImg = document.createElement('img');
    el2aUpImg.className = "movers";
    if (i==0 || EDITDISABLED) {    // disable UP on first element
      el2aUpImg.src     = "/images/upsmalldisabled.gif";
    } else {
      el2aUp.title   = "move up"
      el2aUp.onclick = new Function("this.blur(); moveSPMarker('" + uid + "', -(" + i + "));");
      el2aUpImg.src  = "/images/upsmall.gif";
    }
    el2aUp.appendChild(el2aUpImg);

    //  Move down (toward bottom of list; index gets bigger)
    var el2aDwn    = document.createElement('a');
    el2aDwn.href   = "#nogo";
    var el2aDwnImg = document.createElement('img');
    el2aDwnImg.className = "movers";
    if (i==DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length - 1 || EDITDISABLED) {  // disable DOWN on last element
      el2aDwnImg.src     = "/images/downsmalldisabled.gif";
    } else {
      el2aDwn.title      = "move down"
      el2aDwn.onclick    = new Function ("this.blur(); moveSPMarker('" + uid + "', " + i + ");");
      el2aDwnImg.src     = "/images/downsmall.gif";
    }
    el2aDwn.appendChild(el2aDwnImg);

    cell2.appendChild(el2aUp);
    cell2.appendChild(el2aDwn);
    
    //---------------------------------------------------------
    //  Cell 3:  Type
    //    Holds a selection box to select
    //    the type for the marker
    var cell3      = row.insertCell(3);
    cell3.className = "ni";

    var el3a       = document.createElement('input');
    el3a.type      = "text";
    el3a.id        = i + "_markerType" + uid;
    el3a.name      = i + "_markerType" + uid;
    el3a.value     = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].type;
    el3a.className = "hidden";

    var el3b       = document.createElement('div');
    el3b.id        = i + "_markerType_display" + uid;
    el3b.className = "";
    
    var el3c       = document.createTextNode((DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].type == "")? "[Select]" : DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].type);
    el3b.appendChild(el3c);

    if (!EDITDISABLED) {
      cell3.title    = "Click to change the Type";
      el3b.onclick   = new Function ("changeSPMarkerType('" + uid + "', " + i + ");");
    } else {
      cell3.className = "grayedout";
    }

    cell3.appendChild(el3a);
    cell3.appendChild(el3b);


    //---------------------------------------------------------
    //  Cell 4:  Frequency
    //    Holds a text entry box to define the frequency
    //    to be used for the marker
    var cell4  = row.insertCell(4);
    cell4.className = "ni";

    var el4a   = document.createElement('input');
    el4a.type  = "text"
    el4a.className = "hidden";
    el4a.id    = i + "markerFrequency" + uid;
    el4a.name  = i + "markerFrequency" + uid;
    el4a.value = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].frequency;
    el4a.onblur = new Function ("saveMarkerFrequency(" + uid + ", " + i + ");");

    var el4b  = document.createElement('div');
    var el4c  = document.createTextNode((DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].frequency == "" || DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].type != "Frequency")? "--" : DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].frequency);
    el4b.id   = i + "markerFrequencyDisplay" + uid;
    el4b.appendChild(el4c);
    
    if (!EDITDISABLED && DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].type == "Frequency") {
      cell4.title     = "Click to edit the Frequency";
      el4b.onclick   = new Function ("setSPMarkerFrequency('" + uid + "', " + i + ");");
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
  setSPTableRows(uid, 'markers');
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the markers
// table
//---------------------------------------------------------

//---------------------------------------------------------
//  Marker Table Cell 1:  Remove Marker (row)
//---------------------------------------------------------
function removeSPMarker(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.splice(i, 1);
  
  // turn show markers off if no more markers
  if (DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length == 0) {
    for (var j=0; j<DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP.length; j++) {
      DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[j].showMarkers = false;
    }
    buildSPTracesTable(uid);
  }

  makeChanges();
  buildSPMarkersTable(uid);
}

//---------------------------------------------------------
//  Marker Table Cell 2:  Reorder Markers
//---------------------------------------------------------
function moveSPMarker(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var dir=1;
  if (i<0) {
    dir = -1;
    i   = -i;
  }

  var temp = new copySPMarker(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i + dir]); // save marker above (or below)
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i + dir] = null;
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i + dir] = new copySPMarker(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i]); // replace index with next (or prev)
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i] = null;
  DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i] = new copySPMarker(temp); // move temp back
  temp = null;

  makeChanges();
  buildSPMarkersTable(uid);
}

//---------------------------------------------------------
//  Marker Table Cell 3:  Marker Type
//---------------------------------------------------------
function changeSPMarkerType(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var BOUND_SP = getSPBoundObject(uid);
  var dtext = document.getElementById(i + "_markerType_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = i + "_select" + uid;
  var A = ["Frequency", "Trace Maximum", "Trace Minimum", "Limit Maximum", "Limit Minimum"];
  addStringOptions(s, A, A);

  if (BOUND_SP.LIMITS_SP.length == 0) {
    s.options[3].disabled = true;
    s.options[4].disabled = true;
  }

  s.selectedIndex = A.indexOf(DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].type);
  s.onchange = new Function ("saveSPChangedMarkerType('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedMarkerType('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedMarkerType(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var s = document.getElementById(i + "_select" + uid);
  var j = "";
  if (s.selectedIndex >= 0) {
    var j = s.options[s.selectedIndex].value; // get the type
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new type
  if (j != DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].type) {
    DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].type = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPMarkersTable(uid);
}

//---------------------------------------------------------
//  Marker Table Cell 3:  Change Marker Frequency
//---------------------------------------------------------
function setSPMarkerFrequency(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var mname = i;
  var dtext = document.getElementById(mname + "markerFrequencyDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = mname + "_text" + uid;
  t.value = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].frequency;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedMarkerFrequency('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedMarkerFrequency(uid, i) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var mname = i;
  var t     = document.getElementById(mname + "_text" + uid);
  var j     = t.value; // get the model number text

  // don't make changes if they didn't select a new model number
  if (j != DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].frequency) {
    DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[i].frequency = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPMarkersTable(uid);
}

//---------------------------------------------------------
//  Add new MARKER_SP to the table
//---------------------------------------------------------
function addSPMarker(uid) {
  if (EDITDISABLED) return;

  var DISPLAY_SP = getSPDisplayObject(uid);
  var STIMULUS_SP = getSPStimulusObject(uid);

  if ($('#markers' + uid).attr('rows').length >= 9) {
    alert("Spartan currently supports eight markers");
  } else {
    DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length] = new MARKER_SP("Frequency", STIMULUS_SP.startFreq);

    // if this is the first marker added automatically check the show markers box
    if (DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length == 1) {
      for (var i=0; i<DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP.length; i++) {
        DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].showMarkers = true;
      }
      buildSPTracesTable(uid);
    }

    makeChanges();
    buildSPMarkersTable(uid);
  }
}

//---------------------------------------------------------
//  Copy MARKERS_SP from another plot
//---------------------------------------------------------
function copySPMarkers(uid) {
  if (EDITDISABLED) return;

  var DISPLAY_SP = getSPDisplayObject(uid);
  var s1 = document.getElementById('copy_markers_plot_list' + uid);
  var table = document.getElementById('markers' + uid);

  if (table.rows.length >= 9) {
    alert("Spartan currently supports eight markers");
  } else {
    toggleVisible('copy_markers' + uid);
    toggleVisible('aAddSPMarker' + uid);
    toggleVisible('aCopySPMarkers' + uid);
    s1.options.length = 0;  // clear previous
    s1.disabled = false;    // enable text entry
    addNumericOptions(s1, 4);
    s1.selectedIndex = 0;
    s1.focus();
  }
}

function saveSPCopiedMarkers(uid) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  var plot = document.getElementById('copy_markers_plot_list' + uid);
  var i1 = plot.selectedIndex;
  var lengthBefore = DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length;
  var lengthCurrent = DISPLAY_SP.PLOTS_SP[i1].MARKERS_SP.length;
  
  toggleVisible('copy_markers' + uid);
  toggleVisible('aAddSPMarker' + uid);
  toggleVisible('aCopySPMarkers' + uid);
  
  for (var i=0; i<lengthCurrent; i++) {
    if (DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length >= 8) {
      alert("Not all of the markers were copied because\nSpartan currently supports eight markers\nand that number has been exceeded.");
      break;
    } else {
      DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP[DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length] = new MARKER_SP(DISPLAY_SP.PLOTS_SP[i1].MARKERS_SP[i].type, DISPLAY_SP.PLOTS_SP[i1].MARKERS_SP[i].frequency);
    }
  }

  // if this is the first marker added automatically check the show markers box
  if (lengthBefore == 0 && DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].MARKERS_SP.length > 0) {
    for (var i=0; i<DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP.length; i++) {
      DISPLAY_SP.PLOTS_SP[DISPLAY_SP.selectedPlot].TRACES_SP[i].showMarkers = true;
    }
    buildSPTracesTable(uid);
  }

  makeChanges();
  buildSPMarkersTable(uid);
}

//---------------------------------------------------------
// DISPLAY_SP UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the DISPLAY_SP object with the unique id
//---------------------------------------------------------
function getSPDisplayObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('DISPLAY_SP' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('displaySetup' + uid).value);
  }
  return (eval('DISPLAY_SP' + uid));
}

//---------------------------------------------------------
// Displays the DISPLAY_SP object for debugging
//---------------------------------------------------------
function displaySPDisplay(m) {
    var output = 'DISPLAY_SP:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
//  Sets the active plot
//---------------------------------------------------------
function selectSPPlot(uid, plot) {
  var DISPLAY_SP = getSPDisplayObject(uid);
  DISPLAY_SP.selectedPlot = plot;

  // Set the picture controls according to the selected plot
  var pictures = ["singlePlot", "dualPlot", "quadPlot"];
  var current;
  for (var i=0; i<pictures.length; i++) {
    current = document.getElementsByName(pictures[i] + uid);
    for (var j=0; j<current.length; j++) {
      if (current[j].id.search(pictures[i] + plot) != -1) {
      	current[j].className = "borderOn";
      } else {
      	current[j].className = "borderOff";
      }
    }
  }
  setSPDisplayPlotControls(uid);
}

//---------------------------------------------------------
// returns a copy of a MARKER_SP object
//---------------------------------------------------------
function copySPMarker(f) {
  for (i in f) this[i] = f[i];
}

//---------------------------------------------------------------BOUND_SP OBJECT-------------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the BOUND_SP object.  This
//   is manipulated in the edit S Parameter.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------
function BOUND_SP(activeLimit, activePoints, fields, LIMITS_SP) {
  this.activeLimit = activeLimit;
  this.activePoints = activePoints;
  this.fields = fields;
  this.LIMITS_SP = LIMITS_SP;
}
//-------------------------------------------------------
//   Defines and handles the LIMITS_SP[] array
//   of the BOUND_SP object.  These are manipulated
//   in the edit S Parameter.htm template page using
//   the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The LIMIT_SP object is the basis for all limits in the step.
//---------------------------------------------------------
function LIMIT_SP(number, parameter, format, type, referential, refType, model, serial, runType, run, field, fieldValue, POINTS_SP) {
  this.number = number;
  this.parameter = parameter;
  this.format = format;
  this.type = type;
  this.referential = referential;
  this.refType = refType;
  this.model = model;
  this.serial = serial;
  this.runType = runType;
  this.run = run;
  this.field = field;
  this.fieldValue = fieldValue;
  this.POINTS_SP = POINTS_SP;
}

//---------------------------------------------------------
// This is the main save routine to save the
// BOUND_SP object to the DB.
// It requires the following items:
//
//   * global BOUND_SP object filled
//---------------------------------------------------------
function saveSPBoundObject(uid) {
  var BOUND_SP = getSPBoundObject(uid);
  var boundKeys = "";

  for (var i=0; i<BOUND_SP.LIMITS_SP.length; i++) {
    boundKeys = boundKeys + "parameter" + i + "=" + BOUND_SP.LIMITS_SP[i].parameter + "&";
    boundKeys = boundKeys + "format" + i + "=" + BOUND_SP.LIMITS_SP[i].format + "&";
    boundKeys = boundKeys + "type" + i + "=" + BOUND_SP.LIMITS_SP[i].type;

    if (BOUND_SP.LIMITS_SP[i].referential) {
      boundKeys = boundKeys + "&referential" + i + "=true&";
      boundKeys = boundKeys + "refType" + i + "=" + BOUND_SP.LIMITS_SP[i].refType + "&";
      boundKeys = boundKeys + "model" + i + "=" + BOUND_SP.LIMITS_SP[i].model + "&";
      boundKeys = boundKeys + "serial" + i + "=" + BOUND_SP.LIMITS_SP[i].serial + "&";
      boundKeys = boundKeys + "runType" + i + "=" + BOUND_SP.LIMITS_SP[i].runType + "&";
      boundKeys = boundKeys + "run" + i + "=" + BOUND_SP.LIMITS_SP[i].run + "&";
      boundKeys = boundKeys + "field" + i + "=" + BOUND_SP.LIMITS_SP[i].field + "&";
      boundKeys = boundKeys + "fieldValue" + i + "=" + BOUND_SP.LIMITS_SP[i].fieldValue;
    }

    for (j=0; j<BOUND_SP.LIMITS_SP[i].POINTS_SP.length; j++) {
      boundKeys = boundKeys + "&frequency" + i + j + "=" + BOUND_SP.LIMITS_SP[i].POINTS_SP[j].frequency + "&";
      boundKeys = boundKeys + "value" + i + j + "=" + BOUND_SP.LIMITS_SP[i].POINTS_SP[j].value + "&";
      boundKeys = boundKeys + "x" + i + j + "=" + BOUND_SP.LIMITS_SP[i].POINTS_SP[j].x + "&";
      boundKeys = boundKeys + "y" + i + j + "=" + BOUND_SP.LIMITS_SP[i].POINTS_SP[j].y;
      if (BOUND_SP.LIMITS_SP[i].POINTS_SP[j].connect) {
        boundKeys = boundKeys + "&connect" + i + j + "=true";
      }
    }

    if (i != BOUND_SP.LIMITS_SP.length - 1) {
      boundKeys = boundKeys + "&";
    }
  }

  return boundKeys
}

//---------------------------------------------------------
// This is the main function to build
// the limits table from the LIMITS_SP array
// It requires the following items:
//
//   * global LIMITS_SP[] array filled
//   * table with id 'limits'
//---------------------------------------------------------
function buildSPLimitsTable(uid) {
  var BOUND_SP = getSPBoundObject(uid);
  var tbl = document.getElementById('limits' + uid);
  var i;
  var extra = 0; // keep track of any extra rows that are added for referential limits
  
  // set MN/SN display name values
  var MNDisplay = document.getElementById('MNDisplay' + uid).value;
  var SNDisplay = document.getElementById('SNDisplay' + uid).value;

  // insert activeLimit into Copy function
  document.getElementById('_addSPLimitCopy' + uid).onclick = function(){this.blur(); addSPLimitCopy(uid, BOUND_SP.activeLimit);};

  // first, clear existing table.  The try/catch is for Firefox...
  i=tbl.rows.length;
  while (tbl.rows.length > 1) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }

  // Only build the table if there are LIMITS_SP to process
  if (BOUND_SP.LIMITS_SP.length != 0) {
    // This is the main loop that builds the rows
    // of the table by adding cells one at a time
    for (var i=0; i<BOUND_SP.LIMITS_SP.length; i++) {

      var row = tbl.insertRow(i + 1 + extra); // there's a header row
      var referential = BOUND_SP.LIMITS_SP[i].referential; // is this a referential limit
      var specify = BOUND_SP.LIMITS_SP[i].refType == "Specify"; // is the refType set to specify
      var runNumber = BOUND_SP.LIMITS_SP[i].runType == "Run #"; // is the run set to number
      var match = BOUND_SP.LIMITS_SP[i].runType == "Match Field"; // is the run set to match field
      var filter = BOUND_SP.LIMITS_SP[i].type == "Filter";  // is this a filter limit

      //---------------------------------------------------------
      //  Cell 0:  Limit Number
      //    Row header showing limit number in step
      //    a little different method here as it's a "th" element
      var cell0 = document.createElement('th');
      cell0.className = "rowheader";
      cell0.onclick = new Function ("setSPActiveLimit('" + uid + "', " + i + ");");
      var el0   = document.createTextNode(BOUND_SP.LIMITS_SP[i].number + 1);
      cell0.title = "Limit Number";
      cell0.appendChild(el0);
      row.appendChild(cell0);

      //---------------------------------------------------------
      //  Cell 1:  Delete Limit (row)
      //    Holds an icon/link to delete the row
      var cell1 = row.insertCell(1);
      cell1.className = "icon";
      var el1   = document.createElement('img');
      if (!EDITDISABLED) {
        el1.src   = "/images/deletesmall.gif";
        el1.title = "Delete this limit";
        el1.onclick = new Function ("removeSPLimit('" + uid + "', " + i + ");");
      } else {
        el1.src   = "/images/deletesmalldisabled.gif";
        el1.title = "Cannot edit sequence";
      }
      cell1.appendChild(el1);

      //---------------------------------------------------------
      //  Cell 2:  Referential Limit
      //    Holds a checkbox to select activate the referential
      //    limit status
      var cell2     = row.insertCell(2);
      cell2.className = "icon";
      var el2       = document.createElement('input');
      el2.type      = "checkbox";
      el2.id        = BOUND_SP.LIMITS_SP[i].number + "_referential" + uid;
      el2.name      = BOUND_SP.LIMITS_SP[i].number + "_referential" + uid;
      cell2.appendChild(el2);   // have to append before setting attributes for IE6

      el2.disabled = false;
      el2.checked  = BOUND_SP.LIMITS_SP[i].referential;
      el2.onclick  = new Function ("setSPLimitReferential('" + uid + "', " + i + ");");
      el2.title    = "Click to toggle a Referential Limit";

      if (EDITDISABLED || filter) {
        el2.disabled = true;

        // add message if filter type
        if (filter) {
          cell2.title    = "A Filter type cannot be a Referential Limit.";
        }
      }

      // create the referential limits table
      if (referential) {
        var refRow = tbl.insertRow(i + 1 + extra + 1);  // add new row for referential table
        extra++;

        row.cells[0].rowSpan = 2;  // make limit number span both rows
        row.cells[1].rowSpan = 2;  // make delete span both rows
        row.cells[2].rowSpan = 2;  // make referential limit span both rows

        var cell2a = refRow.insertCell(0);
        cell2a.colSpan = 4;

        var reftbl = document.createElement('table');
        reftbl.id = BOUND_SP.LIMITS_SP[i].number + "_refTable" + uid;
        reftbl.name = BOUND_SP.LIMITS_SP[i].number + "_refTable" + uid;
        cell2a.appendChild(reftbl);   // have to append before setting attributes for IE6
        reftbl.className = 'subtable';

        var thead = document.createElement('thead');
        reftbl.appendChild(thead);

        var tr = document.createElement('tr');
        thead.appendChild(tr);

        // build the column headers of the referential table
        for (k=0; k<7; k++) {
          var th = document.createElement('th');
       	  var text;
          switch (k) {
  	    case 0:
              th.className = "ni";
              th.title = "Type: current " + MNDisplay + "/" + SNDisplay + ", or specify another " + MNDisplay + "/" + SNDisplay;
              text = "Type";
              break;
            case 1:
              th.className = "ni";
              th.title = MNDisplay + ": the " + MNDisplay + " of the data to be referenced";
              text = MNDisplay;
              break;
            case 2:
              th.className = "ni";
              th.title = SNDisplay + ": the " + SNDisplay + " of the data to be referenced";
              text = SNDisplay;
              break;
            case 3:
              th.className = "ni";
              th.title = "Run Type: most recent, specify a number, or match a field";
              text = "Run Type";
              break;
            case 4:
              th.className = "ni";
              th.title = "Run number: the run number of the data to be referenced";
              text = "Run Number";
              break;
            case 5:
              th.className = "ni";
              th.title = "Field: select the field to be matched";
              text = "Field";
              break;
            case 6:
              th.className = "";
              th.title = "Field Value: enter the value of the field to be matched";
              text = "Field Value";
              break;
          }
          th.appendChild(document.createTextNode(text));
          tr.appendChild(th);
        }

        var reftblRow = reftbl.insertRow(1);  // add row to referential table

        //---------------------------------------------------------
        //  Cell 7:  Referential Limit Type
        //    Holds a selection box to select
        //    the referential limit type for the limit
        var cell7      = reftblRow.insertCell(0);
        cell7.className = "ni";
        var el7a       = document.createElement('input');
        el7a.type      = "text";
        el7a.id        = BOUND_SP.LIMITS_SP[i].number + "_refType" + uid;
        el7a.name      = BOUND_SP.LIMITS_SP[i].number + "_refType" + uid;
        el7a.value     = BOUND_SP.LIMITS_SP[i].refType;
        el7a.className = "hidden";

        var el7b       = document.createElement('div');
        el7b.id        = BOUND_SP.LIMITS_SP[i].number + "_refType_display" + uid;
        el7b.className = "";

        var el7c       = document.createTextNode((BOUND_SP.LIMITS_SP[i].refType == "")? "[Select]" : BOUND_SP.LIMITS_SP[i].refType);
        el7b.appendChild(el7c);
        
        if (!EDITDISABLED) {
          cell7.title    = "Click to change the Referential Limit Type";
          el7b.onclick   = new Function ("changeSPReferentialLimitType('" + uid + "', " + i + ");");
        } else {
          cell7.className = "grayedout";
        }

        cell7.appendChild(el7a);
        cell7.appendChild(el7b);

        //---------------------------------------------------------
        //  Cell 8:  Model Number
        //    Holds a text entry box to define the MN
        //    to be used for the referential limit
        var cell8  = reftblRow.insertCell(1);
        cell8.className = "ni";
        var el8a   = document.createElement('input');
        el8a.type  = "text"
        el8a.className = "hidden";
        el8a.id    = BOUND_SP.LIMITS_SP[i].number + "_refModel" + uid;
        el8a.name  = BOUND_SP.LIMITS_SP[i].number + "_refModel" + uid;
        el8a.value = BOUND_SP.LIMITS_SP[i].model;
        el8a.onblur = new Function ("saveModel(" + uid + ", " + i + ");");

        var el8b  = document.createElement('div');
        var el8c  = document.createTextNode((BOUND_SP.LIMITS_SP[i].model == "")? "[Empty]" : BOUND_SP.LIMITS_SP[i].model);
        el8b.id   = BOUND_SP.LIMITS_SP[i].number + "_refModel_display" + uid;
        el8b.appendChild(el8c);

        if (specify && !EDITDISABLED) {
          cell8.title     = "Click to edit the " + MNDisplay;
          cell8.onclick   = new Function ("setSPModelNumber('" + uid + "', " + i + ");");
        } else {
          cell8.className = "grayedout";
        }

        cell8.appendChild(el8a);
        cell8.appendChild(el8b);

        //---------------------------------------------------------
        //  Cell 9:  Serial Number
        //    Holds a text entry box to define the SN
        //    to be used for the referential limit
        var cell9  = reftblRow.insertCell(2);
        cell9.className = "ni";
        var el9a   = document.createElement('input');
        el9a.type  = "text"
        el9a.className = "hidden";
        el9a.id    = BOUND_SP.LIMITS_SP[i].number + "_refSerial" + uid;
        el9a.name  = BOUND_SP.LIMITS_SP[i].number + "_refSerial" + uid;
        el9a.value = BOUND_SP.LIMITS_SP[i].serial;
        el9a.onblur = new Function ("saveSerial(" + uid + ", " + i + ");");

        var el9b  = document.createElement('span');
        var el9c  = document.createTextNode((BOUND_SP.LIMITS_SP[i].serial == "")? "[Empty]" : BOUND_SP.LIMITS_SP[i].serial);
        el9b.id   = BOUND_SP.LIMITS_SP[i].number + "_refSerial_display" + uid;
        el9b.appendChild(el9c);

        if (specify && !EDITDISABLED) {
          cell9.title     = "Click to edit the " + SNDisplay;
          cell9.onclick   = new Function ("setSPSerialNumber('" + uid + "', " + i + ");");
        } else {
          cell9.className = "grayedout";
        }

        cell9.appendChild(el9a);
        cell9.appendChild(el9b);

        //---------------------------------------------------------
        //  Cell 10:  Run Type
        //    Holds a selection box to select
        //    the run type for the limit
        var cell10      = reftblRow.insertCell(3);
        cell10.className = "ni";
        var el10a       = document.createElement('input');
        el10a.type      = "text";
        el10a.id        = BOUND_SP.LIMITS_SP[i].number + "_runType" + uid;
        el10a.name      = BOUND_SP.LIMITS_SP[i].number + "_runType" + uid;
        el10a.value     = BOUND_SP.LIMITS_SP[i].runType;
        el10a.className = "hidden";

        var el10b       = document.createElement('div');
        el10b.id        = BOUND_SP.LIMITS_SP[i].number + "_runType_display" + uid;
        el10b.className = "";

        var el10c       = document.createTextNode((BOUND_SP.LIMITS_SP[i].runType == "")? "[Select]" : BOUND_SP.LIMITS_SP[i].runType);
        el10b.appendChild(el10c);
        
        if (!EDITDISABLED) {
          cell10.title    = "Click to change the Run Type";
          el10b.onclick   = new Function ("changeSPRunType('" + uid + "', " + i + ");");
        } else {
          cell10.className = "grayedout";
        }

        cell10.appendChild(el10a);
        cell10.appendChild(el10b);

        //---------------------------------------------------------
        //  Cell 11:  Run Number
        //    integer value to tell which run number to use for
        //    the referential limit
        var cell11       = reftblRow.insertCell(4);

        var el11a       = document.createElement('input');
        el11a.type      = "text";
        el11a.id        = BOUND_SP.LIMITS_SP[i].number + "_run" + uid;
        el11a.name      = BOUND_SP.LIMITS_SP[i].number + "_run" + uid;
        el11a.value     = BOUND_SP.LIMITS_SP[i].run;
        el11a.title     = "Change the Run Number";
        el11a.onblur    = new Function ("armSPSaveRun('" + uid + "', " + i + ")");  // handle saving changes
        // this allows the user to press "ENTER" to confrim an entry
        if ($.browser.msie) {
          el11a.onkeydown = new Function ("captureReturn(this, window.event)");
        } else {
          el11a.setAttribute("onkeydown", "captureReturn(this, event);");
        }
        el11a.className = "hidden";

        cell11.className = "ctl";
        cell11.appendChild(el11a);

        // create and show numeric Increase/Decrease buttons
        var el11Ctl     = document.createElement('span');
        el11Ctl.id      = BOUND_SP.LIMITS_SP[i].number + "_run_control" + uid;
        el11Ctl.name    = BOUND_SP.LIMITS_SP[i].number + "_run_control" + uid;
        el11Ctl.className = "hidden";

        // numeric Increase
        var el11Up      = document.createElement('a');
        el11Up.href     = "#nogo";
        var el11UpImg   = document.createElement('img');
        el11Up.title    = "Increase";
        el11Up.onclick  = new Function("editSPRun('" + uid + "', " + i + ", 1);");
        el11UpImg.src   = "/images/scrollup.gif";
        el11Up.appendChild(el11UpImg);

        // numeric Decrease
        var el11Dwn     = document.createElement('a');
        el11Dwn.href    = "#nogo";
        var el11DwnImg  = document.createElement('img');
        el11Dwn.title   = "Decrease";
        el11Dwn.onclick = new Function ("editSPRun('" + uid + "', " + i + ", -1);");
        el11DwnImg.src  = "/images/scrolldown.gif";
        el11DwnImg.id   = "down";
        el11Dwn.appendChild(el11DwnImg);

        el11Ctl.appendChild(el11Up);
        el11Ctl.appendChild(el11Dwn);
        cell11.appendChild(el11Ctl);

        if (runNumber && !EDITDISABLED) {
          cell11.title     = "Click to change the Run Number";
          cell11.onclick = new Function ("editSPRun('" + uid + "', " + i + ", 0);");
        } else {
	  cell11.className = "grayedout";
	}

        var el11b     = document.createElement('div');
        el11b.id      = BOUND_SP.LIMITS_SP[i].number + "_run_display" + uid;
        el11b.name    = BOUND_SP.LIMITS_SP[i].number + "_run_display" + uid;
        var el11c     = document.createTextNode((BOUND_SP.LIMITS_SP[i].run == "")? "1" : BOUND_SP.LIMITS_SP[i].run);
        el11b.appendChild(el11c);
        cell11.appendChild(el11b);

        //---------------------------------------------------------
        //  Cell 12:  Field
        //    Holds a selection box to select
        //    the field to match for the referential limit
        var cell12      = reftblRow.insertCell(5);
        cell12.className = "ni";
        var el12a       = document.createElement('input');
        el12a.type      = "text";
        el12a.id        = BOUND_SP.LIMITS_SP[i].number + "_field" + uid;
        el12a.name      = BOUND_SP.LIMITS_SP[i].number + "_field" + uid;
        if (BOUND_SP.LIMITS_SP[i].field != "") {
          el12a.value   = BOUND_SP.LIMITS_SP[i].field;
        } else {
          el12a.value   = BOUND_SP.LIMITS_SP[i].number;
        }
        el12a.className = "hidden";

        var el12b       = document.createElement('div');
        el12b.id        = BOUND_SP.LIMITS_SP[i].number + "_field_display" + uid;
        el12b.className = "";

        var el12c       = document.createTextNode((BOUND_SP.LIMITS_SP[i].field == "")? "[Select]" : BOUND_SP.LIMITS_SP[i].field);
        el12b.appendChild(el12c);

        if (match && !EDITDISABLED) {
          cell12.title    = "Click to change the Field";
          el12b.onclick   = new Function ("changeSPField('" + uid + "', " + i + ");");
        } else {
          cell12.className = "grayedout";
        }

        cell12.appendChild(el12a);
        cell12.appendChild(el12b);

        //---------------------------------------------------------
        //  Cell 13:  Field Value
        //    Holds a text entry box to define the field value
        //    to be used for the referential limit
        var cell13  = reftblRow.insertCell(6);
        cell13.className = "";
        var el13a   = document.createElement('input');
        el13a.type  = "text"
        el13a.className = "hidden";
        el13a.id    = BOUND_SP.LIMITS_SP[i].number + "_fieldValue" + uid;
        el13a.name  = BOUND_SP.LIMITS_SP[i].number + "_fieldValue" + uid;
        el13a.value = BOUND_SP.LIMITS_SP[i].fieldValue;
        el13a.onblur = new Function ("saveSPChangedFieldValue('" + uid + "', " + i + ");");

        var el13b  = document.createElement('span');
        var el13c  = document.createTextNode((BOUND_SP.LIMITS_SP[i].fieldValue == "")? "[Empty]" : BOUND_SP.LIMITS_SP[i].fieldValue);
        el13b.id   = BOUND_SP.LIMITS_SP[i].number + "_fieldValue_display" + uid;
        el13b.appendChild(el13c);

        if (match && !EDITDISABLED) {
          cell13.title     = "Click to edit the Field Value";
          cell13.onclick   = new Function ("setSPFieldValue('" + uid + "', " + i + ");");
        } else {
          cell13.className = "grayedout";
        }

        cell13.appendChild(el13a);
        cell13.appendChild(el13b);
      }

      //---------------------------------------------------------
      //  Cell 3:  Limit Parameter
      //    Holds a selection box for the parameter that the limit
      //    is assigned to
      var cell3      = row.insertCell(3);
      cell3.className = "ni";

      var el3a       = document.createElement('input');
      el3a.type      = "text";
      el3a.id        = BOUND_SP.LIMITS_SP[i].number + "_limitParameter" + uid;
      el3a.name      = BOUND_SP.LIMITS_SP[i].number + "_limitParameter" + uid;
      el3a.value     = BOUND_SP.LIMITS_SP[i].parameter;
      el3a.className = "hidden";

      var el3b       = document.createElement('div');
      el3b.id        = BOUND_SP.LIMITS_SP[i].number + "_limitParameter_display" + uid;
      el3b.className = "";

      var el3c       = document.createTextNode((BOUND_SP.LIMITS_SP[i].parameter == "" || BOUND_SP.LIMITS_SP[i].parameter == "None Measured")? "[Select]" : BOUND_SP.LIMITS_SP[i].parameter);
      el3b.appendChild(el3c);
      
      if (!EDITDISABLED) {
        cell3.title    = "Click to change the Parameter";
        el3b.onclick   = new Function ("changeSPParameter('" + uid + "', " + i + ");");
      } else {
        cell3.className = "grayedout";
      }

      cell3.appendChild(el3a);
      cell3.appendChild(el3b);

      //---------------------------------------------------------
      //  Cell 4:  Format
      //    Holds a selection box to select the format for the limit
      var cell4      = row.insertCell(4);
      cell4.className = "ni";

      var el4a       = document.createElement('input');
      el4a.type      = "text";
      el4a.id        = BOUND_SP.LIMITS_SP[i].number + "_limitFormat" + uid;
      el4a.name      = BOUND_SP.LIMITS_SP[i].number + "_limitFormat" + uid;
      el4a.value     = BOUND_SP.LIMITS_SP[i].format;
      el4a.className = "hidden";

      var el4b       = document.createElement('div');
      var el4c       = document.createTextNode((BOUND_SP.LIMITS_SP[i].format == "")? "[Select]" : BOUND_SP.LIMITS_SP[i].format);
      el4b.id        = BOUND_SP.LIMITS_SP[i].number + "_limitFormat_display" + uid;
      el4b.appendChild(el4c);
      el4b.className = "";

      if ((BOUND_SP.LIMITS_SP[i].parameter != "" && BOUND_SP.LIMITS_SP[i].parameter != "None Measured") || !EDITDISABLED) {
        cell4.title    = "Click to change the Format";
        el4b.onclick   = new Function ("changeSPFormat('" + uid + "', " + i + ");");
      } else {
        cell4.className = "grayedout";
      }

      cell4.appendChild(el4a);
      cell4.appendChild(el4b);

      //---------------------------------------------------------
      //  Cell 5:  Limit Type
      //    Holds a selection box to select
      //    the limit type for the limit
      var cell5      = row.insertCell(5);
      cell5.className = "ni";

      var el5a       = document.createElement('input');
      el5a.type      = "text";
      el5a.id        = BOUND_SP.LIMITS_SP[i].number + "_type" + uid;
      el5a.name      = BOUND_SP.LIMITS_SP[i].number + "_type" + uid;
      el5a.value     = BOUND_SP.LIMITS_SP[i].type;
      el5a.className = "hidden";

      var el5b       = document.createElement('div');
      el5b.id        = BOUND_SP.LIMITS_SP[i].number + "_type_display" + uid;
      el5b.className = "";

      var el5c       = document.createTextNode((BOUND_SP.LIMITS_SP[i].type == "")? "[Select]" : BOUND_SP.LIMITS_SP[i].type);
      el5b.appendChild(el5c);
      
      if (!EDITDISABLED) {
        cell5.title    = "Click to change the Limit Type";
        el5b.onclick   = new Function ("changeSPLimitType('" + uid + "', " + i + ");");
      } else {
        cell5.className = "grayedout";
      }

      cell5.appendChild(el5a);
      cell5.appendChild(el5b);
      
      //---------------------------------------------------------
      //  Cell 6:  Filler Cell
      //    Holds a blank cell as a filler cell
      var cell6 = row.insertCell(6);
      cell6.onclick = new Function ("setSPActiveLimit('" + uid + "', " + i + ");");
    }

    // everything's added - paint the table styles
    setSPLimitTableRows(uid);
    setSPActiveLimit(uid, BOUND_SP.activeLimit);
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
function removeSPLimit(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var FILTER_SP = getSPFilterObject(uid);
  var DISPLAY_SP = getSPDisplayObject(uid);
  var type = BOUND_SP.LIMITS_SP[i].type;
  var message = "";
  var removeLimitMarkers = false;

  if (BOUND_SP.LIMITS_SP.length == 1) {
    for (var j=0; j<DISPLAY_SP.PLOTS_SP.length; j++) {
      for (var k=0; k<DISPLAY_SP.PLOTS_SP[j].MARKERS_SP.length; k++) {
        if (DISPLAY_SP.PLOTS_SP[j].MARKERS_SP[k].type == "Limit Maximum" || DISPLAY_SP.PLOTS_SP[j].MARKERS_SP[k].type == "Limit Minimum") {
          removeLimitMarkers = true;
          break;
        }
      }
    }
  }

  if (type == "Filter") {
    message = "Removing this limit definition will also remove the filter limit definition from the Filter Limits tab.\n\n";
  }
  if (removeLimitMarkers) {
    message = message + "Removing this limit definition will also remove any limit markers that have been defined on the Display tab.\n\n";
  }
  message = message + "Are you sure you would like to remove this limit definition?";

  if (confirm(message)) {
    BOUND_SP.LIMITS_SP.splice(i, 1);
    if (type == "Filter") {
      removeSPFilterLimit(uid, i, true);
    } else if (FILTER_SP.FILTERLIMITS_SP.length > 0) {
      for (k=0; k<FILTER_SP.FILTERLIMITS_SP.length; k++) {
        if (FILTER_SP.FILTERLIMITS_SP[k].limitNumber > i + 1) {
          FILTER_SP.FILTERLIMITS_SP[k].limitNumber = FILTER_SP.FILTERLIMITS_SP[k].limitNumber - 1;
        }
      }
      setSPActiveFilterLimit(uid, FILTER_SP.activeFilterLimit);
    }

    for (k=i; k<BOUND_SP.LIMITS_SP.length; k++) {
      BOUND_SP.LIMITS_SP[k].number = BOUND_SP.LIMITS_SP[k].number - 1;
    }

    if (removeLimitMarkers) {
      for (var j=0; j<DISPLAY_SP.PLOTS_SP.length; j++) {
        for (var k=0; k<DISPLAY_SP.PLOTS_SP[j].MARKERS_SP.length; k++) {
          if (DISPLAY_SP.PLOTS_SP[j].MARKERS_SP[k].type == "Limit Maximum" || DISPLAY_SP.PLOTS_SP[j].MARKERS_SP[k].type == "Limit Minimum") {
            removeSPMarker(uid, k);
          }
        }
      }
    }

    setSPActiveLimit(uid, -1);
    makeChanges();
    buildSPLimitsTable(uid);
  }
}

//---------------------------------------------------------
//  Limit Table Cell 2:  Change Referential Limit
//---------------------------------------------------------
function setSPLimitReferential(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  BOUND_SP.LIMITS_SP[i].referential = !(BOUND_SP.LIMITS_SP[i].referential);
  makeChanges();
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

//---------------------------------------------------------
//  Limit Table Cell 3:  Change Limit Parameter
//---------------------------------------------------------
function changeSPParameter(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_limitParameter_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all parameters
  var A = getSPParameterValues(uid);

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);

  // search array for index of format
  var index = A.indexOf(BOUND_SP.LIMITS_SP[i].parameter);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedParameter('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedParameter('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedParameter(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var FILTER_SP = getSPFilterObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the parameter text
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new parameter
  if (j != BOUND_SP.LIMITS_SP[i].parameter) {
    BOUND_SP.LIMITS_SP[i].parameter = j;

    // check that current format is still valid
    var A = getSPFormatValues(BOUND_SP.LIMITS_SP[i].parameter);
    if (A.indexOf(BOUND_SP.LIMITS_SP[i].format) < 0) {
      BOUND_SP.LIMITS_SP[i].format = "";
    }

    // update the filter limit if necessary
    if (BOUND_SP.LIMITS_SP[i].type == "Filter") {
      for (var k=0; k<FILTER_SP.FILTERLIMITS_SP.length; k++) {
        if (BOUND_SP.LIMITS_SP[i].number + 1 == FILTER_SP.FILTERLIMITS_SP[k].limitNumber) {
          FILTER_SP.FILTERLIMITS_SP[k].parameter = j;
          FILTER_SP.FILTERLIMITS_SP[k].format = BOUND_SP.LIMITS_SP[i].format;
          setSPActiveFilterLimit(uid, FILTER_SP.activeFilterLimit);
        }
      }
    }

    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

//---------------------------------------------------------
//  Limit Table Cell 4:  Change Limit Format
//---------------------------------------------------------
function changeSPFormat(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_limitFormat_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all valid formats
  var A = getSPFormatValues(BOUND_SP.LIMITS_SP[i].parameter);

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);
  
  // search array for index of format
  var index = A.indexOf(BOUND_SP.LIMITS_SP[i].format);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedFormat('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedFormat('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedFormat(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var FILTER_SP = getSPFilterObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the format text
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new format
  if (j != BOUND_SP.LIMITS_SP[i].format) {
    var oldFormat = BOUND_SP.LIMITS_SP[i].format;
    BOUND_SP.LIMITS_SP[i].format = j;
    convertSPLimitPoints(uid, oldFormat);
    
    // update the filter limit if necessary
    if (BOUND_SP.LIMITS_SP[i].type == "Filter") {
      for (var k=0; k<FILTER_SP.FILTERLIMITS_SP.length; k++) {
        if (BOUND_SP.LIMITS_SP[i].number + 1 == FILTER_SP.FILTERLIMITS_SP[k].limitNumber) {
          FILTER_SP.FILTERLIMITS_SP[k].format = j;
          setSPActiveFilterLimit(uid, FILTER_SP.activeFilterLimit);
        }
      }
    }

    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

//---------------------------------------------------------
//  Limit Table Cell 5:  Change Limit Type
//---------------------------------------------------------
function changeSPLimitType(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_type_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create array of all limit types
  var A = getLimitTypes();

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);
  
  // search array for index of limit type
  var index = A.indexOf(BOUND_SP.LIMITS_SP[i].type);

  s.selectedIndex = index;
  s.onchange = new Function ("saveChangedLimitType('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedLimitType('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedLimitType(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the type text
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new type
  if (j != BOUND_SP.LIMITS_SP[i].type) {
    // if changing from Filter type, remove the filter limit
    if (BOUND_SP.LIMITS_SP[i].type == "Filter") {
      // confirm that the limit is to be removed
      if (confirm("Changing this away from a Filter type will remove the filter limit from the Filter Limits tab.\n\nAre you sure you would like to continue?")) {
        BOUND_SP.LIMITS_SP[i].type = j;
        removeSPFilterLimit(uid, i, false)
        makeChanges();
      }
    }

    // if changing to the Filter type, add the filter limit
    else if (j == "Filter") {
      var proceed = true;
      // warn the user if there are points or referential designation that will be removed
      if (BOUND_SP.LIMITS_SP[i].POINTS_SP.length > 0 || BOUND_SP.LIMITS_SP[i].referential) {
        proceed = confirm("Changing this to a Filter type will remove any defined points or referential definition for this limit.\n\nAre you sure you would like to continue?");
      }
      if (proceed) {
        BOUND_SP.LIMITS_SP[i].type = j;
        BOUND_SP.LIMITS_SP[i].POINTS_SP.length = 0;
        BOUND_SP.LIMITS_SP[i].referential = false;
        addSPFilterLimit(uid);
        makeChanges();
      }
    }

    // otherwise just change the limit type
    else {
      BOUND_SP.LIMITS_SP[i].type = j;
      makeChanges();
    }
  }

  s.parentNode.removeChild(s);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

function getLimitTypes() {
  var list = ["Upper", "Lower", "Delta", "Filter"];

  return list;
}

//---------------------------------------------------------
//  Limit Table Cell 6:  Change Referential Type
//---------------------------------------------------------
function changeSPReferentialLimitType(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_refType_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all referential limit types
  var A = [];
  getReferentialLimitTypes(A);

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);
  
  // search array for index of referential limit type
  var index = A.indexOf(BOUND_SP.LIMITS_SP[i].refType);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedReferentialLimitType('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedReferentialLimitType('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedReferentialLimitType(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the referential limit type text
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new referential limit type
  if (j != BOUND_SP.LIMITS_SP[i].refType) {
    BOUND_SP.LIMITS_SP[i].refType = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

function getReferentialLimitTypes(A) {
  A[0] = ["Current"];
  A[1] = ["Specify"];
}

//---------------------------------------------------------
//  Limit Table Cell 7:  Set Model Number
//---------------------------------------------------------
function setSPModelNumber(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_refModel_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = lname + "_text" + uid;
  t.value = BOUND_SP.LIMITS_SP[i].model;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveSPChangedModel('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedModel(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var t     = document.getElementById(lname + "_text" + uid);
  var j     = t.value; // get the model number text

  // don't make changes if they didn't select a new model number
  if (j != BOUND_SP.LIMITS_SP[i].model) {
    BOUND_SP.LIMITS_SP[i].model = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

//---------------------------------------------------------
//  Limit Table Cell 8:  Set Serial Number
//---------------------------------------------------------
function setSPSerialNumber(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_refSerial_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = lname + "_text" + uid;
  t.value = BOUND_SP.LIMITS_SP[i].serial;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveSPChangedSerial('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedSerial(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var t     = document.getElementById(lname + "_text" + uid);
  var j     = t.value; // get the serial number text

  // don't make changes if they didn't select a new serial number
  if (j != BOUND_SP.LIMITS_SP[i].serial) {
    BOUND_SP.LIMITS_SP[i].serial = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

//---------------------------------------------------------
//  Limit Table Cell 9:  Change Run Type
//---------------------------------------------------------
function changeSPRunType(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_runType_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all run types
  var A = [];
  getRunTypes(A);

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);

  // search array for index of run type
  var index = A.indexOf(BOUND_SP.LIMITS_SP[i].runType);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedRunType('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedRunType('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedRunType(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the run type text
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new run type
  if (j != BOUND_SP.LIMITS_SP[i].runType) {
    BOUND_SP.LIMITS_SP[i].runType = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

function getRunTypes(A) {
  A[0] = ["Most Recent"];
  A[1] = ["Run #"];
  A[2] = ["Match Field"];
}

//---------------------------------------------------------
//  Limit Table Cell 10:  Run Number
//---------------------------------------------------------
// the global and armSPSaveRun() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPRun() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Run table cell -> editSPRun(i) runs
//   2a) User clicks off now visible control -> armSPSaveRun()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveRun() function will be cleared by the newest
//       editSPRune() call.
var RUNTIMER = 0;
function armSPSaveRun(uid, i) {
  RUNTIMER = setTimeout("saveSPRun('" + uid + "', " + i + ")", 250);
}
function editSPRun(uid, i, scroll) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);
  // clear pending changes since
  // we're making more
  clearTimeout(RUNTIMER);

  var s = document.getElementById(BOUND_SP.LIMITS_SP[i].number + "_run" + uid);

  s.value = parseInt(s.value) + scroll;
  (s.value < 1) ? s.value = "1" : s.value += '';

  document.getElementById(BOUND_SP.LIMITS_SP[i].number + "_run_display" + uid).className = "hidden";
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  document.getElementById(BOUND_SP.LIMITS_SP[i].number + "_run_control" + uid).className = "";
}

function saveSPRun(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var s = document.getElementById(BOUND_SP.LIMITS_SP[i].number + "_run" + uid);

  // validate new entry to positive integer and replace with previous if errors
  if (!isInteger(s.value) || s.value < 1) s.value = BOUND_SP.LIMITS_SP[i].run;

  if (s.value != BOUND_SP.LIMITS_SP[i].run) {
    BOUND_SP.LIMITS_SP[i].run = s.value;  // update changes to LIMITS_SP array
    makeChanges();
  }

  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

//---------------------------------------------------------
//  Limit Table Cell 11:  Change Field
//---------------------------------------------------------
function changeSPField(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_field_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, BOUND_SP.fields, BOUND_SP.fields);
  
  // search array for index of run type
  var index = BOUND_SP.fields.indexOf(BOUND_SP.LIMITS_SP[i].field);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedField('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedField('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedField(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the field
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new run type
  if (j != BOUND_SP.LIMITS_SP[i].field) {
    BOUND_SP.LIMITS_SP[i].field = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

//---------------------------------------------------------
//  Limit Table Cell 12:  Change Field Value
//---------------------------------------------------------
function setSPFieldValue(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  setSPActiveLimit(uid, i);

  var lname = BOUND_SP.LIMITS_SP[i].number;
  var dtext = document.getElementById(lname + "_fieldValue_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = lname + "_text" + uid;
  t.value = BOUND_SP.LIMITS_SP[i].fieldValue;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveSPChangedFieldValue('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedFieldValue(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var lname = BOUND_SP.LIMITS_SP[i].number;
  var t     = document.getElementById(lname + "_text" + uid);
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new field value
  if (j != BOUND_SP.LIMITS_SP[i].fieldValue) {
    BOUND_SP.LIMITS_SP[i].fieldValue = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, i);
}

//---------------------------------------------------------
//  Add new limit to the table
//---------------------------------------------------------
function addSPLimit(uid) {
  var BOUND_SP = getSPBoundObject(uid);
  var MEASUREMENT_SP = getSPMeasurementObject(uid);

  if (EDITDISABLED || MEASUREMENT_SP.PARAMETERS_SP.length == 0) return;

  BOUND_SP.LIMITS_SP[BOUND_SP.LIMITS_SP.length] = new LIMIT_SP(BOUND_SP.LIMITS_SP.length, "S" + MEASUREMENT_SP.PARAMETERS_SP[0].response + MEASUREMENT_SP.PARAMETERS_SP[0].stimulus, "Log Mag", "Upper", false, "Current", "", "", "Most Recent", "1", "", "", []);

  makeChanges();
  buildSPLimitsTable(uid);
  setSPActiveLimit(uid, BOUND_SP.LIMITS_SP.length - 1);
}

//---------------------------------------------------------
//  Add copy of the selected limit to the table
//---------------------------------------------------------
function addSPLimitCopy(uid) {
  if (EDITDISABLED) return;

  var BOUND_SP = getSPBoundObject(uid);
  var FILTER_SP = getSPFilterObject(uid);

  if (BOUND_SP.activeLimit >= 0) {
    BOUND_SP.LIMITS_SP[BOUND_SP.LIMITS_SP.length] = new copySPLimit(BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit]);
    BOUND_SP.LIMITS_SP[BOUND_SP.LIMITS_SP.length - 1].number = BOUND_SP.LIMITS_SP.length - 1;

    // copy filter limit if necessary
    if (BOUND_SP.LIMITS_SP[BOUND_SP.LIMITS_SP.length - 1].type == "Filter") {
      for (var i=0; i < FILTER_SP.FILTERLIMITS_SP.length; i++) {
        if (FILTER_SP.FILTERLIMITS_SP[i].limitNumber == BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].number + 1) {
          break;
        }
      }
      FILTER_SP.FILTERLIMITS_SP[FILTER_SP.FILTERLIMITS_SP.length] = new copySPFilterLimit(FILTER_SP.FILTERLIMITS_SP[i]);
      FILTER_SP.FILTERLIMITS_SP[FILTER_SP.FILTERLIMITS_SP.length - 1].limitNumber = BOUND_SP.LIMITS_SP.length;
      setSPActiveFilterLimit(uid, FILTER_SP.FILTERLIMITS_SP.length - 1);
    }

    makeChanges();
    buildSPLimitsTable(uid);
    setSPActiveLimit(uid, BOUND_SP.LIMITS_SP.length - 1);
  }
}

//---------------------------------------------------------
// BOUND_SP UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the BOUND_SP object with the unique id
//---------------------------------------------------------
function getSPBoundObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('BOUND_SP' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('boundSetup' + uid).value);
  }
  return (eval('BOUND_SP' + uid));
}

//---------------------------------------------------------
// Displays the BOUND_SP object for debugging
//---------------------------------------------------------
function displaySPBound(m) {
    var output = 'BOUND_SP:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
// Sets LIMIT_SP table row styling to alternate colors
//---------------------------------------------------------
function setSPLimitTableRows(uid) {
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

//----------------------------------------------------------
// Sets the table's active row and shows corresponding LIMIT_SP
//----------------------------------------------------------
function setSPActiveLimit(uid, activeLimit) {
  var BOUND_SP = getSPBoundObject(uid);
  var table  = document.getElementById('limits' + uid);

  // insert activeLimit into Copy function
  document.getElementById('_addSPLimitCopy' + uid).onclick = function(){this.blur(); addSPLimitCopy(uid, activeLimit);};
  // set activeLimit in LIMITS_SP object
  BOUND_SP.activeLimit = activeLimit;

  for (var i=1; i<table.rows.length; i++) {
    // set the row and limit active
    if (!(activeLimit<0) && (activeLimit + 1 == parseInt(table.rows[i].cells[0].innerHTML))) {
      if (table.rows[i].className.search("active") == -1) {
        table.rows[i].className += " active";
        if (table.rows[i].cells[0].rowSpan == 2) {
          table.rows[i + 1].className += " active";
      	  table.rows[i + 1].cells[0].childNodes[0].rows[1].className += " active";
        }
      }
    } else {
      table.rows[i].className = table.rows[i].className.replace("active", "");
      if (table.rows[i].cells[0].rowSpan == 2) {
      	table.rows[i + 1].className = table.rows[i + 1].className.replace("active", "");
      	table.rows[i + 1].cells[0].childNodes[0].rows[1].className = table.rows[i + 1].cells[0].childNodes[0].rows[1].className.replace("active", "");
      }
    }
  }
  buildSPPointsTable(uid);
}

//---------------------------------------------------------
// Returns a copy of a LIMIT_SP object
// This long function is necessary to copy by value
// and not by reference.
//---------------------------------------------------------
function copySPLimit(dupeObj) {
  var retObj = new Object();
  if (typeof(dupeObj) == 'object') {
    if (typeof(dupeObj.length) != 'undefined')
      var retObj = new Array();
    for (var objInd in dupeObj) {
      if (typeof(dupeObj[objInd]) == 'object') {
        retObj[objInd] = copySPLimit(dupeObj[objInd]);
      } else if (typeof(dupeObj[objInd]) == 'string') {
        retObj[objInd] = dupeObj[objInd];
      } else if (typeof(dupeObj[objInd]) == 'number') {
        retObj[objInd] = dupeObj[objInd];
      } else if (typeof(dupeObj[objInd]) == 'boolean') {
        ((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false);
      }
    }
  }
  return retObj;
}

//---------------------------------------------------------
// Converts the limit points to a different format.
//---------------------------------------------------------
function convertSPLimitPoints(uid, oldFormat) {
  var BOUND_SP = getSPBoundObject(uid);
  var pointValue = 0;
  
  for (var i=0; i<BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP.length; i++) {
    // Convert point value to fundatmental from old format
    if (oldFormat == "Log Mag") {
      pointValue = Math.pow(10,(BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].value / 20));
    }
    else if (oldFormat == "Lin Mag" || oldFormat == "Phase" || oldFormat == "Delay") {
      pointValue = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].value;
    }
    else if (oldFormat == "SWR") {
      pointValue = (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].value - 1) / (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].value + 1);
    }
    else if (oldFormat == "Return Loss" || oldFormat == "Insertion Loss" || oldFormat == "Isolation") {
      pointValue = Math.pow(10,(-BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].value / 20));
    }

    // Convert point value to desired format
    if (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format == "Log Mag") {
      pointValue = 20 * (Math.log(pointValue) / Math.log(10));
    }
    else if (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format == "Lin Mag" || BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format == "Phase" || BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format == "Delay") {
    }
    else if (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format == "SWR") {
      pointValue = (1 + Math.abs(pointValue)) / (1 - Math.abs(pointValue));
    }
    else if (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format == "Return Loss" || BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format == "Insertion Loss" || BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format == "Isolation") {
      pointValue = -20 * (Math.log(pointValue) / Math.log(10));
    }
    
    if (pointValue == "Infinity" || pointValue == "-Infinity" || pointValue == "NaN") {
      pointValue = "";
    }

    // Set the limit point value to the newly converted value
    BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].value = pointValue;
  }
}

//-------------------------------------------------------
//   Defines and handles the POINTS_SP[] array
//   of the POINT_SP object.  These are manipulated
//   in the edit S Parameter.htm template page using
//   the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The POINT_SP object is the basis for all points in the step.
//---------------------------------------------------------
function POINT_SP(number, frequency, value, x, y, connect) {
  this.number = number;
  this.frequency = frequency;
  this.value = value;
  this.x = x;
  this.y = y;
  this.connect = connect;
}

//---------------------------------------------------------
// This is the main function to build
// the points table from the POINTS_SP array
// It requires the following items:
//
//   * global POINTS_SP[] array filled
//   * table with id 'limitPoints'
//---------------------------------------------------------
function buildSPPointsTable(uid) {
  var BOUND_SP = getSPBoundObject(uid);
  var STIMULUS_SP = getSPStimulusObject(uid);
  var tbl = document.getElementById('limitPoints' + uid);

  // Remove old text node for limit number
  if (tbl.rows[0].cells[0].childNodes.length > 1) {
    tbl.rows[0].cells[0].removeChild(tbl.rows[0].cells[0].childNodes[1]);
  }

  // insert activeLimit into Copy function
  document.getElementById('_addSPPointCopy' + uid).onclick = function(){this.blur(); addSPPointCopy(uid);};

  // first, clear existing table.  The try/catch is for Firefox...
  var i=tbl.rows.length;
  while (tbl.rows.length > 2) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }
  
  // Remove old text node for frequency units
  if (tbl.rows[1].cells[4].childNodes.length > 1) {
    tbl.rows[1].cells[4].removeChild(tbl.rows[1].cells[4].childNodes[1]);
  }

  // Display the units for the frequencies
  var pointFreqUnits = document.createTextNode("Frequency (" + STIMULUS_SP.units + ")");
  tbl.rows[1].cells[4].appendChild(pointFreqUnits);

  if (BOUND_SP.activeLimit >=0) {
    // Add the text and title of the points table
    var limitNumber = document.createTextNode("Limit " + (BOUND_SP.activeLimit + 1) + " Points");
    tbl.rows[0].cells[0].appendChild(limitNumber);
    tbl.rows[0].title = "Limit points for limit number " + (BOUND_SP.activeLimit + 1);

    var delta = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].type == "Delta";  // is this a delta limit
    var referential = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].referential;  // is this a referential limit

    // Only build the table if there are POINTS_SP to process
    if (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP.length !=0) {
      // This is the main loop that builds the rows
      // of the table by adding cells one at a time
      for (var i=0; i<BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP.length; i++) {

        var row = tbl.insertRow(i + 2); // there are 2 header rows

        //---------------------------------------------------------
        //  Cell 0:  Point Number
        //    Row header showing point number in step
        //    a little different method here as it's a "th" element
        var cell0 = document.createElement('th');

        //  set click event to detect CTRL or SHIFT plus click for selection
        //  the command is different for IE and FF or NS
        if ($.browser.msie) {
          cell0.onclick = new Function("setSPActivePoints('" + uid + "', window.event, " + i + ");");
        } else {
          cell0.setAttribute("onclick", "setSPActivePoints('" + uid + "', event, " + i + ");");
        }

        cell0.className = "rowheader";
        var el0   = document.createTextNode(BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + 1);
        cell0.title = "Point Number";
        cell0.appendChild(el0);
        row.appendChild(cell0);

        //---------------------------------------------------------
        //  Cell 1:  Delete Point (row)
        //    Holds an icon/link to delete the row
        var cell1 = row.insertCell(1);
        cell1.className = "icon";
        var el1   = document.createElement('img');
        if (!EDITDISABLED) {
          el1.src   = "/images/deletesmall.gif";
          el1.title = "Delete this point";
          el1.onclick = new Function ("removeSPPoint('" + uid + "', " + i + ");");
        } else {
          el1.src   = "/images/deletesmalldisabled.gif";
          el1.title = "Cannot edit sequence";
        }
        cell1.appendChild(el1);

        //---------------------------------------------------------
        //  Cell 2:  Point Reordering
        //    Holds a couple of images/links to handle
        //    reordering rows of the points table
        var cell2 = row.insertCell(2);
        cell2.className = "icon";

        //  Move up (toward top of list; index gets smaller)
        var el2aUp    = document.createElement('a');
        el2aUp.href   = "#nogo";
        var el2aUpImg = document.createElement('img');
        el2aUpImg.className = "movers";
        if (i==0 || EDITDISABLED) {    // disable UP on first element
          el2aUpImg.src     = "/images/upsmalldisabled.gif";
        } else {
          el2aUp.title   = "move up"
          el2aUp.onclick = new Function("this.blur(); moveSPPoint('" + uid + "', -(" + i + "));");
          el2aUpImg.src  = "/images/upsmall.gif";
        }
        el2aUp.appendChild(el2aUpImg);

        //  Move down (toward bottom of list; index gets bigger)
        var el2aDwn    = document.createElement('a');
        el2aDwn.href   = "#nogo";
        var el2aDwnImg = document.createElement('img');
        el2aDwnImg.className = "movers";
        if (i==BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP.length - 1 || EDITDISABLED) {  // disable DOWN on last element
          el2aDwnImg.src     = "/images/downsmalldisabled.gif";
        } else {
          el2aDwn.title      = "move down"
          el2aDwn.onclick    = new Function ("this.blur(); moveSPPoint('" + uid + "', " + i + ");");
          el2aDwnImg.src     = "/images/downsmall.gif";
        }
        el2aDwn.appendChild(el2aDwnImg);

        cell2.appendChild(el2aUp);
        cell2.appendChild(el2aDwn);
        
        //---------------------------------------------------------
        //  Cell 3:  Point Connected
        //    Holds a checkbox to select whether to connect to
        //    the previous point
        var cell3      = row.insertCell(3);
        cell3.className = "icon";

        var el3       = document.createElement('input');
        el3.type      = "checkbox";
        el3.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_connect" + uid;
        el3.name      = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_connect" + uid;
        cell3.appendChild(el3);   // have to append before setting attributes for IE6

        el3.disabled = false;
        el3.checked  = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].connect;

        if (i != 0 && !EDITDISABLED) {
          el3.onclick  = new Function ("setSPConnect('" + uid + "', " + i + ");");
          cell3.title    = "Click to toggle a Connection";
        } else {
          el3.disabled = true;
        }

        //---------------------------------------------------------
        //  Cell 4:  Point Frequency
        //    Holds a text box to enter the frequency for the point
        var cell4      = row.insertCell(4);
        cell4.className = "ni";

        var el4a       = document.createElement('input');
        el4a.type      = "text";
        el4a.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_frequency" + uid;
        el4a.name      = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_frequency" + uid;
        el4a.value     = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].frequency;
        el4a.onblur    = new Function ("saveSPChangedFrequency('" + uid + "', " + i + ");");
        el4a.className = "hidden";

        var el4b       = document.createElement('span');
        var el4c       = document.createTextNode((BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].frequency == "")? "[Empty]" : BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].frequency);
        el4b.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_frequency_display" + uid;
        el4b.appendChild(el4c);

        if (!EDITDISABLED) {
          cell4.title    = "Click to change the Frequency";
          el4b.onclick   = new Function ("setSPFrequency('" + uid + "', " + i + ");");
        } else {
          cell4.className = "grayedout";
        }

        cell4.appendChild(el4a);
        cell4.appendChild(el4b);

        //---------------------------------------------------------
        //  Cell 5:  Point Value
        //    Holds a text box to enter the value for the point
        var cell5      = row.insertCell(5);
        cell5.className = "ni";

        var el5a       = document.createElement('input');
        el5a.type      = "text";
        el5a.className = "hidden";
        el5a.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_value" + uid;
        el5a.name      = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_value" + uid;
        el5a.value     = Number(BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].value).toFixed(2);
        el5a.onblur    = new Function ("saveSPChangedValue('" + uid + "', " + i + ");");

        var el5b       = document.createElement('span');
        var el5c       = document.createTextNode(Number(BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].value).toFixed(2));
        el5b.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_value_display" + uid;
        el5b.appendChild(el5c);
        
        if (!EDITDISABLED && !(referential && delta)) {
          cell5.title    = "Click to change the Value";
          el5b.onclick   = new Function ("setSPValue('" + uid + "', " + i + ");");
        } else {
          cell5.className = "grayedout";
        }

        cell5.appendChild(el5a);
        cell5.appendChild(el5b);

        //---------------------------------------------------------
        //  Cell 6:  Point X
        //    Holds a text box to enter the X value for the point
        var cell6      = row.insertCell(6);
        cell6.className = "ni";

        var el6a       = document.createElement('input');
        el6a.type      = "text";
        el6a.className = "hidden";
        el6a.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_x" + uid;
        el6a.name      = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_x" + uid;
        el6a.value     = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].x;
        el6a.onblur    = new Function ("saveSPChangedX('" + uid + "', " + i + ");");

        var el6b       = document.createElement('span');
        var el6c       = document.createTextNode((BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].x == "")? "[Empty]" : BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].x);
        el6b.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_x_display" + uid;
        el6b.appendChild(el6c);

        if (delta && !EDITDISABLED) {
          el6b.onclick   = new Function ("setSPX('" + uid + "', " + i + ");");
          cell6.title    = "Click to change the Delta Upper Offset";
        } else {
          cell6.className = "grayedout";
        }

        cell6.appendChild(el6a);
        cell6.appendChild(el6b);

        //---------------------------------------------------------
        //  Cell 7:  Point Y
        //    Holds a text box to enter the Y value for the point
        var cell7      = row.insertCell(7);
        cell7.className = "ni";

        var el7a       = document.createElement('input');
        el7a.type      = "text";
        el7a.className = "hidden";
        el7a.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_y" + uid;
        el7a.name      = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_y" + uid;
        el7a.value     = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].y;
        el7a.onblur    = new Function ("saveSPChangedY('" + uid + "', " + i + ");");

        var el7b       = document.createElement('span');
        var el7c       = document.createTextNode((BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].y == "")? "[Empty]" : BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].y);
        el7b.id        = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP[i].number + "_y_display" + uid;
        el7b.appendChild(el7c);

        if (delta && !EDITDISABLED) {
          el7b.onclick   = new Function ("setSPY('" + uid + "', " + i + ");");
          cell7.title    = "Click to change the Delta Lower Offset";
        } else {
          cell7.className = "grayedout";
        }

        cell7.appendChild(el7a);
        cell7.appendChild(el7b);
        
        //---------------------------------------------------------
        //  Cell 8:  Filler Cell
        //    Holds a blank cell as a filler cell
        var cell8 = row.insertCell(8);
        //  set click event to detect CTRL or SHIFT plus click for selection
        //  the command is different for IE and FF or NS
        if ($.browser.msie) {
          cell8.onclick = new Function("setSPActivePoints('" + uid + "', window.event, " + i + ");");
        } else {
          cell8.setAttribute("onclick", "setSPActivePoints('" + uid + "', event, " + i + ");");
        }
      }

      // everything's added - paint the table styles
      setSPTableRows(uid, 'limitPoints');
      setSPActivePoints(uid, -1, 0);
    }
  } else {
    // Add the text and title of the points table
    var limitNumber = document.createTextNode("Limit # Points");
    tbl.rows[0].cells[0].appendChild(limitNumber);
    tbl.rows[0].title = "Limit points for limit number #";
  }
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the points
// table
//---------------------------------------------------------

//---------------------------------------------------------
//  Limit Points Table Cell 1:  Remove Point (row)
//---------------------------------------------------------
function removeSPPoint(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  POINTS_SP.splice(i, 1);
  
  for (j=i; j<POINTS_SP.length; j++) {
    POINTS_SP[j].number = POINTS_SP[j].number - 1;
  }

  makeChanges();
  buildSPPointsTable(uid);
}

//---------------------------------------------------------
//  Limit Points Table Cell 2:  Reorder Points
//---------------------------------------------------------
function moveSPPoint(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  var dir=1;
  if (i<0) {
    dir = -1;
    i   = -i;
  }

  var tmp = new copySPPoint(POINTS_SP[i + dir]);    // save point above (or below)
  POINTS_SP[i + dir] = null;
  POINTS_SP[i + dir] = new copySPPoint(POINTS_SP[i]);  // replace index with next (or prev)
  POINTS_SP[i + dir].number = tmp.number;
  if (i + dir == 0) {
    POINTS_SP[i + dir].connect = false;           // first point cannot connect to anything
  }
  POINTS_SP[i] = null;
  POINTS_SP[i] = new copySPPoint(tmp);              // move temp back
  POINTS_SP[i].number = i;
  tmp = null;

  makeChanges();
  buildSPPointsTable(uid);
  setSPActivePoints(uid, 0, i + dir);
}

//---------------------------------------------------------
//  Limit Point Table Cell 3:  Change Point Connected
//---------------------------------------------------------
function setSPConnect(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;

  POINTS_SP[i].connect = !(POINTS_SP[i].connect);
  makeChanges();
  buildSPPointsTable(uid);
  setSPActivePoints(uid, 0, i);
}

//---------------------------------------------------------
//  Limit Points Table Cell 4:  Set Point Frequency
//---------------------------------------------------------
function setSPFrequency(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  setSPActivePoints(uid, 0, i);

  var pname = POINTS_SP[i].number;
  var dtext = document.getElementById(pname + "_frequency_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = pname + "_text" + uid;
  t.value = POINTS_SP[i].frequency;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedFrequency('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedFrequency(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  var pname = POINTS_SP[i].number;
  var t     = document.getElementById(pname + "_text" + uid);
  var j     = t.value; // get the frequency

  // don't make changes if they didn't set a new frequency
  if (j != POINTS_SP[i].frequency) {
    POINTS_SP[i].frequency = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPPointsTable(uid);
  setSPActivePoints(uid, 0, i);
}

//---------------------------------------------------------
//  Limit Points Table Cell 5:  Set Point Value
//---------------------------------------------------------
function setSPValue(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  setSPActivePoints(uid, 0, i);

  var pname = POINTS_SP[i].number;
  var dtext = document.getElementById(pname + "_value_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = pname + "_text" + uid;
  t.value = Number(POINTS_SP[i].value).toFixed(2);
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedValue('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedValue(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  var pname = POINTS_SP[i].number;
  var t     = document.getElementById(pname + "_text" + uid);
  var j     = t.value; // get the value

  // don't make changes if they didn't set a new value
  if (j != Number(POINTS_SP[i].value).toFixed(2)) {
    POINTS_SP[i].value = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPPointsTable(uid);
  setSPActivePoints(uid, 0, i);
}

//---------------------------------------------------------
//  Limit Point Table Cell 6:  Set Point X
//---------------------------------------------------------
function setSPX(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  setSPActivePoints(uid, 0, i);

  var pname = POINTS_SP[i].number;
  var dtext = document.getElementById(pname + "_x_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = pname + "_text" + uid;
  t.value = POINTS_SP[i].x;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedX('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedX(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  var pname = POINTS_SP[i].number;
  var t     = document.getElementById(pname + "_text" + uid);
  var j     = t.value; // get the x value

  // don't make changes if they didn't set a new x value
  if (j != POINTS_SP[i].x) {
    POINTS_SP[i].x = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPPointsTable(uid);
  setSPActivePoints(uid, 0, i);
}

//---------------------------------------------------------
//  Limit Point Table Cell 7:  Set Point Y
//---------------------------------------------------------
function setSPY(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  setSPActivePoints(uid, 0, i);

  var pname = POINTS_SP[i].number;
  var dtext = document.getElementById(pname + "_y_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = pname + "_text" + uid;
  t.value = POINTS_SP[i].y;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedY('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedY(uid, i) {
  var BOUND_SP = getSPBoundObject(uid);
  var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
  var pname = POINTS_SP[i].number;
  var t     = document.getElementById(pname + "_text" + uid);
  var j     = t.value; // get the y value

  // don't make changes if they didn't set a new y value
  if (j != POINTS_SP[i].y) {
    POINTS_SP[i].y = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPPointsTable(uid);
  setSPActivePoints(uid, 0, i);
}

//---------------------------------------------------------
//  Add a new point to the table
//---------------------------------------------------------
function addSPPoint(uid) {
  if (EDITDISABLED) return false;

  var BOUND_SP = getSPBoundObject(uid);
  // inform user where to edit limit if Filter type
  if (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].type == "Filter") {
    alert("This is a Filter Limit and cannot have any points defined.\n\nPlease use the Filter Limits tab to define this limit type.");
    return false;
  }

  var STIMULUS_SP = getSPStimulusObject(uid);
  if (BOUND_SP.activeLimit >= 0) {
    var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;
    
    // if first point set to start frequency
    if (POINTS_SP.length == 0) {
      POINTS_SP[POINTS_SP.length] = new POINT_SP(POINTS_SP.length, STIMULUS_SP.startFreq, "", "", "", false);
    }
    // if second point set to stop frequency
    else if (POINTS_SP.length == 1) {
      POINTS_SP[POINTS_SP.length] = new POINT_SP(POINTS_SP.length, STIMULUS_SP.stopFreq, POINTS_SP[POINTS_SP.length-1].value, POINTS_SP[POINTS_SP.length-1].x, POINTS_SP[POINTS_SP.length-1].y, true);
    }
    // else set to the last point
    else {
      POINTS_SP[POINTS_SP.length] = new POINT_SP(POINTS_SP.length, POINTS_SP[POINTS_SP.length - 1].frequency, POINTS_SP[POINTS_SP.length-1].value, POINTS_SP[POINTS_SP.length-1].x, POINTS_SP[POINTS_SP.length-1].y, POINTS_SP[POINTS_SP.length-1].connect);
    }

    makeChanges();
    buildSPPointsTable(uid);
    setSPActivePoints(uid, 0, POINTS_SP.length-1);
  }
  return false;
}

//---------------------------------------------------------
//  Add copy of the selected points to the table
//---------------------------------------------------------
function addSPPointCopy(uid) {
  if (EDITDISABLED) return false;

  var BOUND_SP = getSPBoundObject(uid);
  // inform user where to edit limit if Filter type
  if (BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].type == "Filter") {
    alert("This is a Filter Limit and cannot have any points defined.\n\nPlease use the Filter Limits tab to define this limit type.");
    return false;
  }

  if (BOUND_SP.activeLimit >= 0 && BOUND_SP.activePoints.length > 0) {
    var POINTS_SP = BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].POINTS_SP;

    for (var i=0; i<BOUND_SP.activePoints.length; i++) {
      POINTS_SP[POINTS_SP.length] = new copySPPoint(POINTS_SP[BOUND_SP.activePoints[i]]);
      POINTS_SP[POINTS_SP.length - 1].number = POINTS_SP.length - 1;
    }

    makeChanges();
    buildSPPointsTable(uid);
  }
  return false
}

//---------------------------------------------------------
//  POINT_SP UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Displays a POINT_SP object for debugging
//---------------------------------------------------------
function displaySPPoint(POINTS_SP, m) {
    var output = 'POINT_SP:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//----------------------------------------------------------
// Sets the table's active row and shows corresponding point
//----------------------------------------------------------
function setSPActivePoints(uid, e, point) {
  var BOUND_SP = getSPBoundObject(uid);
  var tbl  = document.getElementById('limitPoints' + uid)

  if (e != -1) {
    if ((e.ctrlKey && e.shiftKey) || (!e.ctrlKey && !e.shiftKey) || e == 0) {
      BOUND_SP.activePoints = [];
      BOUND_SP.activePoints[0] = point;
    } else if (e.ctrlKey) {
      var index = BOUND_SP.activePoints.indexOf(point);
      if (index >= 0) {
      	BOUND_SP.activePoints.splice(index, 1);
      } else {
        BOUND_SP.activePoints[BOUND_SP.activePoints.length] = point;
      }
    } else if (e.shiftKey) {
      BOUND_SP.activePoints.sort();

      if (point > BOUND_SP.activePoints[BOUND_SP.activePoints.length - 1]) {
        var temp = BOUND_SP.activePoints[BOUND_SP.activePoints.length - 1];
        var numberOfPoints = point - temp;
        BOUND_SP.activePoints = [];
        for (var i=0; i<=numberOfPoints; i++) {
          BOUND_SP.activePoints[i] = temp;
          temp++;
        }
      }

      if (point < BOUND_SP.activePoints[BOUND_SP.activePoints.length - 1]) {
        var temp = BOUND_SP.activePoints[0];
        var numberOfPoints = temp - point;
        BOUND_SP.activePoints = [];
        for (var i=0; i<=numberOfPoints; i++) {
          BOUND_SP.activePoints[i] = temp;
          temp--;
        }
      }
    }
  }

  for (var i=2; i<tbl.rows.length; i++) {
    // set all rows to non-active first to prevent multiple active tags
    tbl.rows[i].className = tbl.rows[i].className.replace("active", "");
    // set the row and point active
    if (BOUND_SP.activePoints.indexOf(i-2) >= 0) { // two header rows
      tbl.rows[i].className += " active";
    }
  }
}

//---------------------------------------------------------
// returns a copy of a POINT_SP object
//---------------------------------------------------------
function copySPPoint(f) {
  for (i in f) this[i] = f[i];
}

//---------------------------------------------------------------DEEMBED_SP OBJECT-----------------------------------------------------------------------
//---------------------------------------------------------
//   Defines and handles the DEEMBED_SP object.  This
//   is manipulated in the edit S Parameter.htm
//   template page using the edittest.vit CGI.
//---------------------------------------------------------
function DEEMBED_SP(deEmbed, fields, ADAPTERS_SP) {
  this.deEmbed = deEmbed;
  this.fields = fields;
  this.ADAPTERS_SP = ADAPTERS_SP;
}

//---------------------------------------------------------
// The ADAPTER_SP object is the basis for
// all adapters in the measurement.
//---------------------------------------------------------
function ADAPTER_SP(name, port, order, model, serial, runType, run, field, fieldValue) {
  this.name = name;
  this.port = port;
  this.order = order;
  this.model = model;
  this.serial = serial;
  this.runType = runType;
  this.run = run;
  this.field = field;
  this.fieldValue = fieldValue;
}

//---------------------------------------------------------
// This is the main save routine to save the
// DEEMBED_SP object to the DB.
// It requires the following items:
//
//   * global DEEMBED_SP object filled
//---------------------------------------------------------
function saveSPDeEmbedObject(uid) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var deEmbedKeys = "";

  if (DEEMBED_SP.deEmbed) {
    deEmbedKeys = deEmbedKeys + "deEmbed=true";
    if (DEEMBED_SP.ADAPTERS_SP.length != 0) {
      deEmbedKeys = deEmbedKeys + "&";
    }
  }
  for (var i=0; i<DEEMBED_SP.ADAPTERS_SP.length; i++) {
    deEmbedKeys = deEmbedKeys + "port" + i + "=" + DEEMBED_SP.ADAPTERS_SP[i].port + "&";
    deEmbedKeys = deEmbedKeys + "order" + i + "=" + DEEMBED_SP.ADAPTERS_SP[i].order + "&";
    deEmbedKeys = deEmbedKeys + "deModel" + i + "=" + DEEMBED_SP.ADAPTERS_SP[i].model + "&";
    deEmbedKeys = deEmbedKeys + "deSerial" + i + "=" + DEEMBED_SP.ADAPTERS_SP[i].serial + "&";
    deEmbedKeys = deEmbedKeys + "deRunType" + i + "=" + DEEMBED_SP.ADAPTERS_SP[i].runType + "&";
    deEmbedKeys = deEmbedKeys + "deRun" + i + "=" + DEEMBED_SP.ADAPTERS_SP[i].run + "&";
    deEmbedKeys = deEmbedKeys + "deField" + i + "=" + DEEMBED_SP.ADAPTERS_SP[i].field + "&";
    deEmbedKeys = deEmbedKeys + "deFieldValue" + i + "=" + DEEMBED_SP.ADAPTERS_SP[i].fieldValue;
    if (i != DEEMBED_SP.ADAPTERS_SP.length - 1) {
      deEmbedKeys = deEmbedKeys + "&";
    }
  }

  return deEmbedKeys
}

//---------------------------------------------------------
// This is the main function to set
// the measurement parameters from the DEEMBED_SP object.
// It requires the following items:
//
//   * global DEEMBED_SP object filled
//   * control with id 'deEmbed'
//---------------------------------------------------------
function setSPDeEmbedControls(uid) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  // Set all de-embed parameters
  document.getElementById('deEmbed' + uid).checked = DEEMBED_SP.deEmbed;

  // Build the ADAPTERS_SP table
  buildSPAdaptersTable(uid);

  // Disabled all controls if EDITDISABLED
  if (EDITDISABLED) {
    document.getElementById('deEmbed' + uid).disabled = true;
    document.getElementById('adapterPort' + uid).disabled = true;
  }
}

//---------------------------------------------------------
//  De-Embed:  De-Embed Adapters
//---------------------------------------------------------
function saveSPDeEmbed(uid) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  DEEMBED_SP.deEmbed = document.getElementById('deEmbed' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  De-Embed:  Adapter Port
//---------------------------------------------------------
function changeSPAdapterPort(uid) {
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
// This is the main function to build
// the adapters table from the ADAPTERS_SP array
// It requires the following items:
//
//   * global ADAPTERS_SP[] array filled
//   * table with id 'adapters'
//---------------------------------------------------------
function buildSPAdaptersTable(uid) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var tbl = document.getElementById('adapters' + uid);
  var port = document.getElementById('adapterPort' + uid).value;
  var j = 0;
  
  // set MN/SN display name values
  var MNDisplay = document.getElementById('MNDisplay' + uid).value;
  var SNDisplay = document.getElementById('SNDisplay' + uid).value;

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
  for (var i=0; i<DEEMBED_SP.ADAPTERS_SP.length; i++) {
    if (port == DEEMBED_SP.ADAPTERS_SP[i].port) {
      var row = tbl.insertRow(j + 1); // there's a header row
      var runNumber = DEEMBED_SP.ADAPTERS_SP[i].runType == "Run #"; // is the run set to number
      var match = DEEMBED_SP.ADAPTERS_SP[i].runType == "Match Field"; // is the run set to match field

      //---------------------------------------------------------
      //  Cell 0:  Number
      //    Row header showing the adapter number with
      //    a little different method here as it's a "th" element
      var cell0 = document.createElement('th');
      cell0.className = "rowheader";
      var el0 = document.createTextNode(parseInt(DEEMBED_SP.ADAPTERS_SP[i].name) + 1);
      cell0.title     = "Adapter to be de-embedded"
      cell0.appendChild(el0);
      row.appendChild(cell0);

      //---------------------------------------------------------
      //  Cell 1:  Delete Adapter (row)
      //    Holds an icon/link to delete the row
      var cell1 = row.insertCell(1);
      cell1.className = "icon";
      var el1   = document.createElement('img');
      if (!EDITDISABLED) {
        el1.src   = "/images/deletesmall.gif";
        el1.title = "Delete this adapter";
        el1.onclick = new Function ("removeSPAdapter('" + uid + "', " + DEEMBED_SP.ADAPTERS_SP[i].name + ");");
      } else {
        el1.src   = "/images/deletesmalldisabled.gif";
        el1.title = "Cannot edit sequence";
      }
      cell1.appendChild(el1);

      //---------------------------------------------------------
      //  Cell 2:  Adapter Reordering
      //    Holds a couple of images/links to handle
      //    reordering rows of the adapters table
      var cell2 = row.insertCell(2);
      cell2.className = "icon";

      //  Move up (toward top of list; index gets smaller)
      var el2aUp    = document.createElement('a');
      el2aUp.href   = "#nogo";
      var el2aUpImg = document.createElement('img');
      el2aUpImg.className = "movers";
      if (j==0 || EDITDISABLED) {    // disable UP on first element
        el2aUpImg.src     = "/images/upsmalldisabled.gif";
      } else {
        el2aUp.title   = "move up"
        el2aUp.onclick = new Function("this.blur(); moveSPAdapter('" + uid + "', -(" + i + "));");
        el2aUpImg.src  = "/images/upsmall.gif";
      }
      el2aUp.appendChild(el2aUpImg);

      //  Move down (toward bottom of list; index gets bigger)
      var el2aDwn    = document.createElement('a');
      el2aDwn.href   = "#nogo";
      var el2aDwnImg = document.createElement('img');
      el2aDwnImg.className = "movers";
      if (EDITDISABLED) {  // disable DOWN on last element
        el2aDwnImg.src     = "/images/downsmalldisabled.gif";
      } else {
        el2aDwn.title      = "move down"
        el2aDwn.onclick    = new Function ("this.blur(); moveSPAdapter('" + uid + "', " + i + ");");
        el2aDwnImg.src     = "/images/downsmall.gif";
      }
      el2aDwn.appendChild(el2aDwnImg);

      cell2.appendChild(el2aUp);
      cell2.appendChild(el2aDwn);

      //---------------------------------------------------------
      //  Cell 3:  Model Number
      //    Holds a text entry box to define the MN
      //    to be used for the adapter
      var cell3  = row.insertCell(3);
      cell3.className = "ni";

      var el3a   = document.createElement('input');
      el3a.type  = "text"
      el3a.id    = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterModel" + uid;
      el3a.name  = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterModel" + uid;
      el3a.value = DEEMBED_SP.ADAPTERS_SP[i].model;
      el3a.onblur = new Function ("saveSPChangedAdapterModel(" + uid + ", " + i + ");");
      el3a.className = "hidden";

      var el3b  = document.createElement('div');
      var el3c  = document.createTextNode((DEEMBED_SP.ADAPTERS_SP[i].model == "")? "[Empty]" : DEEMBED_SP.ADAPTERS_SP[i].model);
      el3b.id   = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterModelDisplay" + uid;
      el3b.appendChild(el3c);
      
      if (!EDITDISABLED) {
        cell3.title     = "Click to edit the " + MNDisplay;
        el3b.onclick   = new Function ("setSPAdapterModelNumber('" + uid + "', " + DEEMBED_SP.ADAPTERS_SP[i].name + ");");
      } else {
        cell3.className = "grayedout";
      }

      cell3.appendChild(el3a);
      cell3.appendChild(el3b);

      //---------------------------------------------------------
      //  Cell 4:  Serial Number
      //    Holds a text entry box to define the SN
      //    to be used for the adapter
      var cell4  = row.insertCell(4);
      cell4.className = "ni";

      var el4a   = document.createElement('input');
      el4a.type  = "text"
      el4a.className = "hidden";
      el4a.id    = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterSerial" + uid;
      el4a.name  = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterSerial" + uid;
      el4a.value = DEEMBED_SP.ADAPTERS_SP[i].serial;
      el4a.onblur = new Function ("saveSPChangedAdapterSerial(" + uid + ", " + i + ");");

      var el4b  = document.createElement('span');
      var el4c  = document.createTextNode((DEEMBED_SP.ADAPTERS_SP[i].serial == "")? "[Empty]" : DEEMBED_SP.ADAPTERS_SP[i].serial);
      el4b.id   = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterSerialDisplay" + uid;
      el4b.appendChild(el4c);
      
      if (!EDITDISABLED) {
        cell4.title     = "Click to edit the " + SNDisplay;
        el4b.onclick   = new Function ("setSPAdapterSerialNumber('" + uid + "', " + DEEMBED_SP.ADAPTERS_SP[i].name + ");");
      } else {
        cell4.className = "grayedout";
      }

      cell4.appendChild(el4a);
      cell4.appendChild(el4b);
      
      //---------------------------------------------------------
      //  Cell 5:  Run Type
      //    Holds a selection box to select
      //    the run type for the adapter
      var cell5      = row.insertCell(5);
      cell5.className = "ni";

      var el5a       = document.createElement('input');
      el5a.type      = "text";
      el5a.id        = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunType" + uid;
      el5a.name      = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunType" + uid;
      el5a.value     = DEEMBED_SP.ADAPTERS_SP[i].runType;
      el5a.className = "hidden";

      var el5b       = document.createElement('div');
      el5b.id        = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunTypeDisplay" + uid;
      el5b.className = "";

      var el5c       = document.createTextNode((DEEMBED_SP.ADAPTERS_SP[i].runType == "")? "[Select]" : DEEMBED_SP.ADAPTERS_SP[i].runType);
      el5b.appendChild(el5c);

      if (!EDITDISABLED) {
        cell5.title    = "Click to change the Run Type";
        el5b.onclick   = new Function ("changeSPAdapterRunType('" + uid + "', " + i + ");");
      } else {
        cell5.className = "grayedout";
      }

      cell5.appendChild(el5a);
      cell5.appendChild(el5b);

      //---------------------------------------------------------
      //  Cell 6:  Run Number
      //    integer value to tell which run number to use for
      //    the adapter
      var cell6       = row.insertCell(6);

      var el6a       = document.createElement('input');
      el6a.type      = "text";
      el6a.id        = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRun" + uid;
      el6a.name      = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRun" + uid;
      el6a.value     = DEEMBED_SP.ADAPTERS_SP[i].run;
      el6a.title     = "Change the Run Number";
      el6a.onblur    = new Function ("armSPSaveAdapterRun('" + uid + "', " + i + ")");  // handle saving changes
      // this allows the user to press "ENTER" to confrim an entry
      if ($.browser.msie) {
        el6a.onkeydown = new Function ("captureReturn(this, window.event)");
      } else {
        el6a.setAttribute("onkeydown", "captureReturn(this, event);");
      }
      el6a.className = "hidden";

      cell6.className = "ctl";
      cell6.appendChild(el6a);

      // create and show numeric Increase/Decrease buttons
      var el6Ctl     = document.createElement('span');
      el6Ctl.id      = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunControl" + uid;
      el6Ctl.name    = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunControl" + uid;
      el6Ctl.className = "hidden";

      // numeric Increase
      var el6Up      = document.createElement('a');
      el6Up.href     = "#nogo";
      var el6UpImg   = document.createElement('img');
      el6Up.title    = "Increase";
      el6Up.onclick  = new Function("editSPAdapterRun('" + uid + "', " + i + ", 1);");
      el6UpImg.src   = "/images/scrollup.gif";
      el6Up.appendChild(el6UpImg);

      // numeric Decrease
      var el6Dwn     = document.createElement('a');
      el6Dwn.href    = "#nogo";
      var el6DwnImg  = document.createElement('img');
      el6Dwn.title   = "Decrease";
      el6Dwn.onclick = new Function ("editSPAdapterRun('" + uid + "', " + i + ", -1);");
      el6DwnImg.src  = "/images/scrolldown.gif";
      el6DwnImg.id   = "down";
      el6Dwn.appendChild(el6DwnImg);

      el6Ctl.appendChild(el6Up);
      el6Ctl.appendChild(el6Dwn);
      cell6.appendChild(el6Ctl);
      
      var el6b     = document.createElement('div');
      el6b.id      = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunDisplay" + uid;
      el6b.name    = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunDisplay" + uid;
      var el6c     = document.createTextNode((DEEMBED_SP.ADAPTERS_SP[i].run == "")? "1" : DEEMBED_SP.ADAPTERS_SP[i].run);
      el6b.appendChild(el6c);
      cell6.appendChild(el6b);

      if (runNumber && !EDITDISABLED) {
        cell6.title     = "Click to change the Run Number";
        el6b.onclick = new Function ("editSPAdapterRun('" + uid + "', " + i + ", 0);");
      } else {
        cell6.className = "grayedout";
      }

      //---------------------------------------------------------
      //  Cell 7:  Field
      //    Holds a selection box to select
      //    the field to match for the adapter
      var cell7      = row.insertCell(7);
      cell7.className = "w24";

      var el7a       = document.createElement('input');
      el7a.type      = "text";
      el7a.id        = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterField" + uid;
      el7a.name      = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterField" + uid;
      if (DEEMBED_SP.ADAPTERS_SP[i].field != "") {
        el7a.value   = DEEMBED_SP.ADAPTERS_SP[i].field;
      } else {
        el7a.value   = DEEMBED_SP.ADAPTERS_SP[i].name;
      }
      el7a.className = "hidden";

      var el7b       = document.createElement('div');
      el7b.id        = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterFieldDisplay" + uid;
      el7b.className = "";

      var el7c       = document.createTextNode((DEEMBED_SP.ADAPTERS_SP[i].field == "")? "[Select]" : DEEMBED_SP.ADAPTERS_SP[i].field);
      el7b.appendChild(el7c);

      if (match && !EDITDISABLED) {
        cell7.title    = "Click to change the Field";
        el7b.onclick   = new Function ("changeSPAdapterField('" + uid + "', " + i + ");");
      } else {
        cell7.className = "grayedout";
      }

      cell7.appendChild(el7a);
      cell7.appendChild(el7b);

      //---------------------------------------------------------
      //  Cell 8:  Field Value
      //    Holds a text entry box to define the field value
      //    to be used for the adapter
      var cell8  = row.insertCell(8);

      var el8a   = document.createElement('input');
      el8a.type  = "text"
      el8a.className = "hidden";
      el8a.id    = DEEMBED_SP.ADAPTERS_SP[i].number + "adapterFieldValue" + uid;
      el8a.name  = DEEMBED_SP.ADAPTERS_SP[i].number + "adapterFieldValue" + uid;
      el8a.value = DEEMBED_SP.ADAPTERS_SP[i].fieldValue;
      el8a.onblur = new Function ("saveSPChangedFieldValue('" + uid + "', " + i + ");");

      var el8b  = document.createElement('span');
      var el8c  = document.createTextNode((DEEMBED_SP.ADAPTERS_SP[i].fieldValue == "")? "[Empty]" : DEEMBED_SP.ADAPTERS_SP[i].fieldValue);
      el8b.id   = DEEMBED_SP.ADAPTERS_SP[i].name + "adapterFieldValueDisplay" + uid;
      el8b.appendChild(el8c);

      if (match && !EDITDISABLED) {
        cell8.title     = "Click to edit the Field Value";
        el8b.onclick   = new Function ("setSPAdapterFieldValue('" + uid + "', " + i + ");");
      } else {
        cell8.className = "grayedout";
      }

      cell8.appendChild(el8a);
      cell8.appendChild(el8b);

      j++;
    }
  }
  
  if (tbl.rows.length > 1) {
    // disable DOWN on last element
    el2aDwn.title      = "";
    el2aDwn.onclick    = null;
    el2aDwnImg.src     = "/images/downsmalldisabled.gif";
  }

  // everything's added - paint the table styles
  setSPTableRows(uid, 'adapters');
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the adapters
// table
//---------------------------------------------------------

//---------------------------------------------------------
//  Adapter Table Cell 1:  Remove Adapter (row)
//---------------------------------------------------------
function removeSPAdapter(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  // Re-order adapters on the port
  for (var j=i+1; j<DEEMBED_SP.ADAPTERS_SP.length; j++) {
    if (DEEMBED_SP.ADAPTERS_SP[j].port == DEEMBED_SP.ADAPTERS_SP[i].port) {
      DEEMBED_SP.ADAPTERS_SP[j].order = DEEMBED_SP.ADAPTERS_SP[j].order - 1;
    }
    DEEMBED_SP.ADAPTERS_SP[j].name = DEEMBED_SP.ADAPTERS_SP[j].name - 1;
  }
  DEEMBED_SP.ADAPTERS_SP.splice(i, 1);
  makeChanges();
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
//  Adapter Table Cell 2:  Reorder Adapters
//---------------------------------------------------------
function moveSPAdapter(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var dir=1;
  if (i<0) {
    dir = -1;
    i   = -i;
  }
  var port = DEEMBED_SP.ADAPTERS_SP[i].port;
  var order = DEEMBED_SP.ADAPTERS_SP[i].order + dir;

  // Find adapter to swap places with
  for (var j=0; j<DEEMBED_SP.ADAPTERS_SP.length; j++) {
    if (DEEMBED_SP.ADAPTERS_SP[j].port == port && DEEMBED_SP.ADAPTERS_SP[j].order == order) {
      var temp = new copySPAdapter(DEEMBED_SP.ADAPTERS_SP[j]); // save point above (or below)
      var temp2 = new copySPAdapter(DEEMBED_SP.ADAPTERS_SP[i]); // save point
      DEEMBED_SP.ADAPTERS_SP[j] = null;
      DEEMBED_SP.ADAPTERS_SP[j] = new copySPAdapter(DEEMBED_SP.ADAPTERS_SP[i]); // replace index with next (or prev)
      DEEMBED_SP.ADAPTERS_SP[j].order = temp.order;
      DEEMBED_SP.ADAPTERS_SP[j].name = temp.name;
      DEEMBED_SP.ADAPTERS_SP[i] = null;
      DEEMBED_SP.ADAPTERS_SP[i] = new copySPAdapter(temp); // move temp back
      DEEMBED_SP.ADAPTERS_SP[i].order = temp2.order;
      DEEMBED_SP.ADAPTERS_SP[i].name = temp2.name;
      temp = null;
      temp2 = null;
      break;
    }
  }

  makeChanges();
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
//  Adapter Table Cell 3:  Change Adapter Model Number
//---------------------------------------------------------
function setSPAdapterModelNumber(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var mname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var dtext = document.getElementById(mname + "adapterModelDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = mname + "_text" + uid;
  t.value = DEEMBED_SP.ADAPTERS_SP[i].model;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveSPChangedAdapterModel('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedAdapterModel(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var mname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var t     = document.getElementById(mname + "_text" + uid);
  var j     = t.value; // get the model number text

  // don't make changes if they didn't select a new model number
  if (j != DEEMBED_SP.ADAPTERS_SP[i].model) {
    DEEMBED_SP.ADAPTERS_SP[i].model = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
//  Adapter Table Cell 4:  Change Adapter Serial Number
//---------------------------------------------------------
function setSPAdapterSerialNumber(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var mname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var dtext = document.getElementById(mname + "adapterSerialDisplay" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = mname + "_text" + uid;
  t.value = DEEMBED_SP.ADAPTERS_SP[i].serial;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveSPChangedAdapterSerial('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedAdapterSerial(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var mname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var t     = document.getElementById(mname + "_text" + uid);
  var j     = t.value; // get the serial number text

  // don't make changes if they didn't select a new serial number
  if (j != DEEMBED_SP.ADAPTERS_SP[i].serial) {
    DEEMBED_SP.ADAPTERS_SP[i].serial = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 5:  Change Adapter Run Type
//---------------------------------------------------------
function changeSPAdapterRunType(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);

  var lname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var dtext = document.getElementById(lname + "adapterRunTypeDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all run types
  var A = [];
  getRunTypes(A);

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "adapterSelect" + uid;
  addStringOptions(s, A, A);

  // search array for index of run type
  var index = A.indexOf(DEEMBED_SP.ADAPTERS_SP[i].runType);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedAdapterRunType('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedAdapterRunType('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedAdapterRunType(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var lname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var s     = document.getElementById(lname + "adapterSelect" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the run type text
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new run type
  if (j != DEEMBED_SP.ADAPTERS_SP[i].runType) {
    DEEMBED_SP.ADAPTERS_SP[i].runType = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 6:  Run Number
//---------------------------------------------------------
// the global and armSPSaveAdapterRun() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPAdapterRun() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Run table cell -> editSPAdapterRun(i) runs
//   2a) User clicks off now visible control -> armSPSaveAdapterRun()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveAdapterRun() function will be cleared by the newest
//       editSPAdapterRun() call.
var RUNTIMER = 0;
function armSPSaveAdapterRun(uid, i) {
  RUNTIMER = setTimeout("saveSPAdapterRun('" + uid + "', " + i + ")", 250);
}
function editSPAdapterRun(uid, i, scroll) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  // clear pending changes since
  // we're making more
  clearTimeout(RUNTIMER);

  var s = document.getElementById(DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRun" + uid);

  s.value = parseInt(s.value) + scroll;
  (s.value < 1) ? s.value = "1" : s.value += '';

  document.getElementById(DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunDisplay" + uid).className = "hidden";
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  document.getElementById(DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRunControl" + uid).className = "";
}

function saveSPAdapterRun(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var s = document.getElementById(DEEMBED_SP.ADAPTERS_SP[i].name + "adapterRun" + uid);

  // validate new entry to positive integer and replace with previous if errors
  if (!isInteger(s.value) || s.value < 1) s.value = DEEMBED_SP.ADAPTERS_SP[i].run;

  if (s.value != DEEMBED_SP.ADAPTERS_SP[i].run) {
    DEEMBED_SP.ADAPTERS_SP[i].run = s.value;  // update changes to ADAPTERS_SP array
    makeChanges();
  }

  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 7:  Change Field
//---------------------------------------------------------
function changeSPAdapterField(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);

  var lname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var dtext = document.getElementById(lname + "adapterFieldDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "adapterSelect" + uid;
  addStringOptions(s, DEEMBED_SP.fields, DEEMBED_SP.fields);
  
  // search array for index of run type
  var index = DEEMBED_SP.fields.indexOf(DEEMBED_SP.ADAPTERS_SP[i].field);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedAdapterField('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedAdapterField('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedAdapterField(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var lname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var s     = document.getElementById(lname + "adapterSelect" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the field
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new run type
  if (j != DEEMBED_SP.ADAPTERS_SP[i].field) {
    DEEMBED_SP.ADAPTERS_SP[i].field = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 8:  Change Field Value
//---------------------------------------------------------
function setSPAdapterFieldValue(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);

  var lname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var dtext = document.getElementById(lname + "adapterFieldValueDisplay" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = lname + "adapterText" + uid;
  t.value = DEEMBED_SP.ADAPTERS_SP[i].fieldValue;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveSPChangedAdapterFieldValue('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedAdapterFieldValue(uid, i) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var lname = DEEMBED_SP.ADAPTERS_SP[i].name;
  var t     = document.getElementById(lname + "adapterText" + uid);
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new field value
  if (j != DEEMBED_SP.ADAPTERS_SP[i].fieldValue) {
    DEEMBED_SP.ADAPTERS_SP[i].fieldValue = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
//  Add new ADAPTER_SP to the table
//---------------------------------------------------------
function addSPAdapter(uid) {
  if (EDITDISABLED) return;
  toggleVisible('add_adapter' + uid);
  toggleVisible('aAddSPAdapter' + uid);

  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var s1 = document.getElementById('add_adapter_model' + uid);
  var s2 = document.getElementById('add_adapter_serial' + uid);

  s1.value = "";  // clear previous
  s1.disabled = false;    // enable text entry
  s1.focus();

  s2.value = "";  // clear previous
  s2.disabled = false;    // enable text entry
}

function saveSPAddedAdapter(uid) {
  var DEEMBED_SP = getSPDeEmbedObject(uid);
  var model = document.getElementById('add_adapter_model' + uid).value;
  var serial = document.getElementById('add_adapter_serial' + uid).value;
  var port = document.getElementById('adapterPort' + uid).value;
  var order = document.getElementById('adapters' + uid).rows.length - 1; // There is a header row
  
  toggleVisible('add_adapter' + uid);
  toggleVisible('aAddSPAdapter' + uid);

  DEEMBED_SP.ADAPTERS_SP[DEEMBED_SP.ADAPTERS_SP.length] = new ADAPTER_SP(DEEMBED_SP.ADAPTERS_SP.length, port, order, model, serial, "Most Recent", "1", "", "");

  makeChanges();
  buildSPAdaptersTable(uid);
}

//---------------------------------------------------------
// DEEMBED_SP UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the DEEMBED_SP object with the unique id
//---------------------------------------------------------
function getSPDeEmbedObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('DEEMBED_SP' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('deEmbedSetup' + uid).value);
  }
  return (eval('DEEMBED_SP' + uid));
}

//---------------------------------------------------------
// returns a copy of a ADAPTERS_SP object
//---------------------------------------------------------
function copySPAdapter(f) {
  for (i in f) this[i] = f[i];
}

//---------------------------------------------------------------FILTER_SP OBJECT------------------------------------------------------------------------
//---------------------------------------------------------
//   Defines and handles the FILTER_SP object.  This
//   is manipulated in the edit S Parameter.htm
//   template page using the edittest.vit CGI.
//---------------------------------------------------------
function FILTER_SP(activeFilterLimit, FILTERLIMITS_SP) {
  this.activeFilterLimit = activeFilterLimit;
  this.FILTERLIMITS_SP = FILTERLIMITS_SP;
}

//---------------------------------------------------------
// The FILTERLIMIT_SP object is the basis for
// all filter limits in the measurement.
//---------------------------------------------------------
function FILTERLIMIT_SP(limitNumber, parameter, format, type, passbandLimit, SCFreq, SSFreq, units, freqFormat, attenuation, rippleLimit, rippleWindow, rippleValue, rippleWindowValue, rippleUnits, activeAttenuationPoint, ATTENUATIONS_SP, activeSkirtPoint, SKIRTS_SP) {
  this.limitNumber = limitNumber
  this.parameter = parameter;
  this.format = format;
  this.type = type;
  this.passbandLimit = passbandLimit;
  this.SCFreq = SCFreq;
  this.SSFreq = SSFreq;
  this.units = units;
  this.freqFormat = freqFormat;
  this.attenuation = attenuation;
  this.rippleLimit = rippleLimit;
  this.rippleWindow = rippleWindow;
  this.rippleValue = rippleValue;
  this.rippleWindowValue = rippleWindowValue;
  this.rippleUnits = rippleUnits;
  this.activeAttenuationPoint = activeAttenuationPoint
  this.ATTENUATIONS_SP = ATTENUATIONS_SP;
  this.activeSkirtPoint = activeSkirtPoint
  this.SKIRTS_SP = SKIRTS_SP;
}

//---------------------------------------------------------
// The ATTENUATION_SP object is the basis for
// all attenuation points in the measurement.
//---------------------------------------------------------
function ATTENUATION_SP(name, attenuation, type, lower, upper, units) {
  this.name = name;
  this.attenuation = attenuation;
  this.type = type;
  this.lower = lower;
  this.upper = upper;
  this.units = units;
}

//---------------------------------------------------------
// The SKIRT_SP object is the basis for
// all skirt rejection points in the measurement.
//---------------------------------------------------------
function SKIRT_SP(name, relative, connect, frequency, units, attenuation, relLoss, relLossFreq) {
  this.name = name;
  this.relative = relative;
  this.connect = connect;
  this.frequency = frequency;
  this.units = units;
  this.attenuation = attenuation;
  this.relLoss = relLoss;
  this.relLossFreq = relLossFreq;
}

//---------------------------------------------------------
// This is the main save routine to save the
// FILTER_SP object to the DB.
// It requires the following items:
//
//   * global FILTER_SP object filled
//---------------------------------------------------------
function saveSPFilterObject(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  var filterKeys = "";

  for (var i=0; i<FILTER_SP.FILTERLIMITS_SP.length; i++) {
    filterKeys = filterKeys + "filterLimitNumber" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].limitNumber + "&";
    filterKeys = filterKeys + "filterParameter" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].parameter + "&";
    filterKeys = filterKeys + "filterFormat" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].format + "&";
    filterKeys = filterKeys + "filterType" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].type + "&";
    // coerce freqFormat to Start/Stop if it is a Lowpass or Highpass filter
    if (FILTER_SP.FILTERLIMITS_SP[i].type == "Lowpass" || FILTER_SP.FILTERLIMITS_SP[i].type == "Highpass") {
      FILTER_SP.FILTERLIMITS_SP[i].freqFormat = "Start/Stop";
    }
    if (FILTER_SP.FILTERLIMITS_SP[i].passbandLimit) {
      filterKeys = filterKeys + "filterPassbandLimit" + i + "=true&";
    }
    filterKeys = filterKeys + "filterSCFreq" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].SCFreq + "&";
    filterKeys = filterKeys + "filterSSFreq" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].SSFreq + "&";
    filterKeys = filterKeys + "filterUnits" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].units + "&";
    filterKeys = filterKeys + "filterFreqFormat" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].freqFormat + "&";
    filterKeys = filterKeys + "filterAttenuation" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].attenuation + "&";
    if (FILTER_SP.FILTERLIMITS_SP[i].rippleLimit) {
      filterKeys = filterKeys + "filterRippleLimit" + i + "=true&";
    }
    if (FILTER_SP.FILTERLIMITS_SP[i].rippleWindow) {
      filterKeys = filterKeys + "filterRippleWindow" + i + "=true&";
    }
    filterKeys = filterKeys + "filterRippleValue" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].rippleValue + "&";
    filterKeys = filterKeys + "filterRippleWindowValue" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].rippleWindowValue + "&";
    filterKeys = filterKeys + "filterRippleUnits" + i + "=" + FILTER_SP.FILTERLIMITS_SP[i].rippleUnits;
    if (i != FILTER_SP.FILTERLIMITS_SP.length - 1 || FILTER_SP.FILTERLIMITS_SP[i].ATTENUATIONS_SP.length != 0 || FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP.length != 0) {
      filterKeys = filterKeys + "&";
    }
    for (var j=0; j<FILTER_SP.FILTERLIMITS_SP[i].ATTENUATIONS_SP.length; j++) {
      filterKeys = filterKeys + "attenuation" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].ATTENUATIONS_SP[j].attenuation + "&";
      filterKeys = filterKeys + "attenuationType" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].ATTENUATIONS_SP[j].type + "&";
      filterKeys = filterKeys + "attenuationLower" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].ATTENUATIONS_SP[j].lower + "&";
      filterKeys = filterKeys + "attenuationUpper" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].ATTENUATIONS_SP[j].upper + "&";
      filterKeys = filterKeys + "attenuationUnits" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].ATTENUATIONS_SP[j].units;
      if (i != FILTER_SP.FILTERLIMITS_SP[i].ATTENUATIONS_SP.length - 1 || FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP.length != 0) {
        filterKeys = filterKeys + "&";
      }
    }
    for (var j=0; j<FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP.length; j++) {
      if (FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP[j].relative) {
        filterKeys = filterKeys + "skirtRelative" + i + j + "=true&";
      }
      if (FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP[j].connect) {
        filterKeys = filterKeys + "skirtConnect" + i + j + "=true&";
      }
      filterKeys = filterKeys + "skirtFreq" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP[j].frequency + "&";
      filterKeys = filterKeys + "skirtUnits" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP[j].units + "&";
      filterKeys = filterKeys + "skirtAttenuation" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP[j].attenuation + "&";
      filterKeys = filterKeys + "skirtRelLoss" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP[j].relLoss + "&";
      filterKeys = filterKeys + "skirtRelLossFreq" + i + j + "=" + FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP[j].relLossFreq;
      if (i != FILTER_SP.FILTERLIMITS_SP[i].SKIRTS_SP.length - 1) {
        filterKeys = filterKeys + "&";
      }
    }
  }

  return filterKeys
}

//---------------------------------------------------------
// This is the main function to set
// the measurement parameters from the FILTER_SP object.
// It requires the following items:
//
//   * global FILTER_SP object filled
//   * control with id 'filterType'
//   * control with id 'filterSCFreq'
//   * control with id 'filterSSFreq'
//   * control with id 'filterUnits'
//   * control with id 'filterFreqFormat'
//---------------------------------------------------------
function setSPFilterControls(uid) {
  var FILTER_SP = getSPFilterObject(uid);

  if (FILTER_SP.activeFilterLimit >= 0) {
    var disable = true;
    var lowDisable = true;
    var highDisable = true;
    var limitNamesList = getSPFilterLimitNames(uid);
    addStringOptions(document.getElementById('filterLimit' + uid), limitNamesList, limitNamesList);
    var limit = document.getElementById('filterLimit' + uid).options;

    // enable all of the controls if limits defined
    $('#filterLimit' + uid).attr('disabled', false);
    $('#filterType' + uid).attr('disabled', false);
    $('#filterPassbandLimit' + uid).attr('disabled', false);
    $('#filterSCFreq' + uid).attr('disabled', false);
    $('#filterSSFreq' + uid).attr('disabled', false);
    $('#filterUnits' + uid).attr('disabled', false);
    $('#filterFreqFormat' + uid).attr('disabled', false);
    $('#filterAttenuation' + uid).attr('disabled', false);
    $('#filterRippleLimit' + uid).attr('disabled', false);
    $('#filterRippleWindow' + uid).attr('disabled', false);
    $('#filterRippleValue' + uid).attr('disabled', false);
    $('#filterRippleWindowValue' + uid).attr('disabled', false);
    $('#filterRippleUnits' + uid).attr('disabled', false);

    // set label for appropriate format
    var rippleLimitLabel = document.getElementById('filterRippleLimitLabel' + uid);
    var rippleLimitLabelParent = rippleLimitLabel.parentNode;
    var rippleLimitLabelNew = document.createElement('label');
    rippleLimitLabelNew.id = 'filterRippleLimitLabel' + uid;
    var rippleValueLabel = document.getElementById('filterRippleValueLabel' + uid);
    var rippleValueLabelParent = rippleValueLabel.parentNode;
    var rippleValueLabelNew = document.createElement('label');
    rippleValueLabelNew.id = 'filterRippleValueLabel' + uid;
    var format = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].format;
     if (format == "Lin Mag") {
      rippleLimitLabelNew.innerHTML = rippleLimitLabel.innerHTML.replace("Phase Linearity", "Passband Ripple");
      rippleValueLabelNew.innerHTML = "Passband Ripple (U):";
    } else if (format == "SWR") {
      rippleLimitLabelNew.innerHTML = rippleLimitLabel.innerHTML.replace("Phase Linearity", "Passband Ripple");
      rippleValueLabelNew.innerHTML = "Passband Ripple:";
    } else if (format == "Phase" || format == "Expanded Phase") {
      rippleLimitLabelNew.innerHTML = rippleLimitLabel.innerHTML.replace("Passband Ripple", "Phase Linearity");
      rippleValueLabelNew.innerHTML = "Phase Linearity (&deg):";
    } else if (format == "Delay") {
      rippleLimitLabelNew.innerHTML = rippleLimitLabel.innerHTML.replace("Phase Linearity", "Passband Ripple");
      rippleValueLabelNew.innerHTML = "Passband Ripple (s):";
    } else {
      rippleLimitLabelNew.innerHTML = rippleLimitLabel.innerHTML.replace("Phase Linearity", "Passband Ripple");
      rippleValueLabelNew.innerHTML = "Passband Ripple (dB):";
    }
    rippleLimitLabelParent.replaceChild(rippleLimitLabelNew, rippleLimitLabel);
    rippleValueLabelParent.replaceChild(rippleValueLabelNew, rippleValueLabel);
    
    $('#imgAttenuationLimit' + uid).attr('src', '/images/' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type + 'FilterBase.gif');
    $('#filterLimit' + uid).val('Limit ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].limitNumber + ' (' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].parameter + ' - ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].format + ')');
    $('#filterType' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type);
    if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Bandpass" || FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Bandstop") {
      disable = false;
    } else if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Lowpass") {
      lowDisable = false;
    } else if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Highpass") {
      highDisable = false;
    }
    var passbandLabel = document.getElementById('filterPassbandLimitLabel' + uid).innerHTML;
    var newPassbandLabel = passbandLabel.substring(0, passbandLabel.search('Bandwidth Limit'));
    if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].freqFormat == "Start/Stop") {
      $('#filterPassbandLimitLabel' + uid).html(newPassbandLabel.concat('Bandwidth Limit (' + (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq - FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')'));
    } else {
      $('#filterPassbandLimitLabel' + uid).html(newPassbandLabel.concat('Bandwidth Limit (' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')'));
    }
    // This must come after the label adjustment.
    $('#filterPassbandLimit' + uid).attr('checked', FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].passbandLimit);
    $('#filterSCFreq' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq);
    $('#filterSCFreq' + uid).attr('disabled', highDisable && disable);
    $('#filterSSFreq' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq);
    $('#filterSSFreq' + uid).attr('disabled', lowDisable && disable);
    $('#filterUnits' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units);
    $('#filterFreqFormat' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].freqFormat);
    $('#filterFreqFormat' + uid).attr('disabled', disable);
    $('#filterAttenuation' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].attenuation);
    $('#filterAttenuation' + uid).attr('disabled', disable);
    $('#filterRippleLimit' + uid).attr('checked', FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit);
    $('#filterRippleWindow' + uid).attr('checked', FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindow);
    $('#filterRippleWindow' + uid).attr('disabled', !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit);
    $('#filterRippleValue' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleValue);
    $('#filterRippleValue' + uid).attr('disabled', !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit);
    $('#filterRippleWindowValue' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindowValue);
    $('#filterRippleWindowValue' + uid).attr('disabled', (!FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindow || !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit));
    $('#filterRippleUnits' + uid).val(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleUnits);
    $('#filterRippleUnits' + uid).attr('disabled', (!FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindow || !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit));

    // set titles to match selection.
    if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].freqFormat == "Start/Stop") {
      $('#filterSCFreq' + uid).attr('title', 'Enter the start frequency of the passband.');
      $('#filterSSFreq' + uid).attr('title', 'Enter the stop frequency of the passband.');
    } else {
      $('#filterSCFreq' + uid).attr('title', 'Enter the center frequency of the passband.');
      $('#filterSSFreq' + uid).attr('title', 'Enter the frequency span of the passband.');
    }

    // enable table controls
    var A = ["_addSPAttenuation", "_addSPAttenuationCopy", "_addSPSkirt", "_addSPSkirtCopy"];
    var B = ["Add another attenuation point", "Add a copy of the selected attenuation point", "Add another skirt rejection point", "Add a copy of the selected skirt rejection point"];
    
    for (var i=0; i<=A.length; i++) {
      $('#' + A[i] + uid).attr("className", "adder")
                         .attr("title", B[i]);
    }

    buildSPAttenuationPointsTable(uid);
    buildSPSkirtPointsTable(uid);
  }

  // Disabled all controls if EDITDISABLED
  if (EDITDISABLED || FILTER_SP.activeFilterLimit < 0) {
    $('#filterLimit' + uid).attr('disabled', true);
    $('#filterType' + uid).attr('disabled', true);
    $('#filterPassbandLimit' + uid).attr('disabled', true);
    $('#filterSCFreq' + uid).attr('disabled', true);
    $('#filterSSFreq' + uid).attr('disabled', true);
    $('#filterUnits' + uid).attr('disabled', true);
    $('#filterFreqFormat' + uid).attr('disabled', true);
    $('#filterAttenuation' + uid).attr('disabled', true);
    $('#filterRippleLimit' + uid).attr('disabled', true);
    $('#filterRippleWindow' + uid).attr('disabled', true);
    $('#filterRippleValue' + uid).attr('disabled', true);
    $('#filterRippleWindowValue' + uid).attr('disabled', true);
    $('#filterRippleUnits' + uid).attr('disabled', true);

    var title = "Must add Filter Limit on Limits Tab";
    if (EDITDISABLED) {
      title = "Cannot change sequence";
    }
    
    var A = ["_addSPAttenuation", "_addSPAttenuationCopy", "_addSPSkirt", "_addSPSkirtCopy"];
    
    for (var i=0; i<=A.length; i++) {
      $('#' + A[i] + uid).attr("className", "adder_grayedout")
                         .attr("title", title);
    }
  }
}

//---------------------------------------------------------
//  Filter:  Filter Parameter
//---------------------------------------------------------
function saveSPFilterParameter(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].parameter = $('#filterParameter' + uid).val();
  makeChanges();
}

//---------------------------------------------------------
//  Filter:  Filter Type
//---------------------------------------------------------
function saveSPFilterType(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type = $('#filterType' + uid).val();
  // Enable/disable appropriate controls
  var disable = true;
  var lowDisable = true;
  var highDisable = true;
  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Bandpass" || FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Bandstop") {
    disable = false;
  } else if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Lowpass") {
    lowDisable = false;
  } else if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Highpass") {
    highDisable = false;
  }
  $('#filterSCFreq' + uid).attr('disabled', highDisable && disable);
  $('#filterSSFreq' + uid).attr('disabled', lowDisable && disable);
  $('#filterFreqFormat' + uid).attr('disabled', disable);
  $('#filterAttenuation' + uid).attr('disabled', disable);
  makeChanges();
  buildSPAttenuationPointsTable(uid);
}

//---------------------------------------------------------
//  Filter:  Filter Passband Limit
//---------------------------------------------------------
function saveSPFilterPassbandLimit(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].passbandLimit = $('#filterPassbandLimit' + uid).attr('checked');

  makeChanges();
}

//---------------------------------------------------------
//  Filter:  Filter Frequency Format
//---------------------------------------------------------
function saveSPFilterFreqFormat(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].freqFormat = $('#filterFreqFormat' + uid).val();

  // Set titles to match selection.
  var label = $('#filterPassbandLimitLabel' + uid).html();
  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].freqFormat == "Start/Stop") {
    $('#filterSCFreq' + uid).attr('title', 'Enter the start frequency of the passband.');
    $('#filterSSFreq' + uid).attr('title', 'Enter the stop frequency of the passband.');
    label = label.replace('(' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')', '(' + (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq - FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')');
  } else {
    $('#filterSCFreq' + uid).attr('title', 'Enter the center frequency of the passband.');
    $('#filterSSFreq' + uid).attr('title', 'Enter the frequency span of the passband.');
    label = label.replace('(' + (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq - FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')', '(' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')');
  }
  $('#filterPassbandLimitLabel' + uid).html(label);

  makeChanges();
  buildSPAttenuationPointsTable(uid);
}

//---------------------------------------------------------
//  Filter:  Filter Start/Center Frequency
//---------------------------------------------------------
function saveSPFilterSCFreq(uid) {
  var FILTER_SP = getSPFilterObject(uid);

  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].freqFormat == "Start/Stop") {
    var label = $('#filterPassbandLimitLabel' + uid).html();
    label = label.replace('(' + (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq - FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')', '(' + (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq - $('#filterSCFreq' + uid).val()) + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')');
    $('#filterPassbandLimitLabel' + uid).html(label);
  }

  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq = $('#filterSCFreq' + uid).val();
  makeChanges();
  buildSPAttenuationPointsTable(uid);
}

//---------------------------------------------------------
//  Filter:  Filter Stop/Span Frequency
//---------------------------------------------------------
function saveSPFilterSSFreq(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  
  var label = $('#filterPassbandLimitLabel' + uid).html();
  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].freqFormat == "Start/Stop") {
    label = label.replace('(' + (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq - FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')', '(' + ($('#filterSSFreq' + uid).val() - FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')');
  } else {
    label = label.replace('(' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')', '(' + $('#filterSSFreq' + uid).val() + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')');
  }
  $('#filterPassbandLimitLabel' + uid).html(label);

  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq = $('#filterSSFreq' + uid).val();
  makeChanges();
  buildSPAttenuationPointsTable(uid);
}

//---------------------------------------------------------
//  Filter:  Filter Frequency Units
//---------------------------------------------------------
function saveSPFilterUnits(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  
  var label = $('#filterPassbandLimitLabel' + uid).html();
  label = label.replace('(' + (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq - FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ')', '(' + (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq - FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + ' ' + $('#filterUnits' + uid).val() + ')');
  $('#filterPassbandLimitLabel' + uid).html(label);

  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units = $('#filterUnits' + uid).val();
  makeChanges();
  buildSPAttenuationPointsTable(uid);
}

//---------------------------------------------------------
//  Filter:  Filter Bandwidth Attenuation
//---------------------------------------------------------
function saveSPFilterBandwidthAttenuation(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].attenuation = $('#filterAttenuation' + uid).val();
  makeChanges();
  buildSPAttenuationPointsTable(uid);
}

//---------------------------------------------------------
//  Filter:  Filter Ripple Limit
//---------------------------------------------------------
function saveSPFilterRippleLimit(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit = $('#filterRippleLimit' + uid).attr('checked');

  // Disable appropriate controls
  $('#filterRippleWindow' + uid).attr('disabled', !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit);
  $('#filterRippleValue' + uid).attr('disabled', !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit);
  $('#filterRippleWindowValue' + uid).attr('disabled', (!FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindow || !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit));
  $('#filterRippleUnits' + uid).attr('disabled', (!FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindow || !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit));
  makeChanges();
}

//---------------------------------------------------------
//  Filter:  Filter Ripple Window
//---------------------------------------------------------
function saveSPFilterRippleWindow(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindow = $('#filterRippleWindow' + uid).attr('checked');

  // Disable appropriate controls
  $('#filterRippleWindowValue' + uid).attr('disabled', (!FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindow || !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit));
  $('#filterRippleUnits' + uid).attr('disabled', (!FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindow || !FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleLimit));
  makeChanges();
}

//---------------------------------------------------------
//  Filter:  Filter Ripple Value
//---------------------------------------------------------
function saveSPFilterRippleValue(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleValue = $('#filterRippleValue' + uid).val();
  makeChanges();
}

//---------------------------------------------------------
//  Filter:  Filter Ripple Window Value
//---------------------------------------------------------
function saveSPFilterRippleWindowValue(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleWindowValue = $('#filterRippleWindowValue' + uid).val();
  makeChanges();
}

//---------------------------------------------------------
//  Filter:  Filter Ripple Frequency Units
//---------------------------------------------------------
function saveSPFilterRippleUnits(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].rippleUnits = $('#filterRippleUnits' + uid).val();
  makeChanges();
}

//---------------------------------------------------------
// This is the main function to build the attenuation
// points table from the ATTENUATIONS_SP array
// It requires the following items:
//
//   * global ATTENUATIONS_SP[] array filled
//   * table with id 'attenuations'
//---------------------------------------------------------
function buildSPAttenuationPointsTable(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  var tbl = document.getElementById('attenuations' + uid);
  var j = 0;

  // first, clear existing table.  The try/catch is for Firefox...
  var i=tbl.rows.length;
  while (tbl.rows.length > 1) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }
  
  // Calculate the Center, Lower and Upper frequency values
  var center, lower, upper;
  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].freqFormat == "Center/Span") {
    center = Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq);
    lower = Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) - Number((Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq)/2));
    upper = Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + Number((Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq)/2));
  } else {
    center = Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq) + Number(((Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq) - Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq))/2));
    lower = Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SCFreq);
    upper = Number(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SSFreq);
  }

  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length != 0) {
    // This is the main loop that builds the rows
    // of the table by adding cells one at a time
    for (var i=0; i<FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length; i++) {

      var row = tbl.insertRow(i + 1); // there's a header row

      //---------------------------------------------------------
      //  Cell 0:  Number
      //    Row header showing the attenuation point number with
      //    a little different method here as it's a "th" element
      var cell0 = document.createElement('th');
      cell0.className = "rowheader";
      cell0.onclick = new Function ("setSPActiveAttenuationPoint('" + uid + "', " + i + ");");
      var el0 = document.createTextNode(parseInt(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name) + 1);
      cell0.title     = "Attenuation point to be tested"
      cell0.appendChild(el0);
      row.appendChild(cell0);

      //---------------------------------------------------------
      //  Cell 1:  Delete Attenuation Point (row)
      //    Holds an icon/link to delete the row
      var cell1 = row.insertCell(1);
      cell1.className = "icon";
      var el1   = document.createElement('img');
      if (!EDITDISABLED) {
        el1.src   = "/images/deletesmall.gif";
        el1.title = "Delete this attenuation point";
        el1.onclick = new Function ("removeSPAttenuationPoint('" + uid + "', " + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + ");");
      } else {
        el1.src   = "/images/deletesmalldisabled.gif";
        el1.title = "Cannot edit sequence";
      }
      cell1.appendChild(el1);

      //---------------------------------------------------------
      //  Cell 2:  Attenuation Point Reordering
      //    Holds a couple of images/links to handle
      //    reordering rows of the attenuation table
      var cell2 = row.insertCell(2);
      cell2.className = "icon";

      //  Move up (toward top of list; index gets smaller)
      var el2aUp    = document.createElement('a');
      el2aUp.href   = "#nogo";
      var el2aUpImg = document.createElement('img');
      el2aUpImg.className = "movers";
      if (i==0 || EDITDISABLED) {    // disable UP on first element
        el2aUpImg.src     = "/images/upsmalldisabled.gif";
      } else {
        el2aUp.title   = "move up"
        el2aUp.onclick = new Function("this.blur(); moveSPAttenuationPoint('" + uid + "', -(" + i + "));");
        el2aUpImg.src  = "/images/upsmall.gif";
      }
      el2aUp.appendChild(el2aUpImg);

      //  Move down (toward bottom of list; index gets bigger)
      var el2aDwn    = document.createElement('a');
      el2aDwn.href   = "#nogo";
      var el2aDwnImg = document.createElement('img');
      el2aDwnImg.className = "movers";
      if (EDITDISABLED) {  // disable DOWN on last element
        el2aDwnImg.src     = "/images/downsmalldisabled.gif";
      } else {
        el2aDwn.title      = "move down"
        el2aDwn.onclick    = new Function ("this.blur(); moveSPAttenuationPoint('" + uid + "', " + i + ");");
        el2aDwnImg.src     = "/images/downsmall.gif";
      }
      el2aDwn.appendChild(el2aDwnImg);

      cell2.appendChild(el2aUp);
      cell2.appendChild(el2aDwn);

      //---------------------------------------------------------
      //  Cell 3:  Attenuation
      //    Holds a text entry box to define the Attenuation
      //    to be used for the attenuation point
      var cell3  = row.insertCell(3);
      cell3.className = "ni";

      var el3a   = document.createElement('input');
      el3a.type  = "text"
      el3a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuation" + uid;
      el3a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuation" + uid;
      el3a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].attenuation;
      el3a.className = "hidden";
      el3a.onblur = new Function ("saveSPChangedAttenuation(" + uid + ", " + i + ");");

      var el3b  = document.createElement('span');
      var el3c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].attenuation == "")? "[Empty]" : FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].attenuation);
      el3b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuationDisplay" + uid;
      el3b.appendChild(el3c);

      if (!EDITDISABLED) {
        cell3.title     = "Click to edit the Attenuation";
        el3b.onclick   = new Function ("setSPAttenuation('" + uid + "', " + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + ");");
      } else {
        cell3.className = "grayedout";
      }

      cell3.appendChild(el3a);
      cell3.appendChild(el3b);

      //---------------------------------------------------------
      //  Cell 4:  Attenuation Type
      //    Holds a dropdown box to define the type
      //    to be used for the attenuation point
      var cell4  = row.insertCell(4);
      cell4.className = "ni";

      var el4a   = document.createElement('input');
      el4a.type  = "text"
      el4a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuationType" + uid;
      el4a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuationType" + uid;
      el4a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type;
      el4a.className = "hidden";

      var el4b  = document.createElement('div');
      el4b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuationTypeDisplay" + uid;
      el4b.className = "";

      var el4c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type == "")? "[Select]" : FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type);
      el4b.appendChild(el4c);

      if (!EDITDISABLED) {
        cell4.title     = "Click to edit the Type";
        el4b.onclick   = new Function ("changeSPAttenuationType('" + uid + "', " + i + ");");
      } else {
        cell4.className = "grayedout";
      }

      cell4.appendChild(el4a);
      cell4.appendChild(el4b);
      
      //---------------------------------------------------------
      //  Cell 5:  Lower Limit
      //    Holds a text entry box to define the Lower Limit
      //    to be used for the attenuation point
      var cell5  = row.insertCell(5);
      cell5.className = "w24";

      var el5a   = document.createElement('input');
      el5a.type  = "text"
      el5a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "lowerLimit" + uid;
      el5a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "lowerLimit" + uid;
      el5a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower;
      el5a.className = "hidden";
      el5a.onblur = new Function ("saveSPChangedLowerLimit(" + uid + ", " + i + ");");
      
      // Create lower limit text
      var lowerText, lowerValue;

      if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type == "Center") {
        lowerText = center;
        lowerValue = Number(center) - Number(convertSPFrequencyUnits(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units));
      } else if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type == "Lower") {
        lowerText = lower;
        lowerValue = Number(lower) - Number(convertSPFrequencyUnits(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units));
      } else {
        lowerText = upper;
        lowerValue = Number(upper) - Number(convertSPFrequencyUnits(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units));
      }
      lowerText = lowerText + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ' - ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units + ' = ' + lowerValue + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units;

      var el5b  = document.createElement('span');
      var el5c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower == "")? "[Empty]" : lowerText);
      el5b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "lowerLimitDisplay" + uid;
      el5b.appendChild(el5c);

      if (!EDITDISABLED) {
        cell5.title     = "Click to edit the Lower Limit";
        el5b.onclick   = new Function ("setSPLowerLimit('" + uid + "', " + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + ");");
      } else {
        cell5.className = "grayedout";
      }

      cell5.appendChild(el5a);
      cell5.appendChild(el5b);

      //---------------------------------------------------------
      //  Cell 6:  Upper Limit
      //    Holds a text entry box to define the Upper Limit
      //    to be used for the attenuation point
      var cell6  = row.insertCell(6);
      cell6.className = "w24";

      var el6a   = document.createElement('input');
      el6a.type  = "text"
      el6a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "upperLimit" + uid;
      el6a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "upperLimit" + uid;
      el6a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper;
      el6a.className = "hidden";
      el6a.onblur = new Function ("saveSPChangedUpperLimit(" + uid + ", " + i + ");");

      // Create upper limit text
      var upperText, upperValue;

      if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type == "Center") {
        upperText = center;
        upperValue = Number(center) + Number(convertSPFrequencyUnits(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units));
      } else if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type == "Lower") {
        upperText = lower;
        upperValue = Number(lower) + Number(convertSPFrequencyUnits(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units));
      } else {
        upperText = upper;
        upperValue = Number(upper) + Number(convertSPFrequencyUnits(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units));
      }
      upperText = upperText + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units + ' + ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units + ' = ' + upperValue + ' ' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].units;

      var el6b  = document.createElement('span');
      var el6c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper == "")? "[Empty]" : upperText);
      el6b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "upperLimitDisplay" + uid;
      el6b.appendChild(el6c);

      if (!EDITDISABLED) {
        cell6.title     = "Click to edit the Upper Limit";
        el6b.onclick   = new Function ("setSPUpperLimit('" + uid + "', " + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + ");");
      } else {
        cell6.className = "grayedout";
      }

      cell6.appendChild(el6a);
      cell6.appendChild(el6b);

      //---------------------------------------------------------
      //  Cell 7:  Units
      //    Holds a dropdown box to define the units
      //    to be used for the attenuation point
      var cell7  = row.insertCell(7);
      cell7.className = "ni";

      var el7a   = document.createElement('input');
      el7a.type  = "text"
      el7a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuationUnits" + uid;
      el7a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuationUnits" + uid;
      el7a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units;
      el7a.className = "hidden";

      var el7b  = document.createElement('div');
      var el7c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units == "")? "[Select]" : FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units);
      el7b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name + "attenuationUnitsDisplay" + uid;
      el7b.appendChild(el7c);
      el7b.className = "";

      if (!EDITDISABLED) {
        cell7.title     = "Click to edit the Units";
        el7b.onclick   = new Function ("changeSPAttenuationUnits('" + uid + "', " + i + ");");
      } else {
        cell7.className = "grayedout";
      }

      cell7.appendChild(el7a);
      cell7.appendChild(el7b);
      
      //---------------------------------------------------------
      //  Cell 8:  Filler Cell
      //    Holds a blank cell as a filler cell
      row.insertCell(8);
    }

    if (tbl.rows.length > 1) {
      // disable DOWN on last element
      el2aDwn.title      = "";
      el2aDwn.onclick    = null;
      el2aDwnImg.src     = "/images/downsmalldisabled.gif";
    }

    // everything's added - paint the table styles
    setSPTableRows(uid, 'attenuations');
  }
  setSPActiveAttenuationPoint(uid, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].activeAttenuationPoint)
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the attenuations
// table
//---------------------------------------------------------

//---------------------------------------------------------
//  Attenuation Table Cell 1:  Remove Attenuation Point (row)
//---------------------------------------------------------
function removeSPAttenuationPoint(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  // Re-order attenuations
  for (var j=i+1; j<FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length; j++) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[j].name = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[j].name - 1;
  }
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.splice(i, 1);
  
  setSPActiveAttenuationPoint(uid, -1);
  makeChanges();
  buildSPAttenuationPointsTable(uid);
}

//---------------------------------------------------------
//  Attenuation Table Cell 2:  Reorder Attenuation Points
//---------------------------------------------------------
function moveSPAttenuationPoint(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var dir=1;
  if (i<0) {
    dir = -1;
    i   = -i;
  }

  var temp = new copySPAttenuationPoint(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i + dir]); // save point above (or below)
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i + dir] = null;
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i + dir] = new copySPAttenuationPoint(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i]); // replace index with next (or prev)
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i + dir].name = temp.name;
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i] = null;
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i] = new copySPAttenuationPoint(temp); // move temp back
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name = i;
  temp = null;

  makeChanges();
  buildSPAttenuationPointsTable(uid);
  setSPActiveAttenuationPoint(uid, i + dir);
}

//---------------------------------------------------------
//  Attenuation Table Cell 3:  Change Attenuation
//---------------------------------------------------------
function setSPAttenuation(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveAttenuationPoint(uid, i);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var dtext = document.getElementById(aname + "attenuationDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = aname + "_text" + uid;
  t.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].attenuation;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedAttenuation('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedAttenuation(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var t     = document.getElementById(aname + "_text" + uid);
  var j     = t.value; // get the attenuation value

  // don't make changes if they didn't select a new attenuation
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].attenuation) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].attenuation = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPAttenuationPointsTable(uid);
  setSPActiveAttenuationPoint(uid, i);
}

//---------------------------------------------------------
//  Attenuation Table Cell 4:  Change Attenuation Type
//---------------------------------------------------------
function changeSPAttenuationType(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveAttenuationPoint(uid, i);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var dtext = document.getElementById(aname + "attenuationTypeDisplay" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all valid attenuation types
  var A = [];
  getSPAttenuationTypes(A, uid);
  
  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = aname + "_select" + uid;
  addStringOptions(s, A, A);

  // search array for index of attenuation type
  var index = A.indexOf(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedAttenuationType('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedAttenuationType('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.onclick = new Function ("");
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedAttenuationType(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var s     = document.getElementById(aname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j   = s.options[s.selectedIndex].value; // get the attenuation type text
  }

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new attenuation type
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].type = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPAttenuationPointsTable(uid);
  setSPActiveAttenuationPoint(uid, i);
}

function getSPAttenuationTypes(A, uid) {
  var FILTER_SP = getSPFilterObject(uid);
  
  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Bandpass" || FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Bandstop") {
    A[0] = ["Center"];
    A[1] = ["Lower"];
    A[2] = ["Upper"];
  } else if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type == "Lowpass") {
    A[0] = ["Upper"];
  } else {
    A[0] = ["Lower"];
  }
}

//---------------------------------------------------------
//  Attenuation Table Cell 5:  Change Lower Limit
//---------------------------------------------------------
function setSPLowerLimit(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveAttenuationPoint(uid, i);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var dtext = document.getElementById(aname + "lowerLimitDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = aname + "_text" + uid;
  t.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedLowerLimit('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedLowerLimit(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var t     = document.getElementById(aname + "_text" + uid);
  var j     = t.value; // get the lower limit value

  // don't make changes if they didn't select a new lower limit
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].lower = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPAttenuationPointsTable(uid);
  setSPActiveAttenuationPoint(uid, i);
}

//---------------------------------------------------------
//  Attenuation Table Cell 6:  Change Upper Limit
//---------------------------------------------------------
function setSPUpperLimit(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveAttenuationPoint(uid, i);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var dtext = document.getElementById(aname + "upperLimitDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = aname + "_text" + uid;
  t.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedUpperLimit('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedUpperLimit(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var t     = document.getElementById(aname + "_text" + uid);
  var j     = t.value; // get the upper limit value

  // don't make changes if they didn't select a new upper limit
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].upper = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPAttenuationPointsTable(uid);
  setSPActiveAttenuationPoint(uid, i);
}

//---------------------------------------------------------
//  Attenuation Table Cell 7:  Change Units
//---------------------------------------------------------
function changeSPAttenuationUnits(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveAttenuationPoint(uid, i);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var dtext = document.getElementById(aname + "attenuationUnitsDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all valid units
  var A = [];
  getSPUnits(A);
  
  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = aname + "_select" + uid;
  addStringOptions(s, A, A);
  
  // search array for index of units
  var index = A.indexOf(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedAttenuationUnits('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedAttenuationUnits('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.onclick = new Function ("");
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedAttenuationUnits(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var aname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].name;
  var s     = document.getElementById(aname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j   = s.options[s.selectedIndex].value; // get the units text
  }

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");
  
  // don't make changes if they didn't select a new unit
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[i].units = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPAttenuationPointsTable(uid);
  setSPActiveAttenuationPoint(uid, i);
}

function getSPUnits(A) {
  A[0] = ["Hz"];
  A[1] = ["kHz"];
  A[2] = ["MHz"];
  A[3] = ["GHz"];
}

//---------------------------------------------------------
//  Add new ATTENUATION_SP to the table
//---------------------------------------------------------
function addSPAttenuationPoint(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  if (EDITDISABLED || FILTER_SP.activeFilterLimit < 0) return;

  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length] = new ATTENUATION_SP(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length, '', '', '', '', '');

  makeChanges();
  buildSPAttenuationPointsTable(uid);
}

//---------------------------------------------------------
//  Add copy of the selected attenuation point to the table
//---------------------------------------------------------
function addSPAttenuationPointCopy(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  if (EDITDISABLED || FILTER_SP.activeFilterLimit < 0) return;

  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].activeAttenuationPoint >= 0) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length] = new copySPAttenuationPoint(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].activeAttenuationPoint]);
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length - 1].name = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length - 1;

    makeChanges();
    buildSPAttenuationPointsTable(uid);
    setSPActiveAttenuationPoint(uid, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP.length - 1);
  }
}

//---------------------------------------------------------
// This is the main function to build the skirt rejection
// points table from the SKIRTS_SP array
// It requires the following items:
//
//   * global SKIRTS_SP[] array filled
//   * table with id 'skirts'
//---------------------------------------------------------
function buildSPSkirtPointsTable(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  var tbl = document.getElementById('skirts' + uid);
  var j = 0;

  // first, clear existing table.  The try/catch is for Firefox...
  var i=tbl.rows.length;
  while (tbl.rows.length > 1) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }

  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length != 0) {
    // This is the main loop that builds the rows
    // of the table by adding cells one at a time
    for (var i=0; i<FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length; i++) {

      var row = tbl.insertRow(i + 1); // there's a header row

      //---------------------------------------------------------
      //  Cell 0:  Number
      //    Row header showing the attenuation point number with
      //    a little different method here as it's a "th" element
      var cell0 = document.createElement('th');
      cell0.className = "rowheader";
      cell0.onclick = new Function ("setSPActiveSkirtPoint('" + uid + "', " + i + ");");
      var el0 = document.createTextNode(parseInt(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name) + 1);
      cell0.title     = "Skirt Rejection point to be tested"
      cell0.appendChild(el0);
      row.appendChild(cell0);

      //---------------------------------------------------------
      //  Cell 1:  Delete Skirt Rejection Point (row)
      //    Holds an icon/link to delete the row
      var cell1 = row.insertCell(1);
      cell1.className = "icon";
      
      var el1   = document.createElement('img');
      if (!EDITDISABLED) {
        el1.src   = "/images/deletesmall.gif";
        el1.title = "Delete this skirt rejection point";
        el1.onclick = new Function ("removeSPSkirtPoint('" + uid + "', " + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + ");");
      } else {
        el1.src   = "/images/deletesmalldisabled.gif";
        el1.title = "Cannot edit sequence";
      }
      cell1.appendChild(el1);

      //---------------------------------------------------------
      //  Cell 2:  Skirt Rejection Point Reordering
      //    Holds a couple of images/links to handle
      //    reordering rows of the skirt table
      var cell2 = row.insertCell(2);
      cell2.className = "icon";

      //  Move up (toward top of list; index gets smaller)
      var el2aUp    = document.createElement('a');
      el2aUp.href   = "#nogo";
      var el2aUpImg = document.createElement('img');
      el2aUpImg.className = "movers";
      if (i==0 || EDITDISABLED) {    // disable UP on first element
        el2aUpImg.src     = "/images/upsmalldisabled.gif";
      } else {
        el2aUp.title   = "move up"
        el2aUp.onclick = new Function("this.blur(); moveSPSkirtPoint('" + uid + "', -(" + i + "));");
        el2aUpImg.src  = "/images/upsmall.gif";
      }
      el2aUp.appendChild(el2aUpImg);

      //  Move down (toward bottom of list; index gets bigger)
      var el2aDwn    = document.createElement('a');
      el2aDwn.href   = "#nogo";
      var el2aDwnImg = document.createElement('img');
      el2aDwnImg.className = "movers";
      if (EDITDISABLED) {  // disable DOWN on last element
        el2aDwnImg.src     = "/images/downsmalldisabled.gif";
      } else {
        el2aDwn.title      = "move down"
        el2aDwn.onclick    = new Function ("this.blur(); moveSPSkirtPoint('" + uid + "', " + i + ");");
        el2aDwnImg.src     = "/images/downsmall.gif";
      }
      el2aDwn.appendChild(el2aDwnImg);

      cell2.appendChild(el2aUp);
      cell2.appendChild(el2aDwn);

      //---------------------------------------------------------
      //  Cell 3:  Relative
      //    Holds an checkbox to turn on/off relative loss
      var cell3 = row.insertCell(3);
      cell3.className = "icon";

      var el3   = document.createElement('input');
      el3.type  = "checkbox";
      el3.id    = i + "_sRelative" + uid;
      el3.name  = i + "_sRelative" + uid;
      cell3.appendChild(el3);   // have to append before setting attributes for IE6

      el3.disabled = false;
      el3.checked  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relative;
      el3.onclick  = new Function ("saveSPSkirtRelative('" + uid + "', " + i + ");");
      el3.title    = "Relative: if checked the attenuation value will be relative to the selected value";

      if (EDITDISABLED) el3.disabled = true;
      
      //---------------------------------------------------------
      //  Cell 4:  Connected
      //    Holds an checkbox to select whether this point is
      //    connected to the previous point
      var cell4 = row.insertCell(4);
      cell4.className = "icon";

      var el4   = document.createElement('input');
      el4.type  = "checkbox";
      el4.id    = i + "_sConnect" + uid;
      el4.name  = i + "_sConnect" + uid;
      cell4.appendChild(el4);   // have to append before setting attributes for IE6

      el4.disabled = false;
      el4.checked  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].connect;
      el4.onclick  = new Function ("saveSPSkirtConnect('" + uid + "', " + i + ");");
      el4.title    = "Connect: if checked this skirt rejection point will be connected to the previous skirt rejection point";

      if (i == 0 || EDITDISABLED) el4.disabled = true;

      //---------------------------------------------------------
      //  Cell 5:  Frequency
      //    Holds a text entry box to define the Frequency
      //    to be used for the skirt rejection point
      var cell5  = row.insertCell(5);
      cell5.className = "ni";

      var el5a   = document.createElement('input');
      el5a.type  = "text"
      el5a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "sFrequency" + uid;
      el5a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "sFrequency" + uid;
      el5a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].frequency;
      el5a.className = "hidden";
      el5a.onblur = new Function ("saveSPChangedSkirtFrequency(" + uid + ", " + i + ");");

      var el5b  = document.createElement('span');
      var el5c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].frequency == "")? "[Empty]" : FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].frequency);
      el5b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtFrequencyDisplay" + uid;
      el5b.appendChild(el5c);

      if (!EDITDISABLED) {
        cell5.title     = "Click to edit the Frequency";
        el5b.onclick   = new Function ("setSPSkirtFrequency('" + uid + "', " + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + ");");
      } else {
        cell5.className = "grayedout";
      }

      cell5.appendChild(el5a);
      cell5.appendChild(el5b);

      //---------------------------------------------------------
      //  Cell 6:  Units
      //    Holds a dropdown box to define the units
      //    to be used for the skirt rejection point
      var cell6  = row.insertCell(6);
      cell6.className = "ni";

      var el6a   = document.createElement('input');
      el6a.type  = "text"
      el6a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtUnits" + uid;
      el6a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtUnits" + uid;
      el6a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].units;
      el6a.className = "hidden";

      var el6b  = document.createElement('div');
      var el6c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].units == "")? "[Select]" : FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].units);
      el6b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtUnitsDisplay" + uid;
      el6b.appendChild(el6c);
      el6b.className = "";

      if (!EDITDISABLED) {
        cell6.title     = "Click to edit the Units";
        el6b.onclick   = new Function ("changeSPSkirtUnits('" + uid + "', " + i + ");");
      } else {
        cell6.className = "grayedout";
      }

      cell6.appendChild(el6a);
      cell6.appendChild(el6b);

      //---------------------------------------------------------
      //  Cell 7:  Attenuation
      //    Holds a dropdown box to define the attenuation
      //    to be used for the skirt rejection point
      var cell7  = row.insertCell(7);
      cell7.className = "ni";

      var el7a   = document.createElement('input');
      el7a.type  = "text"
      el7a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtAttenuation" + uid;
      el7a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtAttenuation" + uid;
      el7a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].attenuation;
      el7a.className = "hidden";

      var el7b  = document.createElement('div');
      el7b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtAttenuationDisplay" + uid;
      el7b.className = "";

      var el7c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].attenuation == "")? "[Select]" : FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].attenuation);
      el7b.appendChild(el7c);

      if (!EDITDISABLED) {
        cell7.title     = "Click to edit the Attenuation";
        el7b.onclick   = new Function ("changeSPSkirtAttenuation('" + uid + "', " + i + ");");
      } else {
        cell7.className = "grayedout";
      }

      cell7.appendChild(el7a);
      cell7.appendChild(el7b);

      //---------------------------------------------------------
      //  Cell 8:  Relative Loss Type
      //    Holds a dropdown box to define the point to be
      //    selected for the relative attenuation calculation
      //    to be used for the skirt rejection point
      var cell8  = row.insertCell(8);
      cell8.className = "ni";

      var el8a   = document.createElement('input');
      el8a.type  = "text"
      el8a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtRelLoss" + uid;
      el8a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtRelLoss" + uid;
      el8a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLoss;
      el8a.className = "hidden";
      var el8b  = document.createElement('div');
      var el8c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLoss == "")? "[Select]" : FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLoss);
      el8b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtRelLossDisplay" + uid;
      el8b.appendChild(el8c);
      el8b.className = "";

      if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relative && !EDITDISABLED) {
        cell8.title     = "Click to edit the Relative Loss";
        el8b.onclick   = new Function ("changeSPSkirtRelLoss('" + uid + "', " + i + ");");
      } else {
        cell8.className = "grayedout";
      }

      cell8.appendChild(el8a);
      cell8.appendChild(el8b);
      
      //---------------------------------------------------------
      //  Cell 9:  Relative Frequency
      //    Holds a text entry box to define the Relative Frequency
      //    to be used for the skirt rejection point
      var cell9  = row.insertCell(9);
      cell9.className = "ni";

      var el9a   = document.createElement('input');
      el9a.type  = "text"
      el9a.id    = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtRelLossFrequency" + uid;
      el9a.name  = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtRelLossFrequency" + uid;
      el9a.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLossFreq;
      el9a.className = "hidden";
      el9a.onblur = new Function ("saveSPChangedSkirtRelFrequency(" + uid + ", " + i + ");");

      var el9b  = document.createElement('span');
      var el9c  = document.createTextNode((FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLossFreq == "")? "[Empty]" : FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLossFreq);
      el9b.id   = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + "skirtRelLossFrequencyDisplay" + uid;
      el9b.appendChild(el9c);

      if (!EDITDISABLED && FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLoss == "Frequency") {
        cell9.title     = "Click to edit the Relative Frequency";
        el9b.onclick   = new Function ("changeSPSkirtRelFrequency('" + uid + "', " + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name + ");");
      } else {
        cell9.className = "grayedout";
      }

      cell9.appendChild(el9a);
      cell9.appendChild(el9b);
      
      //---------------------------------------------------------
      //  Cell 10:  Filler Cell
      //    Holds a blank cell as a filler cell
      row.insertCell(10);
    }

    if (tbl.rows.length > 1) {
      // disable DOWN on last element
      el2aDwn.title      = "";
      el2aDwn.onclick    = null;
      el2aDwnImg.src     = "/images/downsmalldisabled.gif";
    }

    // everything's added - paint the table styles
    setSPTableRows(uid, 'attenuations');
  }
  setSPActiveSkirtPoint(uid, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].activeSkirtPoint)
}

//---------------------------------------------------------
// Main function is above;  below you'll find the functions
// that handle making changes to the cells of the skirts
// table
//---------------------------------------------------------

//---------------------------------------------------------
//  Skirt Table Cell 1:  Remove Skirt Rejection Point (row)
//---------------------------------------------------------
function removeSPSkirtPoint(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  // Re-order skirts
  for (var j=i+1; j<FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length; j++) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[j].name = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[j].name - 1;
  }
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.splice(i, 1);

  setSPActiveSkirtPoint(uid, -1);
  makeChanges();
  buildSPSkirtPointsTable(uid);
}

//---------------------------------------------------------
//  Skirt Table Cell 2:  Reorder Skirt Rejection Points
//---------------------------------------------------------
function moveSPSkirtPoint(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var dir=1;
  if (i<0) {
    dir = -1;
    i   = -i;
  }

  var temp = new copySPSkirtPoint(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i + dir]); // save point above (or below)
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i + dir] = null;
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i + dir] = new copySPSkirtPoint(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i]); // replace index with next (or prev)
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i + dir].name = temp.name;
  if (i + dir == 0) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i + dir].connect = false; // first point cannot connect to anything
  }
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i] = null;
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i] = new copySPSkirtPoint(temp); // move temp back
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name = i;
  temp = null;

  makeChanges();
  buildSPSkirtPointsTable(uid);
  setSPActiveSkirtPoint(uid, i + dir);
}

//---------------------------------------------------------
//  Skirt Table Cell 3:  Relative
//---------------------------------------------------------
function saveSPSkirtRelative(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveSkirtPoint(uid, i);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relative = !(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relative);
  makeChanges();
  buildSPSkirtPointsTable(uid);
}

//---------------------------------------------------------
//  Skirt Table Cell 4:  Connect
//---------------------------------------------------------
function saveSPSkirtConnect(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveSkirtPoint(uid, i);
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].connect = !(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].connect);
  makeChanges();
  buildSPSkirtPointsTable(uid);
}

//---------------------------------------------------------
//  Skirt Table Cell 5:  Change Frequency
//---------------------------------------------------------
function setSPSkirtFrequency(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveSkirtPoint(uid, i);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var dtext = document.getElementById(sname + "skirtFrequencyDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = sname + "_text" + uid;
  t.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].frequency;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedSkirtFrequency('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedSkirtFrequency(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var t     = document.getElementById(sname + "_text" + uid);
  var j     = t.value; // get the frequency value

  // don't make changes if they didn't select a new frequency
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].frequency) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].frequency = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPSkirtPointsTable(uid);
  setSPActiveSkirtPoint(uid, i);
}

//---------------------------------------------------------
//  Skirt Table Cell 6:  Change Units
//---------------------------------------------------------
function changeSPSkirtUnits(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveSkirtPoint(uid, i);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var dtext = document.getElementById(sname + "skirtUnitsDisplay" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";

  // create array of all valid units
  var A = [];
  getSPUnits(A);
  
  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = sname + "_select" + uid;
  addStringOptions(s, A, A);

  // search array for index of units
  var index = A.indexOf(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].units);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedSkirtUnits('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedSkirtUnits('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.onclick = new Function ("");
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedSkirtUnits(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var s     = document.getElementById(sname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j   = s.options[s.selectedIndex].value; // get the units text
  }

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");
  
  // don't make changes if they didn't select a new unit
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].units) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].units = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPSkirtPointsTable(uid);
  setSPActiveSkirtPoint(uid, i);
}

//---------------------------------------------------------
//  Skirt Table Cell 7:  Change Attenuation
//---------------------------------------------------------
function changeSPSkirtAttenuation(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveSkirtPoint(uid, i);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var dtext = document.getElementById(sname + "skirtAttenuationDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = sname + "_text" + uid;
  t.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].attenuation;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedSkirtAttenuation('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedSkirtAttenuation(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var t     = document.getElementById(sname + "_text" + uid);
  var j     = t.value; // get the attenuation value

  // don't make changes if they didn't select a new attenuation
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].attenuation) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].attenuation = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPSkirtPointsTable(uid);
  setSPActiveSkirtPoint(uid, i);
}

//---------------------------------------------------------
//  Attenuation Table Cell 8:  Change Relative Loss
//---------------------------------------------------------
function changeSPSkirtRelLoss(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveSkirtPoint(uid, i);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var dtext = document.getElementById(sname + "skirtRelLossDisplay" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all valid attenuation types
  var A = [];
  getSPRelLossTypes(A);
  
  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = sname + "_select" + uid;
  addStringOptions(s, A, A);

  // search array for index of relative loss
  var index = A.indexOf(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLoss);

  s.selectedIndex = index;
  s.onchange = new Function ("saveSPChangedSkirtRelLoss('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedSkirtRelLoss('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.onclick = new Function ("");
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedSkirtRelLoss(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var s     = document.getElementById(sname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j   = s.options[s.selectedIndex].value; // get the relative loss text
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");
  
  // don't make changes if they didn't select a new relative loss
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLoss) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLoss = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPSkirtPointsTable(uid);
  setSPActiveSkirtPoint(uid, i);
}

function getSPRelLossTypes(A) {
  A[0] = ["Calculated Center"];
  A[1] = ["Passband Minimum"];
  A[2] = ["Passband Maximum"];
  A[3] = ["Passband Average"];
  A[4] = ["Frequency"];
}

//---------------------------------------------------------
//  Attenuation Table Cell 9:  Change Relative Loss Frequency
//---------------------------------------------------------
function changeSPSkirtRelFrequency(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  setSPActiveSkirtPoint(uid, i);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var dtext = document.getElementById(sname + "skirtRelLossFrequencyDisplay" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = sname + "_text" + uid;
  t.value = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLossFreq;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveSPChangedSkirtRelLossFrequency('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveSPChangedSkirtRelLossFrequency(uid, i) {
  var FILTER_SP = getSPFilterObject(uid);
  var sname = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].name;
  var t     = document.getElementById(sname + "_text" + uid);
  var j     = t.value; // get the relative loss frequency value

  // don't make changes if they didn't select a new frequency
  if (j != FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLossFreq) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[i].relLossFreq = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildSPSkirtPointsTable(uid);
  setSPActiveSkirtPoint(uid, i);
}

//---------------------------------------------------------
//  Add new SKIRT_SP to the table
//---------------------------------------------------------
function addSPSkirtPoint(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  if (EDITDISABLED || FILTER_SP.activeFilterLimit < 0) return;

  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length] = new SKIRT_SP(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length, false, false, '', '', '', '');

  makeChanges();
  buildSPSkirtPointsTable(uid);
}

//---------------------------------------------------------
//  Add copy of the selected skirt point to the table
//---------------------------------------------------------
function addSPSkirtPointCopy(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  if (EDITDISABLED || FILTER_SP.activeFilterLimit < 0) return;

  if (FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].activeSkirtPoint >= 0) {
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length] = new copySPSkirtPoint(FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].activeSkirtPoint]);
    FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP[FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length - 1].name = FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length - 1;

    makeChanges();
    buildSPSkirtPointsTable(uid);
    setSPActiveSkirtPoint(uid, FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].SKIRTS_SP.length - 1);
  }
}

//---------------------------------------------------------
// FILTER_SP UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the FILTER_SP object with the unique id
//---------------------------------------------------------
function getSPFilterObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('FILTER_SP' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('filterSetup' + uid).value);
  }
  return (eval('FILTER_SP' + uid));
}

//----------------------------------------------------------
// Sets up the controls according to the active limit
//----------------------------------------------------------
function setSPActiveFilterLimit(uid, limit) {
  var FILTER_SP = getSPFilterObject(uid);

  FILTER_SP.activeFilterLimit = limit;
  setSPFilterControls(uid);
}

//---------------------------------------------------------
// Gets the filter limit names
//---------------------------------------------------------
function getSPFilterLimitNames(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  var list = [];

  // add the names to the list for the limits defined
  for (var i=0; i<FILTER_SP.FILTERLIMITS_SP.length; i++) {
    list[i] = "Limit " + FILTER_SP.FILTERLIMITS_SP[i].limitNumber + " (" + FILTER_SP.FILTERLIMITS_SP[i].parameter + " - " + FILTER_SP.FILTERLIMITS_SP[i].format + ")";
  }
  
  if (list.length == 0) {
    list[0] = "None Defined";
  }
  
  return list;
}

//---------------------------------------------------------
// Adds a Filter Limit
//---------------------------------------------------------
function addSPFilterLimit(uid) {
  var FILTER_SP = getSPFilterObject(uid);
  var BOUND_SP = getSPBoundObject(uid);
  var STIMULUS_SP = getSPStimulusObject(uid);

  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.FILTERLIMITS_SP.length] = new FILTERLIMIT_SP(BOUND_SP.activeLimit + 1, BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].parameter, BOUND_SP.LIMITS_SP[BOUND_SP.activeLimit].format, 'Bandpass', true, STIMULUS_SP.startFreq, STIMULUS_SP.stopFreq, STIMULUS_SP.units, 'Start/Stop', 3, false, false, 0.1, 10, STIMULUS_SP.units, -1, [], -1, []);
  setSPActiveFilterLimit(uid, FILTER_SP.FILTERLIMITS_SP.length - 1);
}

//---------------------------------------------------------
// Returns a copy of a FILTERLIMIT_SP object
// This long function is necessary to copy by value
// and not by reference.
//---------------------------------------------------------
function copySPFilterLimit(dupeObj) {
  var retObj = new Object();
  if (typeof(dupeObj) == 'object') {
    if (typeof(dupeObj.length) != 'undefined')
      var retObj = new Array();
    for (var objInd in dupeObj) {
      if (typeof(dupeObj[objInd]) == 'object') {
        retObj[objInd] = copySPLimit(dupeObj[objInd]);
      } else if (typeof(dupeObj[objInd]) == 'string') {
        retObj[objInd] = dupeObj[objInd];
      } else if (typeof(dupeObj[objInd]) == 'number') {
        retObj[objInd] = dupeObj[objInd];
      } else if (typeof(dupeObj[objInd]) == 'boolean') {
        ((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false);
      }
    }
  }
  return retObj;
}

//---------------------------------------------------------
// Removes a Filter Limit
//---------------------------------------------------------
function removeSPFilterLimit(uid, limit, remove) {
  var FILTER_SP = getSPFilterObject(uid);
  var activeFilterLimit = FILTER_SP.activeFilterLimit;

  for (var i=0; i<FILTER_SP.FILTERLIMITS_SP.length; i++) {
    // change limit numbers because limit was removed
    if (remove && FILTER_SP.FILTERLIMITS_SP[i].limitNumber - 1 > limit) {
      FILTER_SP.FILTERLIMITS_SP[i].limitNumber = FILTER_SP.FILTERLIMITS_SP[i].limitNumber - 1;
    } else if (FILTER_SP.FILTERLIMITS_SP[i].limitNumber - 1 == limit) {
      FILTER_SP.FILTERLIMITS_SP.splice(i, 1);
      i--;
    }
  }
  if (FILTER_SP.activeFilterLimit >= FILTER_SP.FILTERLIMITS_SP.length) {
    activeFilterLimit = FILTER_SP.activeFilterLimit - 1;
  }
  setSPActiveFilterLimit(uid, activeFilterLimit);
}

//---------------------------------------------------------
// Returns a copy of a ATTENUATION_SP object
//---------------------------------------------------------
function copySPAttenuationPoint(f) {
  for (i in f) this[i] = f[i];
}

//----------------------------------------------------------
// Sets the attenuations table's active row
//----------------------------------------------------------
function setSPActiveAttenuationPoint(uid, activeAttenuationPoint) {
  var FILTER_SP = getSPFilterObject(uid);
  var table  = document.getElementById('attenuations' + uid);
  var image = document.getElementById('imgAttenuationLimit' + uid);

  // insert activeAttenuationPoint into Copy function
  document.getElementById('_addSPAttenuationCopy' + uid).onclick = function(){this.blur(); addSPAttenuationPointCopy(uid, activeAttenuationPoint);};
  // set image to appropriate attenuation limit type
  if (activeAttenuationPoint >= 0 && FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[activeAttenuationPoint].type != '') {
    image.src = '/images/' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type + 'Filter' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].ATTENUATIONS_SP[activeAttenuationPoint].type + '.gif';
  } else {
    image.src = '/images/' + FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].type + 'FilterBase.gif';
  }
  // set activeAttenuationPoint in FILTER_SP object
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].activeAttenuationPoint = activeAttenuationPoint;

  for (var i=1; i<table.rows.length; i++) {
    // set the row and attenuation point active
    if (!(activeAttenuationPoint<0) && (activeAttenuationPoint + 1 == parseInt(table.rows[i].cells[0].innerHTML))) {
      if (table.rows[i].className.search("active") == -1) {
        table.rows[i].className += " active";
        if (table.rows[i].cells[0].rowSpan == 2) {
          table.rows[i + 1].className += " active";
      	  table.rows[i + 1].cells[0].childNodes[0].rows[1].className += " active";
        }
      }
    } else {
      table.rows[i].className = table.rows[i].className.replace("active", "");
    }
  }
}

//---------------------------------------------------------
// Returns a copy of a SKIRT_SP object
//---------------------------------------------------------
function copySPSkirtPoint(f) {
  for (i in f) this[i] = f[i];
}

//----------------------------------------------------------
// Sets the skirts table's active row
//----------------------------------------------------------
function setSPActiveSkirtPoint(uid, activeSkirtPoint) {
  var FILTER_SP = getSPFilterObject(uid);
  var table  = document.getElementById('skirts' + uid);

  // insert activeSkirtPoint into Copy function
  document.getElementById('_addSPSkirtCopy' + uid).onclick = function(){this.blur(); addSPSkirtPointCopy(uid, activeSkirtPoint);};

  // set activeSkirtPoint in FILTER_SP object
  FILTER_SP.FILTERLIMITS_SP[FILTER_SP.activeFilterLimit].activeSkirtPoint = activeSkirtPoint;

  for (var i=1; i<table.rows.length; i++) {
    // set the row and skirt rejection point active
    if (!(activeSkirtPoint<0) && (activeSkirtPoint + 1 == parseInt(table.rows[i].cells[0].innerHTML))) {
      if (table.rows[i].className.search("active") == -1) {
        table.rows[i].className += " active";
        if (table.rows[i].cells[0].rowSpan == 2) {
          table.rows[i + 1].className += " active";
      	  table.rows[i + 1].cells[0].childNodes[0].rows[1].className += " active";
        }
      }
    } else {
      table.rows[i].className = table.rows[i].className.replace("active", "");
    }
  }
}

//---------------------------------------------------------
//  UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
//  Initalize the S Parameter menu sub-tabs
//---------------------------------------------------------
function initSPSubTabs(uid) {
  // create a menu object for the SP Display tabs
  eval('menuSPDisplay' + uid + '=initMenu(\'tabSPDisplay' + uid + '\', \'tSPDisplay' + uid + '\', 3, \'tabbody\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menuSPDisplay' + uid), 0);
}

//---------------------------------------------------------
// Sets table row styling to alternate colors
//---------------------------------------------------------
function setSPTableRows(uid, tableName) {
  var table  = document.getElementById(tableName + uid);
  var j = 0;

  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].className = "" // clear all rows
    if (j%2!=0) table.rows[i].className += " o" // odd row
    j++;
  }
}

//---------------------------------------------------------
//  This gets the parameters being measured from the
//  MEASUREMENT_SP object and returns the list
//---------------------------------------------------------
function getSPParameterValues(uid) {
  var MEASUREMENT_SP = getSPMeasurementObject(uid);
  var list = [];

  // add the values to the dropdown for the parameters being measured
  for (var j=0; j<MEASUREMENT_SP.PARAMETERS_SP.length; j++) {
    list[j] = "S" + MEASUREMENT_SP.PARAMETERS_SP[j].response + MEASUREMENT_SP.PARAMETERS_SP[j].stimulus;
  }
  
  if (list.length == 0) {
    list[0] = "None Measured";
  }
  
  return list;
}

//---------------------------------------------------------
//  This gets the valid formats for the selected parameter
//  and returns the list
//---------------------------------------------------------
function getSPFormatValues(parameter) {
  var response = parameter.substring(1,2);
  var stimulus = parameter.substring(2,3);
  var list = ["Log Mag", "Phase", "Expanded Phase", "Delay", "Lin Mag"];

  // add the values to the dropdown for the valid formats of the parameter being measured
  if (response == stimulus) {
    list[5] = "SWR";
    list[6] = "Return Loss";
  }
  else if (response > stimulus) {
    list[5] = "Insertion Loss";
  }
  else {
    list[5] = "Isolation";
  }

  return list;
}
//---------------------------------------------------------
//  This converts a numeric from one frequency unit to
//  antoher
//---------------------------------------------------------
function convertSPFrequencyUnits(value, unitFrom, unitTo) {
  if (unitFrom == 'Hz') {
    if (unitTo == 'kHz') {
      value = value / 1000;
    } else if (unitTo == 'MHz') {
      value = value / 1000000;
    } else if (unitTo == 'GHz') {
      value = value / 1000000000;
    }
  } else if (unitFrom == 'kHz') {
    if (unitTo == 'Hz') {
      value = value * 1000;
    } else if (unitTo == 'MHz') {
      value = value / 1000;
    } else if (unitTo == 'GHz') {
      value = value / 1000000;
    }
  } else if (unitFrom == 'MHz') {
    if (unitTo == 'Hz') {
      value = value * 1000000;
    } else if (unitTo == 'kHz') {
      value = value * 1000;
    } else if (unitTo == 'GHz') {
      value = value / 1000;
    }
  } else if (unitFrom == 'GHz') {
    if (unitTo == 'Hz') {
      value = value * 1000000000;
    } else if (unitTo == 'kHz') {
      value = value * 1000000;
    } else if (unitTo == 'MHz') {
      value = value * 1000;
    }
  }
  return value;
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