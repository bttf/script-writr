define () ->
  getTd = (className) ->
    document.getElementsByClassName(className)[0]

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
    indices.length

  class ScriptWritr
    constructor: (@editor) ->
      @mode = 'title'
      window.editor = @editor

    update: () ->
      @defineMode()
      if @mode == 'title'
        @enforceTitle()

    render: (changeType, content, source) ->

      # debug stuff ######################
      if changeType == 'text' and content
        @debug.updateDelta content
        @previousInsert content

      @debug.updateGetLength @editor
      @debug.updateGetContents @editor
      @debug.updateGetSelection @editor
      @debug.updateNewLineCount @editor
      @debug.updateMode()
      return

    defineMode: () ->

    enforceTitle: () ->

    previousInsert: (content) ->
      objs = content.ops
      for obj in objs
        if obj['insert']
          getTd('previousInsert').innerHTML = obj['insert']

    updateContent: () ->

    debug:
      mode: 'title'
      updateGetLength: (e) ->
        getTd('getLength').innerHTML = e.getLength()
        return
      updateGetContents: (e) ->
        getTd('getContents').innerHTML = JSON.stringify e.getContents(), null, '\t'
        return
      updateGetSelection: (e) ->
        rangeStart = getTd('rangeStart')
        rangeEnd = document.getElementsByClassName('rangeEnd')[0]
        range = e.getSelection()
        if range
          rangeStart.innerHTML = range.start
          rangeEnd.innerHTML = range.end
        return
      updateMode: () ->
        getTd('currentMode').innerHTML = @mode
        return
      updateNewLineCount: (e) ->
        getTd('newLineCount').innerHTML = getNumOfIndices e.getContents().ops[0].insert, '\n'
        return
      updateDelta: (delta) ->
        getTd('deltaContent').innerHTML = JSON.stringify delta
