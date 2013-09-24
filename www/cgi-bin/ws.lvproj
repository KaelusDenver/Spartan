<?xml version='1.0' encoding='UTF-8'?>
<Project Type="Project" LVVersion="11008008">
	<Property Name="CCSymbols" Type="Str"></Property>
	<Property Name="NI.Project.Description" Type="Str"></Property>
	<Item Name="My Computer" Type="My Computer">
		<Property Name="CCSymbols" Type="Str"></Property>
		<Property Name="NI.SortType" Type="Int">3</Property>
		<Property Name="server.app.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.control.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.tcp.acl" Type="Str">0800000008000000</Property>
		<Property Name="server.tcp.enabled" Type="Bool">false</Property>
		<Property Name="server.tcp.port" Type="Int">0</Property>
		<Property Name="server.tcp.serviceName" Type="Str"></Property>
		<Property Name="server.tcp.serviceName.default" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.vi.access" Type="Str"></Property>
		<Property Name="server.vi.callsEnabled" Type="Bool">true</Property>
		<Property Name="server.vi.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="specify.custom.address" Type="Bool">false</Property>
		<Item Name="_ws tree.vi" Type="VI" URL="../_ws tree.vi"/>
		<Item Name="about.vi" Type="VI" URL="../about/about.vi"/>
		<Item Name="client.vi" Type="VI" URL="../client/client.vi"/>
		<Item Name="configure.vi" Type="VI" URL="../configure/configure.vi"/>
		<Item Name="content.vi" Type="VI" URL="../content/content.vi"/>
		<Item Name="debugger.vi" Type="VI" URL="../debugger/debugger.vi"/>
		<Item Name="editscenario.vi" Type="VI" URL="../editscenario/editscenario.vi"/>
		<Item Name="edittest.vi" Type="VI" URL="../edittest/edittest.vi"/>
		<Item Name="eventlog.vi" Type="VI" URL="../eventlog/eventlog.vi"/>
		<Item Name="fields.vi" Type="VI" URL="../fields/fields.vi"/>
		<Item Name="logout.vi" Type="VI" URL="../logout/logout.vi"/>
		<Item Name="mining.vi" Type="VI" URL="../mining/mining.vi"/>
		<Item Name="runscenario.vi" Type="VI" URL="../runscenario/runscenario.vi"/>
		<Item Name="runtest.vi" Type="VI" URL="../runtest/runtest.vi"/>
		<Item Name="stations.vi" Type="VI" URL="../stations/stations.vi"/>
		<Item Name="testing.vi" Type="VI" URL="../testing/testing.vi"/>
		<Item Name="users.vi" Type="VI" URL="../users/users.vi"/>
		<Item Name="Dependencies" Type="Dependencies">
			<Item Name="vi.lib" Type="Folder">
				<Item Name="NI_WebServices.lvlib" Type="Library" URL="/&lt;vilib&gt;/wsapi/NI_WebServices.lvlib"/>
				<Item Name="Error Cluster From Error Code.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Error Cluster From Error Code.vi"/>
				<Item Name="Trim Whitespace.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Trim Whitespace.vi"/>
				<Item Name="whitespace.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/whitespace.ctl"/>
				<Item Name="Keyed Array.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array.ctl"/>
				<Item Name="Create Directory Recursive.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Create Directory Recursive.vi"/>
				<Item Name="Get File System Separator.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/sysinfo.llb/Get File System Separator.vi"/>
				<Item Name="Keyed Array Contents.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Contents.vi"/>
				<Item Name="LVDateTimeRec.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/miscctls.llb/LVDateTimeRec.ctl"/>
				<Item Name="Keyed Array Add.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Add.vi"/>
				<Item Name="Case Matching.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Case Matching.ctl"/>
				<Item Name="Keyed Array Map String.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Map String.vi"/>
				<Item Name="Get Case Matching.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Get Case Matching.vi"/>
				<Item Name="Keyed Array Index.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Index.vi"/>
				<Item Name="Recursive File List.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Recursive File List.vi"/>
				<Item Name="List Directory and LLBs.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/List Directory and LLBs.vi"/>
				<Item Name="NI_LVConfig.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/config.llb/NI_LVConfig.lvlib"/>
				<Item Name="Check if File or Folder Exists.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Check if File or Folder Exists.vi"/>
				<Item Name="NI_FileType.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/lvfile.llb/NI_FileType.lvlib"/>
				<Item Name="FileVersionInformation.ctl" Type="VI" URL="/&lt;vilib&gt;/Platform/fileVersionInfo.llb/FileVersionInformation.ctl"/>
				<Item Name="FileVersionInfo.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/fileVersionInfo.llb/FileVersionInfo.vi"/>
				<Item Name="MoveMemory.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/fileVersionInfo.llb/MoveMemory.vi"/>
				<Item Name="FixedFileInfo_Struct.ctl" Type="VI" URL="/&lt;vilib&gt;/Platform/fileVersionInfo.llb/FixedFileInfo_Struct.ctl"/>
				<Item Name="VerQueryValue.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/fileVersionInfo.llb/VerQueryValue.vi"/>
				<Item Name="BuildErrorSource.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/fileVersionInfo.llb/BuildErrorSource.vi"/>
				<Item Name="GetFileVersionInfo.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/fileVersionInfo.llb/GetFileVersionInfo.vi"/>
				<Item Name="GetFileVersionInfoSize.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/fileVersionInfo.llb/GetFileVersionInfoSize.vi"/>
				<Item Name="Clear Errors.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Clear Errors.vi"/>
				<Item Name="HTTP LVHTTP Global.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http0.llb/HTTP LVHTTP Global.vi"/>
				<Item Name="Space Constant.vi" Type="VI" URL="/&lt;vilib&gt;/dlg_ctls.llb/Space Constant.vi"/>
				<Item Name="CGI Parse URL-Encoded Param String.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Parse URL-Encoded Param String.vi"/>
				<Item Name="CGI Unescape HTTP Param.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Unescape HTTP Param.vi"/>
				<Item Name="CGI Escape HTTP Param.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Escape HTTP Param.vi"/>
				<Item Name="Destroy Rendezvous.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Destroy Rendezvous.vi"/>
				<Item Name="Rendezvous RefNum" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Rendezvous RefNum"/>
				<Item Name="Rendezvous Name &amp; Ref DB.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Rendezvous Name &amp; Ref DB.vi"/>
				<Item Name="Rendezvous Name &amp; Ref DB Action.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Rendezvous Name &amp; Ref DB Action.ctl"/>
				<Item Name="Not A Rendezvous.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Not A Rendezvous.vi"/>
				<Item Name="RendezvousDataCluster.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/RendezvousDataCluster.ctl"/>
				<Item Name="Destroy A Rendezvous.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Destroy A Rendezvous.vi"/>
				<Item Name="RemoveNamedRendezvousPrefix.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/RemoveNamedRendezvousPrefix.vi"/>
				<Item Name="GetNamedRendezvousPrefix.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/GetNamedRendezvousPrefix.vi"/>
				<Item Name="Wait at Rendezvous.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Wait at Rendezvous.vi"/>
				<Item Name="Release Waiting Procs.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Release Waiting Procs.vi"/>
				<Item Name="Create Rendezvous.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Create Rendezvous.vi"/>
				<Item Name="Create New Rendezvous.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/Create New Rendezvous.vi"/>
				<Item Name="AddNamedRendezvousPrefix.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/rendezvs.llb/AddNamedRendezvousPrefix.vi"/>
				<Item Name="Get Case Insensitive Search Pattern.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Get Case Insensitive Search Pattern.vi"/>
				<Item Name="Replace Substring.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Replace Substring.vi"/>
				<Item Name="Get Literal Search Pattern.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Get Literal Search Pattern.vi"/>
				<Item Name="Get Wildcard Search Pattern.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Get Wildcard Search Pattern.vi"/>
				<Item Name="HTML+ Keyed Array To Table.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html1.llb/HTML+ Keyed Array To Table.vi"/>
				<Item Name="HTML Text Alignment.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html0.llb/HTML Text Alignment.ctl"/>
				<Item Name="HTML+ String Array To Table.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html1.llb/HTML+ String Array To Table.vi"/>
				<Item Name="HTML Table.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html1.llb/HTML Table.vi"/>
				<Item Name="HTML Numeric Tag Attributes.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html0.llb/HTML Numeric Tag Attributes.vi"/>
				<Item Name="HTML Text Tag Attribute.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html0.llb/HTML Text Tag Attribute.vi"/>
				<Item Name="HTML Filter Special Characters.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html0.llb/HTML Filter Special Characters.vi"/>
				<Item Name="HTML Table Row.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html1.llb/HTML Table Row.vi"/>
				<Item Name="HTML Vertical Cell Alignment.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html1.llb/HTML Vertical Cell Alignment.ctl"/>
				<Item Name="HTML Table Cell.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html1.llb/HTML Table Cell.vi"/>
				<Item Name="HTML Text Style.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/html0.llb/HTML Text Style.vi"/>
				<Item Name="TDMSAddBlankElem1d.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/tdmsutil.llb/TDMSAddBlankElem1d.vi"/>
				<Item Name="TDMSAddBlankElem2d.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/tdmsutil.llb/TDMSAddBlankElem2d.vi"/>
				<Item Name="ClearError.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/tdmsutil.llb/ClearError.vi"/>
				<Item Name="Easy Parse XML__JKI EasyXML.vi" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/Easy Parse XML__JKI EasyXML.vi"/>
				<Item Name="Keyed Array Remove.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Remove.vi"/>
				<Item Name="Easy Generate XML__JKI EasyXML.vi" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/Easy Generate XML__JKI EasyXML.vi"/>
				<Item Name="CGI Build URL-Encoded Param String.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Build URL-Encoded Param String.vi"/>
				<Item Name="CGI Path To Unix.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Path To Unix.vi"/>
				<Item Name="Close Zip File.vi" Type="VI" URL="/&lt;vilib&gt;/zip/Close Zip File.vi"/>
				<Item Name="New Zip File.vi" Type="VI" URL="/&lt;vilib&gt;/zip/New Zip File.vi"/>
				<Item Name="Path To Command Line String.vi" Type="VI" URL="/&lt;vilib&gt;/AdvancedString/Path To Command Line String.vi"/>
				<Item Name="PathToUNIXPathString.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/CFURL.llb/PathToUNIXPathString.vi"/>
				<Item Name="Add File to Zip.vi" Type="VI" URL="/&lt;vilib&gt;/zip/Add File to Zip.vi"/>
				<Item Name="Relative Path To Platform Independent String.vi" Type="VI" URL="/&lt;vilib&gt;/AdvancedString/Relative Path To Platform Independent String.vi"/>
				<Item Name="CGI Translate Virtual Path.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Translate Virtual Path.vi"/>
				<Item Name="CGI Unix To Path.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Unix To Path.vi"/>
				<Item Name="HTTP Translate Virtual Path.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http1.llb/HTTP Translate Virtual Path.vi"/>
				<Item Name="CGI Reply.ctl" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Reply.ctl"/>
				<Item Name="HTTP Map Alias.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http1.llb/HTTP Map Alias.vi"/>
				<Item Name="Keyed Array Keys.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/keyedarr.llb/Keyed Array Keys.vi"/>
				<Item Name="Match Literal Prefix.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/utils/strutil.llb/Match Literal Prefix.vi"/>
				<Item Name="HTTP SRM.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/config.llb/HTTP SRM.vi"/>
				<Item Name="HTTP Redirect Request.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/http1.llb/HTTP Redirect Request.vi"/>
				<Item Name="CGI Build Unix Path.vi" Type="VI" URL="/&lt;vilib&gt;/addons/internet/http/cgi.llb/CGI Build Unix Path.vi"/>
				<Item Name="System Exec.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/system.llb/System Exec.vi"/>
				<Item Name="Generate Temporary File Path.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Generate Temporary File Path.vi"/>
				<Item Name="Search and Replace Pattern.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Search and Replace Pattern.vi"/>
				<Item Name="LV70DateRecToTimeStamp.vi" Type="VI" URL="/&lt;vilib&gt;/_oldvers/_oldvers.llb/LV70DateRecToTimeStamp.vi"/>
				<Item Name="General Error Handler.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/General Error Handler.vi"/>
				<Item Name="DialogType.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/DialogType.ctl"/>
				<Item Name="DialogTypeEnum.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/DialogTypeEnum.ctl"/>
				<Item Name="General Error Handler CORE.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/General Error Handler CORE.vi"/>
				<Item Name="Check Special Tags.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Check Special Tags.vi"/>
				<Item Name="TagReturnType.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/TagReturnType.ctl"/>
				<Item Name="Set String Value.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Set String Value.vi"/>
				<Item Name="GetRTHostConnectedProp.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/GetRTHostConnectedProp.vi"/>
				<Item Name="Error Code Database.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Error Code Database.vi"/>
				<Item Name="Format Message String.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Format Message String.vi"/>
				<Item Name="Find Tag.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Find Tag.vi"/>
				<Item Name="Set Bold Text.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Set Bold Text.vi"/>
				<Item Name="Details Display Dialog.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Details Display Dialog.vi"/>
				<Item Name="ErrWarn.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/ErrWarn.ctl"/>
				<Item Name="eventvkey.ctl" Type="VI" URL="/&lt;vilib&gt;/event_ctls.llb/eventvkey.ctl"/>
				<Item Name="Not Found Dialog.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Not Found Dialog.vi"/>
				<Item Name="Three Button Dialog.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Three Button Dialog.vi"/>
				<Item Name="Three Button Dialog CORE.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Three Button Dialog CORE.vi"/>
				<Item Name="Longest Line Length in Pixels.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Longest Line Length in Pixels.vi"/>
				<Item Name="Convert property node font to graphics font.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Convert property node font to graphics font.vi"/>
				<Item Name="Get Text Rect.vi" Type="VI" URL="/&lt;vilib&gt;/picture/picture.llb/Get Text Rect.vi"/>
				<Item Name="Get String Text Bounds.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Get String Text Bounds.vi"/>
				<Item Name="LVBoundsTypeDef.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/miscctls.llb/LVBoundsTypeDef.ctl"/>
				<Item Name="BuildHelpPath.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/BuildHelpPath.vi"/>
				<Item Name="GetHelpDir.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/GetHelpDir.vi"/>
				<Item Name="Has LLB Extension.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Has LLB Extension.vi"/>
				<Item Name="Get VI Library File Info.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Get VI Library File Info.vi"/>
				<Item Name="Librarian File Info Out.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Librarian File Info Out.ctl"/>
				<Item Name="Librarian.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Librarian.vi"/>
				<Item Name="Librarian File Info In.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Librarian File Info In.ctl"/>
				<Item Name="Librarian File List.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Librarian File List.ctl"/>
				<Item Name="Get Semaphore Status.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Get Semaphore Status.vi"/>
				<Item Name="Semaphore RefNum" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Semaphore RefNum"/>
				<Item Name="Semaphore Refnum Core.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Semaphore Refnum Core.ctl"/>
				<Item Name="RemoveNamedSemaphorePrefix.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/RemoveNamedSemaphorePrefix.vi"/>
				<Item Name="GetNamedSemaphorePrefix.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/GetNamedSemaphorePrefix.vi"/>
				<Item Name="Release Semaphore.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Release Semaphore.vi"/>
				<Item Name="Not A Semaphore.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Not A Semaphore.vi"/>
				<Item Name="Obtain Semaphore Reference.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Obtain Semaphore Reference.vi"/>
				<Item Name="Validate Semaphore Size.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Validate Semaphore Size.vi"/>
				<Item Name="AddNamedSemaphorePrefix.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/AddNamedSemaphorePrefix.vi"/>
				<Item Name="Release Semaphore Reference.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Release Semaphore Reference.vi"/>
				<Item Name="Acquire Semaphore.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/semaphor.llb/Acquire Semaphore.vi"/>
				<Item Name="System Directory Type.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/sysdir.llb/System Directory Type.ctl"/>
				<Item Name="Get System Directory.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/sysdir.llb/Get System Directory.vi"/>
				<Item Name="NI_PackedLibraryUtility.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/LVLibp/NI_PackedLibraryUtility.lvlib"/>
				<Item Name="8.6CompatibleGlobalVar.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/config.llb/8.6CompatibleGlobalVar.vi"/>
				<Item Name="4C2926E9C2FB4EEA9A336C33488DFA7A" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/4C2926E9C2FB4EEA9A336C33488DFA7A"/>
				<Item Name="57F3CEFCA5BD1105BC35FCCD00AF20B5" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/57F3CEFCA5BD1105BC35FCCD00AF20B5"/>
				<Item Name="6980716084811AF6509517054EBC4AAF" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/6980716084811AF6509517054EBC4AAF"/>
				<Item Name="9E8D9C4508EB4B8A5D3721DFDDBA26C5" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/9E8D9C4508EB4B8A5D3721DFDDBA26C5"/>
				<Item Name="B2715A80F7399F29959051992514396C" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/B2715A80F7399F29959051992514396C"/>
				<Item Name="EFEC164E64719FDBF40443F43030DF85" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/EFEC164E64719FDBF40443F43030DF85"/>
				<Item Name="A888B2C93BAC937D892E129E45AE4208" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/A888B2C93BAC937D892E129E45AE4208"/>
				<Item Name="1BF43EE904A879B95FAFA36300B64837" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/1BF43EE904A879B95FAFA36300B64837"/>
				<Item Name="7656E2DC7C72A4EA58808423568EB6CB" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/7656E2DC7C72A4EA58808423568EB6CB"/>
				<Item Name="9E461C6FFAF1D1795C42B825C27D1EAE" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/9E461C6FFAF1D1795C42B825C27D1EAE"/>
				<Item Name="93D0C833699F0A4BFB2F30B016EDDBAA" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/93D0C833699F0A4BFB2F30B016EDDBAA"/>
				<Item Name="EBA5B1C774E1142C66D5DC199E0C04E1" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/EBA5B1C774E1142C66D5DC199E0C04E1"/>
				<Item Name="A00EC7C91F65EBF3D35B6C7FE7A97841" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/A00EC7C91F65EBF3D35B6C7FE7A97841"/>
				<Item Name="46BE21DCC69400274383458059058DE8" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/46BE21DCC69400274383458059058DE8"/>
				<Item Name="25E01DE02E7F5FC3794248A0D1C11D7B" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/25E01DE02E7F5FC3794248A0D1C11D7B"/>
				<Item Name="2131612FC40E5B5809FB16AE79DDFC2E" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/2131612FC40E5B5809FB16AE79DDFC2E"/>
				<Item Name="1584A7416837FD8B7D45F56B40B3E65A" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/1584A7416837FD8B7D45F56B40B3E65A"/>
				<Item Name="0963F4E4B365AD43A95D0DE18626592A" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/0963F4E4B365AD43A95D0DE18626592A"/>
				<Item Name="6ACE88EC5718801E96594D8676F21D3C" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/6ACE88EC5718801E96594D8676F21D3C"/>
				<Item Name="738F382F2802D2EC6D3939E0CD2F62DB" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/738F382F2802D2EC6D3939E0CD2F62DB"/>
				<Item Name="54D9315EA516221126E3272CFED2641D" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/54D9315EA516221126E3272CFED2641D"/>
				<Item Name="A8A9DEFA75C1D73B5791235C182242E8" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/A8A9DEFA75C1D73B5791235C182242E8"/>
				<Item Name="1404D83C85569190AE383CB8FDFE56ED" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/1404D83C85569190AE383CB8FDFE56ED"/>
				<Item Name="157AD03684133F2FD5C47CE8D9215C61" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/157AD03684133F2FD5C47CE8D9215C61"/>
				<Item Name="B1F2DBEE6B129DB5D3107E416C05FCBD" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/B1F2DBEE6B129DB5D3107E416C05FCBD"/>
				<Item Name="7DB0F1E8B635AB2655A136CA0B977267" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/7DB0F1E8B635AB2655A136CA0B977267"/>
				<Item Name="797920DD32805E86EA3B84CAB1389487" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/797920DD32805E86EA3B84CAB1389487"/>
				<Item Name="2663AFF63C552E9A3868242D296C70DC" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/2663AFF63C552E9A3868242D296C70DC"/>
				<Item Name="11AEED5AAEB287D29EA4EE70BAA839BB" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/11AEED5AAEB287D29EA4EE70BAA839BB"/>
				<Item Name="6CA2B2B72CD61AF718D16667906B9FE5" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/6CA2B2B72CD61AF718D16667906B9FE5"/>
				<Item Name="2CB91C84108BA40FC066BEB4DD77B26D" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/2CB91C84108BA40FC066BEB4DD77B26D"/>
				<Item Name="34F14AAD4DA0E1E0932259A6D2FAE322" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/34F14AAD4DA0E1E0932259A6D2FAE322"/>
				<Item Name="7481C92961462B101BB34533650D52B3" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/7481C92961462B101BB34533650D52B3"/>
				<Item Name="D443311147EC877DFCD3AF56854E74AF" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/D443311147EC877DFCD3AF56854E74AF"/>
				<Item Name="7D49C64FD9E2D1EA103D09C03FC111FE" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/7D49C64FD9E2D1EA103D09C03FC111FE"/>
				<Item Name="EABBEE1B45D23BED4099967AB4744AF0" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/EABBEE1B45D23BED4099967AB4744AF0"/>
				<Item Name="5B0AFD334F84140658FCA66D29A61268" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/5B0AFD334F84140658FCA66D29A61268"/>
				<Item Name="3E480E53258A5874FD5477026A58978C" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/3E480E53258A5874FD5477026A58978C"/>
				<Item Name="AD3A56D4CED5CDCC9EFFDAEEED6AE79D" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/AD3A56D4CED5CDCC9EFFDAEEED6AE79D"/>
				<Item Name="CA5AD304473599AA3008E00A269B1A76" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/CA5AD304473599AA3008E00A269B1A76"/>
				<Item Name="805DB52BC32751A9D4685221DC66B40A" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/805DB52BC32751A9D4685221DC66B40A"/>
				<Item Name="D343F54611C90C26C00EC2E95E9B8AF7" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/D343F54611C90C26C00EC2E95E9B8AF7"/>
				<Item Name="789534DDC578C2BD8880526E09F0CE89" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/789534DDC578C2BD8880526E09F0CE89"/>
				<Item Name="2DD2797B5BF7D6DAF7F268D1DF365FF1" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/2DD2797B5BF7D6DAF7F268D1DF365FF1"/>
				<Item Name="5B133D9972E999808048D5802BA99668" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/5B133D9972E999808048D5802BA99668"/>
				<Item Name="CACAD0E1460E171C454531EA120F60FA" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/CACAD0E1460E171C454531EA120F60FA"/>
				<Item Name="165D3755C77147DC43E6464BCB6EBECE" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/165D3755C77147DC43E6464BCB6EBECE"/>
				<Item Name="784962B9C8EC9E9D4FD7BE5124C76CB5" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/784962B9C8EC9E9D4FD7BE5124C76CB5"/>
				<Item Name="9AAEBC85B11F91EF712B0BC2152C19FF" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/9AAEBC85B11F91EF712B0BC2152C19FF"/>
				<Item Name="2BFB9F7C2DEF21DE255FEFE3EEC45613" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/2BFB9F7C2DEF21DE255FEFE3EEC45613"/>
				<Item Name="66C3F77FF012EA7E32BFF2D8FD223D69" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/66C3F77FF012EA7E32BFF2D8FD223D69"/>
				<Item Name="15369F7224BF9B1810CB6703178EFABB" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/15369F7224BF9B1810CB6703178EFABB"/>
				<Item Name="61C825BF9CB4CE08A69C8E7D1A948FEC" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/61C825BF9CB4CE08A69C8E7D1A948FEC"/>
				<Item Name="E3107912D9E55943948236499FCA76E6" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/E3107912D9E55943948236499FCA76E6"/>
				<Item Name="892CDF8219F1A6DAB263CBD1FE0BDB01" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/892CDF8219F1A6DAB263CBD1FE0BDB01"/>
				<Item Name="D908BF259F86ED052AA80C9D1A688BA2" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/D908BF259F86ED052AA80C9D1A688BA2"/>
				<Item Name="2B1ABC0BFCA4BBA2D10BCB7DE61B51A4" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/2B1ABC0BFCA4BBA2D10BCB7DE61B51A4"/>
				<Item Name="9A268916A29F38F1AE6E7FC8B9F7BC7A" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/9A268916A29F38F1AE6E7FC8B9F7BC7A"/>
				<Item Name="C1D4EAA310CA3F08C2ABB8F21B452516" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/C1D4EAA310CA3F08C2ABB8F21B452516"/>
				<Item Name="9F0A24507FD948F797272BF2503CB096" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/9F0A24507FD948F797272BF2503CB096"/>
				<Item Name="2A8A4F7EA74FE76F081FB281CD46F3E9.vi" Type="VI" URL="/&lt;vilib&gt;/addons/_JKI Toolkits/EasyXML/JKI_EasyXML.llb/2A8A4F7EA74FE76F081FB281CD46F3E9.vi"/>
			</Item>
			<Item Name="user.lib" Type="Folder">
				<Item Name="File Exists__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/File Exists__ogtk.vi"/>
				<Item Name="Strip Path Extension__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension__ogtk.vi"/>
				<Item Name="Strip Path Extension - Path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension - Path__ogtk.vi"/>
				<Item Name="Strip Path Extension - String__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension - String__ogtk.vi"/>
				<Item Name="Strip Path Extension - 1D Array of Paths__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension - 1D Array of Paths__ogtk.vi"/>
				<Item Name="Strip Path Extension - 1D Array of Strings__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Strip Path Extension - 1D Array of Strings__ogtk.vi"/>
				<Item Name="File Info__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/File Info__ogtk.vi"/>
				<Item Name="File Info Record__ogtk.ctl" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/File Info Record__ogtk.ctl"/>
				<Item Name="Type Descriptor Enumeration__ogtk.ctl" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Type Descriptor Enumeration__ogtk.ctl"/>
				<Item Name="Get TDEnum from Data__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get TDEnum from Data__ogtk.vi"/>
				<Item Name="Get Header from TD__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Header from TD__ogtk.vi"/>
				<Item Name="Type Descriptor__ogtk.ctl" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Type Descriptor__ogtk.ctl"/>
				<Item Name="Type Descriptor Header__ogtk.ctl" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Type Descriptor Header__ogtk.ctl"/>
				<Item Name="Array Size(s)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Array Size(s)__ogtk.vi"/>
				<Item Name="Variant to Header Info__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Variant to Header Info__ogtk.vi"/>
				<Item Name="Build Error Cluster__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/error/error.llb/Build Error Cluster__ogtk.vi"/>
				<Item Name="Get Data Name__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Data Name__ogtk.vi"/>
				<Item Name="Get Data Name from TD__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Data Name from TD__ogtk.vi"/>
				<Item Name="Get PString__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get PString__ogtk.vi"/>
				<Item Name="Get Last PString__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Last PString__ogtk.vi"/>
				<Item Name="Get Array Element Default Data__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Array Element Default Data__ogtk.vi"/>
				<Item Name="Get Default Data from TD__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Default Data from TD__ogtk.vi"/>
				<Item Name="Array of VData to VCluster__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Array of VData to VCluster__ogtk.vi"/>
				<Item Name="Set Data Name__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Set Data Name__ogtk.vi"/>
				<Item Name="Split Cluster TD__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Split Cluster TD__ogtk.vi"/>
				<Item Name="Get Array Element TD__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Array Element TD__ogtk.vi"/>
				<Item Name="Get Element TD from Array TD__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Element TD from Array TD__ogtk.vi"/>
				<Item Name="Empty Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty Array__ogtk.vi"/>
				<Item Name="Empty 1D Array (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (Boolean)__ogtk.vi"/>
				<Item Name="Empty 1D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (CDB)__ogtk.vi"/>
				<Item Name="Empty 1D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (CXT)__ogtk.vi"/>
				<Item Name="Empty 1D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (CSG)__ogtk.vi"/>
				<Item Name="Empty 1D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (DBL)__ogtk.vi"/>
				<Item Name="Empty 1D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (EXT)__ogtk.vi"/>
				<Item Name="Empty 1D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (I8)__ogtk.vi"/>
				<Item Name="Empty 1D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (I16)__ogtk.vi"/>
				<Item Name="Empty 1D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (I32)__ogtk.vi"/>
				<Item Name="Empty 1D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (Path)__ogtk.vi"/>
				<Item Name="Empty 1D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (SGL)__ogtk.vi"/>
				<Item Name="Empty 1D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (String)__ogtk.vi"/>
				<Item Name="Empty 1D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (U8)__ogtk.vi"/>
				<Item Name="Empty 1D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (U16)__ogtk.vi"/>
				<Item Name="Empty 1D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (U32)__ogtk.vi"/>
				<Item Name="Empty 1D Array (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (Variant)__ogtk.vi"/>
				<Item Name="Empty 2D Array (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (Boolean)__ogtk.vi"/>
				<Item Name="Empty 2D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (CDB)__ogtk.vi"/>
				<Item Name="Empty 2D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (CXT)__ogtk.vi"/>
				<Item Name="Empty 2D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (CSG)__ogtk.vi"/>
				<Item Name="Empty 2D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (DBL)__ogtk.vi"/>
				<Item Name="Empty 2D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (EXT)__ogtk.vi"/>
				<Item Name="Empty 2D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (I8)__ogtk.vi"/>
				<Item Name="Empty 2D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (I16)__ogtk.vi"/>
				<Item Name="Empty 2D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (I32)__ogtk.vi"/>
				<Item Name="Empty 2D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (Path)__ogtk.vi"/>
				<Item Name="Empty 2D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (SGL)__ogtk.vi"/>
				<Item Name="Empty 2D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (String)__ogtk.vi"/>
				<Item Name="Empty 2D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (U8)__ogtk.vi"/>
				<Item Name="Empty 2D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (U16)__ogtk.vi"/>
				<Item Name="Empty 2D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (U32)__ogtk.vi"/>
				<Item Name="Empty 2D Array (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (Variant)__ogtk.vi"/>
				<Item Name="Empty Array (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty Array (Variant)__ogtk.vi"/>
				<Item Name="Empty 1D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (I64)__ogtk.vi"/>
				<Item Name="Empty 1D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (U64)__ogtk.vi"/>
				<Item Name="Empty 2D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (I64)__ogtk.vi"/>
				<Item Name="Empty 2D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (U64)__ogtk.vi"/>
				<Item Name="Empty 1D Array (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 1D Array (LVObject)__ogtk.vi"/>
				<Item Name="Empty 2D Array (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Empty 2D Array (LVObject)__ogtk.vi"/>
				<Item Name="Trim Whitespace__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/string/string.llb/Trim Whitespace__ogtk.vi"/>
				<Item Name="Trim Whitespace (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/string/string.llb/Trim Whitespace (String)__ogtk.vi"/>
				<Item Name="Trim Whitespace (String Array)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/string/string.llb/Trim Whitespace (String Array)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (Variant)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (String)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (DBL)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (Path)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (I32)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (U32)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (U16)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (U8)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (I16)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (I8)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (SGL)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (EXT)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (CSG)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (CDB)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (CXT)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (GEN-REF)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (GEN-REF)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (GObj-REF)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (GObj-REF)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (VI-REF)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (VI-REF)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (CTL-REF)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (CTL-REF)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (Bool)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (Bool)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (I64)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (U64)__ogtk.vi"/>
				<Item Name="Conditional Auto-Indexing Tunnel (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Conditional Auto-Indexing Tunnel (LVObject)__ogtk.vi"/>
				<Item Name="Set Enum String Value__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Set Enum String Value__ogtk.vi"/>
				<Item Name="Get Strings from Enum__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Strings from Enum__ogtk.vi"/>
				<Item Name="Get Strings from Enum TD__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Strings from Enum TD__ogtk.vi"/>
				<Item Name="Array of VData to VArray__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Array of VData to VArray__ogtk.vi"/>
				<Item Name="Search Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search Array__ogtk.vi"/>
				<Item Name="Search 1D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (SGL)__ogtk.vi"/>
				<Item Name="Search 1D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (DBL)__ogtk.vi"/>
				<Item Name="Search 1D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (EXT)__ogtk.vi"/>
				<Item Name="Search 1D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (CSG)__ogtk.vi"/>
				<Item Name="Search 1D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (CDB)__ogtk.vi"/>
				<Item Name="Search 1D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (CXT)__ogtk.vi"/>
				<Item Name="Search 1D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (I8)__ogtk.vi"/>
				<Item Name="Search 1D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (I16)__ogtk.vi"/>
				<Item Name="Search 1D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (I32)__ogtk.vi"/>
				<Item Name="Search 1D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (U8)__ogtk.vi"/>
				<Item Name="Search 1D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (U16)__ogtk.vi"/>
				<Item Name="Search 1D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (U32)__ogtk.vi"/>
				<Item Name="Search 1D Array (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (Boolean)__ogtk.vi"/>
				<Item Name="Search 1D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (String)__ogtk.vi"/>
				<Item Name="Search 1D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (Path)__ogtk.vi"/>
				<Item Name="Search 1D Array (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (Variant)__ogtk.vi"/>
				<Item Name="Search 1D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (U64)__ogtk.vi"/>
				<Item Name="Search 1D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (I64)__ogtk.vi"/>
				<Item Name="Search 1D Array (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Search 1D Array (LVObject)__ogtk.vi"/>
				<Item Name="Cluster to Array of VData__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Cluster to Array of VData__ogtk.vi"/>
				<Item Name="Parse String with TDs__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Parse String with TDs__ogtk.vi"/>
				<Item Name="Get Cluster Element Names__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Cluster Element Names__ogtk.vi"/>
				<Item Name="Get Cluster Elements TDs__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Cluster Elements TDs__ogtk.vi"/>
				<Item Name="1D Array to String__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/string/string.llb/1D Array to String__ogtk.vi"/>
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
				<Item Name="Sort Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort Array__ogtk.vi"/>
				<Item Name="Sort 1D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (CDB)__ogtk.vi"/>
				<Item Name="Reorder 1D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array (CDB)__ogtk.vi"/>
				<Item Name="Sort 1D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (CXT)__ogtk.vi"/>
				<Item Name="Reorder 1D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array (CXT)__ogtk.vi"/>
				<Item Name="Sort 1D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (CSG)__ogtk.vi"/>
				<Item Name="Reorder 1D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array (CSG)__ogtk.vi"/>
				<Item Name="Sort 1D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (DBL)__ogtk.vi"/>
				<Item Name="Sort 1D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (EXT)__ogtk.vi"/>
				<Item Name="Sort 1D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (I16)__ogtk.vi"/>
				<Item Name="Sort 1D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (I32)__ogtk.vi"/>
				<Item Name="Sort 1D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (I8)__ogtk.vi"/>
				<Item Name="Sort 1D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (SGL)__ogtk.vi"/>
				<Item Name="Sort 1D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (U16)__ogtk.vi"/>
				<Item Name="Sort 1D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (U32)__ogtk.vi"/>
				<Item Name="Sort 1D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (U8)__ogtk.vi"/>
				<Item Name="Sort 2D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (CDB)__ogtk.vi"/>
				<Item Name="Sort 2D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (CXT)__ogtk.vi"/>
				<Item Name="Sort 2D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (CSG)__ogtk.vi"/>
				<Item Name="Sort 2D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (DBL)__ogtk.vi"/>
				<Item Name="Sort 2D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (EXT)__ogtk.vi"/>
				<Item Name="Sort 2D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (I16)__ogtk.vi"/>
				<Item Name="Sort 2D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (I32)__ogtk.vi"/>
				<Item Name="Sort 2D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (I8)__ogtk.vi"/>
				<Item Name="Sort 2D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (SGL)__ogtk.vi"/>
				<Item Name="Sort 2D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (U16)__ogtk.vi"/>
				<Item Name="Sort 2D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (U32)__ogtk.vi"/>
				<Item Name="Sort 2D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (U8)__ogtk.vi"/>
				<Item Name="Sort 1D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (Path)__ogtk.vi"/>
				<Item Name="Sort 1D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (String)__ogtk.vi"/>
				<Item Name="Sort 2D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (Path)__ogtk.vi"/>
				<Item Name="Sort 2D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (String)__ogtk.vi"/>
				<Item Name="Sort 1D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (I64)__ogtk.vi"/>
				<Item Name="Sort 1D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 1D Array (U64)__ogtk.vi"/>
				<Item Name="Sort 2D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (I64)__ogtk.vi"/>
				<Item Name="Sort 2D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Sort 2D Array (U64)__ogtk.vi"/>
				<Item Name="Filter 1D Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array__ogtk.vi"/>
				<Item Name="Filter 1D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (String)__ogtk.vi"/>
				<Item Name="Delete Elements from Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from Array__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (Boolean)__ogtk.vi"/>
				<Item Name="Reorder Array2__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder Array2__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (CDB)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (CXT)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (CSG)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (DBL)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (EXT)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (I16)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (I32)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (I8)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (SGL)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (U16)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (U32)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (U8)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (Boolean)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (String)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (Path)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (Variant)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (Boolean)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (CDB)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (CSG)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (CXT)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (DBL)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (EXT)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (I8)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (I16)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (I32)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (Path)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (SGL)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (String)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (U8)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (U16)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (U32)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (Variant)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (I64)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (U64)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (I64)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (U64)__ogtk.vi"/>
				<Item Name="Reorder 1D Array2 (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 1D Array2 (LVObject)__ogtk.vi"/>
				<Item Name="Reorder 2D Array2 (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Reorder 2D Array2 (LVObject)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (CDB)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (CSG)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (DBL)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (CXT)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (EXT)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (I8)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (I16)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (I32)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (Path)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (SGL)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (String)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (U8)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (U16)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (U32)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (Variant)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (Boolean)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (CDB)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (CSG)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (CXT)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (DBL)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (EXT)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (I8)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (I16)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (I32)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (Path)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (SGL)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (String)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (U8)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (U16)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (U32)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (Variant)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (I64)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (U64)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (I64)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (U64)__ogtk.vi"/>
				<Item Name="Delete Elements from 1D Array (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 1D Array (LVObject)__ogtk.vi"/>
				<Item Name="Delete Elements from 2D Array (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Delete Elements from 2D Array (LVObject)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (Path)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (CDB)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (CSG)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (CXT)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (DBL)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (EXT)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (I16)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (I32)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (I8)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (SGL)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (String)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (U16)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (U32)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (U8)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (Variant)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (Boolean)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (I64)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (U64)__ogtk.vi"/>
				<Item Name="Remove Duplicates from 1D Array (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Remove Duplicates from 1D Array (LVObject)__ogtk.vi"/>
				<Item Name="Filter 1D Array (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (U8)__ogtk.vi"/>
				<Item Name="Filter 1D Array (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (Path)__ogtk.vi"/>
				<Item Name="Filter 1D Array (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (U32)__ogtk.vi"/>
				<Item Name="Filter 1D Array (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (U16)__ogtk.vi"/>
				<Item Name="Filter 1D Array (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (I16)__ogtk.vi"/>
				<Item Name="Filter 1D Array (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (I32)__ogtk.vi"/>
				<Item Name="Filter 1D Array (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (I8)__ogtk.vi"/>
				<Item Name="Filter 1D Array (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (Variant)__ogtk.vi"/>
				<Item Name="Filter 1D Array (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (Boolean)__ogtk.vi"/>
				<Item Name="Filter 1D Array (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (CXT)__ogtk.vi"/>
				<Item Name="Filter 1D Array (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (CDB)__ogtk.vi"/>
				<Item Name="Filter 1D Array (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (CSG)__ogtk.vi"/>
				<Item Name="Filter 1D Array (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (EXT)__ogtk.vi"/>
				<Item Name="Filter 1D Array (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (DBL)__ogtk.vi"/>
				<Item Name="Filter 1D Array (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (SGL)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (Boolean)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (Boolean)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (CDB)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (CDB)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (CSG)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (CSG)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (CXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (CXT)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (DBL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (DBL)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (EXT)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (EXT)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (I8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (I8)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (I16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (I16)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (I32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (I32)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (Path)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (SGL)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (SGL)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (String)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (U8)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (U8)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (U16)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (U16)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (U32)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (U32)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (Variant)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (Variant)__ogtk.vi"/>
				<Item Name="Filter 1D Array (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (I64)__ogtk.vi"/>
				<Item Name="Filter 1D Array (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (U64)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (I64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (I64)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (U64)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (U64)__ogtk.vi"/>
				<Item Name="Filter 1D Array (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array (LVObject)__ogtk.vi"/>
				<Item Name="Filter 1D Array with Scalar (LVObject)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/array/array.llb/Filter 1D Array with Scalar (LVObject)__ogtk.vi"/>
				<Item Name="Strip Units__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Strip Units__ogtk.vi"/>
				<Item Name="Get Array Element TDEnum__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Get Array Element TDEnum__ogtk.vi"/>
				<Item Name="Array to Array of VData__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Array to Array of VData__ogtk.vi"/>
				<Item Name="Reshape Array to 1D VArray__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/lvdata/lvdata.llb/Reshape Array to 1D VArray__ogtk.vi"/>
				<Item Name="Current VIs Reference__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/appcontrol/appcontrol.llb/Current VIs Reference__ogtk.vi"/>
				<Item Name="Current VIs Parent Directory__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Current VIs Parent Directory__ogtk.vi"/>
				<Item Name="Current VIs Parents Ref__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/appcontrol/appcontrol.llb/Current VIs Parents Ref__ogtk.vi"/>
				<Item Name="Valid Path__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Valid Path__ogtk.vi"/>
				<Item Name="Valid Path - Traditional__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Valid Path - Traditional__ogtk.vi"/>
				<Item Name="Valid Path - Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Valid Path - Array__ogtk.vi"/>
				<Item Name="Convert File Extension__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Convert File Extension__ogtk.vi"/>
				<Item Name="Convert File Extension (Path)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Convert File Extension (Path)__ogtk.vi"/>
				<Item Name="Convert File Extension (String)__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/Convert File Extension (String)__ogtk.vi"/>
				<Item Name="List Directory Recursive__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/List Directory Recursive__ogtk.vi"/>
				<Item Name="List Directory__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/List Directory__ogtk.vi"/>
				<Item Name="File Exists - Scalar__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/File Exists - Scalar__ogtk.vi"/>
				<Item Name="File Exists - Array__ogtk.vi" Type="VI" URL="/&lt;userlib&gt;/_OpenG.lib/file/file.llb/File Exists - Array__ogtk.vi"/>
			</Item>
			<Item Name="ws_runtime.dll" Type="Document" URL="ws_runtime.dll">
				<Property Name="NI.PreserveRelativePath" Type="Bool">true</Property>
			</Item>
			<Item Name="ws Spartan Version.vi" Type="VI" URL="../_cgi-lib/ws Spartan Version.vi"/>
			<Item Name="OGAB Version.ctl" Type="VI" URL="../../../../SI.LIB/OGAB Version.ctl"/>
			<Item Name="User Record.ctl" Type="VI" URL="../../../server/database/Users/User Record.ctl"/>
			<Item Name="ws_www template.vi" Type="VI" URL="../_cgi-lib/ws_www template.vi"/>
			<Item Name="Connection Refnum.ctl" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Controls/Connection Refnum.ctl"/>
			<Item Name="ws DB Close.vi" Type="VI" URL="../_cgi-lib/ws DB Close.vi"/>
			<Item Name="ws_www template read file.vi" Type="VI" URL="../_cgi-lib/ws_www template read file.vi"/>
			<Item Name="www template error.vi" Type="VI" URL="../_cgi-lib/www template error.vi"/>
			<Item Name="Spartan Event Log.vi" Type="VI" URL="../../../server/errorlog/Spartan Event Log.vi"/>
			<Item Name="errorlog types.ctl" Type="VI" URL="../../../server/errorlog/errorlog types.ctl"/>
			<Item Name="append log entry.vi" Type="VI" URL="../../../server/errorlog/append log entry.vi"/>
			<Item Name="format log entry.vi" Type="VI" URL="../../../server/errorlog/format log entry.vi"/>
			<Item Name="Application Folder.vi" Type="VI" URL="../../../server/server lib/Application Folder.vi"/>
			<Item Name="append log entry - low level.vi" Type="VI" URL="../../../server/errorlog/append log entry - low level.vi"/>
			<Item Name="archive log.vi" Type="VI" URL="../../../server/errorlog/archive log.vi"/>
			<Item Name="calculate log time range.vi" Type="VI" URL="../../../server/errorlog/calculate log time range.vi"/>
			<Item Name="www template read file core.vi" Type="VI" URL="../_cgi-lib/www template read file core.vi"/>
			<Item Name="Boolean to Boolean String.vi" Type="VI" URL="../../../../SI.LIB/Boolean to Boolean String.vi"/>
			<Item Name="escape characters for javascript.vi" Type="VI" URL="../_cgi-lib/escape characters for javascript.vi"/>
			<Item Name="www template engine.vi" Type="VI" URL="../_cgi-lib/www template engine.vi"/>
			<Item Name="ws_www template global keys.vi" Type="VI" URL="../_cgi-lib/ws_www template global keys.vi"/>
			<Item Name="User jsObject.vi" Type="VI" URL="../../../server/database/Users/User jsObject.vi"/>
			<Item Name="Station Get All.vi" Type="VI" URL="../../../server/database/Stations/Station Get All.vi"/>
			<Item Name="Station Record.ctl" Type="VI" URL="../../../server/database/Stations/Station Record.ctl"/>
			<Item Name="Station Record Fields.ctl" Type="VI" URL="../../../server/database/Stations/Station Record Fields.ctl"/>
			<Item Name="Instrument Record.ctl" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Record.ctl"/>
			<Item Name="Close Statement.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Talk/Close Statement.vi"/>
			<Item Name="Statement Refnum.ctl" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Controls/Statement Refnum.ctl"/>
			<Item Name="SQLFreeHandle.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLFreeHandle.vi"/>
			<Item Name="Odbc32.dll" Type="Document" URL="Odbc32.dll">
				<Property Name="NI.PreserveRelativePath" Type="Bool">true</Property>
			</Item>
			<Item Name="SQLGetDiagRec.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLGetDiagRec.vi"/>
			<Item Name="Execute User Query.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Talk/Execute User Query.vi"/>
			<Item Name="SQLExecDirect.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLExecDirect.vi"/>
			<Item Name="Check for Data.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Talk/Check for Data.vi"/>
			<Item Name="SQLFetch.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLFetch.vi"/>
			<Item Name="SQLCloseCursor.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLCloseCursor.vi"/>
			<Item Name="SQLNumResultCols.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLNumResultCols.vi"/>
			<Item Name="Open Statement.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Talk/Open Statement.vi"/>
			<Item Name="SQLAllocHandle.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLAllocHandle.vi"/>
			<Item Name="Station Retrieve Record.vi" Type="VI" URL="../../../server/database/Stations/Station Retrieve Record.vi"/>
			<Item Name="Fetch I32 data.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Data/Fetch I32 data.vi"/>
			<Item Name="Fetch STR data.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Data/Fetch STR data.vi"/>
			<Item Name="Instrument Get On Station.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Get On Station.vi"/>
			<Item Name="Association Get By Station.vi" Type="VI" URL="../../../server/database/Stations/Associations/Association Get By Station.vi"/>
			<Item Name="Association Record.ctl" Type="VI" URL="../../../server/database/Stations/Associations/Association Record.ctl"/>
			<Item Name="Association Retrieve Record.vi" Type="VI" URL="../../../server/database/Stations/Associations/Association Retrieve Record.vi"/>
			<Item Name="Instrument Get By ixInstrument.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Get By ixInstrument.vi"/>
			<Item Name="Instrument Retrieve Record.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Retrieve Record.vi"/>
			<Item Name="Decode MHTML Base64.vi" Type="VI" URL="../../../../SI.LIB/HTML/MHTML/Decode MHTML Base64.vi"/>
			<Item Name="Fetch DateTime data.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Data/Fetch DateTime data.vi"/>
			<Item Name="Format DateTime Data.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Data/Format DateTime Data.vi"/>
			<Item Name="Field Get MN SN Display Names.vi" Type="VI" URL="../../../server/database/Fields/Field Get MN SN Display Names.vi"/>
			<Item Name="Field Record.ctl" Type="VI" URL="../../../server/database/Fields/Field Record.ctl"/>
			<Item Name="Field DataTypes.ctl" Type="VI" URL="../../../server/database/Fields/Field DataTypes.ctl"/>
			<Item Name="Field NextItem.ctl" Type="VI" URL="../../../server/database/Fields/Field NextItem.ctl"/>
			<Item Name="Field Retrieve Record.vi" Type="VI" URL="../../../server/database/Fields/Field Retrieve Record.vi"/>
			<Item Name="ws_www template header.vi" Type="VI" URL="../_cgi-lib/ws_www template header.vi"/>
			<Item Name="ws_verify user login.vi" Type="VI" URL="../_cgi-lib/ws_verify user login.vi"/>
			<Item Name="ws_parse user credentials.vi" Type="VI" URL="../_cgi-lib/ws_parse user credentials.vi"/>
			<Item Name="User Get.vi" Type="VI" URL="../../../server/database/Users/User Get.vi"/>
			<Item Name="Escape String Literals for Query.vi" Type="VI" URL="../../../server/database/Escape String Literals for Query.vi"/>
			<Item Name="User Retrieve Record.vi" Type="VI" URL="../../../server/database/Users/User Retrieve Record.vi"/>
			<Item Name="ws Spartan Config.vi" Type="VI" URL="../_cgi-lib/ws Spartan Config.vi"/>
			<Item Name="Generate Random String.vi" Type="VI" URL="../../../../SI.LIB/Generate Random String.vi"/>
			<Item Name="ws DB Open.vi" Type="VI" URL="../_cgi-lib/ws DB Open.vi"/>
			<Item Name="Clear Errors by Codes.vi" Type="VI" URL="../../../../SI.LIB/Clear Errors by Codes.vi"/>
			<Item Name="User Get Current Logins.vi" Type="VI" URL="../../../server/database/Users/User Get Current Logins.vi"/>
			<Item Name="User Get All.vi" Type="VI" URL="../../../server/database/Users/User Get All.vi"/>
			<Item Name="User Record Fields.ctl" Type="VI" URL="../../../server/database/Users/User Record Fields.ctl"/>
			<Item Name="User Update.vi" Type="VI" URL="../../../server/database/Users/User Update.vi"/>
			<Item Name="Check User Permission.vi" Type="VI" URL="../_cgi-lib/Check User Permission.vi"/>
			<Item Name="about read folder notes to js.vi" Type="VI" URL="../about/about read folder notes to js.vi"/>
			<Item Name="about process module notes.vi" Type="VI" URL="../about/about process module notes.vi"/>
			<Item Name="about read notes section.vi" Type="VI" URL="../about/about read notes section.vi"/>
			<Item Name="about get DF index details.vi" Type="VI" URL="../about/about get DF index details.vi"/>
			<Item Name="about read tMasterInformation ODBC.vi" Type="VI" URL="../about/about read tMasterInformation ODBC.vi"/>
			<Item Name="Close Connection.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Talk/Close Connection.vi"/>
			<Item Name="SQLDisconnect.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLDisconnect.vi"/>
			<Item Name="about Open Connection DriverConnect.vi" Type="VI" URL="../about/about Open Connection DriverConnect.vi"/>
			<Item Name="about SQLDriverConnect.vi" Type="VI" URL="../about/about SQLDriverConnect.vi"/>
			<Item Name="SQLSetEnvAttr.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLSetEnvAttr.vi"/>
			<Item Name="format version string.vi" Type="VI" URL="../_cgi-lib/format version string.vi"/>
			<Item Name="about get DD DF Version.vi" Type="VI" URL="../about/about get DD DF Version.vi"/>
			<Item Name="List Procs.vi" Type="VI" URL="../../../../SI.LIB/WIN32/WinKERNEL/List Procs.vi"/>
			<Item Name="psapi.dll" Type="Document" URL="psapi.dll">
				<Property Name="NI.PreserveRelativePath" Type="Bool">true</Property>
			</Item>
			<Item Name="KERNEL32.DLL" Type="Document" URL="KERNEL32.DLL">
				<Property Name="NI.PreserveRelativePath" Type="Bool">true</Property>
			</Item>
			<Item Name="Enumerate Processes.vi" Type="VI" URL="../../../../SI.LIB/WIN32/WinKERNEL/Enumerate Processes.vi"/>
			<Item Name="GetModuleName.vi" Type="VI" URL="../../../../SI.LIB/WIN32/WinKERNEL/GetModuleName.vi"/>
			<Item Name="OpenProcess.vi" Type="VI" URL="../../../../SI.LIB/WIN32/WinKERNEL/OpenProcess.vi"/>
			<Item Name="Get Exe Version.vi" Type="VI" URL="../../../../SI.LIB/Get Exe Version.vi"/>
			<Item Name="version.dll" Type="Document" URL="version.dll">
				<Property Name="NI.PreserveRelativePath" Type="Bool">true</Property>
			</Item>
			<Item Name="Client Get Version on Server.vi" Type="VI" URL="../_cgi-lib/Client Get Version on Server.vi"/>
			<Item Name="DocRoot Folder.vi" Type="VI" URL="../../../server/server lib/DocRoot Folder.vi"/>
			<Item Name="ws Spartan Uptime.vi" Type="VI" URL="../_cgi-lib/ws Spartan Uptime.vi"/>
			<Item Name="Empty Keyed Array.vi" Type="VI" URL="../_cgi-lib/Empty Keyed Array.vi"/>
			<Item Name="ws_read GET parameters.vi" Type="VI" URL="../_cgi-lib/ws_read GET parameters.vi"/>
			<Item Name="cgi sendmail.vi" Type="VI" URL="../_cgi-lib/cgi sendmail.vi"/>
			<Item Name="client handle page request.vi" Type="VI" URL="../client/client handle page request.vi"/>
			<Item Name="client parse client status.vi" Type="VI" URL="../client/client parse client status.vi"/>
			<Item Name="Version Compare.vi" Type="VI" URL="../../../../SI.LIB/Version Compare.vi"/>
			<Item Name="Client TCP Request Version.vi" Type="VI" URL="../_cgi-lib/Client TCP Request Version.vi"/>
			<Item Name="Client TCP Core.vi" Type="VI" URL="../_cgi-lib/Client TCP Core.vi"/>
			<Item Name="IP Server Check.vi" Type="VI" URL="../../../server/server lib/IP Server Check.vi"/>
			<Item Name="configure restart.vi" Type="VI" URL="../configure/configure restart.vi"/>
			<Item Name="configure update.vi" Type="VI" URL="../configure/configure update.vi"/>
			<Item Name="configure restart DIAdem.vi" Type="VI" URL="../configure/configure restart DIAdem.vi"/>
			<Item Name="debugger File Speed.vi" Type="VI" URL="../debugger/debugger File Speed.vi"/>
			<Item Name="DCA Results.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Results.ctl"/>
			<Item Name="DCA Measurement Values.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Measurement Values.ctl"/>
			<Item Name="DCA Topology.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Topology.ctl"/>
			<Item Name="DCA Limit.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Limit.ctl"/>
			<Item Name="DCA Limit Quantity.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Limit Quantity.ctl"/>
			<Item Name="DCA Limit Comparison.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Limit Comparison.ctl"/>
			<Item Name="DCA Limit Operation.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Limit Operation.ctl"/>
			<Item Name="Test Referential Limit.ctl" Type="VI" URL="../../tests/Test Referential Limit.ctl"/>
			<Item Name="DCA Calibration State.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Calibration State.ctl"/>
			<Item Name="DCA Attenuation Calculation.ctl" Type="VI" URL="../../tests/DC Attenuation/TypeDefs/DCA Attenuation Calculation.ctl"/>
			<Item Name="Field System Fields.ctl" Type="VI" URL="../../../server/database/Fields/Field System Fields.ctl"/>
			<Item Name="Field Find In Array.vi" Type="VI" URL="../../../server/database/Fields/Field Find In Array.vi"/>
			<Item Name="Test Storage Panel Template TDMS.vi" Type="VI" URL="../../tests/Test Storage Panel Template TDMS.vi"/>
			<Item Name="Field Replace System Value In Array.vi" Type="VI" URL="../../../server/database/Fields/Field Replace System Value In Array.vi"/>
			<Item Name="TDMS Copy File Except Specified Groups.vi" Type="VI" URL="../../../../SI.LIB/TDMS/TDMS Copy File Except Specified Groups.vi"/>
			<Item Name="TDMS Copy Channel.vi" Type="VI" URL="../../../../SI.LIB/TDMS/TDMS Copy Channel.vi"/>
			<Item Name="TDMS Copy Properties.vi" Type="VI" URL="../../../../SI.LIB/TDMS/TDMS Copy Properties.vi"/>
			<Item Name="TDMS Copy Channel Data.vi" Type="VI" URL="../../../../SI.LIB/TDMS/TDMS Copy Channel Data.vi"/>
			<Item Name="editscenario load fields and operations.vi" Type="VI" URL="../editscenario/editscenario load fields and operations.vi"/>
			<Item Name="Field Order By.ctl" Type="VI" URL="../../../server/database/Fields/Field Order By.ctl"/>
			<Item Name="Fields jsObject Array.vi" Type="VI" URL="../../../server/database/Fields/Fields jsObject Array.vi"/>
			<Item Name="Field jsObject.vi" Type="VI" URL="../../../server/database/Fields/Field jsObject.vi"/>
			<Item Name="Field List Parse Values.vi" Type="VI" URL="../../../server/database/Fields/Field List Parse Values.vi"/>
			<Item Name="Fields Get All Available.vi" Type="VI" URL="../../../server/database/Fields/Fields Get All Available.vi"/>
			<Item Name="Sequence Get All.vi" Type="VI" URL="../../../server/database/Sequences/Sequence Get All.vi"/>
			<Item Name="Sequence Record.ctl" Type="VI" URL="../../../server/database/Sequences/Sequence Record.ctl"/>
			<Item Name="Sequence Fields.ctl" Type="VI" URL="../../../server/database/Sequences/Sequence Fields.ctl"/>
			<Item Name="Sequence Retrieve Record.vi" Type="VI" URL="../../../server/database/Sequences/Sequence Retrieve Record.vi"/>
			<Item Name="Test Get All.vi" Type="VI" URL="../../../server/database/Tests/Test Get All.vi"/>
			<Item Name="Test Record.ctl" Type="VI" URL="../../../server/database/Tests/Test Record.ctl"/>
			<Item Name="Test Table Fields.ctl" Type="VI" URL="../../../server/database/Tests/Test Table Fields.ctl"/>
			<Item Name="Test Retrieve Record.vi" Type="VI" URL="../../../server/database/Tests/Test Retrieve Record.vi"/>
			<Item Name="Fields Get Measurements.vi" Type="VI" URL="../../../server/database/Fields/Fields Get Measurements.vi"/>
			<Item Name="ws_editscenario Load Scenario.vi" Type="VI" URL="../editscenario/ws_editscenario Load Scenario.vi"/>
			<Item Name="editscenario Load Templates.vi" Type="VI" URL="../editscenario/editscenario Load Templates.vi"/>
			<Item Name="Template jsObject Array.vi" Type="VI" URL="../../../server/database/Templates/Template jsObject Array.vi"/>
			<Item Name="Template Record.ctl" Type="VI" URL="../../../server/database/Templates/Template Record.ctl"/>
			<Item Name="Template jsObject.vi" Type="VI" URL="../../../server/database/Templates/Template jsObject.vi"/>
			<Item Name="Template Get All.vi" Type="VI" URL="../../../server/database/Templates/Template Get All.vi"/>
			<Item Name="Template Retrieve Record.vi" Type="VI" URL="../../../server/database/Templates/Template Retrieve Record.vi"/>
			<Item Name="Fetch DBL data.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Data/Fetch DBL data.vi"/>
			<Item Name="editscenario Previous Scenarios.vi" Type="VI" URL="../editscenario/editscenario Previous Scenarios.vi"/>
			<Item Name="Scenario Get Scenario.vi" Type="VI" URL="../../../server/database/Scenarios/Scenario Get Scenario.vi"/>
			<Item Name="Scenario Record.ctl" Type="VI" URL="../../../server/database/Scenarios/Scenario Record.ctl"/>
			<Item Name="Condition Record.ctl" Type="VI" URL="../../../server/database/Scenarios/Conditions/Condition Record.ctl"/>
			<Item Name="Condition Operators.ctl" Type="VI" URL="../../../server/database/Scenarios/Conditions/Condition Operators.ctl"/>
			<Item Name="Scenario Retrieve Record.vi" Type="VI" URL="../../../server/database/Scenarios/Scenario Retrieve Record.vi"/>
			<Item Name="Condition Get Conditions for ixScenario.vi" Type="VI" URL="../../../server/database/Scenarios/Conditions/Condition Get Conditions for ixScenario.vi"/>
			<Item Name="Condition Retrieve Record.vi" Type="VI" URL="../../../server/database/Scenarios/Conditions/Condition Retrieve Record.vi"/>
			<Item Name="Scenario jsObject.vi" Type="VI" URL="../../../server/database/Scenarios/Scenario jsObject.vi"/>
			<Item Name="Condition jsObject Array.vi" Type="VI" URL="../../../server/database/Scenarios/Conditions/Condition jsObject Array.vi"/>
			<Item Name="Field Get Field.vi" Type="VI" URL="../../../server/database/Fields/Field Get Field.vi"/>
			<Item Name="Condition OpMap.vi" Type="VI" URL="../../../server/database/Scenarios/Conditions/Condition OpMap.vi"/>
			<Item Name="Template Get Templates from List.vi" Type="VI" URL="../../../server/database/Templates/Template Get Templates from List.vi"/>
			<Item Name="Template Get by sxTemplateId.vi" Type="VI" URL="../../../server/database/Templates/Template Get by sxTemplateId.vi"/>
			<Item Name="Template Read Parameter File.vi" Type="VI" URL="../../../server/database/Templates/Template Read Parameter File.vi"/>
			<Item Name="Template Save INI Content to File.vi" Type="VI" URL="../../../server/database/Templates/Template Save INI Content to File.vi"/>
			<Item Name="Template Encode Decode File.vi" Type="VI" URL="../../../server/database/Templates/Template Encode Decode File.vi"/>
			<Item Name="Templates Folder.vi" Type="VI" URL="../../../server/server lib/Templates Folder.vi"/>
			<Item Name="Field Get Fields from List.vi" Type="VI" URL="../../../server/database/Fields/Field Get Fields from List.vi"/>
			<Item Name="editscenario Query DB for Scenario.vi" Type="VI" URL="../editscenario/editscenario Query DB for Scenario.vi"/>
			<Item Name="editscenario handle new scenario.vi" Type="VI" URL="../editscenario/editscenario handle new scenario.vi"/>
			<Item Name="Empty Scenario.vi" Type="VI" URL="../../../server/database/Scenarios/Empty Scenario.vi"/>
			<Item Name="editscenario handle import.vi" Type="VI" URL="../editscenario/editscenario handle import.vi"/>
			<Item Name="scenario xml.ctl" Type="VI" URL="../editscenario/scenario xml.ctl"/>
			<Item Name="editscenario handle delete scenario.vi" Type="VI" URL="../editscenario/editscenario handle delete scenario.vi"/>
			<Item Name="editscenario check edit permission.vi" Type="VI" URL="../editscenario/editscenario check edit permission.vi"/>
			<Item Name="Scenario Delete.vi" Type="VI" URL="../../../server/database/Scenarios/Scenario Delete.vi"/>
			<Item Name="Delete Conditions.vi" Type="VI" URL="../../../server/database/Scenarios/Conditions/Delete Conditions.vi"/>
			<Item Name="editscenario Save Scenario.vi" Type="VI" URL="../editscenario/editscenario Save Scenario.vi"/>
			<Item Name="editscenario format Post to Scenario.vi" Type="VI" URL="../editscenario/editscenario format Post to Scenario.vi"/>
			<Item Name="editscenario format Post to Conditions.vi" Type="VI" URL="../editscenario/editscenario format Post to Conditions.vi"/>
			<Item Name="editscenario format Condition.vi" Type="VI" URL="../editscenario/editscenario format Condition.vi"/>
			<Item Name="Scenario Add.vi" Type="VI" URL="../../../server/database/Scenarios/Scenario Add.vi"/>
			<Item Name="Condition Add.vi" Type="VI" URL="../../../server/database/Scenarios/Conditions/Condition Add.vi"/>
			<Item Name="Scenario Update.vi" Type="VI" URL="../../../server/database/Scenarios/Scenario Update.vi"/>
			<Item Name="editscenario handle preview.vi" Type="VI" URL="../editscenario/editscenario handle preview.vi"/>
			<Item Name="TDM_INDEX Record.ctl" Type="VI" URL="../_cgi-lib/TDM_INDEX Record.ctl"/>
			<Item Name="ws_set HTTP header for export.vi" Type="VI" URL="../_cgi-lib/ws_set HTTP header for export.vi"/>
			<Item Name="Station Get By IP.vi" Type="VI" URL="../../../server/database/Stations/Station Get By IP.vi"/>
			<Item Name="ws_edittest parse query params.vi" Type="VI" URL="../edittest/ws_edittest parse query params.vi"/>
			<Item Name="edittest sequence record to template.vi" Type="VI" URL="../edittest/edittest sequence record to template.vi"/>
			<Item Name="edittest build ALLDATASHEETS object.vi" Type="VI" URL="../edittest/edittest build ALLDATASHEETS object.vi"/>
			<Item Name="edittest Sequence FIELDS.vi" Type="VI" URL="../edittest/edittest Sequence FIELDS.vi"/>
			<Item Name="edittest set MN SN by PID.vi" Type="VI" URL="../edittest/edittest set MN SN by PID.vi"/>
			<Item Name="Fields Get For Sequence.vi" Type="VI" URL="../../../server/database/Fields/Fields Get For Sequence.vi"/>
			<Item Name="Sequence Get.vi" Type="VI" URL="../../../server/database/Sequences/Sequence Get.vi"/>
			<Item Name="edittest Sequence STEPS.vi" Type="VI" URL="../edittest/edittest Sequence STEPS.vi"/>
			<Item Name="Step jsObject Array.vi" Type="VI" URL="../../../server/database/Steps/Step jsObject Array.vi"/>
			<Item Name="Step Record.ctl" Type="VI" URL="../../../server/database/Steps/Step Record.ctl"/>
			<Item Name="Step jsObject.vi" Type="VI" URL="../../../server/database/Steps/Step jsObject.vi"/>
			<Item Name="Step Get All.vi" Type="VI" URL="../../../server/database/Steps/Step Get All.vi"/>
			<Item Name="Step Retrieve Record.vi" Type="VI" URL="../../../server/database/Steps/Step Retrieve Record.vi"/>
			<Item Name="Test jsObject Array.vi" Type="VI" URL="../../../server/database/Tests/Test jsObject Array.vi"/>
			<Item Name="Test jsObject.vi" Type="VI" URL="../../../server/database/Tests/Test jsObject.vi"/>
			<Item Name="edittest extract record keys.vi" Type="VI" URL="../edittest/edittest extract record keys.vi"/>
			<Item Name="edittest List Sequences.vi" Type="VI" URL="../edittest/edittest List Sequences.vi"/>
			<Item Name="Sequence Get by Query.vi" Type="VI" URL="../../../server/database/Sequences/Sequence Get by Query.vi"/>
			<Item Name="Sequence jsObject.vi" Type="VI" URL="../../../server/database/Sequences/Sequence jsObject.vi"/>
			<Item Name="edittest get user info from username.vi" Type="VI" URL="../edittest/edittest get user info from username.vi"/>
			<Item Name="edittest parse state keys.vi" Type="VI" URL="../edittest/edittest parse state keys.vi"/>
			<Item Name="edittest parse permissions keys.vi" Type="VI" URL="../edittest/edittest parse permissions keys.vi"/>
			<Item Name="edittest handle delete sequence.vi" Type="VI" URL="../edittest/edittest handle delete sequence.vi"/>
			<Item Name="Sequence Delete.vi" Type="VI" URL="../../../server/database/Sequences/Sequence Delete.vi"/>
			<Item Name="Fields Delete From Sequence.vi" Type="VI" URL="../../../server/database/Fields/Fields Delete From Sequence.vi"/>
			<Item Name="Step Delete All.vi" Type="VI" URL="../../../server/database/Steps/Step Delete All.vi"/>
			<Item Name="edittest handle new sequence.vi" Type="VI" URL="../edittest/edittest handle new sequence.vi"/>
			<Item Name="Sequence Default New.vi" Type="VI" URL="../../../server/database/Sequences/Sequence Default New.vi"/>
			<Item Name="edittest write fields to file.vi" Type="VI" URL="../edittest/edittest write fields to file.vi"/>
			<Item Name="edittest write test steps to file.vi" Type="VI" URL="../edittest/edittest write test steps to file.vi"/>
			<Item Name="edittest write sequence to file.vi" Type="VI" URL="../edittest/edittest write sequence to file.vi"/>
			<Item Name="ws_edittest import sequence.vi" Type="VI" URL="../edittest/ws_edittest import sequence.vi"/>
			<Item Name="Sequence Add.vi" Type="VI" URL="../../../server/database/Sequences/Sequence Add.vi"/>
			<Item Name="edittest add missing fields to system.vi" Type="VI" URL="../edittest/edittest add missing fields to system.vi"/>
			<Item Name="Field Add.vi" Type="VI" URL="../../../server/database/Fields/Field Add.vi"/>
			<Item Name="Field Generate Unique Record.vi" Type="VI" URL="../../../server/database/Fields/Field Generate Unique Record.vi"/>
			<Item Name="Duplicate String.vi" Type="VI" URL="../_cgi-lib/Duplicate String.vi"/>
			<Item Name="Fields Get New Custom Field ID.vi" Type="VI" URL="../../../server/database/Fields/Fields Get New Custom Field ID.vi"/>
			<Item Name="edittest read fields from file.vi" Type="VI" URL="../edittest/edittest read fields from file.vi"/>
			<Item Name="edittest read test steps from file.vi" Type="VI" URL="../edittest/edittest read test steps from file.vi"/>
			<Item Name="edittest read sequence from file.vi" Type="VI" URL="../edittest/edittest read sequence from file.vi"/>
			<Item Name="Step Add.vi" Type="VI" URL="../../../server/database/Steps/Step Add.vi"/>
			<Item Name="MHTML Base64.vi" Type="VI" URL="../../../../SI.LIB/HTML/MHTML/MHTML Base64.vi"/>
			<Item Name="ASCII char to U8.vi" Type="VI" URL="../../../../SI.LIB/HTML/MHTML/ASCII char to U8.vi"/>
			<Item Name="edittest format sequence form to record.vi" Type="VI" URL="../edittest/edittest format sequence form to record.vi"/>
			<Item Name="edittest sequence form fields to records.vi" Type="VI" URL="../edittest/edittest sequence form fields to records.vi"/>
			<Item Name="Field Empty Field.vi" Type="VI" URL="../../../server/database/Fields/Field Empty Field.vi"/>
			<Item Name="Field List Set Default.vi" Type="VI" URL="../../../server/database/Fields/Field List Set Default.vi"/>
			<Item Name="Field Update.vi" Type="VI" URL="../../../server/database/Fields/Field Update.vi"/>
			<Item Name="Fields Update PI Steps.vi" Type="VI" URL="../../../server/database/Fields/Fields Update PI Steps.vi"/>
			<Item Name="Step Get All By Test Type.vi" Type="VI" URL="../../../server/database/Steps/Step Get All By Test Type.vi"/>
			<Item Name="Step Update.vi" Type="VI" URL="../../../server/database/Steps/Step Update.vi"/>
			<Item Name="Prompted Inputs Flatten Test Parameters.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/Prompted Inputs Flatten Test Parameters.vi"/>
			<Item Name="PI Test Parameters.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Test Parameters.ctl"/>
			<Item Name="PI Measurement Cluster.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Measurement Cluster.ctl"/>
			<Item Name="PI Limit Parameters.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Limit Parameters.ctl"/>
			<Item Name="PI Limit Definition.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Limit Definition.ctl"/>
			<Item Name="PI Limit Comparison.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Limit Comparison.ctl"/>
			<Item Name="Flatten Test Parameters.vi" Type="VI" URL="../../tests/Flatten Test Parameters.vi"/>
			<Item Name="Flat Report Parameters Cluster.ctl" Type="VI" URL="../../tests/Flat Report Parameters Cluster.ctl"/>
			<Item Name="Prompted Inputs Version.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/Prompted Inputs Version.vi"/>
			<Item Name="PI Database Check.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/PI Database Check.vi"/>
			<Item Name="Prompted Inputs Unflatten Test Parameters.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/Prompted Inputs Unflatten Test Parameters.vi"/>
			<Item Name="Test Return Parameter.ctl" Type="VI" URL="../../tests/Test Return Parameter.ctl"/>
			<Item Name="UnFlatten Test Parameters.vi" Type="VI" URL="../../tests/UnFlatten Test Parameters.vi"/>
			<Item Name="PI Test Parameters v1.0-1.2.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Test Parameters v1.0-1.2.ctl"/>
			<Item Name="PI Convert 1.7 to 2.0.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/PI Convert 1.7 to 2.0.vi"/>
			<Item Name="PI Test Parameters v1.7.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Test Parameters v1.7.ctl"/>
			<Item Name="PI Convert 1.6 to 1.7.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/PI Convert 1.6 to 1.7.vi"/>
			<Item Name="PI Test Parameters v1.6.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Test Parameters v1.6.ctl"/>
			<Item Name="PI Measurement Type String Info.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/PI Measurement Type String Info.vi"/>
			<Item Name="PI Convert 1.5 to 1.6.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/PI Convert 1.5 to 1.6.vi"/>
			<Item Name="PI Test Parameters v1.5.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Test Parameters v1.5.ctl"/>
			<Item Name="PI Convert 1.4 to 1.5.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/PI Convert 1.4 to 1.5.vi"/>
			<Item Name="PI Test Parameters v1.4.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Test Parameters v1.4.ctl"/>
			<Item Name="Test Datasheets v1.0-4.0.ctl" Type="VI" URL="../../tests/Test Datasheets v1.0-4.0.ctl"/>
			<Item Name="PI Convert 1.3 to 1.4.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/PI Convert 1.3 to 1.4.vi"/>
			<Item Name="PI Test Parameters v1.3.ctl" Type="VI" URL="../../tests/Prompted Inputs/TypeDefs/PI Test Parameters v1.3.ctl"/>
			<Item Name="PI Convert 1.0 - 1.2 to 1.3.vi" Type="VI" URL="../../tests/Prompted Inputs/LIB/PI Convert 1.0 - 1.2 to 1.3.vi"/>
			<Item Name="Field Update Sequence Field.vi" Type="VI" URL="../../../server/database/Fields/Field Update Sequence Field.vi"/>
			<Item Name="edittest save new sequence.vi" Type="VI" URL="../edittest/edittest save new sequence.vi"/>
			<Item Name="edittest save existing sequence.vi" Type="VI" URL="../edittest/edittest save existing sequence.vi"/>
			<Item Name="Sequence Update.vi" Type="VI" URL="../../../server/database/Sequences/Sequence Update.vi"/>
			<Item Name="edittest load step.vi" Type="VI" URL="../edittest/edittest load step.vi"/>
			<Item Name="edittest test step configuration.vi" Type="VI" URL="../edittest/edittest test step configuration.vi"/>
			<Item Name="Step Get By Key.vi" Type="VI" URL="../../../server/database/Steps/Step Get By Key.vi"/>
			<Item Name="Test Get.vi" Type="VI" URL="../../../server/database/Tests/Test Get.vi"/>
			<Item Name="edittest save step.vi" Type="VI" URL="../edittest/edittest save step.vi"/>
			<Item Name="edittest parse POST step config.vi" Type="VI" URL="../edittest/edittest parse POST step config.vi"/>
			<Item Name="eventlog format events list.vi" Type="VI" URL="../eventlog/eventlog format events list.vi"/>
			<Item Name="eventlog parse GET.vi" Type="VI" URL="../eventlog/eventlog parse GET.vi"/>
			<Item Name="fields Template Keys.vi" Type="VI" URL="../fields/fields Template Keys.vi"/>
			<Item Name="fields new or copy field.vi" Type="VI" URL="../fields/fields new or copy field.vi"/>
			<Item Name="fields delete field.vi" Type="VI" URL="../fields/fields delete field.vi"/>
			<Item Name="Field Delete.vi" Type="VI" URL="../../../server/database/Fields/Field Delete.vi"/>
			<Item Name="fields save field.vi" Type="VI" URL="../fields/fields save field.vi"/>
			<Item Name="fields format list items from post.vi" Type="VI" URL="../fields/fields format list items from post.vi"/>
			<Item Name="logout reset login.vi" Type="VI" URL="../logout/logout reset login.vi"/>
			<Item Name="User Get By Email.vi" Type="VI" URL="../../../server/database/Users/User Get By Email.vi"/>
			<Item Name="SHA-1 Hash.vi" Type="VI" URL="../../../../SI.LIB/SHA-1 Hash.vi"/>
			<Item Name="ws_mining search for scenario.vi" Type="VI" URL="../mining/ws_mining search for scenario.vi"/>
			<Item Name="mining perform search.vi" Type="VI" URL="../mining/mining perform search.vi"/>
			<Item Name="format ANSI SQL wildcards.vi" Type="VI" URL="../_cgi-lib/format ANSI SQL wildcards.vi"/>
			<Item Name="Scenario jsObject Array.vi" Type="VI" URL="../../../server/database/Scenarios/Scenario jsObject Array.vi"/>
			<Item Name="runscenario run Query.vi" Type="VI" URL="../runscenario/runscenario run Query.vi"/>
			<Item Name="runscenario estimate time.vi" Type="VI" URL="../runscenario/runscenario estimate time.vi"/>
			<Item Name="runscenario Query with Result.vi" Type="VI" URL="../runscenario/runscenario Query with Result.vi"/>
			<Item Name="Datafinder Query.ctl" Type="VI" URL="../../../server/DataFinder/Datafinder Query.ctl"/>
			<Item Name="eSearch Types.ctl" Type="VI" URL="../../../server/DataFinder/eSearch Types.ctl"/>
			<Item Name="DataFinder Comparisons.ctl" Type="VI" URL="../../../server/DataFinder/DataFinder Comparisons.ctl"/>
			<Item Name="DataFinder Query.vi" Type="VI" URL="../../../server/DataFinder/DataFinder Query.vi"/>
			<Item Name="Create Query String.vi" Type="VI" URL="../../../server/DataFinder/Create Query String.vi"/>
			<Item Name="DataFinder PreProcess Results.vi" Type="VI" URL="../../../server/DataFinder/DataFinder PreProcess Results.vi"/>
			<Item Name="DataFinder Find Run Results.vi" Type="VI" URL="../../../server/DataFinder/DataFinder Find Run Results.vi"/>
			<Item Name="TDM_INDEX Record text SN sort.ctl" Type="VI" URL="../_cgi-lib/TDM_INDEX Record text SN sort.ctl"/>
			<Item Name="runscenario parse Query.vi" Type="VI" URL="../runscenario/runscenario parse Query.vi"/>
			<Item Name="Build AND List.vi" Type="VI" URL="../../../server/DataFinder/Build AND List.vi"/>
			<Item Name="runscenario expand OR query value.vi" Type="VI" URL="../runscenario/runscenario expand OR query value.vi"/>
			<Item Name="Build OR List.vi" Type="VI" URL="../../../server/DataFinder/Build OR List.vi"/>
			<Item Name="runscenario process Conditions.vi" Type="VI" URL="../runscenario/runscenario process Conditions.vi"/>
			<Item Name="runscenario process Conditions - Add Condition.vi" Type="VI" URL="../runscenario/runscenario process Conditions - Add Condition.vi"/>
			<Item Name="runscenario process Conditions - Preprocess.vi" Type="VI" URL="../runscenario/runscenario process Conditions - Preprocess.vi"/>
			<Item Name="runscenario calculate relative timestamps.vi" Type="VI" URL="../runscenario/runscenario calculate relative timestamps.vi"/>
			<Item Name="runscenario Load Templates.vi" Type="VI" URL="../runscenario/runscenario Load Templates.vi"/>
			<Item Name="TAB List to String Array.vi" Type="VI" URL="../../../../SI.LIB/TAB List to String Array.vi"/>
			<Item Name="runscenario run template.vi" Type="VI" URL="../runscenario/runscenario run template.vi"/>
			<Item Name="runscenario get items from POST.vi" Type="VI" URL="../runscenario/runscenario get items from POST.vi"/>
			<Item Name="runscenario string to items.vi" Type="VI" URL="../runscenario/runscenario string to items.vi"/>
			<Item Name="ws_cgi get raw file.vi" Type="VI" URL="../_cgi-lib/ws_cgi get raw file.vi"/>
			<Item Name="runscenario export Results.vi" Type="VI" URL="../runscenario/runscenario export Results.vi"/>
			<Item Name="runscenario retrieve Files.vi" Type="VI" URL="../runscenario/runscenario retrieve Files.vi"/>
			<Item Name="runscenario zip up files.vi" Type="VI" URL="../runscenario/runscenario zip up files.vi"/>
			<Item Name="runscenario export Report.vi" Type="VI" URL="../runscenario/runscenario export Report.vi"/>
			<Item Name="runtest format template keys.vi" Type="VI" URL="../runtest/runtest format template keys.vi"/>
			<Item Name="Test Output.ctl" Type="VI" URL="../../tests/Test Output.ctl"/>
			<Item Name="runtest format timing.vi" Type="VI" URL="../runtest/runtest format timing.vi"/>
			<Item Name="runtest add timing.vi" Type="VI" URL="../runtest/runtest add timing.vi"/>
			<Item Name="runtest format STEPS array string.vi" Type="VI" URL="../runtest/runtest format STEPS array string.vi"/>
			<Item Name="runtest check for empty steps.vi" Type="VI" URL="../runtest/runtest check for empty steps.vi"/>
			<Item Name="runtest parse settings.vi" Type="VI" URL="../runtest/runtest parse settings.vi"/>
			<Item Name="runtest client check.vi" Type="VI" URL="../runtest/runtest client check.vi"/>
			<Item Name="runtest User - Station.ctl" Type="VI" URL="../runtest/runtest User - Station.ctl"/>
			<Item Name="runtest check sequence.vi" Type="VI" URL="../runtest/runtest check sequence.vi"/>
			<Item Name="lock - unlock user license.vi" Type="VI" URL="../_cgi-lib/lock - unlock user license.vi"/>
			<Item Name="runtest increment seqcount.vi" Type="VI" URL="../runtest/runtest increment seqcount.vi"/>
			<Item Name="runtest execute.vi" Type="VI" URL="../runtest/runtest execute.vi"/>
			<Item Name="runtest parse step QM.vi" Type="VI" URL="../runtest/runtest parse step QM.vi"/>
			<Item Name="runtest calculate repeat run.vi" Type="VI" URL="../runtest/runtest calculate repeat run.vi"/>
			<Item Name="runtest Step Logic.vi" Type="VI" URL="../runtest/runtest Step Logic.vi"/>
			<Item Name="runtest Run Single Test.vi" Type="VI" URL="../runtest/runtest Run Single Test.vi"/>
			<Item Name="Test Execution Settings.ctl" Type="VI" URL="../../tests/Test Execution Settings.ctl"/>
			<Item Name="RPC Close App Reference.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Close App Reference.vi"/>
			<Item Name="RPC Get Relative Path.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Get Relative Path.vi"/>
			<Item Name="RPC Open Test App Reference.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Open Test App Reference.vi"/>
			<Item Name="RPC Get Test Paths and Version.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Get Test Paths and Version.vi"/>
			<Item Name="RPC Get Component Version.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Get Component Version.vi"/>
			<Item Name="RPC Open VI Reference.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Open VI Reference.vi"/>
			<Item Name="RPC Test Library Path.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Test Library Path.vi"/>
			<Item Name="RPC Open App Reference.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Open App Reference.vi"/>
			<Item Name="RPC Remote Call.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Remote Call.vi"/>
			<Item Name="RPC Download Component.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Download Component.vi"/>
			<Item Name="Client TCP Request Download.vi" Type="VI" URL="../_cgi-lib/Client TCP Request Download.vi"/>
			<Item Name="runtest run test core.vi" Type="VI" URL="../runtest/runtest run test core.vi"/>
			<Item Name="Test Panel Template.vi" Type="VI" URL="../../tests/Test Panel Template.vi"/>
			<Item Name="runtest Parse Step Parameters.vi" Type="VI" URL="../runtest/runtest Parse Step Parameters.vi"/>
			<Item Name="runtest empty test execution settings.vi" Type="VI" URL="../runtest/runtest empty test execution settings.vi"/>
			<Item Name="runtest Pre-Process Test.vi" Type="VI" URL="../runtest/runtest Pre-Process Test.vi"/>
			<Item Name="Test Pre-Processing Panel Template.vi" Type="VI" URL="../../tests/Test Pre-Processing Panel Template.vi"/>
			<Item Name="runtest Check Instruments for Valid Configuration.vi" Type="VI" URL="../runtest/runtest Check Instruments for Valid Configuration.vi"/>
			<Item Name="Instrument Update.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Update.vi"/>
			<Item Name="Instrument Get By ID.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Get By ID.vi"/>
			<Item Name="Driver Config.vi" Type="VI" URL="../../drivers/Driver Config.vi"/>
			<Item Name="Driver Install.vi" Type="VI" URL="../../drivers/Driver Install.vi"/>
			<Item Name="RPC Open Driver App Reference.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Open Driver App Reference.vi"/>
			<Item Name="RPC Get Driver Paths and Version.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Get Driver Paths and Version.vi"/>
			<Item Name="RPC Driver Library Path.vi" Type="VI" URL="../_cgi-lib/RPC/RPC Driver Library Path.vi"/>
			<Item Name="Driver Config Panel.vi" Type="VI" URL="../../drivers/Driver Config Panel.vi"/>
			<Item Name="Get Parameter From Test Step.vi" Type="VI" URL="../../tests/Get Parameter From Test Step.vi"/>
			<Item Name="Get Datasheets From Test Step.vi" Type="VI" URL="../../tests/Get Datasheets From Test Step.vi"/>
			<Item Name="Get Instruments Required From Test Step.vi" Type="VI" URL="../../tests/Get Instruments Required From Test Step.vi"/>
			<Item Name="Get QuickMode From Test Step.vi" Type="VI" URL="../../tests/Get QuickMode From Test Step.vi"/>
			<Item Name="Get Test Parameters From Test Step.vi" Type="VI" URL="../../tests/Get Test Parameters From Test Step.vi"/>
			<Item Name="runtest add step data to fields.vi" Type="VI" URL="../runtest/runtest add step data to fields.vi"/>
			<Item Name="Auto Number Get Next MSN.vi" Type="VI" URL="../../../server/database/Auto Number/Auto Number Get Next MSN.vi"/>
			<Item Name="Auto Number Query.vi" Type="VI" URL="../../../server/database/Auto Number/Auto Number Query.vi"/>
			<Item Name="Auto Number Record.ctl" Type="VI" URL="../../../server/database/Auto Number/Auto Number Record.ctl"/>
			<Item Name="Auto Number Retrieve Record.vi" Type="VI" URL="../../../server/database/Auto Number/Auto Number Retrieve Record.vi"/>
			<Item Name="Auto Number Add.vi" Type="VI" URL="../../../server/database/Auto Number/Auto Number Add.vi"/>
			<Item Name="Auto Number Update.vi" Type="VI" URL="../../../server/database/Auto Number/Auto Number Update.vi"/>
			<Item Name="Auto Number Get Next SSN.vi" Type="VI" URL="../../../server/database/Auto Number/Auto Number Get Next SSN.vi"/>
			<Item Name="runtest Auto Increment User Prefix Field.vi" Type="VI" URL="../runtest/runtest Auto Increment User Prefix Field.vi"/>
			<Item Name="runtest Split AutoInc String.vi" Type="VI" URL="../runtest/runtest Split AutoInc String.vi"/>
			<Item Name="stations Template Keys.vi" Type="VI" URL="../stations/stations Template Keys.vi"/>
			<Item Name="Driver Table Fields.ctl" Type="VI" URL="../../../server/database/Drivers/Driver Table Fields.ctl"/>
			<Item Name="Station jsObject Array.vi" Type="VI" URL="../../../server/database/Stations/Station jsObject Array.vi"/>
			<Item Name="Station jsObject.vi" Type="VI" URL="../../../server/database/Stations/Station jsObject.vi"/>
			<Item Name="Instrument jsObject Array.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument jsObject Array.vi"/>
			<Item Name="Instrument jsObject.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument jsObject.vi"/>
			<Item Name="Driver jsObject Array.vi" Type="VI" URL="../../../server/database/Drivers/Driver jsObject Array.vi"/>
			<Item Name="Driver Record.ctl" Type="VI" URL="../../../server/database/Drivers/Driver Record.ctl"/>
			<Item Name="Driver jsObject.vi" Type="VI" URL="../../../server/database/Drivers/Driver jsObject.vi"/>
			<Item Name="Driver Get All.vi" Type="VI" URL="../../../server/database/Drivers/Driver Get All.vi"/>
			<Item Name="Driver Retrieve Record.vi" Type="VI" URL="../../../server/database/Drivers/Driver Retrieve Record.vi"/>
			<Item Name="Instrument Get Free.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Get Free.vi"/>
			<Item Name="Association Get All.vi" Type="VI" URL="../../../server/database/Stations/Associations/Association Get All.vi"/>
			<Item Name="Instrument Get All.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Get All.vi"/>
			<Item Name="Instrument Record Fields.ctl" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Record Fields.ctl"/>
			<Item Name="Station Get New.vi" Type="VI" URL="../../../server/database/Stations/Station Get New.vi"/>
			<Item Name="stations copy Station.vi" Type="VI" URL="../stations/stations copy Station.vi"/>
			<Item Name="stations save Station.vi" Type="VI" URL="../stations/stations save Station.vi"/>
			<Item Name="Station Get By sxStationId.vi" Type="VI" URL="../../../server/database/Stations/Station Get By sxStationId.vi"/>
			<Item Name="stations POST to INSTRUMENTS.vi" Type="VI" URL="../stations/stations POST to INSTRUMENTS.vi"/>
			<Item Name="Station Delete.vi" Type="VI" URL="../../../server/database/Stations/Station Delete.vi"/>
			<Item Name="Association Delete Station.vi" Type="VI" URL="../../../server/database/Stations/Associations/Association Delete Station.vi"/>
			<Item Name="Station Add.vi" Type="VI" URL="../../../server/database/Stations/Station Add.vi"/>
			<Item Name="Station Update Instruments.vi" Type="VI" URL="../../../server/database/Stations/Station Update Instruments.vi"/>
			<Item Name="Association Add.vi" Type="VI" URL="../../../server/database/Stations/Associations/Association Add.vi"/>
			<Item Name="Association Delete.vi" Type="VI" URL="../../../server/database/Stations/Associations/Association Delete.vi"/>
			<Item Name="Instrument Add.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Add.vi"/>
			<Item Name="TCP Resolve IP or FQDN.vi" Type="VI" URL="../../../../SI.LIB/TCP Resolve IP or FQDN.vi"/>
			<Item Name="Station Update.vi" Type="VI" URL="../../../server/database/Stations/Station Update.vi"/>
			<Item Name="Instrument Delete.vi" Type="VI" URL="../../../server/database/Stations/Instruments/Instrument Delete.vi"/>
			<Item Name="stations PING.vi" Type="VI" URL="../stations/stations PING.vi"/>
			<Item Name="stations PING check client.vi" Type="VI" URL="../stations/stations PING check client.vi"/>
			<Item Name="stations configure instrument.vi" Type="VI" URL="../stations/stations configure instrument.vi"/>
			<Item Name="ws_testing parse query string.vi" Type="VI" URL="../testing/ws_testing parse query string.vi"/>
			<Item Name="ws_testing search for sequence.vi" Type="VI" URL="../testing/ws_testing search for sequence.vi"/>
			<Item Name="testing perform search.vi" Type="VI" URL="../testing/testing perform search.vi"/>
			<Item Name="testing template keys.vi" Type="VI" URL="../testing/testing template keys.vi"/>
			<Item Name="testing format SEQLIST array.vi" Type="VI" URL="../testing/testing format SEQLIST array.vi"/>
			<Item Name="users parse GET parameters.vi" Type="VI" URL="../users/users parse GET parameters.vi"/>
			<Item Name="User jsObject Array.vi" Type="VI" URL="../../../server/database/Users/User jsObject Array.vi"/>
			<Item Name="users copy user.vi" Type="VI" URL="../users/users copy user.vi"/>
			<Item Name="User New.vi" Type="VI" URL="../../../server/database/Users/User New.vi"/>
			<Item Name="ws_users logout user.vi" Type="VI" URL="../users/ws_users logout user.vi"/>
			<Item Name="users delete user.vi" Type="VI" URL="../users/users delete user.vi"/>
			<Item Name="User Delete.vi" Type="VI" URL="../../../server/database/Users/User Delete.vi"/>
			<Item Name="ws_users update current user header.vi" Type="VI" URL="../users/ws_users update current user header.vi"/>
			<Item Name="users save user.vi" Type="VI" URL="../users/users save user.vi"/>
			<Item Name="users format record from POST.vi" Type="VI" URL="../users/users format record from POST.vi"/>
			<Item Name="users format permissions from POST.vi" Type="VI" URL="../users/users format permissions from POST.vi"/>
			<Item Name="User Add.vi" Type="VI" URL="../../../server/database/Users/User Add.vi"/>
			<Item Name="configure restart stub.vi" Type="VI" URL="../configure/configure restart stub.vi"/>
			<Item Name="RawFile (configure restart stub.exe).vi" Type="VI" URL="../configure/RawFile (configure restart stub.exe).vi"/>
			<Item Name="config get RunAsService.vi" Type="VI" URL="../../../server/server lib/Config/config get RunAsService.vi"/>
			<Item Name="configure write to Spartan INI.vi" Type="VI" URL="../configure/configure write to Spartan INI.vi"/>
			<Item Name="Step Association Delete Step.vi" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Delete Step.vi"/>
			<Item Name="Test Function.ctl" Type="VI" URL="../../tests/Test Function.ctl"/>
			<Item Name="Test Function Path.vi" Type="VI" URL="../../tests/Test Function Path.vi"/>
			<Item Name="Templates get www-templates Folder.vi" Type="VI" URL="../../../server/database/Templates/Templates get www-templates Folder.vi"/>
			<Item Name="Step Association Delete Station.vi" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Delete Station.vi"/>
			<Item Name="Step Association Delete Instrument.vi" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Delete Instrument.vi"/>
			<Item Name="Step Association Record.ctl" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Record.ctl"/>
			<Item Name="Step Association Get By Station and Step.vi" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Get By Station and Step.vi"/>
			<Item Name="Step Association Retrieve Record.vi" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Retrieve Record.vi"/>
			<Item Name="runtest read cached instruments.vi" Type="VI" URL="../runtest/runtest read cached instruments.vi"/>
			<Item Name="runtest filter instruments to be used.vi" Type="VI" URL="../runtest/runtest filter instruments to be used.vi"/>
			<Item Name="Step Association Add.vi" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Add.vi"/>
			<Item Name="Step Association Update.vi" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Update.vi"/>
			<Item Name="Step Association Delete.vi" Type="VI" URL="../../../server/database/Stations/Step Associations/Step Association Delete.vi"/>
			<Item Name="ws_configure template keys.vi" Type="VI" URL="../configure/ws_configure template keys.vi"/>
			<Item Name="ws_about status.vi" Type="VI" URL="../about/ws_about status.vi"/>
			<Item Name="ws Open Application Reference.vi" Type="VI" URL="../_cgi-lib/ws Open Application Reference.vi"/>
			<Item Name="ws Spartan Event Log.vi" Type="VI" URL="../_cgi-lib/ws Spartan Event Log.vi"/>
			<Item Name="ws Application Folder.vi" Type="VI" URL="../_cgi-lib/ws Application Folder.vi"/>
			<Item Name="ws_edittest export sequence.vi" Type="VI" URL="../edittest/ws_edittest export sequence.vi"/>
			<Item Name="ws Temp Folder.vi" Type="VI" URL="../_cgi-lib/ws Temp Folder.vi"/>
			<Item Name="ws Document Root.vi" Type="VI" URL="../_cgi-lib/ws Document Root.vi"/>
			<Item Name="ws_editscenario Export Scenario.vi" Type="VI" URL="../editscenario/ws_editscenario Export Scenario.vi"/>
			<Item Name="configure CONFIG array.vi" Type="VI" URL="../configure/configure CONFIG array.vi"/>
			<Item Name="about get folder size.vi" Type="VI" URL="../about/about get folder size.vi"/>
			<Item Name="about get file size.vi" Type="VI" URL="../about/about get file size.vi"/>
			<Item Name="debugger format results.vi" Type="VI" URL="../debugger/debugger format results.vi"/>
			<Item Name="debugger read current config.vi" Type="VI" URL="../debugger/debugger read current config.vi"/>
			<Item Name="Format and Append Version String.vi" Type="VI" URL="../../../../SI.LIB/Format and Append Version String.vi"/>
			<Item Name="ws_users Template Keys.vi" Type="VI" URL="../users/ws_users Template Keys.vi"/>
			<Item Name="ws_runtest initialize fields.vi" Type="VI" URL="../runtest/ws_runtest initialize fields.vi"/>
			<Item Name="ws_runtest update field value.vi" Type="VI" URL="../runtest/ws_runtest update field value.vi"/>
			<Item Name="ws_configure restart dynamic.vi" Type="VI" URL="../configure/ws_configure restart dynamic.vi"/>
			<Item Name="ws_configure Standalone Stop.vi" Type="VI" URL="../configure/ws_configure Standalone Stop.vi"/>
			<Item Name="ws_authenticate user credentials.vi" Type="VI" URL="../_cgi-lib/ws_authenticate user credentials.vi"/>
			<Item Name="ws_log unsuccesful login.vi" Type="VI" URL="../_cgi-lib/ws_log unsuccesful login.vi"/>
			<Item Name="spEVENTLOG Append Entry.vi" Type="VI" URL="../../../server/errorlog/spEVENTLOG Append Entry.vi"/>
			<Item Name="Step Get By Sequence and Index.vi" Type="VI" URL="../../../server/database/Steps/Step Get By Sequence and Index.vi"/>
			<Item Name="Close Spartan Database.vi" Type="VI" URL="../../../server/database/Close Spartan Database.vi"/>
			<Item Name="Open Spartan Database.vi" Type="VI" URL="../../../server/database/Open Spartan Database.vi"/>
			<Item Name="Open Connection DriverConnect.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Talk/Open Connection DriverConnect.vi"/>
			<Item Name="SQLDriverConnect.vi" Type="VI" URL="../../../../SI.LIB/ODBC/SQL Lib/SQLDriverConnect.vi"/>
			<Item Name="Compact and Repair DB.vi" Type="VI" URL="../../../../SI.LIB/ODBC/Compact and Repair DB.vi"/>
			<Item Name="Path to Connection String.vi" Type="VI" URL="../../../../SI.LIB/ODBC/Path to Connection String.vi"/>
			<Item Name="Data Folder.vi" Type="VI" URL="../../../server/server lib/Data Folder.vi"/>
			<Item Name="Spartan CONFIG Global.vi" Type="VI" URL="../../../server/server lib/Spartan CONFIG Global.vi"/>
			<Item Name="Spartan Config.vi" Type="VI" URL="../../../server/server lib/Spartan Config.vi"/>
			<Item Name="Spartan Version.vi" Type="VI" URL="../../../server/server lib/Spartan Version.vi"/>
			<Item Name="debugger Parse Query String.vi" Type="VI" URL="../debugger/debugger Parse Query String.vi"/>
			<Item Name="debugger Index Files.vi" Type="VI" URL="../debugger/debugger Index Files.vi"/>
			<Item Name="DIAdem Scripts Folder.vi" Type="VI" URL="../../../server/DIAdem/DIAdem Scripts Folder.vi"/>
			<Item Name="Datasheet Plot Styles.vi" Type="VI" URL="../../../server/DIAdem/Datasheet/Datasheet Plot Styles.vi"/>
			<Item Name="Datasheet Generator Settings.ctl" Type="VI" URL="../../../server/DIAdem/Datasheet/Datasheet Generator Settings.ctl"/>
			<Item Name="Datasheet Generate (Dynamic).vi" Type="VI" URL="../../../server/DIAdem/Datasheet/Datasheet Generate (Dynamic).vi"/>
			<Item Name="Datasheet Report Info.ctl" Type="VI" URL="../../../server/DIAdem/Datasheet/Datasheet Report Info.ctl"/>
			<Item Name="Datasheet Inputs.ctl" Type="VI" URL="../../../server/DIAdem/Datasheet/Datasheet Inputs.ctl"/>
			<Item Name="Datasheet Outputs.ctl" Type="VI" URL="../../../server/DIAdem/Datasheet/Datasheet Outputs.ctl"/>
			<Item Name="DIAdem Daemon Script Type.ctl" Type="VI" URL="../../../server/DIAdem/lib/DIAdem Daemon Script Type.ctl"/>
			<Item Name="DIAdem Daemon Queue.ctl" Type="VI" URL="../../../server/DIAdem/lib/DIAdem Daemon Queue.ctl"/>
			<Item Name="DIAdem Enqueue Request.vi" Type="VI" URL="../../../server/DIAdem/lib/DIAdem Enqueue Request.vi"/>
			<Item Name="DIAdem Wait For Response.vi" Type="VI" URL="../../../server/DIAdem/lib/DIAdem Wait For Response.vi"/>
			<Item Name="TDMS Close Retry.vi" Type="VI" URL="../../../server/TDMS/TDMS Close Retry.vi"/>
			<Item Name="TDMS Delete Retry.vi" Type="VI" URL="../../../server/TDMS/TDMS Delete Retry.vi"/>
			<Item Name="TDMS Write Data.vi" Type="VI" URL="../../../server/TDMS/TDMS Write Data.vi"/>
			<Item Name="TDMS Timing.ctl" Type="VI" URL="../../../server/TDMS/TDMS Timing.ctl"/>
			<Item Name="TDMS Write Group Data.vi" Type="VI" URL="../../../server/TDMS/TDMS Write Group Data.vi"/>
			<Item Name="TDMS Remove Redundant System Fields From Group.vi" Type="VI" URL="../../../server/TDMS/TDMS Remove Redundant System Fields From Group.vi"/>
			<Item Name="TDMS Strip Illegal Characters.vi" Type="VI" URL="../../../server/TDMS/TDMS Strip Illegal Characters.vi"/>
			<Item Name="TDMS Write Channel Data.vi" Type="VI" URL="../../../server/TDMS/TDMS Write Channel Data.vi"/>
			<Item Name="TDMS Open.vi" Type="VI" URL="../../../server/TDMS/TDMS Open.vi"/>
			<Item Name="TDMS Find Property.vi" Type="VI" URL="../../../server/TDMS/TDMS Find Property.vi"/>
			<Item Name="TDMS Open Retry.vi" Type="VI" URL="../../../server/TDMS/TDMS Open Retry.vi"/>
			<Item Name="TDMS Filename.vi" Type="VI" URL="../../../server/TDMS/TDMS Filename.vi"/>
			<Item Name="TDMS SN MN Escape Characters.vi" Type="VI" URL="../../../server/TDMS/TDMS SN MN Escape Characters.vi"/>
			<Item Name="TDMS Delete Group.vi" Type="VI" URL="../../../server/TDMS/TDMS Delete Group.vi"/>
			<Item Name="TDMS Index File.vi" Type="VI" URL="../../../server/TDMS/TDMS Index File.vi"/>
			<Item Name="CGI Script Parameters.ctl" Type="VI" URL="../../../server/DIAdem/Datasheet/CGI Script Parameters.ctl"/>
			<Item Name="DIAdem Request Script.vi" Type="VI" URL="../../../server/DIAdem/lib/DIAdem Request Script.vi"/>
			<Item Name="DIAdem Query Queue.ctl" Type="VI" URL="../../../server/DIAdem/lib/DIAdem Query Queue.ctl"/>
			<Item Name="DIAdem Request Query.vi" Type="VI" URL="../../../server/DIAdem/lib/DIAdem Request Query.vi"/>
			<Item Name="Fields Get All Indexed.vi" Type="VI" URL="../../../server/database/Fields/Fields Get All Indexed.vi"/>
			<Item Name="templates make field PI.vi" Type="VI" URL="../templates/templates make field PI.vi"/>
			<Item Name="TDMS Release File.vi" Type="VI" URL="../../../server/TDMS/TDMS Release File.vi"/>
			<Item Name="TDMS Lock File.vi" Type="VI" URL="../../../server/TDMS/TDMS Lock File.vi"/>
			<Item Name="TDMS Read.vi" Type="VI" URL="../../../server/TDMS/TDMS Read.vi"/>
			<Item Name="TDMS File.ctl" Type="VI" URL="../../../server/TDMS/TDMS File.ctl"/>
			<Item Name="TDMS Run.ctl" Type="VI" URL="../../../server/TDMS/TDMS Run.ctl"/>
			<Item Name="TDMS Channel (Sxx).ctl" Type="VI" URL="../../../server/TDMS/TDMS Channel (Sxx).ctl"/>
			<Item Name="TDMS Delete NULL Strings from array.vi" Type="VI" URL="../../../server/TDMS/TDMS Delete NULL Strings from array.vi"/>
			<Item Name="TDMS Read Property Value (String).vi" Type="VI" URL="../../../server/TDMS/TDMS Read Property Value (String).vi"/>
			<Item Name="TDMS Read Channel Custom Fields.vi" Type="VI" URL="../../../server/TDMS/TDMS Read Channel Custom Fields.vi"/>
			<Item Name="runtest Add Data to Runtest Queue.vi" Type="VI" URL="../runtest/runtest Add Data to Runtest Queue.vi"/>
			<Item Name="runtest Queue.ctl" Type="VI" URL="../runtest/runtest Queue.ctl"/>
			<Item Name="DataFinder Name.vi" Type="VI" URL="../../../server/DataFinder/DataFinder Name.vi"/>
			<Item Name="Public Application Data Folder.vi" Type="VI" URL="../../../server/server lib/Public Application Data Folder.vi"/>
			<Item Name="Fields Query.vi" Type="VI" URL="../../../server/database/Fields/Fields Query.vi"/>
			<Item Name="Temp Folder.vi" Type="VI" URL="../../../server/server lib/Temp Folder.vi"/>
		</Item>
		<Item Name="Build Specifications" Type="Build">
			<Item Name="about" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{310388AA-275D-40E4-A7DA-D8D1201F95E9}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">about</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{5433DBEC-E387-4B8B-930E-324525D397A1}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">about.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">about.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">about.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{FF1C882D-8363-4225-95C4-D33FBFF6E1E0}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[1].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[1].type" Type="Str">RESTfulVI</Property>
				<Property Name="SourceCount" Type="Int">2</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">about.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="client" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{FF8C90C8-4C12-49AA-A4C1-A34C28690CAC}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">client</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{F3E2051E-BEA2-47B5-B379-D3D5F2399FB2}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">client.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">client.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">client.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[3].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[3].type" Type="Str">RESTfulVI</Property>
				<Property Name="SourceCount" Type="Int">4</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">client.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="configure" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{3B41B19F-4A49-4786-87D9-01379B718627}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">configure</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{066A94EB-8380-4B44-BF06-8F5AA6B7C841}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">configure.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">configure.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">configure.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[4].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[4].type" Type="Str">RESTfulVI</Property>
				<Property Name="SourceCount" Type="Int">5</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">configure.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="content" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{CD355199-954A-4C36-A06D-87AC9982A19C}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">content</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{E96B2FA8-2EED-4943-B5FB-C6D0583FF0F8}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">content.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">content.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">content.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[5].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[5].type" Type="Str">RESTfulVI</Property>
				<Property Name="SourceCount" Type="Int">6</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">content.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="debugger" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{8CF1DDA9-5A9C-43C4-A5BD-6D3A06DB3402}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">debugger</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{3E3951B3-60D8-4FEF-8D8F-DFCAD9701CC6}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">debugger.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">debugger.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">debugger.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[6].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[6].type" Type="Str">RESTfulVI</Property>
				<Property Name="SourceCount" Type="Int">7</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">debugger.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="editscenario" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{9C6752AD-E8A6-4359-AFE3-D6519D8B7B53}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">editscenario</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{1F29A7A4-3D76-4956-9281-B4174672BBC6}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">editscenario.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">editscenario.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">editscenario.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[7].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[7].type" Type="Str">RESTfulVI</Property>
				<Property Name="SourceCount" Type="Int">8</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">editscenario.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="edittest" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{0CF76885-8F26-4C50-A418-6EC674A98A76}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">edittest</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{F9477007-E656-42F6-9963-8D7369EFA570}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">edittest.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">edittest.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">edittest.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[8].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[8].type" Type="Str">RESTfulVI</Property>
				<Property Name="SourceCount" Type="Int">9</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">edittest.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="eventlog" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{6D5F2507-8F46-419B-8489-3F6B4320329E}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">eventlog</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{DCC9A1CB-09F6-4035-9801-29EB380E368B}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">eventlog.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">eventlog.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">eventlog.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[9].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[9].type" Type="Str">RESTfulVI</Property>
				<Property Name="SourceCount" Type="Int">10</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">eventlog.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="fields" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{D051CB9B-991E-4847-8C59-99941DC5AE2C}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">fields</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{46B6797C-86B1-4AFE-A46D-0E2E9BCF7DC9}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">fields.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">fields.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">fields.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[10].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[10].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">11</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">fields.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="logout" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{B699568C-6170-44A1-883A-4E9C16EBCD46}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">logout</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{33AF75A3-A17B-42EC-8798-C859AA082D7B}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">logout.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">logout.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">logout.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].type" Type="Str">VI</Property>
				<Property Name="Source[11].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[11].itemID" Type="Ref">/My Computer/logout.vi</Property>
				<Property Name="Source[11].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[11].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[11].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">12</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">logout.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="mining" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{75A64886-B945-4F3D-8304-001F4535014C}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">mining</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{60690AC1-B805-4803-9592-C779E983CD75}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">mining.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">mining.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">mining.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].type" Type="Str">VI</Property>
				<Property Name="Source[11].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[11].itemID" Type="Ref">/My Computer/logout.vi</Property>
				<Property Name="Source[11].type" Type="Str">VI</Property>
				<Property Name="Source[12].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[12].itemID" Type="Ref">/My Computer/mining.vi</Property>
				<Property Name="Source[12].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[12].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[12].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">13</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">mining.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="runscenario" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{20CED85B-4B21-4BE4-9082-54D03B3263AA}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">runscenario</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{62D8EFA6-B5DB-4E11-94D4-9615175A06D9}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">runscenario.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">runscenario.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">runscenario.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].type" Type="Str">VI</Property>
				<Property Name="Source[11].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[11].itemID" Type="Ref">/My Computer/logout.vi</Property>
				<Property Name="Source[11].type" Type="Str">VI</Property>
				<Property Name="Source[12].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[12].itemID" Type="Ref">/My Computer/mining.vi</Property>
				<Property Name="Source[12].type" Type="Str">VI</Property>
				<Property Name="Source[13].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[13].itemID" Type="Ref">/My Computer/runscenario.vi</Property>
				<Property Name="Source[13].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[13].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[13].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">14</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">runscenario.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="runtest" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{B0B0CC43-F0A0-4AF3-BA20-60DB5B4423F9}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">runtest</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{0FFB66EA-FF48-44F3-82C7-D5FB7A066FBB}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">runtest.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">runtest.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">runtest.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].type" Type="Str">VI</Property>
				<Property Name="Source[11].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[11].itemID" Type="Ref">/My Computer/logout.vi</Property>
				<Property Name="Source[11].type" Type="Str">VI</Property>
				<Property Name="Source[12].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[12].itemID" Type="Ref">/My Computer/mining.vi</Property>
				<Property Name="Source[12].type" Type="Str">VI</Property>
				<Property Name="Source[13].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[13].itemID" Type="Ref">/My Computer/runscenario.vi</Property>
				<Property Name="Source[13].type" Type="Str">VI</Property>
				<Property Name="Source[14].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[14].itemID" Type="Ref">/My Computer/runtest.vi</Property>
				<Property Name="Source[14].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[14].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[14].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">15</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">runtest.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="stations" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{9CF5933B-C5F1-4A32-8BC3-2A70A5DB01FF}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">stations</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{5EAB494C-1AD9-437D-8ACF-12C11139BC41}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">stations.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">stations.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">stations.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].type" Type="Str">VI</Property>
				<Property Name="Source[11].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[11].itemID" Type="Ref">/My Computer/logout.vi</Property>
				<Property Name="Source[11].type" Type="Str">VI</Property>
				<Property Name="Source[12].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[12].itemID" Type="Ref">/My Computer/mining.vi</Property>
				<Property Name="Source[12].type" Type="Str">VI</Property>
				<Property Name="Source[13].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[13].itemID" Type="Ref">/My Computer/runscenario.vi</Property>
				<Property Name="Source[13].type" Type="Str">VI</Property>
				<Property Name="Source[14].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[14].itemID" Type="Ref">/My Computer/runtest.vi</Property>
				<Property Name="Source[14].type" Type="Str">VI</Property>
				<Property Name="Source[15].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[15].itemID" Type="Ref">/My Computer/stations.vi</Property>
				<Property Name="Source[15].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[15].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[15].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">16</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">stations.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="templates" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{03BD9AFA-6CC9-49D5-B3E0-BCA37010EA4E}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">templates</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{49CC5614-CEC1-4DF0-8810-B88BADDF9EC9}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">templates.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">templates.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">templates.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].type" Type="Str">VI</Property>
				<Property Name="Source[11].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[11].itemID" Type="Ref">/My Computer/logout.vi</Property>
				<Property Name="Source[11].type" Type="Str">VI</Property>
				<Property Name="Source[12].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[12].itemID" Type="Ref">/My Computer/mining.vi</Property>
				<Property Name="Source[12].type" Type="Str">VI</Property>
				<Property Name="Source[13].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[13].itemID" Type="Ref">/My Computer/runscenario.vi</Property>
				<Property Name="Source[13].type" Type="Str">VI</Property>
				<Property Name="Source[14].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[14].itemID" Type="Ref">/My Computer/runtest.vi</Property>
				<Property Name="Source[14].type" Type="Str">VI</Property>
				<Property Name="Source[15].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[15].itemID" Type="Ref">/My Computer/stations.vi</Property>
				<Property Name="Source[15].type" Type="Str">VI</Property>
				<Property Name="Source[16].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[16].itemID" Type="Ref"></Property>
				<Property Name="Source[16].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[16].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[16].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">17</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">templates.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="testing" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{E27DF973-7213-4272-AA09-9A3955EF637E}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">testing</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{855336D6-5938-4B6C-B16E-C9A65AFAF2BD}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">testing.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">testing.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">testing.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].type" Type="Str">VI</Property>
				<Property Name="Source[11].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[11].itemID" Type="Ref">/My Computer/logout.vi</Property>
				<Property Name="Source[11].type" Type="Str">VI</Property>
				<Property Name="Source[12].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[12].itemID" Type="Ref">/My Computer/mining.vi</Property>
				<Property Name="Source[12].type" Type="Str">VI</Property>
				<Property Name="Source[13].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[13].itemID" Type="Ref">/My Computer/runscenario.vi</Property>
				<Property Name="Source[13].type" Type="Str">VI</Property>
				<Property Name="Source[14].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[14].itemID" Type="Ref">/My Computer/runtest.vi</Property>
				<Property Name="Source[14].type" Type="Str">VI</Property>
				<Property Name="Source[15].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[15].itemID" Type="Ref">/My Computer/stations.vi</Property>
				<Property Name="Source[15].type" Type="Str">VI</Property>
				<Property Name="Source[16].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[16].itemID" Type="Ref"></Property>
				<Property Name="Source[16].type" Type="Str">VI</Property>
				<Property Name="Source[17].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[17].itemID" Type="Ref">/My Computer/testing.vi</Property>
				<Property Name="Source[17].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[17].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[17].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">18</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">testing.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
			<Item Name="users" Type="RESTful WS">
				<Property Name="Bld_buildCacheID" Type="Str">{00E93670-828D-47B6-A071-45275318D5D8}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">users</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeTypedefs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{0128E0E1-59C8-4327-8FB8-D25F68D4BA32}</Property>
				<Property Name="Bld_targetDestDir" Type="Path"></Property>
				<Property Name="Destination[0].destName" Type="Str">users.lvws</Property>
				<Property Name="Destination[0].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT/internal.llb</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/C/DEVELOPMENT/SPARTAN BUILT</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[0].VIName" Type="Str">users.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].HTTPMethod" Type="Str">POST</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].template" Type="Str">/</Property>
				<Property Name="RESTfulWebSrvc_routingTemplate[1].VIName" Type="Str">users.vi</Property>
				<Property Name="RESTfulWebSrvc_routingTemplateCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{17D3206B-64C7-4B83-A3E4-38CC2CA1AC35}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/about.vi</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="Source[10].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[10].itemID" Type="Ref">/My Computer/fields.vi</Property>
				<Property Name="Source[10].type" Type="Str">VI</Property>
				<Property Name="Source[11].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[11].itemID" Type="Ref">/My Computer/logout.vi</Property>
				<Property Name="Source[11].type" Type="Str">VI</Property>
				<Property Name="Source[12].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[12].itemID" Type="Ref">/My Computer/mining.vi</Property>
				<Property Name="Source[12].type" Type="Str">VI</Property>
				<Property Name="Source[13].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[13].itemID" Type="Ref">/My Computer/runscenario.vi</Property>
				<Property Name="Source[13].type" Type="Str">VI</Property>
				<Property Name="Source[14].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[14].itemID" Type="Ref">/My Computer/runtest.vi</Property>
				<Property Name="Source[14].type" Type="Str">VI</Property>
				<Property Name="Source[15].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[15].itemID" Type="Ref">/My Computer/stations.vi</Property>
				<Property Name="Source[15].type" Type="Str">VI</Property>
				<Property Name="Source[16].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[16].itemID" Type="Ref"></Property>
				<Property Name="Source[16].type" Type="Str">VI</Property>
				<Property Name="Source[17].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[17].itemID" Type="Ref">/My Computer/testing.vi</Property>
				<Property Name="Source[17].type" Type="Str">VI</Property>
				<Property Name="Source[18].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[18].itemID" Type="Ref">/My Computer/users.vi</Property>
				<Property Name="Source[18].RESTfulVI.VIConfigInfoOutputType" Type="Str">Stream</Property>
				<Property Name="Source[18].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[18].type" Type="Str">RESTfulVI</Property>
				<Property Name="Source[2].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[2].itemID" Type="Ref"></Property>
				<Property Name="Source[2].type" Type="Str">VI</Property>
				<Property Name="Source[3].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[3].itemID" Type="Ref">/My Computer/client.vi</Property>
				<Property Name="Source[3].type" Type="Str">VI</Property>
				<Property Name="Source[4].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[4].itemID" Type="Ref">/My Computer/configure.vi</Property>
				<Property Name="Source[4].type" Type="Str">VI</Property>
				<Property Name="Source[5].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[5].itemID" Type="Ref">/My Computer/content.vi</Property>
				<Property Name="Source[5].type" Type="Str">VI</Property>
				<Property Name="Source[6].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[6].itemID" Type="Ref">/My Computer/debugger.vi</Property>
				<Property Name="Source[6].type" Type="Str">VI</Property>
				<Property Name="Source[7].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[7].itemID" Type="Ref">/My Computer/editscenario.vi</Property>
				<Property Name="Source[7].type" Type="Str">VI</Property>
				<Property Name="Source[8].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[8].itemID" Type="Ref">/My Computer/edittest.vi</Property>
				<Property Name="Source[8].type" Type="Str">VI</Property>
				<Property Name="Source[9].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[9].itemID" Type="Ref">/My Computer/eventlog.vi</Property>
				<Property Name="Source[9].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">19</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{CB1461C6-F554-4C95-A4C2-EA7A89474623}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">users.lvws</Property>
				<Property Name="WebSrvc_standaloneService" Type="Bool">true</Property>
			</Item>
		</Item>
	</Item>
</Project>
