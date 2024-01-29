// Disclaimer: HiveHTML uses the Ace Editor for code editing. Ace Editor is a product of Ajax.org. HiveHTML is created by JOHN RÉ PORAS.

// Copyright (c) 2024 JOHN RÉ PORAS

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

///////////////////// EDITOR /////////////////////

var editor = ace.edit("editor");
var outputContainer = document.getElementById('output');
editor.setTheme("ace/theme/monokai");
setDefaultMode();

function setDefaultMode() {
  var languageSelector = document.getElementById('languageSelector');
  var selectedLanguage = languageSelector.value;
  editor.session.setMode(`ace/mode/${selectedLanguage}`);
}

////////////////// CHANGE LANG /////////////////

function changeLanguage() {
  var languageSelector = document.getElementById('languageSelector');
  var selectedLanguage = languageSelector.value;

  // Set mode based on the selected language
if (selectedLanguage === 'html') {
  // HTML mode
  editor.session.setMode('ace/mode/html');
  editor.setValue(`<!-- Upload or enter your HTML code... -->`, 1);
  hideConsole();
} else if (selectedLanguage === 'javascript') {
  // JavaScript mode
  editor.session.setMode('ace/mode/javascript');
  editor.setValue(`// Upload or enter your JavaScript code...`, 1);
  hideConsole();
} else if (selectedLanguage === 'markdown') {
  // Markdown mode
  editor.session.setMode('ace/mode/markdown');
  editor.setValue(`<!-- Enter your Markdown content... -->`, 1);
  hideConsole();
} else if (selectedLanguage === 'python') {
  // Python mode
  editor.session.setMode('ace/mode/python');
  editor.setValue(`# Enter your Python code...`, 1);
  hideConsole();
} else if (selectedLanguage === 'go') {
  // Go mode
  editor.session.setMode('ace/mode/go');
  editor.setValue(`// Enter your Go code...`, 1);
  hideConsole();
} else if (selectedLanguage === 'cpp') {
  // C++ mode
  editor.session.setMode('ace/mode/cpp');
  editor.setValue(`// Enter your C++ code...`, 1);
  hideConsole();
} else if (selectedLanguage === 'css') {
  // CSS mode
  editor.session.setMode('ace/mode/css');
  editor.setValue(`/* Enter your CSS code... */`, 1);
  hideConsole();
} else if (selectedLanguage === 'csharp') {
  // C# mode
  editor.session.setMode('ace/mode/csharp');
  editor.setValue(`// Enter your C# code...`, 1);
  hideConsole();
} else if (selectedLanguage === 'ruby') {
  // Ruby mode
  editor.session.setMode('ace/mode/ruby');
  editor.setValue(`# Enter your Ruby code...`, 1);
  hideConsole();
} else if (selectedLanguage === 'text') {
  // Plain Text
  editor.session.setMode('ace/mode/text');
  editor.setValue(`// Enter your plain text...`, 1);
  hideConsole();
  }
}

//////////// MARKDOWN EXECUTION/////////////////

function executeMarkdownCode() {
  var markdownCode = editor.getValue().trim();
  var converter = new showdown.Converter();
  var htmlContent = converter.makeHtml(markdownCode);

  // Creating a new HTML document for the output
  var outputWindow = window.open('', '_blank');
  outputWindow.document.write('<html><head><title>Markdown Output</title>');
  outputWindow.document.write('<style>');
  outputWindow.document.write('body { background-color: #272822; color: #ffffff; font-family: "Arial", sans-serif; padding: 20px; }');
  outputWindow.document.write('h1, h2, h3, h4, h5, h6 { color: #00FFA3; }');
  outputWindow.document.write('a { color: #66d9ef; }');
  outputWindow.document.write('code { display: block; background-color: #333; color: #f8f8f2; padding: 10px; border-radius: 5px; font-family: "Courier New", monospace; margin: 10px 0; }');
  outputWindow.document.write('pre { margin: 0; }');
  outputWindow.document.write('</style></head><body>');
  outputWindow.document.write(htmlContent);
  outputWindow.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js"></script>');
  outputWindow.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ext-language_tools.js"></script>');
  outputWindow.document.write('<script>');
  outputWindow.document.write('var editor = ace.edit("outputEditor");');
  outputWindow.document.write('editor.setTheme("ace/theme/monokai");');
  outputWindow.document.write('editor.setValue(`' + escapeHtml(markdownCode) + '`, 1);');
  outputWindow.document.write('editor.setReadOnly(true);');
  outputWindow.document.write('</script>');
  outputWindow.document.write('</body></html>');
  outputWindow.document.close();
}

