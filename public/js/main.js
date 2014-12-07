(function() {
  requirejs.config({
    baseUrl: 'js/lib',
    paths: {
      quill: '/components/quill/dist/quill.min'
    }
  });

  requirejs(['quill', 'script-writr'], function(quill, scriptWritr) {
    var editor, sw;
    editor = new quill('#editor');
    editor.focus();
    sw = new scriptWritr();
    editor.on('text-change', function(delta, source) {
      sw.update();
      return sw.render();
    });
    return editor.on('select-change', function(range) {
      sw.update();
      return sw.render();
    });
  });

}).call(this);
