const mongoose = require('mongoose');

const tabSchema = new mongoose.Schema({
    favicon: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const sessionSchema = new mongoose.Schema({
    isSingleTab: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
    },
    tabs: {
        type: [tabSchema],
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
});

const collectionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sessions: {
        type: [sessionSchema],
        default: []
    }
}, {
    timestamps: true
});

// Create compound index for userId and id
collectionSchema.index({ userId: 1, id: 1 }, { unique: true });

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
