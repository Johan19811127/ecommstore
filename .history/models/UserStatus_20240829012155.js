// models/UserStatus.js
const mongoose = require('mongoose');

const userStatusSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  online: { type: Boolean, default: false },
  lastActive: { type: Date, default: Date.now },
});

const UserStatus = mongoose.models.UserStatus || mongoose.model('UserStatus', userStatusSchema);

const mongoose = require('mongoose'); UserStatus;
