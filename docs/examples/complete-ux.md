Complete code example for the `Complete User Experience` Integration Option:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KinesteX: Complete User Experience</title>
  </head>
  <body>
    <button id="startKinesteX">Start KinesteX</button>
    <div
      id="webViewContainer"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
      "
    >
      <iframe
        id="webView"
        frameborder="0"
        allow="camera; autoplay"
        sandbox="allow-same-origin allow-scripts"
        style="width: 100%; height: 100%"
      ></iframe>
    </div>

    <script>
      const postData = {
        userId: "YOUR_USER_ID",
        company: "YOUR_COMPANY",
        key: "YOUR_API_KEY",
        style: "dark", // Style: dark, light
        planC: "Strength", // Plan category: Strength, Cardio, Rehabilitation, Weight Management
      };

      const webViewContainer = document.getElementById("webViewContainer");
      const webView = document.getElementById("webView");
      const startButton = document.getElementById("startKinesteX");
      const srcURL = "https://kinestex.vercel.app";

      startButton.addEventListener("click", () => {
        const isVisible = webViewContainer.style.display !== "none";
        webViewContainer.style.display = isVisible ? "none" : "block";

        if (!isVisible) {
          webView.onload = () => {
            webView.contentWindow.postMessage(postData, srcURL);
          };
          webView.src = srcURL;
        }
      });
      window.addEventListener("message", (event) => {
        if (event.origin !== srcURL) return; // prevent listening for messages from other sources for security

        try {
          const message = JSON.parse(event.data);
          switch (message.type) {
            case "exercise_completed":
              console.log("Exercise completed:", message.data);
              break;
            case "plan_unlocked":
              console.log("Workout plan unlocked:", message.data);
              break;
            case "exit_kinestex":
              webViewContainer.style.display = "none";
              break;
            // see `Next Steps` for more data points
            default:
              console.log("Unhandled message:", message);
          }
        } catch (e) {
          console.error("Failed to parse message:", e);
        }
      });
    </script>
  </body>
</html>

```