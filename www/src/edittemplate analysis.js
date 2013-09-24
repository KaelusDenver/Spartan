//---------------------------------------------------------------UTILITY FUNCTIONS---------------------------------------------------------------------

//---------------------------------------------------------
// This function intializes the page
//---------------------------------------------------------
function initializePage() {
  THEMENU = initMenu('tempTab', 'tempTabLink', 3, 'tabbody', 'active', '');
  if ($('#menuTab').val() == 0) {
    $('#menuTab').val(1);
  }
  showMenuItem(THEMENU, $('#menuTab').val());
  $('#tempTabLink0').removeAttr('onClick');
  $('#tempTabLink0').attr('className', 'grayedout');

  $('#copylink').attr('href', $('#copylink').attr('href') + encodeURIComponent(TEMPLATE.sxTemplateId));
  $('#deletelink').attr('href', $('deletelink').attr('href') + encodeURIComponent(TEMPLATE.sxTemplateId));

  // Set up the TEMPLATE parameters
  $('#templateId').val(TEMPLATE.sxTemplateId);
  $('#sDescription').val(TEMPLATE.sDescription);
  initTemplateStyle(TEMPLATE.sStyleProcess);

  // set the create/modify dates...
  var d = new Date(jsTimeFromLV(TEMPLATE.tCreationDate));
  $('#createDate').text(d.format(SPARTANDATE));
  d = new Date(jsTimeFromLV(TEMPLATE.tModifiedDate));
  $('#modifyDate').text(d.format(SPARTANDATE));
  
  // Set up the LAYOUT parameters
//  $('#pageSize').val(LAYOUT.sPageSize);
//  disable = LAYOUT.sPageSize != "Custom";
//  $('#pageWidth').attr('disabled', disable);
//  $('#pageHeight').attr('disabled', disable);
//  $('#pageWidth').val(LAYOUT.dWidth);
//  $('#pageHeight').val(LAYOUT.dHeight);
//  $('#orientation' + LAYOUT.sOrientation).attr('checked', true);
  $('#outputFormat').val(TEMPLATE.sFormat)
                    .children("[value='TXT']").removeAttr('disabled');
  $('#orientation' + LAYOUT.sOrientation).attr('checked', true);
  $('#orientationIMG').attr('src', '/images/' + LAYOUT.sOrientation + '.gif');

  // Set up the BODY parameters

  var A = [], B = [];
  for(var i=0; i<INDEXEDFIELDS.length; i++) {
    if (INDEXEDFIELDS[i].sUnits == "") {
      A[i] = INDEXEDFIELDS[i].sDisplayName;
    } else {
      A[i] = INDEXEDFIELDS[i].sDisplayName + " (" + INDEXEDFIELDS[i].sUnits + ")";
    }
    B[i] = INDEXEDFIELDS[i].sxFieldId;
  }
  addStringOptions(document.getElementById("sortField"), A, B);

  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  addStringOptions(document.getElementById("testType"), TESTS, TESTS);

  A = [], B = [];
  for(var i=0; i<PIFIELDS.length; i++) {
    A[i] = PIFIELDS[i].sDisplayName;
    B[i] = PIFIELDS[i].sxFieldId;
  }
  addStringOptions(document.getElementById("PIField"), A, B);

  updateAnalysisType(BODY.sAnalysisType);

}

//----------------------------------------------------------
// Builds template keys
//----------------------------------------------------------
function buildTemplateKeys(){
  var templateKeys = "";

  // TEMPLATE
  templateKeys = templateKeys + "sxTemplateId=" + TEMPLATE.sxTemplateId + "&";
  templateKeys = templateKeys + "sStyle=" + TEMPLATE.sStyle + "&";
  templateKeys = templateKeys + "sStyleProcess=" + TEMPLATE.sStyleProcess + "&";
  templateKeys = templateKeys + "sEditor=" + TEMPLATE.sEditor + "&";
  templateKeys = templateKeys + "sFilename=" + TEMPLATE.sFilename + "&";
  templateKeys = templateKeys + "sScript=" + TEMPLATE.sScript + "&";
  templateKeys = templateKeys + "sFormat=" + TEMPLATE.sFormat + "&";
  templateKeys = templateKeys + "sType=" + TEMPLATE.sType + "&";
  templateKeys = templateKeys + "sLayout=" + TEMPLATE.sLayout + "&";

  // LAYOUT
  templateKeys = templateKeys + "sPageSize=" + LAYOUT.sPageSize + "&";
  templateKeys = templateKeys + "dWidth=" + LAYOUT.dWidth + "&";
  templateKeys = templateKeys + "dHeight=" + LAYOUT.dHeight + "&";
  templateKeys = templateKeys + "sOrientation=" + LAYOUT.sOrientation + "&";

  var keys = BODY.KEYS;;
  var values = BODY.VALUES;

  if (values[keys.indexOf("Autoscale")]) {
    values[keys.indexOf("Start")] = "";
    values[keys.indexOf("Stop")] = "";
  }

  // CUSTOM FIELDS FOR CUSTOM PLOTS
  for (var i=0; i<CFIDS.length; i++) {
    templateKeys = templateKeys + "FieldID_" + (i + 1) + "=" + encodeURIComponent(CFIDS[i].sField)+ "&";
  }

  for (var i=0; i<keys.length; i++) {
    templateKeys = templateKeys + keys[i] + "=" + values[i];
    if (i != keys.length - 1) {
      templateKeys = templateKeys + "&";
    }
  }
  
  return templateKeys;
}

