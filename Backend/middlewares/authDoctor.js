import jwt from "jsonwebtoken"

//doctor authentication middleware

const authDoctor = (req, res, next) => {
    try {
        // Handle both token formats: direct dtoken or Authorization Bearer
        let token = req.headers.dtoken;
        
        // If no direct token, check Authorization header
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); // Remove 'Bearer ' prefix
            }
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing"
            })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        // Set docId in both req.body (for POST) and req (for GET)
        if (!req.body) req.body = {};
        req.body.docId = token_decode.id;
        req.docId = token_decode.id;

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export default authDoctor