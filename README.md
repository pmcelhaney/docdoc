# docdr

Gives your documentation a checkup.

## Usage

I created this tool to help me remember to keep README files up to date. If code has changed significantly since its corresponding README file was last updated, the README is probably overdue for a checkup.

```sh
$ npx docdr [directory_name]

Checking on the health of README.md files...

 86.63% ./account/activity
      ! ./app
      ! ./home/iframes
 59.79% ./home/widgets
      ! ./utilities/report

found 3 missing and 2 outdated READMEs
```

A percentage next to a directory means the directory has changed that much (according to Git)
since its README.md file was last updated. You might want to give that README some attention!

A "!" next to a directory means the README.md file is missing altogether.

If any problems are found, docdr exits with code 1. Otherwise it exits with code 0, so you can add it to your build system.

### Options

The `--skipMissing` flag causes docdr to ignore directories that don't have a README.md.

The `--threshhold=n` option sets the percent change you want to allow before a README is considered
outdated (for example, `--threshhold=5` allows up to 5% change).

## Installation

Run directly without installing using npx:

```sh
npx docdr
```

Or install globally:

```sh
npm install -g docdr
```

Or install as a dev dependency and add docdr to the "scripts" section of your package.json:

```sh
npm install --save-dev docdr
```

```json
{
  "scripts": {
    "docdr": "docdr --skipMissing --threshhold=5"
  }
}
```
