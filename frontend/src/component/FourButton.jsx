import React from 'react';

const FourButton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 mb-5">
      <div className="solution-btn flex flex-col items-center text-center">
        <img className="h-20 w-20 sm:h-24 sm:w-24 mb-2" src="/image/search.svg" alt="Search" />
        <h1 className="text-lg sm:text-2xl font-semibold">Search</h1>
        <p className="text-sm sm:text-base">Simply enter your city to start your search</p>
      </div>
      <div className="solution-btn flex flex-col items-center text-center">
        <img className="h-20 w-20 sm:h-24 sm:w-24 mb-2" src="/image/massage.svg" alt="Meet" />
        <h1 className="text-lg sm:text-2xl font-semibold">Meet</h1>
        <p className="text-sm sm:text-base">Schedule your appointment to meet the pet you love</p>
      </div>
      <div className="solution-btn flex flex-col items-center text-center">
        <img className="h-20 w-20 sm:h-24 sm:w-24 mb-2" src="/image/videocall.svg" alt="Meet Online" />
        <h1 className="text-lg sm:text-2xl font-semibold">Meet Online</h1>
        <p className="text-sm sm:text-base">Meet the pet with an online video chat</p>
      </div>
      <div className="solution-btn flex flex-col items-center text-center">
        <img className="h-20 w-20 sm:h-24 sm:w-24 mb-2" src="/image/store.svg" alt="Adopt" />
        <h1 className="text-lg sm:text-2xl font-semibold">Adopt</h1>
        <p className="text-sm sm:text-base">Finally adopt the dog or cat you love</p>
      </div>
    </div>
  );
};

export default FourButton;
