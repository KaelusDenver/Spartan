dim x,y,report_tdr,z



for x = 1 to 3
  for y = 1 to 2 

SELECT CASE (x)
   CASE 1
      REPORT_TDR = "REPORT one plot"
   CASE 2
      REPORT_TDR = "REPORT TWO plot"
   CASE 3
      REPORT_TDR = "REPORT FOUR plot"
 END SELECT


SELECT CASE (y)
   CASE 1
      REPORT_TDR = REPORT_TDR & " LANDSCAPE.TDR"
   CASE 2
      REPORT_TDR = REPORT_TDR & " PORTRAIT.TDR"
END SELECT

     CALL PICDELETE ' Delete any existing report
     CALL PICLOAD("c:\development\spartan\SCRIPTS" & "\" & REPORT_TDR )   ' Load Report

   Call GraphObjOpen("text1")
        '------------------- Text -----------------------------
        TxtTxt           ="© 2010 Summitek Instruments All Rights Reserved"
       Call GraphObjClose("text1")
   Call GraphObjOpen("text2")
        '------------------- Text -----------------------------
        TxtTxt           ="Spartan Datasheet v5.3"
       Call GraphObjClose("text2")


     CALL PICsave("c:\development\spartan\SCRIPTS" & "\" & REPORT_TDR )   ' save Report

next
next