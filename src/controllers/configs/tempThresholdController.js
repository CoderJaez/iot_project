const { monngoose, default: mongoose } = require("mongoose");
const { TempThreshold } = require("../../models/tempThreshold");
const { TryCatch } = require("../../utils/tryCatch");

module.exports = {
  insertThreshold: TryCatch(async (req, res) => {
    const { name, label, value } = req.body;
    let tresholdTemp = new TempThreshold({
      name: name,
      label: label.toUpperCase(),
      value: value,
    });

    tresholdTemp = await tresholdTemp.save();
    if (!tresholdTemp)
      return res
        .status(500)
        .json({ success: false, message: "Temperature threshold error" });

    return res
      .status(200)
      .json({ success: true, message: "Temperature threshold registered." });
  }),
  getThreshold: TryCatch(async (req, res) => {
    const { id } = req.params;

    let tempThresholds;

    if (mongoose.isValidObjectId(id))
      tempThresholds = await TempThreshold.findById(id);
    else tempThresholds = await TempThreshold.find();
    if (!tempThresholds)
      return res
        .status(401)
        .json({ success: false, message: "Temperature threshold not found." });

    return res.status(200).json(tempThresholds);
  }),

  putThreshold: TryCatch(async (req, res) => {
    const { name, label, value } = req.body;
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id))
      return res.status(500).json({ success: false, message: "Invalid Id" });

    const tempThreshold = await TempThreshold.findByIdAndUpdate(id, {
      name: name,
      label: label.toUpperCase(),
      value: value,
    });

    if (!tempThreshold)
      return res.status(401).json({
        success: false,
        message: "Temperature threshold cannot be updated",
      });

    return res
      .status(200)
      .json({ success: true, message: "Temperature threshold updated" });
  }),
  deleteThreshold: TryCatch(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id))
      return res.status(500).json({ success: false, message: "Invalid id" });
    const tempThreshold = await TempThreshold.findByIdAndDelete(id);
    if (!tempThreshold)
      return res.status(401).json({
        success: false,
        message: "Temperature threshold cannot be deleted.",
      });
    return res
      .status(200)
      .json({ success: true, message: "Temperature threshold deleted" });
  }),
};
