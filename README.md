## 开发模式
`npm run dev`

## 生产模式
`npm run build`

- 打包过程会把js和css通过分别注入到html中的script标签和style标签中，打包后的style.css和
index.bundle.js为副产物，实际发布只需要发布html即可。

## 开始开发新页面

- 复制template文件夹到src目录下，然后重新命名为你想要的名字（如：newPage）；修改js入口文件和html模版文件目录（build/config.js）;

```javascript
    let originPath = './src/newPage';
```
