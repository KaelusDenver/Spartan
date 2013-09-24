'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 05/05/2011
'-- Author: Christopher Bauer
'-------------------------------------------------------------------------------
Option Explicit         'This setting requires explicit variable allocation in script.
Sub main()
  AutoIgnoreError = 1     '1 turns off any error popups. 0 Enables popups

  ScriptInclude (AutoActPath&"\DD Lib.vbs") 'Common functions

  Call OdsValAlloc("Green", "ODS_TYPE_LONG", 0)
  Call OdsValAlloc("Black", "ODS_TYPE_LONG", 0)
  Call OdsValAlloc("Blue", "ODS_TYPE_LONG", 0)
  Call OdsValAlloc("Gray", "ODS_TYPE_LONG", 0)
  Call OdsValAlloc("Orange", "ODS_TYPE_LONG", 0)
  Call OdsValAlloc("Red", "ODS_TYPE_LONG", 0)
  Call OdsValAlloc("Cyan", "ODS_TYPE_LONG", 0)
  Call OdsValAlloc("Magenta", "ODS_TYPE_LONG", 0)
  Green = RGB(108, 176, 66)
  Black = RGB(0, 0, 0)
  Blue = RGB(0, 53, 101)
  Gray = RGB(164, 165, 167)
  Orange = RGB(234, 185, 12)
  Red = RGB(176, 37, 47)
  Cyan = RGB(0, 145, 165)
  Magenta = RGB(81, 52, 94)

  Dim bottom, fieldBottom, reportTDR, reportPath, dataPath1, dataPath2, plotCount
  Dim pixelWidth, pixelHeight, channelStart, modelNumber, serialNumber, testType1, testType2
  reportPath = Lookup("Report_Path", T3, "")
  modelNumber = Lookup("Model_Number",T3,"")
  serialNumber = Lookup("Serial_Number",T3,"")
  testType1 = Lookup("Plot1_Style",T3,"")
  testType2 = Lookup("Plot2_Style",T3,"")
  dataPath1 = Lookup("Data_Path", T3, "")&"\"&modelNumber&" "&serialNumber&" "&testType1&".tdms"
  dataPath2 = Lookup("Data_Path", T3, "")&"\"&modelNumber&" "&serialNumber&" "&testType2&".tdms"
  plotCount = 2
  reportTDR = "BPIM Verification Report.tdr"
  pixelWidth = 550
  pixelHeight = 792

  Call PrePage_Processing(reportTDR, reportPath)
  PicDefByIdent = 1 ' Name-Oriented channel referencing.  This must come after the TDR is loaded.

  'Refresh the Plot
  If CInt(UPC(Lookup("PREVIEW", T3, "0"))) = 1 Then
    Call PicUpdate
    Call PicExport(reportPath, "PNG", false, pixelHeight, pixelWidth, "rgb 24", , "NoCompression")  'Exports the current sheet as WMF file
    T7 = reportPath
  Else
    channelStart = GlobUsedChn
    If channelStart > 0 Then
       channelStart = channelStart + 1
    End If
    If (FileExist(dataPath1) And FileExist(dataPath2)) Then
      Call DataFileLoadSel(dataPath1, "TDMS", Lookup("Plot1_Run_ID",T3,"") & "/*")
      Call DataFileLoadSel(dataPath2, "TDMS", Lookup("Plot2_Run_ID",T3,"") & "/*")
      Call FillBPIMReport(channelStart, modelNumber, serialNumber)
      Call PostPage_Processing(reportTDR, reportPath)
    End If
  End If
  T1 = T7
End Sub

