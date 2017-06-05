# [tnt-ui](https://github.com/Genie77998/tnt-ui.git) [![npm version](https://img.shields.io/npm/v/tnt-ui.svg?style=flat)](https://www.npmjs.com/package/tnt-ui)

    tnt-ui 组件库

# Install

    npm install tnt-ui --save

# Usage

    import { TntScore } from 'tnt-ui';
    ReactDOM.render(
        <TntScore
        defaultValue={ 3.5 }
        style={{ fontSize: 16,margin:20 }}
        allowHalf
    />, app);
    


# 组件

    1.[tnt-score](https://www.npmjs.com/package/tnt-score)

    2.[tnt-lazy-load](https://www.npmjs.com/package/tnt-lazy-load)

    3.[tnt-select](https://www.npmjs.com/package/tnt-select)

    4.[tnt-swiper](https://www.npmjs.com/package/tnt-swiper)

    5.[tnt-switch](https://www.npmjs.com/package/tnt-switch)

    6.[tnt-toast](https://www.npmjs.com/package/tnt-toast)

# 按需加载
    
    使用 babel-plugin-import
    .babelrc or babel-loader 配置
    {
      "plugins": [
        ["import", { libraryName: "tnt-ui"}]
      ]
    }

    或者

    import TntScore from 'tnt-ui/lib/tnt-score'

# 浏览器引入
    
    tnt-ui的npm包内dist目录有js和css文件在在文件引用即可 
    全局变量名 tnt-ui

    例如：  
        ReactDOM.render(React.createElement(
          'div',
          null,
          React.createElement(tnt-ui.TntScore, {
            defaultValue: 3.5,
            style: { fontSize: 16, margin: 20 },
            allowHalf: true
          })
        ), document.getElementById('app'));


# 说明 
   
    此组件库仅供学习使用，PC端兼容性方面未作考虑！
