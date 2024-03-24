import createErrors from "../Errors/createErrors.js";
import DNS from "../Models/DNS.js";
const createDns = async (req, res, next) => {
  try {
    if (
      !req.body.address ||
      !req.body.ipAddress ||
      !req.body.cname ||
      !req.body.mailExchange ||
      !req.body.serverName ||
      !req.body.pointer ||
      !req.body.startOfAuthority ||
      !req.body.service ||
      !req.body.txt ||
      !req.body.dnssec
    )
      return res.json(createErrors(400, "all fields are required", false));
    const dnsData = await new DNS({
      ...req.body,
      userId:req.user._id,
    });

    await dnsData.save();
    return res.status(200).json({
      message: "dns record created",
      success: true,
      dnsData,
    });
  } catch (err) {
    return next(err);
  }
};
export default createDns;
