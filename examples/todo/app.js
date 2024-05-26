function UI(items) {
	var h = picodom.h;
	function submit(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var el = document.getElementById("task-name-input");
		rpc.addTask(el.value);
		el.value = "";
	}
	function clearTasks() {
		rpc.clearDoneTasks();
	}
	function markTask(i) {
		return () => {
			rpc.markTask(i, !items[i].done);
		};
	}

	var taskItems = [];
	for (var i = 0; i < items.length; i++) {
		var checked = items[i].done ? "checked" : "unchecked";
		taskItems.push(
			h(
				"div",
				{ className: "task-item " + checked, onclick: markTask(i) },
				items[i].name,
			),
		);
	}

	return h(
		"div",
		{ className: "container" },
		h(
			"form",
			{ className: "text-input-wrapper", onsubmit: submit },
			h("input", {
				id: "task-name-input",
				className: "text-input",
				type: "text",
				autofocus: true,
			}),
		),
		h("div", { className: "task-list" }, taskItems),
		h(
			"div",
			{ className: "footer" },
			h(
				"div",
				{ className: "btn-clear-tasks", onclick: clearTasks },
				"Delete completed",
			),
		),
	);
}

var element;
var oldNode;
var rpc = {
	invoke: (arg) => {
		window.external.invoke(JSON.stringify(arg));
	},
	init: () => {
		rpc.invoke({ cmd: "init" });
	},
	log: () => {
		var s = "";
		for (var i = 0; i < arguments.length; i++) {
			if (i != 0) {
				s = s + " ";
			}
			s = s + JSON.stringify(arguments[i]);
		}
		rpc.invoke({ cmd: "log", text: s });
	},
	addTask: (name) => {
		rpc.invoke({ cmd: "addTask", name: name });
	},
	clearDoneTasks: () => {
		rpc.invoke({ cmd: "clearDoneTasks" });
	},
	markTask: (index, done) => {
		rpc.invoke({ cmd: "markTask", index: index, done: done });
	},
	render: (items) =>
		(element = picodom.patch(oldNode, (oldNode = UI(items)), element)),
};

window.onload = () => {
	rpc.init();
};
