# Project: Library containing customized components based on monaco editor

## Description

Library contains 3 components (all based on monaco editor, mine customization):

1. simple javascript code editor, that will be displayed to the user and allow user to implement data transformation
function in javascript. The component upon render shall display empty js function with 3 arguments thst will be provided
from external. The function must return valid javascript object.

2. json config editor, that will upon render, display to the user json config of a task. the json config shall be renderd from json
schema coming from external. After render initial json config user can modify it's content(e.g. add more items to array) and values of the fields.
Component shall accept list of autosuggestion for user auto complete, all autosuggestion shall be triggered with user typing character '@'.
User's config shall be validated against input json schema as user changes it. JSON schema validation errors shall be shown to the user in bottom panel.

3. logger component, that displays to the user current text logs (provided externally to the component). Based on this example:
[example-extending-language-services-custom-languages](https://microsoft.github.io/monaco-editor/playground.html?source=v0.55.1#example-extending-language-services-custom-languages)

## Design guidlines

- this library shall export all 3 components as they will be used in other react project
- use plain javascript
- follow eslint rules
- components shall have ability to switch between dark and light css mode
