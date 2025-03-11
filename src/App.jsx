import React from "react";
import ChatBox from "./components/ChatBox";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { setAllResponses } from "./redux/reducers/AiReducer"; // Assuming you have this action in your reducer
import RightComponent from "./components/RightComponent";

const App = () => {
  let { allPrompts, allResponses } = useSelector((state) => state.ai);
  const dispatch = useDispatch();

 
  const handleResponse = (response, promptIndex) => {
    dispatch(setAllResponses({ response, promptIndex }));
  };

  return (
    <div className="min-w-full min-h-screen flex bg-[#0A0C10] text-white px-2 py-2 overflow-x-hidden">
      <div>
        <ChatBox onResponse={handleResponse} />

        <div className="w-[600px] h-fit relative flex flex-col items-start gap-3">
          {allPrompts?.map((prompt, index) => (
            <div
              key={index}
              className="w-fit h-fit px-3 py-2 border-2 border-gray-700 rounded-sm bg-[#111827]"
            >
              {prompt}

              {allResponses[index] && (
                <div className="w-fit h-fit px-3 self-start py-2 border-2 border-gray-700 rounded-sm bg-[#111827] mt-2">
                  {allResponses[index]?.map((res, i) => (
                    <h1 key={i} className="flex items-center gap-2">
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
      <RightComponent />
    </div>
  );
};

export default App;
