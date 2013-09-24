'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 02/09/2010
'-- Author: Christopher Bauer
'-------------------------------------------------------------------------------
Option Explicit         'This setting requires explicit variable allocation in script.
SUB main()
  AutoIgnoreError = 1     '1 turns off any error popups. 0 Enables popups
  PICFRAME        = 0     'Turn off frame around a plot

  ScriptInclude (AutoActPath&"\DD Lib.vbs") 'Common functions

  DIM bottom, fieldBottom, reportTDR, reportPath, plotCount, pixelWidth, pixelHeight, channelStart
  reportPath = Lookup("REPORT_PATH", T3, "")
  plotCount = 1
  reportTDR = "Antel A.TDR"
  pixelWidth = 550
  pixelHeight = 792

  CALL PREPage_Processing(reportTDR, reportPath)

  'Fill in the header and any custom fields
  bottom = 4
  fieldBottom = 24.5

  'Refresh the Plot
  IF CINT(UPC(Lookup("PREVIEW", T3, "0"))) = 1 THEN
    CALL PicUpdate
    CALL PicExport(reportPath, "PNG", false, pixelHeight, pixelWidth, "rgb 24", , "NoCompression")  'Exports the current sheet as WMF file
    T7 = reportPath
  ELSE
    channelStart = GlobUsedChn
    IF channelStart > 0 THEN 
       channelStart = channelStart + 1
    END IF
    CALL Create_Plot(1)
    CALL FillAntel(channelStart)
    CALL POSTPage_Processing(reportTDR, reportPath)
  END IF
  T1 = T7
END SUB