// Helper function to escape HTML entities
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//////////////////// EXECUTE ////////////////////

function executeCode() {
  var selectedLanguage = document.getElementById('languageSelector').value;
  var consoleOutputContainer = document.getElementById('consoleOutput');

  if (selectedLanguage === 'html') {
    var htmlCode = editor.getValue().trim();
    if (!htmlCode) {
      console.error('Error: Please provide HTML code before executing.');
      return;
    }

    var outputWindow = window.open('', '_blank');
    outputWindow.document.write(htmlCode);
    outputWindow.document.close();
  } else if (selectedLanguage === 'javascript') {
    try {
      var jsCode = editor.getValue();
      var result = executeJavaScriptCode(jsCode);

      // Displaying result in the output container
      consoleOutputContainer.innerHTML = '';
      consoleOutputContainer.innerHTML += '<strong>Console Output:</strong><br>';
      consoleOutputContainer.innerHTML += '--------------------<br>';
      consoleOutputContainer.innerHTML += '<pre>' + result + '</pre>';
      consoleOutputContainer.innerHTML += '--------------------';

      showConsole();
    } catch (error) {
      console.error('Error executing JavaScript code:', error);
      consoleOutputContainer.innerHTML = '';
      consoleOutputContainer.innerHTML += '<strong>Error:</strong><br>';
      consoleOutputContainer.innerHTML += '--------------------<br>';
      consoleOutputContainer.innerHTML += '<p>' + error.message + '</p>';
      consoleOutputContainer.innerHTML += '--------------------';
    }
  } else if (selectedLanguage === 'markdown') {
    executeMarkdownCode();
  }
}

//////////// JAVSCRIPT EXECUTION/////////////////

function executeJavaScriptCode(jsCode) {
  var consoleOutput = '';
  var originalConsoleLog = console.log;
  var originalConsoleError = console.error;
  console.log = function (message) {
    var timestampedMessage = addTimestamp(message);
    consoleOutput += timestampedMessage + '\n';
    originalConsoleLog.apply(console, arguments);
  };

  console.error = function (...args) {
    args.forEach((error) => {
      var timestampedError = addTimestamp('Error: ' + error.message);
      consoleOutput += timestampedError + '\n';

      if (error.stack) {
        var stackLines = error.stack.split('\n');
        var errorDetails = extractErrorDetails(stackLines, jsCode);
        consoleOutput += errorDetails + '\n';
      }
    });

    originalConsoleError.apply(console, arguments);
  };

  try {
    eval(jsCode);
  } catch (executionError) {
    console.error(executionError);
  } finally {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  }

  console.log('All errors in code:\n' + consoleOutput);

  return consoleOutput;
}

function extractErrorDetails(stackLines, code) {
  var fileLineInfo = stackLines.find(line => line.includes('eval'));

  if (fileLineInfo) {
    var match = /<anonymous>:(\d+):(\d+)/.exec(fileLineInfo);
    if (match) {
      var lineNumber = match[1];
      var colNumber = match[2];
      var snippet = getErrorSnippet(code, lineNumber);
      return `Error at line ${lineNumber}, column ${colNumber}:\n${snippet}`;
    }
  }

  return 'Ensure the code is well-formed.';
}

function getErrorSnippet(code, lineNumber) {
  var lines = code.split('\n');
  var start = Math.max(0, lineNumber - 3);
  var end = Math.min(lines.length, lineNumber + 2);
  var snippetLines = lines.slice(start, end);
  return snippetLines.join('\n');
}

function addTimestamp(message) {
  var timestamp = new Date().toLocaleTimeString();

  return `<span class="timestamp">${timestamp}</span> ${message}`;
}

