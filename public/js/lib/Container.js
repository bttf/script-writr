(function() {
  define(function() {
    var Container;
    return Container = (function() {
      function Container(editor) {
        this.editor = editor;
        this.leftBound = 0;
        this.rightBound = 0;
      }

      Container.prototype.update = function(content, delta) {
        if (this.cursorWithin()) {
          if (delta) {
            if (delta.indexOf('\n' > -1)) {
              console.log('newline');
            }
            if (delta.indexOf('\t' > -1)) {
              return console.log('tab');
            }
          }
        }
      };

      Container.prototype.cursorWithin = function() {};

      Container.prototype.getCursorIndex = function() {};

      Container.prototype.isSet = function() {
        if (this.leftBound && this.rightBound === 0) {
          return false;
        } else {
          return true;
        }
      };

      return Container;

    })();
  });

}).call(this);
