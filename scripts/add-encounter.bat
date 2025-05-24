@echo off
setlocal enabledelayedexpansion

REM Check if all parameters are provided
if "%~1"=="" (
    echo Please provide a dungeon name (neverwinter, luskan, helms-hold, or illusk)
    exit /b 1
)
if "%~2"=="" (
    echo Please provide a challenge rating (1-20)
    exit /b 1
)
if "%~3"=="" (
    echo Please provide number of encounters to generate (1-10)
    exit /b 1
)

set DUNGEON=%~1
set CHALLENGE_RATING=%~2
set NUM_ENCOUNTERS=%~3
set TARGET_FILE=src/data/dungeon-encounters/%DUNGEON%.ts
set ENCOUNTERS_FILE=src/data/dungeon-encounters/level-encounters.ts

REM Set the correct location.dungeon value for each dungeon
if /I "%DUNGEON%"=="neverwinter" set LOCATION_DUNGEON="Neverwinter Wood Ruins"
if /I "%DUNGEON%"=="luskan" set LOCATION_DUNGEON="Hosttower Ruins"
if /I "%DUNGEON%"=="helms-hold" set LOCATION_DUNGEON="Temple Crypts"
if /I "%DUNGEON%"=="illusk" set LOCATION_DUNGEON="Ancient Library"

REM Check if files exist
if not exist "%TARGET_FILE%" (
    echo Dungeon file not found: %TARGET_FILE%
    exit /b 1
)
if not exist "%ENCOUNTERS_FILE%" (
    echo Encounters file not found: %ENCOUNTERS_FILE%
    exit /b 1
)

REM Create a temporary file with the header
echo import { DungeonEncounter } from '../../types/dungeon-encounter' > temp_encounter.ts
echo. >> temp_encounter.ts
echo export const %DUNGEON%Encounters: DungeonEncounter[] = [ >> temp_encounter.ts

REM Read the encounters file and extract encounters for the specified level
set "FOUND_ENCOUNTERS=0"
set "IN_LEVEL=0"
for /f "tokens=*" %%a in ('type "%ENCOUNTERS_FILE%" ^| findstr /n "^"') do (
    set "LINE=%%a"
    set "LINE=!LINE:*:=!"
    
    REM Look for the level section
    if "!LINE!"=="  %CHALLENGE_RATING%: [" set "IN_LEVEL=1"
    if "!IN_LEVEL!"=="1" (
        REM Skip the opening bracket
        if not "!LINE!"=="  %CHALLENGE_RATING%: [" (
            REM Check if we've reached the end of the level's encounters
            if "!LINE!"=="  ]," set "IN_LEVEL=0"
            if not "!LINE!"=="  ]," (
                REM Replace location.dungeon with the correct value
                set "MODIFIED_LINE=!LINE!"
                echo !MODIFIED_LINE! | findstr /C:"location: {" >nul
                if !errorlevel! == 0 (
                    set "IN_LOCATION=1"
                )
                if defined IN_LOCATION (
                    echo !MODIFIED_LINE! | findstr /C:"dungeon:" >nul
                    if !errorlevel! == 0 (
                        echo         dungeon: %LOCATION_DUNGEON%, >> temp_encounter.ts
                        set "IN_LOCATION="
                    ) else (
                        echo !MODIFIED_LINE! >> temp_encounter.ts
                    )
                ) else (
                    echo !MODIFIED_LINE! >> temp_encounter.ts
                )
                set /a FOUND_ENCOUNTERS+=1
                if !FOUND_ENCOUNTERS! lss %NUM_ENCOUNTERS% (
                    echo , >> temp_encounter.ts
                )
                if !FOUND_ENCOUNTERS! geq %NUM_ENCOUNTERS% (
                    goto :done
                )
            )
        )
    )
)

:done
echo ] >> temp_encounter.ts

REM Replace the target file with the new content
move /y temp_encounter.ts "%TARGET_FILE%"

echo Added %FOUND_ENCOUNTERS% CR %CHALLENGE_RATING% encounters to %DUNGEON% 