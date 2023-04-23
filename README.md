## 🐤 Next.JS로 개발자용 개량형 트위터 만들기 api

dev twitter api server

- nestjs
- typescript
- mongoDB

<br />

### 📂 폴더 구조

```
dev-twitter-api-server/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── @types/
│   │   ├── env.d.ts
│   ├── domains/
│   │   ├── auth/
│   │   │   ├──dto/
│   │   │   ├──entities/
│   │   │   ├──jwt.strategy.ts
│   │   │   ├──local.strategy.ts
│   │   │   ├──auth.module.ts
│   │   ├── tweets/
│   │   │   ├──dto/
│   │   │   ├──entities/
│   │   │   ├──tweets.module.ts
│   │   │   ├──tweets.service.ts
│   │   ├── users/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   └── users.service.ts
│   ├── shared/
│   │   ├── decorators/
│   │   ├── dto/
│   │   ├── enums/
│   │   ├── exceptions/
│   │   ├── filters/
│   │   ├── interfaces/
│   │   ├── pipes/
│   │   └── utils/
│   ├── config/
│   │   ├── env/
│   │   ├── typeorm.config.ts
│   │   └── validation.ts
│   └── main.ts
├── test/
├── .env.example
├── .gitignore
├── .prettierrc
├── jest.config.js
├── nodemon.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

<br />

### ⚙ Setting

dev server

```shell
yarn start:dev
```

node version

```shell
v18.12.1
```

.env

```shell
# .env.example 참고
MONGODB_URL=...
PORT=...
MODE=...
JWT_SECRET=...
```

etc...

```shell
chmod +x .husky/*
```
