import React, { useState, useRef } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Editor.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
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
  };

  const handleLoad = () => {
    setEditorState(savedEditorState);
  };

  return (
    <>
      <div className="editor" onClick={focusEditor}>
        <Editor ref={editor} editorState={editorState} onChange={handleChange} placeholder="Write something!" />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleLoad}>Load</button>
      </div>
    </>
  );
};

export default MyEditor;
