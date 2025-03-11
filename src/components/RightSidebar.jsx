import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFileCode } from "../redux/reducers/AiReducer";

const RightSidebar = () => {
  const { allResponses, fileData, currentFileCode } = useSelector((state) => state.ai);
  const dispatch = useDispatch();

  const handleCurrentFileCode = (data) => {
    const selectedFile = fileData.find((file) => file.filename === data);
    if (selectedFile) {
      dispatch(setCurrentFileCode(selectedFile.code));
    }
  };

  return (
    <div className="w-[24%] rounded-lg p-2 min-h-full bg-[#111827]">
      <h1 className="text-lg font-semibold mb-4">File Explorer</h1>
      {allResponses[0]?.map((res, i) => (
        <button
          onClick={() => handleCurrentFileCode(res)} 
          key={i}
          className="flex items-center gap-2 px-3 py-2 border-2 border-gray-700 mb-3 rounded-lg"
        >
          {res} 
        </button>
      ))}
    </div>
  );
};

export default RightSidebar;
