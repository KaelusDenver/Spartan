//---------------------------------------------------------
// This is the main initialization routine to
// initialize the DC Attenuation step.
// It requires the following items:
//
//   * global STIMULUS_DCA object filled
//   * global MEASUREMENT_DCA object filled
//   * global BOUND_DCA object filled
//---------------------------------------------------------
function initStepDCAttenuation(uid) {

  // create a unique menu and show tab 0
  var tabs = 4; // DCA configuration has four tabs

  // sets up a menu global for this panel
  eval('menu' + uid + '=initMenu(\'tab' + uid + '\', \'t' + uid + '\', ' + tabs + ', \'paneltabcontent\', \'active\', \'\');');

  // show tab 0
  showMenuItem(eval('menu' + uid), 0);

  setDCAStimulusControls(uid);
  setDCAMeasurementControls(uid);
  buildDCALimitsTable(uid, 0);
}

//---------------------------------------------------------
// This is the main save routine to save the
// DC Attenuation step to the DB.
// It requires the following items:
//
//   * global STIMULUS_DCA object filled
//   * global MEASUREMENT_DCA object filled
//   * global BOUND_DCA object filled
//---------------------------------------------------------
function saveStepDCAttenuation(uid) {
  var DCAttenuationKeys = null;
  
  DCAttenuationKeys = saveDCAStimulusObject(uid);
  DCAttenuationKeys = DCAttenuationKeys + "&" + saveDCAMeasurementObject(uid);
  DCAttenuationKeys = DCAttenuationKeys + "&" + saveDCABoundObject(uid);

  return DCAttenuationKeys;
}

//---------------------------------------------------------------STIMULUS_DCA OBJECT-----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the STIMULUS_DCA object.  These
//   are manipulated in the edit DC Attenuation.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The STIMULUS_DCA object is the basis for
// all stimulus parameters for the step.
//---------------------------------------------------------
function STIMULUS_DCA(instrumentState, normalize, blank, range, resolution) {
  this.instrumentState=instrumentState;
  this.normalize=normalize;
  this.blank=blank;
  this.range=range;
  this.resolution=resolution;
}

//---------------------------------------------------------
// This is the main save routine to save the
// STIMULUS_DCA object to the DB.
// It requires the following items:
//
//   * global STIMULUS_DCA object filled
//---------------------------------------------------------
function saveDCAStimulusObject(uid) {
  var STIMULUS_DCA = getDCAStimulusObject(uid);
  var stimulusKeys = "";
  
  if (STIMULUS_DCA.instrumentState) {
    stimulusKeys = stimulusKeys + "instrumentState=true&";
  }
  if (STIMULUS_DCA.normalize) {
    stimulusKeys = stimulusKeys + "normalize=true&";
  }
  if (STIMULUS_DCA.blank) {
    stimulusKeys = stimulusKeys + "blank=true&";
  }
  stimulusKeys = stimulusKeys + "range=" + STIMULUS_DCA.range + "&";
  stimulusKeys = stimulusKeys + "resolution=" + STIMULUS_DCA.resolution;

  return stimulusKeys
}

//---------------------------------------------------------
// This is the main function to set
// the stimulus parameters from the STIMULUS_DCA object.
// It requires the following items:
//
//   * global STIMULUS_DCA object filled
//   * control with id 'instrumentState'
//   * control with id 'normalize'
//   * control with id 'blank'
//   * control with id 'range'
//   * control with id 'resolution'
//---------------------------------------------------------
function setDCAStimulusControls(uid) {
  var STIMULUS_DCA = getDCAStimulusObject(uid);
  var rangeList = [];
  var resolutionList = [];
  var range = document.getElementById('range' + uid).options;
  var resolution = document.getElementById('resolution' + uid).options;
  
  // Create lists to search
  for (var i=0; i<range.length; i++) {
    rangeList[i] = range[i].text;
  }
  for (var i=0; i<resolution.length; i++) {
    resolutionList[i] = resolution[i].text;
  }

  // Set all stimulus parameters
  document.getElementById('instrumentState' + uid).checked = STIMULUS_DCA.instrumentState;
  document.getElementById('normalize' + uid).checked = STIMULUS_DCA.normalize;
  document.getElementById('blank' + uid).checked = STIMULUS_DCA.blank;
  document.getElementById('range' + uid).selectedIndex = rangeList.indexOf(STIMULUS_DCA.range);
  document.getElementById('resolution' + uid).selectedIndex = resolutionList.indexOf(STIMULUS_DCA.resolution);
  
  // Disable controls if Use Current Instrument State is selected
  disableDCAStimulusControls(uid);
}

