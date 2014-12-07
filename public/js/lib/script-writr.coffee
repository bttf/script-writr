define () ->
  class ScriptWritr
    constructor: () ->
      console.log 'deubg, sw, constructor'

    update: () ->
      console.log 'debug, sw, update'

    render: () ->
      console.log 'debug, sw, render'

  return ScriptWritr
