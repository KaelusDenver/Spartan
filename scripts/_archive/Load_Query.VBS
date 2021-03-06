'-------------------------------------------------------------------------------
'-- VBS script file
'-- Created on 10/31/2006 14:25:40
'-- Author: Jim West
'-- Comment: Script to build a query condition for an advanced query
'-------------------------------------------------------------------------------
Option Explicit  'Forces the explicit declaration of all the variables in a script.
AutoIgnoreError = 1     ' 1 turns off any error popups. 0 Enables popups

' Calling Script must preallocate the AdvancedQuery with "Navigator.CreateQuery(eAdvancedQuery)"
' Query_type, Cond_count, Max_Results are returned as with variables set.


SUB Load_Query (TDMFILE, AdvancedQuery, Query_type, Cond_count, Max_Results) 

DIM Query_Index
DIM X, Y, Channel_MAXTIME, Channel_X

' Delete all data in data portal
CALL DATADELALL(1)

' Set default values
Query_Type  = "esearchchannelgroup"
Max_Results = 32000
Cond_Count = 0

' Load the Query TDM File
Call DATAFILELOADSEL(TDMFILE,,"*/*","")

' Which Index is the Query?
Query_Index = GroupIndexGet("Spartan_Query")

' How many Condition Channels are there?
Cond_Count = GroupChnCount(Query_Index)

'-----------------------------Start IF COND_COUNT > 0 --------------------------------
IF Cond_Count >0 THEN  ' Don't do Query if there are no conditions.

        ' Open new Query
        'SET AdvancedQuery=Navigator.CreateQuery(eAdvancedQuery)

        ' Define the Return type
        Query_Type  = GroupPropGet(Query_Index, "description")
        Max_Results = GroupPropGet(Query_Index, "registertxt1")
        IF (Max_Results < 0) THEN Max_Results = 5000 END IF 'Will be set to -1 for all results

        SELECT CASE LOC (Query_Type)
              CASE "esearchfile"
                   AdvancedQuery.ReturnType=eSearchFile
              CASE "esearchchannelgroup"
                   AdvancedQuery.ReturnType=eSearchChannelGroup
              CASE "esearchchannel"
                   AdvancedQuery.ReturnType=eSearchChannel
              CASE ELSE
                   AdvancedQuery.ReturnType=eSearchChannelGroup
        END SELECT

        ' Load the Conditions for the Query
        ' Conditions are stored [ <Type>, <property name>, <comparison>, <Value>]
        FOR X = 1 to Cond_Count
            SELECT CASE LOC (CHT(1,X))
              CASE "esearchfile"
                   CALL AdvancedQuery.Conditions.Add(eSearchFile,         CHT(2,X),CHT(3,X),CHT(4,X))
              CASE "esearchchannelgroup"
                   CALL AdvancedQuery.Conditions.Add(eSearchChannelGroup, CHT(2,X),CHT(3,X),CHT(4,X))
              CASE "esearchchannel"
                   CALL AdvancedQuery.Conditions.Add(eSearchChannel,      CHT(2,X),CHT(3,X),CHT(4,X))
              CASE ELSE
                   ' ERROR
            END SELECT
        NEXT
END IF


' Calling Script should now execute the query

END SUB

' This subroutine loads the MNSN List;  Assumes TDMfile loaded by Load_Query

SUB Load_MNSNLIST (MNSNLIST,MNSN_Count) 

DIM Index, X, temp


' Which Index is the Query?
Index = GroupIndexGet("Spartan_MNSN")
'msgbox("index="&index)
' How many Condition Channels are there?
MNSN_Count = GroupChnCount(Index)

temp  = GroupPropGet(Index, "description")

'msgbox("MNSNcount "& MNSN_count)
IF MNSN_Count >0 THEN  
        REDIM MNSNLIST(MNSN_Count,2)
        ' Load the MNSN List for the Query series
        ' MN SN are stored as { [mn1,sn1], [mn2,sn2] ... [mnn,snn]}
        FOR X = 1 to MNSN_Count
        'msgbox("Spartan_MNSN/Spartan_MNSN"&x)
              MNSNLIST(X,1) = CHT(1,"Spartan_MNSN/Spartan_MNSN"&(x-1))
              MNSNLIST(X,2) = CHT(2,"Spartan_MNSN/Spartan_MNSN"&(x-1))
        NEXT
END IF

END SUB