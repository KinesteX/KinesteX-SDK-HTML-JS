### Minimum Device Requirements:

- A device with a modern browser that supports JavaScript and HTML5.
- Access to the KinesteX API (contact support@kinestex.com to obtain your API key).

## Configuration

### 1. Add the `postData` Object

The `postData` object is used to share user-specific and configuration data with KinesteX. Here’s the structure:

```js
const postData = {
  userId: "YOUR_USER_ID", // Unique identifier for the user
  company: "YOUR_COMPANY", // Your organization’s name from kinestex admin dashboard
  key: "YOUR_API_KEY", // Your API Key from kinestex admin dashboard

  // Optional parameters for customization
  style: "dark", // dark or light theme

  // user related customization
  age: 30, // User's age (optional)
  height: 175, // User's height in cm (optional)
  weight: 70, // User's weight in kg (optional)
  gender: "Female", // Gender (optional)
};
```

### 2. Embed KinesteX Using an `iframe`

You can use an `iframe` to display KinesteX within your platform. Here’s how:

```html
<!-- Fullscreen iframe contrainer -->
<div id="webViewContainer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: none;">
    <iframe 
        id="webView" 
        frameborder="0"
        allow="camera; autoplay; accelerometer; gyroscope; magnetometer"
        sandbox="allow-same-origin allow-scripts"
        allowfullscreen="true"
        style="width: 100%; height: 100%;"
    ></iframe>
</div>
```

### 3. Toggle the iframe Visibility and Send Data

Use JavaScript to toggle the iframe visibility and send the postData object:

```js
const webViewContainer = document.getElementById("webViewContainer");
const webView = document.getElementById("webView");
const toggleButton = document.getElementById("toggleWebView"); // launch button

const srcURL = "https://ai.kinestex.com"; // default page -> it should change depending on feature you want to display (see `Next Steps`)

function sendMessage() {
      if (webView.contentWindow) {
        webView.contentWindow.postMessage(postData, srcURL); // post initial data to start session
      } else {
        setTimeout(() => {
          try {
            webView.contentWindow.postMessage(postData, srcURL); // post initial data to start session
          } catch {
            webView.contentWindow.postMessage(postData, srcURL); // retry sending message
          }
        }, 100);
      }
}

toggleButton.addEventListener('click', () => {
    const isVisible = webViewContainer.style.display !== 'none';
    webViewContainer.style.display = isVisible ? 'none' : 'block';

    if (!isVisible) {
        webView.src = srcURL; // Update this URL for specific features

        webView.onload = () => {
           sendMessage();
        };
    }
});
```

### 4. Real-Time Feedback Integration

KinesteX provides real-time feedback by sending messages through postMessages. Here’s how to handle these messages:

```js
window.addEventListener("message", (event) => {
  if (event.origin !== srcURL) return; // prevent listening for messages from other sources for security

    try {
        const message = JSON.parse(event.data);
        switch (message.type) {
            case 'kinestex_loaded': 
                sendMessage(); // send message once KinesteX DOM is ready, webview onload can sometimes fire too early on iOS
                break;
            case 'exercise_completed':
                console.log('Exercise completed:', message.data);
                break;
            case 'plan_unlocked':
                console.log('Workout plan unlocked:', message.data);
                break;
            case 'exit_kinestex':
                webViewContainer.style.display = 'none';
                break;
            // see `Next Steps` for more data points
            default:
                console.log('Unhandled message:', message);
        }
    } catch (e) {
        console.error('Failed to parse message:', e);
    }
  } catch (e) {
    console.error("Failed to parse message:", e);
  }
});
```

###

# Next Steps

### **[> Available Integration Options](integration/overview.md)**

### **[> Explore Available Data Points](data.md)**
