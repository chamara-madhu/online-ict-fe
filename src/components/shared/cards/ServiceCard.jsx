const ServiceCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
        <h3 className="text-white text-2xl font-bold mb-2">
          MCQ Papers Online Practice
        </h3>
        <p className="text-white text-lg">
          Master the Art of Multiple Choice Questions with Ease
        </p>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">
          Practice makes perfect, and our extensive library of MCQ papers
          ensures that you can hone your skills in the comfort of your own home.
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Access a vast repository of questions</li>
          <li>Explore A/L and O/L levels</li>
          <li>Choose between English and Sinhala</li>
          <li>Practice at your own pace</li>
          <li>Track your progress</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;
