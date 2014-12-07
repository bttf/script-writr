(function() {
  define(function() {
    var ScriptWritr;
    ScriptWritr = (function() {
      function ScriptWritr() {
        console.log('deubg, sw, constructor');
      }

      ScriptWritr.prototype.update = function() {
        return console.log('debug, sw, update');
      };

      ScriptWritr.prototype.render = function() {
        return console.log('debug, sw, render');
      };

      return ScriptWritr;

    })();
    return ScriptWritr;
  });

}).call(this);
