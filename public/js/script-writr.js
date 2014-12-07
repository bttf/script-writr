(function() {
  requirejs(['components/quill/dist/quill.min.js'], function(quill) {
    var editor;
    editor = new quill('#editor');
    editor.focus();
    editor.on('text-change', function(delta, source) {});
    return editor.on('select-change', function(range) {});
  });

}).call(this);
