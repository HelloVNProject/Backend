# HelloVN 后端 

## 简介

Hello there!

此项目是视觉小说游戏《问候无疆》的后端部分，使用 Node.js 开发，主要使用 Koa 库实现 API ，Sequelize 库实现与数据库 ( MySQL ) 的通信。

## ⚠ 警告

由于开发本项目时本人技术并不成熟，代码中可能会出现：

* 文件结构混乱
* 代码丑陋
* Bug 层出
* ......

## 如何运行此项目

推荐使用 [pnpm](https://pnpm.io/) 作为包管理器

首先，克隆此项目：

```bash
$ git clone https://github.com/HelloVNProject/Backend ./HelloVN-Backend
$ cd ./HelloVN-Backend
```

然后在 `app/config` 目录下创建 `config.ts` 以及 `db.config.ts` 两个配置文件：

```typescript
// config.ts 示例
// 请根据实际情况修改
module.exports = {
    privateKey: "", // jwt所需的key
    cookie: ""， // Teambition API Cookie（暂时弃用）
    spaceCookie: "" // Space API Cookie
}
```

```typescript
// db.config.ts 示例
// 请根据实际情况修改
module.exports = {
    HOST: "", //MySQL域名
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

创建并修改完成后，使用以下命令运行：

```bash
$ pnpm install
$ pnpm start
```

*请注意，默认运行端口为 `14514`，如需修改，可在 `main.ts` 中修改*