//----------------------------------------------------------
// Unpacks the parameter values
//----------------------------------------------------------
function getParameters() {
  if (BODY.KEYS.indexOf("Parameter") == -1) {
    return "";
  } else {
    var temp = BODY.VALUES[BODY.KEYS.indexOf("Parameter")];
    var parameters = [];
    var j = 0;
    var k = 0;

    while (temp.length != 0) {
      k = temp.search(",");
      if (k == -1) {
        parameters[j] = temp;
        temp = "";
      } else {
        parameters[j] = temp.substring(0, k);
        temp = temp.slice(k + 1);
      }
      j++;
    }

    return parameters;
  }
}

//----------------------------------------------------------
// Packs the parameter values
//----------------------------------------------------------
function setParameters(parameters) {
  var parametersString = "";

  for(var i=0; i<parameters.length; i++) {
    parametersString = parametersString + parameters[i];
    if (i + 1 < parameters.length) {
      parametersString = parametersString + ",";
    }
  }

  return parametersString;
}

//---------------------------------------------------------------BODY OBJECT---------------------------------------------------------------------------

//---------------------------------------------------------------ANALYSIS PARAMETERS-------------------------------------------------------------------

//---------------------------------------------------------
// This function loads the settings of the current analysis
//---------------------------------------------------------
function updateAnalysisType(type) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  $('#sStyle').val(type);
  BODY.sAnalysisType = type;
  values[SearchSetKey("Analysis_Type",type)]   = type;
  $('#analysisType').val(type);
  
  switch (BODY.sAnalysisType) {
    case "Histogram":
        $('#results' + ((SearchSetKey("Histogram_Format","Counts") == -1)? "Counts"   : values[keys.indexOf("Histogram_Format")])).attr('checked', true);
        $('#bin'     + ((SearchSetKey("Histogram_Bin","Interval")  == -1)? "Interval" : values[keys.indexOf("Histogram_Bin")])).attr('checked', true);
        $('#binEntry').val((SearchSetKey("Histogram_Bin_Variable","10") == -1)? "10"  : values[keys.indexOf("Histogram_Bin_Variable")]);
    case "Statistics":
        $('#sortField').val(values[SearchSetKey("Summary_Field","Model_Number")]);
        $('#showDetail').attr('checked', (values[SearchSetKey("Details","0")] == "0" ? false :true));
  }

   // hide them all
  var divs = ["Yield", "Histogram", "Statistics"];
  for (var i=0; i<divs.length; i++) {
    $('#' + divs[i]).attr('className', 'hidden');
  }
  // show the one we want
  $('#' + type).attr('className', '');
  updateTestType(BODY.sTestType);
}

//---------------------------------------------------------------YIELD---------------------------------------------------------------------------------

//---------------------------------------------------------------HISTOGRAM-----------------------------------------------------------------------------

//---------------------------------------------------------
// Update the results format
//---------------------------------------------------------
function updateResultsFormat(format) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Histogram_Format") != -1) {
    values[keys.indexOf("Histogram_Format")] = format;
  } else {
    keys[keys.length] = "Histogram_Format";
    values[values.length] = format;
  }
  
  makeChanges();
}

//---------------------------------------------------------
// Update the bin method
//---------------------------------------------------------
function updateBinMethod(method) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Histogram_Bin") != -1) {
    values[keys.indexOf("Histogram_Bin")] = method;
  } else {
    keys[keys.length] = "Histogram_Bin";
    values[values.length] = method;
  }
  
  makeChanges();
}

//---------------------------------------------------------
// Update the bin entry
//---------------------------------------------------------
function updateBinEntry(entry) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Histogram_Bin_Variable") != -1) {
    values[keys.indexOf("Histogram_Bin_Variable")] = entry;
  } else {
    keys[keys.length] = "Histogram_Bin_Variable";
    values[values.length] = entry;
  }
  
  makeChanges();
}

//---------------------------------------------------------------STATISTICS----------------------------------------------------------------------------

