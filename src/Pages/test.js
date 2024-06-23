function createPaymentRequest() {
  console.log("URL PARAMETERS")
    const url = 'https://api.sandbox.hit-pay.com/v1/payment-requests';
  
    const data = {
      amount: "15.00",
      currency: "SGD",
      email: "example@example.com",
      payment_methods: ["paynow_online"],
      purpose: "S1234567J",
      reference_number: "S1234567J",
      expiry_date: "2030-02-02 01:01:01"
    };
  
    const headers = {
      'Content-Type': 'application/json',
      'X-BUSINESS-API-KEY': '4867e54baa78dfc7423ef254d08e0994592eef664afffad81fe266cc1486cbe7',
      'X-Requested-With': 'XMLHttpRequest'
    };
  
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
      console.log('Success:', responseData.url);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  createPaymentRequest()
  // To export the function
  module.exports = createPaymentRequest;