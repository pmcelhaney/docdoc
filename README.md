# docdoc

Gives your documentation a checkup.

## Usage

```sh
$ npm run docdoc [directory_name]

Checking on the health of README.md files...

 86.63% ./account/activity
      ! ./app
      ! ./home/iframes
 59.79% ./home/widgets
      ! ./utilities/report

You have 2 outdated and 3 missing README.md files!      
```

A percentage next to a directory means the directory has changed that much (according to Git)
since its README.md file was last updated. You might want to give that README some attention!

A "!" next to a directory means the README.md file is missing altogether.

If any problems are found docdoc will exit with code 1, so you can add it to your build system.

### Options

The `--skipMissing` flag causes docdoc to ignore directories that don't have a README.md.

The `--threshhold=n` option sets percent change you want to allow before a README is considered
outdated.

## Installation

```sh
npm install docdoc
```

In your package.json, add docdoc to the "scripts" section.

```json
{
  "scripts": {
    "docdoc": "docdoc --skipMissing --threshhold=5"
  }
}

```
