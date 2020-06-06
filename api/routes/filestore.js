const express = require("express");
const router = express.Router();
const { Readable } = require("stream");
const multer = require("multer");

router.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const readStream = req.gfs
    .createReadStream({ filename })
    .on("error", err => res.send(err));
  readStream.pipe(res);
});

router.post("/", (req, res) => {
  const upload = multer({});
  upload.single("file")(req, res, err => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload Request Validation Failed" });
    } else if (!req.body.name) {
      return res.status(400).json({ message: "No name in request body" });
    }

    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    readableTrackStream
      .pipe(
        req.gfs.createWriteStream({
          filename: req.body.name
        })
      )
      .on("error", err => res.send(err))
      .on("finish", () => {
        res.send("Success!");
      });
  });
});

module.exports = router;
