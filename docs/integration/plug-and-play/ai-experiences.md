### Immersive AI Experiences: Engage and Motivate

- **AI-Powered Fitness**: Interactive workouts driven by advanced motion analysis.
- **"Fight with a Shadow"**: Virtual punching bag reacts to hits, enhancing technique and engagement.
- **Real-Time Feedback**: Improve stance, punches, and form with AI guidance.

# **EXPERIENCE Integration Example**

### 1. Add `exercise` fields to `postData`:

```ts
const postData = {
  // ... all initial fields
  exercise: "Manual Handling", // name or ID of the exercise
};
```

### 2. Change the `srcURL` to display experience:

Available experiences (replace experience var)

1. 'box'
2. 'training'

```js
const srcURL = `https://ai.kinestex.com/experiences/${experience}`;
```

# Next steps:

- ### [View handleMessage available data points](../../data.md)
- ### [View complete code example](../../examples/ai-experiences.md)
- ### [Explore more integration options](../overview.md)
