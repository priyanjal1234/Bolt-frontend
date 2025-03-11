import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Import your preferred Highlight.js theme

const CodeDisplay = () => {
  const { currentFileCode } = useSelector((state) => state.ai);
  const codeRef = useRef(null);


  useEffect(() => {
    if (codeRef.current) {
      delete codeRef.current.dataset.highlighted;
      hljs.highlightElement(codeRef.current);
    }
  }, [currentFileCode]);

  return (
    <div className="w-[75%] h-full text-white">
      {currentFileCode && (
        <pre className=" w-full h-fit overflow-auto p-4 rounded">
          <code ref={codeRef} className="language-javascript">
            {currentFileCode}
          </code>
        </pre>
      )}
      
    </div>
  );
};

export default CodeDisplay;
