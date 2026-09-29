import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-nature.jpg"
            alt="Beautiful nature background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Saving Birds, Preserving Nature</h1>
          <p className="text-xl md:text-2xl mb-8">Join us in protecting our feathered friends and their natural habitats</p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
            Help Now
          </button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/images/bird-rescue.jpg"
                alt="Bird rescue in action"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6">
                We are dedicated to the rescue, rehabilitation, and release of injured and orphaned birds. Our team works tirelessly to ensure every bird gets a second chance at life in their natural habitat.
              </p>
              <ul className="space-y-4">
                {['24/7 Emergency Response', 'Professional Care', 'Habitat Protection', 'Education Programs'].map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How We Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Rescue & Rehabilitation',
                description: 'Professional care for injured and sick birds',
                icon: '🏥'
              },
              {
                title: 'Habitat Conservation',
                description: 'Protecting and restoring natural environments',
                icon: '🌳'
              },
              {
                title: 'Community Education',
                description: 'Spreading awareness about bird conservation',
                icon: '📚'
              }
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/nature-bg.jpg"
            alt="Nature background"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Make a Difference Today</h2>
          <p className="text-xl text-white mb-8">
            Your support helps us continue our mission to protect and preserve bird life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
              Donate Now
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-semibold py-3 px-8 rounded-full transition-colors duration-300">
              Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 Bird Rescue. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
