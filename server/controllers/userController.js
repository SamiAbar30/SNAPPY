const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await UserModel.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await UserModel.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) return res.json({ msg: "Incorrect username ", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.json({ msg: "Incorrect password", status: false });
    delete user.password;
    
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};


module.exports.setAvatar = async (req, res, next) => {
  try {
  const userId =req.params.id;
  const avatarImage = req.body.image;
  const userData = await UserModel.findByIdAndUpdate(userId,{
    isAvatarImageSet:true,
    avatarImage
  });

  return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
  } catch (ex) {
    next(ex);
  }
};
module.exports.allUsers=async (req, res, next) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users)
  }
  catch (ex) {
    next(ex);
  }
}