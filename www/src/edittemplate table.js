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
                    .children("[value='PDF'], [value='TXT'], [value='S2P']").removeAttr('disabled');
  $('#orientation' + LAYOUT.sOrientation).attr('checked', true);
  $('#orientationIMG').attr('src', '/images/' + LAYOUT.sOrientation + '.gif');

  // Set up the HEADER parameters
  $('#tableLabel').val(HEADER.sTableLabel);

  // Set up the BODY parameters
  buildColumnsTable();
  if (EDITDISABLED) {
    $('#aAddColumn').attr({ className: "adder_grayedout", title: "Cannot change template columns" });
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
  templateKeys = templateKeys + "sTableLabel=" + HEADER.sTableLabel + "&";

  // CUSTOM FIELDS FOR CUSTOM PLOTS
  for (var i=0; i<CFIDS.length; i++) {
    templateKeys = templateKeys + "FieldID_" + (i + 1) + "=" + encodeURIComponent(CFIDS[i].sField) + "&";
  }

  // BODY

  // COLUMNS
  for (var i=0; i<BODY.COLUMNS.length; i++) {
    templateKeys = templateKeys + "Column" + (i + 1) + "_sType=" + BODY.COLUMNS[i].sType + "&";
    templateKeys = templateKeys + "Column" + (i + 1) + "_sLabel=" + BODY.COLUMNS[i].sLabel + "&";
    templateKeys = templateKeys + "Column" + (i + 1) + "_sRunSelection=" + BODY.COLUMNS[i].sRunSelection + "&";
    templateKeys = templateKeys + "Column" + (i + 1) + "_dRunNumber=" + BODY.COLUMNS[i].dRunNumber + "&";
    templateKeys = templateKeys + "Column" + (i + 1) + "_sField=" + BODY.COLUMNS[i].sField + "&";
    templateKeys = templateKeys + "Column" + (i + 1) + "_sFieldValue=" + BODY.COLUMNS[i].sFieldValue + "&";
    templateKeys = templateKeys + "Column" + (i + 1) + "_sParameters=" + BODY.COLUMNS[i].sParameters;

    if (i != BODY.COLUMNS.length - 1) {
      templateKeys = templateKeys + "&";
    }
  }

  return templateKeys;
}

//----------------------------------------------------------
// Finds the field ID from the display name
//----------------------------------------------------------
function fieldIdToDisplay(fieldId) {
  var A = [];
  for (var i=0; i<ALLFIELDS.length; i++) {
    A[i] = ALLFIELDS[i].sxFieldId;
  }
  var j = A.indexOf(fieldId);
  
  if (j == -1) {
    return "Not a Field";
  } else {
    return ALLFIELDS[j].sDisplayName;
  }
}