//////////////// CLOSING - LOAD //////////////////

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

/////////////// UPLOADING FILES///////////////////

function getModeFromFileName(fileName) {
    var extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
        case 'html':
            return 'html';
        case 'js':
            return 'javascript';
        case 'md':
            return 'markdown';
        case 'txt':
            return 'text';
        case 'py':
            return 'python';
        case 'go':
            return 'go';
        case 'cpp':
            return 'c_cpp';
        case 'cs':
            return 'csharp';
        case 'css':
            return 'css';
        case 'rb':
            return 'ruby';
        default:
            return 'text';
    }
}


////////////CONSOLE HIDE - SHOW //////////////////

function hideConsole() {
  var consoleOutputContainer = document.getElementById('consoleOutput');
  consoleOutputContainer.style.display = 'none';
}

function showConsole() {
  var consoleOutputContainer = document.getElementById('consoleOutput');
  consoleOutputContainer.style.display = 'block';
}

/////////////AUTOCOMPLETE FUNCTION ///////////////

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
///////////////////SELECT ALL ////////////////
  function selectAll() {
    editor.selectAll();
    console.log('Selected all content');
  }
///////////////////// UNDO /////////////////////
  function undo() {
    editor.undo();
    console.log('Undo action');
  }
/////////////////////REDO/////////////////////
  function redo() {
    editor.redo();
    console.log('Redo action');
  }
///////////////////// COPY/////////////////////
  function copyText() {
      var selectedText = editor.getCopyText();
      navigator.clipboard.writeText(selectedText).then(function() {
        console.log('Text copied to clipboard');
      }).catch(function(err) {
        console.error('Unable to copy text to clipboard', err);
      });
    }
///////////////////// RUN /////////////////////
  function run() {
    var selectedLanguage = document.getElementById('languageSelector').value;

  if (selectedLanguage === 'html') {
    var htmlCode = editor.getValue();

    var outputWindow = window.open('', '_blank');
    outputWindow.document.write(htmlCode);
    outputWindow.document.close();
  }
}
///////////////////// DELETE/////////////////////
  function deleteAll() {
    editor.setValue('');
    console.log('Deleted all content');
  }
  
  /////////////////// EDITOR /////////////////////
  
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
    


////////////FONT SIZE - INCREASE/DECREASE/////////

function increaseFontSize(event) {
    event.stopPropagation();
    var currentSize = parseInt(editor.getFontSize(), 10);
    editor.setFontSize(currentSize + 1);
}

function decreaseFontSize(event) {
    event.stopPropagation();
    var currentSize = parseInt(editor.getFontSize(), 10);
    editor.setFontSize(Math.max(currentSize - 1, 4)); // Ensure a minimum font size
}


/////////////////AUTOSAVE/////////////////////////

function enableAutoSave(intervalInMinutes) {
    setInterval(function () {
        saveContentToLocalStorage();
    }, intervalInMinutes * 60 * 1000);
}

function saveContentToLocalStorage() {
    var content = editor.getValue();
    localStorage.setItem('autosavedContent', content);
}

///////////////CUSTOM WALLPAPER/////////////////

function setCustomWallpaper() {
    var wallpaperInput = document.getElementById('wallpaperInput');
    var wallpaperFile = wallpaperInput.files[0];

    if (wallpaperFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var wallpaperURL = e.target.result;
            
            document.getElementById('editor').style.background = 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' + wallpaperURL + ') center/cover fixed';
        };
        reader.readAsDataURL(wallpaperFile);
    }
}

function clearWallpaper() {
    document.getElementById('editor').style.background = ''; // Clear the background
}

/////////////////LINE NUM////////////////////////

function toggleLineNumbers() {
    var showLineNumbers = !editor.renderer.getShowGutter();
    editor.renderer.setShowGutter(showLineNumbers);
}

//////////////SYNTAX HIGHLIGHTING////////////////

function toggleSyntaxHighlighting() {
    editor.getSession().setUseWorker(!editor.getSession().getUseWorker());
}

/////////////////Change Theme ///////////////////

