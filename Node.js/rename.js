//
// Overwrite ~/.local/share/Steam/steamapps/common/Sid Meier's Civilization V/steamassets/assets/
// vim ~/.local/share/Aspyr/Sid\ Meier\'s\ Civilization\ 5/config.ini
//

"use strict"

let fs = require('fs')
let path = require('path')

let root = './Assets'
let out = []

function readFile(dir) {
  let files = fs.readdirSync(dir)
  files.forEach(el => {
    let p = dir+'/'+el
    out.push(p)
    let s = fs.statSync(p)
    if (s.isDirectory()) {
      readFile(p)
    }
  })
}

readFile(root)

let c = out.map(el => {
  return path.dirname(el) + '/' + path.basename(el).toLowerCase()
})

out.reverse()
c.reverse()

out.forEach((el, i) => {
  fs.renameSync(el, c[i])
})

console.log('done')