ECHO OFF
CLS
ECHO Installing DIAdem 2012...
ECHO OFF
"%~dp0\DIAdem\setup.exe" /qf /acceptLicenses yes /r:n /disableNotificationCheck
ECHO Installing Spartan QMS...
"%~dp0\Volume\setup.exe"
ECHO OFF