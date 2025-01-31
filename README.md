# MarSUKAT - Production Monitoring and Inventory Management System

## 📖 About

MarSUKAT (Marinduque State University Production and Inventory System) is a capstone project developed by Chester Luke Maligaso. The system is designed to streamline the management of academic apparel, including production, inventory, rentals, and sales tracking for Marinduque State University.

### ✨ Key Features

- 👔 Academic Apparel Management
- 📦 Inventory Tracking
- 📊 Sales & Production Reports
- 👥 User Management
- 📅 Rental System
- 🏭 Production Management
- 📝 Order Processing

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

## 📂 Frontend Setup

### Installation Steps

1. Clone the repository: 
```bash
git clone https://github.com/Kukaas/MarSUKAT.git
cd MarSUKAT
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory with:
```env
VITE_API_BASE_URL=your_api_url
```

4. Start the development server:
```bash
npm run dev
```

### 🛠️ Frontend Tech Stack
- React + Vite
- Radix UI Components
- FullCalendar
- React Hook Form
- ShadcnUI
- TailwindCSS

## 🖥️ Backend Setup

### Installation Steps

1. Clone the repository:
```bash 
git clone https://github.com/Kukaas/MarSUKAT-Server.git
cd MarSUKAT-Server
```

2. Navigate to the server directory:
```bash
cd MarSUKAT-Server
```
3. Install dependencies:
```bash
npm install
```

4. Configure environment variables:
   Create a `.env` file in the server directory with:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AUTH_EMAIL=your_email_for_notifications
AUTH_PASSWORD=your_email_password
```

5. Start the server:
```bash
npm run dev
```

### 🛠️ Backend Tech Stack
- Express.js
- MongoDB with Mongoose
- Node.js
- JWT Authentication
- Nodemailer

## 📁 Project Structure

**Frontend**
```
MarSUKAT/
├── public/             # Public assets
├── src/                # Frontend source files
├── .env                # Environment variables
├── eslint.config.js    # ESLint configuration
├── .gitignore          # Git ignore file
├── index.html          # HTML entry point
├── jsconfig.json       # JavaScript configuration
├── package-lock.json   # Package lock file
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # TailwindCSS configuration
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel configuration
├── vite.config.js      # Vite configuration
```

**Backend**
```
MarSUKAT-Server/
├── app/                # Express application
├── controllers/        # Route controllers
├── models/             # Database models
├── public/             # Public assets
├── routes/             # API routes
├── views/              # Email templates
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── index.js            # Server entry point
├── package.json        # Project dependencies
├── package-lock.json   # Package lock file
├── vercel.json         # Vercel configuration
```

## 🤝 Contributing

While this is a capstone project, contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 👨‍💻 Developer

**Chester Luke Maligaso**  
Marinduque State University

---

<div align="center">
  <p>Made with ❤️ for Marinduque State University</p>
</div> 


