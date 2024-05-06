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
            <h2 className="text-lg font-semibold mb-2">Notice:</h2>
            <p className="text-sm text-gray-700">
              You can share your results with your friends, teachers or simply save it for later by copying the link
              from the address bar. We utilize token-based sharing, so you can share your results without any personal
              data being shared nor saving any information on the server side. Data is taken from BTEC Pearson L3 ICT
              specification. But if it's changed or some data is incorrect, please let us know via issues on GitHub.
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
