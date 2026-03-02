import createJavascriptEditor from "../editors/javascriptEditor";
import { useEffect } from "react";

const codeSnippet = `// Load the full build.
const _ = require('lodash');

function transform(a, b, c) {
    return;
}`

function JavascriptEditor({ height, width }) {
  useEffect(() => {
    console.log("Initializing Monaco Editor");
    const editor = createJavascriptEditor(
      "container-js-editor",
      codeSnippet,
    );
    return () => {
      editor.dispose();
    };
  }, []);
  return <div id="container-js-editor" style={{ height: "600px", width: "600px", border: "1px solid #000000" }}></div>;
}

export default JavascriptEditor;
