// Debug Boolean
var DEBUG = false;

function PIMDebug(message){
  /*
    Write a fancy debugger window here ... maybe JQuery has a cool "floating window" tool that could be used.
    until then, we'll use a generic alert message.
  */
  if(DEBUG) alert(message);
}

//---------------------------------------------------------
//   START PIM CONFIGURATION PANEL CUSTOM SCRIPTS
//---------------------------------------------------------
// *** REQUIREMENTS ***
//  -> "base.js" - must be included in order to utilize
//             the setPrecision() and validateNumeric()
//             form validation methods.
//---------------------------------------------------------

///////////////////////////////////////////////////////////
// --------- *** MAIN FUNCTIONALITY ROUTINES *** ---------
///////////////////////////////////////////////////////////

// --------- INITIALIZATION ---------
// This is the main initialization
// routine to initialize the PIM step
//-----------------------------------
function initStepPIM(uid) {
  PIMDebug(uid + ": Now Initializing");

  // INITIALIZE THE GUI ELEMENTS
  chkAllGUI(uid);

  // INITIALIZE THE MENU, SHOW TAB 0
  var tabs = 5; // PIM configuration has 5 tabs (Not Including Datasheets)
  // sets up a menu global for this panel
  eval('menu' + uid + '=initMenu(\'tab' + uid + '\', \'t' + uid + '\', ' + tabs + ', \'paneltabcontent\', \'active\', \'\');');
   // show tab 0
  showMenuItem(eval('menu' + uid), 0);
  
    PIMDebug(uid + ": Initialization Complete");
}

// ---------   SAVE STEP    ---------
// This is the main save routine to
// save a PIM step to the Database
//-----------------------------------
function saveStepPIM(uid) {
  var s = getPIMStimulusObj(uid);
  var m = getPIMMeasureObj(uid);
  var d = getPIMDisplayObj(uid);
  var l = getPIMLimitObj(uid);
  var PIMKeys = s.saveString() + "&"
              + m.saveString() + "&"
              + d.saveString() + "&"
              + l.saveString();

  return PIMKeys;
}

///////////////////////////////////////////////////////////
// --------------- *** GLOBAL VARIABLES *** --------------
///////////////////////////////////////////////////////////

//----- POWER GLOBALS -------------------------------------
// these power globals limit the power that is allowed to
// be selected at test design time.  This limit is purely
// a convenience since carrier powers are checked before
// run-time.

var MIN_POWER = 30;
var MAX_POWER = 48;

// Units
var DBM = "dBm";
var WATTS = "Watts";
var DBC = "dBc";

// Measurement Type
var FIXED = "FIXEDPAIR";
var SWEPT = "SWEPT";

// Stimulus Port
var PORT1 = "Port 1";
var PORT2 = "Port 2";
// Response Port
var REVERSE = 0;
var FORWARD = 1;

// Given an IM Order, return index (i.e. IM3 = 0)
function IM(order){ return ((order - 3) / 2); }
// Given an IM Index, return order (i.e. 0 = IM3)
function getIM(imIndex){ return ((imIndex * 2) + 3); }

// IM Averaging
var NONE = 0;
var MINIMUM = 1; 
var NORMAL = 2;
var HIGH = 3;
var MAXIMUM = 4;

// Sample Units
var SAMPLES = "Sample(s)";
var SECONDS = "Second(s)";
var SWEEPS = "Sweep(s)";

//----- PIM TestSet BANDS ---------------------------------
// This variable will be populated below by a list of
// supported PIM TestSets (a.k.a. a list of supported
// Front End filter modules.

var PIM_BANDS = null;
var BANDEDGES = 0;

///////////////////////////////////////////////////////////
// ------------ *** DATA OBJECT CLASSES *** --------------
///////////////////////////////////////////////////////////

//----- PIM TestSet Object --------------------------------
// A PIM TestSet object is used to define a supported PIM
// measurement band.  Each TestSet is defined by a name or
// description, TX Range, and RX Range.

function PIMtestSet(desc,txlbound,txubound,rxlbound,rxubound)
{
  // Set Defaults:
  this.title = "";
  this.txlbound = this.txubound = this.rxlbound = this.rxubound = Number.NaN;
  
  // Then set based on Params passed
  if(desc != null) this.title = desc;
  if(txlbound != null) this.txlbound = txlbound; // TX Lower Bound
  if(txubound != null) this.txubound = txubound; // TX Upper Bound
  if(rxlbound != null) this.rxlbound = rxlbound; // RX Lower Bound
  if(rxubound != null) this.rxubound = rxubound; // RX Upper Bound
}

//----- PIM Stimulus Tab Object ---------------------------
// The PIM Stimulus tab should be populated from this object.
// Changes on the Stimulus tab should update the Stimulus
// object. A save-step operation will use the data stored in
// this object to update the database.

