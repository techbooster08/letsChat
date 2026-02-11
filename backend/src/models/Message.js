import moongoose from "mongoose";

const messageSchema = new moongoose.Schema(
  {
    senderId: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
      requires: true,
    },
    text: {
      type: String,
      trim: true,
      maxLength: 2000,
    },
    image: {
      type: String,
    },
  },
  { timeStamps: true },
);

const Message = moongoose.model("Message", messageSchema);

export default Message;
