# Pet Adoption Platform

A full-stack web application that connects pet lovers with pets in need of new homes. The platform enables browsing available pets, submitting adoption applications, and securely uploading pets for rehoming — all through a structured verification workflow to ensure safety, authenticity, and responsible adoptions.

🔗 Live Demo: https://pet-adoption-tan-six.vercel.app/

---

## Table of Contents

- [Key Features](#key-features)
  - [User Features](#user-features)
  - [Admin Features](#admin-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone & Install](#clone--install)
  - [Environment Variables](#environment-variables)
  - [Run Locally](#run-locally)
- [Deployment](#deployment)
- [Project Roadmap / Next Version](#project-roadmap--next-version)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Key Features

### User Features
1. **Browse Pets**  
   - View pets with details: breed, age, location, health info, and adoption status.

2. **Submit Adoption Application**  
   - Select a pet and send an adoption application.
   - Application enters an admin review workflow; only verified applicants are approved.

3. **Upload a Pet for Adoption**  
   - Users can upload pet photos and details (breed, age, health info, reason for rehoming).
   - Uploaded listings remain pending until admin verification/approval.

4. **Secure Authentication**  
   - JWT-based authentication
   - Protected routes
   - Role-based access (regular users and admins)

### Admin Features
1. **Manage Pet Listings**  
   - View, verify, approve or reject user-submitted pet listings.

2. **Validate Adoption Applications**  
   - Review applicant background, home environment, and prior pet experience.
   - Cross-check application details before approval.

3. **Enforce Adoption Rules**  
   - Ensure requests follow platform guidelines and notifications.

4. **Approve or Reject Applications**  
   - Approve suitable homes; reject unsuitable applications to protect pet welfare.

---

## Tech Stack

| Layer       | Technology      |
|-------------|-----------------|
| Frontend    | React           |
| Backend     | Node.js, Express|
| Database    | MongoDB (Atlas) |
| Image Store | Cloudinary      |
| Auth        | JWT             |
| Deployment  | Vercel (frontend), Railway (backend) |

---

## Getting Started

### Prerequisites
- Node.js (recommended v16+)
- npm or yarn
- MongoDB Atlas account or accessible MongoDB URI
- Cloudinary account (for image uploads)
- (Optional) Railway and Vercel accounts for deployment

### Clone & Install
```bash
git clone https://github.com/kshubham5642/pet-adoption-platform.git
cd pet-adoption-platform

Install dependencies in both frontend and backend folders:

# from repo root
cd backend
npm install

cd ../frontend
npm install

Environment Variables

Create a .env file in the backend folder with the following variables:

PORT=5000
MongoDBURI=YOUR_DATABASE_URL
SECRET=YOUR_JWT_SECRET

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

ADMIN_SECRET_KEY=YOUR_ADMIN_KEY
NODE_ENV=production


Keep secrets safe and do not commit .env to version control. Use environment settings in your cloud provider for production.

Run Locally

Start the backend:

cd backend
npm start


Start the frontend (development mode):

cd frontend
npm run dev


The frontend should point to your backend API base URL (check frontend config or .env for the API endpoint).

Deployment

Frontend: Vercel (recommended for static React builds / Next.js)

Backend: Railway (or any Node.js host)

Database: MongoDB Atlas

Images: Cloudinary

When deploying, set the same environment variables on your host (Railway/Vercel environment settings) instead of using local .env files.

Project Roadmap / Next Version (Planned Enhancements)

Planned features for upcoming releases:

Advanced Home Verification System

Upload home photos/videos

AI-assisted suitability scoring (future integration)

Automated Pet Health Checks

Vaccination tracking

Medical document uploads

Age verification

Real-Time Application Status Tracking

Live status updates: Under Review, Approved, Rejected

Chat System Between User & Admin

Direct messaging for clarifications and document exchange

Multi-Image Upload Optimization

Cloudinary transformations for faster loading and responsive images

Admin Dashboard 2.0

Analytics, adoption statistics, and user trust scoring

Contributing

Fork the repo

Create a feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m "Add feature")

Push to the branch (git push origin feature/YourFeature)

Open a Pull Request

Please follow the existing code style and add tests where possible.

License

This project can include an open source license of your choice (e.g., MIT). Add a LICENSE file to the repo and update this section accordingly.

Contact

Project repository: https://github.com/kshubham5642/pet-adoption-platform
Live site: https://pet-adoption-tan-six.vercel.app/