function PIM_STIMULUS(uid, c1frequency, c2frequency, c1power, c2power, powerUnits, measurementType, frequencyStep)
{
  // Set Defaults:
  this.uid = uid;
  this.c1Freq = this.c2Freq = Number.NaN;
  this.c1Pwr = this.c2Pwr = 43.0;
  this.pwrLocked = true;
  this.pwrUnits = DBM;
  this.measType = FIXED;
  this.sweptFreqStep = 0;
  this.alc = true;
  this.PIMband = 0;

  // Object Methods
  this.setBand = function(band){
    var bandSelect = document.getElementById("TXBAND" + this.uid);

    this.PIMband = band;

    setOverride(this.uid, false);

    // Force band edges when a band is selected
    this.setC1Freq(PIM_BANDS[this.PIMband].txlbound);
    this.setC2Freq(PIM_BANDS[this.PIMband].txubound);
  }

  this.setC1Freq = function(freq){
    var c1FreqCtl = document.getElementById("C1FREQ" + this.uid);
    var freqBand = PIM_BANDS[this.PIMband];
    // Carrier 1 can tune between the Band low boundary and Carrier 2
    var c1Max = inBoundsAndCoerce(Math.min(freqBand.txubound, this.c2Freq) - .2, freqBand.txlbound, freqBand.txubound);
    this.c1Freq = setPrecision(inBoundsAndCoerce(freq, freqBand.txlbound, c1Max),1);
    
    // Set Freq Control value/title
    if(this.PIMband == BANDEDGES){ c1FreqCtl.value = "Auto"; c1FreqCtl.title = "The analyzer's default Carrier 1 Start frequency will be used."; }
    else{ c1FreqCtl.value = String(this.c1Freq); c1FreqCtl.title = "Carrier 1 frequency. Set between " + freqBand.txlbound + "MHz and " + freqBand.txubound + "MHz."; }
  }

  this.setC2Freq = function(freq){
    var c2FreqCtl = document.getElementById("C2FREQ" + uid);
    var freqBand = PIM_BANDS[this.PIMband];
    // Carrier 2 can tune between Carrier 1 and the Band upper boundary
    var c2Min = inBoundsAndCoerce(Math.max(freqBand.txlbound, this.c1Freq) + .2, freqBand.txlbound, freqBand.txubound);
    this.c2Freq = setPrecision(inBoundsAndCoerce(freq, c2Min, freqBand.txubound),1);

    // Set Freq Control value/title
    if(this.PIMband == BANDEDGES){ c2FreqCtl.value = "Auto"; c2FreqCtl.title = "The analyzer's default Carrier 2 Stop frequency will be used."; }
    else{ c2FreqCtl.value = String(this.c2Freq); c2FreqCtl.title = "Carrier 2 frequency. Set between " + freqBand.txlbound + "MHz and " + freqBand.txubound + "MHz."; }
  }

  this.setC1Pwr = function(p){
    var pMax = MAX_POWER, pMin = MIN_POWER;
    if(this.pwrUnits == WATTS){ pMax = convert_dBm2Watts(MAX_POWER); pMin = convert_dBm2Watts(MIN_POWER); }
    this.c1Pwr = inBoundsAndCoerce(p, pMin, pMax);
    if(this.pwrLocked) this.c2Pwr = this.c1Pwr;
    this.setPwrUnits(this.pwrUnits);
  }

  this.setC2Pwr = function(p){
    var pMax = MAX_POWER, pMin = MIN_POWER;
    if(this.pwrUnits == WATTS){ pMax = convert_dBm2Watts(MAX_POWER); pMin = convert_dBm2Watts(MIN_POWER); }
    this.c2Pwr = inBoundsAndCoerce(p, pMin, pMax);
    this.setPwrUnits(this.pwrUnits);
  }

  this.setPwrUnits = function(units){
    PIMDebug(this.uid + ": Setting Power Units to '" + units + "'");
    if(units != this.pwrUnits){ // Check to see if we're already in these units
      if(units == WATTS){
        this.pwrUnits = WATTS;
        this.c1Pwr = convert_dBm2Watts(this.c1Pwr);
        this.c2Pwr = convert_dBm2Watts(this.c2Pwr);
      }else{
        this.pwrUnits = DBM;
        this.c1Pwr = convert_Watts2dBm(this.c1Pwr);
        this.c2Pwr = convert_Watts2dBm(this.c2Pwr);
      }
      PIMDebug(this.uid + ": units('" + units + "') != this.pwrUnits('" + this.pwrUnits + "')");
    }
    document.getElementById("C1POWER" + this.uid).value = setPrecision(this.c1Pwr, 2);
    document.getElementById("C2POWER" + this.uid).value = setPrecision(this.c2Pwr, 2);
    document.getElementById("C1UNITS" + this.uid).value = this.pwrUnits;
  }

  this.setLock = function(lock){
    var c2 = document.getElementById("C2POWER" + this.uid);
    var unlock = document.getElementById("LOCKC2" + this.uid);
    this.pwrLocked = lock;
    // Set controls appropriately
    if(lock){
      c2.disabled = true;
      unlock.checked = false;
      this.setC1Pwr(this.c1Pwr);
    }else {
      c2.disabled = false;
      unlock.checked = true;
    }
  }
  
  this.setMeasType = function(m){ this.measType = m; chkMeasType(this.uid); };
  
  this.freqsEqualEdges = function(){
    return (((this.c1Freq == PIM_BANDS[this.PIMband].txlbound) && (this.c2Freq == PIM_BANDS[this.PIMband].txubound)) || (isNaN(this.c1Freq) && isNaN(this.c2Freq)));
  }

  this.setGUI = function(){
    // Set the Band according to the frequencies
    var bandSelect = document.getElementById("TXBAND" + this.uid);
    bandSelect.value = this.PIMband;

    // Set Frequencies
    this.setC1Freq(this.c1Freq);
    this.setC2Freq(this.c2Freq);
    
    // If Frequencies don't equal band edges, check the "Edit Frequencies" checkbox
    setOverride(this.uid, !(this.freqsEqualEdges()));

    // Set Powers
    this.setPwrUnits(this.pwrUnits); // This command will initialize the power controls
    this.setLock(this.pwrLocked);

    PIMDebug(this.uid + ": Setting MeasType Control");
    // Set Measurement Type
    this.setMeasType(this.measType);
  }

  this.saveString = function(){
    // Remember to convert power to dBm before submitting for save
    if(this.pwrUnits == WATTS){
      this.c1Pwr = convert_Watts2dBm(this.c1Pwr);
      this.c2Pwr = convert_Watts2dBm(this.c2Pwr);
    }
    // Compile save string
    var save = "c1Freq=" + this.c1Freq + "&"
             + "c2Freq=" + this.c2Freq + "&"
             + "c1Power=" + this.c1Pwr + "&"
             + "c2Power=" + this.c2Pwr + "&"
             + "pwrUnits=" + this.pwrUnits + "&"
             + "measType=" + this.measType + "&"
             + "freqStep=" + this.sweptFreqStep;

    return save;
  }

// OBJECT CONSTRUCTOR (Set Provided Parameters)
  if(c1frequency != null){
    if(Number(c1frequency) == 0) c1frequency = NaN;
    this.c1Freq = c1frequency;
  }
  if(c2frequency != null){
    if(Number(c2frequency) == 0) c2frequency = NaN;
    this.c2Freq = c2frequency;
  }
  if(c1power != null) this.c1Pwr = c1power;
  if(c2power != null) this.c2Pwr = c2power;
  this.pwrLocked = (this.c1Pwr == this.c2Pwr);
  // Power units should be treated specially so that the power controlls get set correctly on init
  if(powerUnits != null){ this.pwrUnits = DBM; this.setPwrUnits(powerUnits); }
  if(measurementType != null) this.measType = measurementType;
  if(frequencyStep != null) this.sweptFreqStep = frequencyStep;
  if(this.c1Pwr == this.c2Pwr) this.pwrLocked = true;
  
  // Set PIMband based on the provided frequencies
  //   PREREQUESIT: PIM_BANDS must be initialized before this method can be run.
  for(i=1; i < PIM_BANDS.length; i++){
    if( (this.c1Freq == inBoundsAndCoerce(this.c1Freq, PIM_BANDS[i].txlbound, PIM_BANDS[i].txubound))
      &&(this.c2Freq == inBoundsAndCoerce(this.c2Freq, PIM_BANDS[i].txlbound, PIM_BANDS[i].txubound)) )
        this.PIMband = i;
  }
}

