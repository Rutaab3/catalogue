$files = Get-ChildItem -Path "c:\Users\Fahad\3D Objects\batch" -Recurse -Filter "*.png"
$total = $files.Count
$current = 0

foreach ($file in $files) {
    $current++
    $inputPath = $file.FullName
    $outputPath = $inputPath.Replace(".png", ".webp")
    
    Write-Host "[$current/$total] Converting: $inputPath"
    
    # Run ffmpeg
    # -y overwrites output
    # -v error suppresses logs except errors
    ffmpeg -i "$inputPath" -c:v libwebp -y -v error "$outputPath"
    
    if (Test-Path "$outputPath") {
        Remove-Item "$inputPath" -Force
    } else {
        Write-Error "Failed to convert $inputPath"
    }
}
Write-Host "Conversion complete."
