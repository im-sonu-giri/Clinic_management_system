import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing"
            });
        }

        const token = authHeader.split(" ")[1];

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // simple admin check
        if (token_decode.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized. Login again"
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authAdmin;