import { useState, useEffect, useRef, ReactPropTypes } from "react";
import Script from "next/script";
import { Console, lineOutput } from "../components/Console";
import { Editor } from "../components/Editor";
import CommandButton from "../components/CommandButton";
import { PlayArrow, Delete, HourglassEmpty } from "@mui/icons-material";

interface WindowProps {
  precode: string;
}

const Window = (props: WindowProps) => {
  const [running, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState<String>("");

  const refEditor = useRef<Editor>(null);
  const refConsole = useRef<Console>(null);

  useEffect(() => {
    refEditor.current?.initCode(props.precode);
  }, []);

  const clear = () => {
    refConsole.current?.clearOutput();
    setRunning(false);
    refEditor.current?.setCode("");
  };

  const run = () => {
    const str = refEditor.current?.getCode() || "";
    refConsole.current?.clearOutput();
    runPythonCode(str);
  };

  const runPythonCode = async (str: string) => {
    setRunning(true);

    //@ts-ignore
    const runner = new BrythonRunner({
      stdout: {
        write: (content: string) => {
          refConsole.current?.addOutput(new lineOutput(content, "stdout"));
        },
        flush: () => {},
      },
      stderr: {
        write: (content: string) => {
          refConsole.current?.addOutput(new lineOutput(content, "stderr"));
        },
        flush: () => {},
      },
      stdin: {
        async readline() {
          refConsole.current?.setHasInput(true);
          const consoleInput = await refConsole.current?.getInput();
          refConsole.current?.setHasInput(false);
          if (consoleInput == undefined) {
            refConsole.current?.addOutput(
              new lineOutput("There is an error on the input", "stderr")
            );
          } else {
            refConsole.current?.addOutput(
              new lineOutput(consoleInput, "stdout")
            );
            return consoleInput;
          }
        },
      },
    });

    let startTime = new Date().getTime();
    await runner.runCode(str);
    setTime(`${new Date().getTime() - startTime} ms`);
    setRunning(false);
  };

  return (
    <div className="window window-md">
      <Script
        strategy="beforeInteractive"
        src="/statics/brython-runner.bundle.js"
      />
      <Editor ref={refEditor} />
      <div className="commands">
        <CommandButton
          run={run}
          Icon={running ? HourglassEmpty : PlayArrow}
          color={running ? "#888888" : "#4caf50"}
          disable={running}
        />
        <CommandButton run={clear} Icon={Delete} color={"#ffa500"} />
        <p>{time}</p>
      </div>
      <Console ref={refConsole} />
    </div>
  );
};

export default Window;
