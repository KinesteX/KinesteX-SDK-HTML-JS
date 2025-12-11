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
# PostMessage Events Documentation

PostMessage events are sent to parent windows/webviews for integration with native apps and external systems, they work in real-time, safely, and can even send data back to you offline!

## Application Lifecycle

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `kinestex_launched` | `data: string` (format: "dd mm yyyy hh:mm:ss") | When KinesteX application is launched |
| `kinestex_loaded` | `date: string` (ISO format) | When KinesteX is fully loaded and ready |
| `exit_kinestex` | `date: Date`, `time_spent: string` (format: "hh:mm:ss") | User exits KinesteX with total time spent |
| `main_page_opened` | `date: string` (ISO format) | Main/home page is opened |

## Workout Management

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `workout_opened` | `title: string`, `id: string`, `date: string` (format: "dd mm yyyy hh:mm:ss") | Workout details page opened |
| `workout_started` | `id: string`, `date: string` (format: "dd mm yyyy hh:mm:ss") | Workout session started |
| `workout_started` (alt) | `workoutId: string` | Alternative workout start event |
| `workout_completed` | `workout: string`, `date: string` (format: "dd mm yyyy hh:mm:ss") | Workout finished and user exits overview |
| `workout_overview` | `data: object` - see below | Complete workout summary statistics |

### Workout Overview Data Structure
```typescript
{
      workout_title: string,                  // Workout name
      workout_id: string,                     // Unique workout ID
      target_duration_seconds: number,        // Target workout duration
      completed_reps_count: number,           // Total completed reps
      target_reps_count: number,              // Total target reps
      calories_burned: number,                // Calories burned (2 decimal places)
      completion_percentage: number,          // Workout completion % (2 decimal places)
      total_mistakes: number,                 // Total mistake count
      accuracy_score: number,                 // Overall accuracy (0-100)
      efficiency_score: number,               // Efficiency metric (0-100)
      total_exercise: number,                 // Number of exercises
      actual_hold_time_seconds: number,       // Time in correct position (timer-based)
      target_hold_time_seconds: number        // Target hold time (timer-based exercises)
}
```

## Exercise Tracking

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `exercise_completed` | `data: object` - see below | Individual exercise completed |
| `exercise_overview` | `data: array` of exercise objects | All exercises summary |

### Exercise Completed Data Structure
```typescript
{
  exercise_title: string,        // Exercise name
  time_spent: number,           // Seconds spent
  repeats: number,              // Reps completed
  total_reps: number,         // Required reps
  total_duration: number,       // Countdown time
  calories: number,             // Calories burned
  exercise_id: string,           // Exercise ID
  mistakes: Array<{             // Mistakes made
    mistake: string,
    count: number
  }>,
  average_accuracy?: number      // Average accuracy (0-1, optional)
}
```

### Exercise Overview Item Structure
```typescript
{
      exercise_title: string,            // exercise name
      exercise_id: string,               // Unique exercise ID
      time_spent: number,                // Time on exercise in seconds
      perfect_hold_position: number,     // Time in correct position (timer-based)
      repeats: number,                   // Reps completed
      total_required_reps: number,       // Target reps
      total_required_time: number,       // Target time in seconds
      calories: number,                  // Calories burned (2 decimal places)
      mistakes: Array<{                  // Detailed mistake breakdown
        mistake: string,                 // Mistake description
        count: number                    // Occurrence count
      }>,
      mistake_count: number,             // Total mistakes for exercise
      accuracy_reps?: number[],          // Optional: Per-rep accuracy scores
      average_accuracy?: number          // Optional: Average accuracy (0-100)
}
```

## Camera & Frame Tracking

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `left_camera_frame` | `date: string` (format: "dd mm yyyy hh:mm:ss") | User left camera view |
| `returned_camera_frame` | `date: string` (format: "dd mm yyyy hh:mm:ss") | User returned to camera view |
| `check_frame_completed` | `message: string` ("Person stepped into frame") | Frame check completed |
| `camera_selector_opened` | `message: array` (available cameras) | Camera selector opened |
| `camera_selected` | `id: string`, `label: string`, `isMirrorCamera: boolean` | Camera selected by user |

