# Create banners directory if it doesn't exist
$bannerDir = "src/data/art/banners"
if (-not (Test-Path $bannerDir)) {
    New-Item -ItemType Directory -Path $bannerDir -Force
}

# Function to download and process an image
function Process-Banner {
    param (
        [string]$url,
        [string]$outputPath
    )
    
    Write-Host "Downloading $outputPath..."
    
    # Download the image
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath
        Write-Host "Successfully downloaded $outputPath"
    }
    catch {
        Write-Host "Failed to download $outputPath"
    }
}

# Image URLs (replace these with actual URLs)
$bannerUrls = @{
    "ancient-library.jpg" = "https://www.dndspeak.com/wp-content/uploads/2021/04/Library-1.jpg"
    "crystal-caverns.jpg" = "https://static.wikia.nocookie.net/sonics-world/images/d/dd/Otherworld_crystal_cave_by_firedudewraith-d6chey7.jpg"
    "abandoned-mine.jpg" = "https://thundercloud-studio.com/wp-content/uploads/2024/03/Main_Image-1.jpeg"
    "dragon-lair.jpg" = "https://images5.alphacoders.com/976/976897.jpg"
    "elven-ruins.jpg" = "https://i.pinimg.com/736x/5d/31/06/5d31064659ced567b222ef4c347207ab.jpg"
    "dwarven-forge.jpg" = "https://cdna.artstation.com/p/assets/images/images/056/388/536/large/scale-xyz-04.jpg"
    "necromancer-tower.jpg" = "https://cdna.artstation.com/p/assets/images/images/072/294/960/large/xing-yao-xingyao-necromancers-tower-concept-final.jpg"
}

# Download each banner
foreach ($banner in $bannerUrls.GetEnumerator()) {
    $outputPath = Join-Path $bannerDir $banner.Key
    Process-Banner -url $banner.Value -outputPath $outputPath
}

Write-Host "`nDownload complete!`n"

# Check if ImageMagick is installed
$magickPath = "magick"
try {
    $null = Get-Command $magickPath -ErrorAction Stop
    Write-Host "ImageMagick is installed. Processing images..."
    
    # Process each downloaded image
    Get-ChildItem $bannerDir -Filter "*.jpg" | ForEach-Object {
        $inputPath = $_.FullName
        $outputPath = $inputPath
        
        # Resize to 1200x300 while maintaining aspect ratio
        & $magickPath $inputPath -resize "1200x300^" -gravity center -extent "1200x300" $outputPath
        
        # Optimize for web
        & $magickPath $outputPath -strip -quality 85 $outputPath
        
        Write-Host "Processed $($_.Name)"
    }
    
    Write-Host "`nImage processing complete!"
}
catch {
    Write-Host "`nImageMagick not found. Please install ImageMagick to process the images."
    Write-Host "You can download it from: https://imagemagick.org/script/download.php"
    Write-Host "After installing, run this script again to process the images."
} 