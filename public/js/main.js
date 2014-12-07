(function() {
  requirejs.config({
    baseUrl: 'js/lib',
    paths: {
      quill: '/components/quill/dist/quill.min'
    }
  });

  requirejs(['quill', 'script-writr'], function(quill, sw) {
    var editor;
    editor = new quill('#editor');
    editor.focus();
    editor.on('text-change', function(delta, source) {});
    return editor.on('select-change', function(range) {});
  });

}).call(this);
