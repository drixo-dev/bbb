const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: [
            "super_admin",
            "admin",
            "volunteer"
        ],
        default: "volunteer"
    },

    isActive: {
        type: Boolean,
        default: true
    },

    lastLogin: {
        type: Date
    },
    
    authProvider: {
        type: String,
        enum: ["local"],
        default: "local"
    }
},
{
    timestamps: true
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
