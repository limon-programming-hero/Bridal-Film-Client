import { Helmet } from "react-helmet";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div className="mx-auto">
      <Helmet>
        <title>Contact Page | Bridal Film</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
            <p>123 Bridal Blvd, Wedding City, USA</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone className="h-5 w-5 text-gray-500" />
            <p>(123) 456-7890</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="h-5 w-5 text-gray-500" />
            <p>info@bridalfilm@gmail.com</p>
          </div>
        </div>
        <Link to="/shop" className="btn btn-secondary btn-outline my-8">
          <span className="hover:text-white">Book Now</span>
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
