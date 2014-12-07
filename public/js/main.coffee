requirejs.config {
  baseUrl: 'js/lib',
  paths: {
    quill: '/components/quill/dist/quill.min'
  }
}

requirejs ['quill', 'script-writr'], (quill, scriptWritr) ->
  editor = new quill '#editor'
  editor.focus()

  sw = new scriptWritr(editor)

  editor.on 'text-change', (delta, source) ->
    sw.update 'text', delta, source
    sw.render 'text', delta, source
    
  editor.on 'select-change', (range) ->
    sw.update 'select', range
    sw.render 'select', range
