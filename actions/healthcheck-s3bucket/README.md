# URL health check action

A simple upload to s3 buckets as a healthcheck

```yaml
steps:
  - name: s3 healthcheck
    uses: trilogy-group/.github/actions/healthcheck-s3bucket@actions
    with:
      bucket-name: samplebucket|samplebucket2
```

The action will fail if an upload cannot be performed on the bucket. Make sure the AWS credentials have appropiate permissions and the PutObject action
