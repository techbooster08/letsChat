import moongoose from "mongoose";

const UserSchema = new moongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }, // To automatically manage createdAt and updatedAt fields
);

const User = moongoose.model("User", UserSchema);

export default User;
