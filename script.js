// Disclaimer: HiveHTML uses the Ace Editor for code editing. Ace Editor is a product of Ajax.org. HiveHTML is created by JOHN RÉ PORAS.

// Copyright (c) 2024 JOHN RÉ PORAS

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    var editor = ace.edit("editor");
    var outputContainer = document.getElementById('output');
    editor.setTheme("ace/theme/monokai");
    setDefaultMode();

    function setDefaultMode() {
      var languageSelector = document.getElementById('languageSelector');
      var selectedLanguage = languageSelector.value;
      editor.session.setMode(`ace/mode/${selectedLanguage}`);
      editor.setValue(`// Upload or enter your code here...`, 1);
    }

    function changeLanguage() {
      var languageSelector = document.getElementById('languageSelector');
      var selectedLanguage = languageSelector.value;
      editor.session.setMode(`ace/mode/${selectedLanguage}`);
      editor.setValue(`// Upload or enter your code here...`, 1);
    }

    function changeTheme(theme) {
      editor.setTheme(theme);
    }

    function toggleWordWrap() {
      editor.getSession().setUseWrapMode(!editor.getSession().getUseWrapMode());
    }
    
function toggleReadOnly() {
  editor.setReadOnly(!editor.getReadOnly());
}

    function executeCode() {
  var selectedLanguage = document.getElementById('languageSelector').value;

  if (selectedLanguage === 'html') {
    var htmlCode = editor.getValue();

    var outputWindow = window.open('', '_blank');
    outputWindow.document.write(htmlCode);
    outputWindow.document.close();
  }
}

function closeOutputModal() {
  $('#outputModal').modal('hide');
}

function loadFile() {
      var fileInput = document.getElementById('fileInput');
      var file = fileInput.files[0];

      if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var content = e.target.result;
          var mode = getModeFromFileName(file.name);
          editor.session.setMode(`ace/mode/${mode}`);
          editor.setValue(content, 1);

          var languageSelector = document.getElementById('languageSelector');
          languageSelector.value = mode;
        };
        reader.readAsText(file);
      } else {
        setDefaultMode();
      }
    }

    function getModeFromFileName(fileName) {
      var extension = fileName.split('.').pop().toLowerCase();
      switch (extension) {
        case 'html':
          return 'html';
        default:
          return 'text';
      }
    }
    
    // Autocomplete functionality
editor.commands.addCommand({
  name: "autocomplete",
  bindKey: { win: "Ctrl-Space", mac: "Command-Space" },
  exec: function (editor) {
    var position = editor.getCursorPosition();
    var line = editor.session.getLine(position.row);
    var prefix = line.slice(0, position.column);

    if (prefix.endsWith('<')) {
      editor.insert('</' + prefix.match(/<(\w+)$/)[1] + '>');
    } else if (prefix.endsWith('{')) {
      editor.insert('}');
    }
  },
});

  var editor = ace.edit("editor");

  function selectAll() {
    editor.selectAll();
    console.log('Selected all content');
  }

  function undo() {
    editor.undo();
    console.log('Undo action');
  }

  function redo() {
    editor.redo();
    console.log('Redo action');
  }

  function copyText() {
      var selectedText = editor.getCopyText();
      navigator.clipboard.writeText(selectedText).then(function() {
        console.log('Text copied to clipboard');
      }).catch(function(err) {
        console.error('Unable to copy text to clipboard', err);
      });
    }

  function run() {
    var selectedLanguage = document.getElementById('languageSelector').value;

  if (selectedLanguage === 'html') {
    var htmlCode = editor.getValue();

    var outputWindow = window.open('', '_blank');
    outputWindow.document.write(htmlCode);
    outputWindow.document.close();
  }
}

  function deleteAll() {
    editor.setValue('');
    console.log('Deleted all content');
  }
  
  var editor = ace.edit("editor");

    // Autocompletion
    ace.require("ace/ext/language_tools");
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    });
    
    function selectAllAndClose() {
        selectAll();
        closeNavbar();
    }

    function undoAndClose() {
        undo();
        closeNavbar();
    }

    function redoAndClose() {
        redo();
        closeNavbar();
    }

    function copyAndClose() {
        copyText();
        closeNavbar();
    }

    function runAndClose() {
        run();
        closeNavbar();
    }

    function deleteAllAndClose() {
        deleteAll();
        closeNavbar();
    }

    function closeNavbar() {
        $(".navbar-collapse").collapse("hide");
    }
    
    // Customized Themes
    
    function changeThemeRainy() {
    editor.setTheme("ace-rainy");
    editor.container.style.background = 'url("images/rainy.jpg")';
    editor.container.style.backgroundSize = 'cover';
    editor.container.classList.add('ace-rainy');
}

function changeThemeBatman() {
    editor.setTheme("ace-batman");
    editor.container.style.background = 'url("images/batman.jpg")';
    editor.container.style.backgroundSize = 'cover';
    editor.container.classList.add('ace-batman');
}

function changeThemeAurora() {
    editor.setTheme("ace-aurora");
    editor.container.style.background = 'url("images/aurora.jpg")';
    editor.container.style.backgroundSize = 'cover';
    editor.container.classList.add('ace-aurora');
}

  
  
