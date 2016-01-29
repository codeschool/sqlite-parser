/**
 * sqlite-parser demo
 */
(function (root) {
  var Promise         = require('promise'),
      sqliteParser    = Promise.denodeify(require('sqlite-parser')),
      util            = require('sqlite-parser-util'),
      CodeMirror      = require('codemirror'),
      panel           = document.getElementById('ast'),
      msgArea         = document.getElementById('ast-header'),
      elemSql         = document.getElementById('sql-text'),
      elemAst         = document.getElementById('ast-text');

  require('foldcode');
  require('foldgutter');
  require('brace-fold');
  require('panel');
  require('mode-javascript');
  require('mode-sql');

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
      sqliteParser(source.getValue())
      .then(writer, function (err) {
        var location = err.location != null ? "[" + err.location.start.line +
        ", " + err.location.start.column + "] " : "";
        setError(dest, location + err.message);
      });
    }
  }

  function saveLast(sql) {
    // Save the last stuff in the editor for next time
    if (root.window.localStorage) {
      root.window.localStorage.setItem('sqlite-parser-demo', JSON.stringify({
        sql: sql
      }));
    }
  }

  function reloadLast(source) {
    if (root.window.localStorage) {
      try {
        var lastState = JSON.parse(root.window.localStorage.getItem('sqlite-parser-demo'));
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

  var loadDemo = function () {
    document.getElementById('container').className = '';
    var cmDefaults = {
          lineNumbers: true,
          theme: 'monokai',
          lineWrapping: true,
          tabSize: 4,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        },
        sql = CodeMirror.fromTextArea(elemSql, util.extend({
          mode: 'text/x-plsql'
        }, cmDefaults)),
        ast = CodeMirror.fromTextArea(elemAst, util.extend({
          mode: "application/ld+json",
          foldGutter: true,
          readOnly: true
        }, cmDefaults)),
        update = debounce(updater(sql, ast), 250);
    sql.on('change', update);
    reloadLast(sql);
    update();
    root.window.onbeforeunload = function () {
      var lastValue = sql.getValue();
      if (lastValue.trim() !== '') {
        saveLast(lastValue);
      }
    };
  };
  root.onload = loadDemo;
})(typeof self === 'object' ? self : global);
