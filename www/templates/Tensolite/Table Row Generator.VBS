'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 09/15/2008 13:43:23
'-- Author: 
'-- Comment: 
'-------------------------------------------------------------------------------
Option Explicit  'Forces the explicit declaration of all the variables in a script.

ScriptInclude ("Spartan Base.vbs")             ' Spartan Base functions


Sub AddTableRows(rows, cols, cellBaseName, cellBaseRow)
  Dim i, j, newCell, baseCell, newRow

  For i=0 To rows - 1

    newRow   = cellBaseRow + 1 + i

    If ((newRow Mod 2) <> 0) Then
      Call SpartanChnCopy("DataTable/DataTable_Row_1", "DataTable/DataTable_Row_" & newRow)
      Call ChnPropValSet("DataTable/DataTable_Row_" & newRow, "YPos", newRow*ChnPropValGet("DataTable/DataTable_Row_1", "Height"))
      Call GroupPropValSet(1, "o_DataTable_Row_" & newRow, "")
    End If

    For j=0 To cols - 1

      baseCell = cellBaseName & "_" & cellBaseRow & "_" & j ' base row, column j
      newCell  = cellBaseName & "_" & newRow & "_" & j

      Call SpartanChnCopy(baseCell, newCell)

      Call GroupPropValSet(GpIndex(newCell), "o_" & ChName(newCell), "") 

      Call ChnPropValSet(newCell, "YPos", newRow*ChnPropValGet(baseCell, "Height"))

      If (ChnPropExist(newCell, "DataQuery")) Then
        Call ChnPropSet(newCell, "DataQuery", "o_" & ChName(newCell) & "_Content")
      Else
        Call ChnPropDel(newCell, "o_" & ChName(cellBaseName) & "_" & cellBaseRow & "_" & j & "_Content")
        Call ChnPropCreate(newCell, "o_" & ChName(newCell) & "_Content", DataTypeString)
      End If

      Call SpartanChnCopy(baseCell & "_Content", newCell & "_Content")

      If (ChnPropExist(newCell & "_Content", "Value")) Then
        Call ChnPropSet(newCell & "_Content", "Value", "o_" & newCell & "_Content_Value")

        Call SpartanChnCopy(baseCell & "_Content_Value", newCell & "_Content_Value")
        Call ChnPropValSet(newCell & "_Content_Value", "ResultOffset", newRow - 1)
      Else
        Call ChnPropValSet(newCell & "_Content", "ResultOffset", newRow - 1)
      End If

    Next

  Next

End Sub

Call UIAutoRefreshSet(False) ' runs faster w/o refresh
Call AddTableRows(30, 7, "DataTable/DataTable_cell", 1)
Call UIAutoRefreshSet(True) ' turn screen update back on