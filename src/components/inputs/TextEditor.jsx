import React from 'react';
import { Editor, EditorState } from 'draft-js';

export function TextEditor() {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    return <Editor editorState={editorState} onChange={setEditorState} />;
}
