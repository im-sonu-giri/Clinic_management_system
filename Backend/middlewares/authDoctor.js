import jwt from "jsonwebtoken"

//doctor authentication middleware

const authDoctor = (req, res, next) => {
    try {

        const {dtoken}  = req.headers

        if (!dtoken) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing"
            })
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)

        req.body.docId = token_decode.id

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