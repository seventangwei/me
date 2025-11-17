---
title: '基于Docusaurus搭建个人网站站点'
date: '2025-05-05'
categories: 'Docusaurus'
authors: ['seven']
showInHome: true
description: '搭建个人网站站点，包含博客、项目展示、文档站点等，基于Docusaurus实现，记录搭建过程'
image: '/img/blog/me-site.jpg'

---

### 1. 安装Docusaurus

[Docusaurus](https://docusaurus.io/zh-CN/docs): 现代化的 Jamstack 文档网站;

```bash
# 我们直接用docusaurus提供的脚手架直接搭建
npx create-docusaurus@latest docusaurus-tailwind classic --typescript

npm run start
```

### 2.集成tailwindcss

docusaurus底层样式是[infima](https://infima.dev)实现的，所拥有的postcss类比较少，所以我们需要集成tailwindcss来扩展样式;

> 在继承tailwindcss时，我分别用了tailwindcss3.x和tailwindcss4.x去实现，里面的差别还是很大的。

<!-- truncate -->

### 2.1 tailwindcss3.x

1. 安装版本3.x

```bash
npm install -D tailwindcss@3
```

2. 创建配置文件(tailwindcss3.x版本会自动读取tailwind.config.js文件.)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false, // 是与docusaurus里的infima不冲突的关键
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. 在全局css中引入tailwindcss

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. 需要再docusaurus.config.js中配置tailwindcss的插件

```js
...
plugins: [
    async function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
  ],
...
```

3.x的版本是稳定版本，在集成的时候倒是没有遇到坑，就是与infama冲突的时候配置了preflight配置

### 2.2 集成tailwindcss4.x-- Css-first

4.0版本看官网改动还是很大的，增加了很多的指令，其中有一个它不会自动取读取tailwindcss.config.js文件了，需要在css中手动@config进来(这里我在集成的时候调试了好久，最后发现是这个问题)

1. 安装版本4.x (CLI方式)
   这种方式tailwindcss帮我们自动运行了postcss，需要额外的postcss配置可以设置postcss.config.js，这种方式的话需要将tailwindcss中的CSS先编译后在引入

```bash
npm install tailwindcss @tailwindcss/cli
```

2. 创建全局文件并编译

```css
@import "tailwindcss"; // 先全局引入整体(这里也有一个坑)

```

```bash
# 编译
# -i 入口文件 -o 输出文件 --watch 监听文件变化，之后在需要用到的地方引入output.css文件
npx @tailwindcss/cli -i ./src/css/tailwind.css -o ./src/css/output.css --watch
```

3. 安装版本4.x (postcss方式)
   这种方式需要手动配置postcss。

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

4. 创建postcss.config.js文件(必须)

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

5. 在全局css中引入tailwindcss

```css
/* 会将所有的样式都引入进来，preflight也包括在其中，导致与infima冲突 */
/* @import "tailwindcss"; */
/* 可以按需引入 */
@layer theme, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
```