//----------------------------------------------------------
// Unpacks the parameter values
//----------------------------------------------------------
function getParameters(column) {
  var temp = BODY.COLUMNS[column].sParameters;
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

//---------------------------------------------------------------HEADER OBJECT-------------------------------------------------------------------------

//---------------------------------------------------------
// Update the label for the table
//---------------------------------------------------------
function updateTableLabel(value) {
  HEADER.sTableLabel = value;

  makeChanges();
}

//---------------------------------------------------------------BODY OBJECT---------------------------------------------------------------------------


//---------------------------------------------------------
//  Add new COLUMN to the table
//---------------------------------------------------------
function addColumn() {
  if (EDITDISABLED) { return; }
  toggleVisible('add_column');
  toggleVisible('aAddColumn');

  var s = document.getElementById('add_column_type');

  s.options.length = 0;  // clear all previous
  s.disabled = false;    // enable drop-down
  var A = ["Field", "Limit", "Calculation", "Constant", "-----Tests-----"];
  var B = ["Custom Field", "Limit", "Calculation", "Constant", "-----Tests-----"];
  for (var i=0; i<TESTS.length; i++) {
    A[A.length] = TESTS[i];
    B[B.length] = TESTS[i];
  }
  addStringOptions(s, A, B);
  s.selectedIndex = 0;
  s.options[4].disabled = true;
  s.focus();
}

function saveAddedColumn() {
  var type = document.getElementById('add_column_type');
  var i = type.options[type.selectedIndex].value;
  var parameters = "";

  switch (i) {
    case "Custom Field":
      parameters = "S Parameter,Serial_Number";
      break;
    case "Limit":
      parameters = "Column "+BODY.COLUMNS.length+ ",=,0";
      break;
    case "Calculation":
      parameters = "Column "+BODY.COLUMNS.length + ",+," + "Column "+BODY.COLUMNS.length;
      break;
    case "Constant":
      parameters = "0";
      break;
    case "S Parameter":
      parameters = "1,1,Log Mag,Value,1000,MHz";
      break;
    case "DC Attenuation":
      parameters = "Attenuation";
      break;
    case "Prompted Inputs":
      if (PIFIELDS.length >0) {
        parameters = PIFIELDS[0].sxFieldId;
      }
      else {
        parameters = "";
      }  
      break;
    case "PIM":
      parameters = "MaximumIM,dBm,Both"
      break;
  }

  BODY.COLUMNS[BODY.COLUMNS.length] = new COLUMN(i, "Column "+BODY.COLUMNS.length, "Most Recent", 1, "Step Tag", "", parameters);
  toggleVisible('add_column');
  toggleVisible('aAddColumn');
  makeChanges();
  buildColumnsTable();
}

//---------------------------------------------------------
// Builds the columns table
//---------------------------------------------------------
function buildColumnsTable() {
  var tbl=document.getElementById('columns');
  var i = tbl.rows.length;
  var column = 0;

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
  if (BODY.COLUMNS.length != 0) {
    while (column < BODY.COLUMNS.length) {

      var row = tbl.insertRow(tbl.rows.length); // there's a header row

      //---------------------------------------------------------
      //  Cell 0:  Column Number
      //    Row header showing the column number with
      //    a little different method here as it's a "th" element
      var cell0 = document.createElement('th');
      cell0.className = "rowheader";
      var el0 = document.createTextNode(column + 1);
      cell0.title     = "Column number"
      cell0.appendChild(el0);
      row.appendChild(cell0);

      //---------------------------------------------------------
      //  Cell 1:  Delete Column (row)
      //    Holds an icon/link to delete the row
      var cell1 = row.insertCell(1);
      cell1.className = "icon";
      var el1   = document.createElement('img');
      if (!EDITDISABLED) {
        el1.src   = "/images/deletesmall.gif";
        el1.title = "Delete this column";
        el1.onclick = new Function ("removeColumn(" + column + ");");
      } else {
        el1.src   = "/images/deletesmalldisabled.gif";
        el1.title = "Cannot edit column";
      }
      cell1.appendChild(el1);

      //---------------------------------------------------------
      //  Cell 2:  Copy Column (row)
      //    Holds an icon/link to copy the row
      var cell2 = row.insertCell(2);
      cell2.className = "icon";
      var el2   = document.createElement('img');
      if (!EDITDISABLED) {
        el2.src   = "/images/copysmall.gif";
        el2.title = "Copy this column";
        el2.onclick = new Function ("copyColumn(" + column + ");");
      } else {
        el2.src   = "/images/copysmalldisabled.gif";
        el2.title = "Cannot copy column";
      }
      cell2.appendChild(el2);

      //---------------------------------------------------------
      //  Cell 3:  Column Reordering
      //    Holds a couple of images/links to handle
      //    reordering rows of the markers table
      var cell3 = row.insertCell(3);
      cell3.className = "icon";

      //  Move up (toward top of list; index gets smaller)
      var el3aUp    = document.createElement('a');
      el3aUp.href   = "#nogo";
      var el3aUpImg = document.createElement('img');
      el3aUpImg.className = "movers";
      if (column == 0 || EDITDISABLED) {    // disable UP on first element
        el3aUpImg.src     = "/images/upsmalldisabled.gif";
      } else {
        el3aUp.title   = "move up"
        el3aUp.onclick = new Function("this.blur(); moveColumn(-(" + column + "));");
        el3aUpImg.src  = "/images/upsmall.gif";
      }
      el3aUp.appendChild(el3aUpImg);

      //  Move down (toward bottom of list; index gets bigger)
      var el3aDwn    = document.createElement('a');
      el3aDwn.href   = "#nogo";
      var el3aDwnImg = document.createElement('img');
      el3aDwnImg.className = "movers";
      if (column == BODY.COLUMNS.length - 1 || EDITDISABLED) {  // disable DOWN on last element
        el3aDwnImg.src     = "/images/downsmalldisabled.gif";
      } else {
        el3aDwn.title      = "move down"
        el3aDwn.onclick    = new Function ("this.blur(); moveColumn(" + column + ");");
        el3aDwnImg.src     = "/images/downsmall.gif";
      }
      el3aDwn.appendChild(el3aDwnImg);

      cell3.appendChild(el3aUp);
      cell3.appendChild(el3aDwn);

      //---------------------------------------------------------
      //  Cell 4:  Column Type
      //    Holds a selection box to select the column type
      var sType = BODY.COLUMNS[column].sType;
      if (sType == "Custom Field") {
        sType = "Field";
      }

      var cell4      = row.insertCell(4);
      cell4.className = "ni";
      var el4a       = document.createElement('input');
      el4a.type      = "text";
      el4a.id        = column + "_type";
      el4a.name      = column + "_type";
      el4a.value     = sType;
      el4a.className = "hidden";

      var el4b       = document.createElement('div');
      var el4c       = document.createTextNode(sType);
      el4b.id        = column + "_type_display";
      el4b.appendChild(el4c);
      el4b.className = "";

      if (!EDITDISABLED) {
        cell4.title    = "Click to change the column type";
        el4b.onclick   = new Function ("changeType(" + column + ");");
      } else {
        cell4.className = "grayedout";
      }

      cell4.appendChild(el4a);
      cell4.appendChild(el4b);

      //---------------------------------------------------------
      //  Cell 5:  Column Label
      //    Holds a text entry box to define the
      //    column label to be placed with the column
      var cell5  = row.insertCell(5);
      cell5.className = "ni";
      var el5a   = document.createElement('input');
      el5a.type  = "text"
      el5a.className = "hidden";
      el5a.id    = column + "_columnLabel";
      el5a.name  = column + "_columnLabel";
      el5a.value = BODY.COLUMNS[column].sLabel;
      el5a.onblur = new Function ("updateColumnLabel(" + column + ");");

      var el5b  = document.createElement('div');
      var el5c  = document.createTextNode((BODY.COLUMNS[column].sLabel == "")? "[Empty]" : BODY.COLUMNS[column].sLabel);
      el5b.id   = column + "_columnLabel_display";
      el5b.appendChild(el5c);

      if (!EDITDISABLED) {
        cell5.title     = "Click to edit the column label";
        el5b.onclick   = new Function ("changeColumnLabel(" + column + ");");
      } else {
        cell5.className = "grayedout";
      }

      cell5.appendChild(el5a);
      cell5.appendChild(el5b);

      //---------------------------------------------------------
      //  Cell 6:  Column Run Selection
      //    Holds a selection box to select the run
      var cell6      = row.insertCell(6);
      cell6.className = "w9";
      var el6a       = document.createElement('input');
      el6a.type      = "text";
      el6a.id        = column + "_run";
      el6a.name      = column + "_run";
      el6a.value     = BODY.COLUMNS[column].sRunSelection;
      el6a.className = "hidden";

      var el6b       = document.createElement('div');
      var el6text = "--"
      if ((TESTS.indexOf(BODY.COLUMNS[column].sType) != -1 || BODY.COLUMNS[column].sType == "Custom Field") && !EDITDISABLED) {
        el6text = BODY.COLUMNS[column].sRunSelection;
        cell6.title    = "Click to change the run selection";
        el6b.onclick   = new Function ("changeColumnRunSelection(" + column + ");");
      } else {
        cell6.className = "grayedout";
      }

      var el6c       = document.createTextNode(el6text);
      el6b.id        = column + "_run_display";
      el6b.appendChild(el6c);
      el6b.className = "";
      cell6.appendChild(el6a);
      cell6.appendChild(el6b);

      //---------------------------------------------------------
      //  Cell 7:  Run Number
      //    integer value to tell what run number to use
      var cell7       = row.insertCell(7);
      cell7.className = "w9";
      var el7a       = document.createElement('input');
      el7a.type      = "text";
      el7a.id        = column + "_runNumber";
      el7a.name      = column + "_runNumber";
      el7a.value     = BODY.COLUMNS[column].dRunNumber;
      el7a.title     = "Change the Test Run";
      el7a.onblur    = new Function ("armSaveColumnRun(" + column + ")");  // handle saving changes
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
      var el7Ctl       = document.createElement('span');
      el7Ctl.id        = column + "_runNumber_control";
      el7Ctl.name      = column + "_runNumber_control";
      el7Ctl.className = "hidden";

      // numeric Increase
      var el7Up      = document.createElement('a');
      el7Up.href     = "#nogo";
      var el7UpImg   = document.createElement('img');
      el7Up.title    = "Increase";
      el7Up.onclick  = new Function ("editColumnRun(" + column + ", 1);");
      el7UpImg.src   = "/images/scrollup.gif";
      el7Up.appendChild(el7UpImg);

      // numeric Decrease
      var el7Dwn     = document.createElement('a');
      el7Dwn.href    = "#nogo";
      var el7DwnImg  = document.createElement('img');
      el7Dwn.title   = "Decrease";
      el7Dwn.onclick = new Function ("editColumnRun(" + column + ", -1);");
      el7DwnImg.src  = "/images/scrolldown.gif";
      el7DwnImg.id   = "down";
      el7Dwn.appendChild(el7DwnImg);

      el7Ctl.appendChild(el7Up);
      el7Ctl.appendChild(el7Dwn);
      cell7.appendChild(el7Ctl);

      var el7b     = document.createElement('div');
      el7b.id      = column + "_runNumber_display";
      el7b.name    = column + "_runNumber_display";
      var el7c     = document.createTextNode(BODY.COLUMNS[column].dRunNumber);
      el7b.appendChild(el7c);
      cell7.appendChild(el7b);

      if (BODY.COLUMNS[column].sRunSelection == "Test Run" && !EDITDISABLED) {
        cell7.title     = "Click to change the Test Run";
        el7b.onclick = new Function ("editColumnRun(" + column + ", 0);");
      } else {
        cell7.className = "w9 grayedout";
      }

      //---------------------------------------------------------
      //  Cell 8:  Column Field
      //    Holds a selection box to select the field to match
      var cell8      = row.insertCell(8);
      cell8.className = "w9";
      var el8a       = document.createElement('input');
      el8a.type      = "text";
      el8a.id        = column + "_field";
      el8a.name      = column + "_field";
      el8a.value     = fieldIdToDisplay(BODY.COLUMNS[column].sField);
      el8a.className = "hidden";

      var el8b       = document.createElement('div');
      var el8c       = document.createTextNode(fieldIdToDisplay(BODY.COLUMNS[column].sField));
      el8b.id        = column + "_field_display";
      el8b.appendChild(el8c);
      el8b.className = "";
      cell8.appendChild(el8a);
      cell8.appendChild(el8b);

      if (BODY.COLUMNS[column].sRunSelection == "Match Field" && !EDITDISABLED) {
        cell8.title    = "Click to change the field";
        el8b.onclick   = new Function ("changeColumnField(" + column + ");");
      } else {
        cell8.className = "w9 grayedout";
      }


      //---------------------------------------------------------
      //  Cell 9:  Column Field Value
      //    Holds a text entry box to define the
      //    column field value to match
      var cell9  = row.insertCell(9);
      cell9.className = "w9";
      var el9a   = document.createElement('input');
      el9a.type  = "text"
      el9a.className = "hidden";
       el9a.id    = column + "_fieldValue";
      el9a.name  = column + "_fieldValue";
      el9a.value = BODY.COLUMNS[column].sFieldValue;
      el9a.onblur = new Function ("updateColumnFieldValue(" + column + ");");

      var el9b  = document.createElement('div');
      var el9c  = document.createTextNode((BODY.COLUMNS[column].sFieldValue == "")? "[Empty]" : BODY.COLUMNS[column].sFieldValue);
      el9b.id   = column + "_fieldValue_display";
      el9b.appendChild(el9c);
      cell9.appendChild(el9a);
      cell9.appendChild(el9b);

      if (BODY.COLUMNS[column].sRunSelection == "Match Field" && !EDITDISABLED) {
        cell9.title     = "Click to edit the column field value";
        el9b.onclick   = new Function ("changeColumnFieldValue(" + column + ");");
      } else {
        cell9.className = "w9 grayedout";
      }

      //---------------------------------------------------------
      //  Cell 10:  Column Parameters
      //    Holds a the boxes to setup the column parameters
      var parameters = getParameters(column);

      switch (BODY.COLUMNS[column].sType) {
        case "Custom Field":
          var cell10      = row.insertCell(10);
          var el10a       = document.createElement('input');
          el10a.type      = "text";
          el10a.id        = column + "_customField";
          el10a.name      = column + "_customField";
          el10a.value     = fieldIdToDisplay(parameters[1]);
          el10a.className = "hidden";

          var el10b       = document.createElement('div');
          var el10c       = document.createTextNode(fieldIdToDisplay(parameters[1]));
          el10b.id        = column + "_customField_display";
          el10b.appendChild(el10c);
          el10b.className = "";
          cell10.appendChild(el10a);
          cell10.appendChild(el10b);
          cell10.colSpan = 4;

          if (!EDITDISABLED) {
            cell10.title     = "Click to edit the field";
            el10b.onclick   = new Function ("changeCustomField(" + column + ");");
          } else {
            cell10.className = "grayedout";
          }
   
          var cell11      = row.insertCell(11);
          var el11a       = document.createElement('input');
          el11a.type      = "text";
          el11a.id        = column + "_customFieldTest";
          el11a.name      = column + "_customFieldTest";
          el11a.value     = parameters[0];
          el11a.className = "hidden";

          var el11b       = document.createElement('div');
          var el11c       = document.createTextNode(parameters[0]);
          el11b.id        = column + "_customFieldTest_display";
          el11b.appendChild(el11c);
          el11b.className = "";
          cell11.appendChild(el11a);
          cell11.appendChild(el11b);

          if (!EDITDISABLED) {
            cell11.title     = "Click to select the test from which the custom field is retrieved";
            el11b.onclick   = new Function ("changecustomFieldTest(" + column + ");");
          } else {
            cell11.className = "grayedout";
          }
          break;

        case "Constant":
          var cell10      = row.insertCell(10);
          var el10a       = document.createElement('input');
          el10a.type      = "text";
          el10a.id        = column + "_constant";
          el10a.name      = column + "_constant";
          el10a.value     = parameters[3];
          el10a.className = "hidden";

          var el10b       = document.createElement('div');
          var el10c       = document.createTextNode(parameters[0]);
          el10b.id        = column + "_constant_display";
          el10b.appendChild(el10c);
          el10b.className = "";
          cell10.appendChild(el10a);
          cell10.appendChild(el10b);
          cell10.colSpan = 5;

          if (!EDITDISABLED) {
            cell10.title     = "Click to edit the constant";
            el10b.onclick   = new Function ("changeConstant(" + column + ");");
          } else {
            cell10.className = "grayedout";
          }

          break;

        case "Limit":
          var cell10      = row.insertCell(10);
          var el10a       = document.createElement('input');
          el10a.type      = "text";
          el10a.id        = column + "_limitColumn";
          el10a.name      = column + "_limitColumn";
          el10a.value     = VerifyLabel (column,parameters[0]);
          el10a.className = "hidden";

          var el10b       = document.createElement('div');
          var el10c       = document.createTextNode(VerifyLabel (column,parameters[0]));
          el10b.id        = column + "_limitColumn_display";
          el10b.appendChild(el10c);
          el10b.className = "";
          cell10.appendChild(el10a);
          cell10.appendChild(el10b);
          cell10.colSpan = 2;

          if (!EDITDISABLED) {
            cell10.title     = "Click to edit the limit column";
            el10b.onclick   = new Function ("changeLimitColumn(" + column + ");");
          } else {
            cell10.className = "grayedout";
          }

          var A = ["=", "\u2260", ">", "\u2265", "<", "\u2264"];
          var B = ["=", "<>", ">", ">=", "<", "<="];

          var cell11      = row.insertCell(11);
          var el11a       = document.createElement('input');
          el11a.type      = "text";
          el11a.id        = column + "_limitComparsion";
          el11a.name      = column + "_limitComparsion";
          el11a.value     = A[B.indexOf(parameters[1])];
          el11a.className = "hidden";

          var el11b       = document.createElement('div');
          var el11c       = document.createTextNode(A[B.indexOf(parameters[1])]);
          el11b.id        = column + "_limitComparison_display";
          el11b.appendChild(el11c);
          el11b.className = "";
          cell11.appendChild(el11a);
          cell11.appendChild(el11b);

          if (!EDITDISABLED) {
            cell11.title     = "Click to edit the limit comparison";
            el11b.onclick   = new Function ("changeLimitComparison(" + column + ");");
          } else {
            cell11.className = "grayedout";
          }

          var cell12      = row.insertCell(12);
          var el12a       = document.createElement('input');
          el12a.type      = "text";
          el12a.id        = column + "_limitValue";
          el12a.name      = column + "_limitValue";
          el12a.value     = parameters[2];
          el12a.className = "hidden";

          var el12b       = document.createElement('div');
          var el12c       = document.createTextNode(parameters[2]);
          el12b.id        = column + "_limitValue_display";
          el12b.appendChild(el12c);
          el12b.className = "";
          cell12.appendChild(el12a);
          cell12.appendChild(el12b);
          cell12.colSpan = 2;

          if (!EDITDISABLED) {
            cell12.title     = "Click to edit the limit value";
            el12b.onclick   = new Function ("changeLimitValue(" + column + ");");
          } else {
            cell12.className = "grayedout";
          }

          break;

        case "Calculation":
          var cell10      = row.insertCell(10);
          var el10a       = document.createElement('input');
          el10a.type      = "text";
          el10a.id        = column + "_calculationColumn1";
          el10a.name      = column + "_calculationColumn1";
          el10a.value     = VerifyLabel (column,parameters[0]);
          el10a.className = "hidden";

          var el10b       = document.createElement('div');
          var el10c       = document.createTextNode(VerifyLabel (column,parameters[0]));
          el10b.id        = column + "_calculationColumn1_display";
          el10b.appendChild(el10c);
          el10b.className = "";
          cell10.appendChild(el10a);
          cell10.appendChild(el10b);
          cell10.colSpan = 2;

          if (!EDITDISABLED) {
            cell10.title     = "Click to edit the first calculation column";
            el10b.onclick   = new Function ("changeCalculationColumn(" + column + ", 1);");
          } else {
            cell10.className = "grayedout";
          }

          var cell11      = row.insertCell(11);
          var el11a       = document.createElement('input');
          el11a.type      = "text";
          el11a.id        = column + "_calculationComparison";
          el11a.name      = column + "_calculationComparison";
          el11a.value     = parameters[1];
          el11a.className = "hidden";

          var el11b       = document.createElement('div');
          var el11c       = document.createTextNode(parameters[1]);
          el11b.id        = column + "_calculationComparison_display";
          el11b.appendChild(el11c);
          el11b.className = "";
          cell11.appendChild(el11a);
          cell11.appendChild(el11b);

          if (!EDITDISABLED) {
            cell11.title     = "Click to edit the calculation comparison";
            el11b.onclick   = new Function ("changeCalculationComparison(" + column + ");");
          } else {
            cell11.className = "grayedout";
          }

          var cell12      = row.insertCell(12);
          var el12a       = document.createElement('input');
          el12a.type      = "text";
          el12a.id        = column + "_calculationColumn2";
          el12a.name      = column + "_calculationColumn2";
          el12a.value     = VerifyLabel (column,parameters[2]);
          el12a.className = "hidden";

          var el12b       = document.createElement('div');
          var el12c       = document.createTextNode(VerifyLabel (column,parameters[2]));
          el12b.id        = column + "_calculationColumn2_display";
          el12b.appendChild(el12c);
          el12b.className = "";
          cell12.appendChild(el12a);
          cell12.appendChild(el12b);
          cell12.colSpan = 2;

          if (!EDITDISABLED) {
            cell12.title     = "Click to edit the second calculation column";
            el12b.onclick   = new Function ("changeCalculationColumn(" + column + ", 2);");
          } else {
            cell12.className = "grayedout";
          }

          break;

        case "S Parameter":
          var cell10      = row.insertCell(10);
          var el10a       = document.createElement('input');
          el10a.type      = "text";
          el10a.id        = column + "_SPParameter";
          el10a.name      = column + "_SPParameter";
          el10a.value     = "S" + parameters[0] + parameters[1];
          el10a.className = "hidden";

          var el10b       = document.createElement('div');
          var el10c       = document.createTextNode("S" + parameters[0] + parameters[1]);
          el10b.id        = column + "_SPParameter_display";
          el10b.appendChild(el10c);
          el10b.className = "";
          cell10.appendChild(el10a);
          cell10.appendChild(el10b);

          if (!EDITDISABLED) {
            cell10.title     = "Click to edit the SP parameter";
            el10b.onclick   = new Function ("changeSPParameter(" + column + ");");
          } else {
            cell10.className = "grayedout";
          }

          var cell11      = row.insertCell(11);
          var el11a       = document.createElement('input');
          el11a.type      = "text";
          el11a.id        = column + "_SPFormat";
          el11a.name      = column + "_SPFormat";
          el11a.value     = parameters[2];
          el11a.className = "hidden";

          var el11b       = document.createElement('div');
          var el11c       = document.createTextNode(parameters[2]);
          el11b.id        = column + "_SPFormat_display";
          el11b.appendChild(el11c);
          el11b.className = "";
          cell11.appendChild(el11a);
          cell11.appendChild(el11b);

          if (!EDITDISABLED) {
            cell11.title     = "Click to edit the SP format";
            el11b.onclick   = new Function ("changeSPFormat(" + column + ");");
          } else {
            cell11.className = "grayedout";
          }

          var A = ["Value at Frequency", "Maximum", "Maximum (Limit)", "Maximum (Frequency)", "Maximum (Frequency Limit)", "Minimum", "Minimum (Limit)", "Minimum (Frequency)", "Minimum (Frequency Limit)"];
          var B = ["Value", "Maximum", "MaxLimit", "MaxFreq", "MaxFreqLimit", "Minimum", "MinLimit", "MinFreq", "MinFreqLimit"];

          var cell12      = row.insertCell(12);
          var el12a       = document.createElement('input');
          el12a.type      = "text";
          el12a.id        = column + "_SPValue";
          el12a.name      = column + "_SPValue";
          el12a.value     = A[B.indexOf(parameters[3])];
          el12a.className = "hidden";

          var el12b       = document.createElement('div');
          var el12c       = document.createTextNode(A[B.indexOf(parameters[3])]);
          el12b.id        = column + "_SPValue_display";
          el12b.appendChild(el12c);
          el12b.className = "";
          cell12.appendChild(el12a);
          cell12.appendChild(el12b);

          if (!EDITDISABLED) {
            cell12.title     = "Click to edit the SP value";
            el12b.onclick   = new Function ("changeSPValue(" + column + ");");
          } else {
            cell12.className = "grayedout";
          }

          var cell13      = row.insertCell(13);
          var el13a       = document.createElement('input');
          el13a.type      = "text";
          el13a.id        = column + "_SPFrequency";
          el13a.name      = column + "_SPFrequency";
          el13a.value     = parameters[4];
          el13a.onblur = new Function ("changeSPFrequency(" + column + ");");
          el13a.className = "hidden";

          var el13b       = document.createElement('div');
          var el13c       = document.createTextNode(parameters[4]);
          el13b.id        = column + "_SPFrequency_display";
          el13b.appendChild(el13c);
          el13b.className = "";
          cell13.appendChild(el13a);
          cell13.appendChild(el13b);

          if (parameters[3] == "Value" && !EDITDISABLED) {
            cell13.title     = "Click to edit the SP frequency";
            el13b.onclick   = new Function ("changeSPFrequency(" + column + ");");
          } else {
            cell13.className = "grayedout";
          }

          var cell14      = row.insertCell(14);
          var el14a       = document.createElement('input');
          el14a.type      = "text";
          el14a.id        = column + "_SPUnits";
          el14a.name      = column + "_SPUnits";
          el14a.value     = parameters[5];
          el14a.className = "hidden";

          var el14b       = document.createElement('div');
          var el14c       = document.createTextNode(parameters[5]);
          el14b.id        = column + "_SPUnits_display";
          el14b.appendChild(el14c);
          el14b.className = "";
          cell14.appendChild(el14a);
          cell14.appendChild(el14b);

          if (parameters[3] == "Value" && !EDITDISABLED) {
            cell14.title     = "Click to edit the SP units";
            el14b.onclick   = new Function ("changeSPUnits(" + column + ");");
          } else {
            cell14.className = "grayedout";
          }

          break;

        case "DC Attenuation":
          var cell10      = row.insertCell(10);
          var el10a       = document.createElement('input');
          el10a.type      = "text";
          el10a.id        = column + "_DCAParameter";
          el10a.name      = column + "_DCAParameter";
          el10a.value     = parameters[0];
          el10a.className = "hidden";

          var el10b       = document.createElement('div');
          var el10c       = document.createTextNode(parameters[0]);
          el10b.id        = column + "_DCAParameter_display";
          el10b.appendChild(el10c);
          el10b.className = "";
          cell10.appendChild(el10a);
          cell10.appendChild(el10b);
          cell10.colSpan = 5;

          if (!EDITDISABLED) {
            cell10.title     = "Click to edit the DCA parameter";
            el10b.onclick   = new Function ("changeDCAParameter(" + column + ");");
          } else {
            cell10.className = "grayedout";
          }

          break;

        case "Prompted Inputs":
          var cell10      = row.insertCell(10);
          var el10a       = document.createElement('input');
          el10a.type      = "text";
          el10a.id        = column + "_PIParameter";
          el10a.name      = column + "_PIParameter";
          el10a.value     = fieldIdToDisplay(parameters[0]);
          el10a.className = "hidden";

          var el10b       = document.createElement('div');
          var el10c       = document.createTextNode(fieldIdToDisplay(parameters[0]));
          el10b.id        = column + "_PIParameter_display";
          el10b.appendChild(el10c);
          el10b.className = "";
          cell10.appendChild(el10a);
          cell10.appendChild(el10b);
          cell10.colSpan = 5;

          if (!EDITDISABLED) {
            cell10.title     = "Click to edit the PI parameter";
            el10b.onclick   = new Function ("changePIParameter(" + column + ");");
          } else {
            cell10.className = "grayedout";
          }

          break;

        case "PIM":
          var A = ["Maximum IM Level", "Maximum IM Level Frequency", "Mean", "Standard Deviation", "Limit Value"];
          var B = ["MaximumIM", "MaximumFreq", "Mean", "StandardDev", "Limit"];

          var cell10      = row.insertCell(10);
          var el10a       = document.createElement('input');
          el10a.type      = "text";
          el10a.id        = column + "_PIMParameter";
          el10a.name      = column + "_PIMParameter";
          el10a.value     = A[B.indexOf(parameters[0])];
          el10a.className = "hidden";

          var el10b       = document.createElement('div');
          var el10c       = document.createTextNode(A[B.indexOf(parameters[0])]);
          el10b.id        = column + "_PIMParameter_display";
          el10b.appendChild(el10c);
          el10b.className = "";
          cell10.appendChild(el10a);
          cell10.appendChild(el10b);
          if (parameters[0] == "Samples") {
            cell10.colSpan = 5;
          } else {
            cell10.colSpan = 2;
          }

          if (!EDITDISABLED) {
            cell10.title     = "Click to edit the PIM parameter";
            el10b.onclick   = new Function ("changePIMParameter(" + column + ");");
          } else {
            cell10.className = "grayedout";
          }

          if (parameters[0] != "Samples") {
            var cell11      = row.insertCell(11);
            var el11a       = document.createElement('input');
            el11a.type      = "text";
            el11a.id        = column + "_PIMUnits";
            el11a.name      = column + "_PIMUnits";
            el11a.value     = parameters[1];
            el11a.onblur = new Function ("changePIMUnits(" + column + ");");
            el11a.className = "hidden";

            var el11b       = document.createElement('div');
            var el11c       = document.createTextNode(parameters[1]);
            el11b.id        = column + "_PIMUnits_display";
            el11b.appendChild(el11c);
            el11b.className = "";
            cell11.appendChild(el11a);
            cell11.appendChild(el11b);

            if (parameters[0] == "Carrier1" || parameters[0] == "Carrier2" || parameters[0] == "MaximumIM" || parameters[0] == "MaximumFreq") {
              cell11.colSpan = 2;
            } else {
              cell11.colSpan = 3;
            }

            if (!EDITDISABLED) {
              cell11.title     = "Click to edit the PIM units";
              el11b.onclick   = new Function ("changePIMUnits(" + column + ");");
            } else {
              cell11.className = "grayedout";
            }
          }

          if (parameters[0] == "Carrier1" || parameters[0] == "Carrier2" || parameters[0] == "MaximumIM" || parameters[0] == "MaximumFreq") {
            var direction = parameters[2];
            if (direction != "Both") {
              direction = "Sweep " + direction;
            }

            var cell12      = row.insertCell(12);
            var el12a       = document.createElement('input');
            el12a.type      = "text";
            el12a.id        = column + "_PIMDirection";
            el12a.name      = column + "_PIMDirection";
            el12a.value     = direction;
            el12a.className = "hidden";

            var el12b       = document.createElement('div');
            var el12c       = document.createTextNode(direction);
            el12b.id        = column + "_PIMDirection_display";
            el12b.appendChild(el12c);
            el12b.className = "";
            cell12.appendChild(el12a);
            cell12.appendChild(el12b);

            if (!EDITDISABLED) {
              cell12.title     = "Click to edit the PIM direction";
              el12b.onclick   = new Function ("changePIMDirection(" + column + ");");
            } else {
              cell12.className = "grayedout";
            }
          }

          break;
      }
      column++
    }
  }
  // everything's added - paint the table styles
  $("#columns tbody > tr:nth-child(odd)").addClass("o");      // zebra stripes
}

//---------------------------------------------------------
//  Columns Table Cell 1:  Remove Column (row)
//---------------------------------------------------------
function removeColumn(column) {
  BODY.COLUMNS.splice(column, 1);
  
  buildColumnsTable();
  makeChanges();
}

//---------------------------------------------------------
//  Columns Table Cell 2:  Copy Column (row)
//---------------------------------------------------------
function copyColumn(f) {
  BODY.COLUMNS[BODY.COLUMNS.length] = new COLUMN(BODY.COLUMNS[f].sType, "Column "+BODY.COLUMNS.length, BODY.COLUMNS[f].sRunSelection,BODY.COLUMNS[f].dRunNumber,BODY.COLUMNS[f].sField,BODY.COLUMNS[f].sFieldValue,BODY.COLUMNS[f].sParameters);

  buildColumnsTable();
  makeChanges();
}

//---------------------------------------------------------
//  Columns Table Cell 3:  Reorder Columns
//---------------------------------------------------------
function moveColumn(column) {

  var dir = 1;
  if (column < 0) {
    dir = -1;
    column = -column;
  }          
  var m =   BODY.COLUMNS[column];
  
  tempCOLUMN = new  COLUMN(m.sType, m.sLabel, m.sRunSelection, m.dRunNumber, m.sField, m.sFieldValue, m.sParameters)

  BODY.COLUMNS[column] = BODY.COLUMNS[column + dir];
  BODY.COLUMNS[column + dir] = tempCOLUMN;
  tempCOLUMN= null;

  buildColumnsTable();
  makeChanges();
}

//---------------------------------------------------------
//  Columns Table Cell 4:  Change Type
//---------------------------------------------------------
function changeType(column) {
  var dtext = document.getElementById(column + "_type_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["Field", "Limit", "Calculation", "Constant", "-----Tests-----"];
  var B = ["Custom Field", "Limit", "Calculation", "Constant", "-----Tests-----"];
  for (var i=0; i<TESTS.length; i++) {
    A[A.length] = TESTS[i];
    B[B.length] = TESTS[i];
  }
  addStringOptions(s, A, B);
  s.selectedIndex = B.indexOf(BODY.COLUMNS[column].sType);
  s.options[4].disabled = true;
  s.onchange = new Function ("saveChangedType(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedType(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedType(column) {
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new type
  if (j != BODY.COLUMNS[column].sType) {
    BODY.COLUMNS[column].sType = j;
    switch (j) {
      case "Custom Field":
        BODY.COLUMNS[column].sParameters = "S Parameter,Serial_Number";
        break;
      case "Limit":
        BODY.COLUMNS[column].sParameters = "Column "+BODY.COLUMNS.length+ ",=,0";
        break;
      case "Calculation":
        BODY.COLUMNS[column].sParameters = "Column "+BODY.COLUMNS.length + ",+," + "Column "+BODY.COLUMNS.length;
        break;
      case "Constant":
        BODY.COLUMNS[column].sParameters = "0";
        break;
      case "S Parameter":
        BODY.COLUMNS[column].sParameters = "1,1,Log Mag,Value,1000,MHz";
        break;
      case "DC Attenuation":
        BODY.COLUMNS[column].sParameters = "Attenuation";
        break;
      case "Prompted Inputs":
        if (PIFIELDS.length >0) {
          BODY.COLUMNS[column].sParameters = PIFIELDS[0].sxFieldId;
        }
        else {
          BODY.COLUMNS[column].sParameters = "";
        }
        break;
      case "PIM":
        BODY.COLUMNS[column].sParameters = "MaximumIM,dBm,Both"
        break;
    }
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//---------------------------------------------------------
//  Columns Table Cell 5:  Change Column Label
//---------------------------------------------------------
function changeColumnLabel(column) {
  var dtext = document.getElementById(column + "_columnLabel_display");
  
  // hide currently displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = column + "_text";
  t.value = BODY.COLUMNS[column].sLabel;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("updateColumnLabel(" + column + ");");   // handle storing after edit
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

function updateColumnLabel(column) {
  var t     = document.getElementById(column + "_text");
  var j     = t.value; // get the field value text
  var parameters = "";

  // don't make changes if they didn't select a new label
  if (j != BODY.COLUMNS[column].sLabel) {
    for (var i=0; i<BODY.COLUMNS.length; i++) {
      parameters = getParameters(i);
      for (var k=0; k<parameters.length; k++) {
        if (parameters[k] == BODY.COLUMNS[column].sLabel) {
          parameters[k] = j;
        }
      }
      BODY.COLUMNS[i].sParameters = setParameters(parameters);
    }
    BODY.COLUMNS[column].sLabel = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildColumnsTable();
}

//---------------------------------------------------------
//  Columns Table Cell 6:  Change Run Selection
//---------------------------------------------------------
function changeColumnRunSelection(column) {
  var dtext = document.getElementById(column + "_run_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["Most Recent", "Test Run", "Match Field"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(BODY.COLUMNS[column].sRunSelection);
  s.onchange = new Function ("saveChangedColumnRunSelection(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedColumnRunSelection(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedColumnRunSelection(column) {
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new run selection
  if (j != BODY.COLUMNS[column].sRunSelection) {
    BODY.COLUMNS[column].sRunSelection = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//---------------------------------------------------------
//  Columns Table Cell 7:  Change Run Number
//---------------------------------------------------------
// the global and armSaveColumnRun() function work with the
// numeric up/down controls to allow the input control to
// lose focus to them but not run the saveColumnRun() function
// until entire group loses focus.  It's a little too
// slick, but works like this:
//   1)  User clicks Run Number table cell -> editColumnRun(column) runs
//   2a) User clicks off now visible control -> armSaveColumnRun()
//       will fire (due to input onBlur() event)
//   2b) User clicks up/down increment; the timeout set in the
//       armSaveColumnRun() function will be cleared by the newest
//       editColumnRun() call.
var RUNTIMER = [0,0];
function armSaveColumnRun(column) {
  RUNTIMER[column] = setTimeout("saveColumnRun(" + column + ")", 250);
}
function editColumnRun(column, scroll) {
  // clear pending changes since
  // we're making more
  clearTimeout(RUNTIMER[column]);

  var s = document.getElementById(column + "_runNumber");

  s.value = Number(s.value) + scroll;
  (s.value < 1) ? s.value = "1" : s.value += '';

  document.getElementById(column + "_runNumber_display").className = "hidden";
  s.parentNode.className = "ctlInteger";
  s.className = "";
  s.focus();
  s.select();

  document.getElementById(column + "_runNumber_control").className = "";
}

function saveColumnRun(column) {
  var s = document.getElementById(column + "_runNumber");

  // validate new entry to be numeric and replace with previous if errors
  if (validateNumeric(s.value) != s.value) {
    s.value = BODY.COLUMNS[column].dRunNumber;
  }

  if (s.value != BODY.COLUMNS[column].dRunNumber) {
    BODY.COLUMNS[column].dRunNumber = s.value;  // update changes to TRACES_SP array
    makeChanges();
  }

  buildColumnsTable();
}

//---------------------------------------------------------
//  Columns Table Cell 8:  Change Field
//---------------------------------------------------------
function changeColumnField(column) {
  var dtext = document.getElementById(column + "_field_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = [], B = [];
  for (var i=0; i<INDEXEDFIELDS.length; i++) {
    if (INDEXEDFIELDS[i].sUnits == "") {
      A[i] = INDEXEDFIELDS[i].sDisplayName;
    } else {
      A[i] = INDEXEDFIELDS[i].sDisplayName + " (" + ALLFIELDS[i].sUnits + ")";
    }
    B[i] = INDEXEDFIELDS[i].sxFieldId;
  }
  addStringOptions(s, A, B);
  s.selectedIndex = B.indexOf(BODY.COLUMNS[column].sField);
  s.onchange = new Function ("saveChangedColumnField(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedColumnField(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedColumnField(column) {
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new field
  if (j != BODY.COLUMNS[column].sField) {
    BODY.COLUMNS[column].sField = j;
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//---------------------------------------------------------
//  Columns Table Cell 9:  Change Column Field Value
//---------------------------------------------------------
function changeColumnFieldValue(column) {
  var dtext = document.getElementById(column + "_fieldValue_display");
  
  // hide currently displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = column + "_text";
  t.value = BODY.COLUMNS[column].sFieldValue;
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("updateColumnFieldValue(" + column + ");");   // handle storing after edit
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

function updateColumnFieldValue(column) {
  var t     = document.getElementById(column + "_text");
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new value
  if (j != BODY.COLUMNS[column].sFieldValue) {
    BODY.COLUMNS[column].sFieldValue = j;
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildColumnsTable();
}

//---------------------------------------------------------
//  Columns Table Cell 10:  Change Parameters
//---------------------------------------------------------
//---------------------------------------------------------------CUSTOM FIELD--------------------------------------------------------------------------
function changeCustomField(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_customField_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = [$('#MNDisplay').attr('value'), $('#SNDisplay').attr('value'), "----------"];
  var B = ["Model_Number", "Serial_Number", "----------"];
  var j = 3;
  for (var i=0; i<ALLFIELDS.length; i++) {
    if (ALLFIELDS[i].sxFieldId != "Model_Number" && ALLFIELDS[i].sxFieldId != "Serial_Number") {
      if (ALLFIELDS[i].sUnits == "") {
        A[j] = ALLFIELDS[i].sDisplayName;
      } else {
        A[j] = ALLFIELDS[i].sDisplayName + " (" + ALLFIELDS[i].sUnits + ")";
      }
      B[j] = ALLFIELDS[i].sxFieldId;
      j++;
    }
  }
  addStringOptions(s, A, B);
  s.selectedIndex = B.indexOf(parameters[1]);
  s.options[2].disabled = true;
  s.onchange = new Function ("saveChangedCustomField(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedCustomField(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedCustomField(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new field
  if (j != parameters[1]) {
    parameters[1] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}
function changecustomFieldTest(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_customFieldTest_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  var A = [];
  s.id  = column + "_select";
    for (var i=0; i<TESTS.length; i++) {
    A[A.length] = TESTS[i];
  }

  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(parameters[0]);
  s.onchange = new Function ("saveChangedcustomFieldTest(" + column + ");");   // handle storing after edit
  s.onblur   = new Function ("saveChangedcustomFieldTest(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedcustomFieldTest(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur   = new Function ("");

  // don't make changes if they didn't select a new format
  if (j != parameters[0]) {
    parameters[0] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//---------------------------------------------------------------CONSTANT------------------------------------------------------------------------------
function changeConstant(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_constant_display");
  
  // hide currently displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = column + "_text";
  t.value = parameters[0];
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("updateConstant(" + column + ");");   // handle storing after edit
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

function updateConstant(column) {
  var parameters = getParameters(column);
  var t     = document.getElementById(column + "_text");
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new constant
  if (j != parameters[0]) {
    parameters[0] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildColumnsTable();
}

//---------------------------------------------------------------LIMIT---------------------------------------------------------------------------------
function changeLimitColumn(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_limitColumn_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = [];
  for (var i=0; i<column+1; i++) {
    A[i] = BODY.COLUMNS[i].sLabel;
  }
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(VerifyLabel(column,parameters[0]));
  s.onchange = new Function ("saveChangedLimitColumn(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedLimitColumn(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedLimitColumn(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new column
  if (j != parameters[0]) {
    parameters[0] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

function changeLimitComparison(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_limitComparison_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["=", "\u2260", ">", "\u2265", "<", "\u2264"];
  var B = ["=", "<>", ">", ">=", "<", "<="];
  addStringOptions(s, A, B);
  s.selectedIndex = B.indexOf(parameters[1]);
  s.onchange = new Function ("saveChangedLimitComparison(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedLimitComparison(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedLimitComparison(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new comparison
  if (j != parameters[1]) {
    parameters[1] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

function changeLimitValue(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_limitValue_display");
  
  // hide currently displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = column + "_text";
  t.value = parameters[2];
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("updateLimitValue(" + column + ");");   // handle storing after edit
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

function updateLimitValue(column) {
  var parameters = getParameters(column);
  var t     = document.getElementById(column + "_text");
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new value
  if (j != parameters[2]) {
    parameters[2] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildColumnsTable();
}

//---------------------------------------------------------------CALCULATION---------------------------------------------------------------------------
function changeCalculationColumn(column, control) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_calculationColumn" + control + "_display");
  if (control == 1) {
    control--;
  }

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = [];
  for (var i=0; i<column; i++) {
    A[i] = BODY.COLUMNS[i].sLabel;
  }
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(VerifyLabel(column,parameters[control]));
  s.onchange = new Function ("saveChangedCalculationColumn(" + column + ", " + control + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedCalculationColumn(" + column + ", " + control + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedCalculationColumn(column, control) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new column
  if (j != parameters[control]) {
    parameters[control] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

function changeCalculationComparison(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_calculationComparison_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["+", "-", "*", "/"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(parameters[1]);
  s.onchange = new Function ("saveChangedCalculationComparison(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveChangedCalculationComparison(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveChangedCalculationComparison(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new comparison
  if (j != parameters[1]) {
    parameters[1] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//---------------------------------------------------------------S PARAMETER----------------------------------------------------------------------------
function changeSPParameter(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_SPParameter_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["S11", "S12", "S21", "S22", "---", "S13", "S14", "S15", "S16", "S17", "S18", "S23", "S24", "S25", "S26", "S27", "S28", "S31", "S32", "S33", "S34", "S35", "S36", "S37", "S38", "S41", "S42", "S43", "S44", "S45", "S46", "S47", "S48", "S51", "S52", "S53", "S54", "S55", "S56", "S57", "S58", "S61", "S62", "S63", "S64", "S65", "S66", "S67", "S68", "S71", "S72", "S73", "S74", "S75", "S76", "S77", "S78", "S81", "S82", "S83", "S84", "S85", "S86", "S87", "S88"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf("S" + parameters[0] + parameters[1]);
  s.options[4].disabled = true;
  s.onchange = new Function ("saveSPChangedParameter(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedParameter(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedParameter(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new parameter
  if (j != "S" + parameters[0] + parameters[1]) {
    parameters[0] = j.substring(1,2);
    parameters[1] = j.substring(2,3);
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

function changeSPFormat(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_SPFormat_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["Log Mag", "Phase", "Delay", "Lin Mag", "SWR", "Loss", "Expanded Phase"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(parameters[2]);
  s.onchange = new Function ("saveSPChangedFormat(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedFormat(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedFormat(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new format
  if (j != parameters[2]) {
    parameters[2] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

function changeSPValue(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_SPValue_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["Value at Frequency", "Maximum", "Maximum (Limit)", "Maximum (Frequency)", "Maximum (Frequency Limit)", "Minimum", "Minimum (Limit)", "Minimum (Frequency)", "Minimum (Frequency Limit)"];
  var B = ["Value", "Maximum", "MaxLimit", "MaxFreq", "MaxFreqLimit", "Minimum", "MinLimit", "MinFreq", "MinFreqLimit"];
  addStringOptions(s, A, B);
  s.selectedIndex = B.indexOf(parameters[3]);
  s.onchange = new Function ("saveSPChangedValue(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedValue(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedValue(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new value
  if (j != parameters[3]) {
    parameters[3] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

function changeSPFrequency(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_SPFrequency_display");
  
  // hide currently displayed value
  dtext.className = "hidden";
  
  // create a text box to show
  var t = document.createElement('input');
  t.type = "text"
  t.id  = column + "_text";
  t.value = parameters[4];
  t.onkeyup = new Function ("validateInput(this, 2);");
  t.onblur = new Function ("updateSPFrequency(" + column + ");");   // handle storing after edit
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

function updateSPFrequency(column) {
  var parameters = getParameters(column);
  var t     = document.getElementById(column + "_text");
  var j     = t.value; // get the field value text

  // don't make changes if they didn't select a new frequency
  if (j != parameters[4]) {
    parameters[4] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  t.parentNode.removeChild(t);
  buildColumnsTable();
}

function changeSPUnits(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_SPUnits_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["Hz", "kHz", "MHz", "GHz"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(parameters[5]);
  s.onchange = new Function ("saveSPChangedUnits(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveSPChangedUnits(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveSPChangedUnits(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new unit
  if (j != parameters[5]) {
    parameters[5] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//---------------------------------------------------------------DC ATTENUATION------------------------------------------------------------------------
function changeDCAParameter(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_DCAParameter_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["Attenuation", "Zin", "Zout", "R1", "R2", "R3", "Rab", "Rac", "Rbc"];
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(parameters[0]);
  s.onchange = new Function ("saveDCAChangedParameter(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("saveDCAChangedParameter(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function saveDCAChangedParameter(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].text;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new parameter
  if (j != parameters[0]) {
    parameters[0] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//---------------------------------------------------------------PROMPTED INPUTS------------------------------------------------------------------------
function changePIParameter(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_PIParameter_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = [], B = [];
  for (var i=0; i<PIFIELDS.length; i++) {
    if (PIFIELDS[i].sUnits == "") {
      A[i] = PIFIELDS[i].sDisplayName;
    } else  {
      A[i] = PIFIELDS[i].sDisplayName + " (" + PIFIELDS[i].sUnits + ")";
    }
    B[i] = PIFIELDS[i].sxFieldId;
  }
  addStringOptions(s, A, B);
  s.selectedIndex = B.indexOf(parameters[0]);
  s.onchange = new Function ("savePIChangedParameter(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("savePIChangedParameter(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function savePIChangedParameter(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new parameter
  if (j != parameters[0]) {
    parameters[0] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//---------------------------------------------------------------PIM-----------------------------------------------------------------------------------
function changePIMParameter(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_PIMParameter_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["Maximum IM Level", "Maximum IM Level Frequency", "Mean", "Standard Deviation", "Limit Value"];
  var B = ["MaximumIM", "MaximumFreq", "Mean", "StandardDev", "Limit"];
  addStringOptions(s, A, B);
  s.selectedIndex = B.indexOf(parameters[0]);
  s.onchange = new Function ("savePIMChangedParameter(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("savePIMChangedParameter(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function savePIMChangedParameter(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;
  
  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new parameter
  if (j != parameters[0]) {
    if (j == "MaximumFreq") {
      parameters[1] = "MHz";
    } else {
      parameters[1] = "dBm";
    }
    parameters[0] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

function changePIMUnits(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_PIMUnits_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  if (parameters[0] == "MaximumFreq") {
    var A = ["Hz", "kHz", "MHz", "GHz"];
  } else {
    var A = ["dBm", "dBc"];
  }
  addStringOptions(s, A, A);
  s.selectedIndex = A.indexOf(parameters[1]);
  s.onchange = new Function ("savePIMChangedUnits(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("savePIMChangedUnits(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function savePIMChangedUnits(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select new units
  if (j != parameters[1]) {
    parameters[1] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

function changePIMDirection(column) {
  var parameters = getParameters(column);
  var dtext = document.getElementById(column + "_PIMDirection_display");

  // hide currently displayed value
  dtext.className = "hidden";

  // create a select box to show choices
  var s = document.createElement('select');
  s.id  = column + "_select";
  var A = ["Both", "Sweep Up", "Sweep Down"];
  var B = ["Both", "Up", "Down"];
  addStringOptions(s, A, B);
  s.selectedIndex = B.indexOf(parameters[2]);
  s.onchange = new Function ("savePIMChangedDirection(" + column + ");");   // handle storing after edit
  s.onblur = new Function ("savePIMChangedDirection(" + column + ");");   // handle storing after edit
  dtext.parentNode.appendChild(s);
  s.focus();
}

function savePIMChangedDirection(column) {
  var parameters = getParameters(column);
  var s     = document.getElementById(column + "_select");
  var j     = s.options[s.selectedIndex].value;

  // remove event so it doesn't fire twice
  s.onchange = new Function ("");
  s.onblur = new Function ("");

  // don't make changes if they didn't select a new direction
  if (j != parameters[2]) {
    parameters[2] = j;
    BODY.COLUMNS[column].sParameters = setParameters(parameters);
    makeChanges();
  }

  s.parentNode.removeChild(s);
  buildColumnsTable();
}

//-----------------------------------------------
// Verify column label
//-----------------------------------------------
function VerifyLabel(column,label) {
  var found = false;
  var A = [];
  for (var i=0; i<column+1; i++) {
    if (label == BODY.COLUMNS[i].sLabel) {
      found= true;
      break;
    }
  }
  if (found) {
    return label;
  }else {
    return   BODY.COLUMNS[0].sLabel;
  }
 }