import { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-orange-50">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-orange-100">We'd love to hear from you. Get in touch with us!</p>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                                <p className="text-gray-600 mb-6">
                                    Have questions? We're here to help. Reach out to us through any of the following channels.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-4">

                                <div className="bg-orange-50 rounded-lg p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-orange-600 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                                            <p className="text-sm text-gray-600">
                                                123 College Road<br />
                                                City, State - 123456<br />
                                                India
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 rounded-lg p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-orange-600 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                            <p className="text-sm text-gray-600">
                                                +91 1234567890<br />
                                                +91 0987654321
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 rounded-lg p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-orange-600 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                            <p className="text-sm text-gray-600">
                                                info@college.edu<br />
                                                admissions@college.edu
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 rounded-lg p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-orange-600 rounded-lg p-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Office Hours</h3>
                                            <p className="text-sm text-gray-600">
                                                Mon - Fri: 9:00 AM - 5:00 PM<br />
                                                Sat: 9:00 AM - 1:00 PM<br />
                                                Sun: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="input-field bg-white"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="input-field bg-white"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="input-field bg-white"
                                                placeholder="+91 1234567890"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="input-field bg-white"
                                                placeholder="Subject of your message"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="input-field bg-white resize-none"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us on Map</h2>
                    <div className="bg-orange-200 rounded-2xl overflow-hidden" style={{ height: '400px' }}>
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                            <div className="text-center">
                                <div className="text-6xl mb-4">📍</div>
                                <p className="text-gray-600 font-medium">Map Integration</p>
                                <p className="text-sm text-gray-500">Google Maps can be embedded here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Department Contacts */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Department Contacts</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { dept: 'Admissions Office', email: 'admissions@college.edu', phone: '+91 1234567890' },
                            { dept: 'Academic Office', email: 'academics@college.edu', phone: '+91 1234567891' },
                            { dept: 'Student Affairs', email: 'students@college.edu', phone: '+91 1234567892' },
                            { dept: 'Placement Cell', email: 'placements@college.edu', phone: '+91 1234567893' },
                            { dept: 'Library', email: 'library@college.edu', phone: '+91 1234567894' },
                            { dept: 'Hostel Office', email: 'hostel@college.edu', phone: '+91 1234567895' }
                        ].map((contact, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                                <h3 className="font-bold text-gray-900 mb-3">{contact.dept}</h3>
                                <div className="space-y-2 text-sm">
                                    <p className="flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        {contact.email}
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.042 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        {contact.phone}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
