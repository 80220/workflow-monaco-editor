import monaco from "../init";

function createDependencyProposals(range, autosuggestions) {
  // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
  // here you could do a server side lookup
  return (autosuggestions || []).map((suggestion) => ({
    label: `"${suggestion.label}"`,
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: suggestion.documentation,
    insertText: `"${suggestion.insertText}"`,
    range: range,
  }));
}

function createNodeConfigEditor(
  mountElementId,
  value,
  language,
  jsonSchema,
  autosuggestions,
) {
  if (jsonSchema) {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "http://my-schema.json",
          fileMatch: ["*"],
          schema: jsonSchema,
        },
      ],
    });
  }

  monaco.languages.registerCompletionItemProvider("json", {
    triggerCharacters: ["@"],
    provideCompletionItems: function (model, position) {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return {
        suggestions: createDependencyProposals(range, autosuggestions),
      };
    },
  });

  const editor = monaco.editor.create(document.getElementById(mountElementId), {
    value,
    language,
    minimap: { enabled: false },
    fontSize: 13,
    lineNumbersMinChars: 3,
    automaticLayout: true,
    theme: "vs-dark",
    scrollbar: {
      vertical: "auto",
      horizontal: "auto",
    },
    scrollBeyondLastLine: false,
  });

  editor.addAction({
    id: "add-action",
    label: "Add",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10],
    contextMenuGroupId: "1_modification",
    contextMenuOrder: 1.1,
    run: function () {
      alert("Add action triggered!");
      return null;
    },
  });

  editor.addAction({
    id: "delete-action",
    label: "Delete",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10],
    contextMenuGroupId: "1_modification",
    contextMenuOrder: 1.2,
    run: function () {
      alert("Delete action triggered!");
      return null;
    },
  });

  editor.addAction({
    id: "remove-action",
    label: "Remove",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10],
    contextMenuGroupId: "1_modification",
    contextMenuOrder: 1.3,
    run: function () {
      alert("Remove action triggered!");
      return null;
    },
  });

  return editor;
}

export default createNodeConfigEditor;
