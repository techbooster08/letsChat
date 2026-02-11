import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in Getting Contacts : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatWithId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatWithId },
        { sederId: userToChatWithId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch {
    console.log("Error in Getting Messages : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: "text or image is required" });
    }

    if (senderId.toString() === receiverId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot send message to yourself" });
    }

    const receiverIdExists = await User.findById(receiverId);
    if (!receiverIdExists) {
      return res.status(404).json({ message: "Receiver Not Found" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //todo: send Message Realtime  id User is Online -socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in Sending Message : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in Getting Chat Partners : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
