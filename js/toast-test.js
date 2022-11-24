document.addEventListener("DOMContentLoaded", () => {
	const toastTrigger = document.getElementById("toaster");
	const toastContainer = document.getElementById("toast-container");
	// const toastLiveExample = document.getElementById('liveToast')
	// const toastLiveExample = document.getElementById('liveToast')
	function showMe() {
		let toastCounter = 1;
		const myFunction = function () {
			fetch("/elements/toast.html")
				.then((resp) => resp.text())
				.then((txt) => {
					let doc = new DOMParser().parseFromString(txt, "text/html");
					doc.getElementById("liveToast").id =
						"liveToast-" + toastCounter;
					toastContainer.prepend(doc.body.childNodes[0]);
					toastCounter += 1;
					let children = toastContainer.childNodes;
					console.log(children);
					const test = new bootstrap.Toast(children[0]);

					children[0].addEventListener("hidden.bs.toast", (e) => {
						e.target.remove();
					});

					test.show();
				});
		};
		return myFunction;
	}
	const ToastShowClosured = showMe();

	if (toastTrigger) {
		toastTrigger.addEventListener("click", () => {
			ToastShowClosured();
		});
	}
	// setTimeout(() => {
	// 	console.log("value");
	// 	const toasts = document.querySelectorAll(".toast");
	// 	toasts.forEach((el) => {
	// 		const test = new bootstrap.Toast(el);

	// 		test.show();
	// 	});
	// }, 100);
});
