async function CallUrl(a, b) {
    const headers = {
        'X-BUSINESS-API-KEY': '4867e54baa78dfc7423ef254d08e0994592eef664afffad81fe266cc1486cbe7',
        'X-Requested-With': 'XMLHttpRequest'
    };

    const data = new URLSearchParams({
        amount: a,
        currency: 'SGD',
        purpose: b,
        reference_number: b,
        'payment_methods[]': ["paynow_online"],
        email: 'example@example.com',
        redirect_url: "https://minds-app-updated-socceeer.apps.hackathon.cnasg.dellcsc.com"
    });

    const apiEndpoint = 'https://api.sandbox.hit-pay.com/v1/payment-requests';

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: headers,
            body: data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result.url;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function main() {
    const x = await CallUrl('10.0', 'S1234567J');
    console.log(x);
}

main()
