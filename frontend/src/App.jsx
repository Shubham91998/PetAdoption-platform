// frontend/src/App.jsx
import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './GroomingPage/context/SocketContext.jsx';
import { useAuth } from './hooks/useAuth.jsx';

// Existing Pet Adoption Platform Pages
import Home from './home/Home.jsx';
import Service from './pages/ServicesPage.jsx';
import AllPet from './pages/AllPetsPage.jsx';
import ProcessPage from './pages/ProcessPage.jsx';
import Signup from './pages/SignupPage.jsx';
import ManageRoute from './pages/ManageRoutePage.jsx';
import AdoptionForm from './pages/AdoptionFormPage.jsx';
import Petreas from './pages/PetRequestDetailsPage.jsx';
import ManagePet from './pages/ManagePetPage.jsx';
import PetpostAndGet from './pages/PetRequestsPage.jsx';
import Process from './components/ProcessSection.jsx';
import AdminRoutePro from './components/auth/AdminRoute.jsx';
import About from './pages/AboutPage.jsx';
import PetChatbot from './components/PetChatbot.jsx';

// New Grooming Service Marketplace Pages
import BecomeProvider from './GroomingPage/BecomeProvider.jsx';
import AdminProviderVerification from './GroomingPage/AdminProviderVerification.jsx';
import Groomers from './GroomingPage/Grommers.jsx';
import GroomerProfile from './GroomingPage/GroomerProfile.jsx';
import Chat from './GroomingPage/Chat.jsx';
import BookAppointment from './GroomingPage/BookAppointment.jsx';
import ProviderDashboard from './GroomingPage/ProviderDashboard.jsx';
import UserBookings from './GroomingPage/UserBookings.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import UserDashboard from './GroomingPage/UserDashboard.jsx';
function App() {
  const ProcessWrapper = () => {
    const { status } = useParams();
    return <Process status={status} />
  }

  const { authUser } = useAuth();

  return (
    <SocketProvider userId={authUser?._id}>
      <div>
        <Routes>
          {/* Existing Pet Adoption Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/Services' element={<Service />} />
          <Route path='/Availablepet' element={<AllPet />} />
          <Route path='/Process' element={<ProcessPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path='/form' element={<AdoptionForm />} />
          <Route path="/AdoptionProcess/:petId" element={<Petreas />} />
          <Route path="/Manageallpet" element={<ManagePet />} />
          <Route path="/ManageallGet" element={<PetpostAndGet />} />
          <Route path="/Process/:status" element={<ProcessWrapper />} />
          
          {/* Admin Route for Pet Management */}
          <Route element={<AdminRoutePro />}>
            <Route path="/PetManage" element={<ManageRoute />} />
          </Route>

          {/* ========== NEW GROOMING SERVICE MARKETPLACE ROUTES ========== */}

          {/* Public Grooming Routes - Anyone can view */}
          <Route path="/groomers" element={<Groomers />} />
          <Route path="/groomer/:id" element={<GroomerProfile />} />
          
          {/* Protected Routes - Login Required */}
          <Route path="/become-provider" element={
            <ProtectedRoute>
              <BecomeProvider />
            </ProtectedRoute>
          } />
          
          {/* Booking Routes - Only for users */}
          <Route path="/book/:providerId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <BookAppointment />
            </ProtectedRoute>
          } />
          
          {/* Chat Routes - For both users and providers */}
          <Route path="/chat" element={
            <ProtectedRoute allowedRoles={['user', 'provider']}>
              <Chat />
            </ProtectedRoute>
          } />
          <Route path="/chat/:providerId" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Chat />
            </ProtectedRoute>
          } />
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserBookings />
            </ProtectedRoute>
          } />
          
          {/* Provider Dashboard Routes */}
          <Route path="/provider/dashboard" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          } />
          <Route path="/provider/bookings" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Provider Verification Route */}
          <Route path="/admin/provider-verification" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProviderVerification />
            </ProtectedRoute>
          } />
          
        </Routes>
        <Toaster />
        <PetChatbot />
      </div>
    </SocketProvider>
  )
}

export default App















































// import React from 'react';
// import { Route, Routes, useParams } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Home from './pages/HomePage.jsx';
// import Service from './pages/ServicesPage.jsx';
// import AllPet from './pages/AllPetsPage.jsx';
// import ProcessPage from './pages/ProcessPage.jsx';
// import Signup from './pages/SignupPage.jsx';
// import ManageRoute from './pages/ManageRoutePage.jsx';
// import AdoptionForm from './pages/AdoptionFormPage.jsx';
// import Petreas from './pages/PetRequestDetailsPage.jsx';
// import ManagePet from './pages/ManagePetPage.jsx';
// import PetpostAndGet from './pages/PetRequestsPage.jsx';
// import Process from './components/ProcessSection.jsx';
// import AdminRoutePro from './components/auth/AdminRoute.jsx';
// import About from './pages/AboutPage.jsx';
// import PetChatbot from './components/PetChatbot.jsx';

// function App() {
//   const ProcessWrapper = () =>{
//     const {status} = useParams();
//     return <Process status={status} />

//   }
 

//   return (
//     <>
//     <div>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/Services' element={<Service/>}/>
//         <Route path='/Availablepet' element={<AllPet/>}/>
//         <Route path='/Process' element={<ProcessPage/>}/>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/about" element={<About />} />
//         {/* <Route path='/PetManage' element={<ManageRoute/>}/> */}
//         <Route path='/form' element={<AdoptionForm/>}/>
//         <Route path="/AdoptionProcess/:petId" element={<Petreas />} />
//         <Route path="/Manageallpet" element={<ManagePet />} />
//         <Route path="/ManageallGet" element={<PetpostAndGet />} />
//         <Route path="/Process/:status" element={<ProcessWrapper />} />
//         <Route element={<AdminRoutePro />}>
//                     <Route path="/PetManage" element={<ManageRoute />} />
//         </Route>
      
//       </Routes>
//       <Toaster />
//       <PetChatbot />
//     </div>
//     </>
//   )
// }

// export default App
