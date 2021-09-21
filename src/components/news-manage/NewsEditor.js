import React from 'react'
import {Editor} from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default function NewsEditor(){
  return(
    <div>
       <Editor
        // editorState={true}
        // toolbarClassName="toolbarClassName"
        // wrapperClassName="wrapperClassName"
        // editorClassName="editorClassName"
        // onEditorStateChange={this.onEditorStateChange}
       />
    </div>
  )
} 