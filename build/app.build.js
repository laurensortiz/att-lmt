({
  appDir: "../",
  baseUrl: "js",
  dir: "../www",
  paths: {
    'jquery': 'require-jquery',
    'underscore': 'libs/underscore-min',
    'backbone': 'libs/backbone-min',
    'dust': 'libs/dust-core-0.3.0.min',
    'fastClick': 'libs/fastclick'
  },
  // fileExclusionRegExp: /^\.||build/,
  mainConfigFile: "../js/main.js",
  modules: [{
    name: "main",
    exclude: ["jquery"]
  }],
  removeCombined: true,
  namespace: "attlmt"
})