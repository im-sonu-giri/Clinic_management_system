import jwt from "jsonwebtoken"

// middleware for change the header into a userId

const authUser = (req, res, next) => {
    try {

        const {token}  = req.headers

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing"
            })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = token_decode.id

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

export default authUser