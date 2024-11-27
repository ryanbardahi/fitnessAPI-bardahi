const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    duration: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    status: { type: String, default: 'incomplete' },
});

module.exports = mongoose.model('Workout', WorkoutSchema);