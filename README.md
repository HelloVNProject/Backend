# HelloVN Backend

你可以在这里查看简体中文版的「说明书」： [README-CN](https://github.com/HelloVNProject/Backend/blob/main/README-CN.md)


## Introduction

Hello there!

This project is the backend part of the visual novel game "HelloVN". It is developed using Node.js and primarily uses the Koa library to implement APIs, and the Sequelize library to communicate with the database (MySQL).

## ⚠ Warning

Due to my limited technical skills during the development of this project, the code may contain:

* Messy file structure
* Ugly code
* Bugs galore
* ......

## How to Run this Project

It is recommended to use [pnpm](https://pnpm.io/) as the package manager.

First, clone this project:

```bash
$ git clone https://github.com/HelloVNProject/Backend ./HelloVN-Backend
$ cd ./HelloVN-Backend
```

Then, create two configuration files `config.ts` and `db.config.ts` inside the `app/config` directory:

```typescript
// Example config.ts
// Modify according to your actual situation
module.exports = {
    privateKey: "", // key required for jwt
    cookie: "", // Teambition API Cookie (currently not in use)
    spaceCookie: "" // Space API Cookie
}
```

```typescript
// Example db.config.ts
// Modify according to your actual situation
module.exports = {
    HOST: "", // MySQL domain
    USER: "",
    PASSWORD: "",
    DB: "hellovn",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
```

After creating and modifying the files, use the following commands to run:

```bash
$ pnpm install
$ pnpm start
```

*Please note that by default it runs on port `14514`. You can modify it in `main.ts` if needed.*