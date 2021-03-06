'-------------------------------------------------------------------------------
'-- Spartan VBS script file
'-- Updated on 04/18/2013 
'-- Author: James Brunner
'-- Summary:
'   This script is called when Spartan uses DIAdem to generate "datasheets".
'   It is called from "..\SPARTAN\server\DIAdem\lib\DIAdem Process Datasheet Request.vi"
'-------------------------------------------------------------------------------
Option Explicit         ' This setting requires explicit variable allocation in script.
AutoIgnoreError = 1     ' 1 turns off any error popups. 0 Enables popups

' include common DD function library
ScriptInclude (CurrentScriptPath & "DD Library.vbs")

Call Debug(CurrentScriptName, "====== Entering ======>")

Dim parameters, plotEngineScript, i

' Parameters are sent from Spartan VI on the T6 tab-delimited string variable
' and consist of the report query parameters and "PlotEngine" and "PlotEngineScript" 
' which are used below to provide further processing
parameters = Split(T6, vbTab, -1, 1)
plotEngineScript = ""

For i = 0 To UBound(parameters)
    ' parameters from a VI - apostrophes have been escaped
    T3 = unescapeApostrophes(parameters(i))
  
    plotEngineScript = Lookup("plotEngineScript", parameters(i), "")

    Call Debug(CurrentScriptName, "  Calling plotEngineScript: " & plotEngineScript & "...")
    Call Debug(CurrentScriptName, "  ...and passing these parameters: " & T3)
    
    Call ScriptStart(CurrentScriptPath & plotEngineScript, "main") ' calls the "main()" routine of the plotEngineScript
Next

Call Debug(CurrentScriptName, "<====== Exiting ======")