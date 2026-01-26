import { Link } from 'react-router-dom';
import NoticeBoard from '../components/NoticeBoard';

const HomePage = () => {
    const departments = [
        {
            name: 'Computer Science & Engineering',
            abbr: 'CSE',
            description: 'Driving innovation in software development, AI, data science, and cutting-edge technologies.',
            icon: '💻',
            color: 'from-orange-500 to-orange-600'
        },
        {
            name: 'Electronics & Communication',
            abbr: 'ECE',
            description: 'Pioneering advancements in telecommunications, embedded systems, and signal processing.',
            icon: '📡',
            color: 'from-orange-500 to-orange-600'
        },
        {
            name: 'Electrical Engineering',
            abbr: 'EEE',
            description: 'Powering the future with expertise in power systems, control systems, and renewable energy.',
            icon: '⚡',
            color: 'from-yellow-500 to-orange-600'
        },
        {
            name: 'Mechanical Engineering',
            abbr: 'MEC',
            description: 'Engineering excellence in design, manufacturing, robotics, and automotive systems.',
            icon: '⚙️',
            color: 'from-orange-500 to-orange-600'
        },
        {
            name: 'Civil Engineering',
            abbr: 'CIVIL',
            description: 'Building sustainable infrastructure for roads, buildings, bridges, and urban development.',
            icon: '🏗️',
            color: 'from-orange-500 to-orange-600'
        }
    ];

    const facilities = [
        { name: 'Modern Library', icon: '📚', description: 'Digital & Physical Resources' },
        { name: 'Smart Labs', icon: '🔬', description: 'State-of-the-art Equipment' },
        { name: 'Sports Complex', icon: '🏆', description: 'Indoor & Outdoor Facilities' },
        { name: 'Transportation', icon: '🚌', description: 'College Bus Services' }
    ];

    const stats = [
        { number: '5000+', label: 'Students' },
        { number: '300+', label: 'Faculty Members' },
        { number: '50+', label: 'Years of Excellence' },
        { number: '95%', label: 'Placement Rate' }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Welcome to Our College
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
                            Shaping Tomorrow's Leaders Through Excellence in Education, Innovation, and Research
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/admissions"
                                className="px-8 py-4 bg-white text-orange-700 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Apply Now
                            </Link>
                            <Link
                                to="/about"
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-700 transition-all"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 w-full">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                About Our College
                            </h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Established with a vision to provide world-class education, our college has been
                                a beacon of knowledge and innovation for over five decades. We are committed to
                                nurturing young minds and preparing them for the challenges of tomorrow.
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                With state-of-the-art facilities, experienced faculty, and a student-centric approach,
                                we offer an environment that fosters academic excellence, research, and holistic development.
                            </p>
                            <Link
                                to="/about"
                                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                            >
                                Read More
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-center text-8xl">🎓</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Departments Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Departments
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explore our diverse range of engineering programs designed to shape future innovators
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departments.map((dept, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                <div className={`h-2 bg-gradient-to-r ${dept.color}`}></div>
                                <div className="p-6">
                                    <div className="text-5xl mb-4">{dept.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                                    <p className="text-sm font-semibold text-orange-600 mb-3">{dept.abbr}</p>
                                    <p className="text-gray-600 mb-4">{dept.description}</p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold group-hover:translate-x-1 transition-transform"
                                    >
                                        Learn More
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/departments"
                            className="inline-block px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all font-semibold shadow-lg"
                        >
                            View All Departments
                        </Link>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            World-Class Facilities
                        </h2>
                        <p className="text-lg text-gray-600">
                            Everything you need for a complete learning experience
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {facilities.map((facility, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="text-5xl mb-4">{facility.icon}</div>
                                <h3 className="font-bold text-gray-900 mb-2">{facility.name}</h3>
                                <p className="text-sm text-gray-600">{facility.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/facilities"
                            className="inline-block px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold shadow-md"
                        >
                            Explore All Facilities
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
                        Join us and be part of a community that values excellence, innovation, and growth
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/admissions"
                            className="px-8 py-4 bg-white text-orange-700 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
                        >
                            Apply for Admission
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-700 transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Notice Board Widget */}
            <NoticeBoard />
        </div>
    );
};

export default HomePage;
