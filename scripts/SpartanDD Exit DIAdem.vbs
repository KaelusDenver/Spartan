'-------------------------------------------------------------------------------
'-- Spartan VBS script file
'-- Created on 10/08/2009 10:29:57
'-- Author: James Brunner
'-- Comment: Called from Spartan (DIAdem Daemon.vi) for DIAdem restarts 
'-------------------------------------------------------------------------------
Option Explicit 'Forces the explicit declaration of all the variables in a script.
AutoIgnoreError = 1 ' 1 turns off any error popups. 0 Enables popups

ScriptInclude(CurrentScriptPath & "DD Library.vbs") ' debugging and text routines

Call Debug(CurrentScriptName, "Exiting DIAdem") 

FileModification = "ignore" ' don't prompt to save changed files
Call ProgramExit
