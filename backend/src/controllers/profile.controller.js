import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    console.log(req.body);

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true },
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
