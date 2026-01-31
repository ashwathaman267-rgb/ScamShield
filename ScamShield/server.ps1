$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Server started at http://localhost:$port"
Write-Host "Press Ctrl+C to stop"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    $request = $context.Request
    
    $localPath = Join-Path $PWD $request.Url.LocalPath
    
    # Default to index.html for root or directories
    if ($localPath -match '/$') {
        $localPath = Join-Path $localPath "index.html"
    }
    elseif ((Test-Path $localPath) -and (Get-Item $localPath).PSIsContainer) {
        $localPath = Join-Path $localPath "index.html"
    }

    if (Test-Path $localPath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($localPath)
        $response.ContentLength64 = $content.Length
        
        # Set content type
        $extension = [System.IO.Path]::GetExtension($localPath)
        switch ($extension) {
            ".html" { $response.ContentType = "text/html" }
            ".css" { $response.ContentType = "text/css" }
            ".js" { $response.ContentType = "application/javascript" }
            ".json" { $response.ContentType = "application/json" }
            ".png" { $response.ContentType = "image/png" }
            ".jpg" { $response.ContentType = "image/jpeg" }
            ".svg" { $response.ContentType = "image/svg+xml" }
            Default { $response.ContentType = "application/octet-stream" }
        }
        
        $response.OutputStream.Write($content, 0, $content.Length)
    }
    else {
        # SPA Fallback: If path is not a file (and not found), serve index.html
        # But ensure we don't serve index.html for missing assets (like .js or .png)
        if ($localPath -notmatch '\.(js|css|png|jpg|svg|json|ico)$') {
            $indexPath = Join-Path $PWD "index.html"
            if (Test-Path $indexPath) {
                $content = [System.IO.File]::ReadAllBytes($indexPath)
                $response.ContentLength64 = $content.Length
                $response.ContentType = "text/html"
                $response.OutputStream.Write($content, 0, $content.Length)
            }
            else {
                $response.StatusCode = 404
            }
        }
        else {
            $response.StatusCode = 404
        }
    }
    
    $response.Close()
}
