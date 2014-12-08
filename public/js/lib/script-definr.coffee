define () ->
  class ScriptDefinr
    constructor: (@editor) ->
    defineTitle: () ->
      # get cursor position of title selection ?
      # return " " " " "
    getInsert: () ->
      @editor.getContents().ops[0].insert
    getCursorPosition: (delta) ->

