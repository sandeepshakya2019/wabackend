const account = "AC35cc14f1ad1b45e373afba6a931c751f";
const auth = "69cdc816cff6ab3ca886844542af6cba";
const client = require("twilio")(account, auth);

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

client.messages
  .create({
    from: "whatsapp:+14155238886",
    to: "whatsapp:+919457193372",
    body: "Ahoy from Twilio",
    // mediaUrl: "https://bit.ly/whatsapp-image-example",
  })
  .then((message) => {
    console.log(message.sid);
  })
  .catch((err) => {
    console.error(err);
  });
