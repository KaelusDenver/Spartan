//---------------------------------------------------------
// This is the main initialization routine to
// initialize the Attenuator step.
// It requires the following items:
//
//   * global STIMULUS_ATT object filled
//   * global MEASUREMENT_ATT object filled
//   * global BOUND_ATT object filled
//---------------------------------------------------------
function initStepAttenuator(uid) {

  // create a unique menu and show tab 0
  var tabs = 4; // ATT configuration has four tabs

  // sets up a menu global for this panel
  eval('menu' + uid + '=initMenu(\'tab' + uid + '\', \'t' + uid + '\', ' + tabs + ', \'paneltabcontent\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menu' + uid), 0);

  setATTStimulusControls(uid);
  setATTMeasurementControls(uid);
  serATTBoundControls(uid);
}

//---------------------------------------------------------
// This is the main save routine to save the
// Attenuator step to the DB.
// It requires the following items:
//
//   * global STIMULUS_ATT object filled
//   * global MEASUREMENT_ATT object filled
//   * global BOUND_ATT object filled
//---------------------------------------------------------
function saveStepAttenuator(uid) {
  var AttenuatorKeys = null;
  
  AttenuatorKeys = saveATTStimulusObject(uid);
  AttenuatorKeys = AttenuatorKeys + "&" + saveATTMeasurementObject(uid);
  AttenuatorKeys = AttenuatorKeys + "&" + saveATTBoundObject(uid);

  return AttenuatorKeys;
}

//---------------------------------------------------------------STIMULUS_ATT OBJECT-----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the STIMULUS_ATT object.  These
//   are manipulated in the edit Attenuator.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The STIMULUS_ATT object is the basis for
// all stimulus parameters for the step.
//---------------------------------------------------------
function STIMULUS_ATT(normalize, instrumentState, calibrate, blank, startFreq, stopFreq, units, points, power, ifbw, sweepTime) {
  this.normalize=normalize;
  this.instrumentState=instrumentState;
  this.calibrate=calibrate;
  this.blank=blank;
  this.startFreq=startFreq;
  this.stopFreq=stopFreq;
  this.units=units;
  this.points=points;
  this.power=power;
  this.ifbw=ifbw;
  this.sweepTime=sweepTime;
}

//---------------------------------------------------------
// This is the main save routine to save the
// STIMULUS_ATT object to the DB.
// It requires the following items:
//
//   * global STIMULUS_ATT object filled
//---------------------------------------------------------
function saveATTStimulusObject(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  var stimulusKeys = "";
  
  if (STIMULUS_ATT.normalize) {
    stimulusKeys = stimulusKeys + "normalize=true&";
  }
  if (STIMULUS_ATT.instrumentState) {
    stimulusKeys = stimulusKeys + "instrumentState=true&";
  }
  if (STIMULUS_ATT.calibrate) {
    stimulusKeys = stimulusKeys + "calibrate=true&";
  }
  if (STIMULUS_ATT.blank) {
    stimulusKeys = stimulusKeys + "blank=true&";
  }
  stimulusKeys = stimulusKeys + "startFreq=" + STIMULUS_ATT.startFreq + "&";
  stimulusKeys = stimulusKeys + "stopFreq=" + STIMULUS_ATT.stopFreq + "&";
  stimulusKeys = stimulusKeys + "units=" + STIMULUS_ATT.units + "&";
  stimulusKeys = stimulusKeys + "points=" + STIMULUS_ATT.points + "&";
  stimulusKeys = stimulusKeys + "power=" + STIMULUS_ATT.power + "&";
  stimulusKeys = stimulusKeys + "ifbw=" + STIMULUS_ATT.ifbw + "&";
  stimulusKeys = stimulusKeys + "sweepTime=" + STIMULUS_ATT.sweepTime;

  return stimulusKeys
}

