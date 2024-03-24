import DNS from "../Models/DNS.js";
const getAllDnsData = async (req, res, next) => {
  try {
    const dnsData = await DNS.find({
      userId:req.user._id,
    });
    return res.status(200).json({
      dnsData,
      message: "get all dns data",
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
export default getAllDnsData;
