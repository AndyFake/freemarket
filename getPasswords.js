const fs = require('fs')

const password = process.env.PUBLIC_KEY
const username = process.env.GITHUB_USERNAME

const passwordfile = `
const PUBLIC_KEY =  \`` + password + `\`
const GITHUB_USERNAME = \`` + username + `\`
` + "\nmodule.exports={PUBLIC_KEY,GITHUB_USERNAME}"
fs.writeFileSync('./src/PUBLIC_KEY.js',passwordfile)