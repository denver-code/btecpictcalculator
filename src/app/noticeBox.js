import React, { useState } from 'react';

const NoticeBox = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white rounded-lg p-8 max-w-md relative z-50">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Note</h2>
            
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Credits</h3>
            <p className="text-sm text-gray-700">
              
              All the work is done by Ihor Savenko ( <a href="https://github.com/denver-code" className="text-blue-500 hover:underline">
                denver-code 
                </a> )
                <br />
                Email: <a href="mailto:csigorek@gmail.com" className="text-blue-500 hover:underline">
                  csigorek@gmail.com
                </a>
                <br />
                Let me know if you have any questions or suggestions.
               <br /><br />
            </p>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Sharing</h3>
              <p className="text-sm text-gray-700">
              You can share your results with your friends, teachers or simply save it for later by copying the link
              from the address bar. 
              <br /> <br />
              We utilize token-based sharing, so you can share your results without any personal
              data being shared nor saving any information on the server side.  <br />
               <br /> <br />
               </p>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Source of data</h3>
              <p className="text-sm text-gray-700">
              Data is taken from BTEC Pearson L3 ICT specification that you can find  <a href="https://github.com/denver-code/btecpictcalculator/blob/main/specification-pearson-btec-level-3-national-extended-certificate-in-information-technology.pdf" className="text-blue-500 hover:underline">
               here
                </a>. But if it's changed or some data is incorrect, please let us know via issues on GitHub.
               <br /> <br />
              <a href="https://github.com/denver-code/btecpictcalculator/issues" className="text-blue-500 hover:underline">
                Report an issue
                </a>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default NoticeBox;
