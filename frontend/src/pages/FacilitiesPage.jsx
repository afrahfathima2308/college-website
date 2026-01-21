const FacilitiesPage = () => {
    const facilities = [
      {
        title: 'Modern Library',
        icon: '📚',
        description:
          'Our library houses over 50,000 books, international journals, and digital resources. With spacious reading halls, digital library access, and 24/7 online resources, students have access to a wealth of knowledge.',
        features: [
          'Digital library with e-books and e-journals',
          'Quiet study areas and group discussion rooms',
          'Access to international research databases',
          'Extended hours during examinations',
        ],
        color: 'from-orange-500 to-orange-700',
      },
      {
        title: 'Advanced Laboratories',
        icon: '🔬',
        description:
          'State-of-the-art laboratories equipped with the latest technology and equipment for hands-on learning. Each department has specialized labs for practical training and research.',
        features: [
          'Department-specific research labs',
          'Latest software and hardware tools',
          'Project development centers',
          'Industry-standard equipment',
        ],
        color: 'from-orange-400 to-orange-600',
      },
      {
        title: 'Sports Complex',
        icon: '🏆',
        description:
          'Comprehensive sports facilities including indoor and outdoor courts, gymnasium, and dedicated coaches for various sports.',
        features: [
          'Cricket, Football, and Athletics grounds',
          'Indoor badminton and table tennis',
          'Fully equipped gymnasium',
          'Professional coaching available',
        ],
        color: 'from-orange-600 to-orange-800',
      },
      {
        title: 'Transportation',
        icon: '🚌',
        description:
          'Safe and reliable transportation services connecting major areas of the city. Our fleet of buses ensures comfortable travel for students and faculty.',
        features: [
          'Multiple routes covering the city',
          'GPS-enabled buses for safety',
          'Regular maintenance and safety checks',
          'Comfortable seating',
        ],
        color: 'from-orange-500 to-amber-600',
      },
      {
        title: 'Hostel Accommodation',
        icon: '🏠',
        description:
          'Separate hostels for boys and girls with modern amenities, mess facilities, and round-the-clock security.',
        features: [
          'Spacious rooms with modern furniture',
          'Nutritious meals in mess',
          '24/7 security and medical facilities',
          'Wi-Fi connectivity',
        ],
        color: 'from-orange-400 to-orange-700',
      },
      {
        title: 'Cafeteria',
        icon: '🍽️',
        description:
          'Hygienic and spacious cafeteria serving a variety of healthy and delicious meals, snacks, and beverages at affordable prices.',
        features: [
          'Vegetarian and non-vegetarian options',
          'Hygienic food preparation',
          'Comfortable seating area',
          'Affordable pricing',
        ],
        color: 'from-orange-500 to-orange-600',
      },
      {
        title: 'Medical Facilities',
        icon: '🏥',
        description:
          'On-campus medical center with qualified doctors and nurses to handle emergencies and provide primary healthcare.',
        features: [
          'Qualified medical staff',
          'First aid and emergency care',
          'Tie-ups with nearby hospitals',
          'Annual health check-ups',
        ],
        color: 'from-orange-600 to-orange-800',
      },
      {
        title: 'Auditorium & Seminar Halls',
        icon: '🎭',
        description:
          'Modern auditorium and seminar halls equipped with audio-visual facilities for events and conferences.',
        features: [
          'Seating capacity of 1000+',
          'Advanced audio-visual systems',
          'Air-conditioned halls',
          'Smart classrooms',
        ],
        color: 'from-orange-400 to-orange-600',
      },
    ];
  
    return (
      <div className="min-h-screen bg-orange-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Facilities
            </h1>
            <p className="text-xl text-orange-100">
              World-class infrastructure for a complete learning experience
            </p>
          </div>
        </section>
  
        {/* Facilities */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden md:flex ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Icon */}
                <div
                  className={`md:w-1/3 bg-gradient-to-br ${facility.color} p-12 flex flex-col items-center justify-center text-white`}
                >
                  <div className="text-8xl mb-4">{facility.icon}</div>
                  <h3 className="text-2xl font-bold text-center">
                    {facility.title}
                  </h3>
                </div>
  
                {/* Content */}
                <div className="md:w-2/3 p-8">
                  <p className="text-gray-700 mb-6 text-lg">
                    {facility.description}
                  </p>
  
                  <h4 className="font-bold text-gray-900 mb-4">
                    Key Features
                  </h4>
  
                  <div className="space-y-3">
                    {facility.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <span className="text-orange-600 font-bold mr-3">✔</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Amenities */}
        <section className="py-16 bg-white">
          <h2 className="text-3xl font-bold text-center mb-12">
            Additional Amenities
          </h2>
  
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6">
            {[
              { icon: '📶', name: 'Wi-Fi Campus', desc: 'High-speed internet' },
              { icon: '🔒', name: '24/7 Security', desc: 'CCTV surveillance' },
              { icon: '🌳', name: 'Green Campus', desc: 'Eco-friendly campus' },
              { icon: '🎨', name: 'Activity Centers', desc: 'Clubs and activities' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-orange-50 rounded-lg p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-800 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Our Campus</h2>
          <p className="text-xl text-orange-100 mb-8">
            Experience our facilities in person
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-orange-700 rounded-lg font-semibold hover:bg-orange-100 transition shadow-lg"
          >
            Schedule a Campus Tour
          </a>
        </section>
      </div>
    );
  };
  
  export default FacilitiesPage;
  