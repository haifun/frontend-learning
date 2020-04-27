const plugin = require('vuepress-plugin-baidu-google-analytics')
module.exports = {
  plugins: [],
  title: '前端基础学习',
  description: '',
  themeConfig: {
    displayAllHeaders: false,
    nav: [],
    sidebar: [
      {
        title: '你不知道的javascript(上)',
        collapsable: false,
        children: [
          '/document/doc/作用域是什么.md',
          '/document/doc/词法作用域.md',
          '/document/doc/函数作用域和块作用域.md',
          '/document/doc/提升.md',
          '/document/doc/作用域闭包.md'
        ]
      }
    ]
  }
};