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

const ChatBox = () => {
  const [prompt, setprompt] = useState("");
  let dispatch = useDispatch();
  const [mountFiles, setmountFiles] = useState({});
  const [webContainer, setwebContainer] = useState(null);
  const [iFrameUrl, setiFrameUrl] = useState("");

  const [start, setstart] = useState(false)

  const { currentFileCode } = useSelector((state) => state.ai);

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
        "http://localhost:4000/api/ai/get-result",
        { prompt },
        { withCredentials: true }
      );

      setmountFiles(res?.data?.fileTree);

      dispatch(setFileData(res?.data?.currentProject?.response));

      dispatch(
        setAllResponses(res?.data?.fileData?.map((item) => item.filename))
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
      
      let lsProcess = await webContainer?.spawn("ls")

      lsProcess.output.pipeTo(new WritableStream({
        write(chunk) {
          console.log(chunk)
        }
      }))

      let installProcess = await webContainer?.spawn("npm", ["install"]);
      installProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            console.log(chunk);
          },
        })
      );

      setstart(() => true)

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
      <div className="w-[600px] h-[60px] bg-[#111827] text-white flex items-center pl-4 border-2 rounded-lg bottom-3 absolute border-gray-700">
        <form
          onSubmit={handleGetAIResponse}
          className="w-full flex justify-around items-center"
        >
          <input
            type="text"
            className="w-[80%] h-full bg-transparent outline-none text-white"
            placeholder="Write Prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
          />
          <button type="submit" className="px-3 py-2 bg-blue-900 rounded-lg">
            Send
          </button>
        </form>
      </div>
      {currentFileCode && (
        <button
          onClick={handleRunCode}
          className="px-3 py-2 bg-blue-600 rounded-lg absolute right-5 top-[400px]"
        >
          {start ? "Run" : "Start"}
        </button>
      )}
      {iFrameUrl && webContainer && (
        <iframe crossorigin="anonymous" className="text-white w-[500px] h-[300px] absolute bottom-20 left-[900px] bg-white" src={iFrameUrl}></iframe>
      )}
    </>
  );
};

export default ChatBox;
