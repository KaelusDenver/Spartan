'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 05/05/2011
'-- Author: Christopher Bauer
'-------------------------------------------------------------------------------
Option Explicit         'This setting requires explicit variable allocation in script.
Sub main()
  AutoIgnoreError = 1     '1 turns off any error popups. 0 Enables popups
  PicDefByIdent = 1       'Name-Oriented channel referencing
  Call DataDelAll(1)      'Remove all data for the data portal

  ScriptInclude (AutoActPath&"\DD Lib.vbs") 'Common functions

  ' Initialize Variables used to generate FE Calibration File
  Dim reportPath, dataPath, channelStart, modelNumber, serialNumber, USBSerial, USBPath, fileHandle, tempStrings, i, TDMSHeader, lastGroupIndex
  modelNumber = Lookup("Model_Number",T3,"")
  serialNumber = Lookup("Serial_Number",T3,"")
  USBSerial = "USBSerial"
  reportPath = Lookup("Report_Path", T3, "")
  tempStrings = Split(reportPath, "\")
  
  ' Build Report Path
  reportPath = tempStrings(0)
  For i = 1 To UBound(tempStrings) - 1
    reportPath = reportPath & "\" & tempStrings(i)
  Next
  
  ' Data Lookup for S Parameter tests
  dataPath = Lookup("Data_Path", T3, "") & "\" & modelNumber & " " & serialNumber & " S Parameter.tdms"
  
  ' Data Lookup for Switch test.  If present we can determine the DAQmx Device USB Serial Number.
  USBPath = Lookup("Data_Path", T3, "") & "\" & modelNumber & " " & serialNumber & " Switch.tdms"
  If (FileExist(USBPath)) Then
    Set TDMSHeader = DataFileHeaderAccess(USBPath, "TDMS", True)
    lastGroupIndex = TDMSHeader.GroupCount
    Call TDMSHeader.Close(False)
    Call DataFileLoadSel(USBPath, "TDMS", "[" & lastGroupIndex & "]" & "/*")
    USBSerial = Safe_GroupPropGet(GroupCount, "USB_Serial_Number")
    Call DataDelAll(1)      'Remove all data for the data portal
	reportPath = reportPath & "\SI-" & serialNumber & "_" & USBSerial & ".ini"
  Else
	' No Switch test was performed, so we'll create a generic CAL file w/o DAQmx serial number
	reportPath = reportPath & "\SI-" & serialNumber & ".ini"
  End If
  
  ' Preview is not support by this template. It is handled in editscenario CGI.
  channelStart = GlobUsedChn
  If channelStart > 0 Then
     channelStart = channelStart + 1
  End If
  
  If (FileExist(dataPath)) Then
    i = 1
    Do While Lookup("Plot"& i &"_run_id", T3, "-1") <> "-1"
      If Lookup("Plot"& i &"_run_id", T3, "-1") <> "No Run" Then
        Call DataFileLoadSel(dataPath, "TDMS", Lookup("Plot"& i &"_run_id", T3, "-1") & "/*")
      End If
      i = i + 1
    Loop
    Call FillFECalFile(reportPath, channelStart, modelNumber, serialNumber)
  End If
  T1 = reportPath
End Sub

Sub FillFECalFile(filePath, channelStart, modelNumber, serialNumber)
  Call Debug("----------Enter Fill FE Cal File----------")
  Dim frequencyData, frequencyStart, frequencyStop, i, groupIndex, stepTag, channelData
  Dim returnValue, value1, value2, calibrationDate, calibrationDueDate, forwardC1Exists, forwardC2Exists, forwardRXExists
  Dim reverseC1Data, reverseC2Data, reverseRXData, forwardRXData, forwardC1Data, forwardC2Data
  Dim reverseC1Limit, reverseC2Limit, reverseRXLimit, forwardRXLimit
  Dim HPPMN, HPPSN, HPPFrequencyData, HPPData, HPPExists, lastGroupIndex, TDMSHeader
  Dim DataFinder, Query, run, max, reverseC1Exists, reverseC2Exists, reverseRXExists
  Dim fstartC1, fstopC1, fstartC2, fstopC2, fstartRX, fstopRX
  Dim fileIO

  HPPExists = 0
  forwardC1Exists = 0
  forwardC2Exists = 0
  forwardRXExists = 0
  reverseC1Exists = 0
  reverseC2Exists = 0
  reverseRXExists = 0

  HPPMN = Safe_GroupPropGet(GroupCount, Lookup("FieldID_4", T3, "--"))
  HPPSN = Safe_GroupPropGet(GroupCount, Lookup("FieldID_5", T3, "--"))

  Set DataFinder = Navigator.ConnectDataFinder(Spartan_DF)
  Set Query = Navigator.CreateQuery(eAdvancedQuery)
  Query.ReturnType = eSearchChannelGroup
  Call Query.Conditions.Add(eSearchFile, "dataPluginName", "=", "TDMS")
  Call Query.Conditions.Add(eSearchFile, "Model_Number", "=", HPPMN)
  Call Query.Conditions.Add(eSearchFile, "Serial_Number", "=", HPPSN)
  Call Query.Conditions.Add(eSearchFile, "Test_Type", "=", "S Parameter")
  Call Query.Conditions.Add(eSearchChannelGroup, "Step_Tag", "=", modelNumber)
  Call DataFinder.Search(Query)
  max = 0
  
  If DataFinder.Results.Count > 0 Then
    For i = 1 TO DataFinder.Results.Count
      run = Split(DataFinder.Results(i).Name)
      If run(1) > max Then
        max = CInt(run(1))
      End If
    Next
    ' Load HPP values
    Call DataFileLoadSel(DataFinder.Results(1).Root.Properties.Item("fullpath").Value, "TDMS", "Run " & max & "/*")
    Set HPPFrequencyData = Data.GetChannel(CNo("[" & GroupCount & "]/Frequency"))
  End If

  calibrationDate = CDbl(Safe_GroupPropGet(1, "End_Timestamp"))
  'Account for leap years
  calibrationDueDate = calibrationDate + 31449600
  If (CDbl(SpartanDateTime(calibrationDate, "YYYY")) mod 4 = 0 And CDbl(SpartanDateTime(calibrationDate, "MM")) <= 2) Or (CDbl(SpartanDateTime(calibrationDate, "YYYY")) mod 4 = 3 And CDbl(SpartanDateTime(calibrationDate, "MM")) >= 3) Then
    calibrationDueDate = calibrationDueDate + 86400
  End If

  ' Begin File Write Operations
  fileIO = TextFileOpen(filePath, TfCreate OR TfANSI)
  
  ' Write [GENERAL INFORMATION] Section
  returnValue = TextFileWriteLn(fileIO, "[GENERAL INFORMATION]")
  returnValue = TextFileWriteLn(fileIO, "MODEL=" & modelNumber)
  returnValue = TextFileWriteLn(fileIO, "SERIAL NUMBER=" & serialNumber)
  returnValue = TextFileWriteLn(fileIO, "OPTIONS=" & Safe_GroupPropGet(1, Lookup("FieldID_1", T3, "")))
  returnValue = TextFileWriteLn(fileIO, "OPERATOR=" & Safe_GroupPropGet(1, "Operator"))
  returnValue = TextFileWriteLn(fileIO, "DATECODE=" & calibrationDate)
  returnValue = TextFileWriteLn(fileIO, "CALIBRATION DATE=" & SpartanDateTime(calibrationDate, "DD-ttt-YYYY"))
  returnValue = TextFileWriteLn(fileIO, "CALIBRATION DUE DATE=" & SpartanDateTime(calibrationDueDate, "DD-ttt-YYYY"))
  If Safe_GroupPropGet(1, Lookup("FieldID_2", T3, "22.0")) <> "" Then
    returnValue = TextFileWriteLn(fileIO, "TEMPERATURE=" & FormatNumber(CDbl(Safe_GroupPropGet(1, Lookup("FieldID_2", T3, "22.0"))), 1))
  End If
  If Safe_GroupPropGet(1, Lookup("FieldID_3", T3, "45.0")) <> "" Then
    returnValue = TextFileWriteLn(fileIO, "HUMIDITY=" & FormatNumber(CDbl(Safe_GroupPropGet(1, Lookup("FieldID_3", T3, "45.0"))), 1))
  End If
  returnValue = TextFileWriteLn(fileIO, "HIGH POWER PAD MODEL NUMBER=" & HPPMN)
  returnValue = TextFileWriteLn(fileIO, "HIGH POWER PAD SERIAL NUMBER=" & HPPSN)

  returnValue = TextFileWriteLn(fileIO, "")

  ' Write [INSTRUMENT] Section
  returnValue = TextFileWriteLn(fileIO, "[INSTRUMENT]")
  returnValue = TextFileWriteLn(fileIO, "NAME=""" & Safe_GroupPropGet(GroupCount, "Instrument_Name") & """")
  returnValue = TextFileWriteLn(fileIO, "DRIVER=""" & Safe_GroupPropGet(GroupCount, "Instrument_Driver") & """")
  returnValue = TextFileWriteLn(fileIO, "TYPE=" & Safe_GroupPropGet(GroupCount, "Instrument_Type"))
  returnValue = TextFileWriteLn(fileIO, "SERIAL NUMBER=""" & Safe_GroupPropGet(GroupCount, "Instrument_Serial_Number") & """")
  returnValue = TextFileWriteLn(fileIO, "CALIBRATION DATE=" & SpartanDateTime(CDbl(Safe_GroupPropGet(GroupCount, "Instrument_Calibration_Date")), "DD-ttt-YYYY"))
  returnValue = TextFileWriteLn(fileIO, "CALIBRATION DUE DATE=" & SpartanDateTime(CDbl(Safe_GroupPropGet(GroupCount, "Instrument_Calibration_Due_Date")), "DD-ttt-YYYY"))
  
  returnValue = TextFileWriteLn(fileIO, "")

  ' Collect Data to be Written to the calibration file
  groupIndex = GroupCount
 
  For i = 1 To GroupCount
	Set frequencyData = Data.GetChannel(CNo("[" & i & "]/Frequency"))
	frequencyStart = frequencyData(1)
	frequencyStop = frequencyData(frequencyData.Size)
  
    stepTag = Safe_GroupPropGet(groupIndex, "Step_Tag")

    Select Case stepTag
      Case "Reverse-C1", "P1-C1"
		fstartC1 = frequencyStart
		fstopC1 = frequencyStop
        Set reverseC1Data = Data.GetChannel(CNo("[" & groupIndex & "]/S21 Mag"))
        Set reverseC1Limit = Data.GetChannel(CNo("[" & groupIndex & "]/S21 Mag LLimit"))
        reverseC1Exists = 1

      Case "Reverse-C2", "P2-C2"
		fstartC2 = frequencyStart
		fstopC2 = frequencyStop
        Set reverseC2Data = Data.GetChannel(CNo("[" & groupIndex & "]/S21 Mag"))
        Set reverseC2Limit = Data.GetChannel(CNo("[" & groupIndex & "]/S21 Mag LLimit"))
        reverseC2Exists = 1

      Case "Reverse-RX", "P1-RX"
		fstartRX = frequencyStart
		fstopRX = frequencyStop
        Set reverseRXData = Data.GetChannel(CNo("[" & groupIndex & "]/S12 Mag"))
        Set reverseRXLimit = Data.GetChannel(CNo("[" & groupIndex & "]/S12 Mag LLimit"))
        reverseRXExists = 1

      Case "Forward-RX"
		fstartRX = frequencyStart
		fstopRX = frequencyStop
        Set forwardRXData = Data.GetChannel(CNo("[" & groupIndex & "]/S12 Mag"))
        Set forwardRXLimit = Data.GetChannel(CNo("[" & groupIndex & "]/S12 Mag LLimit"))
        forwardRXExists = 1

      Case "Forward-C1"
		fstartC1 = frequencyStart
		fstopC1 = frequencyStop
        Set forwardC1Data = Data.GetChannel(CNo("[" & groupIndex & "]/S21 Mag"))
        forwardC1Exists = 1

      Case "Forward-C2"
		fstartC2 = frequencyStart
		fstopC2 = frequencyStop
        Set forwardC2Data = Data.GetChannel(CNo("[" & groupIndex & "]/S21 Mag"))
        forwardC2Exists = 1

      Case modelNumber
        Set HPPData = Data.GetChannel(CNo("[" & groupIndex & "]/S21 Mag"))
        HPPExists = 1
		
    End Select
    groupIndex = groupIndex - 1
  Next
  
  ' Write [FE DEF] Section
  returnValue = TextFileWriteLn(fileIO, "[FE DEF]")
  returnValue = TextFileWriteLn(fileIO, "TX1FSTART=" & FormatNumber(fstartC1, 2, 0, 0, 0))
  returnValue = TextFileWriteLn(fileIO, "TX1FSTOP=" & FormatNumber(fstopC1, 2, 0, 0, 0))
  returnValue = TextFileWriteLn(fileIO, "TX2FSTART=" & FormatNumber(fstartC2, 2, 0, 0, 0))
  returnValue = TextFileWriteLn(fileIO, "TX2FSTOP=" & FormatNumber(fstopC2, 2, 0, 0, 0))
  returnValue = TextFileWriteLn(fileIO, "RXFSTART=" & FormatNumber(fstartRX, 2, 0, 0, 0))
  returnValue = TextFileWriteLn(fileIO, "RXFSTOP=" & FormatNumber(fstopRX, 2, 0, 0, 0))
  
  returnValue = TextFileWriteLn(fileIO, "")
  
  ' Write [D1 LOSS VS FREQUENCY] Section
  returnValue = TextFileWriteLn(fileIO, "[D1 LOSS VS FREQUENCY]")
  For i = 1 To frequencyData.Size
	value1 = reverseC1Data(i)
    If value1 <> 0 Then
      value1 = -LogMag(value1)
    End If
	' Only write values where limits exist
	If reverseC1Limit(i) <> "NOVALUE" Then
		If forwardC1Exists = 1 Then
		  value2 = forwardC1Data(i)
		  If value2 <> 0 Then
			value2 = -LogMag(value2)
		  End If
		  returnValue = TextFileWriteLn(fileIO, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0) & "," & FormatNumber(value2, 3, 0, 0, 0))
		Else
		  returnValue = TextFileWriteLn(fileIO, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
		End If
	End If
  Next

  returnValue = TextFileWriteLn(fileIO, "")
  
  ' Write [D2 LOSS VS FREQUENCY] Section
  returnValue = TextFileWriteLn(fileIO, "[D2 LOSS VS FREQUENCY]")
  For i = 1 To frequencyData.Size
    value1 = reverseC2Data(i)
    If value1 <> 0 Then
      value1 = -LogMag(value1)
    End If
	' Only write values where limits exist
	If reverseC2Limit(i) <> "NOVALUE" Then
		If forwardC2Exists = 1 Then
		  value2 = forwardC2Data(i)
		  If value2 <> 0 Then
			value2 = -LogMag(value2)
		  End If
		  returnValue = TextFileWriteLn(fileIO, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0) & "," & FormatNumber(value2, 3, 0, 0, 0))
		Else
		  returnValue = TextFileWriteLn(fileIO, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
		End If
	End If
  Next

  returnValue = TextFileWriteLn(fileIO, "")
  
  ' Write [RX REVERSE] Section
  returnValue = TextFileWriteLn(fileIO, "[RX REVERSE]")
  For i = 1 To frequencyData.Size
    value1 = reverseRXData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
    End If
    If reverseRXLimit(i) <> "NOVALUE" Then
      returnValue = TextFileWriteLn(fileIO, "dBdBm@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
    End If
  Next
  
  ' Write [RX FORWARD] Section
  If forwardRXExists = 1 Then
    returnValue = TextFileWriteLn(fileIO, "")
    returnValue = TextFileWriteLn(fileIO, "[RX FORWARD]")
    For i = 1 To frequencyData.Size  
      value1 = forwardRXData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      If forwardRXLimit(i) <> "NOVALUE" Then
        returnValue = TextFileWriteLn(fileIO, "dBdBm@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
      End If
    Next
  End If
  
  ' Write [HIGH POWER PAD VS FREQUENCY] Section
  If HPPExists = 1 Then
    returnValue = TextFileWriteLn(fileIO, "")
    returnValue = TextFileWriteLn(fileIO, "[HIGH POWER PAD VS FREQUENCY]")
    For i = 1 To HPPFrequencyData.Size
      If HPPFrequencyData(i) >= frequencyStart And HPPFrequencyData(i) <= frequencyStop Then
        value1 = HPPData(i)
        If value1 <> 0 Then
          value1 = -LogMag(value1)
        End If
        returnValue = TextFileWriteLn(fileIO, "dBdBm@" & FormatNumber(HPPFrequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
      End If
    Next
  End If
  fileIO = TextFileClose(filePath)
  Call Debug("----------Exit Fill FE Cal File----------")
End Sub