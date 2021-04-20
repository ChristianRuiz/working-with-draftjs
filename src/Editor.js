import React, { useState, useRef } from 'react';
import { EditorState, ContentState, convertToRaw, RichUtils, ContentBlock, genKey, BlockMapBuilder } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import 'draft-js/dist/Draft.css';
import './Editor.css';

const linkifyPlugin = createLinkifyPlugin();

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

  const handleAddBlock = () => {
    const contentState = editorState.getCurrentContent();
    const newBlock = new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: 'Block added from code!'
    });
    const blocks = contentState.getBlocksAsArray();
    const newContentState = contentState.merge({ blockMap: BlockMapBuilder.createFromArray([...blocks, newBlock]) });
    const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');

    setEditorState(newEditorState);
  };

  const handleH1 = () => {
    const newEditorState = RichUtils.toggleBlockType(editorState, 'header-one');

    setEditorState(newEditorState);
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
          plugins={[linkifyPlugin]}
        />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleLoad}>Load</button>
        <button onClick={handleAddBlock}>Add block</button>
        <button onClick={handleH1}>h1</button>
      </div>
    </>
  );
};

export default MyEditor;
