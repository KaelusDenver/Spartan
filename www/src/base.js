//------------------------------
// Global Page Initialization (sets up header and some global UI handlers)
$(document).ready(function() {
  // Spartan Version
  var spver = SPARTANVERSION.split('.');
  $('#menubody #subtitle span#version').text('v' + spver[0] + ((spver.length > 1)? '.' + spver[1] + ' (build ' + spver[2] + ')' : ''));

  // Header is setup by default for no logged in user
  // so if we don't have a valid login, just return.
  if (THECURRENTUSER.tLoginTime != 0) {

    // Show username link
    $("#headerWelcome").hide()
                       .next()
                       .attr('href', '/cgi-bin/users.vit?edit=' + THECURRENTUSER.sUsername + '&' + randomizer())
                       .text(THECURRENTUSER.sFirstname + ((THECURRENTUSER.sUsername.toLowerCase() != 'administrator')? nbsp() + THECURRENTUSER.sLastname : ''))
                       .show();
  
    // Show station menu link
    if (THECURRENTUSER.fEditStations) $("#headerStation").hide().siblings("a").show();
  
    // Show settings menu link
    if (THECURRENTUSER.fAdmin) $("#headerSettings").show();
  
    // Add help links and Logout link
    $("#QC_about").append(spver[0] + ((spver.length > 1)? '.' + spver[1] : '' ));
    $("#headerHelp > ul > li:hidden").show();
    $("#headerLogout").show();

    // Format menu per user capabilities

    // Testing menu item is now always enabled (it's "home" page landing)
    $("#headerTesting").removeClass("disabled").children("img").each(function () {
        this.src = this.src.replace(/disabled/, "");
      });
    if (THECURRENTUSER.fEditScen || THECURRENTUSER.fRunScen) {
      $("#headerMining").removeClass("disabled").children("img").each(function () {
        this.src = this.src.replace(/disabled/, "");
      });
    }
    if (THECURRENTUSER.fEditTemp) {
      $("#headerTemplates").removeClass("disabled").children("img").each(function () {
        this.src = this.src.replace(/disabled/, "");
      });
    }
    if (THECURRENTUSER.fEditUsers)  $("#headerUsers").removeClass("disabled").children("img").each(function () {
        this.src = this.src.replace(/disabled/, "");
      });
    if (THECURRENTUSER.fEditStations)  $("#headerStations").removeClass("disabled").children("img").each(function () {
        this.src = this.src.replace(/disabled/, "");
      });
    if (THECURRENTUSER.fEditFields)  $("#headerFields").removeClass("disabled").children("img").each(function () {
        this.src = this.src.replace(/disabled/, "");
      });

    // help window
    $('#QC_help').click(function() {
      window.open("http://www.spartantest.com/help/index.htm","Spartan_Help","height=480,width=640,toolbar=yes,scrollbars=yes,status=no,location=no,resizable=yes,menubar=no");
      return false;
    });

    // update the navigation
    $("#menubody > #nav").show();

    // start the page session timer
    $.spSessionTMO({ tmoSeconds: SESSIONTIMEOUT,
                     timeoutPending: function(tick) {
                       $('#pendingLogout').slideDown().children('#countdown').children('#tick').text(tick);
                     },
                     timedOut: function() {
                       document.location = '/cgi-bin/logout.vit?idleLogout';
                     }
                   });

    // set up the idleRefresh handler
    $("#pendingLogout a#idleRefresh").click(function () {
      $(this).blur();
      $('#pendingLogout #countdown').hide().next().show();

      $.spSessionTMO({ tmoSeconds: -1 }); // disable current timeout
      $.get('/cgi-bin/logout.vit?refresh', function(response) {
        var msg = '';

        try { eval('var data=' + response); }
        catch(e) { msg = 'Unable to refresh session.\n\n' + e; }

        if (isBlank(msg) && data.status) msg = 'Unable to refresh session.\n\n' + data.source;

        if (isBlank(msg)) {
          $('#pendingLogout #refresh').hide().prev().show().parent().hide();
          SESSIONTIMEOUT = parseInt(data.sessionTimeout); // set global
          $.spSessionTMO({ tmoSeconds: SESSIONTIMEOUT }); // reset timer w/new tmo
          return false;
        }

        alert(msg); // tell them something bad happened
        document.location = '/cgi-bin/logout.vit'; // and then logout

      });
    });

  } // end if not logged in (tLoginTime != 0)

  //==== Set up global UI click handlers

  // Set up "togglers" - they open/close hidden content w/left arrow
  $(".toggler").click(function () {
    $(this).blur();
    $('#' + $(this).attr("id").slice(1)).slideToggle("normal");
    $(this).toggleClass("toggleOpen"); return false;
  });

  // Set up "tabbers" - they show/hide tabbed content
  $("#content a.tabber").live('click', function () {
    $(this).blur();
    $(".tabber").removeClass("active");  // make all tabs inactive
    $(".tabber").each(function () {      // hide all tab content
      $('#' + this.id.slice(1)).hide();
    });
    $(this).addClass("active");
    $('#' + $(this).attr("id").slice(1)).show(); return false;
  });

  // Set up "sliders" - they show/hide sliding panels
  $(".slider").click(function () {
    $(this).blur();
    // cache a cookie depending on current state,
    // and before that state is changed...
    if ($('#' + this.id.slice(1)).is(':visible')) {
      $.cookie(this.id.slice(1), 'hidden');
    } else {
      $.cookie(this.id.slice(1), null);
    }

    if ($.browser.msie && parseInt($.browser.version) < 7) {
      $('#' + this.id.slice(1)).toggle();
    } else {
      $('#' + this.id.slice(1)).slideToggle();
    }

    return false;
  });

  // Set up nav menu handler
  $("a.disabled").removeAttr("href").click( function () {
    $(this).blur();
    return false;
  });
  $("a.menuLink").click( function () {
    $("a.menuLink ~ ul:visible").hide();
    $(this).blur();
    $('#' + $(this).attr("id").slice(1)).show("fast");
    return false;
  });

  // General document body clicks
  $("*:visible", document.body).click(function (event) {
    $("a.menuLink ~ ul:visible").hide(); // hide open menus
    // hide open dialogs (if not the click target)
    if ($(event.target).parents('.dialog').length == 0 &&
       !$(event.target).is('.dialog'))
      $(".dialog").hide();
  });

});