//---------------------------------------------------------
// This is the main function to set
// the stimulus parameters from the STIMULUS_ATT object.
// It requires the following items:
//
//   * global STIMULUS_ATT object filled
//   * control with id 'normalize'
//   * control with id 'instrumentState'
//   * control with id 'calibrate'
//   * control with id 'blank'
//   * control with id 'startFreq'
//   * control with id 'stopFreq'
//   * control with id 'units'
//   * control with id 'points'
//   * control with id 'power'
//   * control with id 'ifbw'
//   * control with id 'sweepTime'
//---------------------------------------------------------
function setATTStimulusControls(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  var power, ifbw, sweepTime, disabled, checked;
  var unitsList = [];
  var units = document.getElementById('units' + uid).options;

  // Create lists to search
  for (var i=0; i<units.length; i++) {
    unitsList[i] = units[i].text;
  }

  // Set all stimulus parameters
  document.getElementById('normalize' + uid).checked = STIMULUS_ATT.normalize;
  document.getElementById('instrumentState' + uid).checked = STIMULUS_ATT.instrumentState;
  document.getElementById('calibrate' + uid).checked = STIMULUS_ATT.calibrate;
  document.getElementById('blank' + uid).checked = STIMULUS_ATT.blank;
  document.getElementById('startFreq' + uid).value = STIMULUS_ATT.startFreq;
  document.getElementById('stopFreq' + uid).value = STIMULUS_ATT.stopFreq;
  document.getElementById('units' + uid).selectedIndex = unitsList.indexOf(STIMULUS_ATT.units);
  document.getElementById('points' + uid).value = STIMULUS_ATT.points;
  if (STIMULUS_ATT.power == 999) {
    power = "Auto";
    disabled = true;
    checked = true;
  } else {
    power = STIMULUS_ATT.power;
    disabled = STIMULUS_ATT.instrumentState; // Disable if UCIS
    checked = false;
  }
  document.getElementById('power' + uid).value = power;
  document.getElementById('power' + uid).disabled = disabled;
  document.getElementById('autoPower' + uid).checked = checked;
  if (STIMULUS_ATT.ifbw == -1) {
    ifbw = "Auto";
    disabled = true;
    checked = true;
  } else {
    ifbw = STIMULUS_ATT.ifbw;
    disabled = STIMULUS_ATT.instrumentState; // Disable if UCIS
    checked = false;
  }
  document.getElementById('ifbw' + uid).value = ifbw;
  document.getElementById('ifbw' + uid).disabled = disabled;
  document.getElementById('autoIFBW' + uid).checked = checked;
  if (STIMULUS_ATT.sweepTime == -1) {
    sweepTime = "Auto";
    disabled = true;
    checked = true;
  } else {
    sweepTime = STIMULUS_ATT.sweepTime;
    disabled = STIMULUS_ATT.instrumentState; // Disable if UCIS
    checked = false;
  }
  document.getElementById('sweepTime' + uid).value = sweepTime;
  document.getElementById('sweepTime' + uid).disabled = disabled;
  document.getElementById('autoSweepTime' + uid).checked = checked;
  
  // Disable controls if Use Current Instrument State is selected or EDITDISABLED
  disableATTStimulusControls(uid);
}

