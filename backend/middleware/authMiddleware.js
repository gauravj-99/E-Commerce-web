const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
	try {
		let token;
		const authHeader = req.headers.authorization || req.headers.Authorization;

		if (authHeader && authHeader.startsWith("Bearer ")) {
			token = authHeader.split(" ")[1];
		}

		if (!token) {
			return res.status(401).json({ message: "Not authorized, no token" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			return res.status(401).json({ message: "Not authorized, user not found" });
		}

		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({ message: "Not authorized or invalid token", error: err.message });
	}
};

exports.admin = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		res.status(403).json({ message: "Admin only" });
	}
};