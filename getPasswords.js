const fs = require('fs')

const password = process.env.PUBLIC_KEY
const passwordfile = `const PUBLIC_KEY =  \`` + password + `\`` + "\nmodule.exports={PUBLIC_KEY}"
fs.writeFileSync('./src/PUBLIC_KEY.js',passwordfile)