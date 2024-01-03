// Amazon Web Services S3 (Simple Storage Service) utility functions
const AWS = require("aws-sdk");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

// Get user's file list from S3
const fetchFileList = async (username) => {
  // Initialize AWS S3 client
  AWS.config.update({
    accessKeyId: process.env.AMAZON_S3_IAM_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_S3_IAM_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new AWS.S3();
  
  const params = {
    Bucket: process.env.AMAZON_S3_BUCKET,
    Prefix: `${username}/`,
  };

  try {
    // Get list of files from S3
    const data = await s3.listObjectsV2(params).promise();
    // Extract file names from the S3 response
    const fileList = data.Contents.map((item) =>
      item.Key.replace(`${username}/`, "")
    );
    return fileList;
  } catch (error) {
    console.error("Error fetching file list from S3:", error);
    throw error;
  }
};

// Generate pre-signed URL for file download
const generatePresignedUrl = async (username, fileName) => {
  // Initialize AWS S3 client
  AWS.config.update({
    accessKeyId: process.env.AMAZON_S3_IAM_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_S3_IAM_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.AMAZON_S3_BUCKET,
    Key: `${username}/${fileName}`,
    Expires: 7200,
    ResponseContentDisposition: `attachment; filename="${fileName}"`,
  };

  try {
    // Generate pre-signed URL
    const url = await s3.getSignedUrlPromise("getObject", params);
    return url;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw error;
  }
};

// Delete file from S3
const deleteFile = async (username, fileName) => {
  // Initialize AWS S3 client
  AWS.config.update({
    accessKeyId: process.env.AMAZON_S3_IAM_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_S3_IAM_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.AMAZON_S3_BUCKET,
    Key: `${username}/${fileName}`,
  };

  try {
    // Delete file from S3
    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error("[awsS3.js]: Error deleting file from S3:", error);
    throw error;
  }
};

module.exports = { fetchFileList, generatePresignedUrl, deleteFile };