// Replace the normal jQuery getScript function with one that supports
// debugging and which references the script files as external resources
// rather than inline.  Lets us look at things in Firebug
$.extend({
   getScript: function(url, callback) {
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.src = url;

      // Handle Script loading
      {
         var done = false;

         // Attach handlers for all browsers
         script.onload = script.onreadystatechange = function(){
            if ( !done && (!this.readyState ||
                  this.readyState == "loaded" || this.readyState == "complete") ) {
               done = true;
               if (callback)
                  callback();

               // Handle memory leak in IE
               script.onload = script.onreadystatechange = null;
            }
         };
      }

      head.appendChild(script);

      // We handle everything using the script element injection
      return undefined;
   }
});


// session page timeout counter
$.spSessionTMO = function() {

  //====== Countdown defaults configuration
  var settings = {
    tmoSeconds: 3600, // 1 hour default timeout
    pendingSeconds: 60, // alert when timeout is this close to expiration (seconds)
    intervalMilliseconds: 100, // how often the timeout check runs (milliseconds)
    timeoutPending: function(tick) { }, // function called when close to timeout
    timedOut: function() { }, // function called when timeout expires
    ticker: function(tick) { } // used to view current countdown tick
  }

  //====== Countdown timer implementation
  var COUNTDOWN = null;

  return function(options) {
    $.extend(settings, options); // update the settings
    var startTime = new Date();

    if (COUNTDOWN) clearInterval(COUNTDOWN);  // reset on subsequent calls

    COUNTDOWN = (settings.tmoSeconds < 0)? null : setInterval(function() {
      var elapsedSeconds = Math.ceil((new Date() - startTime) / 1000);

      if (elapsedSeconds > (settings.tmoSeconds - settings.pendingSeconds)) {
        if (elapsedSeconds < settings.tmoSeconds) {
          settings.timeoutPending(settings.tmoSeconds - elapsedSeconds);
        } else {
          $.spSessionTMO({ tmoSeconds: -1 }); // stop timer
          settings.timedOut();
        }
      } else {
        settings.ticker(settings.tmoSeconds - elapsedSeconds);
      }
    }, settings.intervalMilliseconds);
  };
}();




