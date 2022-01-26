import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { oneDark } from "@codemirror/theme-one-dark";
import { python } from "@codemirror/lang-python";

interface Editor {
  getCode(): string;
  initCode(code: string): void;
  setCode(code: string): void;
}

const Editor = forwardRef((props, ref) => {
  const refEditor = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView>(null!);

  useImperativeHandle(ref, () => ({
    getCode: () => {
      return editor.state.doc.toString();
    },

    initCode: (code: string) => {
      setEditor(() => {
        return new EditorView({
          state: EditorState.create({
            extensions: [python(), basicSetup, oneDark],
            doc: code || " ",
          }),
          parent: refEditor.current || document.body,
        });
      });
    },

    setCode: (code: string) => {
      editor.setState(
        EditorState.create({
          extensions: [python(), basicSetup, oneDark],
          doc: code,
        })
      );
    },
  }));

  return <div className="editor" ref={refEditor}></div>;
});

export { Editor };
