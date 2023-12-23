require("dotenv").config({ path: "../.env" });

const Transloadit = require("transloadit");

const transloadit = new Transloadit({
  authKey: process.env.TRANSLOADIT_AUTH_KEY,
  authSecret: process.env.TRANSLOADIT_AUTH_SECRET,
});

console.log("Transloadit initialized:", transloadit);

const uploadTransloaditFile = async (fileToUpload) => {
  console.log("In uploadTransloaditFile function!");
  console.log("fileToUpload:", fileToUpload);

  console.log("fileToUpload.name:", fileToUpload.name);
  console.log("fileToUpload.data:", fileToUpload.data);

  try {
    const options = {
      uploads: {
        [fileToUpload.name]: fileToUpload.data,
      },
      params: {
        template_id: process.env.TRANSLOADIT_TEMPLATE_ID,
      },
    };

    const status = await transloadit.createAssembly(options);
    console.log("status:", status);
  } catch (err) {
    console.error("Error in processing assembly.", err);
    if (err.assemblyId) {
      console.error(
        `More info: https://transloadit.com/assemblies/${err.assemblyId}`
      );
    }
  }
};

module.exports = { uploadTransloaditFile };
