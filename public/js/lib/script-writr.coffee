define ['script-definr', 'Container'], (scriptDefinr, container) ->
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
      @sd = new scriptDefinr @editor

      @titleCont = new container @editor
      @creditsCont = new container @editor
      @sluglineCont = new container @editor
      @actionCont = new container @editor
      @dialogueCont = new container @editor

      # debug ################
      window.editor = @editor

    update: (changeType, content, source) ->
      if changeType == 'text' and content
        delta = content.ops
        content = @editor.getContents().ops[0].insert
        @titleCont.update content, delta
        @creditsCont.update content, delta
        @sluglineCont.update content, delta
        @actionCont.update content, delta
        @dialogueCont.update content, delta

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

    previousInsert: (content) ->
      objs = content.ops
      for obj in objs
        if obj['insert']
          getTd('previousInsert').innerHTML = obj['insert']

    numOfNewLines: () ->
      getNumOfIndices @getInsert(), '\n'

    updateContent: () ->

    getInsert: () ->
      @editor.getContents().ops[0].insert

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
