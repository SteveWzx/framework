/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: /Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/.babelrc: Error while parsing config - Unexpected EOF at line 1 column 2 of the JSON5 data. Still to read: \"\"\n    at error (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/json5/lib/json5.js:56:25)\n    at word (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/json5/lib/json5.js:393:13)\n    at value (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/json5/lib/json5.js:493:56)\n    at Object.parse (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/json5/lib/json5.js:508:18)\n    at /Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/loading/files/configuration.js:170:31\n    at /Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/loading/files/configuration.js:217:12\n    at cachedFunction (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/caching.js:40:17)\n    at readConfig (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/loading/files/configuration.js:92:8)\n    at /Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/loading/files/configuration.js:50:22\n    at Array.reduce (<anonymous>)\n    at findConfigs (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/loading/files/configuration.js:47:76)\n    at buildConfigChain (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/build-config-chain.js:32:30)\n    at OptionManager.init (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/option-manager.js:110:53)\n    at manageOptions (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/option-manager.js:33:30)\n    at loadConfig (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/config/index.js:15:37)\n    at transformSync (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/transform-sync.js:13:36)\n    at Object.transform (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/@babel/core/lib/transform.js:20:65)\n    at transpile (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/babel-loader/lib/index.js:55:20)\n    at Object.module.exports (/Users/qbaty/Documents/MyFolder/PRO 需求/慕课/Webpack Code Demo/3-3/node_modules/babel-loader/lib/index.js:179:20)");

/***/ })
/******/ ]);