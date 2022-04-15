const express = require("express");
const app = express();
const path = require("path");
const wifi = require("node-wifi");
// const _ = require("lodash");

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')//({origin: true});
const port = process.env.PORT || 8550;

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

// const DIST_DIR = path.join(__dirname, "dist");
// const HTML_FILE = path.join(DIST_DIR, "index.html");
app.use(cors())

app.use(express.json());
// app.use(express.static("public"));
// app.use(express.static(__dirname + "/../client/dist"));




app.post('/request', (req,res) =>{


  async function main() {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });


    let info = await transporter.sendMail({
      from: 'alexmnahas@gmail.com',
      to: "alexmnahas@gmail.com",
      subject: "request ✔",
      text: "request for accsess",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);
})




app.get("/rssi", (req, res) => {
  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });
  console.log("req.url", req.url);
  if (req.url === "/rssi") {
    res.setHeader("Content-Type", "text/event-stream");
    // res.write("data: " + "test!\n\n")
    // wifi.init({
    //   iface: null, // network interface, choose a random wifi interface if set to null
    // });
    const sendRssi = () => {
      wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
          console.log(error);
        } else {
          res.write("data: " + JSON.stringify(currentConnections) + "\n\n");
        }
      });
    };
    setInterval(sendRssi, 100);
  }
});

app.get("/intialLoadrssi", (req, res) => {
  // cors(req, res, async () => {
  res.set("Access-Control-Allow-Origin", "*");

  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });

    const sendRssi = () => {
      console.log('req.body', req.body)
      wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
          console.log(error);
        } else {
          res.send(JSON.stringify(currentConnections));
        }
      });
    };
    sendRssi();
  // })

});

app.get("/currentConections", (req, res) => {
  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });
  wifi.scan((error, networks) => {
    if (error) {
      console.log(error);
    } else {
      console.log(networks.length);
      const newlist = networks
        .filter((network) => {
          return network.quality > 90;
        })
        .sort((a, b) => {
          return b.quality - a.quality;
        });
      console.log(newlist.length);
      res.send(JSON.stringify(newlist));
    }
  });
});

app.get("/auto", (req, res) => {
  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });
  res.setHeader("Content-Type", "text/event-stream");

  const updateConections = () => {
    wifi.scan((error, networks) => {
      if (error) {
        console.log(error);
      } else {
        console.log(networks.length);
        const newlist = networks
          .filter((network) => {
            return network.signal_level > -70;
          })
          .sort((a, b) => {
            return b.quality - a.quality;
          });
        console.log(newlist.length);
        res.write("data: " + JSON.stringify(newlist) + "\n\n");

      }
    });
  };
  setInterval(updateConections, 1000);
});


app.post("/connect", (req, res) =>{
  console.log('req.body', req.body)
  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });
  wifi.connect({ ssid: req.body.ssid, password: req.body.password }, () => {
    res.send('failed to connect')
    // console.log('Connected');
    // on windows, the callback is called even if the connection failed due to netsh limitations
    // if your software may work on windows, you should use `wifi.getCurrentConnections` to check if the connection succeeded
  });

})