const { TryCatch } = require("../utils/tryCatch");
const mongoose = require("mongoose");
const { DataStream } = require("../models/dataStream");

module.exports = {
  getDataStream: TryCatch(async (req, res) => {
    const filter = req.query ? req.query : {};
    const id = req.params.id;

    let dataStreams;
    if (mongoose.isValidObjectId(id))
      dataStreams = await DataStream.findById(id).populate("hardware");
    else
      dataStreams = await DataStream.find(filter)
        .sort({
          name: "asc",
        })
        .populate("hardware");

    if (!dataStreams) throw new Error("DataStream not found!");
    return res.status(200).json(dataStreams);
  }),
  insertDataStream: TryCatch(async (req, res) => {
    const { name, default_value, type, hardware } = req.body;

    let dataStream = new DataStream({
      name: name,
      type: type,
      default_value: default_value,
      hardware: hardware,
    });

    dataStream = await dataStream.save();
    if (!dataStream)
      return res
        .status(500)
        .json({ success: false, message: "Error saving data stream" });

    return res
      .status(200)
      .json({ success: true, message: "New data stream registered" });
  }),
  putDataStrem: TryCatch(async (req, res) => {
    const { name, default_value, type, hardware } = req.body;
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: "Invalid Id." });
    const dataStream = await DataStream.findByIdAndUpdate(id, {
      name: name,
      type: type,
      default_value: default_value,
      hardware: hardware,
    });

    if (!dataStream)
      return res
        .status(500)
        .json({ success: false, message: "Data stream cannot be updated" });
    return res
      .status(200)
      .json({ success: true, message: "Data stream successfully updated" });
  }),
  deleteDataStream: TryCatch(async (req, res) => {
    const { id } = req.params;
    await DataStream.findByIdAndRemove(id)
      .then((dataStream) => {
        if (dataStream)
          return res
            .status(200)
            .json({ success: true, message: "Data stream deleted." });
        else
          return res
            .status(404)
            .json({ success: false, message: "Data stream not found." });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, message: err.message });
      });
  }),
};