//---------------------------------------------------------
// Update the sort field
//---------------------------------------------------------
function updateSortField(field) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Summary_Field") != -1) {
    values[keys.indexOf("Summary_Field")] = field;
  } else {
    keys[keys.length] = "Summary_Field";
    values[values.length] = field;
  }
  
  makeChanges();
}

//---------------------------------------------------------
// Update show details
//---------------------------------------------------------
function updateShowDetail(checked) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Details") != -1) {
    values[keys.indexOf("Details")] = checked;
  } else {
    keys[keys.length] = "Details";
    values[values.length] = checked;
  }
  
  makeChanges();
}

//---------------------------------------------------------------TEST PARAMETERS-----------------------------------------------------------------------

//---------------------------------------------------------
// This function loads the settings of the current analysis
//---------------------------------------------------------
function updateTestType(type) {
  if    (BODY.sTestType == type) {
       //alert (BODY.sTestType+" same test type "+ type);

    switch (BODY.sTestType) {
      case "S Parameter":
        var autoscale = false;
        if (BODY.VALUES[SearchSetKey("Start","")] == "" && BODY.VALUES[SearchSetKey("Stop","")] == "") {
          autoscale = true;
        }
        if (BODY.KEYS.indexOf("Autoscale") == -1) {
          BODY.KEYS[BODY.KEYS.length] = "Autoscale";
          BODY.VALUES[BODY.VALUES.length] = autoscale;
        }
      
        buildSPParametersTable();
        break;
      case "Prompted Inputs":
        $('#PIField').val(BODY.VALUES[BODY.KEYS.indexOf("Parameter")]);
        break;
      case "DC Attenuation":
        $('#DCAParameter').val(BODY.VALUES[BODY.KEYS.indexOf("Parameter")]);
        break;
      case "PIM":
        $('#PIMOrder').val(BODY.VALUES[BODY.KEYS.indexOf("Parameter")]);
        $('#PIMUnits').val(BODY.VALUES[BODY.KEYS.indexOf("Unit")]);
        break;
      }
  } else { // switching the test type need to init to default
      //alert (BODY.sTestType+" switching test type "+ type);
      switch (type) {
      case "S Parameter":
        var autoscale = false;
        if (BODY.VALUES[SearchSetKey("Start","")] == "" && BODY.VALUES[SearchSetKey("Stop","")] == "") {
          autoscale = true;
        }
        BODY.KEYS[BODY.KEYS.length] = "Autoscale";
        BODY.VALUES[BODY.VALUES.length] = autoscale;
        BODY.VALUES[SearchSetKey("Parameter","S11")] ="S11";
        BODY.VALUES[SearchSetKey("Format","Log Mag")] ="Log Mag";
        BODY.VALUES[SearchSetKey("Unit","MHz")] ="MHz";

        buildSPParametersTable();
        break;
      case "Prompted Inputs":
        document.getElementById("PIField").selectedIndex = 0;
        break;
      case "DC Attenuation":
        BODY.VALUES[SearchSetKey("Parameter","Attenuation")] ="Attenuation";

        $('#DCAParameter').val("Attenuation");
        break;
      case "PIM":
        BODY.VALUES[SearchSetKey("Parameter","3rd")] ="3rd";
        BODY.VALUES[SearchSetKey("Unit","dBm")] ="dBm";

        $('#PIMOrder').val("3rd");
        $('#PIMUnits').val("dBm");
        break;
      }
  }   // end if switching test type

  BODY.sTestType = type;
  BODY.VALUES[SearchSetKey("Test_Type",type)]   = type;

  $('#testType').val(type);

  var divs = ["DCAttenuation", "PIM", "PromptedInputs", "SParameter"];
  for (var i=0; i<divs.length; i++) {
    $('#' + divs[i]).attr('className', 'hidden');
  }
  if (((BODY.sAnalysisType == "Yield") && ( type == "Prompted Inputs")) || (BODY.sAnalysisType != "Yield")) {
    $('#' + removeSpaces(type)).attr('className', '');
  }


}

//---------------------------------------------------------------DC ATTENUATION------------------------------------------------------------------------

//---------------------------------------------------------
// Update the DCA parameter
//---------------------------------------------------------
function updateDCAParameter(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Parameter") != -1) {
    values[keys.indexOf("Parameter")] = parameter;
  } else {
    keys[keys.length] = "Parameter";
    values[values.length] = parameter;
  }
  
  makeChanges();
}

//---------------------------------------------------------------PIM-----------------------------------------------------------------------------------

//---------------------------------------------------------
// Update the PIM order
//---------------------------------------------------------
function updatePIMOrder(order) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Parameter") != -1) {
    values[keys.indexOf("Parameter")] = order;
  } else {
    keys[keys.length] = "Parameter";
    values[values.length] = order;
  }
  
  makeChanges();
}