//------------------------------------------------------------------------------------------------------------------------------
//                                                          BEGIN MENU TAB HANDLING
//------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------
// Tabbed menu handling functions
//----------------------------------------------------------
function objTABMENU (tabBaseId, tabLinkBaseId, tabCount, tabClassName, tabLinkActiveClassName, tabLinkInActiveClassName) {
  this.tabBaseId=tabBaseId;
  this.tabLinkBaseId=tabLinkBaseId;
  this.tabCount=tabCount;
  this.tabClassName=tabClassName;
  this.tabLinkActiveClassName=tabLinkActiveClassName;
  this.tabLinkInActiveClassName=tabLinkInActiveClassName;
}
function initMenu(tabBaseId, tabLinkBaseId, tabCount, tabClassName, tabLinkActiveClassName, tabLinkInActiveClassName) {
  return new objTABMENU(tabBaseId, tabLinkBaseId, tabCount, tabClassName, tabLinkActiveClassName,  tabLinkInActiveClassName);
}
function showMenuItem(oMenu, dItem){
  // hide/deactivate all
  for (var i=0; i<oMenu.tabCount; i++) {
    $('#' + oMenu.tabBaseId + i).attr('className', 'hidden');
    if ($('#' + oMenu.tabLinkBaseId + i).attr('className') == oMenu.tabLinkActiveClassName) {
      $('#' + oMenu.tabLinkBaseId + i).attr('className', oMenu.tabLinkInActiveClassName);
    }
  }
  // show selected
  $('#' + oMenu.tabBaseId + dItem).attr('className', oMenu.tabClassName);
  $('#' + oMenu.tabLinkBaseId + dItem).attr('className', oMenu.tabLinkActiveClassName);
}
//------------------------------------------------------------------------------------------------------------------------------
//                                                          END MENU TAB HANDLING
//------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------
//                                                          BEGIN FORM VALIDATION
//------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------
// Use this function to alert the user that they have entered
// and illegal character and replace the string without the character
//-------------------------------------------------------------------
function ILLEGAL(m) {
  var base = ['\\x5C',  // backslash, \
              '\\x2F',  // forward slash, /
              '\\x3A',  // colon, :
              '\\x3C',  // less than, <
              '\\x3E',  // greater than, >
              '\\x7C',  // pipe, |
              '\\x28',  // open parenthesis, (
              '\\x29',  // close parenthesis, )
              '\\x27',  // single quote, '
              '\\x22'   // double quote, "
             ].join('');

  var wild = ['\\x3F',  // question mark, ?
              '\\x2A'   // asterisk, *
             ].join('');

  var othr = ['\\x2C', // comma, ,
              '\\x26'  // ampersand, &
             ].join('');

  var m = m || 2; // return most restrictive RegEx by default
  switch (m) {
    case 1:  // adds wildcards (* and ?) to illegals
      var r = new RegExp("[" + base + wild + "]", "gm");
      break;
    case 2:  // adds wildcards and comma and ampersand to illegals
      var r = new RegExp("[" + base + wild + othr + "]", "gm");
      break;
    case 3:  // adds wildcards and comma and ampersand to illegals
      var r = new RegExp("[" + othr + "]", "gm");
      break;

    default: // adds comma and ampersand to illegals (wildcards OK)
      var r = new RegExp("[" + base + othr + "]", "gm");
  }
  return r;
}

function validateInput(textbox, format){
  var format = format || 2;
  textbox.value = textbox.value.replace(ILLEGAL(format),'');
}

//----------------------------------------------------------
//  Return a string with only the numerical characters
//----------------------------------------------------------
function validateNumeric(string, forceInt) {
  var numeric = '';
  var decimal = false;
  var negsign = false;

  for (var i=0; i<string.length; i++) {
    var ch  = string.substr(i, 1);        // next character

    decimal = ((numeric.indexOf('.') < 0) && (ch == '.'));  // a decimal point (only 1 allowed)
    negsign = (i == 0 && (ch == '-'));    // allow a leading negative sign

    if (isDigit(ch) || decimal || negsign) {
      numeric = (numeric == '0' && !decimal)? ch : numeric + ch; // drop leading 0
    }
  }

  if (isBlank(numeric)) numeric = '0';
  if (numeric == '.')   numeric = '0.';
  if (forceInt) numeric = Math.round(numeric).toString();

  return numeric;
}
//------------------------------------------------------------------------------------------------------------------------------
//                                                          END FORM VALIDATION
//------------------------------------------------------------------------------------------------------------------------------


