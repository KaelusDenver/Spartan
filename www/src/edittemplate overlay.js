//---------------------------------------------------------------UTILITY FUNCTIONS---------------------------------------------------------------------

//---------------------------------------------------------
// This function intializes the page
//---------------------------------------------------------
function initializePage() {
  THEMENU = initMenu('tempTab', 'tempTabLink', 3, 'tabbody', 'active', '');
  showMenuItem(THEMENU, $('#menuTab').val());

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
                    .children("[value='PDF']").removeAttr('disabled');
  $('#orientation' + LAYOUT.sOrientation).attr('checked', true);
  $('#orientationIMG').attr('src', '/images/' + LAYOUT.sOrientation + '.gif');
  
  // Set up the HEADER parameters
  $('#plotLabel').val(HEADER.sPlotLabel);
              var testoption = [];
  var ti = 0;

  if (TESTS.indexOf("S Parameter") != -1) {
    testoption[ti] = "S Parameter";
    ti = 1;
  }

  if (TESTS.indexOf("PIM") != -1) {
    testoption[ti] = "PIM";
  }

  addStringOptions(document.getElementById("dataSource"), testoption, testoption);

  // Set up the BODY parameters
  loadPlot();
}
//---------------------------------------------------------
// CHANGE the data source for the current plot
//---------------------------------------------------------
function changeDataSource(dataSource) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;

  keys.slice(0, keys.length -1);
  values.slice(0, values.length -1);

  switch (dataSource) {
    case "S Parameter":
      values.splice(keys.indexOf("Curve1_Parameter"), 1);
      keys.splice(keys.indexOf("Curve1_Parameter"), 1);
      values.splice(keys.indexOf("Curve1_LimitOn"), 1);
      keys.splice(keys.indexOf("Curve1_LimitOn"), 1);
      values.splice(keys.indexOf("Curve1_LimitFill"), 1);
      keys.splice(keys.indexOf("Curve1_LimitFill"), 1);
      values.splice(keys.indexOf("Y_Min"), 1);
      keys.splice(keys.indexOf("Y_Min"), 1);
      values.splice(keys.indexOf("Y_Max"), 1);
      keys.splice(keys.indexOf("Y_Max"), 1);
      values[SearchSetKey_DS("X_Min", "500")] = "500";
      values[SearchSetKey_DS("X_Max", "1500")] = "1500";
      values[SearchSetKey_DS("X_Unit", "MHz")] = "MHz";
      values[SearchSetKey_DS("AxisType", "Default")] = "Default";
      values[SearchSetKey_DS("Y_Format", "MHz")] = "MHz";
      break;
    case "PIM":
      values[SearchSetKey_DS("AxisType", "Frequency")] = "Frequency";
      values[SearchSetKey_DS("Curve1_Parameter", "3rd")] = "3rd";
      values[SearchSetKey_DS("Curve1_LimitOn", "1")] = 1;
      values[SearchSetKey_DS("Curve1_LimitFill", "1")] = 1;
      values[SearchSetKey_DS("X_Min", "0")] = "0";
      values[SearchSetKey_DS("X_Max", "100")] = "100";
      values[SearchSetKey_DS("X_Unit", "MHz")] = "MHz";
      values[SearchSetKey_DS("Y_Min", "-160")] = "-160";
      values[SearchSetKey_DS("Y_Max", "-60")] = "-60";
      values[SearchSetKey_DS("Y_Format", "dBm")] = "dBm";
      break;
  }

  updateDataSource(dataSource)
}
//---------------------------------------------------------
// Update the data source for the current plot
//---------------------------------------------------------
function updateDataSource(dataSource) {
  BODY.PLOTS[BODY.dSelectedPlot].sDataSource = dataSource;
  $('#dataSource').val(dataSource);

  switch (dataSource) {
    case "S Parameter":
      loadSPPlot();
      $('#SParameter').show();
      $('#PIM').hide();
      break;
    case "PIM":
      loadPIMPlot();
      $('#SParameter').hide();
      $('#PIM').show();
      break;
  }
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

  // HEADER
  templateKeys = templateKeys + "sPlotLabel=" + HEADER.sPlotLabel + "&";

  // BODY
  templateKeys = templateKeys + "sPlotOrientation=" + BODY.sPlotOrientation + "&";

  // CUSTOM FIELDS FOR CUSTOM PLOTS
  for (var i=0; i<CFIDS.length; i++) {
    templateKeys = templateKeys + "FieldID_" + (i + 1) + "=" + encodeURIComponent(CFIDS[i].sField)+ "&";
  }

  // PLOTS
  var plotCount = 1;
  var keys, values;

  for (var i=0; i<plotCount; i++) {
    templateKeys = templateKeys + "Plot" + (i + 1) + "_sDataSource="    + BODY.PLOTS[i].sDataSource + "&";
    templateKeys = templateKeys + "Plot" + (i + 1) + "_sLineType=" + BODY.PLOTS[i].sLineType + "&";
    templateKeys = templateKeys + "Plot" + (i + 1) + "_Page=" + BODY.PLOTS[i].Page + "&";

    keys = BODY.PLOTS[i].KEYS;
    values = BODY.PLOTS[i].VALUES;

    for (var j=0; j<keys.length; j++) {
      templateKeys = templateKeys + "Plot" + (i + 1) + "_" + keys[j] + "=" + values[j];
      if (j != keys.length - 1) {
        templateKeys = templateKeys + "&";
      }
    }
  }

  return templateKeys;
}

