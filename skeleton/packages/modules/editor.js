import m from 'mithril';
import marked from 'marked';

//model
let state = {
  text: "# Markdown Editor\n\nType on the left panel and see the result on the right panel",
  update: function (value) {
    state.text = value
  }
}
//view
const Editor = {
  view: function () {
    return [
      m("textarea.input", {
        oninput: m.withAttr("value", state.update),
        value: state.text
      }),
      m(".preview", m.trust(marked(state.text))),
    ]
  }
}

export default Editor;
// m.mount(document.getElementById("editor"), Editor)
