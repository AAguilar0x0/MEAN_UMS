const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
	User.findOne({ username: username }, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	});
};

module.exports.addUser = function (newUser, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) throw err;
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

module.exports.updateUser = function (user, callback) {
	if (user.password === "") delete user.password;
	else {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) throw err;
				user.password = hash;
				console.log("hash");
			});
		});
	}
	console.log(update);
	User.findOneAndUpdate({ _id: user._id }, user, callback);
};
