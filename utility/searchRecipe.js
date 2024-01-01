const {rline} = require('./userInput')
const {loadSave} = require('../database/loadSaveFile')


function searchRecipe() {
    let list = []
    const rl = rline()
    rl.question("Silahkan masukan nama resep:", (recipeName) => {
        const saveData = loadSave()
        for (let i = 0; i < saveData.length; i++) {
            if (saveData[i].namaResep.toLowerCase().includes(recipeName.toLowerCase())) {
                list.push(saveData[i])
            }
        }
        for (let i = 0; i < list.length; i++) {
            console.log(`${i + 1} ${list[i].namaResep}`)
        }
        rl.question("Silahkan Masukan Nomer dari resep yang ditemukan:", (choosee) => {
            if (list[choosee - 1]?.namaResep == null) {
                console.log("Masukan Invalid!")
                rl.close()
            } else {
                console.clear()
                console.log(`Resep ${list[choosee - 1].namaResep}`)
                console.log("Bahan:")
                for (let a = 0; a < list[choosee - 1].bahan.length; a++) {
                    console.log(`${a+1}.${list[choosee - 1].bahan[a].namaBahan} | Satuan: ${list[choosee - 1].bahan[a].satuan} | Jumlah: ${list[choosee - 1].bahan[a].jumlah}`)
                }
                console.log("Langkah")
                for (let b = 0; b < list[choosee - 1].langkah.length; b++) {
                    console.log(`${b + 1}.${list[choosee - 1].langkah[b]}`)
                }
                rl.close()
            }
        })
    })
}

module.exports.searchR = searchRecipe