//---------------------------------------------------------
// This function loads the settings of the current plot
//---------------------------------------------------------
function loadPlot() {
  var selectedPlot = BODY.dSelectedPlot;

  updateDataSource(BODY.PLOTS[selectedPlot].sDataSource);
  $('#display' + BODY.PLOTS[0].sDisplaySource).attr('checked', true);
  $('#lineType' + BODY.PLOTS[selectedPlot].sLineType).attr('checked', true);
  document.getElementById("page" + BODY.PLOTS[0].Page).checked = true;


  switch (BODY.PLOTS[selectedPlot].sDataSource) {
    case "S Parameter":
      loadSPPlot();
      break;
    case "PIM":
      loadPIMPlot();
      break;
  }
}

//---------------------------------------------------------
// Autoscale
//---------------------------------------------------------
function autoScale(controls, autoscale, boxChecked){
  var checked = false;
  if (boxChecked == true || boxChecked == 1) {
    checked = true;
  }
  document.getElementById(autoscale).checked = checked;
  for (i=0; i<controls.length; i++) {
    document.getElementById(controls[i]).disabled = checked;
  }
}

//---------------------------------------------------------------HEADER OBJECT-------------------------------------------------------------------------

//---------------------------------------------------------
// Update the label for the plot
//---------------------------------------------------------
function updatePlotLabel(value) {
  HEADER.sPlotLabel = value;

  makeChanges();
}

//---------------------------------------------------------------BODY OBJECT---------------------------------------------------------------------------

//---------------------------------------------------------
// Update the trace line type
//---------------------------------------------------------
function updatePage(page) {
  BODY.PLOTS[BODY.dSelectedPlot].Page = page;

  makeChanges();
}
//---------------------------------------------------------
// Update the trace line type
//---------------------------------------------------------
function updateLineType(lineType) {
  BODY.PLOTS[BODY.dSelectedPlot].sLineType = lineType;

  makeChanges();
}

//---------------------------------------------------------------SP FUNCTIONS--------------------------------------------------------------------------

//---------------------------------------------------------
// This function loads the settings of an SP plot
//---------------------------------------------------------
function loadSPPlot() {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;

  $('#SPStartFreq').val(values[SearchSetKey_DS("X_Min","500")]);
  $('#SPStopFreq').val(values[SearchSetKey_DS("X_Max","1500")]);
  $('#SPXUnits').val(values[SearchSetKey_DS("X_Unit","MHz")]);
  autoScale(["SPStartFreq", "SPStopFreq"], "SPXAutoscale", values[SearchSetKey_DS("Auto_X","1")]);

  buildSPTracesTable();
}

//---------------------------------------------------------
// Update the SP X-axis start frequency
//---------------------------------------------------------
function updateSPStartFrequency(startFreq) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("X_Min");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = startFreq;

  makeChanges();
}

//---------------------------------------------------------
// Update the SP X-axis stop frequency
//---------------------------------------------------------
function updateSPStopFrequency(stopFreq) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("X_Max");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = stopFreq;

  makeChanges();
}

//---------------------------------------------------------
// Update the SP X-axis units
//---------------------------------------------------------
function updateSPXUnits(units) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("X_Unit");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = units;

  makeChanges();
}

//---------------------------------------------------------
// Update the SP X-axis autoscale
//---------------------------------------------------------
function updateSPXAutoscale(checked) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Auto_X");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = checked;
  autoScale(["SPStartFreq", "SPStopFreq"], "SPXAutoscale", checked);

  makeChanges();
}

