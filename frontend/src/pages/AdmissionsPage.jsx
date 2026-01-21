const AdmissionsPage = () => {
    return (
        <div className="min-h-screen bg-orange-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
                    <p className="text-xl text-orange-100">Start your journey to excellence with us</p>
                </div>
            </section>

            {/* Courses Offered */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Courses Offered</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* UG Programs */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Undergraduate Programs (B.Tech)
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Computer Science & Engineering',
                                    'Electronics & Communication Engineering',
                                    'Electrical & Electronics Engineering',
                                    'Mechanical Engineering',
                                    'Civil Engineering'
                                ].map((course, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-5 h-5 text-orange-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{course}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 p-4 bg-white rounded-lg">
                                <p className="text-sm text-gray-600"><strong>Duration:</strong> 4 Years</p>
                                <p className="text-sm text-gray-600"><strong>Eligibility:</strong> 10+2 with Physics, Chemistry, Mathematics</p>
                            </div>
                        </div>

                        {/* PG Programs */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Postgraduate Programs (M.Tech)
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Computer Science & Engineering',
                                    'VLSI Design',
                                    'Power Systems',
                                    'Structural Engineering'
                                ].map((course, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-5 h-5 text-orange-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{course}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 p-4 bg-white rounded-lg">
                                <p className="text-sm text-gray-600"><strong>Duration:</strong> 2 Years</p>
                                <p className="text-sm text-gray-600"><strong>Eligibility:</strong> B.Tech/BE in relevant discipline</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admission Procedure */}
            <section className="py-16 bg-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Admission Procedure</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: '01', title: 'Application', desc: 'Fill out the online application form with required details' },
                            { step: '02', title: 'Entrance Exam', desc: 'Appear for state/national level entrance examination' },
                            { step: '03', title: 'Counseling', desc: 'Attend counseling based on your rank and preferences' },
                            { step: '04', title: 'Admission', desc: 'Complete document verification and fee payment' }
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-orange-600">{item.step}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fee Structure */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Fee Structure</h2>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Program</th>
                                    <th className="px-6 py-4 text-left">Annual Fee</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900">B.Tech (All Branches)</td>
                                    <td className="px-6 py-4 text-gray-900 font-semibold">₹1,20,000</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900">M.Tech (All Specializations)</td>
                                    <td className="px-6 py-4 text-gray-900 font-semibold">₹80,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 text-center">
                        * Fee structure is subject to change. Additional charges may apply for hostel and transportation.
                    </p>
                </div>
            </section>

            {/* Scholarships */}
            <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Scholarships Available</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Merit Scholarship',
                                desc: 'For students scoring above 90% in entrance exams',
                                amount: 'Up to 50% fee waiver'
                            },
                            {
                                title: 'Need-Based Scholarship',
                                desc: 'Financial assistance for economically weaker sections',
                                amount: 'Up to 100% fee waiver'
                            },
                            {
                                title: 'Sports Scholarship',
                                desc: 'For students with exceptional sports achievements',
                                amount: 'Up to 30% fee waiver'
                            }
                        ].map((scholarship, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                                <div className="text-4xl mb-4">🏆</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{scholarship.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{scholarship.desc}</p>
                                <div className="bg-orange-50 rounded px-3 py-2 inline-block">
                                    <p className="text-sm font-semibold text-orange-700">{scholarship.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Important Dates */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Important Dates</h2>
                    <div className="space-y-4">
                        {[
                            { event: 'Application Start Date', date: 'April 1, 2026' },
                            { event: 'Application End Date', date: 'June 30, 2026' },
                            { event: 'Entrance Examination', date: 'July 15-20, 2026' },
                            { event: 'Result Declaration', date: 'August 5, 2026' },
                            { event: 'Counseling Period', date: 'August 10-25, 2026' },
                            { event: 'Classes Commence', date: 'September 1, 2026' }
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors">
                                <span className="text-gray-900 font-medium">{item.event}</span>
                                <span className="text-orange-600 font-semibold">{item.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
                    <p className="text-xl text-orange-100 mb-8">
                        Take the first step towards your engineering career
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-orange-700 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
                            Apply Online
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-orange-700 transition-all">
                            Download Prospectus
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdmissionsPage;