// This function looks up a key and replaces it if not present
function SearchSetKey(searchkey,newvalue) {
var i = BODY.KEYS.indexOf(searchkey);

  // if not found add it
  if (i < 0) {
    i=BODY.KEYS.push(searchkey);
    i=BODY.VALUES.push(newvalue);
    i=i-1;
  }

return i;
}

// This function looks up a key and replaces it if not present
function SearchSetKey_DS(searchkey,newvalue) {
var i = BODY.PLOTS[BODY.dSelectedPlot].KEYS.indexOf(searchkey);

  // if not found add it
  if (i < 0) {
    i=BODY.PLOTS[BODY.dSelectedPlot].KEYS.push(searchkey);
    i=BODY.PLOTS[BODY.dSelectedPlot].VALUES.push(newvalue);
    i=i-1;
  }
    
return i;
}


//------------------------------------------------------------------------------------------------------------------------------
//                                                          BEGIN MISCELLANEOUS
//------------------------------------------------------------------------------------------------------------------------------

//  Remove spaces from within a string
function removeSpaces(str) {
  var str = '' + str;                // typecast to string
  return str.replace(/\s/g, '');     // replace spaces with empty string (globally)
}

//  returns a non-breaking space for empty strings
function nbsp(str) { if (isBlank(str)) return '\xA0'; return str; }

// legacy helper for visibility toggle with jQuery
function toggleVisible(id) { $('#' + id).toggle(); }

// randomize page requests
function randomizer(){ return 'rnd=' + Math.random().toString().substring(2); }

// set focus on the element
function sf(el) { $('#' + el).focus(); }

//---- prototye indexOf Array method--------------------------
//This prototype is provided by the Mozilla foundation and
//is distributed under the MIT license.
//http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elt /*, from */) {
    var len = this.length;
    var from = Number(arguments[1]) || 0;
    from = (from <0)? Math.ceil(from) : Math.floor(from);
    if (from < 0) from += len;
    for (; from < len; from++) {
      if (from in this && this[from] === elt) return from;
    }
    return -1;
  };
}

// detect a return (ENTER) keypress to activate a blur
function captureReturn(obj, e){
  var keyNum = -1;
  if(window.event){      // IE
    keyNum = e.keyCode;
  }else if(e.which){     // Netscape/Firefox/Opera
    keyNum = e.which;
  }
  // Check for "ENTER" keyPress
  if(keyNum == 13) obj.blur();
}

// detect whether the (ENTER) key was pressed.
function detectEnter(e) {
  var enter;
  try { enter = e.keyCode; }
  catch (e) { enter = e.which; }
  if (enter == 13) return true;
  return false;
}

