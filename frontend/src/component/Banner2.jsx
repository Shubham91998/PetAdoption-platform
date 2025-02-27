import React from "react";
import imageh1 from "../../public/image/heading-removebg-preview.png";

const Banner2 = () => {
  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="mb-6">
          <h2 className="text-center text-xl font-bold md:text-2xl lg:text-3xl mt-10">
            Your Pet Adoption Journey With ThePetNest
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-start">

          <div className="flex flex-col items-center md:w-1/3">
            <img className="w-full max-w-xs" src={imageh1} alt="Heading 1" />
          </div>

  
          <div className="flex flex-col gap-8 md:w-2/3 mb-10">
    
            <div className="flex items-start gap-5">
              <img
                className="h-12 w-12"
                src="/image/serchpet.svg"
                alt="Search Pet"
              />
              <div>
                <h1 className="font-bold text-lg md:text-xl">Search Pet</h1>
                <p className="text-sm md:text-base">
                  &quot;Adopt a dog or cat who&apos;s right for you. Simply enter
                  your city above to start your search.&quot;
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <img
                className="h-12 w-12"
                src="/image/connect.svg"
                alt="Connect"
              />
              <div>
                <h1 className="font-bold text-lg md:text-xl">Connect</h1>
                <p className="text-sm md:text-base">
                  &quot;Once you find a pet, click &apos;show number&apos; to
                  get contact info for their pet parent or rescue.&quot;
                </p>
              </div>
            </div>


            <div className="flex items-start gap-5">
              <img
                className="h-12 w-12"
                src="/image/adoptlov.svg"
                alt="Adopt Love"
              />
              <div>
                <h1 className="font-bold text-lg md:text-xl">Adopt Love</h1>
                <p className="text-sm md:text-base">
                  &quot;The rescue or pet parents will walk you through their
                  adoption process.&quot;
                </p>
              </div>
            </div>


            <div className="flex items-start gap-5">
              <img
                className="h-12 w-12"
                src="/image/freevc.svg"
                alt="Free Vet Consultation"
              />
              <div>
                <h1 className="font-bold text-lg md:text-xl">
                  Free Vet Consultation
                </h1>
                <p className="text-sm md:text-base">
                  &quot;ThePetNest will help your pet to settle down in its new
                  home.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner2;
