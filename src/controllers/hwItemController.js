const { TryCatch } = require("../utils/tryCatch");
const { hardwareItem, HardwareItem } = require("../models/hardwareItem");
module.exports = {
  insertHardwarItem: TryCatch(async (req, res) => {
    console.log(req.body);
    const { name, assigned_cage } = req.body;

    let hardwareItem = new HardwareItem({
      name: name,
      assigned_cage: assigned_cage,
    });
    hardwareItem = await hardwareItem.save();
    res
      .status(200)
      .json({ success: true, message: "New hardware item registered." });
  }),
  getHardwareItem: TryCatch(async (req, res) => {
    const filter = req.query ? req.query : {};
    let hardwareItems = await HardwareItem.find(filter).sort({ name: "asc" });
    if (!hardwareItems) throw new Error("Hardware Items not found!");
    return res.status(200).json(hardwareItems);
  }),
};