//---------------------------------------------------------
// Builds the traces table
//---------------------------------------------------------
function buildSPTracesTable() {
  var tbl=document.getElementById('traces');
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var axisType = values[SearchSetKey_DS("AxisType","Default")];
  var i = tbl.rows.length;
  var trace = 1;

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
  while (keys.indexOf("Curve" + trace + "_Parameter") != -1) {

    var row = tbl.insertRow(tbl.rows.length); // there's a header row
    
    //---------------------------------------------------------
    //  Cell 0:  Trace Number
    //    Row header showing the trace number with
    //    a little different method here as it's a "th" element
    var cell0 = document.createElement('th');
    cell0.className = "rh";
    var el0 = document.createTextNode(trace);
    cell0.title     = "Trace number"
    cell0.appendChild(el0);
    row.appendChild(cell0);

    //---------------------------------------------------------
    //  Cell 1:  Delete Trace (row)
    //    Holds an icon/link to delete the row
    var cell1 = row.insertCell(1);
    cell1.className = "icon";
    var el1   = document.createElement('img');
    el1.src   = "/images/deletesmalldisabled.gif";
    el1.title = "Delete this trace";
    el1.onclick = "";//new Function ("removeSPTrace(" + trace + ");");
    cell1.appendChild(el1);
    
    //---------------------------------------------------------
    //  Cell 2:  Trace Reordering
    //    Holds a couple of images/links to handle
    //    reordering rows of the markers table
    var cell2 = row.insertCell(2);
    cell2.className = "icon";

    //  Move up (toward top of list; index gets smaller)
    var el2aUp    = document.createElement('a');
    el2aUp.href   = "#nogo";
    var el2aUpImg = document.createElement('img');
    el2aUpImg.className = "movers";
    if (trace == 1) {    // disable UP on first element
      el2aUpImg.src     = "/images/upsmalldisabled.gif";
    } else {
      el2aUp.title   = "move up"
      el2aUp.onclick = new Function("this.blur(); moveSPTrace(-(" + trace + "));");
      el2aUpImg.src  = "/images/upsmall.gif";
    }
    el2aUp.appendChild(el2aUpImg);

    //  Move down (toward bottom of list; index gets bigger)
    var el2aDwn    = document.createElement('a');
    el2aDwn.href   = "#nogo";
    var el2aDwnImg = document.createElement('img');
    el2aDwnImg.className = "movers";
    if (keys.indexOf("Curve" + (trace + 1) + "_Parameter") == -1) {  // disable DOWN on last element
      el2aDwnImg.src     = "/images/downsmalldisabled.gif";
    } else {
      el2aDwn.title      = "move down"
      el2aDwn.onclick    = new Function ("this.blur(); moveSPTrace(" + trace + ");");
      el2aDwnImg.src     = "/images/downsmall.gif";
    }
    el2aDwn.appendChild(el2aDwnImg);

    cell2.appendChild(el2aUp);
    cell2.appendChild(el2aDwn);
    
    //---------------------------------------------------------
    //  Cell 3:  Auto-Scale
    //    Holds an checkbox to auto-scale the trace
    var cell3 = row.insertCell(3);
    cell3.className = "icon";
    var el3   = document.createElement('input');
    el3.type  = "checkbox";
    el3.id    = trace + "_autoscale";
    el3.name  = trace + "_autoscale";
    cell3.appendChild(el3);   // have to append before setting attributes for IE6

    el3.disabled = false;
    el3.checked  = (values[SearchSetKey_DS("Auto_Y","1")] == true || values[keys.indexOf("Auto_Y")] == 1);
    el3.onclick  = new Function ("updateSPAutoScale('" + trace + "', this.checked);");
    el3.title    = "Auto-Scale: if checked the trace scale, reference, and position will be automatically determined";

    //---------------------------------------------------------
    //  Cell 4:  Show Limits
    //    Holds an checkbox to show/hide the trace limits
    var cell4 = row.insertCell(4);
    cell4.className = "icon";
    var el4   = document.createElement('input');
    el4.type  = "checkbox";
    el4.id    = trace + "_showLimits";
    el4.name  = trace + "_showLimits";
    cell4.appendChild(el4);   // have to append before setting attributes for IE6

    el4.disabled = false;
    el4.checked  = (values[SearchSetKey_DS("Curve" + trace + "_LimitOn","1")] == true || values[keys.indexOf("Curve" + trace + "_LimitOn")] == 1);
    el4.onclick  = new Function ("updateSPShowLimits(" + trace + ", this.checked);");
    el4.title    = "Show Limits: if checked the trace limits will be shown on the plot";
    
    //---------------------------------------------------------
    //  Cell 5:  Fill Limits
    //    Holds an checkbox to fill/not fill the trace limits
    var cell5 = row.insertCell(5);
    cell5.className = "icon";
    var el5   = document.createElement('input');
    el5.type  = "checkbox";
    el5.id    = trace + "_showFill";
    el5.name  = trace + "_showFill";
    cell5.appendChild(el5);   // have to append before setting attributes for IE6

    el5.disabled = false;
    el5.checked  = (values[SearchSetKey_DS("Curve" + trace + "_LimitFill","1")] == true || values[keys.indexOf("Curve" + trace + "_LimitFill")] == 1);
    el5.onclick  = new Function ("updateSPFillLimits(" + trace + ", this.checked);");
    el5.title    = "Fill Limits: if checked the trace limits will be filled on the plot";

    //---------------------------------------------------------
    //  Cell 6:  Parameter
    //    Holds a selection box to select the parameter
    var cell6      = row.insertCell(6);
    var el6a       = document.createElement('input');
    el6a.type      = "text";
    el6a.id        = trace + "_parameter";
    el6a.name      = trace + "_parameter";
    el6a.value     = values[SearchSetKey_DS("Curve" + trace + "_Parameter","S11")];
    el6a.className = "hidden";

    var el6b       = document.createElement('div');
    var el6c       = document.createTextNode(values[keys.indexOf("Curve" + trace + "_Parameter")]);
    el6b.id        = trace + "_parameter_display";
    el6b.appendChild(el6c);
    el6b.className = "";

    cell6.title    = "Click to change the Parameter";
    el6b.onclick   = new Function ("changeSPParameter(" + trace + ");");

    cell6.appendChild(el6a);
    cell6.appendChild(el6b);
    
    //---------------------------------------------------------
    //  Cell 7:  Format
    //    Holds a selection box to select
    //    the format to display the s-parameter in
    var parameter = values[keys.indexOf("Curve" + trace + "_Parameter")];
    var response = parameter.substring(1,2);
    var stimulus = parameter.substring(2,3);
    var format = values[keys.indexOf("Y_Format")];
    
    // convert Loss to correct verbage
    if (format == "Loss") {
      if (response == stimulus) {
        format = "Return Loss";
      }
      else if (response > stimulus) {
        format = "Insertion Loss";
      }
      else {
        format = "Isolation";
      }
    }

    var cell7      = row.insertCell(7);
    var el7a       = document.createElement('input');
    el7a.type      = "text";
    el7a.id        = trace + "_format";
    el7a.name      = trace + "_format";
    el7a.value     = values[SearchSetKey_DS("Y_Format","Log Mag")];
    el7a.className = "hidden";

    var el7b       = document.createElement('div');
    el7b.id        = trace + "_format_display";
    el7b.className = "";

    var el7c       = document.createTextNode(format);
    el7b.appendChild(el7c);

    cell7.title    = "Click to change the Format";
    el7b.onclick   = new Function ("changeSPFormat(" + trace + ");");

    cell7.appendChild(el7a);
    cell7.appendChild(el7b);

    //---------------------------------------------------------
    //  Cell 8:  Scale
    //    integer value to tell what the scale of the
    //    display is
    var cell8       = row.insertCell(8);

    var el8a       = document.createElement('input');
    el8a.type      = "text";
    el8a.id        = trace + "_scale";
    el8a.name      = trace + "_scale";
    el8a.value     = values[SearchSetKey_DS("Scale","10")];
    el8a.title     = "Change the Scale";
    el8a.onblur    = new Function ("armSPSaveScale(" + trace + ")");  // handle saving changes
    // this allows the user to press "ENTER" to confrim an entry
    if ($.browser.msie) {
      el8a.onkeydown = new Function ("captureReturn(this, window.event)");
    } else {
      el8a.setAttribute("onkeydown", "captureReturn(this, event);");
    }
    el8a.className = "hidden";

    cell8.className = "ctl";
    cell8.appendChild(el8a);

    // create and show numeric Increase/Decrease buttons
    var el8Ctl       = document.createElement('span');
    el8Ctl.id        = trace + "_scale_control";
    el8Ctl.name      = trace + "_scale_control";
    el8Ctl.className = "hidden";

    // numeric Increase
    var el8Up      = document.createElement('a');
    el8Up.href     = "#nogo";
    var el8UpImg   = document.createElement('img');
    el8Up.title    = "Increase";
    el8Up.onclick  = new Function ("editSPScale(" + trace + ", 1);");
    el8UpImg.src   = "/images/scrollup.gif";
    el8Up.appendChild(el8UpImg);

    // numeric Decrease
    var el8Dwn     = document.createElement('a');
    el8Dwn.href    = "#nogo";
    var el8DwnImg  = document.createElement('img');
    el8Dwn.title   = "Decrease";
    el8Dwn.onclick = new Function ("editSPScale(" + trace + ", -1);");
    el8DwnImg.src  = "/images/scrolldown.gif";
    el8DwnImg.id   = "down";
    el8Dwn.appendChild(el8DwnImg);

    el8Ctl.appendChild(el8Up);
    el8Ctl.appendChild(el8Dwn);
    cell8.appendChild(el8Ctl);

    var el8b     = document.createElement('div');
    el8b.id      = trace + "_scale_display";
    el8b.name    = trace + "_scale_display";
    var el8c     = document.createTextNode(values[keys.indexOf("Scale")]);
    el8b.appendChild(el8c);
    cell8.appendChild(el8b);

    if (values[keys.indexOf("Auto_Y")] == true || values[keys.indexOf("Auto_Y")] == 1) {
      cell8.className = "grayedout";
    } else {
      cell8.title     = "Click to change the Scale";
      el8b.onclick = new Function ("editSPScale(" + trace + ", 0);");
    }

    //---------------------------------------------------------
    //  Cell 9:  Position
    //    integer value to tell what the position of the
    //    display is
    var cell9       = row.insertCell(9);

    var el9a       = document.createElement('input');
    el9a.type      = "text";
    el9a.id        = trace + "_position";
    el9a.name      = trace + "_position";
    el9a.value     = values[SearchSetKey_DS("Position","0")];
    el9a.title     = "Change the Position";
    el9a.onblur    = new Function ("armSPSavePosition(" + trace + ")");  // handle saving changes
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
    var el9Ctl     = document.createElement('span');
    el9Ctl.id      = trace + "_position_control";
    el9Ctl.name    = trace + "_position_control";
    el9Ctl.className = "hidden";

    // numeric Increase
    var el9Up      = document.createElement('a');
    el9Up.href     = "#nogo";
    var el9UpImg   = document.createElement('img');
    el9Up.title    = "Increase";
    el9Up.onclick  = new Function("editSPPosition(" + trace + ", 1);");
    el9UpImg.src   = "/images/scrollup.gif";
    el9Up.appendChild(el9UpImg);

    // numeric Decrease
    var el9Dwn     = document.createElement('a');
    el9Dwn.href    = "#nogo";
    var el9DwnImg  = document.createElement('img');
    el9Dwn.title   = "Decrease";
    el9Dwn.onclick = new Function ("editSPPosition(" + trace + ", -1);");
    el9DwnImg.src  = "/images/scrolldown.gif";
    el9DwnImg.id   = "down";
    el9Dwn.appendChild(el9DwnImg);

    el9Ctl.appendChild(el9Up);
    el9Ctl.appendChild(el9Dwn);
    cell9.appendChild(el9Ctl);

    var el9b     = document.createElement('div');
    el9b.id      = trace + "_position_display";
    el9b.name    = trace + "_position_display";
    var el9c     = document.createTextNode(values[keys.indexOf("Position")]);
    el9b.appendChild(el9c);
    cell9.appendChild(el9b);

    if (values[keys.indexOf("Auto_Y")] == true || values[keys.indexOf("Auto_Y")] == 1) {
      cell9.className = "grayedout";
    } else {
      cell9.title     = "Click to change the Position";
      el9b.onclick = new Function ("editSPPosition(" + trace + ", 0);");
    }

    //---------------------------------------------------------
    //  Cell 10:  Reference
    //    integer value to tell what the reference of the
    //    display is
    var cell10       = row.insertCell(10);

    var el10a       = document.createElement('input');
    el10a.type      = "text";
    el10a.id        = trace + "_reference";
    el10a.name      = trace + "_reference";
    el10a.value     = values[SearchSetKey_DS("Reference","-80")]
    el10a.title     = "Change the Reference";
    el10a.onblur    = new Function ("armSPSaveReference(" + trace + ")");  // handle saving changes
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
    el10Ctl.id      = trace + "_reference_control";
    el10Ctl.name    = trace + "_reference_control";
    el10Ctl.className = "hidden";

    // numeric Increase
    var el10Up      = document.createElement('a');
    el10Up.href     = "#nogo";
    var el10UpImg   = document.createElement('img');
    el10Up.title    = "Increase";
    el10Up.onclick  = new Function("editSPReference(" + trace + ", 1);");
    el10UpImg.src   = "/images/scrollup.gif";
    el10Up.appendChild(el10UpImg);

    // numeric Decrease
    var el10Dwn     = document.createElement('a');
    el10Dwn.href    = "#nogo";
    var el10DwnImg  = document.createElement('img');
    el10Dwn.title   = "Decrease";
    el10Dwn.onclick = new Function ("editSPReference(" + trace + ", -1);");
    el10DwnImg.src  = "/images/scrolldown.gif";
    el10DwnImg.id   = "down";
    el10Dwn.appendChild(el10DwnImg);

    el10Ctl.appendChild(el10Up);
    el10Ctl.appendChild(el10Dwn);
    cell10.appendChild(el10Ctl);

    var el10b     = document.createElement('div');
    el10b.id      = trace + "_reference_display";
    el10b.name    = trace + "_reference_display";
    var el10c     = document.createTextNode(values[keys.indexOf("Reference")]);
    el10b.appendChild(el10c);
    cell10.appendChild(el10b);

    if (values[keys.indexOf("Auto_Y")] == true || values[keys.indexOf("Auto_Y")] == 1) {
      cell10.className = "grayedout";
    } else {
      cell10.title     = "Click to change the Reference";
      el10b.onclick = new Function ("editSPReference(" + trace + ", 0);");
    }
    
    //---------------------------------------------------------
    //  Cell 11:  Filler Cell
    //    Holds a blank cell as a filler cell
    row.insertCell(11);

    trace++;
  }
  
  // insert trace number into add trace function
  document.getElementById('aAddSPTrace').onclick = function(){this.blur(); addSPTrace(trace);};
  
  // everything's added - paint the table styles
  $("#traces tbody > tr:nth-child(odd)").addClass("o");      // zebra stripes
}

