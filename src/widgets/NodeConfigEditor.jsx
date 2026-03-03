import createNodeConfigEditor from "../editors/nodeConfigEditor";
import { useEffect } from "react";

const autosuggestions = [
  {
    label: "@global.request-proxy-1",
    insertText: "@global.request-proxy-1",
    documentation: "Request Proxy 1",
  },
  {
    label: "@task.123.output",
    insertText: "@task.123.output",
    documentation: "Output of task 123",
  },
  {
    label: "@task.567.output",
    insertText: "@task.567.output",
    documentation: "Output of task 567",
  },
];

function NodeConfigEditor({ height, width, schema, value = "{}" }) {
  useEffect(() => {
    console.log("Initializing Monaco Editor");
    const editor = createNodeConfigEditor(
      "container",
      value,
      "json",
      schema,
      autosuggestions,
    );
    return () => {
      editor.dispose();
    };
  }, [schema, value]);
  return <div id="container" style={{ height, width }}></div>;
}

export default NodeConfigEditor;
