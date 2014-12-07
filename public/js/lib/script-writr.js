(function() {
  define(function() {
    var ScriptWritr, getNumOfIndices, getTd;
    getTd = function(className) {
      return document.getElementsByClassName(className)[0];
    };
    getNumOfIndices = function(str, searchStr) {
      var index, indices, startIndex;
      index = 0;
      startIndex = 0;
      indices = [];
      while (startIndex < str.length) {
        index = str.substring(startIndex).indexOf(searchStr);
        if (index > -1) {
          indices.push(index);
          startIndex += index + searchStr.length;
        } else {
          break;
        }
      }
      window.indices = indices;
      return indices.length;
    };
    return ScriptWritr = (function() {
      function ScriptWritr(editor) {
        this.editor = editor;
      }

      ScriptWritr.prototype.update = function() {
        return console.log('debug, sw, update');
      };

      ScriptWritr.prototype.render = function(changeType, content, source) {
        this.debug.updateGetLength(this.editor);
        this.debug.updateGetContents(this.editor);
        this.debug.updateGetSelection(this.editor);
        this.debug.updateNewLineCount(this.editor);
        if (changeType === 'text' && content) {
          this.debug.updateDelta(content);
        }
      };

      ScriptWritr.prototype.debug = {
        updateGetLength: function(e) {
          getTd('getLength').innerHTML = e.getLength();
        },
        updateGetContents: function(e) {
          getTd('getContents').innerHTML = JSON.stringify(e.getContents(), null, '\t');
        },
        updateGetSelection: function(e) {
          var range, rangeEnd, rangeStart;
          rangeStart = getTd('rangeStart');
          rangeEnd = document.getElementsByClassName('rangeEnd')[0];
          range = e.getSelection();
          if (range) {
            rangeStart.innerHTML = range.start;
            rangeEnd.innerHTML = range.end;
          }
        },
        updateMode: function() {},
        updateNewLineCount: function(e) {
          getTd('newLineCount').innerHTML = getNumOfIndices(e.getContents().ops[0].insert, '\n');
        },
        updateDelta: function(delta) {
          return getTd('deltaContent').innerHTML = JSON.stringify(delta);
        }
      };

      return ScriptWritr;

    })();
  });

}).call(this);
