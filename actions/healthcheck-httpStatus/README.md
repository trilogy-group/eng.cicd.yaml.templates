# URL health check action

A cURL-based post-deploy health check with build-in redirect & retry. An quick & easy way to verify a deployment.   

```yaml
steps:
  - name: Check the deployed service URL
    uses: trilogy-group/.github/actions/healthcheck-httpStatus@actions
    with:
      # Check the following URLs one by one sequentially
      url: https://example.com|http://example.com
      # Follow redirects, or just report success on 3xx status codes
      follow-redirect: no # Optional, defaults to "no"
      # Fail this action after this many failed attempts
      max-attempts: 3 # Optional, defaults to 1
      # Delay between retries
      retry-delay: 5s # Optional, only applicable to max-attempts > 1
      # Retry all errors, including 404. This option might trigger curl upgrade.
      retry-all: no # Optional, defaults to "no"
      # timeout. <seconds> Maximum time allowed for connection
      timeout: 30s # Optional, defaults to 30s
```

The action will fail if any of the URLs reports either 4xx or 5xx status codes.
