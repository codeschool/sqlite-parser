/**
* sqlite-parser demo
*/
var CodeMirror = require('codemirror');
var sqliteParser = require('sqlite-parser');

require('foldgutter');
require('brace-fold');
require('panel');
require('mode-javascript');
require('mode-sql');

const panel           = document.getElementById('ast');
const msgArea         = document.getElementById('ast-header');
const elemSql         = document.getElementById('sql-text');
const elemAst         = document.getElementById('ast-text');

/* taken from _.debounce() method of Underscore.js */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function clearError() {
  msgArea.textContent = "Syntax Tree";
  panel.className = 'right';
}

function setError(cm, message) {
  panel.className = 'alert right';
  msgArea.textContent = message;
}

function setContent(cm) {
  return function (val) {
    clearError();
    cm.setValue(prettify(val));
    editorFormat(cm);
  };
}

function prettify(obj) {
  return JSON.stringify(obj, null, '\t');
}

function updater(source, dest) {
  var writer = setContent(dest);
  return function () {
    sqliteParser(source.getValue(), function (err, ast) {
      if (err) {
        var location = err.location != null ? "[" + err.location.start.line +
        ", " + err.location.start.column + "] " : "";
        setError(dest, location + err.message);
        return;
      }
      writer(ast);
    });
  }
}

function saveLast(sql) {
  // Save the last stuff in the editor for next time
  if (window.localStorage) {
    window.localStorage.setItem('sqlite-parser-demo', JSON.stringify({
      sql: sql
    }));
  }
}

function reloadLast(source) {
  if (window.localStorage) {
    try {
      var lastState = JSON.parse(window.localStorage.getItem('sqlite-parser-demo'));
      if (lastState && lastState['sql'] != null) {
        source.setValue(lastState['sql']);
      }
    } catch (e) {}
  }
}

function editorFormat(e) {
  e.execCommand('selectAll');
  e.execCommand('indentAuto');
  e.setCursor({line: 0, ch: 0});
  return e;
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('container').className = '';
  var cmDefaults = {
    lineNumbers: true,
    theme: 'monokai',
    lineWrapping: true,
    tabSize: 4,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  },
  sql = CodeMirror.fromTextArea(elemSql, Object.assign({
    mode: 'text/x-plsql'
  }, cmDefaults)),
  ast = CodeMirror.fromTextArea(elemAst, Object.assign({
    mode: "application/ld+json",
    foldGutter: true,
    readOnly: true
  }, cmDefaults)),
  update = debounce(updater(sql, ast), 250);
  sql.on('change', update);
  reloadLast(sql);
  update();
  window.onbeforeunload = function () {
    var lastValue = sql.getValue();
    if (lastValue.trim() !== '') {
      saveLast(lastValue);
    }
  };
});
