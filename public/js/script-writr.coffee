mode = 'title'

editor = new Quill '#editor'

#debug
window.editor = editor

editor.focus()

editor.on 'selection-change', (range) ->
  editorLoop()

editor.on 'text-change', (delta, source) ->
  editorLoop(delta, source)

editorLoop = (delta) ->
  setMode()

  # debug stuff
  updateGetLength()
  updateGetContents()
  updateGetSelection()
  updateMode()
  updateNewLineCount()
  if delta then updateDelta(JSON.stringify(delta))

updateDelta = (delta) ->
  g('deltaContent').innerHTML = delta

setMode = () ->
  if mode == 'title'
    if numOfNewLines() > 1
      mode = 'credits'
      setStyle()

setStyle = () ->
  switch mode
    when 'title' then setTitleStyle()
    when 'credits' then setCreditsStyle()

setTitleStyle = () ->
  editor.prepareFormat 'bold', true
  editor.prepareFormat 'align', 'center'

setCreditsStyle = () ->
  editor.prepareFormat 'bold', null
  editor.prepareFormat 'align', 'center'

numOfNewLines = () ->
  str = editor.getContents().ops[0].insert
  return getNumOfIndices(str, '\n')

getNumOfIndices = (str, searchStr) ->
  index = 0
  startIndex = 0
  indices = []
  while (startIndex < str.length)
    index = str.substring(startIndex).indexOf(searchStr)
    if (index > -1)
      indices.push index
      startIndex += index + searchStr.length
    else
      break
  window.indices = indices
  return indices.length

updateNewLineCount = () ->
  g('newLineCount').innerHTML = getNumOfIndices(editor.getContents().ops[0].insert, '\n')

updateGetLength = () ->
  g('getLength').innerHTML = editor.getLength()

updateGetContents = () ->
  g('getContents').innerHTML = JSON.stringify editor.getContents(), null, '\t'

updateGetSelection = () ->
  rangeStart = g('rangeStart')
  rangeEnd = document.getElementsByClassName('rangeEnd')[0]
  range = editor.getSelection()
  if range
    rangeStart.innerHTML = range.start
    rangeEnd.innerHTML = range.end

updateMode = () ->
  g('currentMode').innerHTML = mode

g = (element) ->
  return document.getElementsByClassName(element)[0]
