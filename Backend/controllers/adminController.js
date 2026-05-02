// import validator from "validator";
// import bcrypt from "bcrypt";
// import { v2 as cloudinary } from "cloudinary";
// import doctorModel from "../models/doctorModel.js";
// import jwt from "jsonwebtoken";

// // api for adding doctors
// const addDoctor = async (req, res) => {
//     try {
//         const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
//         const imageFile = req.file;

//         // checking for all data to add doctor in database
//         if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Missing Details'
//             });
//         }

//         // validate the email format
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid email format"
//             });
//         }

//         // validate strong password
//         if (!validator.isStrongPassword(password)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password is not strong enough"
//             });
//         }

//         // hashing doctor password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // upload image to cloudinary
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//             resource_type: "image"
//         });

//         const imageUrl = imageUpload.secure_url;

//         // safe address parsing
//         let parsedAddress;
//         try {
//             parsedAddress = JSON.parse(address);
//         } catch (err) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid address format"
//             });
//         }

//         // json for data to pass in the doctor model
//         const doctorData = {
//             name,
//             email,
//             image: imageUrl,
//             password: hashedPassword,
//             speciality,
//             degree,
//             experience,
//             fees,
//             about,
//             address: parsedAddress,
//             date: Date.now()
//         };

//         const newDoctor = new doctorModel(doctorData);
//         await newDoctor.save();

//         res.status(201).json({
//             success: true,
//             message: "Doctor added"
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// // api for the admin login
// // api/admin/login
// const  loginAdmin =(req, res) =>{
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email and password required"
//             });
//         }
//         if (
//             email !== process.env.ADMIN_EMAIL &&
//             password !== process.env.ADMIN_PASSWORD
//         ) {
//             // token create and send to the user
//             const token = jwt.sign(email+password, process.env.JWT_SECRET)
//             res.json({ success:true, token})


//         } else{
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid admin credentials"
//             });
//         }

//         next();


        
//     } catch (error) {
//         console.log(error)
//           res.status(500).json({
//             success: false,
//             message: error.message
//         });
        
//     }

// }

// export { addDoctor , loginAdmin};


import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// api for adding doctors
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // checking for all data to add doctor in database
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.status(400).json({
                success: false,
                message: 'Missing Details'
            });
        }

        // validate the email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // validate strong password
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password is not strong enough"
            });
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        });

        const imageUrl = imageUpload.secure_url;

        // safe address parsing
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid address format"
            });
        }

        // json for data to pass in the doctor model
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            fees,
            about,
            address: parsedAddress,
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: "Doctor added"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// api for the admin login
// api/admin/login
const loginAdmin = (req, res) => {
    try {
        const { email, password } = req.body;

        // checking email and password are provided or not
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });
        }

        // validate admin credentials
        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }

        // token create and send to the admin
        const token = jwt.sign(
            { email, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// api to get all doctorlist for admin pannel
const allDoctors = async(res, req) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password') // getall data exclude password
        res.json({success:false, message:error.message})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// API to get all appointments list
const appointmentsAdmin = async(req, res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})

    } catch (error) {
         console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
}
// Api to cancle appointment
const appointmentCancel= async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointment = await appointmentModel.findById(appointmentId)

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
// API to get dashboard data for admin pannel

const adminDashboard = async(req, res)=>{
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true, dashData})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
export { addDoctor, loginAdmin, allDoctors , appointmentsAdmin, appointmentCancel, adminDashboard};