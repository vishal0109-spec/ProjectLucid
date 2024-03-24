import DNS from "../Models/DNS.js";
const deleteDns = async (req, res, next) => {
  try {
    const deleteDnsData = await DNS.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "dns data deleted successfully",
      deleteDnsData,
    });
  } catch (err) {
    return next(err);
  }
};
export default deleteDns;
