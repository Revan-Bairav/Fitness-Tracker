const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let workouts = [
  { id: 1, name: 'Chest and Triceps', description: 'Bench press and tricep dips' },
  { id: 2, name: 'Back and Biceps', description: 'Pull ups and bicep curls' },
  { id: 3, name: 'Leg day', description: 'Squats and lunges' },
];

app.get('/', (req, res) => {
  res.send('Welcome to Fitness Tracker!');
});

app.get('/workouts', (req, res) => {
  res.send(workouts);
});

app.get('/workouts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const workout = workouts.find(w => w.id === id);
  if (!workout) {
    res.status(404).send('Workout not found');
  } else {
    res.send(workout);
  }
});

app.post('/workouts', (req, res) => {
  const workout = req.body;
  workout.id = workouts.length + 1;
  workouts.push(workout);
  res.send(workout);
});

app.put('/workouts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const workoutIndex = workouts.findIndex(w => w.id === id);
  if (workoutIndex === -1) {
    res.status(404).send('Workout not found');
  } else {
    workouts[workoutIndex] = req.body;
    workouts[workoutIndex].id = id;
    res.send(workouts[workoutIndex]);
  }
});

app.delete('/workouts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const workoutIndex = workouts.findIndex(w => w.id === id);
  if (workoutIndex === -1) {
    res.status(404).send('Workout not found');
  } else {
    workouts.splice(workoutIndex, 1);
    res.send(`Workout with id ${id} deleted`);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
