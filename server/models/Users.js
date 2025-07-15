const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email : { type: String, unique: true, required: true },
    password : { type: String, required: true }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
