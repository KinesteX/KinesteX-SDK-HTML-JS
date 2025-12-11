Complete code example for the `CAMERA` Integration Option:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KinesteX: Motion Tracking</title>
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

        currentExercise: "Squats", // current exercise
        exercises: ["Squats", "Jumping Jack"], // all exercises a person should do. We will preload them for future usage
      };

      const webViewContainer = document.getElementById("webViewContainer");
      const webView = document.getElementById("webView");
      const startButton = document.getElementById("startKinesteX");

      const srcURL = "https://ai.kinestex.com/camera";

      function sendMessage() {
        if (webView.contentWindow) {
          webView.contentWindow.postMessage(postData, srcURL);
        } else {
          setTimeout(() => {
            try {
              webView.contentWindow.postMessage(postData, srcURL);
            } catch {
              webView.contentWindow.postMessage(postData, srcURL);
            }
          }, 100);
        }
      }

      startButton.addEventListener("click", () => {
        const isVisible = webViewContainer.style.display !== "none";
        webViewContainer.style.display = isVisible ? "none" : "block";

        if (!isVisible) {
          webView.src = srcURL;
          webView.onload = () => {
            sendMessage();
          };
        }
      });

      window.addEventListener("message", (event) => {
        if (event.origin !== "https://ai.kinestex.com") return; // prevent listening for messages from other sources for security

        try {
          const message = JSON.parse(event.data);
          switch (message.type) {
            case "kinestex_loaded":
              sendMessage(); // send message once KinesteX DOM is ready
              break;
            case "successful_repeat":
              console.log("Successful repeat:", message.data);
              break;
            case "mistake":
              console.log("Mistake detected:", message.data);
              break;
            case "exit_kinestex":
              webViewContainer.style.display = "none";
              break;
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
