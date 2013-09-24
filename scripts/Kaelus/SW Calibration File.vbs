'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 04/05/2012
'-- Author: Christopher Bauer
'-------------------------------------------------------------------------------
Option Explicit         'This setting requires explicit variable allocation in script.
Sub main()
  AutoIgnoreError = 1     '1 turns off any error popups. 0 Enables popups
  PicDefByIdent = 1       'Name-Oriented channel referencing
  Call DataDelAll(1)      'Remove all data for the data portal

  ScriptInclude (AutoActPath&"\DD Lib.vbs") 'Common functions

  ' Initialize Variables
  Dim reportPath, dataPath, channelStart, modelNumber, serialNumber, USBSerial, USBPath, fileHandle, tempStrings, i, TDMSHeader, lastGroupIndex
  modelNumber = Lookup("Model_Number",T3,"")
  serialNumber = Lookup("Serial_Number",T3,"")
  reportPath = Lookup("Report_Path", T3, "")
  tempStrings = Split(reportPath, "\")
  reportPath = tempStrings(0)
  For i = 1 To UBound(tempStrings) - 1
    reportPath = reportPath & "\" & tempStrings(i)
  Next
  
  ' Lookup S-Parameter Data
  dataPath = Lookup("Data_Path", T3, "") & "\" & modelNumber & " " & serialNumber & " S Parameter.tdms"
  
  ' Lookup DAQmx USB Serial Number
  USBPath = Lookup("Data_Path", T3, "") & "\" & modelNumber & " " & serialNumber & " Switch.tdms"
  USBSerial = "USBSerial"
  
  If (FileExist(USBPath)) Then
    Set TDMSHeader = DataFileHeaderAccess(USBPath, "TDMS", True)
    lastGroupIndex = TDMSHeader.GroupCount
    Call TDMSHeader.Close(False)
    Call DataFileLoadSel(USBPath, "TDMS", "[" & lastGroupIndex & "]" & "/*")
    USBSerial = Safe_GroupPropGet(GroupCount, "USB_Serial_Number")
    Call DataDelAll(1)      'Remove all data for the data portal
  End If
  reportPath = reportPath & "\SI-" & serialNumber & "_" & USBSerial & ".ini"

  'Preview is not support by this template.  It is handled in editscenario CGI
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
    fileHandle = TextFileOpen(reportPath, TfCreate OR TfANSI)
    Call FillSWCalFile(fileHandle, channelStart, modelNumber, serialNumber)
    fileHandle = TextFileClose(fileHandle)
  End If
  T1 = reportPath
End Sub

Sub FillSWCalFile(fileHandle, channelStart, modelNumber, serialNumber)
  Call Debug("----------Enter Fill SW Cal File----------")
  Dim frequencyData, frequencyStart, frequencyStop, i, groupIndex, stepTag, channelData
  Dim returnValue, value1, value2, calibrationDate, calibrationDueDate
  Dim C1AExists, C1BExists, C1CExists, C2AExists, C2BExists, C2CExists, RXAExists, RXBExists, RXCExists, RXDExists, RXEExists, RXFExists
  Dim C1AData, C1BData, C1CData, C2AData, C2BData, C2CData, RXAData, RXBData, RXCData, RXDData, RXEData, RXFData
  
  C1AExists = 0
  C1BExists = 0
  C1CExists = 0
  C2AExists = 0
  C2BExists = 0
  C2CExists = 0
  RXAExists = 0
  RXBExists = 0
  RXCExists = 0
  RXDExists = 0
  RXEExists = 0
  RXFExists = 0

  calibrationDate = CDbl(Safe_GroupPropGet(1, "End_Timestamp"))
  'Account for leap years
  calibrationDueDate = calibrationDate + 31449600
  If (CDbl(SpartanDateTime(calibrationDate, "YYYY")) mod 4 = 0 And CDbl(SpartanDateTime(calibrationDate, "MM")) <= 2) Or (CDbl(SpartanDateTime(calibrationDate, "YYYY")) mod 4 = 3 And CDbl(SpartanDateTime(calibrationDate, "MM")) >= 3) Then
    calibrationDueDate = calibrationDueDate + 86400
  End If
  
  ' Write [GENERAL INFORMATION] Section
  returnValue = TextFileWriteLn(fileHandle, "[GENERAL INFORMATION]")
  returnValue = TextFileWriteLn(fileHandle, "MODEL=" & modelNumber)
  returnValue = TextFileWriteLn(fileHandle, "SERIAL NUMBER=" & serialNumber)
  returnValue = TextFileWriteLn(fileHandle, "OPTIONS=" & Safe_GroupPropGet(1, Lookup("FieldID_1", T3, "")))
  returnValue = TextFileWriteLn(fileHandle, "OPERATOR=" & Safe_GroupPropGet(1, "Operator"))
  returnValue = TextFileWriteLn(fileHandle, "DATECODE=" & calibrationDate)
  returnValue = TextFileWriteLn(fileHandle, "CALIBRATION DATE=" & SpartanDateTime(calibrationDate, "DD-ttt-YYYY"))
  returnValue = TextFileWriteLn(fileHandle, "CALIBRATION DUE DATE=" & SpartanDateTime(calibrationDueDate, "DD-ttt-YYYY"))
  If Safe_GroupPropGet(1, Lookup("FieldID_2", T3, "22.0")) <> "" Then
    returnValue = TextFileWriteLn(fileHandle, "TEMPERATURE=" & FormatNumber(CDbl(Safe_GroupPropGet(1, Lookup("FieldID_2", T3, "22.0"))), 1))
  End If
  If Safe_GroupPropGet(1, Lookup("FieldID_3", T3, "45.0")) <> "" Then
    returnValue = TextFileWriteLn(fileHandle, "HUMIDITY=" & FormatNumber(CDbl(Safe_GroupPropGet(1, Lookup("FieldID_3", T3, "45.0"))), 1))
  End If

  returnValue = TextFileWriteLn(fileHandle, "")
  
  ' Collect Measurement data for each SW Path
  groupIndex = GroupCount
  Set frequencyData = Data.GetChannel(CNo("[" & GroupCount & "]/Frequency"))
  frequencyStart = frequencyData(1)
  frequencyStop = frequencyData(frequencyData.Size)
  For i = 1 To GroupCount
    stepTag = Safe_GroupPropGet(i, "Step_Tag")

    Select Case stepTag
      Case "C1.IN-C1.A"
        Set C1AData = Data.GetChannel(CNo("[" & i & "]/S21 Mag"))
        C1AExists = 1

      Case "C1.IN-C1.B"
        Set C1BData = Data.GetChannel(CNo("[" & i & "]/S21 Mag"))
        C1BExists = 1

      Case "C1.IN-C1.C"
        Set C1CData = Data.GetChannel(CNo("[" & i & "]/S21 Mag"))
        C1CExists = 1

      Case "C2.IN-C2.A"
        Set C2AData = Data.GetChannel(CNo("[" & i & "]/S21 Mag"))
        C2AExists = 1

      Case "C2.IN-C2.B"
        Set C2BData = Data.GetChannel(CNo("[" & i & "]/S21 Mag"))
        C2BExists = 1

      Case "C2.IN-C2.C"
        Set C2CData = Data.GetChannel(CNo("[" & i & "]/S21 Mag"))
        C2CExists = 1

      Case "RX.OUT-RX.A"
        Set RXAData = Data.GetChannel(CNo("[" & i & "]/S12 Mag"))
        RXAExists = 1

      Case "RX.OUT-RX.B"
        Set RXBData = Data.GetChannel(CNo("[" & i & "]/S12 Mag"))
        RXBExists = 1

      Case "RX.OUT-RX.C"
        Set RXCData = Data.GetChannel(CNo("[" & i & "]/S12 Mag"))
        RXCExists = 1

      Case "RX.OUT-RX.D"
        Set RXDData = Data.GetChannel(CNo("[" & i & "]/S12 Mag"))
        RXDExists = 1

      Case "RX.OUT-RX.E"
        Set RXEData = Data.GetChannel(CNo("[" & i & "]/S12 Mag"))
        RXEExists = 1
        
      Case "RX.OUT-RX.F"
        Set RXFData = Data.GetChannel(CNo("[" & i & "]/S12 Mag"))
        RXFExists = 1
		
    End Select
    ' groupIndex = groupIndex - 1
  Next

  ' Write [TXA] Section
  If C1AExists And C2AExists Then
    returnValue = TextFileWriteLn(fileHandle, "[TXA]")
    For i = 1 To frequencyData.Size
      value1 = C1AData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      value2 = C2AData(i)
      If value2 <> 0 Then
        value2 = -LogMag(value2)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0) & "," & FormatNumber(value2, 3, 0, 0, 0))
    Next
  End If

  ' Write [TXB] Section
  If C1BExists And C2BExists Then
    returnValue = TextFileWriteLn(fileHandle, "")
    returnValue = TextFileWriteLn(fileHandle, "[TXB]")
    For i = 1 To frequencyData.Size
      value1 = C1BData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      value2 = C2BData(i)
      If value2 <> 0 Then
        value2 = -LogMag(value2)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0) & "," & FormatNumber(value2, 3, 0, 0, 0))
    Next
  End If

  ' Write [TXC] Section
  If C1CExists And C2CExists Then
    returnValue = TextFileWriteLn(fileHandle, "")
    returnValue = TextFileWriteLn(fileHandle, "[TXC]")
    For i = 1 To frequencyData.Size
      value1 = C1CData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      value2 = C2CData(i)
      If value2 <> 0 Then
        value2 = -LogMag(value2)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0) & "," & FormatNumber(value2, 3, 0, 0, 0))
    Next
  End If
  
  ' Write [RXA] Section
  If RXAExists Then
    returnValue = TextFileWriteLn(fileHandle, "")
    returnValue = TextFileWriteLn(fileHandle, "[RXA]")
    For i = 1 To frequencyData.Size
      value1 = RXAData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
    Next
  End If
  
  ' Write [RXB] Section
  If RXBExists Then
    returnValue = TextFileWriteLn(fileHandle, "")
    returnValue = TextFileWriteLn(fileHandle, "[RXB]")
    For i = 1 To frequencyData.Size
      value1 = RXBData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
    Next
  End If

  ' Write [RXC] Section
  If RXCExists Then
    returnValue = TextFileWriteLn(fileHandle, "")
    returnValue = TextFileWriteLn(fileHandle, "[RXC]")
    For i = 1 To frequencyData.Size
      value1 = RXCData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
    Next
  End If
  
  ' Write [RXD] Section
  If RXDExists Then
    returnValue = TextFileWriteLn(fileHandle, "")
    returnValue = TextFileWriteLn(fileHandle, "[RXD]")
    For i = 1 To frequencyData.Size
      value1 = RXDData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
    Next
  End If
  
  ' Write [RXE] Section
  If RXEExists Then
    returnValue = TextFileWriteLn(fileHandle, "")
    returnValue = TextFileWriteLn(fileHandle, "[RXE]")
    For i = 1 To frequencyData.Size
      value1 = RXEData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
    Next
  End If
  
  ' Write [RXF] Section
  If RXFExists Then
    returnValue = TextFileWriteLn(fileHandle, "")
    returnValue = TextFileWriteLn(fileHandle, "[RXF]")
    For i = 1 To frequencyData.Size
      value1 = RXFData(i)
      If value1 <> 0 Then
        value1 = -LogMag(value1)
      End If
      returnValue = TextFileWriteLn(fileHandle, "dB@" & FormatNumber(frequencyData(i), 2, 0, 0, 0) & "MHz=" & FormatNumber(value1, 3, 0, 0, 0))
    Next
  End If

  Call Debug("----------Exit Fill SW Cal File----------")
End Sub