import { 
  FaLeaf, 
  FaTrophy, 
  FaChartBar, 
  FaMapMarkerAlt, 
  FaTree, 
  FaMedal, 
  FaHandshake, 
  FaMobileAlt, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';

export default function TopSection(){
    return(
        <>  
        {/* Hero Section */}
        <section className="min-h-screen bg-gradient-to-br from-[#1c756b] via-[#2a8b7f] to-[#1c756b] text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
                <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full"></div>
            </div>
            
            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="block">One Student,</span>
                        <span className="block text-yellow-300">One Tree,</span>
                        <span className="block">One Sports</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
                        StudentYug connects students with sports guidance while promoting environmental responsibility. 
                        Every step in learning becomes a step for nature.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-yellow-400 text-[#1c756b] px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            Join StudentYug
                        </button>
                        
                    </div>
                </div>
            </div>
        </section>

        {/* Pillars Section */}
        <section id="pillars" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1c756b] mb-6">Our Two Pillars</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        StudentYug is built on two powerful foundations that create lasting impact
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Environment Pillar */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaLeaf className="text-4xl text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1c756b] mb-4">Environment & Tree Plantation</h3>
                        </div>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Every student update = One tree planted</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Track your environmental contribution</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Gamification with badges and rewards</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Support Mission LiFE and Green India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Sports Pillar */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaTrophy className="text-4xl text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1c756b] mb-4">Student Sports Information</h3>
                        </div>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Find nearby sports grounds and facilities</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Connect with qualified coaches and mentors</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Location-based guidance and support</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Map integration for easy discovery</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1c756b] mb-6">Portal Features</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to grow as a student while contributing to the environment
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaChartBar className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1c756b] mb-3">Student Dashboard</h3>
                        <p className="text-gray-600">Track your profile, progress, and trees planted count in one place</p>
                    </div>
                    
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaMapMarkerAlt className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1c756b] mb-3">Sports Discovery</h3>
                        <p className="text-gray-600">Find nearby grounds, coaches, and mentors with map integration</p>
                    </div>
                    
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaTree className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1c756b] mb-3">Tree Tracking</h3>
                        <p className="text-gray-600">Every students tree plantation record is tracked and displayed</p>
                    </div>
                    
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaMedal className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1c756b] mb-3">Gamification</h3>
                        <p className="text-gray-600">Earn badges and rewards for tree plantation and sports achievements</p>
                    </div>
                    
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaHandshake className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1c756b] mb-3">Community</h3>
                        <p className="text-gray-600">Connect with like-minded students and environmental enthusiasts</p>
                    </div>
                    
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaMobileAlt className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1c756b] mb-3">Mobile Ready</h3>
                        <p className="text-gray-600">Access all features on your mobile device anytime, anywhere</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-20 bg-gradient-to-r from-[#1c756b] to-[#2a8b7f] text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Creating Lasting Impact</h2>
                    <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                        StudentYug aligns with national initiatives and creates positive change
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-300 mb-2">10K+</div>
                        <div className="text-gray-200">Students Joined</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-300 mb-2">25K+</div>
                        <div className="text-gray-200">Trees Planted</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-300 mb-2">50+</div>
                        <div className="text-gray-200">Sports</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-300 mb-2">50+</div>
                        <div className="text-gray-200">Cities Covered</div>
                    </div>
                </div>
                
                <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-4">Government Alignment</h3>
                        <ul className="space-y-3 text-gray-100">
                            <li>• Mission LiFE (Lifestyle for Environment) support</li>
                            <li>• National Green Mission participation</li>
                            <li>• One Student One Tree initiatives</li>
                            <li>• CSR partnership opportunities</li>
                        </ul>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-4">Social Benefits</h3>
                        <ul className="space-y-3 text-gray-100">
                            <li>• Environmental consciousness in youth</li>
                            <li>• Sports development and fitness</li>
                            <li>• Community building and networking</li>
                            <li>• Sustainable development goals</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gray-50">
            <div className="w-full px-6 text-center">
                <div className="w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1c756b] mb-6">
                        Contact Us
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Get in touch with us for any queries, partnerships, or support. 
                        We here to help you grow!
                    </p>
                    
                    {/* Contact Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-6xl mx-auto">
                        {/* Email */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaEnvelope className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                            <p className="text-gray-600 mb-2">For general inquiries</p>
                            <a href="mailto:info@studentyug.com" className="text-[#1c756b] font-medium hover:text-[#155e56] transition-colors">
                                info@studentyug.com
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaPhone className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                            <p className="text-gray-600 mb-2">Mon-Fri 9AM-6PM</p>
                            <a href="tel:+91-9876543210" className="text-[#1c756b] font-medium hover:text-[#155e56] transition-colors">
                                +91 98765 43210
                            </a>
                        </div>

                        {/* Address */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-[#1c756b] rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaMapMarkerAlt className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
                            <p className="text-gray-600 mb-2">Our office location</p>
                            <p className="text-[#1c756b] font-medium">
                                123 Education Street,<br />
                                Green City, Delhi 110001
                            </p>
                        </div>
                    </div>

                    {/* Additional Contact Options */}
                   
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-[#1c756b] text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">StudentYug</h3>
                        <p className="text-gray-200 mb-4">One Student, One Tree, One Future</p>
                        <p className="text-sm text-gray-300">
                            Connecting students with sports guidance while promoting environmental responsibility.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-200">
                            <li><a href="#" className="hover:text-yellow-300 transition-colors">About Us</a></li>
                            <li><a href="#features" className="hover:text-yellow-300 transition-colors">Features</a></li>
                            <li><a href="#pillars" className="hover:text-yellow-300 transition-colors">Our Pillars</a></li>
                            <li><a href="#impact" className="hover:text-yellow-300 transition-colors">Impact</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-200">
                            <li><a href="#" className="hover:text-yellow-300 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-yellow-300 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-yellow-300 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <FaFacebook className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <FaInstagram className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <FaTwitter className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <FaLinkedin className="text-lg" />
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-200">
                    <p>&copy; 2024 StudentYug. All rights reserved. Growing knowledge, growing nature.</p>
                </div>
            </div>
        </footer>
        </>
    )
}