// Add string options to a select
function addStringOptions(s, text, value) {
  var NotAdded;
  var i, j;
  s.options.length = 0;

  for (var i=0; i<text.length; i++) {
    var o=document.createElement('option');
    o.text = text[i];  // display name
    o.value = value[i];
    try {
      s.add(o,null); // standards compliant
    } catch(ex) {
      s.add(o);      // IE only
    }
  }

  // add friendly note if no options...
  if (text.length <= 0) {
    var o=document.createElement('option');
    o.text="None available";
    try {
      s.add(o,null);
    } catch(ex) {
      s.add(o);
    }
    s.disabled = true;
  }
}
//------------------------------------------------------------------------------------------------------------------------------
//                                                          END MISCELLANEOUS
//------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------------
//                                                          BEGIN SHA1 HASH - Spartan Password Handling
//------------------------------------------------------------------------------------------------------------------------------
function sha1Hash(msg)
{
    // constants [4.2.1]
    var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];

    // PREPROCESSING

    msg += String.fromCharCode(0x80); // add trailing '1' bit to string [5.1.1]

    // convert string msg into 512-bit/16-integer blocks arrays of ints [5.2.1]
    var l = Math.ceil(msg.length/4) + 2;  // long enough to contain msg plus 2-word length
    var N = Math.ceil(l/16);              // in N 16-int blocks
    var M = new Array(N);
    for (var i=0; i<N; i++) {
        M[i] = new Array(16);
        for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
            M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | 
                      (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
        }
    }
    // add length (in bits) into final pair of 32-bit integers (big-endian) [5.1.1]
    M[N-1][14] = ((msg.length-1) >>> 30) * 8;
    M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

    // set initial hash value [5.3.1]
    var H0 = 0x67452301;
    var H1 = 0xefcdab89;
    var H2 = 0x98badcfe;
    var H3 = 0x10325476;
    var H4 = 0xc3d2e1f0;

    // HASH COMPUTATION [6.1.2]

    var W = new Array(80); var a, b, c, d, e;
    for (var i=0; i<N; i++) {

        // 1 - prepare message schedule 'W'
        for (var t=0;  t<16; t++) W[t] = M[i][t];
        for (var t=16; t<80; t++) W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

        // 2 - initialise five working variables a, b, c, d, e with previous hash value
        a = H0; b = H1; c = H2; d = H3; e = H4;

        // 3 - main loop
        for (var t=0; t<80; t++) {
            var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
            var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
            e = d;
            d = c;
            c = ROTL(b, 30);
            b = a;
            a = T;
        }

        // 4 - compute the new intermediate hash value
        H0 = (H0+a) & 0xffffffff;  // note 'addition modulo 2^32'
        H1 = (H1+b) & 0xffffffff; 
        H2 = (H2+c) & 0xffffffff; 
        H3 = (H3+d) & 0xffffffff; 
        H4 = (H4+e) & 0xffffffff;
    }

    return H0.toHexStr() + H1.toHexStr() + H2.toHexStr() + H3.toHexStr() + H4.toHexStr();
}

//
// function 'f' [4.1.1]
//
function f(s, x, y, z) 
{
    switch (s) {
    case 0: return (x & y) ^ (~x & z);
    case 1: return x ^ y ^ z;
    case 2: return (x & y) ^ (x & z) ^ (y & z);
    case 3: return x ^ y ^ z;
    }
}

//
// rotate left (circular left shift) value x by n positions [3.2.5]
//
function ROTL(x, n)
{
    return (x<<n) | (x>>>(32-n));
}

//
// extend Number class with a tailored hex-string method 
//   (note toString(16) is implementation-dependant, and 
//   in IE returns signed numbers when used on full words)
//
Number.prototype.toHexStr = function()
{
    var s="", v;
    for (var i=7; i>=0; i--) { v = (this>>>(i*4)) & 0xf; s += v.toString(16); }
    return s;
}
//------------------------------------------------------------------------------------------------------------------------------
//                                                          END SHA1 HASH
//------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------
//                                                          BEGIN UI TABLE BUILDING
//------------------------------------------------------------------------------------------------------------------------------
function tplIconTableCell(controlId, link, img, title) {
  return [ 'a', { id: controlId, title: title, href: link }, [ 'img', { src: img, alt: title, width: "16", height: "16" } ] ]
}
function tplIconTableCellDelete(controlId, link, img, title, cmsg) {
  return [ 'a', { id: controlId, title: title, href: link}, [ 'img', { src: img, alt: title, width: "16", height: "16", onClick: cmsg } ] ]
}
function tplCheckboxTableCell(controlId, state, disabled, title) {
  var s = (state)? "checked" : "";
  var d = (disabled)? "disabled" : "";
  // note "Type" case sensitivity...
  return [ 'input', { id: controlId, title: title, Type: "checkbox", checked: s, disabled: d } ]
}

function tplRadioTableCell(controlId, val, state, disabled, title) {
  var s = (state)? "checked" : "";
  var d = (disabled)? "disabled" : "";

  // note "Type" case sensitivity...
  // note value is set last
  return [ 'input', { id: controlId, name: controlId, title: title, Type: "radio", checked: s, disabled: d, value: val } ]
}

function tplEditTableCell(controlId, link, displayText, currentValue, title) {
  // note "Type" case sensitivity...
  return [ 'a', { title: title, href: link }, [displayText],
           'input', { id: controlId , name: controlId, Type: "hidden", value: currentValue } ]
}

