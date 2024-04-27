document.addEventListener('DOMContentLoaded', () => {
    const webViewContainer = document.getElementById('webViewContainer');
    const webView = document.getElementById('webView');
    const toggleButton = document.getElementById('toggleWebView');

    const postData = {
        userId: 'YOUR USER ID',
        category: '', //leave empty if you wish not to display the workout categories
        planC: 'Cardio',
        company: 'YOUR COMPANY',
        key: 'YOUR API KEY',
        age: 50,
        height: 150,
        weight: 200,
        gender: 'Male'
    };

    toggleButton.addEventListener('click', () => {
        const isVisible = webViewContainer.style.display !== 'none';
        webViewContainer.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) {
            // Moved inside the click listener to ensure it's set every time the WebView is shown
            webView.onload = () => {
                webView.contentWindow.postMessage(postData, 'https://kinestex.vercel.app/');
            };
            webView.src += ''; // Trigger the reload of the iframe
        }
    });

    window.addEventListener('message', (event) => {
        if (event.origin !== 'https://kinestex.vercel.app') {
            return;
        }

        try {
            const message = JSON.parse(event.data);
            console.log('Received data:', message);

            switch (message.type) {
                case 'finished_workout':
                case 'error_occured':
                case 'exercise_completed':
                    console.log('Received data:', message.data);
                    break;
                case 'exitApp':
                    webViewContainer.style.display = 'none';
                    break;
            }
        } catch (e) {
            console.error('Could not parse JSON message from WebView:', e);
        }
    });
});