//----- PIM Measure Tab Object ----------------------------
// The PIM Measure tab should be populated from this object.
// Changes on the Measure tab should update the Measure
// object. A save-step operation will use the data stored in
// this object to update the database.

function PIM_MEASURE(uid, stimulusPort, receiveDirection, baseIMorder, averaging, numberSamples, sampleType, updateRate)
{
  // DEFAULT CONSTRUCTOR VALUES
  this.uid = uid;
  this.ALCon = true;
  
  // OBJECT CONSTRUCTOR (Set Provided Parameters)
  if(stimulusPort) this.DUTport = stimulusPort; else this.DUTport = PORT1;
  if(receiveDirection) this.Direction = receiveDirection; else this.Direction = REVERSE;
  if(baseIMorder >= 0) this.IMorder = baseIMorder; else this.IMorder = IM(3);
  if(averaging >= 0) this.Averaging = averaging; else this.Averaging = NORMAL;
  if(numberSamples) this.NumSamples = numberSamples; else this.NumSamples = 1;
  if(sampleType) this.SampleUnits = sampleType; else this.SampleUnits = SECONDS;
  if(updateRate > 0) this.UpdateRate = updateRate; else this.UpdateRate = 0;

  // Functions
  this.setIMorder = function(order){
    var orderSelect = document.getElementById("IMORDER" + this.uid);
    this.IMorder = IM(order)
    orderSelect.value = order;
  }

  this.setDUTport = function(p){
    var stimulusPort = document.getElementById("DUTPORT" + this.uid);
    stimulusPort.value = this.DUTport = p;
    this.setPIMparam();
  }

  this.setDirection = function(d){
    var direction = document.getElementById("IM" + this.uid);
    direction.value = this.Direction = d;
    this.setPIMparam();
  }

  this.setPIMparam = function(){
    var paramString = document.getElementById("PPARAM" + this.uid);
    var sPort, rPort;

    // Please NOTE: The response port is defined based on the Stimulus port
    //              combined with the direction of the measurement, so the
    //              direction doesn't define the port number without the Stimulus.
    if(this.DUTport == PORT1){
      sPort = "1";
      if(this.Direction == FORWARD) rPort = "2";
      else rPort = "1";
    }else{
      sPort = "2";
      if(this.Direction == FORWARD) rPort = "1";
      else rPort = "2";
    }

    try{ paramString.innerHTML = "P" + rPort + sPort; } catch(e){ paramString.innerText = "P" + rPort + sPort; }
  }
  
  this.setNumSamples = function(n){
    var numSamps = document.getElementById("MEASURE" + this.uid);
    numSamps = this.NumSamples = inBoundsAndCoerce(n,1);
    getPIMLimitObj(this.uid).setPeakHold(n);
    getPIMDisplayObj(this.uid).setSpan(n);
  }
  
  this.setGUI = function(){
    // Get control objects
    var order = document.getElementById("IMORDER" + this.uid);
    var avg = document.getElementById("AVERAGE" + this.uid);
    var numSamps = document.getElementById("MEASURE" + this.uid);
    var SampleUnits = document.getElementById("MEASURETYPE" + this.uid);
    var updateRate = document.getElementById("SETUPSECS" + this.uid);

    this.setDUTport(this.DUTport);
    this.setDirection(this.Direction);
    this.setIMorder(getIM(this.IMorder));
    avg.value = this.Averaging;
    numSamps.value = this.NumSamples;
    updateRate.value = this.UpdateRate;
    SampleUnits.value = this.SampleUnits;
  }

  this.saveString = function(){
    var save = "updateRate=" + this.UpdateRate + "&"
             + "SampleUnits=" + this.SampleUnits + "&"
             + "numSamples=" + this.NumSamples + "&"
             + "averaging=" + this.Averaging + "&"
             + "IMOrder=" + this.IMorder + "&"
             + "direction=" + this.Direction + "&"
             + "DUTport=" + this.DUTport;
    return save;
  }
}

