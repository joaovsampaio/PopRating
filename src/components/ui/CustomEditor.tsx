"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Heading,
  Undo,
  Link,
  Image,
  ImageInsert,
  FindAndReplace,
  Font,
  List,
  Markdown,
  MediaEmbed,
  FullPage,
  GeneralHtmlSupport,
  SourceEditing,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

type CustomEditorProps = {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
};

function CustomEditor({ ...props }: CustomEditorProps) {
  return (
    <CKEditor
      {...props}
      data={props.value}
      editor={ClassicEditor}
      config={{
        initialData: props.defaultValue || "<p>Crítica</p>",
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "sourceEditing",
            "FindAndReplace",
            "|",
            "bold",
            "italic",
            "heading",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "link",
            "insertImage",
            "mediaEmbed",
            "|",
            "bulletedList",
            "numberedList",
          ],
        },
        plugins: [
          Essentials,
          Mention,
          GeneralHtmlSupport,
          FullPage,
          Markdown,
          Undo,
          SourceEditing,
          FindAndReplace,
          Bold,
          Italic,
          Heading,
          Paragraph,
          Font,
          Link,
          Image,
          ImageInsert,
          MediaEmbed,
          List,
        ],
      }}
      onChange={(_, editor) => {
        const data = editor.getData();
        props.onChange(data);
      }}
    />
  );
}

export default CustomEditor;
