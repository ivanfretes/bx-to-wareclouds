const { Storage } = require("@google-cloud/storage");
const path = require("path");

const CloudStorageSrv = {
   gcs = () => {
   const storage = new Storage({
      keyFilename: path.join(
         __dirname,
         "../config/starry-diode-317714-4edcb2412af0.json"
      ),
      projectId: "starry-diode-317714",
   });
   const bucketName = "warecloud_bucked_01";
   return storage;
},
uploadFile = () => {
   this.gcs();
   /*storage.getBuckets().then((res) => {
      console.log(res);
   });*/
}
};


module.exports = CloudStorageSrv;