//----- PIM Display Tab Object ----------------------------
// The PIM Display tab should be populated from this object.
// Changes on the Display tab should update the Display
// object. A save-step operation will use the data stored in
// this object to update the database.

function PIM_DISPLAY(uid, yMin, yMax, yUnits, xSpan)
{
  // Set Defaults
  this.uid = uid;
  this.rangeMin = -160;
  this.rangeMax = -60;
  this.rangeUnits = DBM;
  this.xSpan = 1;

  // Functions
  this.setMax = function(n){
    var maxRange = document.getElementById("DISPLAYMAX" + this.uid);
    this.rangeMax = maxRange.value = setPrecision(Math.max(n, this.rangeMin + 1),0);
  }
  
  this.setMin = function(n){
    var minRange = document.getElementById("DISPLAYMIN" + this.uid);
    this.rangeMin = minRange.value = setPrecision(Math.min(n, this.rangeMax - 1),0);
  }
  
  this.setSpan = function(n){
    var samples = document.getElementById("DISPLAYSAMP" + this.uid);
    var m = getPIMMeasureObj(this.uid);
    var s = getPIMStimulusObj(this.uid);
    var maxSamp = m.numSamples;
    if(s.measType == SWEPT) maxSamp = 1;
    this.xSpan = inBoundsAndCoerce(n,1,maxSamp);
    samples.value = setPrecision(this.xSpan,0);
  }

  this.setUnits = function(units){
    var s = getPIMStimulusObj(this.uid);
    var l = getPIMLimitObj(this.uid);
    
    var dispUnits = document.getElementById('DISPLAYIMUNITS' + this.uid);
    var limitUnits = document.getElementById('PASSIMBELOWUNITS' + this.uid);

    if(units != this.rangeUnits){
      var maxdBm = Math.max(s.c1Pwr,s.c2Pwr);
      if(s.pwrUnits == WATTS) maxdBm = convert_Watts2dBm(maxdBm);
      if(this.rangeUnits == DBM){ //Convert from dBm to dBc
        this.setMin(Number(this.rangeMin) - Number(maxdBm));
        this.setMax(Number(this.rangeMax) - Number(maxdBm));
        l.setLimit(Number(l.refLimit) - Number(maxdBm));
      }else{                      //Convert from dBc to dBm
        this.setMin(Number(this.rangeMin) + Number(maxdBm));
        this.setMax(Number(this.rangeMax) + Number(maxdBm));
        l.setLimit(Number(l.refLimit) + Number(maxdBm));
      }
    }
    
    this.rangeUnits = dispUnits.value = limitUnits.value = units;
  }

  this.setGUI = function(){
    // Set controls
    this.setMax(this.rangeMax);
    this.setMin(this.rangeMin);
    this.setUnits(this.rangeUnits);
    this.setSpan(this.xSpan);
  }
  
  this.saveString = function(){
    // Convert any dBc to dBm for storage:
    var mindBm, maxdBm;
    var s = getPIMStimulusObj(this.uid);
    var maxPWR = Math.max(s.c1Pwr, s.c2Pwr);
    if(this.rangeUnits == DBC){
      mindBm = Number(this.rangeMin) + maxPWR;
      maxdBm = Number(this.rangeMax) + maxPWR;
    }else{
      mindBm = this.rangeMin;
      maxdBm = this.rangeMax;
    }

    var save = "rangeUnits=" + this.rangeUnits + "&"
             + "xSpan=" + this.xSpan + "&"
             + "rangeMax=" + maxdBm + "&"
             + "rangeMin=" + mindBm;
    return save;
  }
  
// OBJECT CONSTRUCTOR (Set Provided Parameters)
  if(yMin) this.rangeMin = yMin;
  if(yMax) this.rangeMax = yMax;
  if(yUnits) this.setUnits(yUnits);
  if(xSpan) this.xSpan = xSpan;
}