## Plans & Programs

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `plan_unlocked` | `id: string`, `img: string`, `title: string`, `date: string` (format: "dd mm yyyy hh:mm:ss") | Plan unlocked/selected |
| `personalized_plan_exit` | `workout: string`, `date: string` (format: "dd mm yyyy hh:mm:ss") | Exit from personalized plan |

## Challenges & Experiences

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `challenge_started` | `exerciseId: string` | Challenge exercise started |
| `challenge_completed` | `repCount: number`, `mistakes: number` | Challenge completed |
| `challenge_exit` | `workout: string`, `date: string` (format: "dd mm yyyy hh:mm:ss") | Exit from challenge |

## Leaderboard

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `highlighted_user` | `data: object` - see below | User's leaderboard position |

### Highlighted User Data Structure
```typescript
{
  username: string,             // User's username
  score: number,                // User's score
  position: number              // Leaderboard position (1-based)
}
```

## Home & Navigation

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `kinestex_home_exit` | `workout: string`, `date: string` (format: "dd mm yyyy hh:mm:ss") | Exit from KinesteX home |

## Error Handling

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `error_occurred` | `data: string` | General error message |
| `error_occurred` | `message: string` | Alternative error format |
| `error_occurred` | `data: string`, `error: any` | Error with details |
| `warning` | `data: string` | Warning message |

## Active Time Tracking

| Event Type | Data Fields | Description |
|------------|------------|-------------|
| `total_active_seconds` | `number` | Sent every 5 seconds with active workout time (not sent when user leaves camera frame) |

# Assessment Data Documentation

### Overview

- **`assessment_overview`**: Sent when the results page loads
- **`assessment_completed`**: Sent when user clicks restart or finish buttons

---

