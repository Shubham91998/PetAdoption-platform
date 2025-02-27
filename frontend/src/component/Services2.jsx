import React from "react";

const Services2 = () => {
  return (
    <>
     
      <div className="grid grid-cols-1 md:grid-cols-2 px-5 bg-green-400 gap-5 md:gap-7 py-5">
        <div>
          <h1 className="font-semibold flex justify-center items-center text-2xl md:text-3xl pt-5">
            Pet Care Services
          </h1>
          <p className="text-sm md:text-base leading-6 mt-3">
            &quot;Our dog medical services ensure your furry friend gets the best care possible. From regular health check-ups and vaccinations to advanced treatments, our team of skilled veterinarians is here to keep your dog healthy and happy. We also offer diagnostic testing, dental care, and emergency services. Trust us to provide compassionate, reliable care tailored to your pet&lsquo;s unique needs.&quot;
          </p>
          <div className="flex justify-center py-5">
            <img
              className="w-full h-auto max-w-sm rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1632236542159-809925d85fc0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pet Care Services"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-center py-5">
            <img
              className="w-full h-auto max-w-sm rounded-lg shadow-lg"
              src="https://plus.unsplash.com/premium_photo-1661676191997-0c0cece2a683?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pet Relocation Services"
            />
          </div>
          <p className="text-sm md:text-base leading-6 mt-3">
            &quot;Our pet relocation services ensure a smooth and stress-free move for your furry companions. From transportation arrangements to health certifications, we handle every detail with care and professionalism. Whether it’s a local or international move, we prioritize your pet’s safety and comfort, ensuring they arrive happy and healthy at their new home.&quot;
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-5 bg-sky-300 gap-5 md:gap-7 py-5">
        <div className="flex justify-center">
          <img
            className="w-full h-auto max-w-sm rounded-lg shadow-lg"
            src="https://media.istockphoto.com/id/1749214597/photo/low-section-of-a-dog-walker-walking-with-group-of-dogs-on-their-leash-on-the-street-new-york.jpg?s=612x612&w=0&k=20&c=KzHrtB6RLk3Shz1F1za_83xl2yC3u9jrTLKdMjWlmDI="
            alt="Dog Walking Services"
          />
        </div>
        <div>
          <p className="text-sm md:text-base leading-6 mt-3">
            &quot;Our dog walking services provide your furry friend with the exercise, care, and companionship they need. Whether it’s a quick walk or a longer adventure, our experienced walkers ensure your dog stays happy and healthy. We tailor our services to your pet’s specific needs, offering reliability, safety, and peace of mind.&quot;
          </p>
          <div className="flex justify-center py-5">
            <img
              className="w-full h-auto max-w-sm rounded-lg shadow-lg"
              src="https://plus.unsplash.com/premium_photo-1679521026509-ecf65d3381f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nJTIwdHJhaW5pbmd8ZW58MHx8MHx8fDA%3D"
              alt="Dog Training Services"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Services2;