//---------------------------------------------------------
// Update the PIM units
//---------------------------------------------------------
function updatePIMUnits(units) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Unit") != -1) {
    values[keys.indexOf("Unit")] = units;
  } else {
    keys[keys.length] = "Unit";
    values[values.length] = units;
  }
  
  makeChanges();
}

//---------------------------------------------------------------PROMPTED INPUTS-----------------------------------------------------------------------

//---------------------------------------------------------
// Update the PI field
//---------------------------------------------------------
function updatePIField(field) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Parameter") != -1) {
    values[keys.indexOf("Parameter")] = field;
  } else {
    keys[keys.length] = "Parameter";
    values[values.length] = field;
  }
  
  makeChanges();
}

//---------------------------------------------------------------S PARAMETER----------------------------------------------------------------------------

//---------------------------------------------------------
// Builds the parameters table
//---------------------------------------------------------
function buildSPParametersTable() {
  var tbl=document.getElementById('parameters');
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var i = tbl.rows.length;
  var parameter = 0;
  var parameters = getParameters();

  // first, clear existing table.  The try/catch is for Firefox...
  while (tbl.rows.length > 1) {
    try {
      tbl.deleteRow(i--);
    } catch(e) {
      tbl.deleteRow(-1);
    }
  }
  
  // This is the main loop that builds the rows
  // of the table by adding cells one at a time
  while (parameter < parameters.length) {

    var row = tbl.insertRow(tbl.rows.length); // there's a header row

    //---------------------------------------------------------
    //  Cell 0:  Parameter Number
    //    Row header showing the parameter number with
    //    a little different method here as it's a "th" element
    var cell0 = document.createElement('th');
    cell0.className = "rh";
    var el0 = document.createTextNode(parameter + 1);
    cell0.title     = "Parameter number"
    cell0.appendChild(el0);
    row.appendChild(cell0);

    //---------------------------------------------------------
    //  Cell 1:  Delete Parameter (row)
    //    Holds an icon/link to delete the row
    var cell1 = row.insertCell(1);
    cell1.className = "cb";
    var el1   = document.createElement('img');
    el1.src   = "/images/deletesmall.gif";
    el1.title = "Delete this parameter";
    el1.onclick = new Function ("removeSPParameter(" + parameter + ");");
    cell1.appendChild(el1);

    //---------------------------------------------------------
    //  Cell 2:  Parameter Reordering
    //    Holds a couple of images/links to handle
    //    reordering rows of the markers table
    var cell2 = row.insertCell(2);
    cell2.className = "cb";

    //  Move up (toward top of list; index gets smaller)
    var el2aUp    = document.createElement('a');
    el2aUp.href   = "#nogo";
    var el2aUpImg = document.createElement('img');
    el2aUpImg.className = "movers";
    if (parameter == 0) {    // disable UP on first element
      el2aUpImg.src     = "/images/upsmalldisabled.gif";
    } else {
      el2aUp.title   = "move up"
      el2aUp.onclick = new Function("this.blur(); moveSPParameter(-(" + parameter + "));");
      el2aUpImg.src  = "/images/upsmall.gif";
    }
    el2aUp.appendChild(el2aUpImg);

    //  Move down (toward bottom of list; index gets bigger)
    var el2aDwn    = document.createElement('a');
    el2aDwn.href   = "#nogo";
    var el2aDwnImg = document.createElement('img');
    el2aDwnImg.className = "movers";
    if (parameter + 1 >= parameters.length) {  // disable DOWN on last element
      el2aDwnImg.src     = "/images/downsmalldisabled.gif";
    } else {
      el2aDwn.title      = "move down"
      el2aDwn.onclick    = new Function ("this.blur(); moveSPParameter(" + parameter + ");");
      el2aDwnImg.src     = "/images/downsmall.gif";
    }
    el2aDwn.appendChild(el2aDwnImg);

    cell2.appendChild(el2aUp);
    cell2.appendChild(el2aDwn);
    
    //---------------------------------------------------------
    //  Cell 3:  Auto-Scale
    //    Holds an checkbox to auto-scale the parameter
    var cell3 = row.insertCell(3);
    cell3.className = "icon";
    var el3   = document.createElement('input');
    el3.type  = "checkbox";
    el3.id    = parameter + "_autoscale";
    el3.name  = parameter + "_autoscale";
    cell3.appendChild(el3);   // have to append before setting attributes for IE6

    if (parameter > 0) {
      el3.disabled = true;
    } else {
      el3.disabled = false;
    }
    el3.checked  = (values[SearchSetKey("Autoscale","1")] || values[keys.indexOf("Autoscale")] == 1);
    el3.onclick  = new Function ("updateSPAutoScale('" + parameter + "', this.checked);");
    el3.title    = "Auto-Scale: if checked the parameter start and stop frequencies will be automatically determined";

    //---------------------------------------------------------
    //  Cell 4:  Parameter
    //    Holds a selection box to select the parameter
    var cell4      = row.insertCell(4);
    var el4a       = document.createElement('input');
    el4a.type      = "text";
    el4a.id        = parameter + "_parameter";
    el4a.name      = parameter + "_parameter";
    el4a.value     = parameters[parameter];
    el4a.className = "hidden";

    var el4b       = document.createElement('div');
    var el4c       = document.createTextNode(parameters[parameter]);
    el4b.id        = parameter + "_parameter_display";
    el4b.appendChild(el4c);
    el4b.className = "";

    cell4.title    = "Click to change the Parameter";
    el4b.onclick   = new Function ("changeSPParameter(" + parameter + ");");

    cell4.appendChild(el4a);
    cell4.appendChild(el4b);

    //---------------------------------------------------------
    //  Cell 5:  Format
    //    Holds a selection box to select
    //    the format to display the s-parameter in
    var cell5      = row.insertCell(5);
    var el5a       = document.createElement('input');
    el5a.type      = "text";
    el5a.id        = parameter + "_format";
    el5a.name      = parameter + "_format";
    el5a.value     = values[keys.indexOf("Format")];
    el5a.className = "hidden";

    var el5b       = document.createElement('div');
    el5b.id        = parameter + "_format_display";
    el5b.className = "";


    var el5c       = document.createTextNode((keys.indexOf("Format") == -1)? "[Select]" : values[keys.indexOf("Format")]);
    el5b.appendChild(el5c);

    if (parameter > 0) {
      cell5.className = "grayedout";
    } else {
      cell5.title    = "Click to change the Format";
      el5b.onclick   = new Function ("changeSPFormat(" + parameter + ");");
    }

    cell5.appendChild(el5a);
    cell5.appendChild(el5b);

    //---------------------------------------------------------
    //  Cell 6:  Start Frequency
    //    integer value to tell what the start frequency of the
    //    display is
    var cell6       = row.insertCell(6);
    var el6a       = document.createElement('input');
    el6a.type      = "text";
    el6a.id        = parameter + "_startFreq";
    el6a.name      = parameter + "_startFreq";
    el6a.value     = values[keys.indexOf("Start")];
    el6a.title     = "Change the Scale";
    el6a.onblur    = new Function ("armSPSaveStartFreq(" + parameter + ")");  // handle saving changes
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
    var el6Ctl       = document.createElement('span');
    el6Ctl.id        = parameter + "_startFreq_control";
    el6Ctl.name      = parameter + "_startFreq_control";
    el6Ctl.className = "hidden";

    // numeric Increase
    var el6Up      = document.createElement('a');
    el6Up.href     = "#nogo";
    var el6UpImg   = document.createElement('img');
    el6Up.title    = "Increase";
    el6Up.onclick  = new Function ("editSPStartFreq(" + parameter + ", 1);");
    el6UpImg.src   = "/images/scrollup.gif";
    el6Up.appendChild(el6UpImg);

    // numeric Decrease
    var el6Dwn     = document.createElement('a');
    el6Dwn.href    = "#nogo";
    var el6DwnImg  = document.createElement('img');
    el6Dwn.title   = "Decrease";
    el6Dwn.onclick = new Function ("editSPStartFreq(" + parameter + ", -1);");
    el6DwnImg.src  = "/images/scrolldown.gif";
    el6DwnImg.id   = "down";
    el6Dwn.appendChild(el6DwnImg);

    el6Ctl.appendChild(el6Up);
    el6Ctl.appendChild(el6Dwn);
    cell6.appendChild(el6Ctl);

    var el6b     = document.createElement('div');
    el6b.id      = parameter + "_startFreq_display";
    el6b.name    = parameter + "_startFreq_display";
    var el6c     = document.createTextNode((values[keys.indexOf("Start")] == "")? "-" : values[keys.indexOf("Start")]);
    el6b.appendChild(el6c);
    cell6.appendChild(el6b);

    if (parameter > 0 || values[keys.indexOf("Autoscale")] || values[keys.indexOf("Autoscale")] == 1) {
      cell6.className = "grayedout";
    } else {
      cell6.title     = "Click to change the Start Frequency";
      el6b.onclick = new Function ("editSPStartFreq(" + parameter + ", 0);");
    }

    //---------------------------------------------------------
    //  Cell 7:  Stop Frequency
    //    integer value to tell what the stop frequency of the
    //    display is
    var cell7       = row.insertCell(7);
    var el7a       = document.createElement('input');
    el7a.type      = "text";
    el7a.id        = parameter + "_stopFreq";
    el7a.name      = parameter + "_stopFreq";
    el7a.value     = values[keys.indexOf("Stop")];
    el7a.title     = "Change the Position";
    el7a.onblur    = new Function ("armSPSaveStopFreq(" + parameter + ")");  // handle saving changes
    // this allows the user to press "ENTER" to confrim an entry
    if ($.browser.msie) {
      el7a.onkeydown = new Function ("captureReturn(this, window.event)");
    } else {
      el7a.setAttribute("onkeydown", "captureReturn(this, event);");
    }
    el7a.className = "hidden";

    cell7.className = "ctl";
    cell7.appendChild(el7a);

    // create and show numeric Increase/Decrease buttons
    var el7Ctl     = document.createElement('span');
    el7Ctl.id      = parameter + "_stopFreq_control";
    el7Ctl.name    = parameter + "_stopFreq_control";
    el7Ctl.className = "hidden";

    // numeric Increase
    var el7Up      = document.createElement('a');
    el7Up.href     = "#nogo";
    var el7UpImg   = document.createElement('img');
    el7Up.title    = "Increase";
    el7Up.onclick  = new Function("editSPStopFreq(" + parameter + ", 1);");
    el7UpImg.src   = "/images/scrollup.gif";
    el7Up.appendChild(el7UpImg);

    // numeric Decrease
    var el7Dwn     = document.createElement('a');
    el7Dwn.href    = "#nogo";
    var el7DwnImg  = document.createElement('img');
    el7Dwn.title   = "Decrease";
    el7Dwn.onclick = new Function ("editSPStopFreq(" + parameter + ", -1);");
    el7DwnImg.src  = "/images/scrolldown.gif";
    el7DwnImg.id   = "down";
    el7Dwn.appendChild(el7DwnImg);

    el7Ctl.appendChild(el7Up);
    el7Ctl.appendChild(el7Dwn);
    cell7.appendChild(el7Ctl);

    var el7b     = document.createElement('div');
    el7b.id      = parameter + "_stopFreq_display";
    el7b.name    = parameter + "_stopFreq_display";
    var el7c     = document.createTextNode((values[keys.indexOf("Stop")] == "")? "-" : values[keys.indexOf("Stop")]);
    el7b.appendChild(el7c);
    cell7.appendChild(el7b);

    if (parameter > 0 || values[keys.indexOf("Autoscale")] || values[keys.indexOf("Autoscale")] == 1) {
      cell7.className = "grayedout";
    } else {
      cell7.title     = "Click to change the Stop Frequency";
      el7b.onclick = new Function ("editSPStopFreq(" + parameter + ", 0);");
    }

    //---------------------------------------------------------
    //  Cell 8:  Units
    //    Holds a selection box to select
    //    the units of the start and stop frequencies
    var cell8      = row.insertCell(8);
    var el8a       = document.createElement('input');
    el8a.type      = "text";
    el8a.id        = parameter + "_units";
    el8a.name      = parameter + "_units";
    el8a.value     = values[keys.indexOf("Unit")];
    el8a.className = "hidden";

    var el8b       = document.createElement('div');
    el8b.id        = parameter + "_units_display";
    el8b.className = "";


    var el8c       = document.createTextNode((keys.indexOf("Unit") == -1)? "[Select]" : values[keys.indexOf("Unit")]);
    el8b.appendChild(el8c);

    cell8.title    = "Click to change the Units";
    el8b.onclick   = new Function ("changeSPUnits(" + parameter + ");");


    cell8.appendChild(el8a);
    cell8.appendChild(el8b);

    //---------------------------------------------------------
    //  Cell 9:  Filler Cell
    //    Holds a blank cell as a filler cell
    row.insertCell(9);

    parameter++;
  }
  
  // insert trace number into add trace function
  document.getElementById('aAddSPParameter').onclick = function(){this.blur(); addSPParameter(parameter);};
  
  // everything's added - paint the table styles
  $("#parameters tbody > tr:nth-child(odd)").addClass("o");      // zebra stripes
}

