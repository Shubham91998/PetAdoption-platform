# Pet Adoption Platform

Welcome to the **Pet Adoption Platform**, a web application designed to connect pet lovers with pets in need of a new home. This platform allows users to browse available pets, adopt pets, and even upload pets for adoption. Admins manage the adoption process, verify users, and ensure that all rules and guidelines are followed.

# Link to visit website

https://pet-adoption-tan-six.vercel.app/

## Features

### User Features
1. **Pet List**: Browse a list of available pets for adoption.
2. **Adopt a Pet**: Click on the "Adopt" link to fill out an adoption form. The admin will validate the user and verify the adoption request.
3. **Upload a Pet**: If a user wants to give their pet up for adoption, they can click the "Upload Pet" link, fill out a form, and submit it for admin verification.
4. **Authentication**: Users can sign up, log in, and log out securely.

### Admin Features
1. **Manage Pets**: Admins can view and manage all pets uploaded by users.
2. **Validate Users**: Admins verify user information when an adoption request is submitted.
3. **Verify Rules**: Admins ensure that all adoption requests comply with the rules listed in the notification tab.
4. **Add Pets to App**: If a pet and user are valid, the admin can add the pet to the app's pet list.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/kshubham5642-adoption-platform.git
   cd pet-adoption-platform
   ```

Install Dependencies

Navigate to both the client and server directories and install the required dependencies.

```sh
cd frontend || cd backend
npm install
```
### Create .env file in the server directory and add the following variables:
```sh
PORT = YOUR_PORT_NO

MongoDBURI = YOUR_DATABASE_URL

SECRET = YOUR_JWT_SECRET

CLOUDINARY_CLOUD_NAME = YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY = YOUR_CLOUDINARY_KEY
CLOUDINARY_API_SECRET = YOUR_CLOUDINARY_SECRET

ADMIN_SECRET_KEY = YOUR_ADMIN_KEY
NODE_ENV = production


```




### Start the backend server:

```
npm start
```
### Start the frontend server:

```
npm run dev
```


