// const toastLiveExample = document.getElementById('liveToast')
// const toastLiveExample = document.getElementById('liveToast')
function showMe() {
	// closure used because of use of counter
	let toastCounter = 1;
	const myFunction = function (mode, mytext) {
		// mode : failure or success
		console.log("toaster called");
		// TODO : put const as a param. useless call
		const toastContainer = document.getElementById("toast-container");
		let doc;
		fetch("/elements/toast/toast_" + mode + "_base.html")
			.then((resp) => resp.text())
			.then((txt) => {
				doc = new DOMParser().parseFromString(txt, "text/html");
				// doc.getElementById("liveToast").id =
				doc.querySelector("#liveToast").id =
					"liveToast-" + toastCounter;
				doc.querySelector(".toast-body>span").textContent = mytext;

				toastContainer.prepend(doc.body.childNodes[0]);
				console.log(doc.body.innerHTML);

				toastCounter += 1;
				let children = toastContainer.childNodes;
				// console.log(children);
				let test = new bootstrap.Toast(children[0]);

				children[0].addEventListener("hidden.bs.toast", (e) => {
					e.target.remove();
				});

				test.show();
			});
	};
	return myFunction;
}
// const ToastShowClosured = showMe();

// if (toastTrigger) {
// 	toastTrigger.addEventListener("click", () => {
// 		ToastShowClosured();
// 	});
// }
