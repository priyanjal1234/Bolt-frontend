import React from "react";
import ChatBox from "./components/ChatBox";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { setAllResponses } from "./redux/reducers/AiReducer";
import RightComponent from "./components/RightComponent";

const App = () => {
  let { allPrompts, allResponses } = useSelector((state) => state.ai);
  const dispatch = useDispatch();

  console.log(allPrompts)

  const handleResponse = (response, promptIndex) => {
    dispatch(setAllResponses({ response, promptIndex }));
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white px-2 py-2">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col">
          <ChatBox onResponse={handleResponse} />
          
          <div className="mt-4 w-full max-w-full flex flex-col items-start gap-3">
            {allPrompts?.map((prompt, index) => (
              <div
                key={index}
                className="w-full max-w-full p-3 border-2 border-gray-700 rounded-sm bg-[#111827]"
              >
                {prompt}

                {allResponses[index] && (
                  <div className="w-full max-w-full p-3 border-2 border-gray-700 rounded-sm bg-[#111827] mt-2">
                    {allResponses[index]?.map((res, i) => (
                      <h1 key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">
                          <IoIosCheckmarkCircle />
                        </span>
                        Created: {res}
                      </h1>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 xl:w-3/5 mt-4 lg:mt-0">
          <RightComponent />
        </div>
      </div>
    </div>
  );
};

export default App;