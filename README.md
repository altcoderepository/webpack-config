# Настройка Webpack для React приложения

---

Для использования достаточно в файле **webpack.config.js** использовать конфигурацию из репозитория

```node
const config = require('@alt-code/webpack-config');
module.exports = config;
```

аналогично для конфигурации type script

```json
{
    "extends": "@alt-code/webpack-config/tsconfig.json"
}
```
