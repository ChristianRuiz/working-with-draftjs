import React from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './Editor.css';

const MyEditor = () => {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  const editor = React.useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  const handleChange = newEditorState => {
    setEditorState(newEditorState);
  };

  return (
    <div className="editor" onClick={focusEditor}>
      <Editor ref={editor} editorState={editorState} onChange={handleChange} placeholder="Write something!" />
    </div>
  );
};

export default MyEditor;
