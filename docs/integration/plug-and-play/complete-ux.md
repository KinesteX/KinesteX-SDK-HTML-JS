# Compelete User Experience (MAIN):

With this integration option we displays 3 best workout plans based on the provided category. The user can select one of the plans and start a long-term routine.

Available Categories to Sort Plans

| **Plan Category (key: planC)** |
| ------------------------------ |
| **Strength**                   |
| **Cardio**                     |
| **Weight Management**          |
| **Rehabilitation**             |

## Displaying the main view:

### 1. Add a plan category (`planC`) to postData:

```ts
const postData = {
  // ... all initial fields
  planC: "Strength", // Plan category (e.g., Strength, Cardio, Rehabilitation, Weight Management)
};
```

### 2. Change srcURL to display the view:

```js
const srcURL = "https://ai.kinestex.com";
```

# Next steps:

- ### [View handleMessage available data points](../../data.md)
- ### [View complete code example](../../examples/complete-ux.md)
- ### [Explore more integration options](../overview.md)
