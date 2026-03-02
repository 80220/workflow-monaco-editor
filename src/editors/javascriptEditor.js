import monaco from "../init";

function createJavascriptEditor(mountElementId, value) {
  return monaco.editor.create(document.getElementById(mountElementId), {
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

  });
}
export default createJavascriptEditor;