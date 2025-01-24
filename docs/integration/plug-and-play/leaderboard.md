# Ready-made Leaderboard: Boost User Engagement and Motivation

### Adaptive Design

The leaderboard automatically adapts to your KinesteX UI and can be fully customized in the admin dashboard.

### Real-time Updates

Whenever a new ranking is available, the leaderboard automatically refreshes to show the latest standings.

---

# **LEADERBOARD Integration Example**
### 1. Add `exercise` field to `postData`: 
```ts
const postData = {
 // ... all initial fields
  exercise: 'Squats', // name or ID of the exercise to display in the leaderboard
};
```
### 2. Select `LEADERBOARD` IntegrationOption:
```js
const srcURL = `https://kinestex.vercel.app/leaderboard/?userId=${userId}`; // userId you want to highlight in the leaderboard
```

# Next steps:

- ### [View onMessageReceived available data points](../../data.md)
- ### [Explore more integration options](../overview.md)