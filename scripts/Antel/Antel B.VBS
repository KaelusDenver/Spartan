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
  reportTDR = "Antel B.TDR"
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
  DIM frequencyIndex, modelNumber, serialNumber, testType, filePath,TempArray
  frequencyIndex = cno("Frequency", channelStart)
  TempArray= Split(  Lookup("Model_Number_txt", T3, ""), "::", -1, 1)
  modelNumber  = escat(TempArray(1))
  
  TempArray= Split(  Lookup("Serial_Number_txt", T3, ""), "::", -1, 1)
  serialNumber  = escat(TempArray(1))
  'Model Number
  CALL GraphObjOpen("Text14")
  TxtTxt = modelNumber
  CALL GraphObjClose("Text14")

  'Serail Number
  CALL GraphObjOpen("Text20")
  TxtTxt = serialNumber
  CALL GraphObjClose("Text20")

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

END SUB