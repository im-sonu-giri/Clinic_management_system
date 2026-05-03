import jwt from "jsonwebtoken"

// middleware for changing header token into user identity (userId)

const authUser = (req, res, next) => {
    try {
        // Handle both token formats: direct token or Authorization Bearer
        let token = req.headers.token;
        
        // If no direct token, check Authorization header
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        // If token is not found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing"
            })
        }

        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // Set userId in both req.body (for POST) and req (for GET)
        if (!req.body) req.body = {};
        req.body.userId = token_decode.id;
        req.userId = token_decode.id;

        next()

    } catch (error) {
        console.log('Auth middleware - Error:', error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

export default authUser;