//---------------------------------------------------------
//  Stimulus:  Normalize
//---------------------------------------------------------
function saveATTNormalize(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  STIMULUS_ATT.normalize = document.getElementById('normalize' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Use Current Instrument State
//---------------------------------------------------------
function saveATTInstrumentState(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  STIMULUS_ATT.instrumentState = document.getElementById('instrumentState' + uid).checked;
  disableATTStimulusControls(uid);
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Calibrate
//---------------------------------------------------------
function saveATTCalibrate(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  STIMULUS_ATT.calibrate = document.getElementById('calibrate' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Blank Screen
//---------------------------------------------------------
function saveATTBlankFrequencies(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  STIMULUS_ATT.blank = document.getElementById('blank' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Start Frequency
//---------------------------------------------------------
function saveATTStartFrequency(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  STIMULUS_ATT.startFreq = document.getElementById('startFreq' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Stop Frequency
//---------------------------------------------------------
function saveATTStopFrequency(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  STIMULUS_ATT.stopFreq = document.getElementById('stopFreq' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Frequency Units
//---------------------------------------------------------
function saveATTFrequencyUnits(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  STIMULUS_ATT.units = document.getElementById('units' + uid).options[document.getElementById('units' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Number of Data Points
//---------------------------------------------------------
function saveATTNumberOfPoints(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  STIMULUS_ATT.points = document.getElementById('points' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Power
//---------------------------------------------------------
function saveATTPower(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  var disabled = false;
  if (document.getElementById('autoPower' + uid).checked) {
    STIMULUS_ATT.power = 999;
    disabled = true;
  } else {
    STIMULUS_ATT.power = document.getElementById('power' + uid).value;
  }
  document.getElementById('power' + uid).disabled = disabled;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  IF Bandwidth
//---------------------------------------------------------
function saveATTIFBW(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  var disabled = false;
  if (document.getElementById('autoIFBW' + uid).checked) {
    STIMULUS_ATT.ifbw = -1;
    disabled = true;
  } else {
    STIMULUS_ATT.ifbw = document.getElementById('ifbw' + uid).value;
  }
  document.getElementById('ifbw' + uid).disabled = disabled;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Sweep Time
//---------------------------------------------------------
function saveATTSweepTime(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);
  var disabled = false;
  if (document.getElementById('autoSweepTime' + uid).checked) {
    STIMULUS_ATT.sweepTime = -1;
    disabled = true;
  } else {
    STIMULUS_ATT.sweepTime = document.getElementById('sweepTime' + uid).value;
  }
  document.getElementById('sweepTime' + uid).disabled = disabled;
  makeChanges();
}

//---------------------------------------------------------
// STIMULUS_ATT UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the STIMULUS_ATT object with the unique id
//---------------------------------------------------------
function getATTStimulusObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('STIMULUS_ATT' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('stimulusSetup' + uid).value);
  }
  return (eval('STIMULUS_ATT' + uid));
}

//---------------------------------------------------------
// Displays the STIMULUS_ATT object for debugging
//---------------------------------------------------------
function displayATTStimulus(m) {
    var output = 'STIMULUS_ATT:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

function disableATTStimulusControls(uid) {
  var STIMULUS_ATT = getATTStimulusObject(uid);

  // Disable controls if Use Current Instrument State is selected
  document.getElementById('calibrate' + uid).disabled = STIMULUS_ATT.instrumentState;
  document.getElementById('blank' + uid).disabled = STIMULUS_ATT.instrumentState;
  document.getElementById('startFreq' + uid).disabled = STIMULUS_ATT.instrumentState;
  document.getElementById('stopFreq' + uid).disabled = STIMULUS_ATT.instrumentState;
  document.getElementById('units' + uid).disabled = STIMULUS_ATT.instrumentState;
  document.getElementById('points' + uid).disabled = STIMULUS_ATT.instrumentState;
  document.getElementById('power' + uid).disabled = (STIMULUS_ATT.instrumentState || STIMULUS_ATT.power == 999);
  document.getElementById('autoPower' + uid).disabled = STIMULUS_ATT.instrumentState;
  document.getElementById('ifbw' + uid).disabled = (STIMULUS_ATT.instrumentState || STIMULUS_ATT.ifbw == -1);
  document.getElementById('autoIFBW' + uid).disabled = STIMULUS_ATT.instrumentState;
  document.getElementById('sweepTime' + uid).disabled = (STIMULUS_ATT.instrumentState || STIMULUS_ATT.sweepTime == -1);
  document.getElementById('autoSweepTime' + uid).disabled = STIMULUS_ATT.instrumentState;
}

//---------------------------------------------------------------MEASUREMENT_ATT OBJECT----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the MEASUREMENT_ATT object.  These
//   are manipulated in the edit Attenuator.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The MEASUREMENT_ATT object is the basis for
// all measurement parameters for the step.
//---------------------------------------------------------
function MEASUREMENT_ATT(step, startdB, stopdB) {
  this.step=step;
  this.startdB=startdB;
  this.stopdB=stopdB;
}

//---------------------------------------------------------
// This is the main save routine to save the
// MEASUREMENT_ATT object to the DB.
// It requires the following items:
//
//   * global MEASUREMENT_ATT object filled
//---------------------------------------------------------
function saveATTMeasurementObject(uid) {
  var MEASUREMENT_ATT = getATTMeasurementObject(uid);
  var measurementKeys = "";
  
  measurementKeys = measurementKeys + "step=" + MEASUREMENT_ATT.step + "&";
  measurementKeys = measurementKeys + "startdB=" + MEASUREMENT_ATT.startdB + "&";
  measurementKeys = measurementKeys + "stopdB=" + MEASUREMENT_ATT.stopdB + "&";

  return measurementKeys
}

//---------------------------------------------------------
// This is the main function to set
// the measurement parameters from the MEASUREMENT_ATT object.
// It requires the following items:
//
//   * global MEASUREMENT_ATT object filled
//   * control with id 'step'
//   * control with id 'startdB'
//   * control with id 'stopdB'
//---------------------------------------------------------
function setATTMeasurementControls(uid) {
  var MEASUREMENT_ATT = getATTMeasurementObject(uid);
  
  var stepList = [];
  var step = document.getElementById('step' + uid).options;
  
  // Create lists to search
  for (var i=0; i<step.length; i++) {
    stepList[i] = step[i].text;
  }

  // Set all measurement parameters
  document.getElementById('step' + uid).selectedIndex = stepList.indexOf(MEASUREMENT_ATT.step);
  document.getElementById('startdB' + uid).value = MEASUREMENT_ATT.startdB;
  document.getElementById('stopdB' + uid).value = MEASUREMENT_ATT.stopdB;
}

//---------------------------------------------------------
//  Mearurement:  Step Size
//---------------------------------------------------------
function saveATTStepSize(uid) {
  var MEASUREMENT_ATT = getATTMeasurementObject(uid);
  MEASUREMENT_ATT.step = document.getElementById('step' + uid).options[document.getElementById('step' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Start dB
//---------------------------------------------------------
function saveATTStartdB(uid) {
  var MEASUREMENT_ATT = getATTMeasurementObject(uid);
  MEASUREMENT_ATT.startdB = document.getElementById('startdB' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Stop dB
//---------------------------------------------------------
function saveATTStopdB(uid) {
  var MEASUREMENT_ATT = getATTMeasurementObject(uid);
  MEASUREMENT_ATT.stopdB = document.getElementById('stopdB' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
// MEASUREMENT_ATT UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the MEASUREMENT_ATT object with the unique id
//---------------------------------------------------------
function getATTMeasurementObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('MEASUREMENT_ATT' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('measurementSetup' + uid).value);
  }
  return (eval('MEASUREMENT_ATT' + uid));
}

//---------------------------------------------------------
// Displays the MEASUREMENT_ATT object for debugging
//---------------------------------------------------------
function displayATTMeasurement(m) {
    var output = 'MEASUREMENT_ATT:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------------BOUND_ATT OBJECT-------------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the BOUND_ATT object.  This
//   are manipulated in the edit Attenuator.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------
function BOUND_ATT(maxError) {
  this.maxError = maxError;
}

//---------------------------------------------------------
// This is the main save routine to save the
// BOUND_ATT object to the DB.
// It requires the following items:
//
//   * global BOUND_ATT object filled
//---------------------------------------------------------
function saveATTBoundObject(uid) {
  var BOUND_ATT = getATTBoundObject(uid);
  var boundKeys = "";

  boundKeys = boundKeys + "maxError=" + BOUND_ATT.maxError;

  return boundKeys
}

//---------------------------------------------------------
// This is the main function to set
// the bound parameters from the BOUND_ATT object.
// It requires the following items:
//
//   * global BOUND_ATT object filled
//   * control with id 'maxError'
//---------------------------------------------------------
function serATTBoundControls(uid) {
  var BOUND_ATT = getATTBoundObject(uid);

  // Set all bound parameters
  document.getElementById('maxError' + uid).value = BOUND_ATT.maxError;
}

//---------------------------------------------------------
//  Bound:  Maximum Error
//---------------------------------------------------------
function saveATTMaximumError(uid) {
  var BOUND_ATT = getATTBoundObject(uid);
  BOUND_ATT.maxError = document.getElementById('maxError' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
// BOUND_ATT UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the BOUND_ATT object with the unique id
//---------------------------------------------------------
function getATTBoundObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('BOUND_ATT' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('boundSetup' + uid).value);
  }
  return (eval('BOUND_ATT' + uid));
}

//---------------------------------------------------------
// Displays the BOUND_ATT object for debugging
//---------------------------------------------------------
function displayATTBound(m) {
    var output = 'BOUND_ATT:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
//  UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// last call MUST be the init using this
// temporary UID global defined in
// editstep.js - initStep() function
//---------------------------------------------------------
//initStepATTttenuation(TEMPSTEPUID);