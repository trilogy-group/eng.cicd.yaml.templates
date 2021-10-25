
import * as core from "@actions/core";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates Amazon S3 service client module.


const s3BucketString = core.getInput("bucket-names", { required: true });
const s3Buckets = s3BucketString.split("|");

// Create and upload the object to the specified Amazon S3 bucket.
async function run() {
    for (const s3Bucket of s3Buckets) {
      process.env.CURRENT_BUCKET = s3Bucket;
      const bucketParams = {
        Bucket: s3Bucket,
        Key: "healthcheck.txt",
        // Content of the new object.
        Body: "Healtcheck successful. This file can be deleted",
      };
      const data = await s3Client.send(new PutObjectCommand(bucketParams));
      // return data
      core.info(bucketParams.Bucket + " Success");
      console.log(
        "Successfully uploaded object: " +
          bucketParams.Bucket +
          "/" +
          bucketParams.Key
      );
    };
};
run().catch((e) => {
  console.log("Error", e);
  core.setFailed(e.message + ". Failed to upload file to: " + process.env.CURRENT_BUCKET);
});
