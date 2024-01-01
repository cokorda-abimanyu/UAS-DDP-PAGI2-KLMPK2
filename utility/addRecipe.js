const {rline} = require('./userInput')
const {saveData} = require('../database/saveIntoSaveFile')

function addRecipe() {
    let tempRecipe;
    // Add some properties into tempRecipe
    tempRecipe = {namaResep: "", bahan: [], langkah: []}
    const rl = rline()
    rl.question("Nama Resep:", (name) => {
        tempRecipe.namaResep = name
        console.log("Masukan bahan-bahan, (masukan underscore (_) untuk membatalkan penambahan resep")
        addIngredient(rl, tempRecipe)
    });
}

function addIngredient(rl, tempRecipe) {
    rl.question(`Bahan ke [${tempRecipe.bahan.length + 1}]:`, (ingredient) => {
        if (ingredient === "_") {
            //TODO: Jump into AddStep
            addStep(rl, tempRecipe)
            // rl.close()
        } else {
            rl.question(`Satuan bahan ke [${tempRecipe.bahan.length + 1}]:`, (unit) => {
                rl.question(`Jumlah bahan ke [${tempRecipe.bahan.length + 1}]:`, (amount) => {
                    tempRecipe.bahan.push({namaBahan: ingredient, satuan: unit, jumlah: parseInt(amount)});
                    addIngredient(rl, tempRecipe)
                })
            })
        }
    });
}

function addStep(rl, tempRecipe) {
    rl.question(`Langkah ke [${tempRecipe.langkah.length + 1}]:`, (step) => {
        if (step === "_") {
            //TODO: it should be show the final result before we save it
            showTheFinalResult(rl, tempRecipe)
        } else {
            tempRecipe.langkah.push(step)
            addStep(rl, tempRecipe)
        }
    })
}
function showTheFinalResult(rl, tempRecipe) {
    console.clear()
    console.log(`Nama Resep: ${tempRecipe.namaResep}`)
    console.log("Bahan-Bahan:")
    // convert the final result in to table
    console.table(tempRecipe.bahan)
    console.log("Langkah-Langkah:")
    for (let i = 0; i < tempRecipe.langkah.length; i++) {
        console.log(`${i + 1}. ${tempRecipe.langkah[i]}`)
    }
    // Call confirmation function
    confirms(rl, tempRecipe)
    function confirms(rl, tempRecipe) {
        rl.question("Apakah sudah benar? (yes/no) jika memilih no maka anda harus memasukan dari awal:", (confirm) => {
            switch (confirm.toLowerCase()) {
                case "yes":
                    //TODO:Save the Data
                    saveData(tempRecipe)
                    rl.close()
                    break
                case "no":
                    // Set the data into empty object
                    tempRecipe = {}
                    // Destroy rline inteface so it can be used again
                    rl.close()
                    // Jump to beginning again
                    addRecipe()
                    break
                default:
                    console.log("Pilihan yang anda masukkan salah")
                    confirms(rl, tempRecipe)
                    break
            }
        })
    }
}


module.exports = addRecipe