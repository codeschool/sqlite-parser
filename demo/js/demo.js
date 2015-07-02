(function (root) {
  var sqliteParser = require('sqlite-parser'),
      CodeMirror = require('codemirror'),
      panel = document.getElementById('ast'),
      msgArea = document.getElementById('ast-header');

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
    var sql = CodeMirror.fromTextArea(document.getElementById('sql-text'), {
          mode: 'text/x-plsql',
          lineNumbers: true,
          theme: 'monokai',
          tabSize: 4,
          lineWrapping: true,
          lineWrapping: true
        }),
        ast = CodeMirror.fromTextArea(document.getElementById('ast-text'), {
          lineNumbers: true,
          theme: 'monokai',
          lineWrapping: true,
          mode: "application/ld+json",
          tabSize: 4,
          lineWrapping: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        }),
        update = debounce(function () {
          updater(sql, ast);
        }, 250);

    sql.on('change', update);
    update();
  };
  root.onload = loadDemo;
})(typeof self === 'object' ? self : global);
