
# Krish Pandya (krishjpandya@gmail.com)

## Payment with Crypto

I have integrated the Payment with Crypto feature using the Coinbase Commerce API.

On the checkout page, I have added a "Pay With Crypto" button to the left of the "Proceed To Payment" button.

(This might not be the best way to do it. I would probably include this in the payment methods and then proceed to payment would go to the appropriate payment method based on the selection. That can be refactored when the other payment methods are being implemented.)

## Setup
For the setup, you will have to create an account on the Coinbase Commerce Platform.

Follow this documentation in order to set up an account:

[Coinbase Commerce Getting Started](https://docs.cdp.coinbase.com/commerce-onchain/docs/getting-started/)


You will have to subscribe to the webhook at `/api/webhooks`.

You will need to subscribe to it using a public URL. I used ngrok in order to expose my localhost. You can use any other solutions you like. Just be sure to provide the appropriate URL (ending in `/api/webhooks`).

Here are the steps you will have to follow for that:

[Coinbase Commerce Webhooks](https://docs.cdp.coinbase.com/commerce-onchain/docs/webhooks/)

Once you have created an account, add the following to the `.env` file:

Get the API key from [Creating API Key](https://docs.cdp.coinbase.com/commerce-onchain/docs/creating-api-key/):

Get the webhook secret from [Webhooks Security](https://docs.cdp.coinbase.com/commerce-onchain/docs/webhooks-security/):

  
Add the following to the `.env` file
```plaintext
COMMERCE_API_KEY=your_api_key
WEBHOOK_SECRET=your_webhooks_secret
````

## Testing 


I have not been able to test the application with actual payments because that requires actual money and Coinbase Commerce does not provide a Sandbox environment. 

I have tested the payment processing and it gives the accurate payment requests. 
You can test the Webhook by sending example events from the Webhooks' online plaform (the same place you created the webhook)

The server listens to the appropriate events. The application of what happens when these events are trigerred depends on the design and have not yet been implemented. 
Possible ways to handle these would be:
1) Database Updates - Make the relevant changes on the database for the payments' status (received, pending, successful, unsuccesful)
2) Email Notifications - We could also send user email notifications about updates to their payments (The additional data required for this could be passed in the meta data while making the charge request to the coinbase platform)

## Files Affected:
`pages/cart/cryptoPaymentButton.tsx`
`pages/api/webhooks.ts`
`pages/cart/checkout.tsx`
`assets/css/main.scss`

##
##


# Updates!

  

This new version contains an integration with redux-toolkit instead of redux and it's witch Typescript :)

  

# Project Structure

  

This repo contains a work in progress Ecommerce responsive made with Next.js, Redux, Redux-persist, Hooks, SCSS and BEM. If you like it please give it a star :)

  

## Available pages

  

- Home page: /

- Products page: /products

- Product single page: /product/1

- Cart page: /cart

- Login page: /login

- Register page: /register

- 404 page: /page-not-found

  

## Next TO-DO

  

- [ ] Add Facebook login

- [ ] Add Google login

- [ ] Add Proptypes on components

- [ ] Use CSS variables instead of static colors