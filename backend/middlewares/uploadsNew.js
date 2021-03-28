// MulterV2 "multer": "^2.0.0-rc.1" This version is best 
import express from "express";
const router = express.Router();
import upload from "../Middlewares/upload.js";

import fs from "fs";
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);

import path from "path";
const __dirname = path.resolve();

const file = async (req, res, next) => {
  // console.log(req.file);
  const {file, body} = req;
  if (file.detectedFileExtension != ".jpg") next(new Error("invalid file type"));

  const fileName = Math.floor(Math.random() * 1000) + file.detectedFileExtension;

  await pipeline(file.stream, fs.createWriteStream(`${fileName}`));

  // res.status(200).json({msg: "hello"});
  res.status(200).json(file);
}

router.route("/").post(upload.single("image") , file);

export default router;