function tplMoverTableCell(i, l, enable) {

  var upAttr, dwnAttr, upImg, dwnImg;
  if (i == 0 || !enable) {
    upAttr = { className: "moveUp" };
    upImg  = '/images/upsmalldisabled.gif';
  } else {
    upAttr = { id: 'moveup:' + i, href: '#nogo', className: "moveUp" };
    upImg  = '/images/upsmall.gif';
  }
  if (i == l - 1 || !enable) {
    dwnAttr = { className: "moveDown" }
    dwnImg  = '/images/downsmalldisabled.gif';
  } else {
    dwnAttr = { id: 'movedown:' + i, href: '#nogo', className: "moveDown" }
    dwnImg  = '/images/downsmall.gif';
  }

  return [ 'a', upAttr,  [ 'img', { className: 'movers', src: upImg, width: "14", height: "10"  }],
           'a', dwnAttr, [ 'img', { className: 'movers', src: dwnImg, width: "14", height: "10" }]
         ]
}

function tplLinkTableCell(controlId, link, displayText, title, addText) {
  var addText = addText || '';

  return [ 'a', { id: controlId, title: title, href: link }, [displayText],
           addText,
           'span', { id: controlId, className: 'hidden' } ]
}
//------------------------------------------------------------------------------------------------------------------------------
//                                                          END UI TABLE BUILDING
//------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------------
//                                                          BEGIN CHANGES ALERT
//------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------
//  CHANGES ALERT
//  These scripts can be used on pages that need to alert
//  the user that navigating away from the page will cause
//  pending changes to be lost.
//
//  Instructions
//
//  1.  Put the following call into the <head> of your page,
//      and make sure it matches case and syntax:
//
//      window.onbeforeunload=confirmLeave;
//
//  2.  Call one of the following function when the user makes
//      record changes you want him to be aware of:
//      a) makeChanges();  -or-
//      b) updateUndo();
//
//  That's basically it.  Some extra things to know...
//
//---------------------------------------------------------

//---------------------------------------------------------
// Globals
//---------------------------------------------------------
var CHANGES = false;
var WARNING = "You have made changes that you might want to save first.";

//----------------------------------------------------------
//  Alerts the user that there are pending unsaved changes
//  continue - changes will be lost
//----------------------------------------------------------
function saveChangesAlert() {

  if (CHANGES){   //are there any changes
    var msg  = "Are you sure you want to perform this action?\n\n";
        msg += WARNING;
        msg += "\n\nPress OK to continue, or Cancel to stop here.";

    return (confirm(msg));
  }
  return true;  // no changes...continue on...
}

//----------------------------------------------------------
//  Alerts the user that there are pending unsaved changes
//  continuing will attempt to save first...
//----------------------------------------------------------
function autoSaveAlert() {

  if (CHANGES){   //are there any changes
    var msg  = "Are you sure you want to perform this action?\n\n";
        msg += "There are changes that have not yet been saved.";
        msg += "\n\nPress OK to continue (the changes will be saved), or Cancel to stop here.";

    return (confirm(msg));
  }
  return true;  // no changes...continue on...
}


//----------------------------------------------------------
//  Alerts the user that there are pending unsaved changes
//  action cannot be continued
//----------------------------------------------------------
function actionCancelledAlert() {
  if (CHANGES) {
    alert("This action cannot be performed until the current changes are saved.\n\n");
    return true;
  }
  return false;
}

//----------------------------------------------------------
//  track changes to the form to alert user
//----------------------------------------------------------
function makeChanges(alertClass) {
  var alertClass = alertClass || "pendingChanges";

  if (CHANGES) return;  // do nothing if CHANGES already true

  CHANGES = true;
  if  (typeof UNDO_QUEUE != 'undefined' )   {    // handle HTM without undo_queue
      // Now update any UNDO_QUEUE by pushing a "can't undo"
      // operation to halt further undo's at this change.  This
      // is basically to handle legacy items using makeChanges()
      // to indicate pending changes, rather than the newer undo
      // architecture.
      if (isArray(UNDO_QUEUE)) {
        UNDO_QUEUE.length = 0;  // flush queue
        UNDO_QUEUE.push({ what: 'cantundo', obj: {} });
        updateUndo(UNDO_QUEUE);
      } else {
        $("." + alertClass).fadeIn();
      }
      }  else {
        $("." + alertClass).fadeIn();
      }
}

