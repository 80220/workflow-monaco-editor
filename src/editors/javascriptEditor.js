import monaco from "../init";

function createJavascriptEditor(mountElement, value, options = {}) {
  const element = typeof mountElement === "string" ? document.getElementById(mountElement) : mountElement;
  return monaco.editor.create(element, {
    value,
    language: "javascript",
    fontSize: 13,
    lineNumbersMinChars: 3,
    automaticLayout: true,
    theme: "vs-dark",
    minimap: { enabled: false },
    // scrollbar: {
    //   vertical: "auto",
    //   horizontal: "auto",
    // },
    scrollBeyondLastLine: false,
    ...options,
  });
}
export default createJavascriptEditor;