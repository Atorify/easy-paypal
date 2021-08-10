const auto = require("./automation.js")

exports.Paypal = {
    Client: async (client, secret)=> {
        return await auto.Client(client, secret);
    },
    SandboxClient: async (client, secret)=> {
        return await auto.SandboxClient(client, secret);
    },
    Config: async (productName, price, successURL)=> {
        return await auto.Config(productName, price, successURL);
    },
    Start: async ()=> {
        return await auto.Start();
    },
    Verify: async (token)=> {
        return await auto.Verify(token);
    }
}