//----- PIM Limit Tab Object ------------------------------
// The PIM Limit tab should be populated from this object.
// Changes on the Limit tab should update the Limit
// object. A save-step operation will use the data stored in
// this object to update the database.

function PIM_LIMIT(uid, referenceLimit, peakLast, percent)
{
  // Set Defaults
  this.uid = uid;
  this.refLimit = -100.00;
  this.peakHold = 1;
  this.useLimit = false;
  this.percent = 100;

  // Functions
  this.setLimit = function(n){
    var limit = document.getElementById('PASSIMBELOW' + this.uid);
    var limitUnits = document.getElementById('PASSIMBELOWUNITS' + this.uid);
    var limitEnabled = document.getElementById('ENABLELIMIT' + this.uid);
	
    if(isNaN(n)){
		this.useLimit = limitEnabled.checked = false;
		limit.value = "No Limit";
		limit.disabled = limitUnits.disabled = true;
	}else{
		this.useLimit = limitEnabled.checked = true;
		this.refLimit = limit.value = setPrecision(n,2);
		limit.disabled = limitUnits.disabled = false;
	}
  }
  
  this.toggleLimit = function(on){
	if(isNull(on)) {on = !(this.useLimit);}
	
	if(on)
		this.setLimit(this.refLimit);
	else
		this.setLimit(Number.NaN);
  }
  
  this.setPercent = function(n) {
    var percent = document.getElementById("PASSIMPERCENTAGE" + this.uid);
    this.percent = inBoundsAndCoerce(n, 0, 100);
    percent.value = setPrecision(this.percent, 0);
  }

  this.setPeakHold = function(n){
    var peak = document.getElementById("PEAKHOLDSAMP" + this.uid);
    var m = getPIMMeasureObj(this.uid);
    this.peakHold = inBoundsAndCoerce(n,0,m.numSamples);
    peak.value = setPrecision(this.peakHold,0);
  }

  this.setGUI = function(){
    // Get control objects
    var refLimit = document.getElementById("PASSIMBELOW" + this.uid);
    var refUnits = document.getElementById("PASSIMBELOWUNITS" + this.uid);
    var peakHold = document.getElementById("PEAKHOLDSAMP" + this.uid);
    var percent = document.getElementById("PASSIMPERCENTAGE" + this.uid);

    var d = getPIMDisplayObj(this.uid);

    // Set controls
    refUnits.value = d.rangeUnits;
    peakHold.value = this.peakHold;
    percent.value = this.percent;
  }           
  
  this.saveString = function(){
    var s = getPIMStimulusObj(this.uid);
    var d = getPIMDisplayObj(this.uid);
    var maxPWR = Math.max(s.c1Pwr, s.c2Pwr);
    if(d.rangeUnits == DBC){
      this.refLimit += maxPWR;
    }
    var limitValue = this.refLimit;
    if(!(this.useLimit)) {limitValue = Number.NaN;}

    var save = "peakHold=" + this.peakHold + "&"
             + "refLimit=" + limitValue + "&"
             + "percent=" + this.percent;
             
    return save;
  }
  
// OBJECT CONSTRUCTOR (Set Provided Parameters)
  if(referenceLimit != null) this.setLimit(referenceLimit);
  if(peakLast != null) this.setPeakHold(peakLast);
  if(percent != null) this.setPercent(percent);
}

///////////////////////////////////////////////////////////
// ----------- *** DATA OBJECT ACCESSORS *** -------------

// Get Objects - Use the following accessors to return the 
//               unique object from the referenced PIM
//               configuration panel.