//----------------------------------------------------------
//  replaces the 'makeChanges()' call above with a more
//  robust and feature-rich "Undo" handler
//----------------------------------------------------------
function updateUndo(Q, linkId){
   var linkId = linkId || "undoer";
  // If there are no items that are undoable, hide the undo link.
  if( Q.length == 0 ){
    $("#" + linkId + " > img").attr( { src: "/images/undosmalldisabled.gif", title: "", alt: ""} )
                              .parent().removeAttr("href").attr( { title: "" }).addClass("disabled");
    $("#" + linkId + " ~ .pendingChanges").hide();
    CHANGES=false;

  } else {   // If there are any items that are undoable, show the undo link.

    if ((Q.length == 1) && Q[0].what == 'cantundo' ){  // show disabled if cannot undo (e.g. starting new record)
      $("#" + linkId + " > img").attr( { src: "/images/undosmalldisabled.gif", title: "", alt: ""} )
                                .parent().removeAttr("href").attr( { title: "" }).addClass("disabled");
    } else {
      $("#" + linkId + " > img").attr( { src: "/images/undosmall.gif", title: "undo last operation", alt: "undo last operation" } )
                              .parent().attr( { href: "#nogo" }).removeClass("disabled");
    }

    setTimeout('$("#' + linkId + ' ~ .pendingChanges").fadeIn()', 300);
    CHANGES=true;
  }
}

//----------------------------------------------------------
//  let the user cancel browsing away if pending changes
//----------------------------------------------------------
function confirmLeave() { if (CHANGES) return WARNING; }

//------------------------------------------------------------------------------------------------------------------------------
//                                                          END CHANGES ALERT
//------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------
//                                                          BEGIN DATE FORMATTING
//------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------
//  Javascript/LabVIEW Timestamp Conversions
//    - LV epoch is midnight Jan 1, 1904; LV counts *seconds* since epoch
//    - JS epoch is midnight Jan 1, 1970; JS counts *milliseconds* since epoch
//
//  Return values are floats - to make a date use: d = new Date(return value);
//----------------------------------------------------------
var LVEPOCH    =   (new Date('January 1, 1904 UTC')).getTime(); // LabVIEW epoch in JS time

// get a Javascript timestamp from LabVIEW timestamp (UTC)
function jsTimeFromLV(LVtimestamp) { return ( 1000*parseFloat(LVtimestamp) + LVEPOCH ); }
// get a LabVIEW timestamp (UTC) from Javascript timestamp (local)
function lvTimeFromJS(JStimestamp) { return ((     parseFloat(JStimestamp) - LVEPOCH )/1000); }

// Format time from seconds to English string
function formatTime(seconds) {
  var d = parseInt(seconds / 86400);
  var h = parseInt(seconds / 3600);
  var m = parseInt((seconds - (h * 3600)) / 60);
  var s = parseInt((seconds - (h * 3600)) % 60);

  if (d > 0) h = h % 24;

  var dStr = (d > 0)? d.toString() + ((d == 1)? ' day, '    : ' days, ')    : '';
  var hStr = (h > 0)? h.toString() + ((h == 1)? ' hour'   : ' hours')   : '';
  var mStr = (m > 0)? m.toString() + ((m == 1)? ' minute' : ' minutes') : '';
  var sStr = (s > 0)? s.toString() + ((s == 1)? ' second' : ' seconds') : '';

  // truth table for easier logic
  var H = !(isBlank(hStr));
  var M = !(isBlank(mStr));
  var S = !(isBlank(sStr));

  if ( H &&   M &&  S )  return (dStr + hStr + ', ' + mStr + ', and ' + sStr);
  if (!H && ( M &&  S )) return (dStr + mStr + ' and ' + sStr);
  if ( H && (!M &&  S )) return (dStr + hStr + ' and ' + sStr);
  if ( H && ( M && !S )) return (dStr + hStr + ' and ' + mStr);

  return (hStr + mStr + sStr);
}



/*
 * Date Format 1.2.2
 * (c) 2007-2008 Steven Levithan <stevenlevithan.com>
 * MIT license
 * Includes enhancements by Scott Trenda <scott.trenda.net> and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && (typeof date == "string" || date instanceof String) && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date();
		if (isNaN(date)) throw new SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

//------------------------------------------------------------------------------------------------------------------------------
//                                                          END DATE FORMATTING
//------------------------------------------------------------------------------------------------------------------------------
