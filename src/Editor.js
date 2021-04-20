import React, { useState, useRef } from 'react';
import { Editor, EditorState, ContentState, convertToRaw, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Editor.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText('Hello world!'))
  );
  const [savedEditorState, setSavedEditorState] = useState();

  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  const handleChange = newEditorState => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    setSavedEditorState(editorState);
    console.log('content', convertToRaw(editorState.getCurrentContent()));
  };

  const handleLoad = () => {
    setEditorState(savedEditorState);
  };

  const handleKeyCommand = (command, newEditorState) => {
    const modifiedState = RichUtils.handleKeyCommand(newEditorState, command);

    if (modifiedState) {
      setEditorState(modifiedState);
      return 'handled';
    }

    return 'not-handled';
  };

  return (
    <>
      <div className="editor" onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          placeholder="Write something!"
        />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleLoad}>Load</button>
      </div>
    </>
  );
};

export default MyEditor;
