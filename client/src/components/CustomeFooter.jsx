import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTelegramPlane, FaGithub } from 'react-icons/fa';

const CustomeFooter = () => {
  return (
    
    <Footer className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800">
     <div className="w-full px-4 max-h-56 flex flex-col ">
      
        
        {/* <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            <FaTelegramPlane size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            <FaGithub size={24} />
          </a>
        </div> */}
        
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          © {new Date().getFullYear()} Eman's Blog. All Rights Reserved.
        </div>
      </div>
    </Footer>
  );
};

export default CustomeFooter;
