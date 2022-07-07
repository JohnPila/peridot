import PropTypes from 'prop-types';
import { styled } from "@mui/material/styles";
import { useEffect, useState } from 'react';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useIsMounted from '../hooks/useIsMounted';

const DescriptionEditor = styled('div')(({ theme }) => ({
  '.description-editor': {
    padding:' 6px 5px 0',
    border: '1px solid #F1F1F1',
    background: 'white',
  }
}));

function TextFieldEditor(props) {
  const {
    value,
    onChange,
    disabled = false,
  } = props;
  
  const isMounted = useIsMounted();
  const [editorState, setEditorState] = useState(() => {
    const contentBlock = htmlToDraft(value);
    if (contentBlock) {
      return EditorState.createWithContent(ContentState
        .createFromBlockArray(contentBlock.contentBlocks));
    } else {
      return EditorState.createEmpty();
    }
  });

  useEffect(() => {
    const contentBlock = htmlToDraft(value);
    if (contentBlock) {
      setEditorState(EditorState.createWithContent(ContentState
        .createFromBlockArray(contentBlock.contentBlocks)));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [value]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isMounted) {
      onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
  }, [editorState]);

  return (
    <DescriptionEditor>
      <Editor
        editorState={editorState}
        wrapperClassName="description-wrapper"
        editorClassName="description-editor"
        onEditorStateChange={setEditorState}
        readOnly={disabled}
      />
    </DescriptionEditor>
  );
}

TextFieldEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default TextFieldEditor;