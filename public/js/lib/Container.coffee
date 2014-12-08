define () ->
  class Container
    constructor: (@editor) ->
      @leftBound = 0
      @rightBound = 0

    update: (content, delta) ->
      if @cursorWithin()
        if delta
          if delta.indexOf '\n' > -1
            console.log('newline')
            # TODO: do some stuff
          if delta.indexOf '\t' > -1
            console.log('tab')
            # TODO: do some stuff

            
    cursorWithin: () ->
      # TODO
      # getCursorIndex
      # return in between left and right bound?

    getCursorIndex: () ->

    isSet: () ->
      if @leftBound and @rightBound == 0 then return false
      else return true

