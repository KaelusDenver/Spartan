'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 07/20/2005 15:10:45
'-- Author: ---
'-- Comment: ---
'-------------------------------------------------------------------------------
CALL PICLOAD("I:\Engineering\Development\SPARTAN\Scripts\Sxx Report.tdr")

Call GraphObjOpen("Metafile1")
   MtaFileName = "I:\Engineering\Development\SPARTAN\www\images\logo.jpg"
   MtaPosX = 3
   MtaPosY = 82.9
   MtaHeight = 13.1
   MtaWidth = 31
   MtaRatioAdapt = FALSE
   MtaRelPos = r-bot
Call GraphObjClose("Metafile1")
CALL PICUPDATE  