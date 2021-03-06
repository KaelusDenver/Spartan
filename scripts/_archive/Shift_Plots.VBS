'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 12/21/2005 14:25:42
'-- Author: 
'-- Comment: 
'-------------------------------------------------------------------------------

CALL SHIFT_ONE_PLOT(72,5.38)
CALL PICUPDATE

SUB SHIFT_one_plot (TOP,BOTTOM)
DIM Left_side,Right_side, Middle,HEIGHT, HALF_HEIGHT

'TOP = 72
'BOTTOM = 5.38  '17 for TIMES REPORT

HEIGHT = TOP - BOTTOM
HALF_HEIGHT = HEIGHT/2

LEFT_SIDE = 4.62
RIGHT_SIDE = 4

MIDDLE = TOP - HALF_HEIGHT

Call GRAPHObjOpen("PlotLabel")
  TXTPOSX          =50
  TXTPOSY          =TOP - .01*HEIGHT
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("PlotLabel")

Call GRAPHObjOpen("X_Label")
  TXTPOSX          =50
  TXTPOSY          =BOTTOM + .01*HEIGHT
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("X_Label")

Call GRAPHObjOpen("Y_Label")
  TXTPOSX          =4.62
  TXTPOSY          =BOTTOM + .4*HEIGHT
  TXTANG           =90
  TXTRELPOS        ="cent."
Call GRAPHObjClose("Y_Label")

Call GRAPHObjOpen("2DAxis1")
  D2AXISTOP        =100 - TOP + .28*HALF_HEIGHT
  D2AXISBOTTOM     =BOTTOM + .1*HALF_HEIGHT
  D2AXISLEFT       =15
  D2AXISRIGHT      =4

  D2LEGPOSX        =15.43
  D2LEGPOSY        =TOP - .05*HEIGHT
  D2LEGMOVE        ="automatic"
  D2LEGRELPOS      ="top left"

Call GRAPHObjClose("2DAxis1")

Call GRAPHObjOpen("Text3")
  TXTPOSX          =15.62
  TXTPOSY          = TOP - .12*HEIGHT
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("Text3")


END SUB


SUB SHIFT_Twoplot (TOP,BOTTOM)
DIM Left_side,Right_side,Middle,HEIGHT, HALF_HEIGHT

'TOP = 72
'BOTTOM = 5.38  '17 for TIMES REPORT

HEIGHT = TOP - BOTTOM
HALF_HEIGHT = HEIGHT/2

LEFT_SIDE = 4.62
RIGHT_SIDE = 4

MIDDLE = TOP - HALF_HEIGHT

Call GRAPHObjOpen("PlotLabel")
  TXTPOSX          =50
  TXTPOSY          =TOP - .025*HALF_HEIGHT
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("PlotLabel")

Call GRAPHObjOpen("X_Label")
  TXTPOSX          =50
  TXTPOSY          =MIDDLE + .025*HALF_HEIGHT
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("X_Label")

Call GRAPHObjOpen("Y_Label")
  TXTPOSX          =4.62
  TXTPOSY          =MIDDLE + .35*HALF_HEIGHT
  TXTANG           =90
  TXTRELPOS        ="cent."
Call GRAPHObjClose("Y_Label")

Call GRAPHObjOpen("2DAxis1")
  D2AXISTOP        =100 - TOP + .3*HALF_HEIGHT
  D2AXISBOTTOM     =MIDDLE + .1*HALF_HEIGHT
  D2AXISLEFT       =15
  D2AXISRIGHT      =4

  D2LEGPOSX        =15.43
  D2LEGPOSY        =top - .125*HALF_HEIGHT
  D2LEGMOVE        ="automatic"
  D2LEGRELPOS      ="top left"

Call GRAPHObjClose("2DAxis1")

Call GRAPHObjOpen("Text3")
  TXTPOSX          =15.62
  TXTPOSY          = TOP - .25*HALF_HEIGHT
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("Text3")


'+++++++++++++++++++++++++++

Call GRAPHObjOpen("2DAxis2")
  D2AXISTOP        =100 - MIDDLE + .3*HALF_HEIGHT
  D2AXISBOTTOM     =BOTTOM + .1*HALF_HEIGHT
  D2AXISLEFT       =15
  D2AXISRIGHT      =4

  D2LEGPOSX        =15.43
  D2LEGPOSY        =Middle -.125*HALF_HEIGHT
  D2LEGMOVE        ="automatic"
  D2LEGRELPOS      ="top left"

Call GRAPHObjClose("2DAxis2")

Call GRAPHObjOpen("Text4")
  TXTPOSX          =15.62
  TXTPOSY          =Middle - .25*HALF_HEIGHT
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("Text4")


Call GRAPHObjOpen("Plot2label")
  TXTPOSX          =50
  TXTPOSY          =Middle - .025*HALF_HEIGHT
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("Plot2label")

Call GRAPHObjOpen("plot2_Y_Label")
  TXTPOSX          =4.62
  TXTPOSY          =Bottom + .35*HALF_HEIGHT
  TXTANG           =90
  TXTRELPOS        ="cent."
Call GRAPHObjClose("plot2_Y_Label")

Call GRAPHObjOpen("plot2_X_Label")
  TXTPOSX          =50
  TXTPOSY          = BOTTOM
  TXTANG           =0
  TXTRELPOS        ="r-bot."
Call GRAPHObjClose("plot2_X_Label")

END SUB
