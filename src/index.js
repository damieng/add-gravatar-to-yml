#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const process = require('process')
const crypto = require('crypto')

var rootPath
if (process.argv.length > 2) {
  rootPath = process.argv[2]
} else {
  console.log('Must specify path to .yml files to modify. Read the README for warnings!!')
  exit
}

const verbose = true
console.log(`Scanning ${rootPath}`)
scanDir(rootPath)

function scanDir (p) {
  const files = fs.readdirSync(p);
  for (var i = 0; i < files.length; i++) {
    try {
      const filePath = path.join(p, files[i])
      const stat = fs.lstatSync(filePath)
      if (stat) {
        if (stat.isDirectory()) scanDir(filePath)
        if (stat.isFile() && filePath.endsWith('.yml')) {
          try {
            addGravatar(filePath)
          } catch (err) {
            console.log(err)
          }
        }
      }
    } catch (err) { }
  }
}

function addGravatar (fileName) {
  const lines = fs.readFileSync(fileName, 'utf8').split('\n').filter(l => !l.startsWith('gravatar:'))
  const emailLineIndex = lines.findIndex(l => l.startsWith('email:'))
  if (emailLineIndex >= 0) {
    const email = lines[emailLineIndex].split(':')[1]
    const cleanEmail = email.trim().toLowerCase()
    const gravatarMd5 = crypto.createHash('md5').update(cleanEmail).digest('hex')
    lines.splice(emailLineIndex + 1, 0, `gravatar: ${gravatarMd5}`)
    console.log(`${fileName}\t${cleanEmail}\t${gravatarMd5}`)
    fs.writeFileSync(fileName, lines.join('\n'), 'utf8')
  }
}
