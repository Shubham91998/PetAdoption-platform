

const RegisterShelter = () => {
    return ( 
        <>
        <section className="max-w-7xl mx-auto px-4 py-16">
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 p-12 shadow-2xl">
    {/* Animated background decoration */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"></div>
    </div>

    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    }}></div>

    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
      {/* Content */}
      <div className="flex-1 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-white">
            Shelter Connect
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
          Register your shelter
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">
            start saving lives today
          </span>
        </h2>

        <p className="max-w-2xl text-base md:text-lg text-orange-50/90 leading-relaxed">
          Join our community of dedicated shelters. Reach adopters, manage animals, 
          share updates, and build trust with pet lovers across the country.
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-white/90">Free registration</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-white/90">5,000+ happy pets</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-white/90">Trusted platform</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          onClick={() => window.location.href = '/shelter-register'}
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 active:scale-95"
        >
          <span className="relative z-10">Register Your Shelter</span>
          <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-orange-100 to-yellow-100 transition-transform duration-300 group-hover:translate-x-0"></div>
        </button>

        <button
          onClick={() => window.location.href = '/shelter-login'}
          className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95 backdrop-blur-sm"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Shelter Login
        </button>
      </div>
    </div>

    {/* Decorative floating elements */}
    <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-white/10 blur-2xl"></div>
    <div className="absolute -bottom-6 left-1/3 h-16 w-16 rounded-full bg-yellow-300/10 blur-2xl"></div>
  </div>
</section>
</>
    )
}

export default RegisterShelter