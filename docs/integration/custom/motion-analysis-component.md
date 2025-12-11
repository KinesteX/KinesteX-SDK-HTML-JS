### KinesteX Motion Recognition: Real-Time Engagement

- **Interactive Tracking**: Advanced motion recognition for immersive fitness experiences.
- **Real-Time Feedback**: Instantly track reps, spot mistakes, and calculate calories burned.
- **Boost Motivation**: Keep users engaged with detailed exercise feedback.
- **Custom Integration**: Adapt camera placement to fit your app’s design.

## **CAMERA Integration Example**

### **1. Change srcURL**

```js
const srcURL = `https://ai.kinestex.com/camera`;
```

### 2. Modify `postData` to include the current exercise and all expected exercises a person should do:

```js
const postData = {
  // ... all initial fields
  currentExercise: "Squats", // current exercise
  exercises: ["Squats", "Jumping Jack"], // all exercises a person should do. We will preload them for future usage
};
```

### **3. Updating the Current Exercise**

Call this function when you need to change the current exercise throughout your custom workout experience:

```js
const changeExercise = () => {
  const updatedExercise = {
    currentExercise: "Jumping Jack", // the exercise has to be from the list of exercises provided in postData otherwise it will not load
  };
  webView.contentWindow.postMessage(updatedExercise, srcURL);
};
```

### **4. Handling Messages for Reps and Mistakes**

Track repetitions and identify mistakes made by users in real time:

```ts
window.addEventListener("message", (event) => {
  if (event.origin !== srcURL) return;

  try {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case "successful_repeat":
        console.log("Exercise completed:", message.data);
        break;
      case "mistake":
        console.log("Workout plan unlocked:", message.data);
        break;
      default:
        console.log("Unhandled message:", message);
    }
  } catch (e) {
    console.error("Failed to parse message:", e);
  }
});
```

# Next steps

### [View complete code example](../../examples/motion-analysis.md)
