## monorepo 模式开发步骤

### 1.安装 pnpm，初始化并修改 package.json

```json
{
  // 只允许使用pnpm进行开发
  // preinstall：在install之前（首次）执行
  // postinstall：在install之后（首次）执行
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  },
  // 私有化包
  "private": true,
  // 定义服务启动版本
  "engines": {
    "node": ">=16"
  }
}
```

### 2.创建 pnpm.workspace.yaml

```yaml
# 文章介绍，pnpm version 8.x
# 原文链接 https://pnpm.io/zh/workspaces
# 示例代码
packages:
  - "packages/**"
```

### 3.创建子包，初始化并且修改 package.json

```json
{
  // 发布配置，因为主包设置了private私有化，子包想正常发布需要改为公共化
  "publishConfig": {
    "access": "public"
  }
}
```

### 4.子包命名规范，子包互相依赖

> 命名规范

```json
{
  // 建议@主包名称/子包名称
  "name": "@kady/test"
}
```

> 互相依赖

```bash
# pnpm -F 是添加本地的包为依赖项
# 下面解释为：向@kady/test包里添加@kady/core包为生产依赖
pnpm -F @kady/test add @kady/core
```
