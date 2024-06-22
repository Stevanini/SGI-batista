import { Mail, Phone } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-2 md:space-x-4 text-sm text-white py-2 px-4 bg-gray-800">
      <div className="flex items-center space-x-2">
        <Phone className='w-5 h-5' />
        <a href="tel:+550000000000" className="hover:underline">+55 00 0000-0000</a>
      </div>
      <div className="flex items-center space-x-2">
        <Mail className='w-5 h-5' />
        <a href="mailto:sgi@minhaigreja.com" className="hover:underline">sgi@minhaigreja.com</a>
      </div>
    </div>
  );
};

export default ContactInfo;