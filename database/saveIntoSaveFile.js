const fs = require("fs")
const path = require("path");

function saveData(data) {
    let tempData
    try {
        const savedata = fs.existsSync(path.join(process.cwd(), "/", "save.json"));
        if (savedata) {
            const rData = fs.readFileSync(path.join(process.cwd(), "/", "save.json"))
            const oldData = JSON.parse(rData.toString())
            if (Array.isArray(oldData)) {
                if (Array.isArray(data)) {
                    tempData = data
                } else  {
                    tempData = oldData
                    tempData.push(data)
                }
            } else {
                if (Array.isArray(data)) {
                    tempData = data
                } else {
                    tempData = []
                    tempData.push(data)
                }
            }
            fs.writeFileSync(path.join(process.cwd(), "/", "save.json"), JSON.stringify(tempData, null,2), {encoding: "utf-8"})
            // fs.writeFileSync(path.join(process.cwd(), "/", "save.json"), JSON.stringify(tempData, null, 2), {encoding: "utf-8"})
            tempData.length = 0 // Memory Clean up
            return 0
        } else {
            fs.writeFileSync(path.join(process.cwd(),"/","save.json", ), JSON.stringify([data], null, 2), {encoding:"utf-8"})
            return 0
        }
    } catch (error) {
        throw Error(`Failed to save data into save file!\n${error}`)
    }
}
module.exports.saveData = saveData