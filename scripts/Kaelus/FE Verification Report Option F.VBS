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

  Dim bottom, fieldBottom, reportTDR, reportPath, dataPath, plotCount, pixelWidth, pixelHeight, channelStart, modelNumber, serialNumber, testType
  reportPath = Lookup("Report_Path", T3, "")
  modelNumber = Lookup("Model_Number",T3,"")
  serialNumber = Lookup("Serial_Number",T3,"")
  testType = Lookup("Plot1_Style",T3,"")
  dataPath = Lookup("Data_Path", T3, "")&"\"&modelNumber&" "&serialNumber&" "&testType&".tdms"
  plotCount = 1
  reportTDR = "FE Verification Report Option F.TDR"
  pixelWidth = 550
  pixelHeight = 792

  Call PrePage_Processing(reportTDR, reportPath)
  PicDefByIdent = 1 ' Name-Oriented channel referencing.  This must come after the TDR is loaded.

  'Refresh the Plot
  If CInt(UPC(Lookup("PREVIEW", T3, "0"))) = 1 Then
    'Remove frame around page so that the footer can be outside of the frame
    PicFrame = 0
    Call PicUpdate
    Call PicExport(reportPath, "PNG", false, pixelHeight, pixelWidth, "rgb 24", , "NoCompression")  'Exports the current sheet as WMF file
    T7 = reportPath
  Else
    channelStart = GlobUsedChn
    If channelStart > 0 Then
       channelStart = channelStart + 1
    End If
    If (FileExist(dataPath)) Then   
      Call DataFileLoad(dataPath, "TDMS", "")
      Call FillFEReport(channelStart, modelNumber, serialNumber)
      Call PostPage_Processing(reportTDR, reportPath)
    End If
  End If
  T1 = T7
End Sub

