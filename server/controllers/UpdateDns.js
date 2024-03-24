import DNS from "../Models/DNS.js";
const updateDns = async (req, res, next) => {
  try {
    const updateDnsData = await DNS.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "data update successfully",
      updateDnsData,
    });
  } catch (err) {
    return next(err);
  }
};
export default updateDns;
