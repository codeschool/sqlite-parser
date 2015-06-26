(function (root) {
  var loadDemo = function () {
    var panel,
        /* taken from _.debounce() method of Underscore.js */
        debounce = function debounce(func, wait, immediate) {
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
        },
        makePanel = function (where, content) {
          var node = document.createElement("div");
          var widget, close, label;

          node.id = "panel-ast";
          node.className = "panel " + where;
          close = node.appendChild(document.createElement("a"));
          close.setAttribute("title", "Dismiss");
          close.setAttribute("class", "remove-panel");
          close.textContent = "✖";
          CodeMirror.on(close, "click", function() {
            panel.clear(); panel = null;
          });
          label = node.appendChild(document.createElement("span"));
          label.textContent = content;
          return node;
        },
        setError = function (cm, message) {
          var panels = document.getElementsByClassName('panel');
          if (panels.length) {
            panels.item(0).querySelector('span').textContent = message;
            console.log("update");
          } else {
            console.log("draw");
            panel = cm.addPanel(makePanel("top", message), {position: "top"});
          }
        },
        setContent = function (cm) {
          return function (val) {
            if(panel != null) panel.clear(); panel = null;
            cm.setValue(prettify(val));
            editorFormat(cm);
          };
        },
        prettify = function (obj) {
          console.log('hey');
          return JSON.stringify(obj, null, '\t');
        },
        updater = function (source, dest) {
          var output = setContent(dest);
          root.sqliteParser(source.getValue())
          .then(output, function (err) {
            console.log(err);
            var location = err.location != null ? " (Line: " + err.location.start.line + ", Column: " + err.location.start.column + ")" : "";
            setError(dest, "[" + err.name + "] " + err.message + location);
          });
        }
        editorFormat = function (e) {
          e.execCommand('selectAll');
          e.execCommand('indentAuto');
          e.setCursor({line: 0, ch: 0});
          return e;
        },
        sql = CodeMirror.fromTextArea(document.getElementById('sql'), {
          mode: 'text/x-plsql',
          lineNumbers: true,
          theme: 'monokai',
          tabSize: 4,
          lineWrapping: true,
          lineWrapping: true
        }),
        ast = CodeMirror.fromTextArea(document.getElementById('ast'), {
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
  };
  root.onload = loadDemo;
})(window);
