import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/HomePage.jsx';
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

function App() {
  const ProcessWrapper = () =>{
    const {status} = useParams();
    return <Process status={status} />

  }
 

  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Services' element={<Service/>}/>
        <Route path='/Availablepet' element={<AllPet/>}/>
        <Route path='/Process' element={<ProcessPage/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        {/* <Route path='/PetManage' element={<ManageRoute/>}/> */}
        <Route path='/form' element={<AdoptionForm/>}/>
        <Route path="/AdoptionProcess/:petId" element={<Petreas />} />
        <Route path="/Manageallpet" element={<ManagePet />} />
        <Route path="/ManageallGet" element={<PetpostAndGet />} />
        <Route path="/Process/:status" element={<ProcessWrapper />} />
        <Route element={<AdminRoutePro />}>
                    <Route path="/PetManage" element={<ManageRoute />} />
        </Route>
      
      </Routes>
      <Toaster />
      <PetChatbot />
    </div>
    </>
  )
}

export default App
