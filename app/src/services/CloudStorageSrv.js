const { Storage } = require("@google-cloud/storage");

const CloudStorageSrv = {};

CloudStorageSrv.uploadFile = () => {
   const storage = new Storage({ keyFilename: "key.json" });
   const bucketName = "warecloud_bucked_01";

   async function createBucket() {
      // Creates the new bucket
      await storage.createBucket(bucketName);
      console.log(`Bucket ${bucketName} created.`);
   }
};

module.exports = CloudStorageSrv;
