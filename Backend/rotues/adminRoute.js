import express from 'express';
import { addDoctor, allDoctors, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js'


// router
const adminRouter = express.Router()
// for form data we had to send the image so for that we used middleware upload
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)

export default adminRouter

