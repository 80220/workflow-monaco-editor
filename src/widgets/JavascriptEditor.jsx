import createJavascriptEditor from "../editors/javascriptEditor";
import { useEffect, useRef } from "react";

function JavascriptEditor({ height, width, codeSnippet = "", monacoOptions = {} }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (editorRef.current) return;

    console.log("Initializing Monaco Editor");
    editorRef.current = createJavascriptEditor(
      containerRef.current,
      codeSnippet,
      monacoOptions,
    );
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, [codeSnippet, monacoOptions]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions(monacoOptions);
    }
  }, [monacoOptions]);

  return <div ref={containerRef} style={{ height, width, border: "1px solid #000000" }}></div>;
}

export default JavascriptEditor;
