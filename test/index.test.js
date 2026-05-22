const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const shell = require('shelljs');

const docdr = require('../index');

test('flatten combines nested arrays one level', () => {
  assert.deepEqual(docdr.flatten([[1, 2], [3], []]), [1, 2, 3]);
});

test('percentFormat rounds and pads to expected width', () => {
  assert.equal(docdr.percentFormat(0.8663), ' 86.63%');
});

test('getDirectories returns only direct child directories', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'docdr-test-'));
  fs.mkdirSync(path.join(tempRoot, 'a'));
  fs.mkdirSync(path.join(tempRoot, 'b'));
  fs.writeFileSync(path.join(tempRoot, 'file.txt'), 'x');

  const directories = docdr.getDirectories(tempRoot).map(p => path.basename(p)).sort();
  assert.deepEqual(directories, ['a', 'b']);

  fs.rmSync(tempRoot, { recursive: true, force: true });
});

test('getDirectoriesRecursive includes root and nested directories', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'docdr-test-'));
  const nested = path.join(tempRoot, 'one', 'two');
  fs.mkdirSync(nested, { recursive: true });

  const directories = docdr.getDirectoriesRecursive(tempRoot).sort();
  assert.deepEqual(
    directories,
    [
      tempRoot,
      path.join(tempRoot, 'one'),
      nested
    ].sort()
  );

  fs.rmSync(tempRoot, { recursive: true, force: true });
});

test('countInsertionsAndDeletionsSinceHash parses git shortstat output', () => {
  const originalExec = shell.exec;
  shell.exec = () => ({ stdout: '1 file changed, 5 insertions(+), 3 deletions(-)\n' });

  try {
    assert.equal(docdr.countInsertionsAndDeletionsSinceHash('hash', '.'), 8);
  } finally {
    shell.exec = originalExec;
  }
});
