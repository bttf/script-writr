(function() {
  define(['script-definr', 'Container'], function(scriptDefinr, container) {
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
        this.mode = 'title';
        this.sd = new scriptDefinr(this.editor);
        this.titleCont = new container(this.editor);
        this.creditsCont = new container(this.editor);
        this.sluglineCont = new container(this.editor);
        this.actionCont = new container(this.editor);
        this.dialogueCont = new container(this.editor);
        window.editor = this.editor;
      }

      ScriptWritr.prototype.update = function(changeType, content, source) {
        var delta;
        if (changeType === 'text' && content) {
          delta = content.ops;
          content = this.editor.getContents().ops[0].insert;
          this.titleCont.update(content, delta);
          this.creditsCont.update(content, delta);
          this.sluglineCont.update(content, delta);
          this.actionCont.update(content, delta);
          return this.dialogueCont.update(content, delta);
        }
      };

      ScriptWritr.prototype.render = function(changeType, content, source) {
        if (changeType === 'text' && content) {
          this.debug.updateDelta(content);
          this.previousInsert(content);
        }
        this.debug.updateGetLength(this.editor);
        this.debug.updateGetContents(this.editor);
        this.debug.updateGetSelection(this.editor);
        this.debug.updateNewLineCount(this.editor);
        this.debug.updateMode();
      };

      ScriptWritr.prototype.previousInsert = function(content) {
        var obj, objs, _i, _len, _results;
        objs = content.ops;
        _results = [];
        for (_i = 0, _len = objs.length; _i < _len; _i++) {
          obj = objs[_i];
          if (obj['insert']) {
            _results.push(getTd('previousInsert').innerHTML = obj['insert']);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      ScriptWritr.prototype.numOfNewLines = function() {
        return getNumOfIndices(this.getInsert(), '\n');
      };

      ScriptWritr.prototype.updateContent = function() {};

      ScriptWritr.prototype.getInsert = function() {
        return this.editor.getContents().ops[0].insert;
      };

      ScriptWritr.prototype.debug = {
        mode: 'title',
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
        updateMode: function() {
          getTd('currentMode').innerHTML = this.mode;
        },
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
