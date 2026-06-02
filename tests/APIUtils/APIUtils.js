const { get } = require("node:http")

class APIUtils {

    constructor(ApiContext, PayLoadLogin) {
        this.ApiContext = ApiContext;
        this.PayLoadLogin = PayLoadLogin
    }
    async getToken() {
        const LoginResponse = await this.ApiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.PayLoadLogin });
        const LoginResponseJson = await LoginResponse.json();
        let token = LoginResponseJson.token;
        return token;

    }
    async cerateOrder(OrderPayload) {

        let response = {};
        const OrderResponse = await this.ApiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: OrderPayload,
            headers: {
                'Authorization': await this.getToken(),
                'Content-Type': "application/json"
            }

        });
        const OrderResponseJson = await OrderResponse.json();
        console.log(OrderResponseJson);
        const orderId = await OrderResponseJson.orders[0];
        response.token = await this.getToken();
        response.orderId = orderId;
        console.log(orderId);
        return response;

    }

}

module.exports = { APIUtils };