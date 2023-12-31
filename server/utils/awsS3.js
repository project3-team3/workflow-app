const AWS = require("aws-sdk");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const fetchFileList = async (username) => {
  console.log("[awsS3.js]: In fetchFileList(). username: ", username);
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
    const data = await s3.listObjectsV2(params).promise();
    console.log("[awsS3.js]: data obtained?", data);
    // Extract file names from the S3 response
    const fileList = data.Contents.map((item) =>
      item.Key.replace(`${username}/`, "")
    );
    console.log("[awsS3.js]: fileList generated?", fileList);
    return fileList;
  } catch (error) {
    console.error("Error fetching file list from S3:", error);
    throw error;
  }
};

const generatePresignedUrl = async (username, fileName) => {
  console.log(
    "[awsS3.js]: In generatePresignedUrl(). username/fileName: ",
    `${username}/${fileName}`
  );
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
    ResponseContentDisposition: `attachment; filename="${fileName}"`, // Add this line
  };

  try {
    const url = await s3.getSignedUrlPromise("getObject", params);
    console.log("[awsS3.js]: url obtained?", url);
    return url;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw error;
  }
};

module.exports = { fetchFileList, generatePresignedUrl };
