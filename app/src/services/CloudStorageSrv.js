const { Storage } = require("@google-cloud/storage");
const path = require("path");

class CloudStorageSrv {
   bucketName = "warecloud_bucked_01";

   constructor() {
      this.storage = new Storage({
         keyFilename: path.join(
            __dirname,
            "../config/starry-diode-317714-4edcb2412af0.json"
         ),
         projectId: "starry-diode-317714",
      });
   }

   uploadFile = () => {
      this.storage.getBuckets().then((res) => {
         console.log(res);
      });
   };
}

module.exports = CloudStorageSrv;
