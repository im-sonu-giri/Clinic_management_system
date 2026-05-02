// import validator from 'validator'
// import bcrypt from 'bcrypt'
// import userModel from '../models/userModel.js'
// import jwt from 'jsonwebtoken'
// import { v2 as cloudinary } from "cloudinary"
// import doctorModel from '../models/doctorModel.js'
// import appointmentModel from '../models/appointmentModel.js'

// // api to registr user
// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body

//         if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: "Missing Details" })
//         }

//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ success: false, message: "Invalid Email" })
//         }

//         if (!validator.isStrongPassword(password)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password must be strong"
//             })
//         }

//         const existingUser = await userModel.findOne({ email })
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "User already exists" })
//         }

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const userData = {
//             name,
//             email: validator.normalizeEmail(email),
//             password: hashedPassword
//         }

//         const newUser = new userModel(userData)
//         const user = await newUser.save()

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '7d' }
//         )

//         res.status(201).json({ success: true, token })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// // Api for user login

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body

//         const user = await userModel.findOne({ email })

//         if (!user) {
//             return res.status(400).json({ success: false, message: 'User does not exist' })
//         }

//         const isMatch = await bcrypt.compare(password, user.password)

//         if (isMatch) {

//             const token = jwt.sign(
//                 { id: user._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '7d' }
//             )

//             return res.json({ success: true, token })

//         } else {
//             return res.status(400).json({ success: false, message: "Invalid Credentials" })
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
// // API to get users profile data

// const getProfile = async (req, res) => {
//     try {
//         const { userId } = req.body

//         if (!userId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User ID missing"
//             })
//         }

//         const userData = await userModel.findById(userId).select('-password')

//         if (!userData) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         res.json({
//             success: true,
//             userData
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
// // API TO UPDATE user profile

// const updateProfile = async (req, res) => {
//     try {
//         const { userId, name, phone, address, dob, gender } = req.body
//         const imageFile = req.file
//         if (!name || !phone || !dob || !gender) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Data missing"
//             })
//             await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
//             if (imageFile) {
//                 //upload image to cloudinary

//                 const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
//                 const imageURL = imageUpload.secure_url
//                 await userModel.findByIdAndUpdate(userId, { image: imageURL })
//             }
//             res.json({ success: true, message: "profile updated" })
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }

// }
// // API to book appointment
// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, docId, slotDate, slotTime } = req.body
//         const docData = await doctorModel.findById(docId).select('-password')

//         if (!docData.available) {
//             return res.json({
//                 success: false,
//                 message: 'Doctor not available'
//             });
//         }
//         let slots_booked = docData.slots_booked
//         if (slots_booked[slotDate]) {
//             // check if time already booked
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({
//                     success: false,
//                     message: 'Slot already booked'
//                 });
//             } else {
//                 // add new time to existing date
//                 slots_booked[slotDate].push(slotTime);
//             }
//         } else {
//             // create new date entry
//             slots_booked[slotDate] = []
//             slots_booked[slotDate].push(slotTime)
//         }
//         const userData = await userModel.findById(userId).select('-password')

//         delete docData.slots_booked

//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now()
//         };
//         const newAppointment = new appointmentModel(appointmentData)
//         await newAppointment.save()

//         // save new slots data in docData
//         await doctorModel.findByIdAndUpdate | (docId, { slots_booked })
//         res.json({ success: true, message: 'Appointment Book' })


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }
// }

// //api to get user appointmen for frontend my_appointment page

// const listAppointment = async (req, res) => {
//     try {
//         const [userId] = req.body
//         const appointments = await appointmentModel.find({ userId })
//         res.json({ success: true, appointments })


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
// // api to cancel appointment
// const cancelAppointment = async (req, res) => {
//     try {
//         const { userId, appointmentId } = req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)
//         // verify appointment user
//         if (appointmentData.userId !== userId) {
//             return res.json({ success: false, message: "unauthorized action" })
//         }
//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

//         // releasing doctor slots
//         const { docId, slotDate, slotTime } = appointmentData
//         const doctorData = await doctorModel.findById(docId)
//         let slots_booked = doctorData.slots_booked
//         slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
//         await doctorModel.findByIdAndUpdate(docId, { slots_booked })
//         res.json({ success: true, message: 'Appointment cancelled' })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }
// }
// const khaltiInstance = new khalti({
//     key_id: process.env.KHALTI_KEY_ID,
//     key_secret: process.env.KHALTI_KEY_SECRET
// })
// // API to make payment of appointment 
// const paymentKhaltipay = async (req, res) => {
//     try {


//         const { appointmentId } = req.body

//         const appointmentData = await appointmentModel.findById(appointmentId)
//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({ success: false, message: "Appointment cancelled or not found" })
//         }
//         // creating options for khalti payment
//         const options = {
//             amount: appointmentData.amount,
//             currency: process.env.CURRENCY,
//             receipt: appointmentId,
//         }
//         //creation of an order
//         const order = await khaltiInstance.orders.create(options)
//         res.json({ success: true, order })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }

// }


// export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentKhaltipay }

import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import axios from "axios"



// ================= REGISTER =================
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

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email: validator.normalizeEmail(email),
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



// ================= LOGIN =================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



// ================= GET PROFILE =================
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Missing data" })
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        })

        if (imageFile) {
            const upload = await cloudinary.uploader.upload(imageFile.path)
            await userModel.findByIdAndUpdate(userId, { image: upload.secure_url })
        }

        res.json({ success: true, message: "Profile updated" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



// ================= BOOK APPOINTMENT =================
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId)
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" })
        }

        let slots_booked = docData.slots_booked || {}

        if (slots_booked[slotDate]?.includes(slotTime)) {
            return res.json({ success: false, message: "Slot already booked" })
        }

        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = []
        }

        slots_booked[slotDate].push(slotTime)

        const userData = await userModel.findById(userId).select('-password')

        const appointment = await appointmentModel.create({
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        })

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment booked", appointment })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



// ================= LIST APPOINTMENTS =================
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body

        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



// ================= CANCEL =================
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body

        const appointment = await appointmentModel.findById(appointmentId)

        if (appointment.userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const doctor = await doctorModel.findById(appointment.docId)

        let slots = doctor.slots_booked
        slots[appointment.slotDate] =
            slots[appointment.slotDate].filter(t => t !== appointment.slotTime)

        await doctorModel.findByIdAndUpdate(appointment.docId, { slots_booked: slots })

        res.json({ success: true, message: "Appointment cancelled" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



// ================= KHALTI PAYMENT INIT =================
const paymentKhaltipay = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointment = await appointmentModel.findById(appointmentId)

        if (!appointment || appointment.cancelled) {
            return res.json({ success: false, message: "Invalid appointment" })
        }

        res.json({
            success: true,
            amount: appointment.amount
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}



// ================= KHALTI VERIFY =================
const verifyKhaltiPayment = async (req, res) => {
    try {
        const { token, amount, appointmentId } = req.body

        const response = await axios.post(
            "https://khalti.com/api/v2/payment/verify/",
            { token, amount },
            {
                headers: {
                    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
                }
            }
        )

        if (response.data.idx) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                payment: true
            })

            res.json({ success: true, message: "Payment verified" })
        } else {
            res.json({ success: false, message: "Verification failed" })
        }

    } catch (error) {
        console.log(error.response?.data || error.message)
        res.json({ success: false, message: "Verification failed" })
    }
}



export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentKhaltipay,
    verifyKhaltiPayment
}