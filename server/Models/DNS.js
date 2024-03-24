import mongoose from "mongoose";
const dnsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    cname: {
      type: String,
      required: true,
    },
    mailExchange: {
      type: String,
      required: true,
    },
    serverName: {
      type: String,
      required: true,
    },
    pointer: {
      type: String,
      required: true,
    },
    startOfAuthority: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    txt: {
      type: String,
      required: true,
    },
    dnssec: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DNS = new mongoose.model("DNS", dnsSchema);
export default DNS;
