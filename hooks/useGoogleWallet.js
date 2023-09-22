import { useEffect, useState } from 'react';

const baseRequest = {
	apiVersion: 2,
	apiVersionMinor: 0
};

const tokenizationSpecification = {
	type: 'DIRECT',
	parameters: {
		"protocolVersion": "ECv2",
		"publicKey": "BLGNCS403s/Q2MCJc5Qa57NPp5Kp0CY9WF4nL2cqxQ7piZ4J1mFjPISV0zIts2TPlLXw25pkfi063sVBxHkkMr0="	
	}
};

const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const baseCardPaymentMethod = {
	type: 'CARD',
	parameters: {
	  allowedAuthMethods: allowedCardAuthMethods,
	  allowedCardNetworks: allowedCardNetworks
	}
};

const cardPaymentMethod = Object.assign(
	{tokenizationSpecification: tokenizationSpecification},
	baseCardPaymentMethod
);

const paymentDataRequest = Object.assign({}, baseRequest);
paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
paymentDataRequest.transactionInfo = {
	totalPriceStatus: 'FINAL',
	totalPrice: '123.45',
	currencyCode: 'BRL',
	countryCode: 'BR'
};
paymentDataRequest.merchantInfo = {
	merchantName: 'Example Merchant',
	merchantId: '12345678901234567890'
  };
  

export function useGoogleWallet() {
	
	useEffect(() => {		
		debugger
		const script = document.createElement("script");
		script.src = "https://pay.google.com/gp/p/js/pay.js";
		script.async = true;

		script.onload = async () => {
			console.log('google pay add')

			const paymentsClient = new google.payments.api.PaymentsClient({
				environment: 'TEST'
			});

			const isReadyToPayRequest = Object.assign({}, baseRequest);
			isReadyToPayRequest.allowedPaymentMethods = [baseCardPaymentMethod];

			await paymentsClient.isReadyToPay(isReadyToPayRequest)
				.then(function(response) {
				  if (response.result) {
					// add a Google Pay payment button

					const button = paymentsClient.createButton({
						//onClick: () => console.log('TODO: click handler'),
						onClick: () => {
							paymentsClient.loadPaymentData(paymentDataRequest)
								.then(function(paymentData){
									// if using gateway tokenization, pass this token without modification
									paymentToken = paymentData.paymentMethodData.tokenizationData.token;

									
								}).catch(function(err){
									// show error in developer console for debugging
									console.error(err);
								})
						},
						allowedPaymentMethods: []
					}); // make sure to provide an allowed payment method
		
					document.getElementById('testeid').append(button)
					//document.getElementById('testeid').innerHTML = button.innerHTML
				  }
				})
				.catch(function(err) {
				  // show error in developer console for debugging
				  console.error(err);
				});

			
		}

		document.body.appendChild(script);				
	}, [])
}