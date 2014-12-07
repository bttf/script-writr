requirejs.config {
  baseUrl: 'js/lib',
  paths: {
    quill: '/components/quill/dist/quill.min'
  }
}

requirejs ['quill', 'script-writr'], (quill, scriptWritr) ->
  editor = new quill '#editor'
  editor.focus()

  sw = new scriptWritr()

  editor.on 'text-change', (delta, source) ->
    sw.update()
    sw.render()
    
  editor.on 'select-change', (range) ->
    sw.update()
    sw.render()
