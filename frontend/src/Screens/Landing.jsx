import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiUserPlus, FiUsers } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaYoutube, FaBlogger, FaGooglePlusG, FaInstagram } from "react-icons/fa";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar Dashboard */}
      <nav className="bg-blue-900 flex justify-end items-center p-4 shadow-lg">
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-teal-700 rounded-lg hover:bg-teal-500 hover:text-white transition duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <FiLogIn className="text-sm" />
            Admin Login
          </Link>
          <button
            onClick={() => navigate('/login?type=student')}
            className="px-4 py-2 bg-teal-700 rounded-lg hover:bg-teal-500 hover:text-white transition duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <FiUserPlus className="text-sm" />
            Student Login
          </button>
          <button
            onClick={() => navigate('/login?type=faculty')}
            className="px-4 py-2 bg-teal-700 rounded-lg hover:bg-teal-500 hover:text-white transition duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <FiUsers className="text-sm" />
            Staff Login
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white p-6 flex flex-col md:flex-row justify-between items-center shadow-lg m-4 rounded-lg">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              src="http://vrscet.in/wp-content/uploads/2020/02/College-logo.png"
              alt="V.R.S. College of Engineering & Technology Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-600">V.R.S. College of Engineering & Technology</h1>
            <p className="text-lg text-gray-600 mt-2">Arasur-607 107, Villupuram District</p>
            <p className="text-sm text-gray-600 mt-1">Approved by AICTE and Affiliated to Anna University</p>
            <p className="text-sm text-gray-600 mt-1">(Reaccredited by NAAC and an ISO 9001:2008 Recertified Institution)</p>
            <p className="text-xl text-red-600 font-semibold mt-2">Counselling Code: 1421</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2">
            <img
              src="http://vrscet.in/wp-content/uploads/2020/02/College-logo.png"
              alt="V.R.S. College of Engineering & Technology Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-teal-600 hover:text-blue-600 transition duration-300 transform hover:scale-110">
              <FaFacebookF className="text-2xl" />
            </a>
            <a href="#" className="text-teal-600 hover:text-blue-600 transition duration-300 transform hover:scale-110">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="text-teal-600 hover:text-blue-600 transition duration-300 transform hover:scale-110">
              <FaYoutube className="text-2xl" />
            </a>
            <a href="#" className="text-teal-600 hover:text-blue-600 transition duration-300 transform hover:scale-110">
              <FaBlogger className="text-2xl" />
            </a>
            <a href="#" className="text-teal-600 hover:text-blue-600 transition duration-300 transform hover:scale-110">
              <FaGooglePlusG className="text-2xl" />
            </a>
            <a href="#" className="text-teal-600 hover:text-blue-600 transition duration-300 transform hover:scale-110">
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white text-center py-20 overflow-hidden m-0 w-full"
               style={{
                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('http://vrscet.in/wp-content/uploads/2024/08/home_clg-2048x1356.jpg')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
               }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6 p-6">
          <div className="text-3xl md:text-4xl font-bold text-yellow-400 animate-pulse">
            GOLD INSTITUTE
          </div>
          <p className="text-lg md:text-xl">
            AICTE - CII Survey of Industry Linked Technical Institutes 2016
          </p>
          <p className="text-2xl md:text-3xl font-semibold">
            Explore IT Excellence at VRS
          </p>
          <p className="text-xl md:text-2xl font-semibold">
            Join the IT Department for 2025-26{" "}
            <span className="text-yellow-400">Apply Now</span>
          </p>
          <p className="text-lg md:text-xl">
            Offering B.E. in IT with cutting-edge labs and industry-ready skills
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={() => navigate('/login?type=student')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-lg font-semibold text-white transform hover:scale-105 transition duration-300 shadow-lg"
            >
              Student Login
            </button>
            <button
              onClick={() => navigate('/login?type=faculty')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-lg font-semibold text-white transform hover:scale-105 transition duration-300 shadow-lg"
            >
              Staff Login
            </button>
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-lg font-semibold text-white transform hover:scale-105 transition duration-300 shadow-lg text-center"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="container mx-auto py-16 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 m-4">
        <div className="md:w-1/2">
          <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg shadow-xl overflow-hidden">
            <img
              src="http://vrscet.in/wp-content/uploads/2024/08/home_clg-2048x1356.jpg"
              alt="V.R.S. College of Engineering & Technology Campus"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="md:w-1/2 p-6">
          <h2 className="text-4xl font-semibold text-teal-600 mb-6">
            Welcome to VRS College of Engineering
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            VRS College of Engineering and Technology was established in the year 1994. The college is functioning with the trust of Government of Tamil Nadu and all India Council for Technical Education and affiliation of Anna University, Chennai.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Our institution is committed to providing quality education and fostering innovation in engineering and technology. Join us to be part of a legacy of excellence in technical education.
          </p>
          <button className="text-teal-600 text-xl hover:underline font-semibold hover:text-teal-800 transition duration-300">
            Read More...
          </button>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-6 m-4 rounded-lg">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            <div className="bg-gray-700 hover:bg-blue-600 p-4 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
              <span className="text-white font-medium">Home</span>
            </div>
            <div className="bg-gray-700 hover:bg-blue-600 p-4 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
              <span className="text-white font-medium">About Us</span>
            </div>
            <div className="bg-yellow-500 hover:bg-yellow-400 p-4 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
              <span className="text-white font-medium">Courses</span>
            </div>
            <div className="bg-gray-700 hover:bg-blue-600 p-4 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
              <span className="text-white font-medium">Facilities</span>
            </div>
            <div className="bg-gray-700 hover:bg-blue-600 p-4 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
              <span className="text-white font-medium">Placement</span>
            </div>
            <div className="bg-gray-700 hover:bg-blue-600 p-4 rounded-lg transition duration-300 transform hover:scale-105 cursor-pointer">
              <span className="text-white font-medium">Activities</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 m-4 rounded-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-teal-600 mb-12">
            Why Choose VRS College?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
              <div className="text-5xl text-blue-600 mb-4">🎓</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quality Education</h3>
              <p className="text-gray-600">AICTE approved courses with affiliation to Anna University, Chennai</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
              <div className="text-5xl text-blue-600 mb-4">🔬</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Modern Facilities</h3>
              <p className="text-gray-600">State-of-the-art laboratories and infrastructure for practical learning</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
              <div className="text-5xl text-blue-600 mb-4">💼</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Placement Support</h3>
              <p className="text-gray-600">Dedicated placement cell with industry partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-8 m-4 rounded-lg">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-teal-400 mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-teal-400 transition duration-300">History</a></li>
                <li><a href="#" className="text-blue-200 hover:text-teal-400 transition duration-300">Vision & Mission</a></li>
                <li><a href="#" className="text-blue-200 hover:text-teal-400 transition duration-300">Core Values</a></li>
                <li><a href="#" className="text-blue-200 hover:text-teal-400 transition duration-300">Leadership</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal-400 mb-4">Academic</h3>
              <ul className="space-y-2">
                <li><span className="text-blue-200">Department of CSE</span></li>
                <li><span className="text-blue-200">Department of ECE</span></li>
                <li><span className="text-blue-200">Department of Civil</span></li>
                <li><span className="text-blue-200">Department of Mechanical</span></li>
                <li><span className="text-blue-200">Department of EEE</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal-400 mb-4">Facilities</h3>
              <ul className="space-y-2">
                <li><span className="text-blue-200">Modern Infrastructure</span></li>
                <li><span className="text-blue-200">Well-equipped Library</span></li>
                <li><span className="text-blue-200">Advanced Laboratories</span></li>
                <li><span className="text-blue-200">Sports Facilities</span></li>
                <li><span className="text-blue-200">Hostel Accommodation</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal-400 mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-blue-200 hover:text-teal-400 transition duration-300">
                  <FaFacebookF className="text-xl" />
                </a>
                <a href="#" className="text-blue-200 hover:text-teal-400 transition duration-300">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-blue-200 hover:text-teal-400 transition duration-300">
                  <FaYoutube className="text-xl" />
                </a>
                <a href="#" className="text-blue-200 hover:text-teal-400 transition duration-300">
                  <FaInstagram className="text-xl" />
                </a>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2">
                <img
                  src="http://vrscet.in/wp-content/uploads/2020/02/College-logo.png"
                  alt="V.R.S. College of Engineering & Technology Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-gray-900 text-white p-6 text-center m-4 rounded-lg">
        <p className="text-lg">
          © 2025 V.R.S. College of Engineering & Technology. All rights reserved. |
          <a href="#" className="text-blue-200 hover:text-teal-400 ml-2 transition duration-300">LinkedIn</a> |
          <a href="mailto:info@vrsengg.ac.in" className="text-blue-200 hover:text-teal-400 ml-2 transition duration-300">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

export default Landing;
