import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import AuthRoutes from "./routes/AuthRoute.js";
import MongoDB from "./database/MongoDB.js";
import DnsRoutes from "./routes/DnsRoutes.js";

const port = process.env.PORT;
const app = express();

// database
MongoDB();
//

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    methods:["PUT","GET","POST","HEAD","DELETE"],
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);


app.use("/",express.static(path.join("./public")));


// api 

app.use("/api/auth/user",AuthRoutes);
app.use("/api/auth/dns",DnsRoutes);



// error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "server not respond !";
  const success = err.success || false;
  return res.status(status).json({
    status,
    message,
    success,
  });
});





app.listen(port,()=>{
    console.log(`server start at the port of ${port}`);
});