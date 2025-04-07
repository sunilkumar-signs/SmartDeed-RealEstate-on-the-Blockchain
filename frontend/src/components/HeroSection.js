export default function HeroSection() {
    return (
      <section
        className="relative bg-cover bg-center py-32 px-4 md:px-10 text-white"
        style={{
          backgroundImage: "url('/images/hero-house.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find, finance and own your home
          </h1>
          <p className="text-lg mb-8">
            Explore blockchain-verified properties with confidence and clarity.
          </p>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by address, city, or token ID"
              className="w-full px-6 py-3 rounded-full shadow text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>
    );
  }
  