const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const process_argv = process.argv.slice(2);

// 当前项目目录
const ROOT_PATH = __dirname;
// 默认开发目录
const DEV_PATH = 'src';

// 文件路径和名称
const fileType = process_argv[0];
const filePath = process_argv[1];

// 支持的类型
const TYPE_REGULAR = /^(page|p)$/;

if (!TYPE_REGULAR.test(fileType)) {
  throw Error(`${fileType} is not page, you should run "node generate page --\<page name\>"`);
}

// 获取文件路径和文件名

function getFilePathAndName() {
  let _fileName, _filePath;
  if (!/\//g.test(filePath)) {   // 如果里面没有/ 就表示是在src/ 新建一个文件夹 否者就是src/xxx 文件里新建文件夹
    _fileName = filePath;
    _filePath = DEV_PATH;
  } else {
    const _paths = filePath.split('/');
    _fileName = _paths.pop();
    _filePath = ['src'].concat(_paths).join('/');
  }
  _filePath = process.platform.startsWith('win') ?    // 系统不同，文件夹分割/或者\\
    _filePath.replace(/\//g, '\\') :
    _filePath;
  return [_filePath, _fileName];
}

const [_filePath, _fileName]   = getFilePathAndName();

function createFiles(targetDirPath) {
  // 读取模版文件夹中的所有文件
  const tpls = fs.readdirSync(path.join(ROOT_PATH, "/template"));
  tpls.forEach(function (element) {
    // 文件名称和后缀
    // let type = element.split('.')[1];
    // let name = element.split('.')[0];
    const source = path.join(ROOT_PATH, "/template/", element);
    fs.readFile(source, function (readErr, fileData) {
      fs.writeFile(path.join(ROOT_PATH, targetDirPath, element), fileData, function(err) {
        if (err) throw err;
        console.log(`${element} create complete!`);
      });
    });
  });
}

function generateFiles(filePath, dirName) {
  const createFile = `index.js`;
  // 创建文件夹
  mkdirp(`${filePath}/${dirName}`, function(err) {
    if (err) {
      console.error('Failed to create file');
    } else {
      console.log('generate page', filePath, dirName);
      // 创建文件
      createFiles(`${filePath}/${dirName}`);
    }
  });
}

generateFiles(_filePath, _fileName);


