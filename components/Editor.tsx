import { useState, useRef, useEffect, forwardRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { python } from "@codemirror/lang-python";

const Editor = ({ refEditor, code }: any) => {
  useEffect(() => {
    console.log("render editor", refEditor);
  }, []);
  return (
    <div className="editor">
      <CodeMirror
        ref={refEditor}
        value={code}
        height="1000px"
        extensions={[python()]}
        theme="dark"
      />
    </div>
  );
};

export default Editor;
