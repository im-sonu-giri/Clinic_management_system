# Clinic Management System

A comprehensive full-stack Clinic Management System built to streamline healthcare operations, including patient management, appointment scheduling, doctor management, and administrative dashboards. Designed with a modern UI and scalable backend for real-world healthcare environments.

## 🚀 Live Demo

### Frontend (User Application)
👉 https://clinic-management-system-frontend-4d6p.onrender.com

### Admin Panel
👉 https://clinic-management-system-3.onrender.com

## 🌟 Features

### Admin Panel
- **Dashboard**: Real-time statistics and analytics
- **Doctor Management**: Add, edit, and manage doctors with comprehensive profiles
- **Appointment Management**: View, schedule, and cancel appointments
- **User Management**: Manage patient accounts and records
- **Professional UI**: Modern, responsive interface with enhanced UX

### Doctor Portal
- **Profile Management**: Update personal information and availability
- **Appointment Scheduling**: Manage appointment slots and bookings
- **Patient Records**: View and manage patient medical history
- **Notifications**: Real-time updates for new appointments

### Patient Portal
- **Easy Booking**: Simple appointment scheduling interface
- **Medical History**: Access to personal health records
- **Doctor Search**: Find specialists by expertise
- **Reminders**: Automated appointment notifications

## 🏗️ Architecture

### Frontend (React)
- **Admin Panel**: `/admin` - Built with React, TailwindCSS, and modern UI components
- **Patient Portal**: `/frontend` - User-friendly interface for patients
- **State Management**: React Context for global state
- **UI Components**: Professional, responsive design with accessibility features

### Backend (Node.js/Express)
- **RESTful APIs**: Secure and scalable API endpoints
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based secure authentication
- **File Storage**: Cloudinary integration for image uploads
- **Validation**: Comprehensive input validation and sanitization

### Database (MongoDB)
- **Collections**: Users, Doctors, Appointments, Medical Records
- **Relationships**: Properly structured data relationships
- **Indexing**: Optimized queries for performance

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Clinic_management_system
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   cp .env.example .env
   # Configure your environment variables in .env
   npm run server
   ```

3. **Admin Panel Setup**
   ```bash
   cd admin
   npm install
   cp .env.example .env
   # Configure VITE_BACKEND_URL in .env
   npm run dev
   ```

4. **Patient Portal Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure environment variables
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI = "your_mongodb_connection_string"
CLOUDINARY_NAME = 'your_cloudinary_name'
CLOUDINARY_API_KEY = 'your_cloudinary_api_key'
CLOUDINARY_SECRET_KEY = 'your_cloudinary_secret'
ADMIN_EMAIL='admin@example.com'
ADMIN_PASSWORD='secure_admin_password'
JWT_SECRET="your_jwt_secret_key"
```

#### Frontend (.env)
```env
VITE_BACKEND_URL ="http://localhost:4000"
```

## 📁 Project Structure

```
Clinic_management_system/
├── Backend/                 # Node.js/Express API
│   ├── controllers/         # API controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middlewares/        # Custom middlewares
│   ├── config/             # Database configuration
│   └── server.js           # Main server file
├── admin/                  # React Admin Panel
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context
│   │   ├── pages/          # Page components
│   │   └── assets/         # Static assets
│   └── package.json
├── frontend/               # React Patient Portal
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── assets/
│   └── package.json
└── README.md
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds (12)
- **Input Validation**: Comprehensive server-side validation
- **XSS Protection**: Input sanitization and escaping
- **File Upload Security**: Type and size validation
- **Rate Limiting**: Protection against brute force attacks
- **Environment Variables**: Secure configuration management

## 🛠️ Technologies Used

### Frontend
- **React 19**: Modern React with hooks and context
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Toastify**: Notification system
- **Vite**: Fast build tool

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Cloudinary**: Image storage
- **Multer**: File upload handling
- **Validator**: Input validation

### Development Tools
- **Nodemon**: Auto-restart for development
- **ESLint**: Code linting
- **Git**: Version control

## 📊 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/user/login` - User login
- `POST /api/user/register` - User registration

### Admin Management
- `GET /api/admin/dashboard` - Dashboard statistics
- `POST /api/admin/add-doctor` - Add new doctor
- `GET /api/admin/all-doctors` - Get all doctors (with pagination)
- `GET /api/admin/appointments` - Get all appointments
- `POST /api/admin/cancel-appointment` - Cancel appointment

### Doctor Management
- `GET /api/doctor/profile` - Get doctor profile
- `PUT /api/doctor/update` - Update doctor profile
- `GET /api/doctor/appointments` - Get doctor appointments
- `POST /api/doctor/update-slots` - Update available slots

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/update` - Update user profile
- `GET /api/user/appointments` - Get user appointments
- `POST /api/user/book-appointment` - Book appointment

## 🎨 UI/UX Features

### Admin Panel
- **Professional Design**: Modern, clean interface
- **Responsive Layout**: Works on all device sizes
- **Interactive Elements**: Hover effects and transitions
- **Form Validation**: Real-time validation feedback
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages

### Forms
- **Smart Validation**: Field-specific error messages
- **Image Upload**: Drag-and-drop with preview
- **Character Counters**: For text areas
- **Auto-complete**: Smart suggestions
- **Progress Indicators**: Multi-step forms

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd admin
npm test
```

### Building for Production
```bash
# Admin panel
cd admin
npm run build

# Patient portal
cd frontend
npm run build
```

### Code Quality
```bash
# Linting
npm run lint

# Format code
npm run format
```

## 📈 Performance Optimizations

- **Database Indexing**: Optimized query performance
- **Image Optimization**: Cloudinary auto-optimization
- **Code Splitting**: Lazy loading for better performance
- **Caching**: Response caching where appropriate
- **Compression**: Gzip compression for API responses
- **Minification**: Production build optimization

## 🐛 Bug Fixes & Improvements

### Recent Fixes
- ✅ Fixed sidebar layout issues
- ✅ Enhanced form validation
- ✅ Improved error handling
- ✅ Added loading states
- ✅ Fixed API authentication
- ✅ Enhanced security measures
- ✅ Professional UI improvements

### Known Issues
- None currently reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Use ES6+ syntax
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Maintain consistent code formatting



**Built with ❤️ for better healthcare management**
