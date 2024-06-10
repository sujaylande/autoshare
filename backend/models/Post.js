import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):?([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} is not a valid time format!`
        },
    },
    passengerNeeded: {
        type: Number,
        required: true,
        min: [1, 'Number of passengers cannot be less than 1'],
        max: [2, 'Number of passengers cannot be more than 2'],
    },
    autobooked: {
        type: String,
        enum: ['yes', 'no','Yes', 'No', 'YES', 'NO' ],
        required: true,
    },
    contact: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        },
    },
    caption: {
        type: String,
        required: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Post", postSchema);
