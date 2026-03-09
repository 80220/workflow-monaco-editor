import createJavascriptEditor from "../editors/javascriptEditor";
import { useEffect, useRef } from "react";

const codeSnippet = `// Load the full build.
const _ = require('lodash');

function transform(a, b, c) {
    return;
}`

function JavascriptEditor({ height, width }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (editorRef.current) return;

    console.log("Initializing Monaco Editor");
    editorRef.current = createJavascriptEditor(
      containerRef.current,
      codeSnippet,
    );
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []);
  return <div ref={containerRef} style={{ height, width, border: "1px solid #000000" }}></div>;
}

export default JavascriptEditor;
