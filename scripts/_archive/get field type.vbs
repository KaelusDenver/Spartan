Dim iLoop
TargetGroupIndex = GroupIndexGet("run 1")
For iLoop = 1 to GroupPropCount(TargetGroupIndex)
  Call GroupPropInfoGet(TargetGroupIndex , GroupPropNameGet(TargetGroupIndex ,iLoop))
  Call MsgBoxDisp ("Property: " & GroupPropNameGet(TargetGroupIndex ,iLoop) & VBCrLf & "with data type: " & DatatypeAsText(DataType) & VBCrLf  )
Next

'==== Function to convert data type from integer into text ===
Function DatatypeAsText(iMyType)
  Select Case iMyType
    Case DataTypeFloat64
      DatatypeAsText = "Float64"
    Case DataTypeFloat32
      DatatypeAsText = "Float32"
    Case DataTypeInt16
      DatatypeAsText = "Int16"
    Case DataTypeInt32
      DatatypeAsText = "Int32"
    Case DataTypeString
      DatatypeAsText = "String"
    Case DataTypeUInt8
      DatatypeAsText = "UInt8"
    Case DataTypeDate
      DatatypeAsText = "Date"
    Case DataTypeEnum
      DatatypeAsText = "Enumeration"
    Case DataTypeUnKnown
      DatatypeAsText = "Unknown"
  End Select
End Function
