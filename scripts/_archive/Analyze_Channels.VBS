'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 01/31/2006 09:05:35
'-- Author: 
'-- Comment: 
'-------------------------------------------------------------------------------
' Assume that the data channels are the same length.
Numbercalc = 201
NumberChannels = 3


For I = 1 To 22
  StatSel(I) = "No"
Next
StatSel(4) = "Yes" ' Minimum
StatSel(5) = "Yes" ' Maximum
StatSel(6) = "Yes" ' Arith. mean
Statsel(14) = "Yes" ' Standard Deviation
StatResChn = TRUE
Call StatBlockCalc("Block","1-","'Channel_1'-'Channel_3'")

CALL ChnAlloc("TOP_SDEV", NumberCalc, 1, DataTypeFloat64)  'Create destination FOR Data
CALL ChnAlloc("BOT_SDEV", NumberCalc, 1, DataTypeFloat64)  'Create destination FOR Data

Top_index = CNo("TOP_SDEV")
bot_index = CNo("BOT_SDEV")

For intloop = 1 To NumberCalc
  ChD(intloop,Top_index) = ChD(intloop,CNo("Arithm_mean"))+ ChD(intloop,CNo("Standard_dev"))
  ChD(intloop,Bot_index) = ChD(intloop,CNo("Arithm_mean"))- ChD(intloop,CNo("Standard_dev"))
Next
