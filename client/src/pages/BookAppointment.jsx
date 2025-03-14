import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Check, ChevronDown, ChevronUp } from 'lucide-react';
import BookAppointmentGIF from "../assets/bookappointment.gif";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                className="w-full py-4 flex justify-between items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-left font-medium text-gray-800">{question}</span>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-600">
                    {answer}
                </div>
            )}
        </div>
    );
};

const BookAppointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        date: '',
        time: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Appointment booked:', formData);
        setSubmitted(true);
    };

    const faqItems = [
        {
            question: "How long is a consultation session?",
            answer: "Each consultation session typically lasts for 45-60 minutes, giving you ample time to discuss your career goals and concerns with our expert consultants."
        },
        {
            question: "What should I prepare before the consultation?",
            answer: "We recommend preparing a brief summary of your academic background, career interests, and specific questions you'd like to discuss. You may also want to have your resume ready if you'd like to review it."
        },
        {
            question: "Can I reschedule my appointment?",
            answer: "Yes, you can reschedule your appointment up to 24 hours before the scheduled time. Please contact our support team or use the reschedule option in your confirmation email."
        },
        {
            question: "What happens after the consultation?",
            answer: "After the consultation, you'll receive a detailed email summary of the discussion points and a personalized action plan. You'll also have the option to schedule follow-up sessions if needed."
        },
        {
            question: "Are the consultations conducted online or in-person?",
            answer: "We offer both online and in-person consultations. You can choose your preferred mode while booking. Online sessions are conducted via Zoom or Google Meet."
        }
    ];

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Scheduled!</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for booking an appointment with our career consultant. We've sent a confirmation to your email.
                        </p>
                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                            <div className="flex items-center mb-3">
                                <User className="h-5 w-5 text-blue-500 mr-3" />
                                <span className="text-gray-700 font-medium">{formData.name}</span>
                            </div>
                            <div className="flex items-center mb-3">
                                <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                                <span className="text-gray-700 font-medium">{formData.date}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                                <span className="text-gray-700 font-medium">{formData.time}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {setFormData({
                                name: '',
                                email: '',
                                phoneNumber: '',
                                date: '',
                                time: ''
                            }); setSubmitted(false)}}
                            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                        >
                            Book Another Appointment
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="rounded-xl overflow-hidden mb-8">
                    <div className="md:flex items-center gap-5">

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 h-full flex items-center justify-center overflow-hidden">
                            <img
                                className="w-full object-cover"
                                src={BookAppointmentGIF}
                                alt="Career guidance animation"
                            />
                        </div>

                        <div className="p-8 md:w-3/5">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Career Guidance</div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Book a Consultation</h2>
                            <p className="text-gray-600 mb-8">Schedule a one-on-one session with our expert career consultants to get personalized guidance for your career journey.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            required
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                                            placeholder="+1 (555) 987-6543"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                required
                                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                                                value={formData.date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Clock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <select
                                                name="time"
                                                id="time"
                                                required
                                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                                                value={formData.time}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a time</option>
                                                <option value="9:00 AM">9:00 AM</option>
                                                <option value="10:00 AM">10:00 AM</option>
                                                <option value="11:00 AM">11:00 AM</option>
                                                <option value="1:00 PM">1:00 PM</option>
                                                <option value="2:00 PM">2:00 PM</option>
                                                <option value="3:00 PM">3:00 PM</option>
                                                <option value="4:00 PM">4:00 PM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                    >
                                        Book Appointment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Why Book a Consultation Section */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200">
                        <h4 className="font-semibold text-blue-600 text-lg mb-3">Personalized Advice</h4>
                        <p className="text-gray-600">Get tailored guidance specific to your career goals and challenges from experienced professionals.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200">
                        <h4 className="font-semibold text-blue-600 text-lg mb-3">Expert Insights</h4>
                        <p className="text-gray-600">Learn from professionals with years of industry experience and get insider knowledge.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200">
                        <h4 className="font-semibold text-blue-600 text-lg mb-3">Action Plan</h4>
                        <p className="text-gray-600">Walk away with concrete steps and a clear roadmap to achieve your career objectives.</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-2">
                        {faqItems.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;