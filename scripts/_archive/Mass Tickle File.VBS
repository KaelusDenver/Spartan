'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 07/12/2006 12:47:34
'-- Author: 
'-- Comment: 
'-------------------------------------------------------------------------------
AutoIgnoreError = 0

Dim Input,Icount
Input = InputBox("Enter Model Number") 

If (FileNameGet( "ANY", "FileRead", "c:\Program Files\Summitek\Spartan\data\tdm\","*"&Input&"*.tdm","All.lst", True) = "IDOk") Then ' Dialog closed with Ok
  MyFileNames = Split(FileDlgFileName,"|")

For iCount = 0 To Ubound(MyFileNames)
  ' Clear out the data portal
  CALL DATADELALL(TRUE)
  ON ERROR RESUME NEXT
  ' Load the File
  CALL DATAFILELOADSEL(MyFileNames(iCount),"TDM","RUN */*","")
  ' Modify the file
  Call RootPropSet("Author", "Spartan_Tickle"&Random(10000))
  Call DataFileSave(FileDlgName,"TDM")

Next

End If