'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 10/04/2010 13:19:02
'-- Author: Christopher Bauer - updated James Brunner 4/23/2013
'-- Comment: This will index a specified file and wait until the index is complete.
'-------------------------------------------------------------------------------
Option Explicit 'Forces the explicit declaration of all the variables in a script.
AutoIgnoreError = 1 ' 1 turns off any error popups. 0 Enables popups

ScriptInclude(CurrentScriptPath & "DD Library.vbs") ' debugging and text routines

' inline errors for the DataFinder indexing success
On Error Resume Next

'T3 = "C:\Development\Spartan\data\TDM\RF Vrs Temp 0 dbXXXXXXs (25 degree)\00000\RF Vrs Temp 0 dbXXXXXXs (25 degree) 1 DC Attenuation.tdms" 'Uncomment to debug
'T5 = -1 'Uncomment to debug (-1 = Wait forever, 0 = Don't Wait)

Dim DataFinder, TDMSPath, ErrNum, Wait, message

' Get file to index and wait state from Spartan (T3, T5)
TDMSPath = unescapeApostrophes(T3) ' TDMS Path
Wait = T5 ' Wait time; -1 = wait, 0 = don't wait

Call Debug(CurrentScriptName, "Indexing file: " & TDMSPath)

If Not FileExist(TDMSPath) Then
    Call Debug(CurrentScriptName, "Indexing error.  File does not exist: " & TDMSPath)
    Exit Sub
End If

Set DataFinder = Navigator.ConnectDataFinder(Spartan_DF) ' Spartan_DF set in "DD Spartan Init.vbs"
Call DataFinder.Indexer.IndexFile(TDMSPath, True, Wait) ' Index file - reindex if necessary

ErrNum = Err.Number
On Error Goto 0 ' back to normal error flow

' check for errors indexing the file
If ErrNum <> 0 Then
    message = "DataFinder has too many jobs in its queue - indexing of " & TDMSPath & " not completed."
    Call Debug(CurrentScriptName, message)
    T1 = "1,-100100," & message
Else
    Call Debug(CurrentScriptName, "Successfully indexed file: " & TDMSPath)
    T1 = "0,0,Success"
End If