import { isRejected } from "@reduxjs/toolkit";
import { forwardRef, useState, useRef, useImperativeHandle } from "react";

class lineOutput {
  constructor(public output: string, public type: string) {
    this.output = output;
    this.type = type;
  }
}

interface Console {
  getInput(): Promise<string>;
  addOutput(output: lineOutput): void;
  clearOutput(): void;
  setHasInput(hasInput: boolean): void;
}

const Console = forwardRef((props, ref) => {
  const [output, setOutput] = useState<lineOutput[]>([]);
  const [hasInput, setHasInput] = useState<boolean>(false);
  const refInput = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getInput: async () => {
      return await new Promise<string>((res, rej) => {
        if (!refInput.current) rej("There is an input error");
        else {
          refInput.current.value = "";
          refInput.current.onkeydown = (e: KeyboardEvent) => {
            if (e.code === "Enter") {
              e.preventDefault();
              if (!refInput.current) rej("There is an input error");
              else {
                res(refInput.current.value);
              }
            }
          };
        }
      });
    },

    addOutput: (line: lineOutput) => {
      setOutput((i) => {
        return [...i, line];
      });
    },

    clearOutput: () => {
      setOutput([]);
    },

    setHasInput: (b: boolean) => {
      setHasInput(b);
    },
  }));

  return (
    <div className="console">
      {output.map((line: lineOutput, index: number) => {
        return (
          <p
            key={index}
            style={{ color: line.type == "stderr" ? "#ff4d4d" : "white" }}
          >
            {line.output}
          </p>
        );
      })}
      <input
        type="text"
        name="input"
        ref={refInput}
        style={{ display: !hasInput ? "none" : "block" }}
      ></input>
    </div>
  );
});

export { Console, lineOutput };

function addOutput(output: lineOutput) {}
