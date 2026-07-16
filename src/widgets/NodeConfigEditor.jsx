import createNodeConfigEditor from "../editors/nodeConfigEditor";
import { useEffect, useMemo, useRef } from "react";
import { generateJSONFromSchema } from "./utils";
import monaco from "../init";

function NodeConfigEditor({ height, width, schema, value, autosuggestions = [], monacoOptions = {}, onChange }) {
  const editorRef = useRef(null);
  const providerRef = useRef(null);
  const containerRef = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

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

    const validate = () => {
      if (!editorRef.current) return;
      const content = editorRef.current.getValue();
      try {
        JSON.parse(content);
        const model = editorRef.current.getModel();
        if (model) {
          const markers = monaco.editor.getModelMarkers({ resource: model.uri });
          const hasErrors = markers.some(
            (marker) => marker.severity === monaco.MarkerSeverity.Error
          );
          if (!hasErrors) {
            onChangeRef.current?.(content);
          }
        }
      } catch {
        // Invalid JSON content, do not trigger onChange
      }
    };

    let timer;
    const handleContentChange = () => {
      clearTimeout(timer);
      if (!schema) {
        timer = setTimeout(validate, 100);
      } else {
        timer = setTimeout(validate, 500);
      }
    };

    const handleMarkersChange = (uris) => {
      const model = editorRef.current?.getModel();
      if (model && uris.some((uri) => uri.toString() === model.uri.toString())) {
        clearTimeout(timer);
        validate();
      }
    };

    const contentSub = editor.onDidChangeModelContent(handleContentChange);
    const markersSub = monaco.editor.onDidChangeMarkers(handleMarkersChange);

    return () => {
      contentSub.dispose();
      markersSub.dispose();
      clearTimeout(timer);

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


