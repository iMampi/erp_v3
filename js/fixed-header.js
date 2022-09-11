document.addEventListener("DOMContentLoaded", () => {
	const navBarInnerContainer = document.getElementById("main-navbar");
	let subHeader = document.getElementById("sub-header");
	// const offsetHeader = setTimeout(() => {
	// 	navBarInnerContainer.getBoundingClientRect().height;
	// }, 500);
	var offsetHeader = navBarInnerContainer.getBoundingClientRect().height;
	//run a second time to avoid misscalculation (doing it too fast)
	offsetHeader = navBarInnerContainer.getBoundingClientRect().height;
	offsetHeader = navBarInnerContainer.getBoundingClientRect().height;

	subHeader.style.top = offsetHeader + "px";

	const tableContainer = document.getElementById("table-container");

	const subHeaderRect = subHeader.getBoundingClientRect();

	let val = subHeaderRect.top;
	// console.log("val is ; " + val);
	// tableContainer.style.top = val + "px";

	const zeThead = document.getElementById("ze-thead");
	const zeTable = document.getElementById("table-001");
	const zeTbody = document.getElementById("ze-tbody");

	let aval = subHeaderRect.top + subHeaderRect.height;
	tableContainer.style.top = subHeaderRect.top + "px";
	zeThead.style.top = aval + "px";
	let baval = aval + zeThead.getBoundingClientRect().height;
	// zeTbody.style.marginTop = baval + "px";

	window.onresize = () => {
		console.log("resize");
		let oldH = parseInt(subHeader.style.top.slice(0, -2));
		let newH = navBarInnerContainer.getBoundingClientRect().height;
		if (oldH != newH) {
			subHeader.style.top = newH + "px";
			const newSubHeaderRect = subHeader.getBoundingClientRect();
			let oval = newSubHeaderRect.top + newSubHeaderRect.height;
			tableContainer.style.top = newSubHeaderRect.height + "px";

			// zeTable.style.marginTop = 0 + "px";
			tableContainer.style.top = newSubHeaderRect.top + "px";

			zeThead.style.top = oval + "px";

			// tableContainer.style.top = oval + "px";
			let caval = oval + zeThead.getBoundingClientRect().height;
			// zeTbody.style.marginTop = caval + "px";
		}
	};
});