Sub FillBPIMReport(channelStart, modelNumber, serialNumber)
  Call Debug("------Enter Fill BPIM Verification------")
  Dim frequencyIndex, testType, verificationDate, i, j, groupIndex, stepTag, frequencyData, frequencyName, measuredChannelListC1, measuredChannelListC2, requestedChannelListC1, requestedChannelListC2
  Dim AutoXPA, XMinPA, XMaxPA, XUnitPA, AutoYPA, YMinPA, YMaxPA, YUnitPA, AutoXPO, XMinPO, XMaxPO, XUnitPO, AutoYPO, YMinPO, YMaxPO, YUnitPO, minPower
  Dim testStatus, testStatusColor, instrumentTypes, instrumentNames, instrumentSerialNumbers, firstC1FrequencyChannel, firstC2FrequencyChannel, firstC1PWMChannel, firstC2PWMChannel, firstC1PIMChannel, firstC2PIMChannel

  'Model Number
  Call GraphObjOpen("Model Number")
  TxtTxt = modelNumber
  Call GraphObjClose("Model Number")

  'Serial Number
  Call GraphObjOpen("Serial Number")
  TxtTxt = serialNumber
  Call GraphObjClose("Serial Number")

  'Operator
  Call GraphObjOpen("Operator")
  TxtTxt = Safe_GroupPropGet(GroupCount, "Operator")
  Call GraphObjClose("Operator")

  'Get the latest End Timestamp
  If CDbl(Safe_GroupPropGet(1, "End_Timestamp")) > CDbl(Safe_GroupPropGet(2, "End_Timestamp")) Then
    verificationDate = CDbl(Safe_GroupPropGet(1, "End_Timestamp"))
  Else
    verificationDate = CDbl(Safe_GroupPropGet(2, "End_Timestamp"))
  End If
  'Verification Date/Time
  Call GraphObjOpen("Verification Date")
  TxtTxt = SpartanDateTime(verificationDate, "DD-ttt-YYYY")
  Call GraphObjClose("Verification Date")

  instrumentTypes = Split(Safe_GroupPropGet(GroupCount, "Instrument_Type"), ",")
  For i = 1 To UBound(instrumentTypes)
    If Trim(instrumentTypes(i)) = "PWM" Then
      Exit For
    End If
  Next
  
  'Instrument Name
  instrumentNames = Split(Safe_GroupPropGet(GroupCount, "Instrument_Name"), ",")
  Call GraphObjOpen("Instrument Name")
  TxtTxt = Trim(instrumentNames(i))
  Call GraphObjClose("Instrument Name")

  'Instrument Type
  Call GraphObjOpen("Instrument Type")
  TxtTxt = Trim(instrumentTypes(i))
  Call GraphObjClose("Instrument Type")

  'Instrument Serial Number
  instrumentSerialNumbers = Split(Safe_GroupPropGet(GroupCount, "Instrument_Serial_Number"), ",")
  Call GraphObjOpen("Instrument Serial Number")
  TxtTxt = Trim(instrumentSerialNumbers(i))
  Call GraphObjClose("Instrument Serial Number")

  'Instrument Calibration Due Date
  Call GraphObjOpen("Instrument Calibration Due Date")
  TxtTxt = SpartanDateTime(CDbl(Safe_GroupPropGet(GroupCount, "Instrument_Calibration_Due_Date")), "DD-ttt-YYYY")
  Call GraphObjClose("Instrument Calibration Due Date")
  
  'DUT Port
  Call GraphObjOpen("DUT Port")
  TxtTxt = "PERFORMANCE VERIFICATION: " & Safe_GroupPropGet(GroupCount, "DUT_Port")
  Call GraphObjClose("DUT Port")

  'Copywrite
  Call GraphObjOpen("Copywrite")
  TxtTxt = "© " & RTT(Now, "YYYY") & " Kaelus All Rights Reserved"
  Call GraphObjClose("Copywrite")
  
  'Version
  Call GraphObjOpen("Version")
  TxtTxt = "Spartan Datasheet " & Safe_GroupPropGet(GroupCount, "Test_Version")
  Call GraphObjClose("Version")

  AutoXPA = CInt(Lookup("Plot1_Auto_X",T3,"1"))
  XMinPA  = CDbl(Lookup("Plot1_X_Min",T3,"37.5"))
  XMaxPA  = CDbl(Lookup("Plot1_X_Max",T3,"44.5"))
  XUnitPA = Lookup("Plot1_X_Unit",T3,"dBm")
  AutoYPA = CInt(Lookup("Plot1_Auto_Y",T3,"1"))
  YMinPA  = CDbl(Lookup("Plot1_Y_Min",T3,"0"))
  YMaxPA  = CDbl(Lookup("Plot1_Y_Max",T3,"0.5"))
  YUnitPA = Lookup("Plot1_Y_Format",T3,"dBm")

  AutoXPO = CInt(Lookup("Plot2_Auto_X",T3,"1"))
  XMinPO  = CDbl(Lookup("Plot2_X_Min",T3,"500"))
  XMaxPO  = CDbl(Lookup("Plot2_X_Max",T3,"1500"))
  XUnitPO = Lookup("Plot2_X_Unit",T3,"MHz")
  AutoYPO = CInt(Lookup("Plot2_Auto_Y",T3,"1"))
  YMinPO  = CDbl(Lookup("Plot2_Y_Min",T3,"43.5"))
  YMaxPO  = CDbl(Lookup("Plot2_Y_Max",T3,"45"))
  YUnitPO = Lookup("Plot2_Y_Format",T3,"dBm")

  testStatus = "Pass"
  testStatusColor = Green

  'Calculate the maximum error for each carrier for the plots
  measuredChannelListC1 = ""
  measuredChannelListC2 = ""
  requestedChannelListC1 = ""
  requestedChannelListC2 = ""
  For i = 1 To GroupChnCount(1)
    If InStr(Safe_ChnPropGet("[1]/[" & i & "]", "Name"), "PWM\PIM Error C1") Then
      measuredChannelListC1 = ChnStrAdd(measuredChannelListC1, "[1]/" & Safe_ChnPropGet("[1]/[" & i & "]", "Name"))
    ElseIf InStr(Safe_ChnPropGet("[1]/[" & i & "]", "Name"), "PWM\PIM Error C2") Then
      measuredChannelListC2 = ChnStrAdd(measuredChannelListC2, "[1]/" & Safe_ChnPropGet("[1]/[" & i & "]", "Name"))
    ElseIf InStr(Safe_ChnPropGet("[1]/[" & i & "]", "Name"), "PWM\Power Error C1") Then
      requestedChannelListC1 = ChnStrAdd(requestedChannelListC1, "[1]/" & Safe_ChnPropGet("[1]/[" & i & "]", "Name"))
    ElseIf InStr(Safe_ChnPropGet("[1]/[" & i & "]", "Name"), "PWM\Power Error C2") Then
      requestedChannelListC2 = ChnStrAdd(requestedChannelListC2, "[1]/" & Safe_ChnPropGet("[1]/[" & i & "]", "Name"))
    End If
  Next
  
  For i = 1 To 23
    StatSel(i)    = "No"
  Next
  StatSel(5)      = "Yes" 'Maximum
  StatClipCopy    = 0
  StatClipValue   = 0
  StatResChn      = 1
  StatResChnNames = 0
  Call StatBlockCalc("Block", "1-", measuredChannelListC1)
  Call ChnMove("[" & GroupCount & "]/[" & GroupChnCount(GroupCount) & "]", 1, GroupChnCount(1) + 1)
  Call ChnPropSet("[1]/[" & GroupChnCount(1) & "]", "Name", "Maximum PWM\PIM Error C1")
  Call StatBlockCalc("Block", "1-", measuredChannelListC2)
  Call ChnMove("[" & GroupCount & "]/[" & GroupChnCount(GroupCount) & "]", 1, GroupChnCount(1) + 1)
  Call ChnPropSet("[1]/[" & GroupChnCount(1) & "]", "Name", "Maximum PWM\PIM Error C2")
  Call StatBlockCalc("Block", "1-", requestedChannelListC1)
  Call ChnMove("[" & GroupCount & "]/[" & GroupChnCount(GroupCount) & "]", 1, GroupChnCount(1) + 1)
  Call ChnPropSet("[1]/[" & GroupChnCount(1) & "]", "Name", "Maximum PWM\Power Error C1")
  Call StatBlockCalc("Block", "1-", requestedChannelListC2)
  Call ChnMove("[" & GroupCount & "]/[" & GroupChnCount(GroupCount) & "]", 1, GroupChnCount(1) + 1)
  Call ChnPropSet("[1]/[" & GroupChnCount(1) & "]", "Name", "Maximum PWM\Power Error C2")

  Call GraphObjOpen("PA C1 Plot")
    'Setup the plot
    D2LegSymDist = 5
    Call GraphObjOpen("2DAxis2_XAxis1")
      D2AxisXTickBegin = Safe_ChnPropGet("[1]/Power", "Minimum")
      D2AxisXOrigin    = Safe_ChnPropGet("[1]/Power", "Minimum") - 0.5
      D2AxisXBegin     = Safe_ChnPropGet("[1]/Power", "Minimum") - 0.5
      D2AxisXEnd       = Safe_ChnPropGet("[1]/Power", "Maximum") + 0.5
    Call GraphObjClose("2DAxis2_XAxis1")

    'Create Limit plot
    Call GraphObjNew("2D-Curve", "Tolerance C1")
    Call GraphObjOpen("Tolerance C1")
      D2CConstYName    = CDbl(Safe_GroupPropGet(1, "Tolerance"))
      D2CCurveType     = "Constant"
      D2CurveColor     = "other colors"
      D2CurveColorRGB  = Red
      D2CurveLineWidth = "1.0"
      D2CCurveLegDrawT = "no"
    Call GraphObjClose("Tolerance C1")

    'Create Measured Error plot
    Call GraphObjNew("2D-Curve", "Measured Error C1")
    Call GraphObjOpen("Measured Error C1")
      D2CCurveLegDrawT = "yes"
      D2CCurveLegTxtA(1)= "Measured Error"
      D2CChnXName      = "[1]/Power"
      D2CChnYName      = "[1]/Maximum PWM\PIM Error C1"
      D2CCurveType     = "Bars"
      D2CurveSpecColor = "other colors"
      D2CurveSpecCoRGB = Orange
      D2CurveSpecLine  = "solid"
      D2CurveSpecWidth = 30
      D2CurveSpecOffs  = -15
      D2CurveHaType    = "filled"
      D2CurveHaColor   = "other colors"
      D2CurveHaColRGB  = Orange
    Call GraphObjClose("Measured Error C1")

    'Create Requested Error plot
    Call GraphObjNew("2D-Curve", "Requested Error C1")
    Call GraphObjOpen("Requested Error C1")
      D2CCurveLegDrawT = "yes"
      D2CCurveLegTxtA(1)= "Requested Error"
      D2CChnXName      = "[1]/Power"
      D2CChnYName      = "[1]/Maximum PWM\Power Error C1"
      D2CCurveType     = "Bars"
      D2CurveSpecColor = "other colors"
      D2CurveSpecCoRGB = Cyan
      D2CurveSpecLine  = "solid"
      D2CurveSpecWidth = 30
      D2CurveSpecOffs  = 15
      D2CurveHaType    = "filled"
      D2CurveHaColor   = "other colors"
      D2CurveHaColRGB  = Cyan
    Call GraphObjClose("Requested Error C1")
  Call GraphObjClose("PA C1 Plot")

  Call GraphObjOpen("PA C2 Plot")
    'Setup the plot
    D2LegSymDist = 5
    Call GraphObjOpen("2DAxis1_XAxis2")
      D2AxisXTickBegin = Safe_ChnPropGet("[1]/Power", "Minimum")
      D2AxisXOrigin    = Safe_ChnPropGet("[1]/Power", "Minimum") - 0.5
      D2AxisXBegin     = Safe_ChnPropGet("[1]/Power", "Minimum") - 0.5
      D2AxisXEnd       = Safe_ChnPropGet("[1]/Power", "Maximum") + 0.5
    Call GraphObjClose("2DAxis1_XAxis2")

    'Create Limit plot
    Call GraphObjNew("2D-Curve", "Tolerance C2")
    Call GraphObjOpen("Tolerance C2")
      D2CConstYName    = CDbl(Safe_GroupPropGet(1, "Tolerance"))
      D2CCurveType     = "Constant"
      D2CurveColor     = "other colors"
      D2CurveColorRGB  = Red
      D2CurveLineWidth = "1.0"
      D2CCurveLegDrawT = "no"
    Call GraphObjClose("Tolerance C2")
    
    'Create Measured Error plot
    Call GraphObjNew("2D-Curve", "Measured Error C2")
    Call GraphObjOpen("Measured Error C2")
      D2CCurveLegDrawT = "yes"
      D2CCurveLegTxtA(1)= "Measured Error"
      D2CChnXName      = "[1]/Power"
      D2CChnYName      = "[1]/Maximum PWM\PIM Error C2"
      D2CCurveType     = "Bars"
      D2CurveSpecColor = "other colors"
      D2CurveSpecCoRGB = Orange
      D2CurveSpecLine  = "solid"
      D2CurveSpecWidth = 30
      D2CurveSpecOffs  = -15
      D2CurveHaType    = "filled"
      D2CurveHaColor   = "other colors"
      D2CurveHaColRGB  = Orange
    Call GraphObjClose("Measured Error C2")
  
    'Create Requested Error plot
    Call GraphObjNew("2D-Curve", "Requested Error C2")
    Call GraphObjOpen("Requested Error C2")
      D2CCurveLegDrawT = "yes"
      D2CCurveLegTxtA(1)= "Requested Error"
      D2CChnXName      = "[1]/Power"
      D2CChnYName      = "[1]/Maximum PWM\Power Error C2"
      D2CCurveType     = "Bars"
      D2CurveSpecColor = "other colors"
      D2CurveSpecCoRGB = Cyan
      D2CurveSpecLine  = "solid"
      D2CurveSpecWidth = 30
      D2CurveSpecOffs  = 15
      D2CurveHaType    = "filled"
      D2CurveHaColor   = "other colors"
      D2CurveHaColRGB  = Cyan
    Call GraphObjClose("Requested Error C2")
  Call GraphObjClose("PA C2 Plot")

  'Concatenate the channels for each carrier for the plots
  firstC1FrequencyChannel = ""
  firstC2FrequencyChannel = ""
  firstC1PWMChannel = ""
  firstC2PWMChannel = ""
  firstC1PIMChannel = ""
  firstC2PIMChannel = ""
  For i = 1 To GroupChnCount(2)
    If InStr(Safe_ChnPropGet("[2]/[" & i & "]", "Name"), "Frequency C1") Then
      If firstC1FrequencyChannel = "" Then
        firstC1FrequencyChannel = "[2]/[" & i & "]"
      End If
      If "[2]/[" & i & "]" <> firstC1FrequencyChannel Then
        Call ChnConcat("[2]/[" & i & "]", firstC1FrequencyChannel)
      End If
    ElseIf InStr(Safe_ChnPropGet("[2]/[" & i & "]", "Name"), "Frequency C2") Then
      If firstC2FrequencyChannel = "" Then
        firstC2FrequencyChannel = "[2]/[" & i & "]"
      End If
      If "[2]/[" & i & "]" <> firstC2FrequencyChannel Then
        Call ChnConcat("[2]/[" & i & "]", firstC2FrequencyChannel)
      End If
    ElseIf InStr(Safe_ChnPropGet("[2]/[" & i & "]", "Name"), "PWM C1") Then
      If firstC1PWMChannel = "" Then
        firstC1PWMChannel = "[2]/[" & i & "]"
      End If
      If "[2]/[" & i & "]" <> firstC1PWMChannel Then
        Call ChnConcat("[2]/[" & i & "]", firstC1PWMChannel)
      End If
    ElseIf InStr(Safe_ChnPropGet("[2]/[" & i & "]", "Name"), "PWM C2") Then
      If firstC2PWMChannel = "" Then
        firstC2PWMChannel = "[2]/[" & i & "]"
      End If
      If "[2]/[" & i & "]" <> firstC2PWMChannel Then
        Call ChnConcat("[2]/[" & i & "]", firstC2PWMChannel)
      End If
    ElseIf InStr(Safe_ChnPropGet("[2]/[" & i & "]", "Name"), "PIM C1") Then
      If firstC1PIMChannel = "" Then
        firstC1PIMChannel = "[2]/[" & i & "]"
      End If
      If "[2]/[" & i & "]" <> firstC1PIMChannel Then
        Call ChnConcat("[2]/[" & i & "]", firstC1PIMChannel)
      End If
    ElseIf InStr(Safe_ChnPropGet("[2]/[" & i & "]", "Name"), "PIM C2") Then
      If firstC2PIMChannel = "" Then
        firstC2PIMChannel = "[2]/[" & i & "]"
      End If
      If "[2]/[" & i & "]" <> firstC2PIMChannel Then
        Call ChnConcat("[2]/[" & i & "]", firstC2PIMChannel)
      End If
    End If
  Next
  
  minPower = CDbl(Safe_GroupPropGet(2, "Minimum_Power"))

  Call GraphObjOpen("PO C1 Plot")
    'Setup the plot
    D2LegSymDist = 5
    Call GraphObjOpen("2DAxis1_XAxis1")
      D2AxisXTickBegin = Safe_ChnPropGet(firstC1FrequencyChannel, "Minimum")
      D2AxisXOrigin    = Safe_ChnPropGet(firstC1FrequencyChannel, "Minimum")
      D2AxisXBegin     = Safe_ChnPropGet(firstC1FrequencyChannel, "Minimum")
      D2AxisXEnd       = Safe_ChnPropGet(firstC1FrequencyChannel, "Maximum")
      D2AxisXTick      = CDbl((Safe_ChnPropGet(firstC1FrequencyChannel, "Maximum") - Safe_ChnPropGet(firstC1FrequencyChannel, "Minimum")) / 8)
      D2AxisXFormat    = "d"
    Call GraphObjClose("2DAxis1_XAxis1")
    
    Call GraphObjOpen("2DAxis1_YAxis1")
      D2AxisYBegin        = minPower - 0.5
      D2AxisYEnd          = minPower + 1
      D2AxisYOrigin       = minPower - 0.5
    Call GraphObjClose("2DAxis1_YAxis1")

    'Create Limit plot
    Call GraphObjNew("2D-Curve", "Minimum Power C1")
    Call GraphObjOpen("Minimum Power C1")
      D2CConstYName    = minPower
      D2CCurveType     = "Constant"
      D2CurveColor     = "other colors"
      D2CurveColorRGB  = Red
      D2CurveLineWidth = "1.0"
      D2CCurveLegDrawT = "no"
    Call GraphObjClose("Minimum Power C1")

    'Create Measured Power plot
    Call GraphObjNew("2D-Curve", "Measured Power C1")
    Call GraphObjOpen("Measured Power C1")
      D2CCurveLegDrawT = "yes"
      D2CCurveLegTxtA(1)= "Measured Power"
      D2CChnXName      = firstC1FrequencyChannel
      D2CChnYName      = firstC1PWMChannel
      D2CCurveType     = "Line"
      D2CurveColor     = "other colors"
      D2CurveColorRGB  = Orange
      D2CurveLineWidth = "0.5"
      D2CurveLineType  = "solid"
    Call GraphObjClose("Measured Power C1")
    
    'Create Indicated Power plot
    Call GraphObjNew("2D-Curve", "Indicated Power C1")
    Call GraphObjOpen("Indicated Power C1")
      D2CCurveLegDrawT = "yes"
      D2CCurveLegTxtA(1)= "Indicated Power"
      D2CChnXName      = firstC1FrequencyChannel
      D2CChnYName      = firstC1PIMChannel
      D2CCurveType     = "Line"
      D2CurveColor     = "other colors"
      D2CurveColorRGB  = Cyan
      D2CurveLineWidth = "0.5"
      D2CurveLineType  = "solid"
    Call GraphObjClose("Indicated Power C1")
  Call GraphObjClose("PO C1 Plot")

  Call GraphObjOpen("PO C2 Plot")
    'Setup the plot
    D2LegSymDist = 5
    Call GraphObjOpen("2DAxis1_XAxis22")
      D2AxisXTickBegin = Safe_ChnPropGet(firstC2FrequencyChannel, "Minimum")
      D2AxisXOrigin    = Safe_ChnPropGet(firstC2FrequencyChannel, "Minimum")
      D2AxisXBegin     = Safe_ChnPropGet(firstC2FrequencyChannel, "Minimum")
      D2AxisXEnd       = Safe_ChnPropGet(firstC2FrequencyChannel, "Maximum")
      D2AxisXTick      = CDbl((Safe_ChnPropGet(firstC2FrequencyChannel, "Maximum") - Safe_ChnPropGet(firstC2FrequencyChannel, "Minimum")) / 8)
      D2AxisXFormat    = "d"
    Call GraphObjClose("2DAxis1_XAxis22")
    
    Call GraphObjOpen("2DAxis1_YAxis22")
      D2AxisYBegin        = minPower - 0.5
      D2AxisYEnd          = minPower + 1
      D2AxisYOrigin       = minPower - 0.5
    Call GraphObjClose("2DAxis1_YAxis22")

    'Create Limit plot
    Call GraphObjNew("2D-Curve", "Minimum Power C2")
    Call GraphObjOpen("Minimum Power C2")
      D2CConstYName    = minPower
      D2CCurveType     = "Constant"
      D2CurveColor     = "other colors"
      D2CurveColorRGB  = Red
      D2CurveLineWidth = "1.0"
      D2CCurveLegDrawT = "no"
    Call GraphObjClose("Minimum Power C2")

    'Create Measured Power plot
    Call GraphObjNew("2D-Curve", "Measured Power C2")
    Call GraphObjOpen("Measured Power C2")
      D2CCurveLegDrawT = "yes"
      D2CCurveLegTxtA(1)= "Measured Power"
      D2CChnXName      = firstC2FrequencyChannel
      D2CChnYName      = firstC2PWMChannel
      D2CCurveType     = "Line"
      D2CurveColor     = "other colors"
      D2CurveColorRGB  = Orange
      D2CurveLineWidth = "0.5"
      D2CurveLineType  = "solid"
    Call GraphObjClose("Measured Power C2")
    
    'Create Indicated Power plot
    Call GraphObjNew("2D-Curve", "Indicated Power C2")
    Call GraphObjOpen("Indicated Power C2")
      D2CCurveLegDrawT = "yes"
      D2CCurveLegTxtA(1)= "Indicated Power"
      D2CChnXName      = firstC2FrequencyChannel
      D2CChnYName      = firstC2PIMChannel
      D2CCurveType     = "Line"
      D2CurveColor     = "other colors"
      D2CurveColorRGB  = Cyan
      D2CurveLineWidth = "0.5"
      D2CurveLineType  = "solid"
    Call GraphObjClose("Indicated Power C2")
  Call GraphObjClose("PO C2 Plot")

  'Pass/Fail Indicator
  testStatus = "Fail"
  testStatusColor = Red
  If (Safe_GroupPropGet(1, "Test_Status") = "Pass") And (Safe_GroupPropGet(2, "Test_Status") = "Pass") Then
    testStatus = "Pass"
    testStatusColor = Green
  End If
  Call GraphObjOpen("Indicator")
  AreaBackRGB = testStatusColor
  Call GraphObjClose("Indicator")
  Call GraphObjOpen("Test Status")
  TxtTxt = testStatus
  Call GraphObjClose("Test Status")

  'Remove frame around page so that the footer can be outside of the frame
  PicFrame = 0

  Call PicUpdate
  Call Debug("------Exit Fill BPIM Verification------")
End Sub