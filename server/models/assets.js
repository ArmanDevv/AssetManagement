const mongoose = require("mongoose");
const AssetSchema = new mongoose.Schema({
    Asset_name: String,
    Site: String,
    Asset_id: String,
    Serial_id: Number,
    modal:String,
    tag_number: String,
    date: Date,
    RFID:String,
    Purchase_price: String,
    purchase_date: Date,
    invoice_id: String,
    expected_life: String,
    supplier: String,
    manufacturer: String,
    Asset_status:String,
    Cost_senter: String,
    Parent_Asset: String,
    Date_removed: Date,
})

const AssetModel = mongoose.model("assets",AssetSchema)
module.exports = AssetModel