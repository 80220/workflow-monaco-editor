import createNodeConfigEditor from "../editors/nodeConfigEditor";
import { useEffect, useMemo, useRef } from "react";
import { generateJSONFromSchema } from "./utils";

function NodeConfigEditor({ height, width, schema, value, autosuggestions = [], monacoOptions = {} }) {
  const editorRef = useRef(null);
  const providerRef = useRef(null);
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
    const { editor, completionProvider } = createNodeConfigEditor(
      containerRef.current,
      initialValue,
      "json",
      schema,
      autosuggestions,
      monacoOptions,
    );
    editorRef.current = editor;
    providerRef.current = completionProvider;

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
      if (providerRef.current) {
        providerRef.current.dispose();
        providerRef.current = null;
      }
    };
  }, [schema, initialValue, autosuggestions, monacoOptions]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions(monacoOptions);
    }
  }, [monacoOptions]);

  return <div ref={containerRef} style={{ height, width }}></div>;
}

export default NodeConfigEditor;

