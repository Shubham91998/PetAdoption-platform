import React from 'react'

const YoucanDo = () => {
  return (
    <>
      <div>
      
      <div className="px-5 py-8 ">
            <div className="row">
                <div className="border-t-2 border-t-blue-800">
                    <div className="pt-7">
                        <h2><span className="text-cyan-700 text-2xl font-semibold">What You Can Do?</span></h2>
                    </div>
                    <div className="text-sm font-sans gap-0 ">
                        <p>Do you want to bring about a positive change in the lives of our voiceless friends? Here’s a great opportunity to show your compassion and love. Choose the one that suits you best.</p>
                    </div>
                </div>
            </div>
            <div>
        
            <div className="py-10 grid grid-cols-2 display sm:flex gap-5 md:justify-between">
                <div className="column quarter">
                    <div className="blurb">
                            <img className='h-56 w-56 rounded-sm' src="https://iadopt.in/wp-content/uploads/2020/02/iadopt-adopt-foster-a-pet-1.jpg" alt="Foster"/>
                            <h2 className="mt-5 flex justify-center items-center bg-teal-400 rounded-md py-1 text-md hover:bg-teal-500 cursor-pointer">Foster</h2>
                       
                    </div>
                </div>
        
                <div className="column quarter">
                    <div className="blurb">
                    
                        <img className='h-56 w-56 rounded-sm' src="https://iadopt.in/wp-content/uploads/2020/02/iadopt-volunteer-to-help-pets-get-adopted-1.jpg" alt="Volunteer"/>
                        <h2 className="mt-5 flex justify-center items-center bg-teal-400 rounded-md py-1 text-md hover:bg-teal-500 cursor-pointer">Volunteer</h2>
                    
                    </div>
                </div>
        
                <div className="column quarter">
                    <div className="blurb">
                        <img className='h-56 w-56 rounded-sm' src="https://iadopt.in/wp-content/uploads/2020/02/iadopt-Feed-the-needy-2.jpg" alt="Feed the Needy"/>
                        <h2 className="mt-5 flex justify-center items-center bg-teal-400 rounded-md py-1 text-md hover:bg-teal-500 cursor-pointer">Feed the Needy</h2>
                        
                    </div>
                </div>
        
                <div className="column quarter">
                    <div className="blurb">
                        <img className='h-56 w-56 rounded-sm' src="https://iadopt.in/wp-content/uploads/2020/02/donate-to-iadopt-1.jpg" alt="Donate"/>
                        <h2 className="mt-5 flex justify-center items-center bg-teal-400 rounded-md py-1 text-md hover:bg-teal-500 cursor-pointer">Donate</h2>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    </>
  )
}

export default YoucanDo
