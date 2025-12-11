Complete code example for the `CHALLENGE` Integration Option:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KinesteX: Squats Challenge</title>
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

        exercise: "jz73VFlUyZ9nyd64OjRb", // name or ID of the exercise
        showLeaderboard: true, // show leaderboard at the end of the challenge
        countdown: 100, // duration of challenge in seconds
      };

      const webViewContainer = document.getElementById("webViewContainer");
      const webView = document.getElementById("webView");
      const startButton = document.getElementById("startKinesteX");

      const srcURL = "https://ai.kinestex.com/challenge";

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
