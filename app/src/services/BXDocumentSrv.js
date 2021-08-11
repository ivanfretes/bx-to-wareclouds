const { parseString } = require("xml2js");
const pdf = require("html-pdf");
const path = require("path");
const nunjucks = require("nunjucks");
const { toBuffer } = require("bwip-js");
const CloudStorageSrv = require("./CloudStorageSrv");

const BXDocumentSrv = {
   /**
    * Convert the xml String to JSON labels
    * @param {*} string
    * @returns
    */
   xmlToLabels(string) {
      let jsonDoc;
      parseString(string, { mergeAttrs: true }, (err, result) => {
         jsonDoc = JSON.stringify(result);
      });
      const labels = JSON.parse(jsonDoc);
      return labels.datosImpresionTOList.datosImpresionTO;
   },

   /**
    * Send all packages (by all labels)
    * @param {*} labels
    * @returns
    */
   pdfCreate(labels) {
      try {
         const template = nunjucks.render(
            path.join(__dirname, "../public/os-template.tmpl.html"),
            {
               labels,
            }
         );

         return pdf.create(template, {
            format: "Letter",
            orientation: "landscape",
            border: "5px",
         });
      } catch (error) {
         console.log(error);
      }
   },

   /**
    * Generate the pdf document
    * @param {Response} res
    * @param {OrderLabel} orderLabels
    */
   async generateDocument(res, orderLabels) {
      const labels = [];
      const fileName = `${orderLabels[0].id_warecloud}_${orderLabels[0].tracking_code}`;

      for (let index = 0; index < orderLabels.length; index++) {
         const oLabel = orderLabels[index];
         const labelBx = JSON.parse(oLabel.label_raw);

         //Fist code
         const buffer1 = await toBuffer({
            bcid: "code128",
            text: labelBx.cbl28[0],
            scale: 3,
            height: 17,
            includetext: true,
         });
         const barcode1 = `data:image/gif;base64,${buffer1.toString("base64")}`;

         // Second code
         const buffer2 = await toBuffer({
            bcid: "code128",
            text: oLabel.tracking_code.toString(),
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: "center",
         });
         const barcode2 = `data:image/gif;base64,${buffer2.toString("base64")}`;

         // third code
         const buffer3 = await toBuffer({
            bcid: "pdf417",
            text: labelBx.pdf417_cb2d_os[0],
            scale: 3,
            height: 27,
         });
         const barcode3 = `data:image/gif;base64,${buffer3.toString("base64")}`;

         labels[index] = {
            ...oLabel,
            labelBx,
            barcode1,
            barcode2,
            barcode3,
         };
      }

      BXDocumentSrv.pdfCreate(labels).toStream((err, stream) => {
         if (err) return res.send(err);
         //res.type("pdf");
         //stream.pipe(res);

         // Send the stream to google cloud storagte
         const gcSrv = new CloudStorageSrv();
         stream.pipe(
            gcSrv.gcFile(`${process.env.WC_GCS_PDF_PATH}/${fileName}.pdf`)
         );
      });
   },
};

module.exports = BXDocumentSrv;
