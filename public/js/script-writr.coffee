requirejs ['components/quill/dist/quill.min.js'], (quill) ->
  editor = new quill '#editor'
  editor.focus()

  editor.on 'text-change', (delta, source) ->
    # some stuff

  editor.on 'select-change', (range) ->
    # some other stuff
