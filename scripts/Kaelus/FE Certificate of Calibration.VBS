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
  reportTDR = "FE Certificate of Calibration.TDR"
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
      Call FillFECert(channelStart, modelNumber, serialNumber)
      Call PostPage_Processing(reportTDR, reportPath)
    End If
  End If
  T1 = T7
End Sub

Sub FillFECert(channelStart, modelNumber, serialNumber)
  Call Debug("----------Enter Fill FE Cert----------")
  Dim frequencyIndex, testType, calibrationDate, i, j, groupIndex, stepTag, frequencyData, curvesAdded, frequencyName
  Dim Plot, AutoXS11, XMinS11, XMaxS11, XUnitS11, AutoYS11, YMinS11, YMaxS11, YUnitS11, AutoXS21, XMinS21, XMaxS21, XUnitS21, AutoYS21, YMinS21, YMaxS21, YUnitS21
  Dim channelName, originalData, transformedData, testStatus, testStatusColor
  Dim reverseC1Added, reverseC2Added, reverseRXAdded, forwardC1Added, forwardC2Added, forwardRXAdded

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

  calibrationDate = CDbl(Safe_GroupPropGet(GroupCount, "End_Timestamp"))
  'Calibration Date/Time
  Call GraphObjOpen("Calibration Date")
  TxtTxt = SpartanDateTime(calibrationDate, "DD-ttt-YYYY")
  Call GraphObjClose("Calibration Date")

  'Account for leap years
  If (CDbl(SpartanDateTime(calibrationDate, "YYYY")) mod 4 = 0 And CDbl(SpartanDateTime(calibrationDate, "MM")) <= 2) Or (CDbl(SpartanDateTime(calibrationDate, "YYYY")) mod 4 = 3 And CDbl(SpartanDateTime(calibrationDate, "MM")) >= 3) Then
    calibrationDate = calibrationDate + 86400
  End If
  calibrationDate = calibrationDate + 31449600
  
  'Calibration Due Date/Time
  Call GraphObjOpen("Calibration Due Date")
  TxtTxt = SpartanDateTime(calibrationDate, "DD-ttt-YYYY")
  Call GraphObjClose("Calibration Due Date")
  
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

  'Temperature
  Call GraphObjOpen("Temperature")
  If Safe_GroupPropGet(GroupCount, Lookup("FieldID_2", T3, "22.0")) <> "" Then
    TxtTxt = FormatNumber(CDbl(Safe_GroupPropGet(GroupCount, Lookup("FieldID_2", T3, "22.0"))), 1)
  End If
  Call GraphObjClose("Temperature")

  'Relative Humidity
  Call GraphObjOpen("Relative Humidity")
  If Safe_GroupPropGet(GroupCount, Lookup("FieldID_3", T3, "45.0")) <> "" Then
    TxtTxt = FormatNumber(CDbl(Safe_GroupPropGet(GroupCount, Lookup("FieldID_3", T3, "45.0"))), 1)
  End If
  Call GraphObjClose("Relative Humidity")

  'Copywrite
  Call GraphObjOpen("Copywrite")
  TxtTxt = "© " & RTT(Now, "YYYY") & " Kaelus All Rights Reserved"
  Call GraphObjClose("Copywrite")
  
  'Version
  Call GraphObjOpen("Version")
  TxtTxt = "Spartan Datasheet " & Safe_GroupPropGet(GroupCount, "Test_Version")
  Call GraphObjClose("Version")

  curvesAdded = 1
  groupIndex = GroupCount
  frequencyName = "[" & groupIndex & "]/Frequency"
  frequencyIndex = CNo(frequencyName)

  Plot          = 1
  AutoXS11      = cint(Lookup("Plot"&Plot&"_Auto_X",T3,"1"))
  XMinS11       = cdbl(Lookup("Plot"&Plot&"_X_Min",T3,"0"))
  XMaxS11       = cdbl(Lookup("Plot"&Plot&"_X_Max",T3,"100"))
  XUnitS11      = Lookup("Plot"&Plot&"_X_Unit",T3,"MHz")
  AutoYS11      = cint(Lookup("Plot"&Plot&"_Auto_Y",T3,"1"))
  YMinS11       = cdbl(Lookup("Plot"&Plot&"_Y_Min",T3,"0"))
  YMaxS11       = cdbl(Lookup("Plot"&Plot&"_Y_Max",T3,"1"))
  YUnitS11      = Lookup("Plot"&Plot&"_Y_Format",T3,"LOG MAG")

  Plot          = 2
  AutoXS21      = cint(Lookup("Plot"&Plot&"_Auto_X",T3,"1"))
  XMinS21       = cdbl(Lookup("Plot"&Plot&"_X_Min",T3,"0"))
  XMaxS21       = cdbl(Lookup("Plot"&Plot&"_X_Max",T3,"100"))
  XUnitS21      = Lookup("Plot"&Plot&"_X_Unit",T3,"MHz")
  AutoYS21      = cint(Lookup("Plot"&Plot&"_Auto_Y",T3,"1"))
  YMinS21       = cdbl(Lookup("Plot"&Plot&"_Y_Min",T3,"0"))
  YMaxS21       = cdbl(Lookup("Plot"&Plot&"_Y_Max",T3,"1"))
  YUnitS21      = Lookup("Plot"&Plot&"_Y_Format",T3,"LOG MAG")
  
  testStatus = "Pass"
  testStatusColor = Green
  
  reverseC1Added = false
  reverseC2Added = false
  reverseRXAdded = false
  forwardC1Added = false
  forwardC2Added = false
  forwardRXAdded = false

  'The frequency measured should be the same for all channels
  frequencyData = AutoX_Adjust("S11Plot", frequencyName, frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "Frequency", frequencyIndex)
  For i = 1 To GroupCount
    stepTag = Safe_GroupPropGet(groupIndex, "Step_Tag")
    frequencyName = "[" & groupIndex & "]/Frequency"

    Select Case stepTag
      Case "Reverse-C1"
        If (Not reverseC1Added) Then 'Only add the latest trace
          'Determine indicator from Test Status
          If (Safe_GroupPropGet(groupIndex, "Test_Status") = "Fail") Then
            testStatus = "Fail"
            testStatusColor = Red
          End If

          'S11 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S11 Mag")
          channelName = ChnAlloc("Reverse-C1 S11", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-C1", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Orange, "YES", "REV-C1")

          'S11 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S11 Mag ULimit")
          channelName = ChnAlloc("Reverse-C1 S11 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-C1 Lim", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Orange, "YES", "REV-C1 Lim")

          'S21 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S21 Mag")
          channelName = ChnAlloc("Reverse-C1 S21", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS21, XMinS21, XMaxS21, AutoYS21, "REV-C1", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded, frequencyData , transformedData, AutoXS21, XMinS21, XMaxS21, AutoYS21, frequencyName, Plot, "0", 1, Orange, "YES", "REV-C1")

          'S21 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S21 Mag LLimit")
          channelName = ChnAlloc("Reverse-C1 S21 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-C1 Lim", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Orange, "YES", "REV-C1 Lim")
          
          reverseC1Added = true
        End If

      Case "Reverse-C2"
        If (Not reverseC2Added) Then 'Only add the latest trace
          'Determine indicator from Test Status
          If (Safe_GroupPropGet(groupIndex, "Test_Status") = "Fail") Then
            testStatus = "Fail"
            testStatusColor = Red
          End If

          'S11 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S11 Mag")
          channelName = ChnAlloc("Reverse-C2 S11", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-C2", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Red, "YES", "REV-C2")

          'S11 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S11 Mag ULimit")
          channelName = ChnAlloc("Reverse-C2 S11 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-C2 Lim", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Red, "YES", "REV-C2 Lim")

          'S21 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S21 Mag")
          channelName = ChnAlloc("Reverse-C2 S21", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS21, XMinS21, XMaxS21, AutoYS21, "REV-C2", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded, frequencyData , transformedData, AutoXS21, XMinS21, XMaxS21, AutoYS21, frequencyName, Plot, "0", 1, Red, "YES", "REV-C2")

          'S21 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S21 Mag LLimit")
          channelName = ChnAlloc("Reverse-C2 S21 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-C2 Lim", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Red, "YES", "REV-C2 Lim")

          reverseC2Added = true
        End If

      Case "Reverse-RX"
        If (Not reverseRXAdded) Then 'Only add the latest trace
          'Determine indicator from Test Status
          If (Safe_GroupPropGet(groupIndex, "Test_Status") = "Fail") Then
            testStatus = "Fail"
            testStatusColor = Red
          End If

          'S22 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S22 Mag")
          channelName = ChnAlloc("Reverse-RX S22", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-RX", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Black, "YES", "REV-RX")

          'S22 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S22 Mag ULimit")
          channelName = ChnAlloc("Reverse-C2 S22 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-RX Lim", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Black, "YES", "REV-RX Lim")

          'S12 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S12 Mag")
          channelName = ChnAlloc("Reverse-RX S12", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS21, XMinS21, XMaxS21, AutoYS21, "REV-RX", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded, frequencyData , transformedData, AutoXS21, XMinS21, XMaxS21, AutoYS21, frequencyName, Plot, "0", 1, Black, "YES", "REV-RX")

          'S12 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S12 Mag LLimit")
          channelName = ChnAlloc("Reverse-RX S21 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "REV-RX Lim", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Black, "YES", "REV-RX Lim")

          reverseRXAdded = true
        End If

      Case "Forward-RX"
        If (Not forwardRXAdded) Then 'Only add the latest trace
          'Determine indicator from Test Status
          If (Safe_GroupPropGet(groupIndex, "Test_Status") = "Fail") Then
            testStatus = "Fail"
            testStatusColor = Red
          End If

          'S22 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S22 Mag")
          channelName = ChnAlloc("Forward-RX S22", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-RX", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Green, "YES", "FWD-RX")

          'S22 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S22 Mag ULimit")
          channelName = ChnAlloc("Forward-RX S22 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-RX Lim", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Green, "YES", "FWD-RX Lim")

          'S12 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S12 Mag")
          channelName = ChnAlloc("Forward-RX S12", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS21, XMinS21, XMaxS21, AutoYS21, "FWD-RX", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded, frequencyData , transformedData, AutoXS21, XMinS21, XMaxS21, AutoYS21, frequencyName, Plot, "0", 1, Green, "YES", "FWD-RX")

          'S12 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S12 Mag LLimit")
          channelName = ChnAlloc("Forward-RX S21 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-RX Lim", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Green, "YES", "FWD-RX Lim")

          forwardRXAdded = true
        End If

      Case "Forward-C1"
        If (Not forwardC1Added) Then 'Only add the latest trace
          'Determine indicator from Test Status
          If (Safe_GroupPropGet(groupIndex, "Test_Status") = "Fail") Then
            testStatus = "Fail"
            testStatusColor = Red
          End If

          'S11 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S11 Mag")
          channelName = ChnAlloc("Forward-C1 S11", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-C1", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Cyan, "YES", "FWD-C1")

          'S11 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S11 Mag ULimit")
          channelName = ChnAlloc("Forward-C1 S11 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-C1 Lim", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Orange, "YES", "FWD-C1 Lim")

          'S21 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S21 Mag")
          channelName = ChnAlloc("Forward-C1 S21", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS21, XMinS21, XMaxS21, AutoYS21, "FWD-C1", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded, frequencyData , transformedData, AutoXS21, XMinS21, XMaxS21, AutoYS21, frequencyName, Plot, "0", 1, Cyan, "YES", "FWD-C1")

          'S21 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S21 Mag LLimit")
          channelName = ChnAlloc("Forward-C1 S21 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-C1 Lim", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Orange, "YES", "FWD-C1 Lim")

          forwardC1Added = true
        End If

      Case "Forward-C2"
        If (Not forwardC2Added) Then 'Only add the latest trace
          'Determine indicator from Test Status
          If (Safe_GroupPropGet(groupIndex, "Test_Status") = "Fail") Then
            testStatus = "Fail"
            testStatusColor = Red
          End If
          
          'S11 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S11 Mag")
          channelName = ChnAlloc("Forward-C2 S11", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-C2", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Magenta, "YES", "FWD-C2")

          'S11 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S11 Mag ULimit")
          channelName = ChnAlloc("Forward-C2 S11 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S11Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-C2 Lim", frequencyName)
          transformedData = Add_Curve("S11Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Orange, "YES", "FWD-C2 Lim")

          'S21 Trace
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S21 Mag")
          channelName = ChnAlloc("Forward-C2 S21", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS21, XMinS21, XMaxS21, AutoYS21, "FWD-C2", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded, frequencyData , transformedData, AutoXS21, XMinS21, XMaxS21, AutoYS21, frequencyName, Plot, "0", 1, Magenta, "YES", "FWD-C2")

          'S21 Limit
          Set originalData = Data.GetChannel("[" & groupIndex & "]/S21 Mag LLimit")
          channelName = ChnAlloc("Forward-C2 S21 Limit", originalData.Size, 1, DataTypeFloaT64, "Numeric", groupIndex)
          Set transformedData = Data.GetChannel(channelName(0))
          For j = 1 To originalData.Size
            transformedData(j) = LogMag(originalData(j))
          Next
          transformedData = AutoX_Adjust("S21Plot", channelName(0), frequencyName, AutoXS11, XMinS11, XMaxS11, AutoYS11, "FWD-C2 Lim", frequencyName)
          transformedData = Add_Curve("S21Plot", curvesAdded + 1, frequencyData , transformedData, AutoXS11, XMinS11, XMaxS11, AutoYS11, frequencyName, Plot, "0", 1, Orange, "YES", "FWD-C2 Lim")

          forwardC2Added = true
        End If

    End Select
    curvesAdded = curvesAdded + 2
    groupIndex = GroupCount - i
  Next

  'Scale the two plots appropriately
  Call Format_X_Plot("S11Plot", AutoXS11, XMinS11, XMaxS11)
  Call Format_Y_Plot("S11Plot", 1, AutoYS11, YMinS11, YMaxS11)
  Call Format_X_Plot("S21Plot", AutoXS21, XMinS21, XMaxS21)
  Call Format_Y_Plot("S21Plot", 1, AutoYS21, YMinS21, YMaxS21)

  Call GraphObjOpen("S11Plot")
  D2LegSymDist = 5                      ' This will create a gap between legEnd elements.
  Call GraphObjOpen("2DAxis2_YAxis1")
  D2AxisYTick = 5                       ' This will set the tick interval on the Y-axis
  Call GraphObjClose("2DAxis2_YAxis1")
  Call GraphObjClose("S11Plot")

  Call GraphObjOpen("S21Plot")
  D2LegSymDist = 5                      ' This will create a gap between legEnd elements.
  Call GraphObjOpen("2DAxis1_Yaxis_1")
  D2AxisYTick = 15                       ' This will set the tick interval on the Y-axis
  Call GraphObjClose("2DAxis1_Yaxis_1")
  Call GraphObjClose("S21Plot")
  
  'Pass/Fail Indicator
  Call GraphObjOpen("Indicator")
  AreaBackRGB = testStatusColor
  Call GraphObjClose("Indicator")
  Call GraphObjOpen("Test Status")
  TxtTxt = testStatus
  Call GraphObjClose("Test Status")
  
  'Remove frame around page so that the footer can be outside of the frame
  PicFrame = 0

  Call PicUpdate
  Call Debug("----------Exit Fill FE Cert----------")
End Sub