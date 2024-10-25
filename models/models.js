import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isMFAActive: {
        type: Boolean,
        required: false
    },
    twoFactorSecret: {
        type: String,
        required: false
    }
}, 
{
    timestamps: true // This enables createdAt and updatedAt fields
});

export default mongoose.model("User", UserSchema);
