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

   /**
    *
    * @param {string} fileName
    * @returns
    */
   gcFile = (fileName) => {
      const file = this.storage.bucket(this.bucketName).file(fileName);
      return file
         .createWriteStream({
            resumable: false,
            validation: false,
            metadata: { "Cache-Control": "public, max-age=31536000" },
         })
         .on("error", (err) => console.log(err))
         .on("finish", () => console.log("good"));
   };
}

module.exports = CloudStorageSrv;
