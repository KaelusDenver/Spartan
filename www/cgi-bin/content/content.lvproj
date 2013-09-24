<?xml version='1.0' encoding='UTF-8'?>
<Project Type="Project" LVVersion="11008008">
	<Item Name="My Computer" Type="My Computer">
		<Property Name="NI.SortType" Type="Int">3</Property>
		<Property Name="server.app.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.control.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.tcp.enabled" Type="Bool">false</Property>
		<Property Name="server.tcp.port" Type="Int">0</Property>
		<Property Name="server.tcp.serviceName" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.tcp.serviceName.default" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.vi.callsEnabled" Type="Bool">true</Property>
		<Property Name="server.vi.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="specify.custom.address" Type="Bool">false</Property>
		<Item Name="content.vit" Type="VI" URL="../content.vit"/>
		<Item Name="CRP32DLL.DLL" Type="Document" URL="../../../../license/CRP32DLL.DLL"/>
		<Item Name="Dependencies" Type="Dependencies">
			<Item Name="vi.lib" Type="Folder">
				<Item Name="Keyed Array.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array.ctl"/>
				<Item Name="Acquire Semaphore.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Acquire Semaphore.vi"/>
				<Item Name="Error Cluster From Error Code.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Error Cluster From Error Code.vi"/>
				<Item Name="Trim Whitespace.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Trim Whitespace.vi"/>
				<Item Name="whitespace.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/whitespace.ctl"/>
				<Item Name="Semaphore RefNum" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Semaphore RefNum"/>
				<Item Name="Semaphore Refnum Core.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Semaphore Refnum Core.ctl"/>
				<Item Name="Release Semaphore.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Release Semaphore.vi"/>
				<Item Name="Not A Semaphore.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Not A Semaphore.vi"/>
				<Item Name="HTTP Session Data.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http_obj.llb/HTTP Session Data.ctl"/>
				<Item Name="Keyed Array Index.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Index.vi"/>
				<Item Name="Keyed Array Map String.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Map String.vi"/>
				<Item Name="Get Case Matching.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Get Case Matching.vi"/>
				<Item Name="Case Matching.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Case Matching.ctl"/>
				<Item Name="CGI Parse URL-Encoded Param String.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Parse URL-Encoded Param String.vi"/>
				<Item Name="CGI Unescape HTTP Param.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Unescape HTTP Param.vi"/>
				<Item Name="Keyed Array Add.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Add.vi"/>
				<Item Name="RFC-1123 Date.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/RFC-1123 Date.vi"/>
				<Item Name="GMT Delta.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/GMT Delta.vi"/>
				<Item Name="LV70U32ToDateRec.vi" Type="VI" URL="/&lt;vilib&gt;/_oldvers/_oldvers.llb/LV70U32ToDateRec.vi"/>
				<Item Name="CGI Unix To Path.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Unix To Path.vi"/>
				<Item Name="Get File System Separator.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/sysinfo.llb/Get File System Separator.vi"/>
				<Item Name="HTTP SRM.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/config.llb/HTTP SRM.vi"/>
				<Item Name="Keyed Array Contents.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Contents.vi"/>
				<Item Name="CGI Get Info.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Get Info.vi"/>
				<Item Name="CGI Script Relative Path.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Script Relative Path.vi"/>
				<Item Name="HTTP Translate Virtual Path.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http1.llb/HTTP Translate Virtual Path.vi"/>
				<Item Name="HTTP Map Alias.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http1.llb/HTTP Map Alias.vi"/>
				<Item Name="Keyed Array Keys.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Keys.vi"/>
				<Item Name="Match Literal Prefix.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Match Literal Prefix.vi"/>
				<Item Name="Get Literal Search Pattern.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Get Literal Search Pattern.vi"/>
				<Item Name="CGI Path To Unix.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Path To Unix.vi"/>
				<Item Name="HTTP Redirect Request.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http1.llb/HTTP Redirect Request.vi"/>
				<Item Name="CGI Build Unix Path.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Build Unix Path.vi"/>
				<Item Name="CGI Reply.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Reply.ctl"/>
				<Item Name="LVDateTimeRec.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/miscctls.llb/LVDateTimeRec.ctl"/>
				<Item Name="HTTP Build Header.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http2.llb/HTTP Build Header.vi"/>
				<Item Name="TCP Write Entire Buffer.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/tcputil.llb/TCP Write Entire Buffer.vi"/>
				<Item Name="No Time Out Error.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/tcputil.llb/No Time Out Error.vi"/>
				<Item Name="Cookie Destroy.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cookie.llb/Cookie Destroy.vi"/>
				<Item Name="Cookie Registry.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cookie.llb/Cookie Registry.vi"/>
				<Item Name="Cookie Destructor.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cookie.llb/Cookie Destructor.vi"/>
				<Item Name="Cookie Data.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cookie.llb/Cookie Data.ctl"/>
				<Item Name="Cookie.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cookie.llb/Cookie.ctl"/>
				<Item Name="Create Directory Recursive.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Create Directory Recursive.vi"/>
				<Item Name="System Directory Type.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/sysdir.llb/System Directory Type.ctl"/>
				<Item Name="Get System Directory.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/sysdir.llb/Get System Directory.vi"/>
			</Item>
			<Item Name="user.lib" Type="Folder">
				<Item Name="Strip Path Extension - Path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension - Path__ogtk.vi"/>
				<Item Name="Strip Path Extension - String__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension - String__ogtk.vi"/>
				<Item Name="Strip Path Extension__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension__ogtk.vi"/>
				<Item Name="Strip Path Extension - 1D Array of Paths__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension - 1D Array of Paths__ogtk.vi"/>
				<Item Name="Strip Path Extension - 1D Array of Strings__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension - 1D Array of Strings__ogtk.vi"/>
				<Item Name="File Exists__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/File Exists__ogtk.vi"/>
				<Item Name="Valid Path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Valid Path__ogtk.vi"/>
				<Item Name="Valid Path - Traditional__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Valid Path - Traditional__ogtk.vi"/>
				<Item Name="Valid Path - Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Valid Path - Array__ogtk.vi"/>
				<Item Name="Convert File Extension__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Convert File Extension__ogtk.vi"/>
				<Item Name="Convert File Extension (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Convert File Extension (Path)__ogtk.vi"/>
				<Item Name="Convert File Extension (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Convert File Extension (String)__ogtk.vi"/>
				<Item Name="Create Dir if Non-Existant__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Create Dir if Non-Existant__ogtk.vi"/>
				<Item Name="Strip Path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path__ogtk.vi"/>
				<Item Name="Strip Path - Arrays__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path - Arrays__ogtk.vi"/>
				<Item Name="Strip Path - Traditional__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path - Traditional__ogtk.vi"/>
				<Item Name="Build Path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Build Path__ogtk.vi"/>
				<Item Name="Build Path - Traditional__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Build Path - Traditional__ogtk.vi"/>
				<Item Name="Build Path - File Names Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Build Path - File Names Array__ogtk.vi"/>
				<Item Name="Build Path - File Names and Paths Arrays__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Build Path - File Names and Paths Arrays__ogtk.vi"/>
				<Item Name="Build Path - Traditional - path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Build Path - Traditional - path__ogtk.vi"/>
				<Item Name="Build Path - File Names Array - path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Build Path - File Names Array - path__ogtk.vi"/>
				<Item Name="Build Path - File Names and Paths Arrays - path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Build Path - File Names and Paths Arrays - path__ogtk.vi"/>
				<Item Name="File Exists - Scalar__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/File Exists - Scalar__ogtk.vi"/>
				<Item Name="File Exists - Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/File Exists - Array__ogtk.vi"/>
			</Item>
			<Item Name="Empty Keyed Array.vi" Type="VI" URL="../../_cgi-lib/Empty Keyed Array.vi"/>
			<Item Name="Spartan HTTP VIT Open.vi" Type="VI" URL="../../../../server/http/Spartan HTTP VIT Open.vi"/>
			<Item Name="Spartan HTTP Session.ctl" Type="VI" URL="../../../../server/http/Spartan HTTP Session.ctl"/>
			<Item Name="Spartan HTTP Server Globals.vi" Type="VI" URL="../../../../server/http/Spartan HTTP Server Globals.vi"/>
			<Item Name="Open Spartan Database.vi" Type="VI" URL="../../../../server/database/Open Spartan Database.vi"/>
			<Item Name="Application Folder.vi" Type="VI" URL="../../../../server/server lib/Application Folder.vi"/>
			<Item Name="Open Connection DriverConnect.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Talk/Open Connection DriverConnect.vi"/>
			<Item Name="SQLAllocHandle.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLAllocHandle.vi"/>
			<Item Name="Odbc32.dll" Type="Document" URL="Odbc32.dll">
				<Property Name="NI.PreserveRelativePath" Type="Bool">true</Property>
			</Item>
			<Item Name="SQLGetDiagRec.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLGetDiagRec.vi"/>
			<Item Name="SQLSetEnvAttr.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLSetEnvAttr.vi"/>
			<Item Name="SQLDriverConnect.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLDriverConnect.vi"/>
			<Item Name="SQLFreeHandle.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLFreeHandle.vi"/>
			<Item Name="Connection Refnum.ctl" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Controls/Connection Refnum.ctl"/>
			<Item Name="Read ENV for GET.vi" Type="VI" URL="../../_cgi-lib/Read ENV for GET.vi"/>
			<Item Name="www template.vi" Type="VI" URL="../../_cgi-lib/www template.vi"/>
			<Item Name="www template process login keys.vi" Type="VI" URL="../../_cgi-lib/www template process login keys.vi"/>
			<Item Name="Boolean to Boolean String.vi" Type="VI" URL="../../../../../SI.LIB/Boolean to Boolean String.vi"/>
			<Item Name="www template read file.vi" Type="VI" URL="../../_cgi-lib/www template read file.vi"/>
			<Item Name="Spartan HTTP File to Content-type.vi" Type="VI" URL="../../../../server/http/Spartan HTTP File to Content-type.vi"/>
			<Item Name="www template read file core.vi" Type="VI" URL="../../_cgi-lib/www template read file core.vi"/>
			<Item Name="www template error.vi" Type="VI" URL="../../_cgi-lib/www template error.vi"/>
			<Item Name="Spartan Event Log.vi" Type="VI" URL="../../../../server/errorlog/Spartan Event Log.vi"/>
			<Item Name="append log entry.vi" Type="VI" URL="../../../../server/errorlog/append log entry.vi"/>
			<Item Name="format log entry.vi" Type="VI" URL="../../../../server/errorlog/format log entry.vi"/>
			<Item Name="errorlog types.ctl" Type="VI" URL="../../../../server/errorlog/errorlog types.ctl"/>
			<Item Name="append log entry - low level.vi" Type="VI" URL="../../../../server/errorlog/append log entry - low level.vi"/>
			<Item Name="archive log.vi" Type="VI" URL="../../../../server/errorlog/archive log.vi"/>
			<Item Name="calculate log time range.vi" Type="VI" URL="../../../../server/errorlog/calculate log time range.vi"/>
			<Item Name="User Record.ctl" Type="VI" URL="../../../../server/database/Users/User Record.ctl"/>
			<Item Name="escape characters for javascript.vi" Type="VI" URL="../../_cgi-lib/escape characters for javascript.vi"/>
			<Item Name="www template header.vi" Type="VI" URL="../../_cgi-lib/www template header.vi"/>
			<Item Name="www template engine.vi" Type="VI" URL="../../_cgi-lib/www template engine.vi"/>
			<Item Name="www template global keys.vi" Type="VI" URL="../../_cgi-lib/www template global keys.vi"/>
			<Item Name="Field Get MN SN Display Names.vi" Type="VI" URL="../../../../server/database/Fields/Field Get MN SN Display Names.vi"/>
			<Item Name="Open Statement.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Talk/Open Statement.vi"/>
			<Item Name="Statement Refnum.ctl" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Controls/Statement Refnum.ctl"/>
			<Item Name="Execute User Query.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Talk/Execute User Query.vi"/>
			<Item Name="SQLExecDirect.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLExecDirect.vi"/>
			<Item Name="SQLNumResultCols.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLNumResultCols.vi"/>
			<Item Name="Check for Data.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Talk/Check for Data.vi"/>
			<Item Name="SQLFetch.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLFetch.vi"/>
			<Item Name="SQLCloseCursor.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLCloseCursor.vi"/>
			<Item Name="Field Retrieve Record.vi" Type="VI" URL="../../../../server/database/Fields/Field Retrieve Record.vi"/>
			<Item Name="Fetch I32 data.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Data/Fetch I32 data.vi"/>
			<Item Name="Fetch STR data.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Data/Fetch STR data.vi"/>
			<Item Name="Field Record.ctl" Type="VI" URL="../../../../server/database/Fields/Field Record.ctl"/>
			<Item Name="Field DataTypes.ctl" Type="VI" URL="../../../../server/database/Fields/Field DataTypes.ctl"/>
			<Item Name="Field NextItem.ctl" Type="VI" URL="../../../../server/database/Fields/Field NextItem.ctl"/>
			<Item Name="Close Statement.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Talk/Close Statement.vi"/>
			<Item Name="User jsObject.vi" Type="VI" URL="../../../../server/database/Users/User jsObject.vi"/>
			<Item Name="Station Get All.vi" Type="VI" URL="../../../../server/database/Stations/Station Get All.vi"/>
			<Item Name="Station Retrieve Record.vi" Type="VI" URL="../../../../server/database/Stations/Station Retrieve Record.vi"/>
			<Item Name="Station Record.ctl" Type="VI" URL="../../../../server/database/Stations/Station Record.ctl"/>
			<Item Name="Instrument Get On Station.vi" Type="VI" URL="../../../../server/database/Stations/Instruments/Instrument Get On Station.vi"/>
			<Item Name="Association Get By Station.vi" Type="VI" URL="../../../../server/database/Stations/Associations/Association Get By Station.vi"/>
			<Item Name="Association Retrieve Record.vi" Type="VI" URL="../../../../server/database/Stations/Associations/Association Retrieve Record.vi"/>
			<Item Name="Association Record.ctl" Type="VI" URL="../../../../server/database/Stations/Associations/Association Record.ctl"/>
			<Item Name="Instrument Get By ixInstrument.vi" Type="VI" URL="../../../../server/database/Stations/Instruments/Instrument Get By ixInstrument.vi"/>
			<Item Name="Instrument Retrieve Record.vi" Type="VI" URL="../../../../server/database/Stations/Instruments/Instrument Retrieve Record.vi"/>
			<Item Name="Fetch DateTime data.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Data/Fetch DateTime data.vi"/>
			<Item Name="Format DateTime Data.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Data/Format DateTime Data.vi"/>
			<Item Name="Decode MHTML Base64.vi" Type="VI" URL="../../../../../SI.LIB/HTML/MHTML/Decode MHTML Base64.vi"/>
			<Item Name="Instrument Record.ctl" Type="VI" URL="../../../../server/database/Stations/Instruments/Instrument Record.ctl"/>
			<Item Name="Station Record Fields.ctl" Type="VI" URL="../../../../server/database/Stations/Station Record Fields.ctl"/>
			<Item Name="Spartan Version.vi" Type="VI" URL="../../../../server/server lib/Spartan Version.vi"/>
			<Item Name="OGAB Version.ctl" Type="VI" URL="../../../../../SI.LIB/OGAB Version.ctl"/>
			<Item Name="Close Spartan Database.vi" Type="VI" URL="../../../../server/database/Close Spartan Database.vi"/>
			<Item Name="Close Connection.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Talk/Close Connection.vi"/>
			<Item Name="SQLDisconnect.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/SQL Lib/SQLDisconnect.vi"/>
			<Item Name="Spartan HTTP VIT Close.vi" Type="VI" URL="../../../../server/http/Spartan HTTP VIT Close.vi"/>
			<Item Name="Spartan HTTP Write Reply.vi" Type="VI" URL="../../../../server/http/Spartan HTTP Write Reply.vi"/>
			<Item Name="Spartan HTTP Write Session Header.vi" Type="VI" URL="../../../../server/http/Spartan HTTP Write Session Header.vi"/>
			<Item Name="Spartan HTTP Get Session Status.vi" Type="VI" URL="../../../../server/http/Spartan HTTP Get Session Status.vi"/>
			<Item Name="Spartan HTTP Build Header.vi" Type="VI" URL="../../../../server/http/Spartan HTTP Build Header.vi"/>
			<Item Name="Spartan HTTP Write Session Data.vi" Type="VI" URL="../../../../server/http/Spartan HTTP Write Session Data.vi"/>
			<Item Name="Spartan HTTP Destroy Session.vi" Type="VI" URL="../../../../server/http/Spartan HTTP Destroy Session.vi"/>
			<Item Name="Compact and Repair DB.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/Compact and Repair DB.vi"/>
			<Item Name="Path to Connection String.vi" Type="VI" URL="../../../../../SI.LIB/ODBC/Path to Connection String.vi"/>
			<Item Name="Data Folder.vi" Type="VI" URL="../../../../server/server lib/Data Folder.vi"/>
			<Item Name="Spartan CONFIG Global.vi" Type="VI" URL="../../../../server/server lib/Spartan CONFIG Global.vi"/>
			<Item Name="spEVENTLOG Append Entry.vi" Type="VI" URL="../../../../server/errorlog/spEVENTLOG Append Entry.vi"/>
			<Item Name="Authorization Global.vi" Type="VI" URL="../../../../license/Authorization Global.vi"/>
			<Item Name="Authorization Data.ctl" Type="VI" URL="../../../../license/Authorization Data.ctl"/>
			<Item Name="Fields Query.vi" Type="VI" URL="../../../../server/database/Fields/Fields Query.vi"/>
			<Item Name="Public Application Data Folder.vi" Type="VI" URL="../../../../server/server lib/Public Application Data Folder.vi"/>
		</Item>
		<Item Name="Build Specifications" Type="Build">
			<Item Name="content" Type="Source Distribution">
				<Property Name="Bld_buildCacheID" Type="Str">{444B2E8E-9025-4ABF-8A6B-611226844F01}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">content</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">//ssumssndbx01/c$/program files/summitek/spartan/www/cgi-bin</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{9597F768-D7AC-4098-8273-DA4815F084EC}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">Destination Directory</Property>
				<Property Name="Destination[0].path" Type="Path">//ssumssndbx01/c$/program files/summitek/spartan/www/cgi-bin</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">//ssumssndbx01/c$/program files/summitek/spartan/www/cgi-bin</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[2].destName" Type="Str">content</Property>
				<Property Name="Destination[2].path" Type="Path">//ssumssndbx01/c$/program files/summitek/spartan/www/cgi-bin/NI_AB_PROJECTNAME.llb</Property>
				<Property Name="Destination[2].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[2].type" Type="Str">LLB</Property>
				<Property Name="DestinationCount" Type="Int">3</Property>
				<Property Name="Source[0].Container.applyDestination" Type="Bool">true</Property>
				<Property Name="Source[0].destinationIndex" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{46D2E44F-AB9B-4298-83ED-1EE1406B6759}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/content.vit</Property>
				<Property Name="Source[1].sourceInclusion" Type="Str">Include</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref">/My Computer/CRP32DLL.DLL</Property>
				<Property Name="Source[2].sourceInclusion" Type="Str">Exclude</Property>
				<Property Name="SourceCount" Type="Int">3</Property>
			</Item>
		</Item>
	</Item>
</Project>
