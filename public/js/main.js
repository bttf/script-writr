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
    sw = new scriptWritr(editor);
    sw.update();
    sw.render();
    editor.on('text-change', function(delta, source) {
      sw.update('text', delta, source);
      return sw.render('text', delta, source);
    });
    return editor.on('select-change', function(range) {
      sw.update('select', range);
      return sw.render('select', range);
    });
  });

}).call(this);
