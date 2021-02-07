const express = require("express");
const mongoose = require("mongoose");
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./Models/user");
const twilio = require("twilio");

require("dotenv").config();

const app = express();

//Set up default mongoose connection
const mongoDB = process.env.MONGODB;
// console.log(mongoDB);
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(":) DB CONNECTED SUCCESS");
  })
  .catch((err) => {
    console.log("DB CONNECTION ERR => " + err);
  });

//middlewares
// use the morgan as middleware beacase to see the url on the terminal
app.use(cors());
// app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
// routes
app.post("/user", async (req, res) => {
  //   console.log(req);
  const { name, email, token } = req.body.user;
  const user = await User.findOneAndUpdate(
    { email: email },
    { name: name || email.split("@")[0], token: token },
    { new: true }
  );
  if (user) {
    // console.log("update");
    res.json(user);
  } else {
    const newUser = await new User({
      email: email,
      name: email.split("@")[0],
      token: token,
    }).save();
    // console.log("cretae");
    res.json(newUser);
  }
  //   res.send("success");
});

app.post("/message", (req, res) => {
  //   console.log(req.body.msg);
  //   console.log(process.env.TWILIO_ACCOUNT_SID);
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  client.messages
    .create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919457193372",
      body: req.body.msg,
      // mediaUrl: "https://bit.ly/whatsapp-image-example",
    })
    .then((message) => {
      //   console.log(message.sid);
    })
    .catch((err) => {
      //   console.error(err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(":) SERVER CONNECTED SUCCESSFUL");
});
