const test = require('node:test');
const assert = require('node:assert/strict');
const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

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
  const originalExecFileSync = childProcess.execFileSync;
  childProcess.execFileSync = () => '1 file changed, 5 insertions(+), 3 deletions(-)\n';

  try {
    assert.equal(docdr.countInsertionsAndDeletionsSinceHash('hash', '.'), 8);
  } finally {
    childProcess.execFileSync = originalExecFileSync;
  }
});

test('getGitTrackedDirectories returns directories containing tracked files', () => {
  const originalExecFileSync = childProcess.execFileSync;
  const rootPath = '/some/root';

  childProcess.execFileSync = () => 'file.js\nsrc/helper.js\nsrc/utils/tool.js';

  try {
    const dirs = docdr.getGitTrackedDirectories(rootPath).sort();
    assert.deepEqual(dirs, [
      rootPath,
      path.join(rootPath, 'src'),
      path.join(rootPath, 'src', 'utils')
    ].sort());
  } finally {
    childProcess.execFileSync = originalExecFileSync;
  }
});

test('getGitTrackedDirectories returns empty array when no tracked files', () => {
  const originalExecFileSync = childProcess.execFileSync;

  childProcess.execFileSync = () => '';

  try {
    const dirs = docdr.getGitTrackedDirectories('/some/root');
    assert.deepEqual(dirs, []);
  } finally {
    childProcess.execFileSync = originalExecFileSync;
  }
});