//---------------------------------------------------------
//  Parameters Table Cell 1:  Remove Parameter (row)
//---------------------------------------------------------
function removeSPParameter(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var parameters = getParameters();

  parameters.splice(parameters.indexOf(parameter), 1);
  values[keys.indexOf("Parameter")] = setParameters(parameters);

  buildSPParametersTable();
  makeChanges();
}

//---------------------------------------------------------
//  Parameters Table Cell 2:  Reorder Traces
//---------------------------------------------------------
function moveSPParameter(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var parameters = getParameters();

  var dir = 1;
  if (parameter < 0) {
    dir = -1;
    parameter = -parameter;
  }
  
  var temp = parameters[parameters.indexOf(parameters[parameter + dir])];
  parameters[parameter + dir] = parameters[parameter];
  parameters[parameter] = temp;

//  parameters[indexParameter1] = (parameter + dir);
//  parameters[indexParameter2] = parameter;
  values[keys.indexOf("Parameter")] = setParameters(parameters);

  buildSPParametersTable();
  makeChanges();
}

//---------------------------------------------------------
//  Parameters Table Cell 3:  Auto Scale
//---------------------------------------------------------
function updateSPAutoScale(parameter, autoScale) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;

  if (keys.indexOf("Autoscale") != -1) {
    values[keys.indexOf("Autoscale")] = autoScale;
  } else {
    keys[keys.length] = "Autoscale";
    values[values.length] = autoScale;
  }

  buildSPParametersTable();
  makeChanges();
}

