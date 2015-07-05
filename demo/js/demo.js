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
    var output = setContent(dest);
    sqliteParser(source.getValue())
    .then(output, function (err) {
      var location = err.location != null ? "[" + err.location.start.line +
      ", " + err.location.start.column + "] " : "";
      setError(dest, location + err.message);
    });
  }

  function editorFormat(e) {
    e.execCommand('selectAll');
    e.execCommand('indentAuto');
    e.setCursor({line: 0, ch: 0});
    return e;
  }

  var loadDemo = function () {
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
          readOnly: 'nocursor'
        }, cmDefaults)),
        update = debounce(function () {
          updater(sql, ast);
        }, 250);

    sql.on('change', update);
    update();
  };
  root.onload = loadDemo;
})(typeof self === 'object' ? self : global);
