const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl text-orange-100">Discover our legacy of excellence in education</p>
                </div>
            </section>

            {/* History Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
                            <p className="text-gray-700 mb-4">
                                Established in 1970, our college has been at the forefront of technical education
                                for over five decades. Founded with a vision to provide quality engineering education
                                to students from all backgrounds, we have grown into one of the premier institutions
                                in the region.
                            </p>
                            <p className="text-gray-700 mb-4">
                                From humble beginnings with just 100 students and a handful of faculty members,
                                we now serve over 5,000 students with a team of 300+ experienced educators and
                                state-of-the-art infrastructure.
                            </p>
                            <p className="text-gray-700">
                                Our commitment to innovation and excellence has earned us recognition from various
                                accreditation bodies and industry partners, making us a preferred choice for
                                aspiring engineers.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-12 flex items-center justify-center">
                            <div className="text-9xl">🏛️</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <div className="text-5xl mb-6">🎯</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-700">
                                To be a globally recognized institution of excellence in engineering education,
                                research, and innovation that transforms students into responsible leaders and
                                entrepreneurs who contribute meaningfully to society and drive technological advancement.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-8 shadow-lg">
                            <div className="text-5xl mb-6">🚀</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-700 mb-3">
                                Our mission is to provide world-class technical education through:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-orange-600 mr-2">•</span>
                                    <span>Innovative curriculum aligned with industry needs</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-600 mr-2">•</span>
                                    <span>Cutting-edge research and development</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-600 mr-2">•</span>
                                    <span>Holistic personality development</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-orange-600 mr-2">•</span>
                                    <span>Strong industry-academia collaboration</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '⭐', title: 'Excellence', desc: 'Striving for the highest standards in everything we do' },
                            { icon: '🤝', title: 'Integrity', desc: 'Upholding honesty and ethical practices' },
                            { icon: '💡', title: 'Innovation', desc: 'Encouraging creativity and out-of-the-box thinking' },
                            { icon: '🌍', title: 'Social Responsibility', desc: 'Contributing positively to society and environment' }
                        ].map((value, index) => (
                            <div key={index} className="text-center p-6 rounded-lg hover:bg-orange-50 transition-colors">
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Accreditations */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Accreditations & Affiliations</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'AICTE Approved', desc: 'All India Council for Technical Education' },
                            { name: 'NBA Accredited', desc: 'National Board of Accreditation' },
                            { name: 'University Affiliated', desc: 'Recognized by State Technical University' }
                        ].map((accred, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">✓</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{accred.name}</h3>
                                <p className="text-sm text-gray-600">{accred.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
