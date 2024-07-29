import { FaPhoneSquareAlt, FaYoutube } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import { MdMail } from 'react-icons/md';
import { RiInstagramFill } from 'react-icons/ri';

const ContactInfo = () => {
  return (
    <div className="flex items-center justify-center md:justify-between gap-2 md:gap-4 py-2 px-8 bg-primary text-gray-300 text-xs">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <FaPhoneSquareAlt className="w-5 h-5 text-orange-400 " />
          <a href="tel:+5522999999999" className="hover:underline">
            +55 (22)99999-9999
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MdMail className="w-5 h-5 text-orange-400" />
          <a href="mailto:sgi@minhaigreja.com" className="hover:underline">
            sgi@minhaigreja.com
          </a>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-7">
          <RiInstagramFill className="text-gray-300 size-4" />
          <FaSquareFacebook className="text-gray-300 size-4" />
          <FaYoutube className="text-gray-300 size-4" />
          <MdMail className="text-gray-300 size-4" />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
