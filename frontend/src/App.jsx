import React from 'react'
import { Route, Routes, useParams } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from "./home/Home";
import Service from "./ServicePage/ServicesPage"
import AllPet from './component/Pet/AllPet';
import ProcessForm from './component/Process/ProcessForm';
import Signup from './component/Signup';
import ManageRoute from './component/ManagePets/ManageRoute';
import AdoptionForm from './component/AdoptionForm';
import Petreas from './component/delivered/Petreas';
import ManagePet from './component/ManagePets/ManagePet';
import PetpostAndGet from "./component/ManagePets/PetpostAndGet";
import Process from './component/Process';
import AdminRoutePro from "./component/AdminRoutePro"
import About from "./component/About"


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
        <Route path='/Process' element={<ProcessForm/>}/>
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
    </div>
    </>
  )
}

export default App
