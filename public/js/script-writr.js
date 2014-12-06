(function() {
  var editor, updateGetContents, updateGetLength, updateGetSelection;

  editor = new Quill('#editor');

  editor.focus();

  editor.on('selection-change', function(range) {
    return updateGetSelection();
  });

  editor.on('text-change', function(delta, source) {
    updateGetLength();
    updateGetContents();
    return updateGetSelection();
  });

  updateGetLength = function() {
    return document.getElementsByClassName('getLength')[0].innerHTML = editor.getLength();
  };

  updateGetContents = function() {
    return document.getElementsByClassName('getContents')[0].innerHTML = JSON.stringify(editor.getContents(), null, '\t');
  };

  updateGetSelection = function() {
    var range, rangeEnd, rangeStart;
    rangeStart = document.getElementsByClassName('rangeStart')[0];
    rangeEnd = document.getElementsByClassName('rangeEnd')[0];
    range = editor.getSelection();
    if (range) {
      console.log('shit');
      rangeStart.innerHTML = range.start;
      return rangeEnd.innerHTML = range.end;
    }
  };

}).call(this);
