(function() {
  var editor, editorLoop, g, getNumOfIndices, mode, numOfNewLines, setCreditsStyle, setMode, setStyle, setTitleStyle, updateDelta, updateGetContents, updateGetLength, updateGetSelection, updateMode, updateNewLineCount;

  mode = 'title';

  editor = new Quill('#editor');

  window.editor = editor;

  editor.focus();

  editor.on('selection-change', function(range) {
    return editorLoop();
  });

  editor.on('text-change', function(delta, source) {
    return editorLoop(delta, source);
  });

  editorLoop = function(delta) {
    setMode();
    updateGetLength();
    updateGetContents();
    updateGetSelection();
    updateMode();
    updateNewLineCount();
    if (delta) {
      return updateDelta(JSON.stringify(delta));
    }
  };

  updateDelta = function(delta) {
    return g('deltaContent').innerHTML = delta;
  };

  setMode = function() {
    if (mode === 'title') {
      if (numOfNewLines() > 1) {
        mode = 'credits';
        return setStyle();
      }
    }
  };

  setStyle = function() {
    switch (mode) {
      case 'title':
        return setTitleStyle();
      case 'credits':
        return setCreditsStyle();
    }
  };

  setTitleStyle = function() {
    editor.prepareFormat('bold', true);
    return editor.prepareFormat('align', 'center');
  };

  setCreditsStyle = function() {
    editor.prepareFormat('bold', null);
    return editor.prepareFormat('align', 'center');
  };

  numOfNewLines = function() {
    var str;
    str = editor.getContents().ops[0].insert;
    return getNumOfIndices(str, '\n');
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

  updateNewLineCount = function() {
    return g('newLineCount').innerHTML = getNumOfIndices(editor.getContents().ops[0].insert, '\n');
  };

  updateGetLength = function() {
    return g('getLength').innerHTML = editor.getLength();
  };

  updateGetContents = function() {
    return g('getContents').innerHTML = JSON.stringify(editor.getContents(), null, '\t');
  };

  updateGetSelection = function() {
    var range, rangeEnd, rangeStart;
    rangeStart = g('rangeStart');
    rangeEnd = document.getElementsByClassName('rangeEnd')[0];
    range = editor.getSelection();
    if (range) {
      rangeStart.innerHTML = range.start;
      return rangeEnd.innerHTML = range.end;
    }
  };

  updateMode = function() {
    return g('currentMode').innerHTML = mode;
  };

  g = function(element) {
    return document.getElementsByClassName(element)[0];
  };

}).call(this);
