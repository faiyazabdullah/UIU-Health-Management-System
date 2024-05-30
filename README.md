# Installation

## Prerequisites

Feel free to skip this step if you already have git and node+npm installed on your device.

Install the latest version of [git](https://git-scm.com/) 

Install the latest version of [nodeJS](https://nodejs.org/en) 

## Cloning a local version of UIU Health

First, clone the repository on your local machine.

```bash
git clone https://github.com/taimur-git/uiu-health.git
```

This will create a folder called uiu-health, `cd uiu-health` to continue.

## Installing dependencies

Next we have to install all the node modules. This will take a while.

```bash
npm install
```

## Initialise Database

```bash
npm run db:start
```

If at any point you decide to change the database under `prisma/schema.prisma`, run `npm run update`.

## Development

Runs in port:5172

```bash
npm run dev
```

You can preview the database at port:5555 with `npm run db`.