function changeTheme(theme) {
  editor.setTheme(theme);
}

///////////////////// WRAP /////////////////////

function toggleWordWrap() {
  editor.getSession().setUseWrapMode(!editor.getSession().getUseWrapMode());
}

///////////////////READ ONLY ////////////////////

function toggleReadOnly() {
  editor.setReadOnly(!editor.getReadOnly());
}


/////////////////LINE NUM////////////////////////

function executeSearchReplace() {
        var searchText = document.getElementById('searchInput').value;
        var replaceText = document.getElementById('replaceInput').value;

        if (!searchText || !replaceText) {
            alert('Please enter search and replace values.');
            return;
        }

        var editor = ace.edit("editor");
        var content = editor.getValue();

        // Perform the search and replace operation
        var updatedContent = content.replace(new RegExp(searchText, 'g'), replaceText);

        // Update the editor content
        editor.setValue(updatedContent);

        // Close the dropdown
        $('.dropdown-toggle').dropdown('toggle');
    }


//////////AUTO GENERATE COMMENT - HTML ///////////

function toggleHTMLComment() {
  var selectionRange = editor.getSelectionRange();
  var selectedText = editor.session.getTextRange(selectionRange);
  var lines = selectedText.split('\n');
  var isCommented = lines.every(line => line.trim().startsWith('<!--') && line.trim().endsWith('-->'));

  if (isCommented) {
    // Uncomment
    editor.session.doc.replace(selectionRange, lines.map(line => line.replace(/^\s*<!--\s?/, '').replace(/\s?-->\s?$/, '')).join('\n'));
  } else {
    // Comment
    editor.session.doc.replace(selectionRange, lines.map(line => `<!-- ${line} -->`).join('\n'));
  }
}

function generateHTMLComment() {
  var cursorPos = editor.getCursorPosition();
  var line = editor.session.getLine(cursorPos.row);

  var match = line.match(/^(\s*<\w+>)/);
  if (match) {
    var tag = match[1];
    var comment = `<!-- ${tag} - Description -->`;
    editor.session.doc.replace(new Range(cursorPos.row, 0, cursorPos.row, line.length), comment);
  }
}

///////////////COMMENT NAVIGATION///////////////

function navigateToNextComment() {
    navigateComment(true);
}

function navigateToPreviousComment() {
    navigateComment(false);
}

function navigateComment(next) {
    var editorSession = editor.getSession();
    var currentPosition = editor.getCursorPosition();
    var comments = editorSession.getAnnotations().filter(annotation => annotation.type === 'comment');

    comments.sort((a, b) => {
        return (a.row === b.row) ? a.column - b.column : a.row - b.row;
    });

    var currentIndex = comments.findIndex(comment => {
        return comment.row >= currentPosition.row && comment.column >= currentPosition.column;
    });

    var targetIndex = next ? currentIndex + 1 : currentIndex - 1;
    targetIndex = Math.max(0, Math.min(targetIndex, comments.length - 1));

    if (comments[targetIndex]) {
        var targetRow = comments[targetIndex].row;
        var targetColumn = comments[targetIndex].column;
        editor.gotoLine(targetRow + 1, targetColumn, true);
    }
}

// Bind to keyboard shortcuts
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'ArrowDown') {
        navigateToNextComment();
    } else if (event.ctrlKey && event.key === 'ArrowUp') {
        navigateToPreviousComment();
    }
});

function exportCode() {
    $('#exportPromptModal').modal('show');
}

var code = editor.getValue();
var language = document.getElementById('languageSelector').value;

var promptContainer = document.createElement('div');
promptContainer.classList.add('export-prompt');

var fileNameInput = document.createElement('input');
fileNameInput.type = 'text';
fileNameInput.placeholder = 'Enter the file name with extension (e.g., filename.html)';

var exportButton = document.createElement('button');
exportButton.textContent = 'Export Code';

promptContainer.appendChild(fileNameInput);
promptContainer.appendChild(exportButton);

