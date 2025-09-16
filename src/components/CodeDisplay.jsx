import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

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
    <div className="w-full h-full text-white">
      {currentFileCode && (
        <div className="w-full h-full bg-[#111827] rounded-lg p-4">
          <pre className="w-full h-full overflow-auto">
            <code ref={codeRef} className="language-javascript">
              {currentFileCode}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;