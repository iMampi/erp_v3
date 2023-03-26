//TODO : A TRIER SELON LES CAS

const sd = 1000 * 60 * 60 * 24;

function roundToTwo(num) {
	//pour arrondir correctement avec 2 chiffre apres la virgul4
	return +Math.round(num + "e+2") + "e-2";
}

function myRounder(num) {
	//ca arrondi l3s valeur par palier de 0.5 and get rid of some precision problems ;
	return (Math.round((num + Number.EPSILON) * 2) / 2).toFixed(1);
}

function dateParser(strdate) {
	//console.log("DP: "+strdate);
	if (strdate == "" || strdate == "xxx" || strdate == undefined) {
		return null;
	}
	let dta = strdate.split("-");
	return new Date(parseInt(dta[0]), parseInt(dta[1]) - 1, parseInt(dta[2]));
}


//test if 2 array are exactly the same. same length, same elements at the same position
function equalArray(array1, array2) {
	let isSame =
		array1.length == array2.length &&
		array1.every(function (element, index) {
			return element === array2[index];
		});
	return isSame;
}

function formatNumber(value) {
	if (value){
		try {
			let sVal = parseFloat(value).toFixed(2);
			let temp = sVal.split(".");
			let len = temp[0].length;
			let reminder = len % 3;
			let ab = len; //3;

			let reste = temp[0].substring(reminder);
			let debut = temp[0].substring(0, reminder);
			let temmp = [];
			temmp.push(debut);
			for (let i = 0; i < reste.length; i += 3) {
				temmp.push(reste.substring(0 + i, 3 + i)||0);
			}
			// console.log(temmp);
			return temmp.join(" ") + "," + temp[1];
		} catch (err) {
			console.log(err);
		}
}return "0,00"
}

function formatedNumberToFloat(val) {
	// NOTE : there is option to use replaceAll, but too recent
	if ((val) && (typeof val =="string")) {
		let x = val.split(" ").join("");
		let y = x.replace(",", ".");
		return parseFloat(y);
	} else if((val) && (typeof val =="number")){
		return parseFloat(val);
	} else {
		// throw new Error("args is not a string");
		return 0.00
	}
}

//add "0" to the left as padding according to the length defined
function zeroLeftPadding(number, targetLength, forceSign) {
	var absNumber = "" + Math.abs(number),
		zerosToFill = targetLength - absNumber.length,
		sign = number >= 0;
	return (
		(sign ? (forceSign ? "+" : "") : "-") +
		Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
		absNumber
	);
}

function getRadioValue(name) {
	return document.querySelector(`input[name=${name}]:checked`).value;
}

function testRangeNumber(testedVal, value0, value1) {
	if (testedVal == "" || testedVal == null || testedVal == undefined) {
		throw "The value to test cannot be empty";
	}
	//TODO : refactor . put the test in a variable
	if (
		(value0 == "" || value0 == null || value0 == undefined) &&
		(value1 == "" || value1 == null || value1 == undefined)
	) {
		return true;
	} else if (
		(value0 == "" || value0 == null || value0 == undefined) &&
		value1
	) {
		let fValue1 = parseFloat(value1);
		let fTestedVal = parseFloat(testedVal);
		let step1 = fTestedVal <= fValue1;
		return step1;
	} else {
		let fValue0 = parseFloat(value0);
		let fTestedVal = parseFloat(testedVal);
		let step0 = fTestedVal >= fValue0;
		if (value1 == "" || value1 == null || value1 == undefined) {
			return step0;
		} else {
			let fValue1 = parseFloat(value1);
			let step1 = fTestedVal <= fValue1;
			return [step0, step1].every((step) => step == true);
		}
	}
}

//specifically for input tag
function inputIsEmpty(inputEl) {
	//ok
	try {
		return inputEl.value.toString().trim().length == 0;
	} catch {
		return true;
	}
}