exportButton.addEventListener('click', function () {
    var fullFileName = fileNameInput.value.trim();
    if (!fullFileName) {
        alert('Please enter a valid file name.');
        return;
    }

    var fileExtension = fullFileName.split('.').pop().toLowerCase();
    var contentType = getContentType(fileExtension);

    var blob = new Blob([code], { type: contentType });
    saveAs(blob, fullFileName);

    $('#exportPromptModal').modal('hide');
    promptContainer.remove();
});

$('#exportPromptModal').modal('show');
document.body.appendChild(promptContainer);

function getContentType(fileExtension) {
    const contentTypes = {
        'html': 'text/html;charset=utf-8',
        'js': 'application/javascript;charset=utf-8',
        'css': 'text/css;charset=utf-8',
        'go': 'text/plain;charset=utf-8',
        'cs': 'text/plain;charset=utf-8',
        'cpp': 'text/plain;charset=utf-8',
        'py': 'text/plain;charset=utf-8',
        'md': 'text/markdown;charset=utf-8',
        'rb': 'text/plain;charset=utf-8',
    };

    // Default to plain text if the content type is not found
    return contentTypes[fileExtension.toLowerCase()] || 'text/plain;charset=utf-8';
}

///////////////SHAREABLE LINK////////////////////

function generateShareableLink() {
    var code = editor.getValue();
    var randomCode = Math.floor(10000 + Math.random() * 90000);
    var link = window.location.href.split('?')[0] + '/code/' + randomCode + '.txt';
    
    alert('Share this link: ' + link);
    copyToClipboard(link);
}

function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function loadCodeFromLink(shortCode) {
    var storedCode = localStorage.getItem(shortCode);

    if (storedCode) {
        editor.setValue(storedCode);
    }
}

//////////////BRACKETS HIGHLIGHTING///////////////

function highlightMatchingBrackets() {
    var code = editor.getValue();

    // Bracket pairs
    var bracketPairs = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>',
    '|': '|',
    '"': '"',
    "'": "'"
        
    };

    var stack = [];
    var brackets = [];

    for (var i = 0; i < code.length; i++) {
        var char = code[i];

        if (bracketPairs.hasOwnProperty(char)) {
            stack.push({ char: char, index: i });
        }

        if (Object.values(bracketPairs).includes(char)) {
            if (stack.length > 0 && bracketPairs[stack[stack.length - 1].char] === char) {
                var openBracket = stack.pop();
                brackets.push({ open: openBracket.index, close: i });
            }
        }
    }

    for (var i = 0; i < brackets.length; i++) {
        var range = new ace.Range(brackets[i].open.row, brackets[i].open.column, brackets[i].close.row, brackets[i].close.column);
        editor.getSession().addMarker(range, 'bracket-highlight', 'text');
    }
}

highlightMatchingBrackets();

//////////////CODE FORMATTING//////////////

function formatCode() {
    var code = editor.getValue();
    var lines = code.split('\n');
    var currentIndentation = 0;
    var formattedCode = '';
    var bracketRegex = /[\{\[\(\}\]\)]/;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();

        var brackets = line.match(bracketRegex);

        if (brackets) {
            for (var j = 0; j < brackets.length; j++) {
                var bracket = brackets[j];

                if (['{', '[', '('].includes(bracket)) {
                    formattedCode += '    '.repeat(currentIndentation) + line + '\n';
                    currentIndentation++;
                } else {
                    currentIndentation = Math.max(0, currentIndentation - 1);
                    formattedCode += '    '.repeat(currentIndentation) + line + '\n';
                }
            }
        } else {
            formattedCode += '    '.repeat(currentIndentation) + line + '\n';
        }
    }

    editor.setValue(formattedCode);
}

formatCode();

//////////////////BACKUP CODE///////////////////

const backupInterval = 300000;
function backupCode() {
    const code = editor.getValue();
    const timestamp = new Date().toISOString();
    localStorage.setItem(`codeBackup_${timestamp}`, code);

    console.log(`Code backed up at ${timestamp}`);
}

function loadCodeFromLocalStorage() {
    const storedCode = localStorage.getItem('savedCode');
    if (storedCode) {
        editor.setValue(storedCode);
    }
}

const backupTimer = setInterval(backupCode, backupInterval);

loadCodeFromLocalStorage();
