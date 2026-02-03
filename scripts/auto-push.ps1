param(
  [int]$IntervalSeconds = 5,
  [string]$Remote = "origin",
  [string]$Branch = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-CurrentBranch {
  try {
    $branchName = git rev-parse --abbrev-ref HEAD 2>$null
    if ($branchName -eq "HEAD" -or [string]::IsNullOrWhiteSpace($branchName)) {
      return $null
    }
    return $branchName.Trim()
  } catch {
    return $null
  }
}

while ($true) {
  $status = git status --porcelain
  if (-not [string]::IsNullOrWhiteSpace($status)) {
    git add -A | Out-Null
    $message = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    try {
      git commit -m $message | Out-Null
    } catch {
      # No changes to commit or commit failed; continue
    }

    $branchToPush = $Branch
    if ([string]::IsNullOrWhiteSpace($branchToPush)) {
      $branchToPush = Get-CurrentBranch
    }

    if ($branchToPush) {
      try {
        git push $Remote $branchToPush | Out-Null
      } catch {
        # Ignore push failures; will retry on next change
      }
    }
  }

  Start-Sleep -Seconds $IntervalSeconds
}
