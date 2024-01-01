const fs = require("fs")
const path = require("path");

function loadSaveData() {
    const edata = fs.readFileSync(path.join(process.cwd(), "/", "save.json"), {encoding: "utf-8"});
    return JSON.parse(edata.toString())
}

module.exports.loadSave = loadSaveData