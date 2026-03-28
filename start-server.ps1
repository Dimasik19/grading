$port = 8000

Write-Host "Starting local server in $(Get-Location) on port $port..." -ForegroundColor Cyan
Write-Host "Open: http://localhost:$port/grading.html" -ForegroundColor Green

python -m http.server $port
