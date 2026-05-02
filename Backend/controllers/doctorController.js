import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"


const changeAvailability = async (req, res) => {
    try {

        const { docId } = req.body

        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID missing" })
        }

        const docData = await doctorModel.findById(docId)

        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" })
        }

        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        })

        res.json({ success: true, message: "Availability Changed" })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
            .select('-password -email')

        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// Api for doctor login
const loginDoctor = async(req, res) =>{
    try {
        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false, message:"Invalid Crendientials"})
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json ({success:true, token})
        }else{
            return res.json({success:false, message:"Invalid Crendientials"})

        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}
// API to get all the Appointments of specific doctor

const appointmentsDoctor = async(res, req)=>{
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        res.json({success:true, appointments})
        
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}
// API to mark appointment completed for doctor pannel
const appointmentComplete = async(req, res)=>{
    try {
        const {docId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByI
            dAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true, message:'appointment completed'})
            
        } else {
            return res.json({success:false, message:'Mark failed'})
            
        }
        
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}
// API to cancel appointment for the doctor Pannel

const appointmentCancel = async(req, res)=>{
    try {
        const {docId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByI
            dAndUpdate(appointmentId,{cancelled: true})
            return res.json({success:true, message:'appointment cancelled'})
            
        } else {
            return res.json({success:false, message:'Cancellation failed'})
            
        }
        
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete}