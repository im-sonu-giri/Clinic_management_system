import express from 'express';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';


// router
const adminRouter = express.Router()
// for form data we had to send the image so for that we used middleware upload
adminRouter.post('/add-doctor',upload.single('image'), addDoctor)

export default adminRouter

