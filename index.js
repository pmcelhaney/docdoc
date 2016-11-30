// #/bin/sh
//
// echo "Checking to see how much directories have changed"
// echo "since their respective README files were last modified"
// echo
// for f in `find src -iname readme.*`;
// do
//  d=`dirname $f`
//  h=`git log -n1 --pretty=%H -- $f`
//  c="git diff $h --dirstat"
//  $c | grep "$d/$"
// done

const argv = require('yargs').argv;
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

function flatten(lists) {
  return lists.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}


console.log(getDirectoriesRecursive('/Users/patrickmcelhaney/code/trust-unity/src'))

console.log(argv);
