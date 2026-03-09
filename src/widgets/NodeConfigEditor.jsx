import createNodeConfigEditor from "../editors/nodeConfigEditor";
import { useEffect, useMemo, useRef } from "react";
import { generateJSONFromSchema } from "./utils";

function NodeConfigEditor({ height, width, schema, value, autosuggestions = [] }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  const initialValue = useMemo(() => {
    if (value) return value;
    if (schema) {
      return JSON.stringify(generateJSONFromSchema(schema), null, 2);
    }
    return "{}";
  }, [value, schema]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (editorRef.current) return;

    console.log("Initializing Monaco Editor");
    editorRef.current = createNodeConfigEditor(
      containerRef.current,
      initialValue,
      "json",
      schema,
      autosuggestions,
    );

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, [schema, initialValue, autosuggestions]);

  return <div ref={containerRef} style={{ height, width }}></div>;

}

export default NodeConfigEditor;
