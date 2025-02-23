const fs = require("fs");
let output = []

const filesFunc = fs.readdir("./src/assets/playableCards", (err, files) => {
    for( const file of files ) {
        let name = file.replace(".png","");
        output.push({
            "name": name,
            "path": "src/assets/playableCards/" + file
        })
    }
    console.log(JSON.stringify(output));
});