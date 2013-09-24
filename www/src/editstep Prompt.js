function initStepPrompt(uid) {
  if (!EDITDISABLED) {
    $('#prompt' + uid).removeAttr("disabled");
    //$('#prompt' + uid)[0].focus();   focus errors in IE if panel not visible
  }
}

function saveStepPrompt(uid) {
  return 'prompt=' + $('#prompt' + uid).val();
}
