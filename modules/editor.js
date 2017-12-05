
var m = require('mithril');
var marked = require('marked');
//model
var state = {
	text: "# Markdown Editor\n\nType on the left panel and see the result on the right panel",
	update: function(value) {
		state.text = value
	}
}
//view
var Editor = {
	view: function() {
		return [
			m("textarea.input", {
				oninput: m.withAttr("value", state.update),
				value: state.text
			}),
			m(".preview", m.trust(marked(state.text))),
		]
	}
}

m.mount(document.getElementById("editor"), Editor)
