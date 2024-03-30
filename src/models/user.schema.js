import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true, //createdAt & updatedAt will be added by default
    toJSON: {
      transform: function (doc, user) {
        delete user.password;
        delete user.__v;
        return user;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
