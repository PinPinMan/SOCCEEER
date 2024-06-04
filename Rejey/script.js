document.addEventListener('DOMContentLoaded', function() {
    const refreshBtn = document.getElementById('refresh-btn');
    const qrDataDiv = document.getElementById('qr-data');
    const qrCodeDiv = document.getElementById('qr-code');

    refreshBtn.addEventListener('click', function() {
        fetchQRData();
    });

    function fetchQRData() {
        fetch('http://localhost:3000/fetch-qrcode')
           .then(response => response.json())
           .then(data => {
                qrDataDiv.textContent = JSON.stringify(data.qrData);
                displayQRCode(data.qrData);
            })
           .catch(error => console.error('Error fetching QR data:', error));
    }

    function displayQRCode(data) {
        // Simulate displaying the QR code
        // In a real scenario, you would use a library like qrcode.js to generate the QR image
        qrCodeDiv.innerHTML = `<img src="path/to/${data}.png" alt="QR Code">`;
    }

    fetchQRData(); // Initial load
});
