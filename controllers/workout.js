const Workout = require('../models/Workout');

exports.addWorkout = async (req, res) => {
    const { name, duration } = req.body;
    try {
        const workout = new Workout({ userId: req.user.userId, name, duration });
        await workout.save();
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add workout' });
    }
};

exports.getMyWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.userId });
        res.status(200).json({ workouts: workouts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
};

exports.updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { name, duration, status } = req.body;

    try {
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: id, userId: req.user.userId },
            { name, duration, status },
            { new: true } // Return the updated document
        );

        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json({
            message: 'Workout updated successfully',
            updatedWorkout: updatedWorkout,
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
};

exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findOneAndDelete({ _id: id, userId: req.user.userId });

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete workout' });
    }
};

exports.completeWorkoutStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: id, userId: req.user.userId },
            { status: 'complete' },
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json({
            message: 'Workout status updated to complete',
            updatedWorkout: updatedWorkout,
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update workout status' });
    }
};

