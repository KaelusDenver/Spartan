'-------------------------------------------------------------------------------
'-- VBS script file
'-- Load and execute Query TDM File
Option Explicit         ' This setting requires explicit variable allocation in script.
AutoIgnoreError = 1     ' 1 turns off any error popups. 0 Enables popups
On Error Resume Next
ScriptInclude(AutoActPath&"\DD Lib.vbs") ' Common functions for DD format includes S2P, ASCII
ScriptInclude(AutoActPath&"Load_Query String.vbs")

Dim QueryString, ConditionCount, QueryIndex, QueryType, MaxResults, X, Y, AdvancedQuery, MyDataFinder, MyResults, ResultString, ConditionArray(100, 4), ResultColumns

' Variables that need to be passed in from LabVIEW
QueryString = T1   ' T1 is set by the LabVIEW control program  (DIADEM Daemon.vi)
ResultColumns = Split(T3, vbTab, -1, 1)
T1 = ""
ResultString = ""

Set AdvancedQuery = Navigator.CreateQuery(eAdvancedQuery)
Call Load_Query_String (QueryString, AdvancedQuery, QueryType, ConditionCount, ConditionArray, MaxResults)

If (Not AdvancedQuery.IsEmpty) Then
  ' Execute the Query
  Set MyDataFinder = Navigator.ConnectDataFinder(Spartan_DF)
  MyDataFinder.Results.MaxCount = MaxResults
  Call MyDataFinder.Search(AdvancedQuery) ' This will return MaxResults
  Set MyResults  = MyDataFinder.Results
  Call Debug ("results= "&MyResults.count&" "&QueryType)

  If (MyDataFinder.Results.IsIncomplete) Then
    T1 = "ERROR: Too many results returned.  Only " &MaxResults& " results can be returned. Please narrow your search and try again."
  Else
    ' Process the Results
    If MyResults.count > 0 Then
      X = 1
      ' For each element
      For Each Element in MyResults
        If (X <= Int(MaxResults)) Then
          Select Case Loc (QueryType) ' Only allow group queries
            Case "esearchchannelgroup"
              ResultString = ResultString + Element.Properties("root.parent.parent.FullPath").value   ' File Path of TDMS file
              ResultString = ResultString + vbTab
              ' The root.parent.parent.fullpath is workaround from Brad Turpin of NI
              ResultString = ResultString + Element.Properties("root.test_type").Value
              ResultString = ResultString + vbTab
              ResultString = ResultString + Element.Properties("root.model_number").Value             ' Model Number
              ResultString = ResultString + vbTab
              ResultString = ResultString + Element.Properties("root.serial_number").Value            ' Serial Number
              ResultString = ResultString + vbTab
              ResultString = ResultString + Element.Properties("Name").Value                          ' Run Number
              ResultString = ResultString + vbTab
              ResultString = ResultString + Cstr(Element.Properties("Start_timestamp").Value )        ' Start Timestamp
              ResultString = ResultString + vbTab
              ' You may wonder why the +vbTab is on a separate line.  In the case where the property
              ' is missing that line will error out.  Originally had Result + Property + vbtab.  This
              ' didn't work when the property was missing.
            Case Else
              ResultString = ResultString + "ERROR"
          End Select

          ' Add each Conditions values to the returned result
          ' For Column Count
          For Y = 0 To Ubound (ResultColumns)
            Call Debug ("ResultColumn = " + ResultColumns(y))
            ResultColumns(Y) = Replace(ResultColumns(Y),VBCR,"")
            ResultColumns(Y) = Replace(ResultColumns(Y),VBLF,"")
            If (Instr(ResultColumns(y), "(Prompted Input)") = 0) Then
              Select Case Trim(Loc(ResultColumns(Y)))
                Case "model_number", "serial_number","test_type"
                  ResultString = ResultString + Element.Properties("root."&ResultColumns(Y)).value
                Case Else
                  Temp = strip(Cstr(Element.Properties(ResultColumns(Y)).Value))
                  If (Element.Properties(ResultColumns(Y)).Value = "") Then
                    Temp = "--"
                  End If
                  Call Debug ("Value = " + Temp)
                  ResultString = ResultString + Temp
              End Select
            Else
              ResultString = ResultString + "--"
            End If

            If (Y < (Ubound (ResultColumns))) Then
              ResultString = ResultString + vbtab ' Don't put tab at end of line
            End If
            Call Debug ("ResultString = " + ResultString)
          Next
          ' End for Column Count
        Else
          Exit For
        End If ' End if less than MaxResults

        X = X + 1
        ResultString = ResultString + vbCR
      Next ' End for Element

      ' Send data back to LabVIEW via T1 parameter
      Call Debug ("Sending Data")
      Call Debug (ResultString)
      T1 = ResultString
      ResultString = ""
    Else
      Call Debug ("No Data")
    End If ' End if there were no results
  End If ' End if there were too many results
End If ' End If there is a valid query
'  If you need to know the result column name use item below to recall from results array.
'MsgBox Navigator.Display.CurrDataProvider.ResultsList.Columns(2).GetPath(eSearchChannelGroup)

FUNCTION strip(Temp)
  If (Instr(Temp, vblf)) Then
    Temp = Left(Temp, Instr(Temp, vblf)-1)
  End If

  If (Instr(Temp, vbcr)) Then
    Temp = Left(Temp, Instr( Temp, vblf)-1)
  End If

  If (Instr(Temp, vbtab)) Then
    Temp = Left(Temp, Instr(Temp, vblf)-1)
  End If

  strip = Temp
End Function