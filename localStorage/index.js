//set item -> store data in LS
localStorage.setItem("theme", "dark");

//get item
const ans = localStorage.getItem("theme");
console.log(ans);

const data = [
    {"name":"Kailash"}, {"name":"Chirag"}, {"name":"Priyadarshini"}
]
localStorage.setItem("names", JSON.stringify(data));

const arr = JSON.parse(localStorage.getItem("names"));
console.log(arr);
console.log(typeof arr);
console.log(arr.length);
for(let obj of arr){
    console.log(obj["name"]);
}

// localStorage.removeItem("theme");
console.log(localStorage.length);
// localStorage.clear();
