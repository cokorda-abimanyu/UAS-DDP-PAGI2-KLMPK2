const {createInterface} = require('readline')

// Initialize Interface instance for stdin (standard Input) and stdout (standard Output)
function readLine() {
    return createInterface({
        input: process.stdin,
        output: process.stdout
    })
}
// Export the module as rline
module.exports.rline = readLine