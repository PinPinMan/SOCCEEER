const url = 'https://api.sandbox.hit-pay.com/v1/payment-requests';  // Replace with your actual URL

const headers = {
    'X-BUSINESS-API-KEY': '4867e54baa78dfc7423ef254d08e0994592eef664afffad81fe266cc1486cbe7',
    'X-Requested-With': 'XMLHttpRequest'
};

const data = new URLSearchParams({
    amount: '15.00',
    currency: 'SGD',
    purpose: 'S1234567J',
    reference_number: 'S1234567J',
    'payment_methods[]': ["paynow_online"],
    email: 'example@example.com'
});

fetch(url, {
    method: 'POST',
    headers: headers,
    body: data
})
.then(response => {
    if (!response.ok) {
        // Log the response status and status text
        return response.text().then(text => {
            throw new Error(`Network response was not ok: ${response.status} - ${response.statusText} - ${text}`);
        });
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});
