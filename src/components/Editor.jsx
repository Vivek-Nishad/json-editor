import React, { useState } from "react";
import Select from "react-select";
import "./Editor.css";

const Editor = () => {
  const [jsonString, setJsonString] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [variableList, setVariableList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleJsonChange = (event) => {
    const value = event.target.value;
    setJsonString(value);
    try {
      const parsedObject = JSON.parse(value);
      setParsedJson(parsedObject);
      setErrorMessage("");
    } catch (error) {
      setParsedJson(null);
      setErrorMessage(error.message);
    }
  };

  const handleVariableSelect = (selectedOption) => {
    const variableName = selectedOption.value;
    const updatedJsonString = jsonString.replace("$", `"${variableName}"`);
    setJsonString(updatedJsonString);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddVariable = () => {
    if (inputValue.trim() === "") return;
    const newVariable = { value: inputValue, label: inputValue };
    setVariableList((prevVariableList) => [...prevVariableList, newVariable]);
    setInputValue("");
  };

  return (
    <div className="editor-container">
      <div className="variable-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter variable name"
          className="add-variable-input"
        />
        <button onClick={handleAddVariable} className="add-variable-button">
          Add Variable
        </button>
      </div>
      <div className="json-editor-container">
        <textarea
          value={jsonString}
          onChange={handleJsonChange}
          placeholder="Enter JSON object here"
          className="JsonEditorArea"
          rows={15}
          cols={100}
        />
        <pre className="json-output">
          {parsedJson && JSON.stringify(parsedJson, null, 2)}
        </pre>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="variable-select-container">
        <Select
          options={variableList}
          onChange={handleVariableSelect}
          placeholder="Select a variable"
        />
      </div>
    </div>
  );
};

export default Editor;
