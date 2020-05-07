import React from "react";
import { Button, Card, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class Editors extends React.Component {
  state = {
    text: "",
    showRichText: false,
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  clearNote = () => {
    this.setState({
      editorState: "",
    });
  };

  getHtml = () => {
    this.setState({
      showRichText: true,
    });
  };

  onEditorChange = (content) => {
    console.log(content);
    this.setState({
      contentState: content,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <Card>
          <Button type="primary" onClick={this.clearNote}>
            清空内容
          </Button>
          <Button type="primary" onClick={this.getHtml}>
            获取HTML文本
          </Button>
        </Card>
        <Card className="card-wrap" title="Editors">
          <Editor
            onContentStateChange={this.onEditorChange}
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          footer={null}
          visible={this.state.showRichText}
          title={"提示"}
          onCancel={() => {
            this.setState({ showRichText: false });
          }}
        >
          {draftToHtml(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}