function getPIMStimulusObj(uid) {
  try {  // Determine whether the object requires evaluation before attempting return
    eval('PIM_STIMULUS' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('LOAD_PIM_STIMULUS' + uid).value);
  }
  return (eval('PIM_STIMULUS' + uid));
}

function getPIMMeasureObj(uid) {
  try {  // Determine whether the object requires evaluation before attempting return
    eval('PIM_MEASURE' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('LOAD_PIM_MEASURE' + uid).value);
  }
  return (eval('PIM_MEASURE' + uid));
}

function getPIMDisplayObj(uid) {
  try {  // Determine whether the object requires evaluation before attempting return
    eval('PIM_DISPLAY' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('LOAD_PIM_DISPLAY' + uid).value);
  }
  return (eval('PIM_DISPLAY' + uid));
}

function getPIMLimitObj(uid) {
  try {  // Determine whether the object requires evaluation before attempting return
    eval('PIM_LIMIT' + uid);
  } catch (ex) {  // could be IE and we haven't eval'ed object yet...
    eval(document.getElementById('LOAD_PIM_LIMIT' + uid).value);
  }
  return (eval('PIM_LIMIT' + uid));
}

///////////////////////////////////////////////////////////
// ------ *** UI ATTRIBUTE CONTROL FUNCTIONS *** ---------
///////////////////////////////////////////////////////////
//---------------------------------------------------------
// PIM Panel UI Attribute Control Functions
//   - The following functions are used to ensure the PIM
//     configuration panel controls are enabled/disabled
//     when appropriate
//---------------------------------------------------------

function chkAllGUI(uid){
  // This is a simple method which will check all GUI attributes (calls below functions)
  //  - used primarily to ensure the panel is properly configured when initialized.
  PIMDebug(uid + ": Checking GUI Elements");
  
  PIMDebug(uid + ": Initializing Available PIM Bands");
  // Initialize PIM_BANDS global array
  PIM_BANDS = getPIMbands();
  loadPIMbands(uid);

  PIMDebug(uid + ": Initializing Control Objects");
  // Init GUI Objects
  var s = getPIMStimulusObj(uid);
  var m = getPIMMeasureObj(uid);
  var d = getPIMDisplayObj(uid);
  var l = getPIMLimitObj(uid);

  PIMDebug(uid + ": Set GUI STIMULUS");
  s.setGUI();
  PIMDebug(uid + ": Set GUI MEASURE");
  m.setGUI();
  PIMDebug(uid + ": Set GUI DISPLAY");
  d.setGUI();
  PIMDebug(uid + ": Set GUI LIMIT");
  l.setGUI();
  PIMDebug(uid + ": GUI Initialization Complete");
}

//---------------------------------------------------------
// getPIMbands()
//  - The PIM Test configuration GUI is limited to support
//    only the measurement bands listed here.  This provides
//    flexible adjustments for new and customized measurement
//    bands.

function getPIMbands(){
  var BANDS = new Array();
  BANDS[0] = new PIMtestSet("Band Edges");
  BANDS[1] = new PIMtestSet("SI-700L, SI-700U", 728, 757);
  BANDS[2] = new PIMtestSet("SI-800", 869, 894);
  BANDS[3] = new PIMtestSet("SI-900E", 925, 960);
  BANDS[4] = new PIMtestSet("SI-900", 935, 960);
  BANDS[5] = new PIMtestSet("SI-1800", 1805, 1880);
  BANDS[6] = new PIMtestSet("SI-1900", 1930, 1990);
  BANDS[7] = new PIMtestSet("SI-2000, SI-2000E", 2110, 2170);
  BANDS[8] = new PIMtestSet("SI-2600", 2620, 2695);
  BANDS[9] = new PIMtestSet("SI-3500", 3510, 3594);

  return BANDS;
}

//---------------------------------------------------------
// loadPIMbands(uid)
//  - This method is intended to populate a select comboBox
//    with the PIM bands specified in the PIM_BANDS global
//    variable above.

function loadPIMbands(uid){
  var bandSelect = document.getElementById("TXBAND" + uid);

  // Empty any existing objects from the <select> list
  for(var i=0; i < bandSelect.options.length; i++)
    bandSelect.removeChild(bandSelect.options[0]);

  // Add each PIM TestSet as an option in the list
  var bandOpt = null;
  for(var j=0; j < PIM_BANDS.length; j++){
    bandOpt = document.createElement("OPTION");
    if(j == 0)
      bandOpt.text = PIM_BANDS[j].title;  // Band Edges special selection
    else
      bandOpt.text = PIM_BANDS[j].txlbound + " - " + PIM_BANDS[j].txubound + " MHz";
    bandOpt.title = PIM_BANDS[j].title;
    bandOpt.value = j;
    bandSelect.options.add(bandOpt);
    bandOpt = null;
  }
}

//---------------------------------------------------------
// setOverride(uid, bool)
//  - select/unselect Frequency Override, and set Frequency
//    display appropriate based on selection.