//---------------------------------------------------------
//  Parameters Table Cell 4:  Change Parameter
//---------------------------------------------------------
function changeSPParameter(parameter) {
  var parameters = getParameters();
  var dtext = document.getElementById(parameter + "_parameter_display");

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = parameter + "_select";
  var A = ["All", "S11", "S12", "S21", "S22", "---", "S13", "S14", "S15", "S16", "S17", "S18", "S23", "S24", "S25", "S26", "S27", "S28", "S31", "S32", "S33", "S34", "S35", "S36", "S37", "S38", "S41", "S42", "S43", "S44", "S45", "S46", "S47", "S48", "S51", "S52", "S53", "S54", "S55", "S56", "S57", "S58", "S61", "S62", "S63", "S64", "S65", "S66", "S67", "S68", "S71", "S72", "S73", "S74", "S75", "S76", "S77", "S78", "S81", "S82", "S83", "S84", "S85", "S86", "S87", "S88"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(parameters[parameter]);
  s.options[5].disabled = true;
  for (var i=0; i<parameters.length; i++) {
    if (i != parameter) {
      s.options[A.indexOf(parameters[i])].disabled = true;
    }
  }
  s.onchange = new Function ("saveSPChangedParameter(" + parameter + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedParameter(" + parameter + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedParameter(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var parameters = getParameters();
  var proceed = true;
  var s     = document.getElementById(parameter + "_select");
  var j     = s.options[s.selectedIndex].value;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  if (j == "All" && parameters.length > 1) {
    proceed = false;
    if(confirm("All is a single parameter analysis.\nContinuing will remove all other parameters from the analysis.")) {
      parameters = [];
      parameter = 0;
      proceed = true;
    }
  }
   
  // don't make changes if they didn't select a new parameter
  if (j != parameters[parameter] && proceed) {
    parameters[parameter] = j;
    values[keys.indexOf("Parameter")] = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPParametersTable();
}

//---------------------------------------------------------
//  Parameters Table Cell 5:  Change Format
//---------------------------------------------------------
function changeSPFormat(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var dtext = document.getElementById(parameter + "_format_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = parameter + "_select";
  var A = ["Log Mag", "Phase", "Delay", "Lin Mag", "SWR", "Loss", "Expanded Phase"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(values[keys.indexOf("Format")]);
  s.onchange = new Function ("saveSPChangedFormat(" + parameter + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedFormat(" + parameter + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedFormat(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var s     = document.getElementById(parameter + "_select");
  var j     = s.options[s.selectedIndex].value;
 
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  if (j != values[keys.indexOf("Format")]) {
      values[keys.indexOf("Format")] = j;
      makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPParametersTable();
}

//---------------------------------------------------------
//  Parameters Table Cell 6:  Change Start Frequency
//---------------------------------------------------------
// the global and armSPSaveStartFreq() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPStartFreq() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks StartFreq table cell -> editSPStartFreq(parameter) runs
//   2a) User clicks off now visible control -> armSPSaveStartFreq()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveStartFreq() function will be cleared by the newest
//       editSPStartFreq() call.
var STARTFREQTIMER = [0,0];
function armSPSaveStartFreq(parameter) {
  STARTFREQTIMER[parameter] = setTimeout("saveSPStartFreq(" + parameter + ")", 250);
}

function editSPStartFreq(parameter, scroll) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  // clear pending changes since
  // we're making more
  clearTimeout(STARTFREQTIMER[parameter]);

  var s = document.getElementById(parameter + "_startFreq");

  s.value = Number(s.value) + scroll;
  (s.value <= 0) ? s.value = "1" : s.value += '';

  $('#' + parameter + '_startFreq_display').attr('className', 'hidden');
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  $('#' + parameter + '_startFreq_control').attr('className', '');
}

function saveSPStartFreq(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var s = document.getElementById(parameter + "_startFreq");
  var startFreq = values[keys.indexOf("Start")];

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value || validateNumeric(s.value) <= 0) {
    s.value = startFreq;
  }

  if (s.value != values[keys.indexOf("Start")]) {
    if (keys.indexOf("Start") != -1) {
      values[keys.indexOf("Start")] = s.value;
    } else {
      keys[keys.length] = "Start";
      values[values.length] = s.value;
    }
    makeChanges();
  }

  buildSPParametersTable();
}

//---------------------------------------------------------
//  Parameters Table Cell 7:  Change Stop Frequency
//---------------------------------------------------------
// the global and armSPSaveStopFreq() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPStopFreq() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks StopFreq table cell -> editSPStopFreq(parameter) runs
//   2a) User clicks off now visible control -> armSPSaveStopFreqn()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveStopFreq() function will be cleared by the newest
//       editSPStopFreq() call.
var STOPFREQTIMER = [0,0];
function armSPSaveStopFreq(parameter) {
  STOPFREQTIMER[parameter] = setTimeout("saveSPStopFreq(" + parameter + ")", 250);
}
function editSPStopFreq(parameter, scroll) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  // clear pending changes since
  // we're making more
  clearTimeout(STOPFREQTIMER[parameter]);

  var s = document.getElementById(parameter + "_stopFreq");

  s.value = Number(s.value) + scroll;
  (s.value <= 0) ? s.value = "1" : s.value += '';

  $('#' + parameter + '_stopFreq_display').attr('className', 'hidden');
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  $('#' + parameter + '_stopFreq_control').attr('className', '');
}

function saveSPStopFreq(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var s = document.getElementById(parameter + "_stopFreq");
  var stopFreq = values[keys.indexOf("Stop")];

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value || validateNumeric(s.value) <= 0) {
    s.value = stopFreq;
  }

  if (s.value != values[keys.indexOf("Stop")]) {
    if (keys.indexOf("Stop") != -1) {
      values[keys.indexOf("Stop")] = s.value;
    } else {
      keys[keys.length] = "Stop";
      values[values.length] = s.value;
    }
    makeChanges();
  }

  buildSPParametersTable();
}

//---------------------------------------------------------
//  Parameters Table Cell 8:  Change Units
//---------------------------------------------------------
function changeSPUnits(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var dtext = document.getElementById(parameter + "_units_display");

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = parameter + "_select";
  A = ["Hz", "kHz", "MHz", "GHz"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(values[keys.indexOf("Unit")]);
  s.onchange = new Function ("saveSPChangedUnits(" + parameter + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedUnits(" + parameter + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedUnits(parameter) {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var s     = document.getElementById(parameter + "_select");
  var j     = s.options[s.selectedIndex].value;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  if (j != values[keys.indexOf("Unit")]) {
    if (keys.indexOf("Unit") != -1) {
      values[keys.indexOf("Unit")] = j;
    } else {
      keys[keys.length] = "Unit";
      values[values.length] = j;
    }
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPParametersTable();
}

//---------------------------------------------------------
// Adds a parameter to the parameters table
//---------------------------------------------------------
function addSPParameter(parameter) {
  var parameters = getParameters();

  if (parameters[0] == "All") {
    alert("There can one be one parameter if All is selected as the parameters type.");
  } else {
    toggleVisible('add_sp_parameter');
    toggleVisible('aAddSPParameter');

    var s = document.getElementById('add_sp_parameter_value');

    s.options.length = 0;  // clear all previous
    s.disabled = false;    // enable drop-down
    var A = ["All", "S11", "S12", "S21", "S22", "---", "S13", "S14", "S15", "S16", "S17", "S18", "S23", "S24", "S25", "S26", "S27", "S28", "S31", "S32", "S33", "S34", "S35", "S36", "S37", "S38", "S41", "S42", "S43", "S44", "S45", "S46", "S47", "S48", "S51", "S52", "S53", "S54", "S55", "S56", "S57", "S58", "S61", "S62", "S63", "S64", "S65", "S66", "S67", "S68", "S71", "S72", "S73", "S74", "S75", "S76", "S77", "S78", "S81", "S82", "S83", "S84", "S85", "S86", "S87", "S88"];
    addStringOptions(s, A, A);
    s.options[5].disabled = true
    for (var i=0; i<parameters.length; i++) {
      s.options[A.indexOf(parameters[i])].disabled = true;
    }
    s.selectedIndex = 0;
    while (s.options[s.selectedIndex].disabled) {
      s.selectedIndex = s.selectedIndex + 1;
    }
    s.focus();
  }
}

function saveAddedSPParameter() {
  var keys = BODY.KEYS;
  var values = BODY.VALUES;
  var parameters = getParameters();
  var parameter = $('#add_sp_parameter_value').val();
  var proceed = true;

  if (parameter == "All" && parameters.length > 0) {
    proceed = false;
    if(confirm("All is a single parameter analysis.\nContinuing will remove all other parameters from the analysis.")) {
      parameters = [];
      proceed = true;
    }
  }

  if (proceed) {
    parameters[parameters.length] = parameter;
    values[keys.indexOf("Parameter")] = setParameters(parameters);

    buildSPParametersTable();
    makeChanges();
  }

  toggleVisible('add_sp_parameter');
  toggleVisible('aAddSPParameter');
}