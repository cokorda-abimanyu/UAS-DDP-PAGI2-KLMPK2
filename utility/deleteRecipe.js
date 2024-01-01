const {rline} = require('./userInput')
const {loadSave} = require('../database/loadSaveFile')
const {saveData} = require('../database/saveIntoSaveFile')

function deleteRecipe() {
    const rl = rline()
    const data = loadSave()
    for (let i = 0; i < data.length; i++) {
        console.log(`${i + 1}.${data[i].namaResep}`)
    }
    rl.question("Silahkan pilih Resep yang ingin di hapus:", (choose) => {
        if (data[choose - 1]?.namaResep === null) {
            console.log("Invalid Input")
            rl.close()
        } else {
            const c = data.filter(z => z.namaResep !== data[choose - 1].namaResep)
            console.log(`Berhasil menghapus resep [${data[choose - 1].namaResep}]`)
            saveData(c)
            rl.close()
        }
    })
}
module.exports.deleteRecipe = deleteRecipe