# [Precise Motion Tracking and Analysis SDK](https://kinestex.com)
## Stay Ahead with KinesteX AI Motion Tracking.
### Easily transform your platform with our SDK: white-labeled workouts with precise motion tracking and real-time feedback tailored for accuracy and engagement

https://github.com/V-m1r/KinesteX-B2B-AI-Fitness-and-Physio/assets/62508191/ac4817ca-9257-402d-81db-74e95060b153

## Available Integration Options

### Integration Options

| **Integration Option**         | **Description**                                                                                                 | **Features**                                                                                                                                                                          | **Details**                                                                                                             |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Complete User Experience**   | Leave it to us to recommend the best workout routines for your customers, handle motion tracking, and overall user interface. High level of customization based on your brand book for a seamless experience. | - Long-term lifestyle workout plans <br> - Specific body parts and full-body workouts <br> - Individual exercise challenges (e.g., 20 squat challenge) <br> - Gamified AI Experiences | [View Integration Options](https://www.figma.com/proto/XYEoV023iSFdhpw3w65zR1/Complete?page-id=0%3A1&node-id=0-1&viewport=793%2C330%2C0.1&t=d7VfZzKpLBsJAcP9-1&scaling=contain) |
| **Custom User Experience**     | Integrate the camera component with motion tracking. Real-time feedback on all customer movements. Control the position, size, and placement of the camera component. | - Real-time feedback on customer movements <br> - Communication of every repeat and mistake <br> - Customizable camera component position, size, and placement                        | [View Details](https://www.figma.com/proto/JyPHuRKKbiQkwgiDTkGJgT/Camera-Component?page-id=0%3A1&node-id=1-4&viewport=925%2C409%2C0.22&t=3UccMcp1o3lKc0cP-1&scaling=contain) |

---

## Configuration

### Available categories to sort plans (param key is planC): 

| **Plan Category (key: planC)** | 
| --- | 
| **Strength** | 
| **Cardio** |
| **Rehabilitation** | 
| **Weight Management** | 

## Available parameters:
```jsx
  const postData = {
// REQUIRED
    userId: 'YOUR USER ID',
    company: 'YOUR COMPANY', // contact KinesteX
    key: 'YOUR KEY', // contact KinesteX
// OPTIONAL
    category: 'Fitness',
    planC: 'Cardio',
    age: 50,
    height: 150, // in cm
    weight: 200, // in kg
    gender: 'Male'
  };
```

### Communicating with KinesteX:
Currently supported communication is via window postMessages. 
When presenting iframe, share the data in the following way: 
```jsx
    const isVisible = webViewContainer.style.display !== 'none';
    webViewContainer.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        // Moved inside the click listener to ensure it's set every time the WebView is shown
        webView.onload = () => {
            webView.contentWindow.postMessage(postData, 'https://kinestex.vercel.app');
        };
        webView.src = url; // Trigger the reload of the iframe with the specified url
    }
```
To listen to user events: 
```jsx
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
```

### Integration Options
You can integrate KinesteX in different ways based on the selected option. Here are the available options:

#### Complete User Experience
```jsx
const selectedOption = 'Complete User Experience';
const url = 'https://kinestex.vercel.app';
```

#### Workout Plan
```jsx
const selectedOption = 'Workout Plan';
const url = 'https://kinestex.vercel.app/plan/Full%20Cardio'; // replace with the plan you want to present
postData.planC = 'Cardio'; // specify the category of the plans to be presented
```

#### Workout
```jsx
const selectedOption = 'Workout';
const url = 'https://kinestex.vercel.app/workout/Fitness%20Lite'; // replace with the workout you want to display
```

#### Challenge
```jsx
const selectedOption = 'Challenge';
const url = 'https://kinestex.vercel.app/challenge';
postData.exercise = 'Squats'; // specify the exercise to be presented
postData.countdown = 50; // specify the timer time for the challenge
```

### Example Code
Here is an example of how to integrate KinesteX with the different options:

```js
document.addEventListener('DOMContentLoaded', () => {
    const webViewContainer = document.getElementById('webViewContainer');
    const webView = document.getElementById('webView');
    const toggleButton = document.getElementById('toggleWebView');
    const integrationOptions = document.getElementById('integrationOptions');

    const postData = {
        userId: 'YOUR USER ID',
        key: 'YOUR API KEY',
        company: 'YOUR COMPANY',
        lifestyle: "Sedentary", // Active, or Very Active
        age: 50,
        height: 150,
        weight: 200,
        gender: 'Male'
    };

    integrationOptions.addEventListener('change', () => {
        const selectedOption = integrationOptions.value;
        toggleButton.textContent = `Start ${selectedOption}`;
    });

    toggleButton.addEventListener('click', () => {
        const selectedOption = integrationOptions.value;
        let url;
        switch (selectedOption) {
            case 'Complete User Experience':
                url = 'https://kinestex.vercel.app';
                break;
            case 'Workout Plan':
                url = 'https://kinestex.vercel.app/plan/Full%20Cardio'; // replace with the plan you want to present
                postData.planC = 'Cardio'; // specify the category of the plans to be presented
                break;
            case 'Workout':
                url = 'https://kinestex.vercel.app/workout/Fitness%20Lite'; // replace with the workout you want to display
                break;
            case 'Challenge':
                url = 'https://kinestex.vercel.app/challenge';
                postData.exercise = 'Squats'; // specify the exercise to be presented
                postData.countdown = 50; // specify the timer time for the challenge
                break;
        }

        const isVisible = webViewContainer.style.display !== 'none';
        webViewContainer.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) {
            webView.onload = () => {
                webView.contentWindow.postMessage(postData, url);
            };
            webView.src = url; // Set the new URL for the iframe
        }
    });
});
```

## Displaying KinesteX through iframe in html:
```html
   <div id="webViewContainer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: none;">
            <iframe
                id="webView"
                frameborder="0"
                allow="camera; autoplay"
                sandbox="allow-same-origin allow-scripts"
                allowfullscreen="true"
                style="width: 100%; height: 100%;"
            ></iframe>
        </div>

```

## Contact:
If you have any questions contact: help@kinestex.com
 **Message Types & Data**

    
| Type          | Data  |          Description     |
|----------------------|----------------------------|---------------------------------------------------------|
| `kinestex_launched`  | Format: `dd mm yyyy hours:minutes:seconds` | When a user has launched KinesteX 
| `exit_kinestex`     | Format: `date: dd mm yyyy hours:minutes:seconds`, `time_spent: number` | Logs when a user clicks on exit button, requesting dismissal of KinesteX and sending how much time a user has spent totally in seconds since launch   |
| `plan_unlocked`    | Format: `title: String, date: date and time` | Logs when a workout plan is unlocked by a user    |
| `workout_opened`      | Format: `title: String, date: date and time` | Logs when a workout is opened by a user  |
| `workout_started`   |  Format: `title: String, date: date and time`| Logs when a workout is started.  |
| `error_occurred`    | Format:  `data: string`  |  Logs when a significant error has occurred. For example, a user has not granted access to the camera  |
| `exercise_completed`      | Format: `time_spent: number`,  `repeats: number`, `calories: number`,  `exercise: string`, `mistakes: [string: number]`  |  Logs everytime a user finishes an exercise |
| `total_active_seconds` | Format: `number`   |   Logs every `5 seconds` and counts the number of active seconds a user has spent working out. This value is not sent when a user leaves camera tracking area  |
| `left_camera_frame` | Format: `number`  |  Indicates that a user has left the camera frame. The data sent is the current number of `total_active_seconds` |
| `returned_camera_frame` | Format: `number`  |  Indicates that a user has returned to the camera frame. The data sent is the current number of `total_active_seconds` |
| `workout_overview`    | Format:  `workout: string`,`total_time_spent: number`,  `total_repeats: number`, `total_calories: number`,  `percentage_completed: number`,  `total_mistakes: number`  |  Logged when a user finishes the workout with a complete short summary of the workout  |
| `exercise_overview`    | Format:  `[exercise_completed]` |  Returns a log of all exercises and their data (exercise_completed data is defined 5 lines above) |
| `workout_completed`    | Format:  `workout: string`, `date: dd mm yyyy hours:minutes:seconds`  |  Logs when a user finishes the workout and exits the workout overview |
| `active_days` (Coming soon)   | Format:  `number`  |  Represents a number of days a user has been opening KinesteX |
| `total_workouts` (Coming soon)  | Format:  `number`  |  Represents a number of workouts a user has done since start of using KinesteX|
| `workout_efficiency` (Coming soon)  | Format:  `number`  |  Represents the level of intensivity a person has done the workout with. An average level of workout efficiency is 0.5, which represents an average time a person should complete the workout for at least 80% within a specific timeframe. For example, if on average people complete workout X in 15 minutes, but a person Y has completed the workout in 12 minutes, they will have a higher `workout_efficiency` number |
------------------


See App.js for demo code

------------------

## Contact:
If you have any questions contact: help@kinestex.com
