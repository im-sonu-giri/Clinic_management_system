import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

// api to registr user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email" })
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be strong"
            })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email: validator.normalizeEmail(email),
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Api for user login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            )

            return res.json({ success: true, token })

        } else {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// API to get users profile data

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID missing"
            })
        }

        const userData = await userModel.findById(userId).select('-password')

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.json({
            success: true,
            userData
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// API TO UPDATE user profile

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        if (!name || !phone || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Data missing"
            })
            await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
            if (imageFile) {
                //upload image to cloudinary

                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
                const imageURL = imageUpload.secure_url
                await userModel.findByIdAndUpdate(userId, { image: imageURL })
            }
            res.json({ success: true, message: "profile updated" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}
// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({
                success: false,
                message: 'Doctor not available'
            });
        }
        let slots_booked = docData.slots_booked
        if (slots_booked[slotDate]) {
            // check if time already booked
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({
                    success: false,
                    message: 'Slot already booked'
                });
            } else {
                // add new time to existing date
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            // create new date entry
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        };
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate|(docId,{slots_booked})
        res.json({success:true, message:'Appointment Book'})


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

//api to get user appointmen for frontend my_appointment page

const listAppointment  = async(req, res)=>{
    try {
        const [userId] = req.body
        const appointments = await appointmentModel.find({userId})
        res.json({success:true, appointments})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment}