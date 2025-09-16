import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllPrompts,
  setCurrentPrompt,
  setAllResponses,
  setFileData,
} from "../redux/reducers/AiReducer";
import { getWebContainer } from "../config/webContainer";
import { VscOpenPreview } from "react-icons/vsc";

const ChatBox = ({ onResponse }) => {
  const [prompt, setprompt] = useState("");
  let dispatch = useDispatch();
  const [mountFiles, setmountFiles] = useState({});
  const [webContainer, setwebContainer] = useState(null);
  const [iFrameUrl, setiFrameUrl] = useState("");
  const [start, setstart] = useState(false);

  const { currentFileCode, allPrompts } = useSelector((state) => state.ai);

  useEffect(() => {
    if (!webContainer) {
      getWebContainer().then((container) => {
        setwebContainer(container);
        console.log("Container Started");
      });
    }
  }, []);

  async function handleGetAIResponse(e) {
    e.preventDefault();
    dispatch(setCurrentPrompt(prompt));
    dispatch(setAllPrompts(prompt));

    try {
      let res = await axios.post(
        "https://bolt-backend-zcq7.onrender.com/api/ai/get-result",
        { prompt },
        { withCredentials: true }
      );

      setmountFiles(res?.data?.fileTree);
      dispatch(setFileData(res?.data?.currentProject?.response));
      const fileNames = Array.isArray(res?.data?.fileData)
        ? res.data.fileData.map((item) => item.filename)
        : [];

      onResponse(
        fileNames,
        allPrompts.length
      );
      setprompt("");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleRunCode() {
    try {
      console.log("Mounting Files");
      await webContainer?.mount(mountFiles);
      console.log("mounted");

      let lsProcess = await webContainer?.spawn("ls");
      lsProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            console.log(chunk);
          },
        })
      );

      let installProcess = await webContainer?.spawn("npm", ["install"]);
      installProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            console.log(chunk);
          },
        })
      );

      setstart(() => true);
      let startProcess = await webContainer?.spawn("npm", ["start"]);
      startProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            console.log(chunk);
          },
        })
      );

      webContainer?.on("server-ready", function (port, url) {
        console.log(port, url);
        setiFrameUrl(url);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="w-full max-w-full bg-[#111827] text-white flex items-center p-4 border-2 rounded-lg border-gray-700 mb-4">
        <form
          onSubmit={handleGetAIResponse}
          className="w-full flex flex-col sm:flex-row gap-2 items-center"
        >
          <input
            type="text"
            className="w-full sm:w-3/4 h-12 bg-transparent outline-none text-white px-2 border border-gray-600 rounded"
            placeholder="Write Prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-900 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>

      {currentFileCode && (
        <button
          onClick={handleRunCode}
          className="px-4 py-2 bg-blue-600 rounded-lg mb-4"
        >
          {start ? "Run" : "Start"}
        </button>
      )}

      {iFrameUrl && webContainer && (
        <div className="w-full max-w-full overflow-hidden">
          <iframe
            crossOrigin="anonymous"
            className="w-full h-64 md:h-96 bg-white border rounded-lg"
            src={iFrameUrl}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default ChatBox;
