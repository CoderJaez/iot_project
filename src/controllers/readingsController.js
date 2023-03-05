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
    const filter = req.query ? req.query : {};
    let readings;
    if (mongoose.isValidObjectId(id)) readings = await Reading.findById(id);
    else readings = await Reading.find(filter).sort({ dateCreated: -1 });
    if (!readings)
      return res.status(401).json({ message: "Readings not found" });
    return res.status(200).json(readings);
  }),
  updateReading: TryCatch(async (req, res) => {
    const id = req.params.id;
    const { temperature, ammonia, device } = req.body;

    if (!mongoose.isValidObjectId(id))
      return res
        .status(401)
        .json({ success: false, message: "Invalid Id. Please try again" });

    const reading = await Reading.findByIdAndUpdate(id, {
      temperature: temperature,
      ammonia: ammonia,
      device: device,
    });

    if (!reading)
      return res
        .status(500)
        .json({ success: false, message: "Reading cannot be update" });

    return res
      .status(200)
      .json({ success: true, message: "Reading successfully updated" });
  }),

  deleteReading: TryCatch(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id))
      return res.status(200).json({ success: false, message: "Invaid id." });

    const reading = await Reading.findByIdAndDelete(id);

    if (!reading)
      return res
        .status(500)
        .json({ success: false, message: "Reading cannot be deleted" });

    return res
      .status(200)
      .json({ success: true, message: "Reading succesfully deleted" });
  }),
};
