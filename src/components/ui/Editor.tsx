import { MutableRefObject } from "react";
import { Editor, IAllProps } from "@tinymce/tinymce-react";

type Props = IAllProps & {
  editorRef: MutableRefObject<null>;
};

function WrappedEditor({ editorRef, ...props }: Props) {
  return <Editor {...props} ref={editorRef} />;
}

export default WrappedEditor;
