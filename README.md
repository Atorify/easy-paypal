# @atorify/easy-paypal

Makes PayPal automation easy.

## Install

```
$ npm install @atorify/easy-paypal
```

## Usage

```js
const easyPaypal = require("@atorify/easy-paypal");
const express = require("express");
const app = express();

// setting up the config/client
easyPaypal.Paypal.SandboxClient("client token", "secret token"); // you can use Client() instead of SandboxClient() for live production.
easyPaypal.Paypal.Config("product name", /*price here (float)*/ 10, /*redirect to any link when finished purchasing*/ "http://127.0.0.1/success");

app.get("/buy", async (req, res) => {
    res.redirect(await easyPaypal.Paypal.Start()); // automatically creates an order and redirects to the paypal purchase page.
});

app.get("/success", async (req, res) => {
    if(await easyPaypal.Paypal.Verify(req.query.token)) { // the Verify function will return true if the purchase token is valid and actually paid.
        res.send("Purchase finished!");
    } else {
        res.send("Purchase failed.");
    }
});

app.listen(80);
```
