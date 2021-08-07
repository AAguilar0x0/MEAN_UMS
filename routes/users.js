const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const User = require("../models/user");

router.post("/register", (req, res, next) => {
	let newUser = User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if (err) res.json({ success: false, msg: "Failed to register user" });
		else res.json({ success: true, msg: "User registered" });
	});
});

router.post("/update", (req, res, next) => {
	let newUser = {
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	};
	console.log(req.body);
	User.updateUser(req.body.id, newUser, (err, user) => {
		if (err) res.json({ success: false, msg: "Failed to update user" });
		else res.json({ success: true, msg: "User updated" });
	});
});

router.post("/delete", (req, res, next) => {
	User.deleteUser(req.body.id, (err, user) => {
		if (err) res.json({ success: false, msg: "Failed to delete user" });
		else res.json({ success: true, msg: "User deleted" });
	});
});

router.post("/authenticate", (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		if (err) throw err;
		if (!user)
			return res.json({
				success: false,
				msg: "Invalid username or password"
			});
		User.comparePassword(password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				const token = jwt.sign({ data: user }, config.secret, {
					expiresIn: 604800
				});
				res.json({
					success: true,
					token: `Bearer ${token}`, // Development
					// token: token, // Production
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			} else return res.json({ success: false, msg: "Wrong password" });
		});
	});
});

router.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	(req, res, next) => {
		res.json({ user: req.user });
	}
);

module.exports = router;
