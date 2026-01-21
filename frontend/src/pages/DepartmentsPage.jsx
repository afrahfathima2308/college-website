const DepartmentsPage = () => {
    const departments = [
      {
        name: 'Computer Science & Engineering',
        abbr: 'CSE',
        description:
          'The Department of Computer Science and Engineering is dedicated to advancing knowledge and innovation in computing. Our curriculum covers programming, data structures, algorithms, artificial intelligence, machine learning, web development, cloud computing, and cybersecurity.',
        icon: '💻',
        color: 'from-orange-500 to-orange-700',
        highlights: [
          'AI & Machine Learning Labs',
          'Industry Partnerships with Tech Giants',
          '100% Placement Record',
          'Research in Quantum Computing',
        ],
      },
      {
        name: 'Electronics & Communication Engineering',
        abbr: 'ECE',
        description:
          'Our ECE department focuses on developing expertise in telecommunications, embedded systems, VLSI design, signal processing, and wireless communications.',
        icon: '📡',
        color: 'from-orange-400 to-orange-600',
        highlights: [
          'Advanced Communication Labs',
          'IoT and Embedded Systems Center',
          'Collaboration with Telecom Industry',
          'Research in 5G Technology',
        ],
      },
      {
        name: 'Electrical & Electronics Engineering',
        abbr: 'EEE',
        description:
          'The EEE department provides comprehensive education in power systems, control systems, electrical machines, renewable energy, and power electronics.',
        icon: '⚡',
        color: 'from-orange-500 to-amber-600',
        highlights: [
          'Smart Grid Research Center',
          'Renewable Energy Laboratory',
          'Industrial Automation Lab',
          'High Voltage Engineering Facility',
        ],
      },
      {
        name: 'Mechanical Engineering',
        abbr: 'MECH',
        description:
          'Our Mechanical Engineering department excels in design, manufacturing, thermal engineering, robotics, and automotive technology.',
        icon: '⚙️',
        color: 'from-orange-600 to-orange-800',
        highlights: [
          'Advanced Manufacturing Lab',
          'Robotics and Automation Center',
          'CAD/CAM/CAE Software Suite',
          'Automotive Testing Facility',
        ],
      },
      {
        name: 'Civil Engineering',
        abbr: 'CIVIL',
        description:
          'The Civil Engineering department focuses on structural engineering, transportation, environmental engineering, and urban planning.',
        icon: '🏗️',
        color: 'from-orange-400 to-orange-700',
        highlights: [
          'Structural Analysis Lab',
          'Environmental Engineering Center',
          'Surveying and Geomatics Lab',
          'Smart City Projects',
        ],
      },
    ];
  
    return (
      <div className="min-h-screen bg-orange-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Departments
            </h1>
            <p className="text-xl text-orange-100">
              Explore our world-class engineering programs designed to shape
              future innovators
            </p>
          </div>
        </section>
  
        {/* Departments */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            {departments.map((dept, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden md:flex ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Icon Section */}
                <div
                  className={`md:w-1/3 bg-gradient-to-br ${dept.color} p-12 flex items-center justify-center`}
                >
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">{dept.icon}</div>
                    <h3 className="text-2xl font-bold">{dept.abbr}</h3>
                  </div>
                </div>
  
                {/* Content */}
                <div className="md:w-2/3 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {dept.name}
                  </h2>
                  <p className="text-gray-700 mb-6">{dept.description}</p>
  
                  <h4 className="font-bold text-gray-900 mb-3">
                    Key Highlights
                  </h4>
  
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {dept.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start">
                        <span className="text-orange-600 font-bold mr-2">✔</span>
                        <span className="text-sm text-gray-700">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
  
                  <button
                    className={`px-6 py-3 bg-gradient-to-r ${dept.color} text-white rounded-lg font-semibold hover:shadow-lg transition`}
                  >
                    Learn More About {dept.abbr}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-800 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in Joining Us?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Explore admission requirements and start your engineering journey
            today
          </p>
          <a
            href="/admissions"
            className="inline-block px-8 py-4 bg-white text-orange-700 rounded-lg font-semibold hover:bg-orange-100 transition shadow-lg"
          >
            View Admission Details
          </a>
        </section>
      </div>
    );
  };
  
  export default DepartmentsPage;
  