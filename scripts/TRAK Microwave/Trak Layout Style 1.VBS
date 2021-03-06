'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 06/20/2005 15:46:14
'-- Author: J. Brunner
'-- Comment: Sets up a Spartan Style 2 Report Layout (TDR)
'-------------------------------------------------------------------------------
Option Explicit

'  These are some page layout constants for this Style of Report
'
'  US Letter size paper (inches)
'  These are used to set up relative positioning.
'  If you change paper sizes and/or orientation
'  these must change to match.
const PageWidth  = 11.0
const PageHeight = 8.5

'   These define the actual area used to draw the
'   report and are used in relative positioning
'   algorithms (units are inches)
const MarginLeft   = 0.5
const MarginTop    = 0.5
const MarginRight  = 0.5
const MarginBottom = 0.5

const HBoxHeight   =  4.00     ' Header box height as percentage of dwg area
                               ' HBox width hard-coded below to 33.33%

const FBoxHeight   =  4.00     ' Field box height
const FBoxWidth    = 32.00     ' Field box width

const Copyright    = "Copyright © 2005 Summitek Instruments - All rights reserved"
const Style        = "Trak Layout Style 1"

const DataSections = 1         ' single data section for test data

' Load Spartan Report Routines
Call ScriptInclude("Spartan Report Routines.vbs")

'--------------------------------------------------------------------------------
'   Text Formatting for this layout...
'--------------------------------------------------------------------------------
Dim LeftFooter, RightFooter

Set LeftFooter = New TextClass
With LeftFooter
  .RelPos = "r-bot"
  .Size   = 1.4
  .Frame  = False
  .Font   = "Verdana"
  .Bold   = False
  .Italic = True
  .Color  = "black"
End With

Set RightFooter = New TextClass
With RightFooter
  .RelPos = "l-bot"
  .Size   = 1.4
  .Frame  = False
  .Font   = "Verdana"
  .Bold   = False
  .Italic = True
  .Color  = "black"
End With

'--------------------------------------------------------------------------------
'   Begin Main Program
'--------------------------------------------------------------------------------
Call GraphDeleteAll()                              ' Delete any existing reports
Call GraphSheetNGet(1)                             ' Get the empty left by DIAdem

' create a new worksheet, where "Name"
' will be used elsewhere so don't change it
Call GraphSheetRename(GraphSheetName, "Trak Layout Style 1")

' Set up graphic layout and page printing parameters
' The graphic layout is relative to upper left corner
' of drawing area, and this layout is ratioed for a
' portrait-type print layout
PicInScal           = False          ' relative positioning
PicFrame            = False          ' we'll handle the frame ourselves
PicRatio            = 0.7752         ' set for landscape ratio

' Printing defaults (also affects PDF export)
PrintLeftMarg       = 0.00           ' left page margin
PrintTopMarg        = 0.00           ' top page page
PrintWidth          = PageWidth      ' page width (page height is read-only, use PicRatio
PrintOrient         = "landscape"    ' landscape orientation

' Load TDM set up report object globals and positioning...
'T1 = "C:\S Parameter_Chris Test_Times Cables.tdm"            ' TDM Data file
'L1 = 1                                                       ' Run Number
Call InitReportSingleRun(T1, L1)
Call SetCoordsAbs(MarginLeft, MarginTop, MarginRight, MarginBottom, PageWidth, PageHeight)

'  This creates a frame in which to put a
'  Report Section (specific to a type of Test)
Call AddReportSection(0.00, 0.00, 100.00, 75.00)    ' add report section
Call AddFieldsTable(36.00, 75.00)                   ' add custom fields

If FileExist(TDM("CompanyLogo", AutoDrv & "/images/Trak Logo.jpg")) Then
  Call AddPictureBox("", TDM("CompanyLogo", AutoDrv & "/images/Trak Logo.jpg"),  36.00, 92.00, 20.00, 10.00, FALSE)
End If


Call AddPageFooter()                               ' add footer

Call PicUpdate()                                   ' redraw report for update
'------------------------------------------------------------------------------
'   End Main Program
'------------------------------------------------------------------------------

'------------------------------------------------------------------------------
'   Subroutines
'------------------------------------------------------------------------------

'------------------------------------------------------------------------------
' AddFieldsTable(x,y)
' Adds a table of Custom Fields
'   x = % from left of drawing area
'   y = % down from top of drawing area
Sub AddFieldsTable(x, y)

' Column 1
  Call AddFieldBox("Job Number", TDM("JobNumber","880065"),             x, y               , FBoxWidth, FBoxHeight)
  Call AddFieldBox("Model Number", TDM("ModelNumber","D9B9111"),        x, y +   FBoxHeight, FBoxWidth, FBoxHeight)
  Call AddFieldBox("Serial Number", TDM("SerialNumber","ID102"),        x, y + 2*FBoxHeight, FBoxWidth, FBoxHeight)
  Call AddFieldBox("Timestamp", TDM("Timestamp","10/18/05 9:33:00 AM"), x, y + 3*FBoxHeight, FBoxWidth, FBoxHeight)
  
' Column 2
  Call AddFieldBox("Customer", TDM("Customer","COM DEV"),                  x + FBoxWidth, y               , FBoxWidth, FBoxHeight)
  Call AddFieldBox("Test By", TDM("Operator","T-23"),                      x + FBoxWidth, y +   FBoxHeight, FBoxWidth, FBoxHeight)
  Call AddFieldBox("Notes", TDM("Notes","GROUP A FINAL ELECTRICAL at +25"), x + FBoxWidth, y + 2*FBoxHeight, FBoxWidth, FBoxHeight)
  Call AddFieldBox("Temp", TDM("Temp","Room"),                             x + FBoxWidth, y + 3*FBoxHeight, FBoxWidth, FBoxHeight)
End Sub


'------------------------------------------------------------------------------
'  AddReportSection()
'  Placeholder for where Report Sections (specific to Spartan
'  Test types) will go
Sub AddReportSection(x, y, width, height)

   Dim RSbox

   RSbox = DrawBox("RS", x, y, width, height)

   Call GraphObjOpen(RSbox)
     AreaLineColor = "white"
   '  AreaBackColor = "other colors"     
   '  AreaBackRGB   = RGB(255,255,220)
   Call GraphObjClose(RSbox)

   'DrawText "note", "bodynote", "Specific Report Type Data Here", x + width/2, y + height/2

End Sub


'------------------------------------------------------------------------------
' AddPageFooter()
' Adds a page footer
Sub AddPageFooter()

  Call DrawText("LeftFooter",  LeftFooter,  Copyright,  0, 100)
  Call DrawText("RightFooter", RightFooter, Style,  100, 100)

End Sub