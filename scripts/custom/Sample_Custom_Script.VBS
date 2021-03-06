'-------------------------------------------------------------------------------
'-- VBS script file
'-- Load and execute Query TDM File 
Option Explicit         ' This setting requires explicit variable allocation in script.
AutoIgnoreError = 1     ' 1 turns off any error popups. 0 Enables popups

Dim FSO, FILEREF
DIM TDM_FILE, REPORT_DIRECTORY, REPORT_NAME
DIM VAR_T3, VAR_T4, VAR_T5, VAR_T6, VAR_T7, VAR_T8, VAR_T9, VAR_T10
DIM TestType, SerialNumber, ModelNumber, Filenamestring, Filenameparts, TestRuns, RunName
DIM Nameparts, FilePATHstring

' These T variables are for the Spartan Script Engine to use.
TDM_FILE = T1           ' T1 is the TDM file to load for processing.
REPORT_DIRECTORY = T2   ' T2 has the report directory.  Put your report here.
RunName = T10           ' RunID or Group name In Storage Lingo

'These T Variables hold data passed in by script. Use INI file to create.
VAR_T3  = T3            ' Custom Parameter 1
VAR_T4  = T4            ' Custom Parameter 2
VAR_T5  = T5            ' Custom Parameter 3
VAR_T6  = T6            ' Custom Parameter 4
VAR_T7  = T7            ' Custom Parameter 5
VAR_T8  = T8            ' Custom Parameter 6
VAR_T9  = T9            ' Custom Parameter 7

Randomize ' Initialize the Random number generator

   CALL DATADELALL(1)                     ' Delete all data in data portal
   ON ERROR RESUME NEXT
   Call DataFileLoad(TDM_FILE)            ' Load the specified TDM File
   ON ERROR RESUME NEXT                   ' Note that the TDM file could be of any test type

   '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   ' vvvvvv Generate your Report vvvvv
   ' This example creates a text file based on the passed parameters.
   '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   ' This section could load a TDR or create a PDF
   Filepathstring = Split(TDM_FILE, ".", -1, 1)
   Filenamestring = Split(Filepathstring(0),"\",-1,1)
   Filenameparts  = Split(Filenamestring(UBound(filenamestring,1)), "_", -1, 1)

   Testtype    = Filenameparts(0)
   SerialNumber= Filenameparts(1)
   ModelNumber = Filenameparts(2)
   
   Randomize
   REPORT_NAME = REPORT_DIRECTORY&"\"&Testtype&"_"&SerialNumber&"_"&ModelNumber&"_"&RunName&"_"&CStr(INT(65535*Rnd()))&"_CustomReport.txt"

   ' Create the File for the Report
   Set FSO = CreateObject("Scripting.FileSystemObject")
   Set FILEREF = FSO.CreateTextFile(REPORT_NAME, True)

   'Write out the report data.
   FILEREF.writeline ("! Summitek Instruments Script Execution Example")
   FILEREF.writeline ("! Report TDM" & vbTab & TDM_FILE)
   FILEREF.writeline ("! Report Path" & vbTab & REPORT_NAME)
   FILEREF.writeline ("! Report Parameter 1 = " & vbTab & VAR_T3)
   FILEREF.writeline ("! Report Parameter 2 = " & vbTab & VAR_T4)
   FILEREF.writeline ("! Report Parameter 3 = " & vbTab & VAR_T5)
   FILEREF.writeline ("! Report Parameter 4 = " & vbTab & VAR_T6)
   FILEREF.writeline ("! Report Parameter 5 = " & vbTab & VAR_T7)
   FILEREF.writeline ("! Report Parameter 6 = " & vbTab & VAR_T8)
   FILEREF.writeline ("! Report Parameter 7 = " & vbTab & VAR_T9)
   FILEREF.writeline ("! Report Parameter 8 = " & vbTab & VAR_T10)

   ' Close the file.
   FILEREF.Close

   '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   ' ^^^^^ END Generate your Report ^^^^^
   '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

T1 = REPORT_NAME   ' T1 must be set to the file path of the generated report.


