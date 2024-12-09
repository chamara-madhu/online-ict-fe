import { Link } from "react-router-dom";
import { MCQ_ALL_PATH } from "../../../constants/routes";

const Services = () => {
  return (
    <div className="flex p-20 bg-blue-50">
      <div className="flex flex-col max-w-screen-xl gap-16 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Our Services
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Link to={MCQ_ALL_PATH}>
            <div className="overflow-hidden bg-white border border-purple-300 rounded-lg">
              <div className="p-8 bg-gradient-to-r from-indigo-500 to-purple-500">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  MCQ Papers Practice
                </h3>
                <p className="text-lg text-white">
                  Master the Art of Multiple Choice Questions with Ease
                </p>
              </div>
              <div className="p-8">
                <p className="mb-6 text-gray-700">
                  Practice makes perfect, and our extensive library of MCQ
                  papers ensures that you can hone your skills in the comfort of
                  your own home.
                </p>
                <ul className="mb-4 text-gray-700 list-disc list-inside">
                  <li>24/7 access</li>
                  <li>Practice at your own pace</li>
                  <li>Track your progress</li>
                </ul>
                <div className="flex flex-col gap-4">
                  <table className="w-full text-left table-fixed">
                    <tbody>
                      <tr>
                        <th className="pr-4 py-2 w-[50px] text-gray-700 font-medium text-sm">
                          Papers
                        </th>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <span className="px-4 py-1 text-sm text-black bg-blue-200 border border-blue-500 rounded-full">
                              Past
                            </span>
                            <span className="px-4 py-1 text-sm text-black bg-blue-200 border border-blue-500 rounded-full">
                              Model
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="pr-4 py-2 w-[50px] text-gray-700 font-medium text-sm">
                          Exams
                        </th>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <span className="px-4 py-1 text-sm text-black bg-blue-200 border border-blue-500 rounded-full">
                              G.C.E A/L
                            </span>
                            <span className="px-4 py-1 text-sm text-black bg-blue-200 border border-blue-500 rounded-full">
                              G.C.E O/L
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="pr-4 py-2 w-[50px] text-gray-700 font-medium text-sm">
                          Medium
                        </th>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <span className="px-4 py-1 text-sm text-black bg-blue-200 border border-blue-500 rounded-full">
                              English
                            </span>
                            <span className="px-4 py-1 text-sm text-black bg-blue-200 border border-blue-500 rounded-full">
                              Sinhala
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>{" "}
          </Link>

          <div className="overflow-hidden bg-white border border-purple-300 rounded-lg">
            <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500">
              <h3 className="mb-2 text-2xl font-bold text-white">
                MCQs Divided by Syllabus
              </h3>
              <p className="text-lg text-white">
                Simplify Your Learning with Syllabus-Based MCQs
              </p>
            </div>
            <div className="p-6">
              <p className="mb-4 text-gray-700">
                Our MCQs are carefully categorized to match the latest syllabus,
                making it easier for you to focus on specific topics.
              </p>
              <ul className="pl-6 text-gray-700 list-disc">
                <li>Stay organized</li>
                <li>Identify gaps</li>
                <li>Enhance your understanding</li>
              </ul>
            </div>
          </div>

          <div className="overflow-hidden bg-white border border-purple-300 rounded-lg">
            <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500">
              <h3 className="mb-2 text-2xl font-bold text-white">
                Video Tutorials (Coming Soon)
              </h3>
              <p className="text-lg text-white">
                Visualize Your Learning with Interactive Video Tutorials
              </p>
            </div>
            <div className="p-6">
              <p className="mb-4 text-gray-700">
                Coming soon, our video tutorials will provide a visual and
                interactive way to learn.
              </p>
              <ul className="pl-6 text-gray-700 list-disc">
                <li>Watch and learn</li>
                <li>Pause and practice</li>
                <li>Enhance retention</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