function setOverride(uid, override){
  var overrideCB = document.getElementById("FREQOVERRIDE" + uid);
  var c1Freq = document.getElementById("C1FREQ" + uid);
  var c2Freq = document.getElementById("C2FREQ" + uid);

  if(override != true) override = false;

  overrideCB.disabled = (getPIMStimulusObj(uid).PIMband == BANDEDGES);  // Disable override if Band Edges selected
  overrideCB.checked = override;

  // enable/disable frequency controls based on override state (override = enable)
  // NOTE: We use reverse logic since we're setting disabled rather than enabled
  c1Freq.disabled = c2Freq.disabled = (!override);
}

//---------------------------------------------------------
//   PIM MEASUREMENT TYPE METHODS
//---------------------------------------------------------

//---------------------------------------------------------
// chkMeasType()
//  - the following method enables and disables controls in
//    the PIM step editor GUI based on selected measurement
//    operations (fixed, or swept frequency).

function chkMeasType(uid){
  var s = getPIMStimulusObj(uid);
  PIMDebug(uid + ": Checking MeasType");

  // GUI elements to be updated
  var fixedRadio = document.getElementById("FIXEDPAIR" + uid);
  var sweptRadio = document.getElementById("SWEPT" + uid);
  var swpStep = document.getElementById("SWEPTSTEP" + uid);
  var updateRate = document.getElementById("SETUPRATE" + uid);
  var updateField = document.getElementById("SETUPSECS" + uid);

  // Set the sample units
  chkMeasUnits(uid);
  
  // Enable "type-specific" controls
  if(s.measType == FIXED){
    PIMDebug(uid + ": Setting Controls for FIXED measurement");
    // Select FIXEDPAIR radio
    fixedRadio.checked = true;
    sweptRadio.checked = false;
    // disable | Step size
    swpStep.disabled = true;
    // enable  | Update Rate
    updateRate.disabled = false;
  }
  if(s.measType == SWEPT){
    PIMDebug(uid + ": Setting Controls for SWEPT measurement");
    // Select SWEPT radio
    fixedRadio.checked = false;
    sweptRadio.checked = true;
    // disable | Update Rate
    updateRate.checked = false;
    updateRate.disabled = true;
    updateField.disabled = true;
    // enable  | Step Size,
    swpStep.disabled = false;
    swpStep.value = s.sweptFreqStep;
  }
}

//---------------------------------------------------------
// chkMeasUnits(uid)
//  - the following method will verify that the units
//    displayed on the PIM step editor GUI are appropriate
//    based on the measurement type selected.  It will
//    also enable/disable controls based on unit selection

function chkMeasUnits(uid){
  var s = getPIMStimulusObj(uid);
  var m = getPIMMeasureObj(uid);

  PIMDebug(uid + ": Checking Measurement Units");

  // GUI elements to be updated
  var timeUnits = document.getElementById("MEASURETYPE" + uid);

  var samples = timeUnits.options[0];
  var seconds = timeUnits.options[1];
  var sweeps = timeUnits.options[2];

  // Enable appropriate options based on Measurement Type
  if(s.measType == SWEPT){
    // Disable SECONDS and SAMPLES as choices
    samples.disabled = seconds.disabled = true;
    sweeps.disabled = false;
    m.SampleUnits = SWEEPS;
  }else{
    // Disable SWEEPS as a choice
    sweeps.disabled = true;
    samples.disabled = seconds.disabled = false;
    if(m.SampleUnits == SWEEPS) m.SampleUnits = SAMPLES;
  }
  timeUnits.value = m.SampleUnits;

  PIMDebug(uid + ": SampleUnits are set, checking SampleUnits");

  chkSampleUnits(uid);
}

//---------------------------------------------------------
// chkSampleUnits()
//  - This method checks to ensure the units that are shown
//    on the Display tab are appropriate based on selections
//    made on the MEASURE tab.

function chkSampleUnits(uid){
  // Objects referenced
  var s = getPIMStimulusObj(uid);
  var m = getPIMMeasureObj(uid);
  var d = getPIMDisplayObj(uid);

  // GUI elements to update
  var xRange = document.getElementById("DISPLAYSAMP" + uid);
  var dispUnits = document.getElementById("DISPLAYSAMPLBL" + uid);
  var peakUnits = document.getElementById("PEAKHOLDSAMPLBL" + uid);

  var disp, peak;

  // Determine the best terminology based on object state
  if(s.measType == SWEPT){
    disp = "Sweep(s):";
    peak = "Sweep(s)";
    d.xSpan = xRange.value = 1;
  }else{
    if(m.SampleUnits == SECONDS){
      disp = "Second(s):";
      peak = "Second(s)";
    }else{
      disp = "Sample(s):";
      peak = "Sample(s)";
    }
  }
  try{ dispUnits.innerHTML = disp; } catch(e){ dispUnits.innerText = disp; }
  try{ peakUnits.innerHTML = peak; } catch(e){ peakUnits.innerText = peak; }
}

