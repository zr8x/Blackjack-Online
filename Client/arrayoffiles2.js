import { readdir } from "fs/promises";
let output = []

const values = [
    "ja",
    "qu",
    "ki"
]
const files = await readdir("./src/assets/playableCards");
for( const file of files ) {
    let name = file.replace(".png","");
    let value = name.slice(0,2);
    try { value = value.replace("_","") } catch(err) { }
    console.log(value)
    if(value === "ac") value = "11";
    if(values.includes(value)) { value = "10" };
    output.push({
        "name": name,
        "path": "src/assets/playableCards/" + file,
        "value": value
    })
    output = output.sort(function(a, b){return a.value - b.value})
}
console.log(JSON.stringify(output));