class lineOutput {
  constructor(public output: string, public type: string) {
    this.output = output;
    this.type = type;
  }
}

const Console = ({ output, hasInput, refInput }: any) => {
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
      {hasInput && <input type="text" name="input" ref={refInput}></input>}
    </div>
  );
};

export { Console, lineOutput };