//---------------------------------------------------------
// setDispForMeas()
//  - this method is used only when the "Measure x samples"
//    value is changed.  When this value is changed we must
//    also update the display samples and peak samples.

function setDispForMeas(uid){
  var l = getPIMLimitObj(uid);
  var dispSamples = document.getElementById("DISPLAYSAMP" + uid);
  var measSamples = document.getElementById("MEASURE" + uid);
  var peakSamp = document.getElementById("PEAKHOLDSAMP" + uid);

  if (Number( measSamples.value) > 0) {
     peakSamp.value = measSamples.value = validateNumeric(measSamples.value);
     if(!(document.getElementById("SWEPT" + uid).checked)) dispSamples.value = measSamples.value;
  } else {
     alert ("Measured samples or seconds must be greater than zero.");
     peakSamp.value = measSamples.value = "1";
     if(!(document.getElementById("SWEPT" + uid).checked)) dispSamples.value = "1";
  }
}

//---------------------------------------------------------
// chngDispUnits(units)
//  - this method will change the display and limit units
//    from dBm to dBc or the reverse depending on selection

function chngDispUnits(units, uid){
  // These are the units controls for display and limits
  var dispUnits = document.getElementById('DISPLAYIMUNITS' + uid);
  var limitUnits = document.getElementById('PASSIMBELOWUNITS' + uid);

  // Next we need to update all controls which reflect these units:
  // display max and min, and the limit field
  var dMax = document.getElementById('DISPLAYMAX' + uid);
  var dMin = document.getElementById('DISPLAYMIN' + uid);
  var limit = document.getElementById('PASSIMBELOW' + uid);
  
  // Get Maximum Carrier power in dBm
  var s = getPIMStimulusObj(uid);
  var c1p = s.c1Pwr;
  var c2p = s.c2Pwr;
  if(s.pwrUnits == WATTS){
    c1p = convert_Watts2dBm(c1p);
    c2p = convert_Watts2dBm(c2p);
  }
  var cMax = Math.max(c1p, c2p);

  // Now update the appropriate fields
  dispUnits.value = limitUnits.value = units;
  if(units == "dBm"){
    // Changing from dBc to dBm
    dMax.value = setPrecision(parseFloat(dMax.value) + cMax,0);
    dMin.value = setPrecision(parseFloat(dMin.value) + cMax,0);
    limit.value = setPrecision(parseFloat(limit.value) + cMax,2);
  }else{
    // Changing from dBm to dBc
    dMax.value = setPrecision(parseFloat(dMax.value) - cMax,0);
    dMin.value = setPrecision(parseFloat(dMin.value) - cMax,0);
    limit.value = setPrecision(parseFloat(limit.value) - cMax,2);
  }
}

//------------------------------------------------------------------------------------------------------------------------------
//                                                          BEGIN UNIT CONVERSION
//------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------
//  Use this function to convert power from dBm to Watts
//----------------------------------------------------------
function convert_dBm2Watts(dBm){
  var Watts = (Math.pow(10,(dBm/10.0))/1000);
  // Un-comment next line for debugging
  // alert("Convert dBm to Watts:\n" + dBm + " dBm = " + Watts + " Watts");
  return Watts;
}

//----------------------------------------------------------
//  Use this function to convert power from Watts to dBm
//----------------------------------------------------------
function convert_Watts2dBm(Watts){
  // The Math.log method performs a natural logarithm.  We will convert this value using one of the logarithm laws
  // ((log base a) x) = (ln x)/(ln a)
  // for our purposes, a = 10
  var dBm = ((Math.log(Math.max(Math.abs(Watts*1000.0),Math.pow(10,-20)))/Math.log(10))*10.0);
  // Un-comment next line for debugging
  // alert("Convert Watts to dBm:\n" + Watts + " Watts = " + dBm + " dBm");
  return dBm;
}
//------------------------------------------------------------------------------------------------------------------------------
//                                                          END UNIT CONVERSION
//------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------
//  Check whether a numeric value falls between two boundaries
//    - i.e. inBoundsAndCoerce(2,5,10) should return 5
//----------------------------------------------------------
function inBoundsAndCoerce(x,lowBound,highBound){
  if((x < lowBound) && (lowBound != null)) return lowBound;
  if((x > highBound) && (highBound != null)) return highBound;
  return x;
}


//----------------------------------------------------------
//  Use this function to set precision with rounding
//    - i.e. setPrecision(19.999,2) returns 20.00
//----------------------------------------------------------
function setPrecision(x,precision){
  var n = 1;
  for(c=0; c < precision; c++){ n = n * 10;}
  n = Math.round(n);

  // 1) move the decimal to an appropriate integer position.
  // 2) round to the nearest integer
  // 3) reset decimal position
  x = Math.round((x * n)).toFixed(0) / n;

  // Return the final calculated value with fixed precision
  return x.toFixed(precision);
}


//---------------------------------------------------------
//   END PIM CONFIGURATION PANEL CUSTOM SCRIPTS
//---------------------------------------------------------