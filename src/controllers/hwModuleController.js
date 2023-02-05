const { TryCatch } = require("../utils/tryCatch");
const { hardwareModule, HardwareModule } = require("../models/hardwareModule");
const { default: mongoose } = require("mongoose");
module.exports = {
  insertHardwareModule: TryCatch(async (req, res) => {
    const { name, assigned_cage } = req.body;

    let hardwareModule = new HardwareModule({
      name: name,
      assigned_cage: assigned_cage,
    });
    hardwareModule = await hardwareModule.save();
    res
      .status(200)
      .json({ success: true, message: "New hardware module registered." });
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

    if (!hardwareModules) throw new Error("Hardware module not found!");
    return res.status(200).json(hardwareModules);
  }),
  putHardwareModule: TryCatch(async (req, res) => {
    const { id } = req.params;
    const { name, assigned_cage } = req.body;
    if (!mongoose.isValidObjectId(id))
      return res.status(500).json({ success: false, message: "Invalid Id" });
    const hardwareModule = await HardwareModule.findByIdAndUpdate(id, {
      name: name,
      assigned_cage: assigned_cage,
    });
    if (!hardwareModule)
      return res
        .status(500)
        .json({ success: false, message: "Hardware module cannot be updated" });

    return res
      .status(200)
      .json({ success: true, message: "Hardware module successfully updated" });
  }),
  deleteHardwareModule: TryCatch(async (req, res) => {
    const { id } = req.params;
    await HardwareModule.findByIdAndRemove(id)
      .then((hardwareModule) => {
        if (hardwareModule)
          return res
            .status(200)
            .json({ success: true, message: "Hardware module deleted." });
        else
          return res
            .status(404)
            .json({ success: false, message: "Hardware module not found." });
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
        .json({ success: true, message: "Hardware module deleted." });
    else
      return res.status(404).json({
        success: false,
        message: "Hardware module not found.",
      });
  }),
};
