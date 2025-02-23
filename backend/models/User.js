import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userShema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter a name"],
    },

    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"],
    },

    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false,
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],

});

//this run before save to incript password
userShema.pre("save", async function (next) {
    if (this.isModified("password")){ //only encrypt password if it is modified
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

//userdefine method to match password with encrypted password (cheack at login time)
userShema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//generate token for user using 
userShema.methods.generateToken = async function () {
    return await jwt.sign({ _id: this._id }, process.env.JWT_SECRET); //we pass payload and secret key
}

export default mongoose.model("User", userShema);