function jsonContains(jsonfile, value, mode = "value") {
	if (typeof value == "object") {
		if (value.length == 2) {
			value[1] = value[1].toString();
			mode = "entry";
		} else {
			throw new Error("Value is not an array of 2 elements");
		}
	} else {
		value = value.toString();
	}
	//verify if mode is valid
	let modes = ["key", "value", "entry"];
	mode = mode.toLowerCase();
	if (!modes.includes(mode)) {
		throw new Error("mode must be key or value or entry");
	}

	//verify if jsonfile is already parsed
	let data;
	if (typeof jsonfile == "string") {
		data = JSON.parse(jsonfile);
	} else {
		data = jsonfile;
	}

	//multilevel obj or not
	let myentries = Object.entries(data);
	console.log(myentries);
	if (myentries.length === 0) {
		return false;
	}
	let result = false;
	let multilevel = false;
	if (typeof myentries[0][1] == "object") {
		multilevel = true;
	}

	if (multilevel) {
		switch (mode) {
			case "value":
				for (let i = 0; i < myentries.length; i++) {
					try {
						let temp_arr = Object.values(myentries[i][1]);
						for (let j = 0; j < temp_arr.length; j++) {
							try {
								if (temp_arr[j] == value) {
									result = true;
									break;
								}
							} catch (err) {
								console.log("error 1 : " + err);
							}
						}
					} catch (err) {
						console.log("error 2 : " + err);
					}
				}
				break;
			case "key":
				//FIXME : it is bad here. but since not usinfg it we dont care

				for (let i = 0; i < myentries.length; i++) {
					try {
						let temp_arr = Object.keys(myentries[i][1]);
						for (let j = 0; j < temp_arr.length; j++) {
							try {
								if (temp_arr[j] == value) {
									result = true;
									break;
								}
							} catch (err) {
								console.log("error 3 : " + err);
							}
						}
					} catch (err) {
						console.log("error 4 : " + err);
					}
				}
				break;

			case "entry":
				for (let i = 0; i < myentries.length; i++) {
					try {
						if (myentries[i][1][value[0]] == value[1]) {
							result = true;
						}
					} catch (err) {
						console.log("error 5 : " + err);
					}
				}
				break;
		}
		return result;
	} else {
		//not multilevel
		// console.log("out of order");
		switch (mode) {
			case "value":
				for (let i = 0; i < myentries.length; i++) {
					try {
						if (myentries[i][1] == value) {
							result = true;
							break;
						}
					} catch (err) {
						console.log("error 2.0 : " + err);
					}
				}
				break;
			case "key":
				for (let i = 0; i < myentries.length; i++) {
					try {
						if (myentries[i][0] == value) {
							result = true;
							break;
						}
					} catch (err) {
						console.log("error 4.0 : " + err);
					}
				}
				break;
			//CONTINUE HERE
			case "entry":
				for (let i = 0; i < myentries.length; i++) {
					try {
						result = myentries[value[0]] == value[1];
					} catch (err) {
						console.log("error 5.5 : " + excep);
					}
				}
				break;
		}
		return result;
	}
}

function jsonReturns(jsonfile, refkey, refvalue, keyreturn) {
	//json already parsed?
	let datas;
	if (typeof jsonfile != "object") {
		datas = JSON.parse(jsonfile);
	} else {
		datas = jsonfile;
	}

	//multilevel obj or not
	let myentries = Object.entries(datas);
	let result = "error";
	if (typeof myentries[0][1] == "object") {
		//this part only works for multi level obj wehre the first level is a classic array, not associative

		for (let i = 0; i < myentries.length; i++) {
			try {
				if (myentries[i][1][refkey] == refvalue) {
					try {
						result = myentries[i][1][keyreturn];
						break;
						// console.log("error" + err);
					} catch (err) {
						console.log("error 1.1" + err);
					}
				} else {
					// throw "not found here. lets go on next.";
				}
			} catch (err) {
				console.log("error 1" + err);
			}

			// let myvalues = Object.values(myentries[i][1]);
			// let found = myvalues.includes(refvalue);
			// console.log("testing :" + found);
		}
	} else {
		////we used this before adding a refkey
		// for (let i = 0; i < myentries.length; i++) {
		//   if (myentries[i][1] == refvalue) {
		//     result = datas[keyreturn];
		//   }
		// }
		try {
			if (datas[refkey] == refvalue) {
				try {
					result = datas[keyreturn];
				} catch (err) {
					console.log("error" + err);
				}
			} else {
				throw "the given refkey does not exist.";
			}
		} catch (err) {
			console.log("error" + err);
		}
	}
	return result;
}

function deleteArrayValue(arr, value) {
	//delete only the first occurence
	var index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
}
