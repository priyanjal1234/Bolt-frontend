import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFileCode } from "../redux/reducers/AiReducer";

const RightSidebar = () => {
  const { allResponses, fileData } = useSelector((state) => state.ai);
  const dispatch = useDispatch();

  console.log(fileData)

  const handleCurrentFileCode = (data) => {
    const selectedFile = fileData.find((file) => file.filename === data);
    if (selectedFile) {
      dispatch(setCurrentFileCode(selectedFile.code));
    }
  };

  return (
    <div className="w-full rounded-lg p-4 bg-[#111827]">
      <h1 className="text-lg font-semibold mb-4">File Explorer</h1>
      <div className="flex flex-col gap-2">
        {Array.isArray(allResponses[0]) && allResponses[0]?.map((res, i) => (
          <button
            onClick={() => handleCurrentFileCode(res)}
            key={i}
            className="text-left px-3 py-2 border-2 border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {res}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;