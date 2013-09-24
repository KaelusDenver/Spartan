//---------------------------------------------------------------UTILITY FUNCTIONS---------------------------------------------------------------------

//---------------------------------------------------------
// This function intializes the page
//---------------------------------------------------------
function initializePage() {
  var m=  $('#menuTab').val();
  THEMENU = initMenu('tempTab', 'tempTabLink', 3, 'tabbody', 'active', '');
  showMenuItem(THEMENU, $('#menuTab').val());

  if  (m == 2) {
  previewTemplate();
  }    
  $('#copyTemplate').attr('href', '#nogo').attr('title', 'Template cannot be copied').attr('onClick', '').addClass('disabled').children('img').attr('src', '/images/copysmalldisabled.gif');
  $('#deleteTemplate').attr('href', '#nogo').attr('title', 'Template cannot be deleted').attr('onClick', '').addClass('disabled').children('img').attr('src', '/images/deletesmalldisabled.gif');
  $('#saveTemplate').attr('href', '#nogo').attr('title', 'Template cannot be saved').attr('onClick', '').addClass('disabled').children('img').attr('src', '/images/floppysmalldisabled.gif');

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
  $('#outputFormat').val(TEMPLATE.sFormat)
                    .children("[value='PDF']").removeAttr('disabled');
  $('#orientation' + LAYOUT.sOrientation).attr('checked', true);
  $('#orientationIMG').attr('src', '/images/' + LAYOUT.sOrientation + '.gif');
}