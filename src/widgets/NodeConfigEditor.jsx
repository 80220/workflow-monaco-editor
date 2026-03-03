import createNodeConfigEditor from "../editors/nodeConfigEditor";
import { useEffect, useMemo } from "react";
import { generateJSONFromSchema } from "./utils";

function NodeConfigEditor({ height, width, schema, value, autosuggestions = [] }) {
  const initialValue = useMemo(() => {
    if (value) return value;
    if (schema) {
      return JSON.stringify(generateJSONFromSchema(schema), null, 2);
    }
    return "{}";
  }, [value, schema]);

  useEffect(() => {
    console.log("Initializing Monaco Editor");
    const editor = createNodeConfigEditor(
      "container",
      initialValue,
      "json",
      schema,
      autosuggestions,
    );
    return () => {
      editor.dispose();
    };
  }, [schema, initialValue, autosuggestions]);

  return <div id="container" style={{ height, width }}></div>;
}

export default NodeConfigEditor;
