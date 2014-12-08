(function() {
  define(function() {
    var ScriptDefinr;
    return ScriptDefinr = (function() {
      function ScriptDefinr(editor) {
        this.editor = editor;
      }

      ScriptDefinr.prototype.defineTitle = function() {};

      ScriptDefinr.prototype.getInsert = function() {
        return this.editor.getContents().ops[0].insert;
      };

      ScriptDefinr.prototype.getCursorPosition = function(delta) {};

      return ScriptDefinr;

    })();
  });

}).call(this);
