//---------------------------------------------------------
// This is the main initialization routine to
// initialize the Switch step.
// It requires the following items:
//
//   * global STIMULUS_SWITCH object filled
//---------------------------------------------------------
function initStepSwitch(uid) {

  // create a unique menu and show tab 0
  var tabs = 2; // Switch configuration has two tabs

  // sets up a menu global for this panel
  eval('menu' + uid + '=initMenu(\'tab' + uid + '\', \'t' + uid + '\', ' + tabs + ', \'paneltabcontent\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menu' + uid), 0);

  setSwitchStimulusControls(uid);
}

//---------------------------------------------------------
// This is the main save routine to save the
// Switch step to the DB.
// It requires the following items:
//
//   * global STIMULUS_SWITCH object filled
//---------------------------------------------------------
function saveStepSwitch(uid) {
  var SwitchKeys = null;

  SwitchKeys = saveSwitchStimulusObject(uid);

  return SwitchKeys;
}

//---------------------------------------------------------------STIMULUS_SWITCH OBJECT--------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the STIMULUS_SWITCH object.  These
//   are manipulated in the editstep Switch.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The STIMULUS_SWITCH object is the basis for
// all stimulus parameters for the step.
//---------------------------------------------------------
function STIMULUS_SWITCH(blank, type, TXPosition, RXPosition, FEParameter) {
  this.blank = blank;
  this.type = type;
  this.TXPosition = TXPosition;
  this.RXPosition = RXPosition;
  this.FEParameter = FEParameter;
}

//---------------------------------------------------------
// This is the main save routine to save the
// STIMULUS_SWITCH object to the DB.
// It requires the following items:
//
//   * global STIMULUS_SWITCH object filled
//---------------------------------------------------------
function saveSwitchStimulusObject(uid) {
  var STIMULUS_SWITCH = getSwitchStimulusObject(uid);
  var stimulusKeys = "";

  if (STIMULUS_SWITCH.blank) {
    stimulusKeys = stimulusKeys + "blank=true&";
  }
  stimulusKeys = stimulusKeys + "type=" + STIMULUS_SWITCH.type + "&";
  stimulusKeys = stimulusKeys + "TXPosition=" + STIMULUS_SWITCH.TXPosition + "&";
  stimulusKeys = stimulusKeys + "RXPosition=" + STIMULUS_SWITCH.RXPosition + "&";
  stimulusKeys = stimulusKeys + "FEParameter=" + STIMULUS_SWITCH.FEParameter + "&";

  return stimulusKeys
}

//---------------------------------------------------------
// This is the main function to set
// the stimulus parameters from the STIMULUS_SWITCH object.
// It requires the following items:
//
//   * global STIMULUS_SWITCH object filled
//   * control with id 'blank'
//   * control with id 'type'
//   * control with id 'TXposition'
//   * control with id 'RXposition'
//   * control with id 'FEParameter'
//---------------------------------------------------------
function setSwitchStimulusControls(uid) {
  var STIMULUS_SWITCH = getSwitchStimulusObject(uid);
  var TXPositionList = [];
  var TXPosition = document.getElementById('TXPosition' + uid).options;
  var RXPositionList = [];
  var RXPosition = document.getElementById('RXPosition' + uid).options;
  var FEParameterList = [];
  var FEParameter = document.getElementById('FEParameter' + uid).options;

  // Create lists to search
  for (var i=0; i<TXPosition.length; i++) {
    TXPositionList[i] = TXPosition[i].value;
  }
  // Create lists to search
  for (var i=0; i<RXPosition.length; i++) {
    RXPositionList[i] = RXPosition[i].value;
  }
  // Create lists to search
  for (var i=0; i<FEParameter.length; i++) {
    FEParameterList[i] = FEParameter[i].value;
  }

  // Set all stimulus parameters
  document.getElementById('blank' + uid).checked = STIMULUS_SWITCH.blank;
  document.getElementById('type' + STIMULUS_SWITCH.type + uid).checked = true;
  document.getElementById('TXPosition' + uid).selectedIndex = TXPositionList.indexOf(STIMULUS_SWITCH.TXPosition);
  document.getElementById('RXPosition' + uid).selectedIndex = RXPositionList.indexOf(STIMULUS_SWITCH.RXPosition);
  document.getElementById('FEParameter' + uid).selectedIndex = FEParameterList.indexOf(STIMULUS_SWITCH.FEParameter);

  // Show the appropriate type box
  switch (STIMULUS_SWITCH.type) {
    case "Kaelus SWI":
      document.getElementById('KaelusSWIBox' + uid).style.display = "inline";
      break;
    case "Kaelus PFE":
      document.getElementById('KaelusPFEBox' + uid).style.display = "inline";
      break;
  }
}

//---------------------------------------------------------
//  Stimulus:  Blank Screen
//---------------------------------------------------------
function saveSwitchBlank(uid) {
  var STIMULUS_SWITCH = getSwitchStimulusObject(uid);
  STIMULUS_SWITCH.blank = document.getElementById('blank' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Switch Type
//---------------------------------------------------------
function saveSwitchType(uid) {
  var STIMULUS_SWITCH = getSwitchStimulusObject(uid);

  var type = document.getElementsByName('type' + uid);
  for (var i=0; i<type.length; i++) {
    if (type[i].checked) {
      STIMULUS_SWITCH.type = type[i].value;
      break;
    }
  }
  
  // Show the appropriate type box
  document.getElementById('KaelusSWIBox' + uid).style.display = "none";
  document.getElementById('KaelusPFEBox' + uid).style.display = "none";
  switch (STIMULUS_SWITCH.type) {
    case "Kaelus SWI":
      document.getElementById('KaelusSWIBox' + uid).style.display = "inline";
      break;
    case "Kaelus PFE":
      document.getElementById('KaelusPFEBox' + uid).style.display = "inline";
      break;
  }

  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  TX Position
//---------------------------------------------------------
function saveSwitchTXPosition(uid) {
  var STIMULUS_SWITCH = getSwitchStimulusObject(uid);
  STIMULUS_SWITCH.TXPosition = document.getElementById('TXPosition' + uid).options[document.getElementById('TXPosition' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  RX Position
//---------------------------------------------------------
function saveSwitchRXPosition(uid) {
  var STIMULUS_SWITCH = getSwitchStimulusObject(uid);
  STIMULUS_SWITCH.RXPosition = document.getElementById('RXPosition' + uid).options[document.getElementById('RXPosition' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  FE Parameter
//---------------------------------------------------------
function saveSwitchFEParameter(uid) {
  var STIMULUS_SWITCH = getSwitchStimulusObject(uid);
  STIMULUS_SWITCH.FEParameter = document.getElementById('FEParameter' + uid).options[document.getElementById('FEParameter' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
// STIMULUS_SWITCH UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the STIMULUS_SWITCH object with the unique id
//---------------------------------------------------------
function getSwitchStimulusObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('STIMULUS_SWITCH' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('stimulusSetup' + uid).value);
  }
  return (eval('STIMULUS_SWITCH' + uid));
}

//---------------------------------------------------------
// Displays the STIMULUS_SWITCH object for debugging
//---------------------------------------------------------
function displaySwitchStimulus(m) {
    var output = 'STIMULUS_SWITCH:\n\n';
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
//initStepSwitch(TEMPSTEPUID);