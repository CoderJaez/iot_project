const { mongoose } = require("mongoose");
const { TryCatch } = require("../utils/tryCatch");
const { Reading } = require("../models/reading");
module.exports = {
  insertReading: TryCatch(async (req, res) => {
    const { temperature, ammonia, device } = req.body;
    let reading = new Reading({
      temperature: temperature,
      ammonia: ammonia,
      device: device,
    });

    reading = await reading.save();
    if (!reading)
      return res
        .status(401)
        .json({ success: false, message: "Error saving readings." });

    return res
      .status(200)
      .json({ success: true, message: "New reading registered." });
  }),

  getReading: TryCatch(async (req, res) => {
    const id = req.params.id;
    let readings;
    if (mongoose.isValidObjectId(id)) readings = await Reading.findById(id);
    else readings = await Reading.find().sort({ dateCreated: -1 });
    if (!readings)
      return res.status(401).json({ message: "Readings not found" });
    return res.status(200).json(readings);
  }),
};
