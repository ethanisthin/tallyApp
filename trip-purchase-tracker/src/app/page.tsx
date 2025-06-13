import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Trip Purchase Tracker</h1>
      <p className="mt-4 text-lg">Track your purchases during your trips effortlessly.</p>
      {/* Additional components or features can be added here */}
    </div>
  );
};

export default HomePage;