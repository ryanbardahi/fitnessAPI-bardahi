const express = require('express');
const {
    addWorkout,
    getMyWorkouts,
    updateWorkout,
    deleteWorkout,
    completeWorkoutStatus,
} = require('../controllers/workout');
const { authenticate } = require('../auth');

const router = express.Router();

router.post('/addWorkout', authenticate, addWorkout);
router.get('/getMyWorkouts', authenticate, getMyWorkouts);
router.put('/updateWorkout/:id', authenticate, updateWorkout);
router.delete('/deleteWorkout/:id', authenticate, deleteWorkout);
router.patch('/completeWorkoutStatus/:id', authenticate, completeWorkoutStatus);

module.exports = router;