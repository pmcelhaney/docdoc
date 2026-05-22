# docdr

Gives your documentation a checkup.

## Usage

I created this tool to help me to remember to keep README files up to date. If code has changed significantly since its corresponding README file was last updated, the README is probably overdue for a check up.

```sh
$ npx docdr [directory_name]

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

If any problems are found docdr will exit with code 1, so you can add it to your build system.

### Options

The `--skipMissing` flag causes docdr to ignore directories that don't have a README.md.

The `--threshhold=n` option sets percent change you want to allow before a README is considered
outdated.

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