//---------------------------------------------------------
//  Stimulus:  Use Current Instrument State
//---------------------------------------------------------
function saveDCAInstrumentState(uid) {
  var STIMULUS_DCA = getDCAStimulusObject(uid);
  STIMULUS_DCA.instrumentState = document.getElementById('instrumentState' + uid).checked;
  disableDCAStimulusControls(uid);
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Normalize
//---------------------------------------------------------
function saveDCANormalize(uid) {
  var STIMULUS_DCA = getDCAStimulusObject(uid);
  STIMULUS_DCA.normalize = document.getElementById('normalize' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Blank Screen
//---------------------------------------------------------
function saveDCABlank(uid) {
  var STIMULUS_DCA = getDCAStimulusObject(uid);
  STIMULUS_DCA.blank = document.getElementById('blank' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Range
//---------------------------------------------------------
function saveDCARange(uid) {
  var STIMULUS_DCA = getDCAStimulusObject(uid);
  STIMULUS_DCA.range = document.getElementById('range' + uid).options[document.getElementById('range' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
//  Stimulus:  Resolution
//---------------------------------------------------------
function saveDCAResolution(uid) {
  var STIMULUS_DCA = getDCAStimulusObject(uid);
  STIMULUS_DCA.resolution = document.getElementById('resolution' + uid).options[document.getElementById('resolution' + uid).selectedIndex].value;
  makeChanges();
}

//---------------------------------------------------------
// STIMULUS_DCA UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the STIMULUS_DCA object with the unique id
//---------------------------------------------------------
function getDCAStimulusObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('STIMULUS_DCA' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('stimulusSetup' + uid).value);
  }
  return (eval('STIMULUS_DCA' + uid));
}

//---------------------------------------------------------
// Displays the STIMULUS_DCA object for debugging
//---------------------------------------------------------
function displayDCAStimulus(m) {
    var output = 'STIMULUS_DCA:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

function disableDCAStimulusControls(uid) {
  var STIMULUS_DCA = getDCAStimulusObject(uid);

  // Disable controls if Use Current Instrument State is selected
  document.getElementById('normalize' + uid).disabled = STIMULUS_DCA.instrumentState;
  document.getElementById('blank' + uid).disabled = STIMULUS_DCA.instrumentState;
  document.getElementById('range' + uid).disabled = STIMULUS_DCA.instrumentState;
  document.getElementById('resolution' + uid).disabled = STIMULUS_DCA.instrumentState;
}

//---------------------------------------------------------------MEASUREMENT_DCA OBJECT----------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the MEASUREMENT_DCA object.  These
//   are manipulated in the edit DC Attenuation.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The MEASUREMENT_DCA object is the basis for
// all measurement parameters for the step.
//---------------------------------------------------------
function MEASUREMENT_DCA(topology, lockTopology, calculation, impedance) {
  this.topology=topology;
  this.lockTopology=lockTopology;
  this.calculation=calculation;
  this.impedance=impedance;
}

//---------------------------------------------------------
// This is the main save routine to save the
// MEASUREMENT_DCA object to the DB.
// It requires the following items:
//
//   * global MEASUREMENT_DCA object filled
//---------------------------------------------------------
function saveDCAMeasurementObject(uid) {
  var MEASUREMENT_DCA = getDCAMeasurementObject(uid);
  var measurementKeys = "";
  
  measurementKeys = measurementKeys + "topology=" + MEASUREMENT_DCA.topology + "&";
  if (MEASUREMENT_DCA.lockTopology) {
    measurementKeys = measurementKeys + "lockTopology=true&";
  }
  measurementKeys = measurementKeys + "calculation=" + MEASUREMENT_DCA.calculation + "&";
  measurementKeys = measurementKeys + "impedance=" + MEASUREMENT_DCA.impedance + "&";

  return measurementKeys
}

//---------------------------------------------------------
// This is the main function to set
// the measurement parameters from the MEASUREMENT_DCA object.
// It requires the following items:
//
//   * global MEASUREMENT_DCA object filled
//   * control with id 'topology'
//   * control with id 'lockTopology'
//   * control with id 'calculation'
//   * control with id 'impedance'
//---------------------------------------------------------
function setDCAMeasurementControls(uid) {
  var MEASUREMENT_DCA = getDCAMeasurementObject(uid);

  // Set all measurement parameters
  document.getElementById('topology' + MEASUREMENT_DCA.topology + uid).checked = true;
  document.getElementById('lockTopology' + uid).checked = MEASUREMENT_DCA.lockTopology;
  document.getElementById('calculation' + MEASUREMENT_DCA.calculation + uid).checked = true;
  document.getElementById('impedance' + uid).value = MEASUREMENT_DCA.impedance;

  // Setup the picture controls properly
  setDCATopologyPictureControls(uid);
}

//---------------------------------------------------------
//  Mearurement:  Topology
//---------------------------------------------------------
function saveDCATopology(uid, topology) {
  var MEASUREMENT_DCA = getDCAMeasurementObject(uid);
  MEASUREMENT_DCA.topology = topology;
  // Set the radio button in case the picture controls were clicked
  document.getElementById('topology' + MEASUREMENT_DCA.topology + uid).checked = true;
  // Set the picture controls in case the radio button was clicked
  setDCATopologyPictureControls(uid);
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Lock Control of Topology from User
//---------------------------------------------------------
function saveDCALockTopology(uid) {
  var MEASUREMENT_DCA = getDCAMeasurementObject(uid);
  MEASUREMENT_DCA.lockTopology = document.getElementById('lockTopology' + uid).checked;
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Attenuation Calculation
//---------------------------------------------------------
function saveDCACalculation(uid) {
  var MEASUREMENT_DCA = getDCAMeasurementObject(uid);
  var calculation = document.getElementsByName('calculation' + uid);
  for (var i=0; i<calculation.length; i++) {
    if (calculation[i].checked) {
      break;
    }
  }
  MEASUREMENT_DCA.calculation = calculation[i].value;
  makeChanges();
}

//---------------------------------------------------------
//  Mearurement:  Impedance
//---------------------------------------------------------
function saveDCAImpedance(uid) {
  var MEASUREMENT_DCA = getDCAMeasurementObject(uid);
  MEASUREMENT_DCA.impedance = document.getElementById('impedance' + uid).value;
  makeChanges();
}

//---------------------------------------------------------
// MEASUREMENT_DCA UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the MEASUREMENT_DCA object with the unique id
//---------------------------------------------------------
function getDCAMeasurementObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('MEASUREMENT_DCA' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('measurementSetup' + uid).value);
  }
  return (eval('MEASUREMENT_DCA' + uid));
}

//---------------------------------------------------------
// Displays the MEASUREMENT_DCA object for debugging
//---------------------------------------------------------
function displayDCAMeasurement(m) {
    var output = 'MEASUREMENT_DCA:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
// Sets up the topology picture controls
//---------------------------------------------------------
function setDCATopologyPictureControls(uid) {
  var MEASUREMENT_DCA = getDCAMeasurementObject(uid);
  var piPicture = document.getElementById('PI-NetworkPicture' + uid);
  var tPicture = document.getElementById('T-NetworkPicture' + uid);
  var enabled, disabled = null;

  piPicture.width  = "149";
  piPicture.height = "88";
  tPicture.width   = "149";
  tPicture.height  = "88";

  if (MEASUREMENT_DCA.topology == "PI-Network") {
    piPicture.src = "/images/DCA PI-Network Enabled.gif";
    tPicture.src = "/images/DCA T-Network Disabled.gif";
    piPicture.className = "borderOn";
    tPicture.className = "borderOff";
  } else {
    piPicture.src = "/images/DCA PI-Network Disabled.gif";
    tPicture.src = "/images/DCA T-Network Enabled.gif";
    piPicture.className = "borderOff";
    tPicture.className = "borderOn";
  }
}

//---------------------------------------------------------------BOUND_DCA OBJECT-------------------------------------------------------------------------
//-------------------------------------------------------
//   Defines and handles the BOUND_DCA object.  This
//   are manipulated in the edit DC Attenuation.htm
//   template page using the edittest.vit CGI.
//-------------------------------------------------------
function BOUND_DCA(fields, LIMITS_DCA) {
  this.fields = fields;
  this.LIMITS_DCA = LIMITS_DCA;
}

//-------------------------------------------------------
//   Defines and handles the LIMITS_DCA[] array
//   of the BOUND_DCA object.  These are manipulated
//   in the edit DC Attenuation.htm template page using
//   the edittest.vit CGI.
//-------------------------------------------------------

//---------------------------------------------------------
// The LIMIT_DCA object is the basis for all limits in the step.
//---------------------------------------------------------
function LIMIT_DCA(number, parameter, comparison, operation, value, referential, refType, model, serial, runType, run, field, fieldValue) {
  this.number = number;
  this.parameter = parameter;
  this.comparison = comparison;
  this.operation = operation;
  this.value = value;
  this.referential = referential;
  this.refType = refType;
  this.model = model;
  this.serial = serial;
  this.runType = runType;
  this.run = run;
  this.field = field;
  this.fieldValue = fieldValue;
}

//---------------------------------------------------------
// This is the main save routine to save the
// BOUND_DCA object to the DB.
// It requires the following items:
//
//   * global BOUND_DCA object filled
//---------------------------------------------------------
function saveDCABoundObject(uid) {
  var BOUND_DCA = getDCABoundObject(uid);
  var boundKeys = "";

  for (var i=0; i<BOUND_DCA.LIMITS_DCA.length; i++) {
    boundKeys = boundKeys + "parameter" + i + "=" + BOUND_DCA.LIMITS_DCA[i].parameter + "&";
    boundKeys = boundKeys + "comparison" + i + "=" + BOUND_DCA.LIMITS_DCA[i].comparison + "&";
    boundKeys = boundKeys + "operation" + i + "=" + BOUND_DCA.LIMITS_DCA[i].operation + "&";
    boundKeys = boundKeys + "value" + i + "=" + BOUND_DCA.LIMITS_DCA[i].value + "&";
    if (BOUND_DCA.LIMITS_DCA[i].referential) {
      boundKeys = boundKeys + "referential" + i + "=true&";
    }
    boundKeys = boundKeys + "refType" + i + "=" + BOUND_DCA.LIMITS_DCA[i].refType + "&";
    boundKeys = boundKeys + "model" + i + "=" + BOUND_DCA.LIMITS_DCA[i].model + "&";
    boundKeys = boundKeys + "serial" + i + "=" + BOUND_DCA.LIMITS_DCA[i].serial + "&";
    boundKeys = boundKeys + "runType" + i + "=" + BOUND_DCA.LIMITS_DCA[i].runType + "&";
    boundKeys = boundKeys + "run" + i + "=" + BOUND_DCA.LIMITS_DCA[i].run + "&";
    boundKeys = boundKeys + "field" + i + "=" + BOUND_DCA.LIMITS_DCA[i].field + "&";
    boundKeys = boundKeys + "fieldValue" + i + "=" + BOUND_DCA.LIMITS_DCA[i].fieldValue;
    if (i != BOUND_DCA.LIMITS_DCA.length - 1) {
      boundKeys = boundKeys + "&";
    }
  }

  return boundKeys
}

//---------------------------------------------------------
// This is the main function to build
// the limits table from the LIMITS_DCA array
// It requires the following items:
//
//   * global LIMITS_DCA[] array filled
//   * table with id 'limits'
//---------------------------------------------------------
function buildDCALimitsTable(uid) {
  var BOUND_DCA = getDCABoundObject(uid);
  var tbl = document.getElementById('limits' + uid);
  var i;
  var extra = 0; // keep track of any extra rows that are added for referential limits
  
  // set MN/SN display name values
  var MNDisplay = document.getElementById('MNDisplay' + uid).value;
  var SNDisplay = document.getElementById('SNDisplay' + uid).value;
  
  // first, clear existing table.  The try/catch is for Firefox...
  i=tbl.rows.length;
  while (tbl.rows.length > 1) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }

  // Only build the table if there are LIMITS_DCA to process
  if (BOUND_DCA.LIMITS_DCA.length != 0) {
    // This is the main loop that builds the rows
    // of the table by adding cells one at a time
    for (var i=0; i<BOUND_DCA.LIMITS_DCA.length; i++) {

      var row = tbl.insertRow(i + 1 + extra); // there's a header row
      var referential = BOUND_DCA.LIMITS_DCA[i].referential; // is this a referential limit
      var specify = BOUND_DCA.LIMITS_DCA[i].refType == "Specify"; // is the refType set to specify
      var runNumber = BOUND_DCA.LIMITS_DCA[i].runType == "Run #"; // is the run set to number
      var match = BOUND_DCA.LIMITS_DCA[i].runType == "Match Field"; // is the run set to match field

      //---------------------------------------------------------
      //  Cell 0:  Limit Number
      //    Row header showing limit number in step
      //    a little different method here as it's a "th" element
      var cell0 = document.createElement('th');
      cell0.className = "rh";
      var el0   = document.createTextNode(BOUND_DCA.LIMITS_DCA[i].number + 1);
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
      el1.onclick = new Function ("removeDCALimit('" + uid + "', " + i + ");");
      cell1.appendChild(el1);

      //---------------------------------------------------------
      //  Cell 2:  Referential Limit
      //    Holds a checkbox to select activate the referential
      //    limit status
      var cell2     = row.insertCell(2);
      cell2.className = "icon";
      var el2       = document.createElement('input');
      el2.type      = "checkbox";
      el2.id        = BOUND_DCA.LIMITS_DCA[i].number + "_referential" + uid;
      el2.name      = BOUND_DCA.LIMITS_DCA[i].number + "_referential" + uid;
      cell2.appendChild(el2);   // have to append before setting attributes for IE6

      el2.disabled = false;
      el2.checked  = BOUND_DCA.LIMITS_DCA[i].referential;
      el2.onclick  = new Function ("setDCALimitReferential('" + uid + "', " + i + ");");
      el2.title    = "Click to toggle a Referential Limit";

      // create the referential limits table
      if (referential) {
        var refRow = tbl.insertRow(i + 1 + extra + 1);  // add new row for referential table
        extra++;

        row.cells[0].rowSpan = 2;  // make limit number span both rows
        row.cells[1].rowSpan = 2;  // make delete span both rows
        row.cells[2].rowSpan = 2;  // make referential limit span both rows

        var cell3a = refRow.insertCell(0);
        cell3a.colSpan = 5;

        var reftbl = document.createElement('table');
        reftbl.id = BOUND_DCA.LIMITS_DCA[i].number + "_refTable" + uid;
        reftbl.name = BOUND_DCA.LIMITS_DCA[i].number + "_refTable" + uid;
        cell3a.appendChild(reftbl);   // have to append before setting attributes for IE6
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
              text = document.createTextNode("Type");
              break;
            case 1:
              th.className = "ni";
              th.title = MNDisplay + ": the " + MNDisplay + " of the data to be referenced";
              text = document.createTextNode(MNDisplay);
              break;
            case 2:
              th.className = "ni";
              th.title = SNDisplay + ": the " + SNDisplay + " of the data to be referenced";
              text = document.createTextNode(SNDisplay);
              break;
            case 3:
              th.className = "ni";
              th.title = "Run Type: most recent, specify a number, or match a field";
              text = document.createTextNode("Run Type");
              break;
            case 4:
              th.className = "ni";
              th.title = "Run number: the run number of the data to be referenced";
              text = document.createTextNode("Run Number");
              break;
            case 5:
              th.className = "ni";
              th.title = "Field: select the field to be matched";
              text = document.createTextNode("Field");
              break;
            case 6:
              th.className = "";
              th.title = "Field Value: enter the value of the field to be matched";
              text = document.createTextNode("Field Value");
              break;
          }
          th.appendChild(text);
          tr.appendChild(th);
        }

        var reftblRow = reftbl.insertRow(1);  // add row to referential table

        //---------------------------------------------------------
        //  Cell 8:  Referential Limit Type
        //    Holds a selection box to select
        //    the referential limit type for the limit
        var cell8      = reftblRow.insertCell(0);
        cell8.className = "ni";
        var el8a       = document.createElement('input');
        el8a.type      = "text";
        el8a.id        = BOUND_DCA.LIMITS_DCA[i].number + "_refType" + uid;
        el8a.name      = BOUND_DCA.LIMITS_DCA[i].number + "_refType" + uid;
        el8a.value     = BOUND_DCA.LIMITS_DCA[i].refType;
        el8a.className = "hidden";

        var el8b       = document.createElement('div');
        el8b.id        = BOUND_DCA.LIMITS_DCA[i].number + "_refType_display" + uid;
        el8b.className = "";

        var el8c       = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].refType == "")? "[Select]" : BOUND_DCA.LIMITS_DCA[i].refType);
        el8b.appendChild(el8c);
        
        if (!EDITDISABLED) {
          cell8.title    = "Click to change the Referential Limit Type";
          el8b.onclick   = new Function ("changeDCAReferentialLimitType('" + uid + "', " + i + ");");
        } else {
	  cell8.className = "grayedout";
	}

        cell8.appendChild(el8a);
        cell8.appendChild(el8b);

        //---------------------------------------------------------
        //  Cell 9:  Model Number
        //    Holds a text entry box to define the MN
        //    to be used for the referential limit
        var cell9  = reftblRow.insertCell(1);
        cell9.className = "ni";
        var el9a   = document.createElement('input');
        el9a.type  = "text"
        el9a.className = "hidden";
        el9a.id    = BOUND_DCA.LIMITS_DCA[i].number + "_refModel" + uid;
        el9a.name  = BOUND_DCA.LIMITS_DCA[i].number + "_refModel" + uid;
        el9a.value = BOUND_DCA.LIMITS_DCA[i].model;
        el9a.onblur = new Function ("saveModel(" + uid + ", " + i + ");");

        var el9b  = document.createElement('div');
        var el9c  = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].model == "")? "[Empty]" : BOUND_DCA.LIMITS_DCA[i].model);
        el9b.id   = BOUND_DCA.LIMITS_DCA[i].number + "_refModel_display" + uid;
        el9b.appendChild(el9c);

        if (specify && !EDITDISABLED) {
          cell9.title     = "Click to edit the " + MNDisplay;
          el9b.onclick   = new Function ("setDCAModelNumber('" + uid + "', " + i + ");");
        } else {
          cell9.className = "grayedout";
        }

        cell9.appendChild(el9a);
        cell9.appendChild(el9b);

        //---------------------------------------------------------
        //  Cell 10:  Serial Number
        //    Holds a text entry box to define the SN
        //    to be used for the referential limit
        var cell10  = reftblRow.insertCell(2);
        cell10.className = "ni";
        var el10a   = document.createElement('input');
        el10a.type  = "text"
        el10a.className = "hidden";
        el10a.id    = BOUND_DCA.LIMITS_DCA[i].number + "_refSerial" + uid;
        el10a.name  = BOUND_DCA.LIMITS_DCA[i].number + "_refSerial" + uid;
        el10a.value = BOUND_DCA.LIMITS_DCA[i].serial;
        el10a.onblur = new Function ("saveSerial(" + uid + ", " + i + ");");

        var el10b  = document.createElement('span');
        var el10c  = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].serial == "")? "[Empty]" : BOUND_DCA.LIMITS_DCA[i].serial);
        el10b.id   = BOUND_DCA.LIMITS_DCA[i].number + "_refSerial_display" + uid;
        el10b.appendChild(el10c);

        if (specify && !EDITDISABLED) {
          cell10.title     = "Click to edit the " + SNDisplay;
          el10b.onclick   = new Function ("setDCASerialNumber('" + uid + "', " + i + ");");
        } else {
          cell10.className = "grayedout";
        }

        cell10.appendChild(el10a);
        cell10.appendChild(el10b);

        //---------------------------------------------------------
        //  Cell 11:  Run Type
        //    Holds a selection box to select
        //    the run type for the limit
        var cell11      = reftblRow.insertCell(3);
        cell11.className = "ni";
        var el11a       = document.createElement('input');
        el11a.type      = "text";
        el11a.id        = BOUND_DCA.LIMITS_DCA[i].number + "_runType" + uid;
        el11a.name      = BOUND_DCA.LIMITS_DCA[i].number + "_runType" + uid;
        el11a.value     = BOUND_DCA.LIMITS_DCA[i].runType;
        el11a.className = "hidden";

        var el11b       = document.createElement('div');
        el11b.id        = BOUND_DCA.LIMITS_DCA[i].number + "_runType_display" + uid;
        el11b.className = "";

        var el11c       = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].runType == "")? "[Select]" : BOUND_DCA.LIMITS_DCA[i].runType);
        el11b.appendChild(el11c);
        
        if (!EDITDISABLED) {
          cell11.title    = "Click to change the Run Type";
          el11b.onclick   = new Function ("changeDCARunType('" + uid + "', " + i + ");");
        } else {
	  cell11.className = "grayedout";
	}

        cell11.appendChild(el11a);
        cell11.appendChild(el11b);

        //---------------------------------------------------------
        //  Cell 12:  Run Number
        //    integer value to tell which run number to use for
        //    the referential limit
        var cell12       = reftblRow.insertCell(4);

        var el12a       = document.createElement('input');
        el12a.type      = "text";
        el12a.id        = BOUND_DCA.LIMITS_DCA[i].number + "_run" + uid;
        el12a.name      = BOUND_DCA.LIMITS_DCA[i].number + "_run" + uid;
        el12a.value     = BOUND_DCA.LIMITS_DCA[i].run;
        el12a.title     = "Change the Run Number";
        el12a.onblur    = new Function ("armDCASaveRun('" + uid + "', " + i + ")");  // handle saving changes
        // this allows the user to press "ENTER" to confrim an entry
        if ($.browser.msie) {
          el12a.onkeydown = new Function ("captureReturn(this, window.event)");
        } else {
          el12a.setAttribute("onkeydown", "captureReturn(this, event);");
        }
        el12a.className = "hidden";

        cell12.className = "ctl";
        cell12.appendChild(el12a);

        // create and show numeric Increase/Decrease buttons
        var el12Ctl     = document.createElement('span');
        el12Ctl.id      = BOUND_DCA.LIMITS_DCA[i].number + "_run_control" + uid;
        el12Ctl.name    = BOUND_DCA.LIMITS_DCA[i].number + "_run_control" + uid;
        el12Ctl.className = "hidden";

        // numeric Increase
        var el12Up      = document.createElement('a');
        el12Up.href     = "#nogo";
        var el12UpImg   = document.createElement('img');
        el12Up.title    = "Increase";
        el12Up.onclick  = new Function("editDCARun('" + uid + "', " + i + ", 1);");
        el12UpImg.src   = "/images/scrollup.gif";
        el12UpImg.width    = "13";
        el12UpImg.height   = "9";
        el12Up.appendChild(el12UpImg);

        // numeric Decrease
        var el12Dwn     = document.createElement('a');
        el12Dwn.href    = "#nogo";
        var el12DwnImg  = document.createElement('img');
        el12Dwn.title   = "Decrease";
        el12Dwn.onclick = new Function ("editDCARun('" + uid + "', " + i + ", -1);");
        el12DwnImg.src  = "/images/scrolldown.gif";
        el12DwnImg.width    = "13";
        el12DwnImg.height   = "9";
        el12DwnImg.id   = "down";
        el12Dwn.appendChild(el12DwnImg);

        el12Ctl.appendChild(el12Up);
        el12Ctl.appendChild(el12Dwn);
        cell12.appendChild(el12Ctl);
        
        var el12b     = document.createElement('div');
        el12b.id      = BOUND_DCA.LIMITS_DCA[i].number + "_run_display" + uid;
        el12b.name    = BOUND_DCA.LIMITS_DCA[i].number + "_run_display" + uid;
        var el12c     = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].run == "")? "1" : BOUND_DCA.LIMITS_DCA[i].run);
        el12b.appendChild(el12c);
        cell12.appendChild(el12b);

        if (runNumber && !EDITDISABLED) {
          cell12.title     = "Click to change the Run Number";
          el12b.onclick = new Function ("editDCARun('" + uid + "', " + i + ", 0);");
        } else {
	  cell12.className = "grayedout";
	}

        //---------------------------------------------------------
        //  Cell 13:  Field
        //    Holds a selection box to select
        //    the field to match for the referential limit
        var cell13      = reftblRow.insertCell(5);
        cell13.className = "ni";
        var el13a       = document.createElement('input');
        el13a.type      = "text";
        el13a.id        = BOUND_DCA.LIMITS_DCA[i].number + "_field" + uid;
        el13a.name      = BOUND_DCA.LIMITS_DCA[i].number + "_field" + uid;
        if (BOUND_DCA.LIMITS_DCA[i].field != "") {
          el13a.value   = BOUND_DCA.LIMITS_DCA[i].field;
        } else {
          el13a.value   = BOUND_DCA.LIMITS_DCA[i].number;
        }
        el13a.className = "hidden";

        var el13b       = document.createElement('div');
        el13b.id        = BOUND_DCA.LIMITS_DCA[i].number + "_field_display" + uid;
        el13b.className = "";

        var el13c       = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].field == "")? "[Select]" : BOUND_DCA.LIMITS_DCA[i].field);
        el13b.appendChild(el13c);

        if (match && !EDITDISABLED) {
          cell13.title    = "Click to change the Field";
          el13b.onclick   = new Function ("changeDCAField('" + uid + "', " + i + ");");
        } else {
          cell13.className = "grayedout";
        }

        cell13.appendChild(el13a);
        cell13.appendChild(el13b);

        //---------------------------------------------------------
        //  Cell 14:  Field Value
        //    Holds a text entry box to define the field value
        //    to be used for the referential limit
        var cell14  = reftblRow.insertCell(6);
        cell14.className = "";
        var el14a   = document.createElement('input');
        el14a.type  = "text"
        el14a.className = "hidden";
        el14a.id    = BOUND_DCA.LIMITS_DCA[i].number + "_fieldValue" + uid;
        el14a.name  = BOUND_DCA.LIMITS_DCA[i].number + "_fieldValue" + uid;
        el14a.value = BOUND_DCA.LIMITS_DCA[i].fieldValue;
        el14a.onblur = new Function ("saveDCAChangedFieldValue('" + uid + "', " + i + ");");

        var el14b  = document.createElement('span');
        var el14c  = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].fieldValue == "")? "[Empty]" : BOUND_DCA.LIMITS_DCA[i].fieldValue);
        el14b.id   = BOUND_DCA.LIMITS_DCA[i].number + "_fieldValue_display" + uid;
        el14b.appendChild(el14c);

        if (match && !EDITDISABLED) {
          cell14.title     = "Click to edit the Field Value";
          el14b.onclick   = new Function ("setDCAFieldValue('" + uid + "', " + i + ");");
        } else {
          cell14.className = "grayedout";
        }

        cell14.appendChild(el14a);
        cell14.appendChild(el14b);
      }

      //---------------------------------------------------------
      //  Cell 3:  Limit Parameter
      //    Holds a selection box for the parameter that the limit
      //    is assigned to
      var cell3      = row.insertCell(3);
      cell3.className = "ni";

      var el3a       = document.createElement('input');
      el3a.type      = "text";
      el3a.id        = BOUND_DCA.LIMITS_DCA[i].number + "_limitParameter" + uid;
      el3a.name      = BOUND_DCA.LIMITS_DCA[i].number + "_limitParameter" + uid;
      el3a.value     = BOUND_DCA.LIMITS_DCA[i].parameter;
      el3a.className = "hidden";

      var el3b       = document.createElement('div');
      el3b.id        = BOUND_DCA.LIMITS_DCA[i].number + "_limitParameter_display" + uid;
      el3b.className = "";

      var el3c       = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].parameter == "")? "[Select]" : BOUND_DCA.LIMITS_DCA[i].parameter);
      el3b.appendChild(el3c);
      
      if (!EDITDISABLED) {
        cell3.title    = "Click to change the Parameter";
        el3b.onclick   = new Function ("changeDCAParameter('" + uid + "', " + i + ");");
      } else {
        cell3.className = "grayedout";
      }

      cell3.appendChild(el3a);
      cell3.appendChild(el3b);

      //---------------------------------------------------------
      //  Cell 4:  Comparison
      //    Holds a selection box to select the comparison for the limit
      var cell4      = row.insertCell(4);
      cell4.className = "ni";

      var el4a       = document.createElement('input');
      el4a.type      = "text";
      el4a.id        = BOUND_DCA.LIMITS_DCA[i].number + "_limitComparison" + uid;
      el4a.name      = BOUND_DCA.LIMITS_DCA[i].number + "_limitComparison" + uid;
      
      // This is necessary because IE converts to "<=" and ">=" casuing problems.
      var el4Value  = BOUND_DCA.LIMITS_DCA[i].comparison;
      if (el4Value == ">=") {
      	el4Value    = "\u2265";
      }
      else if (el4Value == "<=") {
      	el4Value    = "\u2264";
      }
      el4a.value     = el4Value;
      el4a.className = "hidden";

      var el4b       = document.createElement('div');
      var el4c       = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].comparison == "")? "[Select]" : el4Value);
      el4b.id        = BOUND_DCA.LIMITS_DCA[i].number + "_limitComparison_display" + uid;
      el4b.appendChild(el4c);
      el4b.className = "";

      if (!EDITDISABLED) {
        cell4.title     = "Click to change the Comparison";
        el4b.onclick   = new Function ("changeDCAComparison('" + uid + "', " + i + ");");
      } else {
        cell4.className = "grayedout";
      }

      cell4.appendChild(el4a);
      cell4.appendChild(el4b);

      //---------------------------------------------------------
      //  Cell 5:  Operation
      //    Holds a selection box to select
      //    the operation for the limit
      var cell5      = row.insertCell(5);
      cell5.className = "ni";

      var el5a       = document.createElement('input');
      el5a.type      = "text";
      el5a.id        = BOUND_DCA.LIMITS_DCA[i].number + "_operation" + uid;
      el5a.name      = BOUND_DCA.LIMITS_DCA[i].number + "_operation" + uid;
      el5a.value     = BOUND_DCA.LIMITS_DCA[i].operation;
      el5a.className = "hidden";

      var el5b       = document.createElement('div');
      el5b.id        = BOUND_DCA.LIMITS_DCA[i].number + "_operation_display" + uid;
      el5b.className = "";

      var el5c       = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].operation == "")? "[Select]" : BOUND_DCA.LIMITS_DCA[i].operation);
      el5b.appendChild(el5c);
      if (referential && !EDITDISABLED) {
        cell5.title     = "Click to edit the Operation";
        el5b.onclick   = new Function ("changeDCAOperation('" + uid + "', " + i + ");");
      } else {
        cell5.className = "grayedout";
      }

      cell5.appendChild(el5a);
      cell5.appendChild(el5b);

      //---------------------------------------------------------
      //  Cell 6:  Value
      //    Holds a selection box to select
      //    the value for the limit
      var cell6      = row.insertCell(6);
      cell6.className = "ni";

      var el6a       = document.createElement('input');
      el6a.type      = "text";
      el6a.id        = BOUND_DCA.LIMITS_DCA[i].number + "_value" + uid;
      el6a.name      = BOUND_DCA.LIMITS_DCA[i].number + "_value" + uid;
      el6a.value     = BOUND_DCA.LIMITS_DCA[i].value;
      el6a.className = "hidden";
      el6a.onblur = new Function ("saveDCAChangedValue('" + uid + "', " + i + ");");

      var el6b       = document.createElement('span');
      var el6c       = document.createTextNode((BOUND_DCA.LIMITS_DCA[i].value == "")? "[Empty]" : BOUND_DCA.LIMITS_DCA[i].value);
      el6b.id        = BOUND_DCA.LIMITS_DCA[i].number + "_value_display" + uid;
      el6b.appendChild(el6c);
      
      if (!EDITDISABLED) {
        cell6.title     = "Click to edit the  Value";
        el6b.onclick   = new Function ("setDCAValue('" + uid + "', " + i + ");");
      } else {
        cell6.className = "grayedout";
      }

      cell6.appendChild(el6a);
      cell6.appendChild(el6b);
      
      //---------------------------------------------------------
      //  Cell 7:  Filler Cell
      //    Holds a blank cell as a filler cell
      row.insertCell(7);
    }

    // everything's added - paint the table styles
    setDCALimitTableRows(uid);
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
function removeDCALimit(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  BOUND_DCA.LIMITS_DCA.splice(i, 1);
  
  for (j=i; j<BOUND_DCA.LIMITS_DCA.length; j++) {
    BOUND_DCA.LIMITS_DCA[j].number = BOUND_DCA.LIMITS_DCA[j].number - 1;
  }

  if (i == BOUND_DCA.LIMITS_DCA.length) {
    i--;
  }
  makeChanges();
  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 2:  Change Referential Limit
//---------------------------------------------------------
function setDCALimitReferential(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  BOUND_DCA.LIMITS_DCA[i].referential = !(BOUND_DCA.LIMITS_DCA[i].referential);
  makeChanges();
  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 3:  Change Limit Parameter
//---------------------------------------------------------
function changeDCAParameter(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_limitParameter_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all parameters
  var A = getDCAParameterValues();

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);

  // search array for index of parameter
  var index = A.indexOf(BOUND_DCA.LIMITS_DCA[i].parameter);

  s.selectedIndex = index;
  s.onchange = new Function ("saveDCAChangedParameter('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveDCAChangedParameter('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveDCAChangedParameter(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j = s.options[s.selectedIndex].value; // get the parameter value
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new parameter
  if (j != BOUND_DCA.LIMITS_DCA[i].parameter) {
    BOUND_DCA.LIMITS_DCA[i].parameter = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildDCALimitsTable(uid);
}

function getDCAParameterValues() {
  return ["Attenuation", "Zin", "Zout", "R1", "R2", "R3", "Rab", "Rac", "Rbc"];
}

//---------------------------------------------------------
//  Limit Table Cell 4:  Change Limit Comparison
//---------------------------------------------------------
function changeDCAComparison(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_limitComparison_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all comparisons
  var A = getDCAComparisonValues();

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);
  
  // This is necessary because IE converts to "<=" and ">=" casuing problems.
  var comparison = BOUND_DCA.LIMITS_DCA[i].comparison;
  if (comparison == ">=") {
    comparison = "\u2265";
  }
  else if (comparison == "<=") {
    comparison = "\u2264";
  }
  // search array for index of comparison
  var index = A.indexOf(comparison);

  s.selectedIndex = index;
  s.onchange = new Function ("saveDCAChangedComparison('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveDCAChangedComparison('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveDCAChangedComparison(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j = s.options[s.selectedIndex].value; // get the comparison value
  }

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new comparison
  if (j != BOUND_DCA.LIMITS_DCA[i].comparison) {
    BOUND_DCA.LIMITS_DCA[i].comparison = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildDCALimitsTable(uid);
}

function getDCAComparisonValues() {
  return [">", "\u2265", "<", "\u2264"];
}

//---------------------------------------------------------
//  Limit Table Cell 5:  Change Limit Operation
//---------------------------------------------------------
function changeDCAOperation(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_operation_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create array of all Operations
  var A = getDCAOperationValues();

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);
  
  // search array for index of operation
  var index = A.indexOf(BOUND_DCA.LIMITS_DCA[i].operation);

  s.selectedIndex = index;
  s.onchange = new Function ("saveDCAChangedOperation('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveDCAChangedOperation('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveDCAChangedOperation(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the operation value
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new operation
  if (j != BOUND_DCA.LIMITS_DCA[i].operation) {
    BOUND_DCA.LIMITS_DCA[i].operation = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildDCALimitsTable(uid);
}

function getDCAOperationValues() {
  return ["+", "-"];
}

//---------------------------------------------------------
//  Limit Table Cell 6:  Change Limit Value
//---------------------------------------------------------
function setDCAValue(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_value_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text";
  t.id  = lname + "_text" + uid;
  t.value = BOUND_DCA.LIMITS_DCA[i].value;
  t.onblur = new Function ("this.value = validateNumeric(this.value); saveDCAChangedValue('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveDCAChangedValue(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var t     = document.getElementById(lname + "_text" + uid);
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new field value
  if (j != BOUND_DCA.LIMITS_DCA[i].value) {
    BOUND_DCA.LIMITS_DCA[i].value = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 7:  Change Referential Type
//---------------------------------------------------------
function changeDCAReferentialLimitType(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_refType_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all referential limit types
  var A = getDCAReferentialLimitTypes();

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);
  
  // search array for index of referential limit type
  var index = A.indexOf(BOUND_DCA.LIMITS_DCA[i].refType);

  s.selectedIndex = index;
  s.onchange = new Function ("saveDCAChangedReferentialLimitType('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveDCAChangedReferentialLimitType('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveDCAChangedReferentialLimitType(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the referential limit type text
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new referential limit type
  if (j != BOUND_DCA.LIMITS_DCA[i].refType) {
    BOUND_DCA.LIMITS_DCA[i].refType = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildDCALimitsTable(uid);
}

function getDCAReferentialLimitTypes() {
  return ["Current", "Specify"];
}

//---------------------------------------------------------
//  Limit Table Cell 8:  Set Model Number
//---------------------------------------------------------
function setDCAModelNumber(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_refModel_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text";
  t.id  = lname + "_text" + uid;
  t.value = BOUND_DCA.LIMITS_DCA[i].model;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveDCAChangedModel('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveDCAChangedModel(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var t     = document.getElementById(lname + "_text" + uid);
  var j     = t.value; // get the model number text

  // don't make changes if they didn't select a new model number
  if (j != BOUND_DCA.LIMITS_DCA[i].model) {
    BOUND_DCA.LIMITS_DCA[i].model = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 9:  Set Serial Number
//---------------------------------------------------------
function setDCASerialNumber(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_refSerial_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a text box to show
  var t = document.createElement('input');
  t.type = "text";
  t.id  = lname + "_text" + uid;
  t.value = BOUND_DCA.LIMITS_DCA[i].serial;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveDCAChangedSerial('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveDCAChangedSerial(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var t     = document.getElementById(lname + "_text" + uid);
  var j     = t.value; // get the serial number text

  // don't make changes if they didn't select a new serial number
  if (j != BOUND_DCA.LIMITS_DCA[i].serial) {
    BOUND_DCA.LIMITS_DCA[i].serial = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 10:  Change Run Type
//---------------------------------------------------------
function changeDCARunType(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_runType_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create array of all run types
  var A = getDCARunTypes();

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, A, A);

  // search array for index of run type
  var index = A.indexOf(BOUND_DCA.LIMITS_DCA[i].runType);

  s.selectedIndex = index;
  s.onchange = new Function ("saveDCAChangedRunType('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveDCAChangedRunType('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveDCAChangedRunType(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the run type text
  }

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new run type
  if (j != BOUND_DCA.LIMITS_DCA[i].runType) {
    BOUND_DCA.LIMITS_DCA[i].runType = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildDCALimitsTable(uid);
}

function getDCARunTypes(A) {
  return ["Most Recent", "Run #", "Match Field"];
}

//---------------------------------------------------------
//  Limit Table Cell 11:  Run Number
//---------------------------------------------------------
// the global and armDCASaveRun() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveDCARun() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Run table cell -> editDCARun(i) runs
//   2a) User clicks off now visible control -> armDCASaveRun()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armDCASaveRun() function will be cleared by the newest
//       editDCARune() call.
var DCARUNTIMER = 0;
function armDCASaveRun(uid, i) {
  DCARUNTIMER = setTimeout("saveDCARun('" + uid + "', " + i + ")", 250);
}
function editDCARun(uid, i, scroll) {
  var BOUND_DCA = getDCABoundObject(uid);
  // clear pending changes since
  // we're making more
  clearTimeout(DCARUNTIMER);

  var s = document.getElementById(BOUND_DCA.LIMITS_DCA[i].number + "_run" + uid);

  s.value = parseInt(s.value) + scroll;
  (s.value < 1) ? s.value = "1" : s.value += '';

  document.getElementById(BOUND_DCA.LIMITS_DCA[i].number + "_run_display" + uid).className = "hidden";
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  document.getElementById(BOUND_DCA.LIMITS_DCA[i].number + "_run_control" + uid).className = "";
}

function saveDCARun(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var s = document.getElementById(BOUND_DCA.LIMITS_DCA[i].number + "_run" + uid);

  // validate new entry to positive integer and replace with previous if errors
  if (!isInteger(s.value) || s.value < 1) s.value = STEPS[i].repeat;

  if (s.value != BOUND_DCA.LIMITS_DCA[i].run) {
    BOUND_DCA.LIMITS_DCA[i].run = s.value;  // update changes to LIMITS_DCA array
    makeChanges();
  }

  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 12:  Change Field
//---------------------------------------------------------
function changeDCAField(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_field_display" + uid);

  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = lname + "_select" + uid;
  addStringOptions(s, BOUND_DCA.fields, BOUND_DCA.fields);
  
  // search array for index of run type
  var index = BOUND_DCA.fields.indexOf(BOUND_DCA.LIMITS_DCA[i].field);

  s.selectedIndex = index;
  s.onchange = new Function ("saveDCAChangedField('" + uid + "', " + i + ");");   // handle storing after edit
  s.onblur = new Function ("saveDCAChangedField('" + uid + "', " + i + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveDCAChangedField(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var s     = document.getElementById(lname + "_select" + uid);
  var j     = "";
  if (s.selectedIndex >= 0) {
    var j     = s.options[s.selectedIndex].value; // get the field
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new run type
  if (j != BOUND_DCA.LIMITS_DCA[i].field) {
    BOUND_DCA.LIMITS_DCA[i].field = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
//  Limit Table Cell 13:  Change Field Value
//---------------------------------------------------------
function setDCAFieldValue(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var dtext = document.getElementById(lname + "_fieldValue_display" + uid);
  
  // hide currenlty displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text";
  t.id  = lname + "_text" + uid;
  t.value = BOUND_DCA.LIMITS_DCA[i].fieldValue;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("saveDCAChangedFieldValue('" + uid + "', " + i + ");");   // handle storing after edit
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

function saveDCAChangedFieldValue(uid, i) {
  var BOUND_DCA = getDCABoundObject(uid);
  var lname = BOUND_DCA.LIMITS_DCA[i].number;
  var t     = document.getElementById(lname + "_text" + uid);
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new field value
  if (j != BOUND_DCA.LIMITS_DCA[i].fieldValue) {
    BOUND_DCA.LIMITS_DCA[i].fieldValue = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
//  Add new limit to the table
//---------------------------------------------------------
function addDCALimit(uid) {
  var BOUND_DCA = getDCABoundObject(uid);
  BOUND_DCA.LIMITS_DCA[BOUND_DCA.LIMITS_DCA.length] = new LIMIT_DCA(BOUND_DCA.LIMITS_DCA.length, "Attenuation", ">", "+", "", false, "Current", "", "", "Most Recent", "1", "", "");

  makeChanges();
  buildDCALimitsTable(uid);
}

//---------------------------------------------------------
// BOUND_DCA UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// Gets the BOUND_DCA object with the unique id
//---------------------------------------------------------
function getDCABoundObject(uid) {
  try {  // IE craps the bed on the eval if not yet eval'ed
    eval('BOUND_DCA' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('boundSetup' + uid).value);
  }
  return (eval('BOUND_DCA' + uid));
}

//---------------------------------------------------------
// Displays the BOUND_DCA object for debugging
//---------------------------------------------------------
function displayDCABound(m) {
    var output = 'BOUND_DCA:\n\n';
    for (i in m)
         output += i + ' = ' + m[i] + '\n';
    alert(output);
}

//---------------------------------------------------------
// Sets LIMIT_DCA table row styling to alternate colors
//---------------------------------------------------------
function setDCALimitTableRows(uid) {
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
//  UTILITY FUNCTIONS
//---------------------------------------------------------

//---------------------------------------------------------
// last call MUST be the init using this
// temporary UID global defined in
// editstep.js - initStep() function
//---------------------------------------------------------
//initStepDCAttenuation(TEMPSTEPUID);