async function sendData(url, inputObj) {
	let strObj = JSON.stringify(inputObj);

	const response = await fetch(url, {
		method: "POST",
		body: strObj,
	});

	//note: change response.text() to const data = await response.json() If we return JSON we must also use .json() instead of .text() in JavaScript:
	let resp = await response.text();
	// console.log(resp);
	return resp;
}
