## **Handling Data**:
Create a listener to handle in-iframe events
```ts
window.addEventListener('message', (event) => {
    if (event.origin !== srcURL) return;

    try {
        const message = JSON.parse(event.data); 
        switch (message.type) {
            case 'exercise_completed':
                console.log('Exercise completed:', message.data);
                break;
            case 'plan_unlocked':
                console.log('Workout plan unlocked:', message.data);
                break;
            case 'exit_kinestex':
                webViewContainer.style.display = 'none';
                break;
            // see data points below
            default:
                console.log('Unhandled message:', message);
        }
    } catch (e) {
        console.error('Failed to parse message:', e);
    }
});

```

## Data Points

| Type                    | Data Format                                                                                                 | Description                                                                                      |
|-------------------------|-------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| `kinestex_launched`      | `dd mm yyyy hours:minutes:seconds`                                                                          | Logs when the KinesteX view is launched.                                                         |
| `exit_kinestex`          | `date: dd mm yyyy hours:minutes:seconds`, `time_spent: number`                                              | Logs when the user exits the KinesteX view, including total time spent since launch in seconds.  |
| `plan_unlocked`          | `title: String, date: date and time`                                                                        | Logs when a workout plan is unlocked.                                                            |
| `workout_opened`         | `title: String, date: date and time`                                                                        | Logs when a workout is opened.                                                                   |
| `workout_started`        | `title: String, date: date and time`                                                                        | Logs when a workout begins.                                                                      |
| `error_occurred`         | `data: string`                                                                                              | Logs significant errors, such as missing camera permissions.                                     |
| `exercise_completed`     | `time_spent: number`, `repeats: number`, `calories: number`, `exercise: string`, `mistakes: [string: number]`| Logs each completed exercise.                                                                    |
| `left_camera_frame`      | `number`                                                                                                    | Indicates when the user leaves the camera frame, with current `total_active_seconds`.           |
| `returned_camera_frame`  | `number`                                                                                                    | Indicates when the user returns to the camera frame, with current `total_active_seconds`.       |
| `workout_overview`       | `workout: string`, `total_time_spent: number`, `total_repeats: number`, `total_calories: number`, `percentage_completed: number`, `total_mistakes: number` | Logs a workout summary upon completion.                              |
| `exercise_overview`      | `[exercise_completed]`                                                                                      | Returns a log of all exercises and their data.                                                   |
| `workout_completed`      | `workout: string`, `date: dd mm yyyy hours:minutes:seconds`                                                 | Logs when a workout is completed and the user exits the overview.                               |
| `active_days` (Coming Soon) | `number`                                                                                                | Tracks the number of days the user has accessed KinesteX.                                         |
| `total_workouts` (Coming Soon) | `number`                                                                                            | Tracks the total number of workouts completed by the user.                                       |
| `workout_efficiency` (Coming Soon) | `number`                                                                                         | Measures workout intensity, with average efficiency set at 0.5, indicating 80% completion within the average timeframe. |
---