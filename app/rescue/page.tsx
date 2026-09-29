import Image from 'next/image';

export default function Rescue() {
  const successStories = [
    {
      title: 'Injured Hawk Recovery',
      description: 'A red-tailed hawk with a broken wing made a full recovery and returned to the wild.',
      image: '/images/hawk-rescue.jpg'
    },
    {
      title: 'Orphaned Owlets',
      description: 'Three baby owls were successfully raised and released back into their natural habitat.',
      image: '/images/owl-rescue.jpg'
    },
    {
      title: 'Seabird Rehabilitation',
      description: 'A group of seabirds affected by an oil spill were cleaned and rehabilitated.',
      image: '/images/seabird-rescue.jpg'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rescue-hero.jpg"
            alt="Bird rescue in action"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Professional Bird Rescue Services</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Our team of experienced professionals is available 24/7 to help injured, sick, or orphaned birds.
            We provide comprehensive care and rehabilitation services.
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors duration-200">
            Report a Bird in Need
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Rescue Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Emergency Response',
                description: '24/7 rapid response team for bird emergencies',
                icon: '🚑'
              },
              {
                title: 'Medical Treatment',
                description: 'Professional veterinary care for injured birds',
                icon: '⚕️'
              },
              {
                title: 'Rehabilitation',
                description: 'Specialized care and recovery programs',
                icon: '🏥'
              },
              {
                title: 'Release Programs',
                description: 'Careful reintroduction to natural habitats',
                icon: '🕊️'
              },
              {
                title: 'Transport Service',
                description: 'Safe transportation for injured birds',
                icon: '🚗'
              },
              {
                title: 'Monitoring',
                description: 'Post-release monitoring and support',
                icon: '📡'
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="relative h-48">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
                  <p className="text-gray-600">{story.description}</p>
                  <button className="mt-4 text-green-500 font-semibold hover:text-green-600 transition-colors duration-200">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Help?</h2>
          <p className="text-xl text-white mb-8">
            Join our network of volunteers and help us save more birds.
          </p>
          <button className="bg-white text-green-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Become a Volunteer
          </button>
        </div>
      </div>
    </div>
  );
} 