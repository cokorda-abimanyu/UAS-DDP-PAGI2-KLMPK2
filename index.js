const {rline} = require('./utility/userInput')
const addRecipe = require('./utility/addRecipe')
const {searchR} = require('./utility/searchRecipe')
const {deleteRecipe} = require('./utility/deleteRecipe')

function programStart() {
    // call rline function to start initialize readline interface
    const rl = rline() // <-- Return a readline interface

    console.log("Program Resep Makanan")
    console.log("=======================")
    console.log("1. Tambah Resep")
    console.log("2. Cari Resep")
    console.log("3. Hapus Resep")
    console.log("4. Keluar")
    console.log("=======================")

    rl.question("Pilih menu [1-4]:", choose => {
        switch (choose) {
            case "1":
                rl.close()
                console.clear()
                addRecipe()
                break
            case "2":
                rl.close()
                console.clear()
                searchR()
                break
            case "3":
                rl.close()
                console.clear()
                deleteRecipe()
                break
            case "4":
                rl.close()
                break
            default:
                rl.close()
                console.log("Pilihan yang anda masukkan salah")
                break
        }
    })
}
programStart()