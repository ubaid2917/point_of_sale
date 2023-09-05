// const jwt = require('jsonwebtoken');
// const config = require('../config/config');

// const verifyToken = async (req, res, next) => {
//     const token = req.body.token || req.query.token || req.headers["authorization"];

//     if (!token) {
//         return res.status(401).json({ success: false, message: "Token is required" });
//     }

//     try {
//         const decoded = jwt.verify(token, config.secret_jwt);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ success: false, message: "Invalid token" });
//     }
// };

// module.exports = verifyToken;
