const { TryCatch } = require("../utils/tryCatch");
const { hardwareModule, HardwareModule } = require("../models/hardwareModule");
const { default: mongoose } = require("mongoose");
module.exports = {
  insertHardwareModule: TryCatch(async (req, res) => {
    const { name } = req.body;

    let hardwareModule = new HardwareModule({
      name: name,
    });
    hardwareModule = await hardwareModule.save();
    res.status(200).json({ success: true, message: "New device registered." });
  }),
  getHardwareModule: TryCatch(async (req, res) => {
    const filter = req.query ? req.query : {};
    const id = req.params.id;

    let hardwareModules;
    if (mongoose.isValidObjectId(id))
      hardwareModules = await HardwareModule.findById(id);
    else
      hardwareModules = await HardwareModule.find(filter).sort({
        name: "asc",
      });

    if (!hardwareModules) throw new Error("Device not found!");
    return res.status(200).json(hardwareModules);
  }),
  putHardwareModule: TryCatch(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!mongoose.isValidObjectId(id))
      return res.status(500).json({ success: false, message: "Invalid Id" });
    const hardwareModule = await HardwareModule.findByIdAndUpdate(id, {
      name: name,
      assigned_cage: assigned_cage,
    });
    if (!hardwareModule)
      return res
        .status(500)
        .json({ success: false, message: "Device cannot be updated" });

    return res
      .status(200)
      .json({ success: true, message: "Device successfully updated" });
  }),
  deleteHardwareModule: TryCatch(async (req, res) => {
    const { id } = req.params;
    await HardwareModule.findByIdAndRemove(id)
      .then((hardwareModule) => {
        if (hardwareModule)
          return res
            .status(200)
            .json({ success: true, message: "Device deleted." });
        else
          return res
            .status(404)
            .json({ success: false, message: "Device not found." });
      })
      .catch((err) => {
        return res.status(500).json({ success: false, message: err.message });
      });
  }),
  deleteManyHardwareModule: TryCatch(async (req, res) => {
    const { ids } = req.body;
    let deletedHardwareModules = await Promise.all(
      ids.map(async (id) => {
        return HardwareModule.findByIdAndRemove(id);
      }),
    );

    if (deletedHardwareModules)
      return res
        .status(200)
        .json({ success: true, message: "Device deleted." });
    else
      return res.status(404).json({
        success: false,
        message: "Device not found.",
      });
  }),
};
