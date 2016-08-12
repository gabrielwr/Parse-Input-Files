
var comma = "Abercrombie, Neil, Male, Tan, 2/13/1943 Bishop, Timothy, Male, Yellow, 4/23/1967 Kelly, Sue, Female, Pink, 7/12/1959";

var pipe = "Smith | Steve | D | M | Red | 3-3-1985 Bonk | Radek | S | M | Green | 6-3-1975 Bouillon | Francis | G | M | Blue | 6-3-1975";

var space = "Kournikova Anna F F 6-3-1975 Red Hingis Martina M F 4-2-1979 Green Seles Monica H F 12-2-1973 Black";
		   
function fixPipe (str) {
	//fix date format, replace pipes, puts each element into array.
	var arr = str.replace(/-/g,"/").replace(/\s\|/g,",").replace(/\s/g,", ").replace(/,,/g, ",").split(', ');

	var fixedArr = [[],[],[]];
	for (var k = 0, l = 0 ; k < fixedArr.length; k++, l += 6) {
		//Last
		fixedArr[k][0] = arr[l+0];
		//First
		fixedArr[k][1] = arr[l+1];
		//Gender
		fixedArr[k][2] = arr[l+3] === 'F' ? "Female" : "Male";
		//DOB
		fixedArr[k][3] = arr[l+5];
		//Color
		fixedArr[k][4] = arr[l+4];
	}
	//console.log('pipe:' + '\n',  fixedArr);
	return fixedArr;
}

function fixSpace (str){
	//fix date format, put into array
	var arr = str.replace(/-/gi, '/').split(' ');
	var fixedArr = [[],[],[]];
	for (var m = 0, n = 0 ; m < fixedArr.length; m++, n += 6) {
		//Last
		fixedArr[m][0] = arr[n+0];
		//First
		fixedArr[m][1] = arr[n+1];
		//Gender
		fixedArr[m][2] = arr[n+3] === 'F' ? "Female" : "Male";
		//DOB
		fixedArr[m][3] = arr[n+4];
		//Color
		fixedArr[m][4] = arr[n+5];
	}
	//console.log('space:' + '\n' , fixedArr);
	return fixedArr;
}

function fixComma(str){
	//put each element into array
	var arr = str.replace(/\s/g,", ").replace(/,,/g, ",").split(', ');
	
	//sort in correct output order
	var fixedArr = [[],[],[]];
	for (var i = 0, j = 0; i < fixedArr.length; i++, j+=5) {
		//Last
		fixedArr[i][0] = arr[j];
		//First
		fixedArr[i][1] = arr[j+1];
		//Gender
		fixedArr[i][2] = arr[j+2];
		//DOB
		fixedArr[i][3] = arr[j+4];
		//Color
		fixedArr[i][4] = arr[j+3];
	}
	//console.log('comma:' + '\n' , fixedArr);
	return fixedArr;
}

function People (array) {
	this.lastName = array[0];
	this.firstName = array[1];
	this.gender = array[2];
	this.dob = array[3];
	this.faveColor = array[4];
}

function concatArrays (str1, str2, str3) {
	var peopleArr = [];
	var objArr = [];
	peopleArr = peopleArr.concat(fixComma(str1)).concat(fixPipe(str2)).concat(fixSpace(str3));
	
	for (var a = 0; a < peopleArr.length; a++) {
		var personObj = new People(peopleArr[a]);
		objArr.push(personObj);
	}
	//console.log(objArr);
	return objArr;
}

//sort1: by gender (females before males) then by last name ascending
function sort1 () {
	var listArr = concatArrays(comma, pipe, space);
	listArr = listArr.sort(function (a, b) {
		if(a.gender < b.gender) 
			return -1;
    	if(a.gender > b.gender) 
    		return 1;

    	// If there is a tie, sort by lastName
    	if(a.lastName < b.lastName) 
    		return -1;
    	if(a.lastName > b.lastName) 
    		return 1;
    	return 0;
	});
	
	var returnStr = '';
	for (var i = 0; i < listArr.length; i++) {
		for (var key in listArr[i]) {
			returnStr += listArr[i][key] + ' ';
		}
		returnStr += '\n';
	}
	return 'Output 1:' + '\n' + returnStr; 	
}
console.log(sort1());

//Output 2 – sorted by birth date, ascending then by last name ascending
function sort2 () {
	var listArr = concatArrays(comma, pipe, space);
	listArr = listArr.sort(function (a, b) {
		if(new Date(a.dob) < new Date(b.dob)) 
			return -1;
	    if(new Date(a.dob) > new Date(b.dob)) 
	    	return 1;
	
	    // If there is a tie, sort by lastName
	    if(a.lastName < b.lastName) 
	    	return -1;
	    if(a.lastName > b.lastName) 
	    	return 1;
	    return 0;
	});
	
	var returnStr = '';
	for (var i = 0; i < listArr.length; i++) {
		for (var key in listArr[i]) {
			returnStr += listArr[i][key] + ' ';
		}
		returnStr += '\n';
	}
	return 'Output 2:' + '\n' + returnStr; 
}
console.log(sort2());

//Output 3 – sorted by last name, descending
function sort3 () {
	var listArr = concatArrays(comma, pipe, space);
	listArr = listArr.sort(function(a,b) {
		if(a.lastName < b.lastName)	
			return 1;
		if(a.lastName > b.lastName)
			return -1;
		return 0;
	});
	var returnStr = '';
	for (var i = 0; i < listArr.length; i++) {
		for (var key in listArr[i]) {
			returnStr += listArr[i][key] + ' ';
		}
		returnStr += '\n';
	}
	return 'Output 3:' + '\n' + returnStr; 
}

console.log(sort3());
