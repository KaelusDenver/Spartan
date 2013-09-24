OPTION EXPLICIT
Dim DataFinder, Query 
Set Query = Navigator.CreateQuery(eAdvancedQuery) 
Query.ReturnType = eSearchFile 
Call Query.Conditions.Add(eSearchFile, "dataPluginName", "=", "TDMS") 
Call Query.Conditions.Add(eSearchFile, "indexStatus", "<>", "eIndexedSuccess") 

Set DataFinder = Navigator.Display.CurrDataProvider.QueryForm 
Call DataFinder.SetCurrQuery(Query) 
Call DataFinder.Search()