//---------------------------------------------------------
//  Traces Table Cell 1:  Remove Trace (row)
//---------------------------------------------------------
function removeSPTrace(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;

  values.splice(keys.indexOf("Curve" + trace + "_Parameter"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_Parameter"), 1);
  values.splice(keys.indexOf("Curve" + trace + "_LimitOn"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_LimitOn"), 1);
  values.splice(keys.indexOf("Curve" + trace + "_LimitFill"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_LimitFill"), 1);
  values.splice(keys.indexOf("Curve" + trace + "_Label"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_Label"), 1);
  values.splice(keys.indexOf("Curve" + trace + "_Autoscale"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_Autoscale"), 1);
  values.splice(keys.indexOf("Curve" + trace + "_Scale"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_Scale"), 1);
  values.splice(keys.indexOf("Curve" + trace + "_Reference"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_Reference"), 1);
  values.splice(keys.indexOf("Curve" + trace + "_Position"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_Position"), 1);
  values.splice(keys.indexOf("Curve" + trace + "_Format"), 1);
  keys.splice(keys.indexOf("Curve" + trace + "_Format"), 1);

  trace++;
  while (keys.indexOf("Curve" + trace + "_Parameter") != -1) {
    keys[keys.indexOf("Curve" + trace + "_Parameter")] = "Curve" + (trace - 1) + "_Parameter";
    keys[keys.indexOf("Curve" + trace + "_LimitOn")] = "Curve" + (trace - 1) + "_LimitOn";
    keys[keys.indexOf("Curve" + trace + "_LimitFill")] = "Curve" + (trace - 1) + "_LimitFill";
    keys[keys.indexOf("Curve" + trace + "_Label")] = "Curve" + (trace - 1) + "_Label";
    keys[keys.indexOf("Curve" + trace + "_Autoscale")] = "Curve" + (trace - 1) + "_Autoscale";
    keys[keys.indexOf("Curve" + trace + "_Scale")] = "Curve" + (trace - 1) + "_Scale";
    keys[keys.indexOf("Curve" + trace + "_Reference")] = "Curve" + (trace - 1) + "_Reference";
    keys[keys.indexOf("Curve" + trace + "_Position")] = "Curve" + (trace - 1) + "_Position";
    keys[keys.indexOf("Curve" + trace + "_Format")] = "Curve" + (trace - 1) + "_Format";

    trace++;
  }

  buildSPTracesTable();
  makeChanges();
}

//---------------------------------------------------------
//  Traces Table Cell 2:  Reorder Traces
//---------------------------------------------------------
function moveSPTrace(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var dir = 1;
  if (trace < 0) {
    dir = -1;
    trace = -trace;
  }

  var indexParameter1 = keys.indexOf("Curve" + trace + "_Parameter");
  var indexLimitOn1 =   keys.indexOf("Curve" + trace + "_LimitOn");
  var indexLimitFill1 = keys.indexOf("Curve" + trace + "_LimitFill");
  var indexLabel1 =     keys.indexOf("Curve" + trace + "_Label");
  var indexAutoscale1 = keys.indexOf("Curve" + trace + "_Autoscale");
  var indexScale1 =     keys.indexOf("Curve" + trace + "_Scale");
  var indexReference1 = keys.indexOf("Curve" + trace + "_Reference");
  var indexPosition1 =  keys.indexOf("Curve" + trace + "_Position");
  var indexFormat1 =    keys.indexOf("Curve" + trace + "_Format");

  var indexParameter2 = keys.indexOf("Curve" + (trace + dir) + "_Parameter");
  var indexLimitOn2 =   keys.indexOf("Curve" + (trace + dir) + "_LimitOn");
  var indexLimitFill2 = keys.indexOf("Curve" + (trace + dir) + "_LimitFill");
  var indexLabel2 =     keys.indexOf("Curve" + (trace + dir) + "_Label");
  var indexAutoscale2 = keys.indexOf("Curve" + (trace + dir) + "_Autoscale");
  var indexScale2 =     keys.indexOf("Curve" + (trace + dir) + "_Scale");
  var indexReference2 = keys.indexOf("Curve" + (trace + dir) + "_Reference");
  var indexPosition2 =  keys.indexOf("Curve" + (trace + dir) + "_Position");
  var indexFormat2 =    keys.indexOf("Curve" + (trace + dir) + "_Format");

  keys[indexParameter1] = "Curve" + (trace + dir) + "_Parameter";
  keys[indexLimitOn1] = "Curve" + (trace + dir) + "_LimitOn";
  keys[indexLimitFill1] = "Curve" + (trace + dir) + "_LimitFill";
  keys[indexLabel1] = "Curve" + (trace + dir) + "_Label";
  keys[indexAutoscale1] = "Curve" + (trace + dir) + "_Autoscale";
  keys[indexScale1] = "Curve" + (trace + dir) + "_Scale";
  keys[indexReference1] = "Curve" + (trace + dir) + "_Reference";
  keys[indexPosition1] = "Curve" + (trace + dir) + "_Position";
  keys[indexFormat1] = "Curve" + (trace + dir) + "_Format";

  keys[indexParameter2] = "Curve" + trace  + "_Parameter";
  keys[indexLimitOn2] = "Curve" + trace  + "_LimitOn";
  keys[indexLimitFill2] = "Curve" + trace  + "_LimitFill";
  keys[indexLabel2] = "Curve" + trace  + "_Label";
  keys[indexAutoscale2] = "Curve" + trace  + "_Autoscale";
  keys[indexScale2] = "Curve" + trace  + "_Scale";
  keys[indexReference2] = "Curve" + trace  + "_Reference";
  keys[indexPosition2] = "Curve" + trace  + "_Position";
  keys[indexFormat2] = "Curve" + trace  + "_Format";

  buildSPTracesTable();
  makeChanges();
}

//---------------------------------------------------------
//  Traces Table Cell 3:  Auto Scale
//---------------------------------------------------------
function updateSPAutoScale(trace, autoScale) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Auto_Y");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = autoScale;

  buildSPTracesTable();
  makeChanges();
}

//---------------------------------------------------------
//  Traces Table Cell 4:  Show Limits
//---------------------------------------------------------
function updateSPShowLimits(trace, showLimits) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Curve" + trace + "_LimitOn");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = showLimits;

  buildSPTracesTable();
  makeChanges();
}

//---------------------------------------------------------
//  Traces Table Cell 5:  Fill Limits
//---------------------------------------------------------
function updateSPFillLimits(trace, fillLimits) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Curve" + trace + "_LimitFill");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = fillLimits;

  buildSPTracesTable();
  makeChanges();
}

//---------------------------------------------------------
//  Traces Table Cell 6:  Change Parameter
//---------------------------------------------------------
function changeSPParameter(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var dtext = document.getElementById(trace + "_parameter_display");

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = trace + "_select";
  A = ["S11", "S12", "S21", "S22", "---", "S13", "S14", "S15", "S16", "S17", "S18", "S23", "S24", "S25", "S26", "S27", "S28", "S31", "S32", "S33", "S34", "S35", "S36", "S37", "S38", "S41", "S42", "S43", "S44", "S45", "S46", "S47", "S48", "S51", "S52", "S53", "S54", "S55", "S56", "S57", "S58", "S61", "S62", "S63", "S64", "S65", "S66", "S67", "S68", "S71", "S72", "S73", "S74", "S75", "S76", "S77", "S78", "S81", "S82", "S83", "S84", "S85", "S86", "S87", "S88"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(values[keys.indexOf("Curve" + trace + "_Parameter")]);
  s.options[4].disabled = true;
  s.onchange = new Function ("saveSPChangedParameter(" + trace + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedParameter(" + trace + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedParameter(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var s     = document.getElementById(trace + "_select");
  var j     = s.options[s.selectedIndex].text;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");
  
  if (j != values[keys.indexOf("Curve" + trace + "_Parameter")]) {
    values[keys.indexOf("Curve" + trace + "_Parameter")] = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPTracesTable();
}

//---------------------------------------------------------
//  Traces Table Cell 7:  Change Format
//---------------------------------------------------------
function changeSPFormat(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var dtext = document.getElementById(trace + "_format_display");
  var parameter = values[SearchSetKey_DS("Curve" + trace + "_Parameter","S11")];
  var response = parameter.substring(1,2);
  var stimulus = parameter.substring(2,3);
  var format = values[keys.indexOf("Y_Format")];
  
  // convert Loss to correct verbage
  if (format == "Loss") {
    if (response == stimulus) {
      format = "Return Loss";
    }
    else if (response > stimulus) {
      format = "Insertion Loss";
    }
    else {
      format = "Isolation";
    }
  }

  // hide currenlty displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = trace + "_select";
  A = getSPFormatValues(parameter);
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(format);
  s.onchange = new Function ("saveSPChangedFormat(" + trace + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedFormat(" + trace + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedFormat(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var s     = document.getElementById(trace + "_select");
  var j     = s.options[s.selectedIndex].text;
  
  if (j == "Isolation" || j == "Insertion Loss" || j == "Return Loss") {
    j = "Loss";
  }
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");
  
  if (j != values[keys.indexOf("Y_Format")]) {
    values[keys.indexOf("Y_Format")] = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildSPTracesTable();
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
//  Traces Table Cell 8:  Change Scale
//---------------------------------------------------------
// the global and armSPSaveScale() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPScale() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Scale table cell -> editSPScale(trace) runs
//   2a) User clicks off now visible control -> armSPSaveScale()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveScale() function will be cleared by the newest
//       editSPScale() call.
var SCALETIMER = [0,0];
function armSPSaveScale(trace) {
  SCALETIMER[trace] = setTimeout("saveSPScale(" + trace + ")", 250);
}
function editSPScale(trace, scroll) {
  // clear pending changes since
  // we're making more
  clearTimeout(SCALETIMER[trace]);

  var s = document.getElementById(trace + "_scale");

  s.value = Number(s.value) + scroll;
  (s.value < 0) ? s.value = "0" : s.value += '';

  $('#' + trace + '_scale_display').attr('className', 'hidden');
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  $('#' + trace + '_scale_control').attr('className', '');
}

function saveSPScale(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var s = document.getElementById(trace + "_scale");

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value || validateNumeric(s.value) < 0) {
    s.value = values[keys.indexOf("Scale")];
  }

  if (s.value != values[keys.indexOf("Scale")]) {
    values[keys.indexOf("Scale")] = s.value;  // update changes
    makeChanges();
  }

  buildSPTracesTable();
}

//---------------------------------------------------------
//  Traces Table Cell 9:  Change Position
//---------------------------------------------------------
// the global and armSPSavePosition() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPPosition() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Position table cell -> editSPPosition(trace) runs
//   2a) User clicks off now visible control -> armSPSavePosition()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSavePosition() function will be cleared by the newest
//       editSPPosition() call.
var POSITIONTIMER = [0,0];
function armSPSavePosition(trace) {
  POSITIONTIMER[trace] = setTimeout("saveSPPosition(" + trace + ")", 250);
}
function editSPPosition(trace, scroll) {
  // clear pending changes since
  // we're making more
  clearTimeout(POSITIONTIMER[trace]);

  var s = document.getElementById(trace + "_position");

  s.value = Number(s.value) + scroll;

  $('#' + trace + '_position_display').attr('className', 'hidden');
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  $('#' + trace + '_position_control').attr('className', '');
}

function saveSPPosition(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var s = document.getElementById(trace + "_position");

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value) {
    s.value = values[keys.indexOf("Position")];
  }

  if (s.value != values[keys.indexOf("Position")]) {
    values[keys.indexOf("Position")] = s.value;  // update changes
    makeChanges();
  }

  buildSPTracesTable();
}

//---------------------------------------------------------
//  Traces Table Cell 10:  Change Reference
//---------------------------------------------------------
// the global and armSPSaveReference() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveSPReference() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Reference table cell -> editSPReference(trace) runs
//   2a) User clicks off now visible control -> armSPSaveReference()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSPSaveReference() function will be cleared by the newest
//       editSPReference() call.
var REFERENCETIMER = [0,0];
function armSPSaveReference(trace) {
  REFERENCETIMER[trace] = setTimeout("saveSPReference(" + trace + ")", 250);
}
function editSPReference(trace, scroll) {
  // clear pending changes since
  // we're making more
  clearTimeout(REFERENCETIMER[trace]);

  var s = document.getElementById(trace + "_reference");

  s.value = Number(s.value) + scroll;

  $('#' + trace + '_reference_display').attr('className', 'hidden');
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  $('#' + trace + '_reference_control').attr('className', '');
}

function saveSPReference(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var s = document.getElementById(trace + "_reference");

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value) {
    s.value = values[keys.indexOf("Reference")];
  }

  if (s.value != values[keys.indexOf("Reference")]) {
    values[keys.indexOf("Reference")] = s.value;  // update changes to TRACES_SP array
    makeChanges();
  }

  buildSPTracesTable();
}

//---------------------------------------------------------
// Adds a trace to the traces table
//---------------------------------------------------------
function addSPTrace(trace) {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;

  if (trace > 1) {
    alert("There may only be 1 S Parameter plotted per overlay plot.");
  } else {
    keys[keys.length] = "Curve" + trace + "_Parameter";
    values[values.length] = "S11";
    keys[keys.length] = "Curve" + trace + "_LimitOn";
    values[values.length] = true;
    keys[keys.length] = "Curve" + trace + "_LimitFill";
    values[values.length] = false;
    keys[keys.length] = "Curve" + trace + "_Autoscale";
    values[values.length] = true;
    keys[keys.length] = "Curve" + trace + "_Scale";
    values[values.length] = "10";
    keys[keys.length] = "Curve" + trace + "_Reference";
    values[values.length] = "0";
    keys[keys.length] = "Curve" + trace + "_Position";
    values[values.length] = "5";
    keys[keys.length] = "Curve" + trace + "_Format";
    values[values.length] = "Log Mag";

    buildSPTracesTable();
    makeChanges();
  }
}

//---------------------------------------------------------------PIM FUNCTIONS-------------------------------------------------------------------------

//---------------------------------------------------------
// This function loads the settings of a PIM plot
//---------------------------------------------------------
function loadPIMPlot() {
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;
  var limitOn = false;
  var limitFill = false;


  switch (values[keys.indexOf("AxisType")]) {
    case "Time":
      var A = ["Samples","Seconds","Minutes"];
      break;
    case "Frequency":
    case "Frequency Max/Avg":
    default:
      var A = ["Hz","kHz","MHz","GHz"];
      break;
  }
  addStringOptions(document.getElementById("PIMXUnits"), A, A);

  $('#PIMAxisType').val(values[keys.indexOf("AxisType")]);
  $('#PIMOrder').val(values[keys.indexOf("Curve1_Parameter")]);

  if ((values[keys.indexOf("Curve1_LimitOn")] == "true") || (values[keys.indexOf("Curve1_LimitOn")] == "1")) {
    limitOn = true;
  }
  $('#PIMShowLimit').attr('checked', limitOn);

  if ((values[keys.indexOf("Curve1_LimitFill")] == "true") ||(values[keys.indexOf("Curve1_LimitFill")] == "1")){
    limitFill = true;
  }
  $('#PIMLimitFill').attr('checked', limitFill);

  $('#PIMXStart').val(values[keys.indexOf("X_Min")]);
  $('#PIMXStop').val(values[keys.indexOf("X_Max")]);
  $('#PIMXUnits').val(values[keys.indexOf("X_Unit")]);
  autoScale(["PIMXStart", "PIMXStop"], "PIMXAutoscale", values[SearchSetKey_DS("Auto_X","1")]);
  $('#PIMYStart').val(values[keys.indexOf("Y_Min")]);
  $('#PIMYStop').val(values[keys.indexOf("Y_Max")]);
  $('#PIMYUnits').val(values[keys.indexOf("Y_Format")]);
  autoScale(["PIMYStart", "PIMYStop"], "PIMYAutoscale", values[SearchSetKey_DS("Auto_Y","1")]);
}

//---------------------------------------------------------
// Update the PIM axis type
//---------------------------------------------------------
function updatePIMAxisType(axisType){
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;

  values[keys.indexOf("AxisType")] = axisType;

  loadPlot();
  makeChanges();
}

//---------------------------------------------------------
// Update the PIM order
//---------------------------------------------------------
function updatePIMOrder(order){
  var keys = BODY.PLOTS[BODY.dSelectedPlot].KEYS;
  var values = BODY.PLOTS[BODY.dSelectedPlot].VALUES;

  values[keys.indexOf("Curve1_Parameter")] = order;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM show limit
//---------------------------------------------------------
function updatePIMShowLimit(checked) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Curve1_LimitOn");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = checked;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM fill limit
//---------------------------------------------------------
function updatePIMLimitFill(checked) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Curve1_LimitFill");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = checked;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM X-axis start
//---------------------------------------------------------
function updatePIMXStart(start) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("X_Min");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = start;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM X-axis stop
//---------------------------------------------------------
function updatePIMXStop(stop) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("X_Max");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = stop;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM X-axis units
//---------------------------------------------------------
function updatePIMXUnits(units) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("X_Unit");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = units;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM X-axis autoscale
//---------------------------------------------------------
function updatePIMXAutoscale(checked) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Auto_X");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = checked;
  autoScale(["PIMXStart", "PIMXStop"], "PIMXAutoscale", checked);

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM Y-axis start
//---------------------------------------------------------
function updatePIMYStart(start) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Y_Min");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = start;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM Y-axis stop
//---------------------------------------------------------
function updatePIMYStop(stop) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Y_Max");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = stop;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM Y-axis units
//---------------------------------------------------------
function updatePIMYUnits(units) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Y_Format");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = units;

  makeChanges();
}

//---------------------------------------------------------
// Update the PIM Y-axis autoscale
//---------------------------------------------------------
function updatePIMYAutoscale(checked) {
  var index = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf("Auto_Y");
  BODY.PLOTS[BODY.dSelectedPlot].VALUES[index] = checked;
  autoScale(["PIMYStart", "PIMYStop"], "PIMYAutoscale", checked);

  makeChanges();
}