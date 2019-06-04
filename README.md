## 开始开发新页面

- 执行下列命令，将在src目录下生成 <abbr>newpage</abbr> 文件夹，里面包含index.html,style.css,index.js ,修改js入口文件和html模版文件目录（build/config.js）;

```bash
    node generate page newpage
```

```javascript
    const originPath = './src/newPage';
```

## 开发模式
- 执行下列命令将使用默认浏览器，打开127.0.0.1:9009;修改./src/newPage下的任何文件都会自动刷新页面，看到修改。
```bash
    npm run dev
```

## 生产模式
`npm run build`

- 打包过程会把js和css通过分别注入到html中的script标签和style标签中，打包后的style.css和
index.bundle.js为副产物，实际发布只需要发布html即可。