SUB FillAntel(channelStart)
'  CALL Debug("----------Enter Fill Antel----------")
  DIM frequencyIndex, modelNumber, serialNumber, testType, filePath,TempArray
  frequencyIndex = cno("Frequency", channelStart)
  
  TempArray= Split(  Lookup("Model_Number_txt", T3, ""), "::", -1, 1)
  modelNumber  = escat(TempArray(1))
  
  TempArray= Split(  Lookup("Serial_Number_txt", T3, ""), "::", -1, 1)
  serialNumber  = escat(TempArray(1))
  

  testType = Lookup("Plot2_Style", T3, "")
  filePath = Lookup("Data_Path", T3, "")&"\"&Lookup("Model_Number", T3, "")&" "&Lookup("Serial_Number", T3, "")&" "&testType&".tdms"

  'Model Number
  CALL GraphObjOpen("Text14")
  TxtTxt = modelNumber
  CALL GraphObjClose("Text14")

  'Serial Number
  CALL GraphObjOpen("Text20")
  TxtTxt = serialNumber
  CALL GraphObjClose("Text20")

  IF testType = "PIM" AND FileExist(filePath) THEN
    CALL DATAFILELOADSEL(filePath, "TDMS", "*/*", "")

    channelStart = GlobUsedChn
    IF channelStart > 0 THEN
      channelStart = channelStart - 16
    END IF

    'Test Date/Time
    CALL GraphObjOpen("Text17")
    TxtTxt = SpartanDateTime(CDBL(SAFE_grouppropget(GROUPCOUNT, "Start_Timestamp")), "MM/DD/YYYY hh:nn AMPM")
    CALL GraphObjClose("Text17")

    'Test Station
    CALL GraphObjOpen("Text23")
    TxtTxt = SAFE_grouppropget(GROUPCOUNT, "Test_Station_Name")
    CALL GraphObjClose("Text23")

    'SO Number
    CALL GraphObjOpen("Text26")
    TxtTxt = SAFE_grouppropget(GROUPCOUNT, Lookup("FieldID_2", T3, ""))
    CALL GraphObjClose("Text26")

    'Tester
    CALL GraphObjOpen("Text29")
    TxtTxt = SAFE_grouppropget(GROUPCOUNT, Lookup("FieldID_1", T3, ""))
    CALL GraphObjClose("Text29")

    'Test Status
    CALL GraphObjOpen("Text39")
    TxtTxt = SAFE_grouppropget(GROUPCOUNT, "Test_Status")
    TxtColor = "white"
    TxtBackColor = Test_Status_Color(SAFE_grouppropget(GROUPCOUNT, "Test_Status"))
    CALL graphobjclose("Text39")

    'PIM Order
    CALL GraphObjOpen("Text37")
    TxtTxt = SAFE_grouppropget(GROUPCOUNT,"IM_Order")
    CALL GraphObjClose("Text37")

    'IM Mode
    CALL GraphObjOpen("Text44")
    TxtTxt = UPC(SAFE_grouppropget(GROUPCOUNT, "IM_Mode"))&" PIM RESPONSE"
    CALL GraphObjClose("Text44")

    'TX1 Frequency
    CALL GraphObjOpen("Text78")
    TxtTxt = SafeFormatNumber(chd(1, cno("TX1 Frequency", channelStart)), 1)
    CALL GraphObjClose("Text78")

    'TX2 Frequency
    CALL GraphObjOpen("Text79")
    TxtTxt = SafeFormatNumber(chd(1, cno("TX2 Frequency", channelStart)), 1)
    CALL GraphObjClose("Text79")

    'Watt = (10^(dBm/10))/1000
    'Carrier 1 Requested
    CALL GraphObjOpen("Text60")
    TxtTxt = SafeFormatNumber(dBm_to_Watt(SAFE_grouppropget(GROUPCOUNT, "C1_Requested")), 1)
    CALL GraphObjClose("Text60")

    'Carrier 2 Requested
    CALL GraphObjOpen("Text74")
    TxtTxt = SafeFormatNumber(dBm_to_Watt(SAFE_grouppropget(GROUPCOUNT, "C2_Requested")), 1)
    CALL GraphObjClose("Text74")

    'ALC
    CALL GraphObjOpen("Text46")
    IF SAFE_grouppropget(GROUPCOUNT, "ALC") = "1" THEN
      TxtTxt = "On"
    ELSE
      TxtTxt = "Off"
    END IF
    CALL GraphObjClose("Text46")

    'Averaging
    CALL GraphObjOpen("Text34")
    TxtTxt = SAFE_grouppropget(GROUPCOUNT, "Averaging")
    CALL GraphObjClose("Text34")

    'PIM Limit
    CALL GraphObjOpen("Text7")
    TxtTxt = SafeFormatNumber(chd(1, cno("Ref Limit 2", channelStart)), 1)
    CALL GraphObjClose("Text7")

    'PIM Frequency
    CALL GraphObjOpen("Text4")
    TxtTxt = SafeFormatNumber(chd(1, cno(SAFE_grouppropget(GROUPCOUNT, "IM_Order")&" Frequency", channelStart)), 2)
    CALL GraphObjClose("Text4")

    'PIM Level
    CALL GraphObjOpen("Text6")
    TxtTxt = SafeFormatNumber(SAFE_chnpropget("[" & GROUPCOUNT & "]/" & SAFE_grouppropget(GROUPCOUNT,"IM_Order")&" Power 2", "Maximum"), 1)
    CALL GraphObjClose("Text6")

    'Carrier 1 Measured Power
    CALL GraphObjOpen("Text52")
    TxtTxt = SafeFormatNumber(dBm_to_Watt(SAFE_chnpropget("[" & GROUPCOUNT & "]/" & "TX1 Power", "Maximum")), 1)& " Watt"
    CALL GraphObjClose("Text52")

    'Carrier 2 Measured Power
    CALL GraphObjOpen("Text66")
    TxtTxt = SafeFormatNumber(dBm_to_Watt(SAFE_chnpropget("[" & GROUPCOUNT & "]/" & "TX2 Power", "Maximum")), 1)& " Watt"
    CALL GraphObjClose("Text66")
  END IF
'  CALL Debug("----------Exit Fill Antel----------")
END SUB