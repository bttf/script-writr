editor = new Quill '#editor'
editor.focus()

editor.on 'selection-change', (range) ->
  updateGetSelection()

editor.on 'text-change', (delta, source) ->
  updateGetLength()
  updateGetContents()
  updateGetSelection()

updateGetLength = () ->
  document.getElementsByClassName('getLength')[0].innerHTML = editor.getLength()

updateGetContents = () ->
  document.getElementsByClassName('getContents')[0].innerHTML = JSON.stringify editor.getContents(), null, '\t'

updateGetSelection = () ->
  rangeStart = document.getElementsByClassName('rangeStart')[0]
  rangeEnd = document.getElementsByClassName('rangeEnd')[0]
  range = editor.getSelection()
  if range
    console.log 'shit'
    rangeStart.innerHTML = range.start
    rangeEnd.innerHTML = range.end

