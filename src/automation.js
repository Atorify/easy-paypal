"use strict";
const paypal = require('@paypal/checkout-server-sdk');

class Paypal {
    constructor() {
        this.config;
        this.environment;
        this.httpClient;
    }

    async Client(client, secret) {
        this.environment = new paypal.core.LiveEnvironment(client, secret);
        this.httpClient = new paypal.core.PayPalHttpClient(this.environment);
    }

    async SandboxClient(client, secret) {
        this.environment = new paypal.core.SandboxEnvironment(client, secret);
        this.httpClient = new paypal.core.PayPalHttpClient(this.environment);
    }

    async Config(productName, price, successURL) {
        this.config = ()=> {
            return {
                "intent": "CAPTURE",
                "application_context": {
                    "return_url": successURL,
                    "brand_name": productName,
                    "locale": "en-US",
                },
                "purchase_units": [
                    {
                        "amount": {
                            "currency_code": "USD",
                            "value": price,
                        },
                    }
                ]
            };
        }
    }

    async Start() {
        const request = new paypal.orders.OrdersCreateRequest().requestBody(this.config());
        let order = await this.httpClient.execute(request);
        if (order.result.status == 'CREATED') {
            return order.result.links[1].href;
        }
    }

    async Verify(token) {
        const request = new paypal.orders.OrdersCaptureRequest(token);
        const response = await this.httpClient.execute(request).catch(()=> {return false});
        if (response.statusCode == 201) {
            return true;
        }
        return false;
    }
}

module.exports = new Paypal();