### Common Fields (All Assessments)

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"assessment_overview" \| "assessment_completed"` | Event type identifier |
| `assessmentType` | `string` | Assessment identifier (e.g., `"tug"`, `"sls"`, `"balloonpop"`) |
| `date` | `Date` | Timestamp when the assessment was completed |
| `time` | `number` | Total assessment time in seconds |
| `steps` | `number \| undefined` | Estimated step count (for walking assessments) |

---

### TUG (Timed Up and Go) Assessment

**Assessment Type**: `"tug"`

| Field | Type | Description |
|-------|------|-------------|
| `time` | `number` | Total completion time in seconds |
| `steps` | `number` | Estimated step count during the test |
| `standingUpTime` | `number` | Time to stand up from seated position (seconds) |
| `sittingDownTime` | `number` | Time to sit down at end of test (seconds) |
| `walkingForwardTime` | `number` | Time walking to the 3m marker (seconds) |
| `walkingBackwardTime` | `number` | Time walking back to the chair (seconds) |
| `turningTime` | `number` | Time spent turning at the marker (seconds) |
| `backBendingAngleSitting` | `number[]` | Array of back angle measurements during sitting countdown (degrees) |
| `backBendingAngleStanding` | `number[]` | Array of back angle measurements during movement (degrees) |
| `averageSpeedMs_tug` | `number` | Average walking speed in m/s. Formula: `6m / time` |
| `avgBackBendingSitting` | `number \| null` | Average back bending angle while sitting (degrees) |
| `avgBackBendingStanding` | `number \| null` | Average back bending angle while standing/moving (degrees) |

---

### Gait Speed Test Assessment

**Assessment Type**: `"gaitspeedtest"`

| Field | Type | Description |
|-------|------|-------------|
| `time` | `number` | Total test time in seconds |
| `steps` | `number` | Estimated step count during the walk |
| `standingTime` | `number` | Time spent in standing phase (seconds) |
| `walkingTime` | `number` | Active walking time (seconds) |
| `averageGaitSpeed` | `number` | Gait speed in m/s. Formula: `4m / time` |

---

### SLS (Single Leg Stand) Assessment

**Assessment Type**: `"sls"`

| Field | Type | Description |
|-------|------|-------------|
| `rightTime` | `number` | Duration standing on right leg (seconds) |
| `leftTime` | `number` | Duration standing on left leg (seconds) |
| `symmetryScore_sls` | `number \| null` | Leg symmetry percentage (0-100). Formula: `(min(right, left) / max(right, left)) * 100` |
| `riskLevel_sls` | `"low" \| "moderate" \| "high"` | Balance risk assessment |

#### Risk Level Calculation (SLS)
- **Low**: Min time ≥20s AND good symmetry (difference ≤5s)
- **Moderate**: Min time ≥10s AND average time ≥15s
- **High**: All other cases

---

### STS (Sit-to-Stand 30 Second) Assessment

**Assessment Type**: `"sts"`

| Field | Type | Description |
|-------|------|-------------|
| `reps` | `number` | Total repetitions completed in 30 seconds |
| `averageSittingTime` | `number` | Average time in sitting position per rep (seconds) |
| `averageStandingTime` | `number` | Average time in standing position per rep (seconds) |
| `avgTimePerRep_sts` | `number \| null` | Average seconds per repetition. Formula: `30 / reps` |
| `repTimeVariance_minRepTime` | `number \| null` | Fastest rep time (seconds) |
| `repTimeVariance_maxRepTime` | `number \| null` | Slowest rep time (seconds) |
| `repTimeVariance_minRepIndex` | `number \| null` | Which rep number was fastest (1-indexed) |
| `repTimeVariance_maxRepIndex` | `number \| null` | Which rep number was slowest (1-indexed) |

---

### Five Times STS Assessment

**Assessment Type**: `"fivetimessts"`

| Field | Type | Description |
|-------|------|-------------|
| `time` | `number` | Total completion time for 5 repetitions (seconds) |
| `averageSittingTime` | `number` | Average time in sitting position (seconds) |
| `averageStandingTime` | `number` | Average time in standing position (seconds) |

---

### FRT (Functional Reach Test) Assessment

**Assessment Type**: `"frt"`

| Field | Type | Description |
|-------|------|-------------|
| `reach` | `number` | Maximum forward reach distance (cm) |
| `maxHeelLift` | `number` | Maximum heel lift detected during test (cm) |
| `heelLiftCount` | `number` | Count of heel lift violations |
| `legLiftCount` | `number` | Count of leg lift violations |
| `testCompleted` | `boolean` | Whether test finished normally (`true`) or was terminated early (`false`) |
| `endReason` | `string \| null` | Reason for early termination if applicable |
| `riskLevel_frt` | `"low" \| "moderate" \| "high" \| null` | Fall risk assessment |

#### End Reason Values
- `"Feet moved out of zone"`
- `"User left zone"`
- `"User turned forward"`
- `"Arm dropped completely"`
- `"Reference lost"`
- `"Unhandled state"`

#### Risk Level Calculation (FRT)
- **High**: Test not completed OR reach ≤15cm
- **Moderate**: Reach 15-25cm
- **Low**: Reach >25cm

---

### SBSS (Side-by-Side Stand) Assessment

**Assessment Type**: `"sbss"`

| Field | Type | Description |
|-------|------|-------------|
| `timeInProperPosition_sbss` | `number` | Time maintained in correct stance (seconds, max 10s) |
| `maxShoulderShift_sbss` | `number` | Maximum lateral shoulder shift (% of shoulder width) |
| `maxHipShift_sbss` | `number` | Maximum lateral hip shift (% of hip width) |
| `feetMoved_sbss` | `boolean` | Whether feet moved during the test |
| `riskLevel_sbss` | `"low" \| "moderate" \| "high"` | Balance risk assessment |

#### Risk Level Calculation (SBSS)
- **High**: Feet moved OR (time <7s AND sway ≥30%)
- **Moderate**: Time ≥7s AND sway <30%
- **Low**: Time ≥9.5s AND sway <15%

---

### STSS (Semi-Tandem Stand) Assessment

**Assessment Type**: `"stss"`

| Field | Type | Description |
|-------|------|-------------|
| `timeInProperPosition_stss` | `number` | Time maintained in correct stance (seconds, max 10s) |
| `maxShoulderShift_stss` | `number` | Maximum lateral shoulder shift (% of shoulder width) |
| `maxHipShift_stss` | `number` | Maximum lateral hip shift (% of hip width projection) |
| `feetMoved_stss` | `boolean` | Whether feet moved during the test |
| `riskLevel_stss` | `"low" \| "moderate" \| "high"` | Balance risk assessment |

#### Risk Level Calculation (STSS)
Same as SBSS calculation.

---

### Full Tandem Stand Assessment

**Assessment Type**: `"fulltandem"`

| Field | Type | Description |
|-------|------|-------------|
| `time` | `number` | Total test time (seconds) |
| `timeInProperPosition_fulltandem` | `number` | Time in correct heel-to-toe stance (seconds, max 10s) |
| `maxShoulderShift_fulltandem` | `number` | Maximum lateral shoulder shift (% of shoulder width) |
| `maxHipShift_fulltandem` | `number` | Maximum lateral hip shift (% of hip width) |
| `feetMoved_fulltandem` | `boolean` | Whether feet moved during the test |
| `testFailed_fulltandem` | `boolean` | Whether the test was failed/terminated early |
| `terminationReason_fulltandem` | `string \| null` | Reason for early termination if applicable |
| `riskLevel_fulltandem` | `"low" \| "moderate" \| "high"` | Balance risk assessment |

#### Risk Level Calculation (Full Tandem)
- **Low**: Time ≥10s AND no feet movement
- **Moderate**: Time ≥5s
- **High**: Time <5s

---

### Balloon Pop Game

**Assessment Type**: `"balloonpop"`

| Field | Type | Description |
|-------|------|-------------|
| `gameScore` | `number` | Total balloons popped |
| `averageReactionTime` | `string` | Average time to pop a balloon (seconds) |
| `maxIdleTime` | `string` | Maximum time without any action (seconds) |
| `averageSpeed_balloonpop` | `number` | Balloons popped per second. Formula: `gameScore / 30` |
| `masteryTitle_balloonpop` | `string` | Achievement tier identifier |

#### Mastery Titles (Balloon Pop)
| Score Range | Title Key |
|-------------|-----------|
| ≥30 | `pop_tastic_hero` |
| ≥25 | `magic_popper` |
| ≥20 | `super_duper_popper` |
| ≥15 | `sparkly_popper` |
| ≥10 | `giggly_popper` |
| ≥5 | `bouncy_bubbler` |
| <5 | `tiny_popper` |

---

### Color Chase Game

**Assessment Type**: `"colorchase"`

| Field | Type | Description |
|-------|------|-------------|
| `gameScore` | `number` | Total score achieved |
| `levelReached` | `number` | Highest level completed |
| `totalDuration` | `string` | Total game duration (seconds) |
| `averageReactionTime` | `string` | Average reaction time per tap (seconds) |
| `maxIdleTime` | `string` | Maximum time between taps (seconds) |
| `masteryTitle_colorchase` | `string` | Achievement tier identifier |

### Mastery Titles (Color Chase)
| Level Range | Title Key |
|-------------|-----------|
| ≥10 | `color_chase_legend` |
| ≥8 | `magic_color_wizard` |
| ≥6 | `super_color_star` |
| ≥4 | `shiny_sequencer` |
| ≥2 | `rainbow_chaser` |
| ≥1 | `color_buddy` |
| <1 | `little_color_finder` |

---

### Alien Squat Shooter Game

**Assessment Type**: `"aliensquatshooter"`

| Field | Type | Description |
|-------|------|-------------|
| `gameScore` | `number` | Total aliens destroyed |
| `squatsPerformed` | `number` | Number of squats completed |
| `totalDuration` | `string` | Total game duration (seconds) |
| `averageSquatRate` | `string` | Squats per second |
| `maxTimeBetweenSquats` | `string` | Maximum idle time between squats (seconds) |
| `averageAlienDestroyTime` | `string` | Average time to destroy each alien (seconds) |
| `masteryTitle_aliensquatshooter` | `string` | Achievement tier identifier |

#### Mastery Titles (Alien Squat Shooter)
| Score Range | Title Key |
|-------------|-----------|
| ≥25 | `alien_annihilator` |
| ≥20 | `cosmic_blaster` |
| ≥15 | `star_shooter` |
| ≥10 | `galactic_gunner` |
| ≥5 | `space_squatter` |
| <5 | `rookie_defender` |

---

### Health Benefits (Games Only)

Included in payload for all game types (`balloonpop`, `colorchase`, `aliensquatshooter`).

| Field | Type | Description |
|-------|------|-------------|
| `healthBenefits.heartDiseaseReduction` | `number` | Estimated heart disease risk reduction % (max 15) |
| `healthBenefits.diabetesReduction` | `number` | Estimated diabetes risk reduction % (max 20) |
| `healthBenefits.obesityReduction` | `number` | Estimated obesity risk reduction % (max 10) |
| `healthBenefits.depressionReduction` | `number` | Estimated depression risk reduction % (max 15) |

#### Health Benefit Calculation
```
reduction = min((gameScore / 100) * maxReduction, maxReduction)
```

---

### Risk Level Reference

| Value | Meaning |
|-------|---------|
| `"low"` | Good performance, minimal fall/balance risk |
| `"moderate"` | Some limitations detected, may benefit from training |
| `"high"` | Significant limitations, balance training recommended |

---

### Example Payload

```json
{
  "type": "assessment_completed",
  "assessmentType": "tug",
  "date": "2025-12-09T10:30:00.000Z",
  "time": 12.5,
  "steps": 18,
  "standingUpTime": 1.8,
  "sittingDownTime": 2.1,
  "walkingForwardTime": 3.2,
  "walkingBackwardTime": 3.1,
  "turningTime": 2.3,
  "backBendingAngleSitting": [15.2, 14.8, 15.1],
  "backBendingAngleStanding": [8.5, 9.2, 8.8],
  "averageSpeedMs_tug": 0.48,
  "avgBackBendingSitting": 15.0,
  "avgBackBendingStanding": 8.8,
  "standingTime": null,
  "walkingTime": null,
  "averageGaitSpeed": 0.32,
  "rightTime": 0,
  "leftTime": 0,
  "symmetryScore_sls": null,
  "riskLevel_sls": "high",
  "reps": 0,
  "avgTimePerRep_sts": null,
  "repTimeVariance_minRepTime": null,
  "repTimeVariance_maxRepTime": null,
  "repTimeVariance_minRepIndex": null,
  "repTimeVariance_maxRepIndex": null,
  "averageSittingTime": null,
  "averageStandingTime": null,
  "reach": 0,
  "maxHeelLift": null,
  "heelLiftCount": null,
  "legLiftCount": null,
  "testCompleted": true,
  "endReason": null,
  "riskLevel_frt": "high",
  "maxShoulderShift_sbss": 0,
  "maxHipShift_sbss": 0,
  "feetMoved_sbss": false,
  "timeInProperPosition_sbss": 12.5,
  "riskLevel_sbss": "low",
  "maxShoulderShift_stss": 0,
  "maxHipShift_stss": 0,
  "feetMoved_stss": false,
  "timeInProperPosition_stss": 12.5,
  "riskLevel_stss": "low",
  "maxShoulderShift_fulltandem": 0,
  "maxHipShift_fulltandem": 0,
  "feetMoved_fulltandem": false,
  "testFailed_fulltandem": false,
  "terminationReason_fulltandem": null,
  "timeInProperPosition_fulltandem": 12.5,
  "riskLevel_fulltandem": "low",
  "gameScore": 0,
  "averageReactionTime": "0",
  "maxIdleTime": "0",
  "averageSpeed_balloonpop": 0,
  "masteryTitle_balloonpop": "tiny_popper",
  "levelReached": 0,
  "totalDuration": "0",
  "masteryTitle_colorchase": "little_color_finder",
  "squatsPerformed": 0,
  "averageSquatRate": "0.00",
  "maxTimeBetweenSquats": "0.00",
  "averageAlienDestroyTime": "0.00",
  "masteryTitle_aliensquatshooter": "rookie_defender",
  "healthBenefits": {
    "heartDiseaseReduction": 0,
    "diabetesReduction": 0,
    "obesityReduction": 0,
    "depressionReduction": 0
  }
}
```

---

#### Notes
**All fields are included in every payload** regardless of assessment type. Fields not relevant to the current assessment will have default/null values.


# Event Flow Examples

#### Complete Workout Flow
1. `kinestex_launched` → Application starts
2. `workout_opened` → User views workout details
3. `workout_started` → Workout begins
4. `returned_camera_frame` / `left_camera_frame` → Frame tracking
5. Multiple `exercise_completed` → Each exercise finished
6. `workout_overview` → Summary statistics
7. `exercise_overview` → All exercises summary
8. `workout_completed` → User exits statistics
9. `exit_kinestex` → Application closed

#### Challenge Flow
1. `challenge_started` → Challenge begins
2. `exercise_completed` → Exercise finished
3. `challenge_completed` → Challenge complete
4. `challenge_exit` → Exit from challenge