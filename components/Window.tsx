import { useEffect, useState, useRef, useCallback } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Console, lineOutput } from "../components/Console";
import CommandButton from "../components/CommandButton";
import { PlayArrow, Delete, HourglassEmpty } from "@mui/icons-material";
import { python } from "@codemirror/lang-python";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { oneDark } from "@codemirror/theme-one-dark";

const Window = ({ precode }: any) => {
  const [code, setcode] = useState(precode);
  const [output, setoutput] = useState([]);
  const [hasInput, setHasInput] = useState(false);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState("");
  const [editor, setEditor] = useState(null);

  const refEditor = useRef(null);
  const refInput = useRef(null);

  useEffect(() => {
    //@ts-ignore
    setEditor(() => {
      return new EditorView({
        state: EditorState.create({
          extensions: [python(), basicSetup, oneDark],
          doc: code,
        }),
        //@ts-ignore
        parent: refEditor.current,
      });
    });
  }, []);

  const sendInput = async (e: any) => {
    setHasInput(true);
    return await new Promise<void>((resolve) => {
      //@ts-ignore
      refInput.current.onkeydown = (e: any) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          resolve(e.target.value);
        }
      };
    });
  };

  const clear = () => {
    setoutput([]);
    setRunning(false);
    setcode("");
  };

  const run = () => {
    //@ts-ignore
    const str = editor.state.doc.toString();
    setoutput([]);
    setcode(str);
    runPythonCode(str);
  };

  const runPythonCode = async (str: string) => {
    setRunning(true);
    //@ts-ignore
    const runner = new BrythonRunner({
      stdout: {
        write: (content: string) => {
          //@ts-ignore
          setoutput((i) => {
            return [...i, new lineOutput(content, "stdout")];
          });
        },
        flush: () => {},
      },
      stderr: {
        write: (content: string) => {
          //@ts-ignore
          setoutput((i) => {
            return [...i, new lineOutput(content, "stderr")];
          });
        },
        flush: () => {},
      },
      stdin: {
        async readline() {
          //@ts-ignore
          const consoleInput = await sendInput();
          setHasInput(false);
          //@ts-ignore
          setoutput((i) => {
            //@ts-ignore
            return [...i, new lineOutput(consoleInput, "stdout")];
          });
          return consoleInput;
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
      <div className="editor" ref={refEditor}></div>
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
      <Console output={output} hasInput={hasInput} refInput={refInput} />
    </div>
  );
};

export default Window;