Sub FillFEReport(channelStart, modelNumber, serialNumber)
  Call Debug("------Enter Fill FE Verification------")
  Dim frequencyIndex, testType, verificationDate, i, j, groupIndex, stepTag, frequencyData, frequencyName
  Dim AutoXP11, XMinP11, XMaxP11, XUnitP11, AutoYP11, YMinP11, YMaxP11, YUnitP11, AutoXP21, XMinP21, XMaxP21, XUnitP21, AutoYP21, YMinP21, YMaxP21, YUnitP21, axisType, Curves
  Dim channelName, originalData, transformedData, testStatus, testStatusColor, Num_Sweeps, dataName, processed, P11Added, P21Added

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

  verificationDate = CDbl(Safe_GroupPropGet(GroupCount, "End_Timestamp"))
  'Calibration Date/Time
  Call GraphObjOpen("Verification Date")
  TxtTxt = SpartanDateTime(verificationDate, "DD-ttt-YYYY")
  Call GraphObjClose("Verification Date")
  
  'Instrument Name
  Call GraphObjOpen("Instrument Name")
  TxtTxt = Safe_GroupPropGet(GroupCount, "Instrument_Name")
  Call GraphObjClose("Instrument Name")
  
  'Instrument Type
  Call GraphObjOpen("Instrument Type")
  TxtTxt = Safe_GroupPropGet(GroupCount, "Instrument_Type")
  Call GraphObjClose("Instrument Type")
  
  'Instrument Serial Number
  Call GraphObjOpen("Instrument Serial Number")
  TxtTxt = Safe_GroupPropGet(GroupCount, "Instrument_Serial_Number")
  Call GraphObjClose("Instrument Serial Number")

  'Instrument Calibration Due Date
  Call GraphObjOpen("Instrument Calibration Due Date")
  TxtTxt = SpartanDateTime(CDbl(Safe_GroupPropGet(GroupCount, "Instrument_Calibration_Due_Date")), "DD-ttt-YYYY")
  Call GraphObjClose("Instrument Calibration Due Date")

  'Copywrite
  Call GraphObjOpen("Copywrite")
  TxtTxt = "© " & RTT(Now, "YYYY") & " Kaelus All Rights Reserved"
  Call GraphObjClose("Copywrite")
  
  'Version
  Call GraphObjOpen("Version")
  TxtTxt = "Spartan Datasheet " & Safe_GroupPropGet(GroupCount, "Test_Version")
  Call GraphObjClose("Version")

  groupIndex = GroupCount
  frequencyName = "[" & groupIndex & "]/IM3 Frequency"
  frequencyIndex = CNo(frequencyName)
  dataName = "[" & groupIndex & "]/IM3 Power 1"

  AutoXP11 = cint(Lookup("Plot1_Auto_X",T3,"1"))
  XMinP11  = cdbl(Lookup("Plot1_X_Min",T3,"0"))
  XMaxP11  = cdbl(Lookup("Plot1_X_Max",T3,"100"))
  XUnitP11 = Lookup("Plot1_X_Unit",T3,"MHz")
  AutoYP11 = cint(Lookup("Plot1_Auto_Y",T3,"1"))
  YMinP11  = cdbl(Lookup("Plot1_Y_Min",T3,"0"))
  YMaxP11  = cdbl(Lookup("Plot1_Y_Max",T3,"1"))
  YUnitP11 = Lookup("Plot1_Y_Format",T3,"dBm")
  axisType = Lookup("Plot1AxisType",T3,"Frequency Max/Avg")
  Curves   = "3rd,1,1,,0,0,0,LOG MAG,0,0,0,0::::" ' This is so the function Add_Curves_To_PIM_Plot can be used

  AutoXP21 = cint(Lookup("Plot2_Auto_X",T3,"1"))
  XMinP21  = cdbl(Lookup("Plot2_X_Min",T3,"0"))
  XMaxP21  = cdbl(Lookup("Plot2_X_Max",T3,"100"))
  XUnitP21 = Lookup("Plot2_X_Unit",T3,"MHz")
  AutoYP21 = cint(Lookup("Plot2_Auto_Y",T3,"1"))
  YMinP21  = cdbl(Lookup("Plot2_Y_Min",T3,"0"))
  YMaxP21  = cdbl(Lookup("Plot2_Y_Max",T3,"1"))
  YUnitP21 = Lookup("Plot2_Y_Format",T3,"LOG MAG")

  testStatus = "Pass"
  testStatusColor = Green
  
  processed = 0
  P11Added = false
  P21Added = false

  For i = 1 To GroupCount
    stepTag = Safe_GroupPropGet(groupIndex, "Step_Tag")

    Select Case stepTag
      Case "P11", "Swept (P11)"
        If (Not P11Added) Then
          'P11 Trace
          T3 = ReplaceKey("Plot1_Run_ID", T3, "Run " & Safe_GroupPropGet(groupIndex, "Test_Run"))
          Call Add_Curves_To_PIM_Plot("P11Plot", Curves, YUnitP11, XUnitP11, AutoXP11, XMinP11, XMaxP11, AutoYP11, "", 1, axisType, YMinP11, YMaxP11)
          processed = processed + 1
          P11Added = true

          'Determine indicator from Test Status
          If (Safe_GroupPropGet(groupIndex, "Test_Status") = "Fail") Then
            testStatus = "Fail"
            testStatusColor = Red
          End If
        End If
        
      Case "P21", "Swept (P21)"
        If (Not P21Added) Then
          'P21 Trace
          T3 = ReplaceKey("Plot2_Run_ID", T3, "Run " & Safe_GroupPropGet(groupIndex, "Test_Run"))
          Call Add_Curves_To_PIM_Plot("P21Plot", Curves, YUnitP21, XUnitP21, AutoXP21, XMinP21, XMaxP21, AutoYP21, "", 2, axisType, YMinP21, YMaxP21)
          processed = processed + 1
          P21Added = true

          'Determine indicator from Test Status
          If (Safe_GroupPropGet(groupIndex, "Test_Status") = "Fail") Then
            testStatus = "Fail"
            testStatusColor = Red
          End If
        End If
    End Select
    groupIndex = GroupCount - i - processed
  Next

  'Scale the plots appropriately
  Call GraphObjOpen("P11Plot")
  D2LegSymDist = 5                      ' This will create a gap between legEnd elements.
  Call GraphObjOpen("2DAxis2_YAxis1")
  D2AxisYTick = 10                      ' This will set the tick interval on the Y-axis
  D2AxisYFormat = "d"                   ' This will set the formatting of the Y-axis to no decimal places
  Call GraphObjClose("2DAxis2_YAxis1")
  Call GraphObjClose("P11Plot")

  Call GraphObjOpen("P21Plot")
  D2LegSymDist = 5                      ' This will create a gap between legEnd elements.
  Call GraphObjOpen("2DAxis2_YAxis1")
  D2AxisYTick = 10                      ' This will set the tick interval on the Y-axis
  D2AxisYFormat = "d"                   ' This will set the formatting of the Y-axis to no decimal places
  Call GraphObjClose("2DAxis2_YAxis1")
  Call GraphObjClose("P21Plot")

  'Pass/Fail Indicator
  Call GraphObjOpen("Indicator")
  AreaBackRGB = testStatusColor
  Call GraphObjClose("Indicator")
  Call GraphObjOpen("Test Status")
  TxtTxt = testStatus
  Call GraphObjClose("Test Status")
  
  Call GraphObjDelete("P11PlotStatus90")
  Call GraphObjDelete("P11PlotStatus10")
  
  Call GraphObjDelete("P21PlotStatus90")
  Call GraphObjDelete("P21PlotStatus10")

  'Remove frame around page so that the footer can be outside of the frame
  PicFrame = 0

  Call PicUpdate
  Call Debug("------Exit Fill FE Verification------")
End Sub