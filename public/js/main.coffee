requirejs.config {
  baseUrl: 'js/lib',
  paths: {
    quill: '/components/quill/dist/quill.min'
  }
}

requirejs ['quill', 'script-writr'], (quill, sw) ->
  editor = new quill '#editor'
  editor.focus()

  editor.on 'text-change', (delta, source) ->
    # some shit

  editor.on 'select-change', (range) ->
    # some other shit
