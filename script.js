// Get the HTML elements from the DOM
const paragraph = document.getElementById('paragraph');
const output = document.getElementById('output');
const convertBtn = document.getElementById('convert-btn');
const previewBtn = document.getElementById('preview-btn');
const downloadBtn = document.getElementById('download-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');

// Convert Paragraph to Blockquotes HTML Function

function convertToBlockQuotes() {
    // Get the input paragraph from the text area
    const inputParagraph = paragraph.value;

    if (inputParagraph === '') {
        // Show an error message if the input paragraph is empty
        alert('Please enter a paragraph before converting.');
        return;
    }

    // Split the paragraph into separate lines
    const lines = inputParagraph.split(/\r?\n/);

    // Create an empty string to hold the HTML output
    let html = '';

    // Loop through each line and wrap it in a blockquote element
    lines.forEach(line => {
        html += `<blockquote class="wp-block-quote">\n`;
        html += `  <p class="has-text-align-center">${line}</p>\n`;
        html += `</blockquote>\n`;
    });

    // Set the HTML output to the output div
    output.innerHTML = html;

    // Show a success message
    alert('Converted Successfully!');
}

// Preview HTML Codes Function
function previewHtmlCodes() {
    // Get the HTML output from the output div
    const html = output.innerHTML;

    if (html === '') {
        // Show an error message if the HTML output is empty
        alert('Please convert a paragraph to HTML before previewing.');
        return;
    }

    // Open a new window/tab and display the HTML output
    const previewWindow = window.open();
    previewWindow.document.write(`
        <html>
            <head>
                <title>HTML Output Preview</title>
            </head>
            <body>
                <h2>HTML Output Preview</h2>
                <pre>${output.innerHTML}</pre>
            </body>
        </html>
    `);
}

// Download HTML Function
function downloadHtml() {
    // Get the HTML output from the output div
    const html = output.innerHTML;
	
    if (html === '') {
    	// Show an error message if the HTML output is empty
        alert('Please convert a paragraph to HTML before downloading.');
        return;
    }
    // Create a new blob with the HTML content and set the MIME type to text/plain
    const blob = new Blob([html], { type: 'text/plain' });

    // Create a new URL with the blob data
    const url = URL.createObjectURL(blob);

    // Create a new link element and set its properties
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BlockQuotes.html';

    // Append the link element to the document body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Remove the link element from the document body and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show a success message
    alert('Downloaded Successfully!');
}

// Copy HTML Function
function copyHtml() {
    // Get the HTML output from the output div
    const html = output.innerHTML;
	
    if (html === '') {
        // Show an error message if the HTML output is empty
        alert('Please convert a paragraph to HTML before copying.');
        return;
    }
	
    // Create a new textarea element and set its properties
    const textarea = document.createElement('textarea');
    textarea.value = html;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Append the textarea element to the document body and select its contents
    document.body.appendChild(textarea);
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');
    
    // Remove the textarea element from the document body
    document.body.removeChild(textarea);

    // Show a success message
    alert('HTML Output Copied to Clipboard!');
}

// Clear Function
function clearOutput() {
    // Clear the input paragraph and the HTML output
    paragraph.value = '';
    output.innerHTML = '';
	// Show a success message
    alert('Output Cleared!');
}

// Toggle Dark Mode Function
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}
// Add Event Listeners to the Buttons
convertBtn.addEventListener('click', convertToBlockQuotes);
previewBtn.addEventListener('click', previewHtmlCodes);
downloadBtn.addEventListener('click', downloadHtml);
copyBtn.addEventListener('click', copyHtml);
clearBtn.addEventListener('click', clearOutput);
darkModeBtn.addEventListener('click', toggleDarkMode);

function countWordsAndChars() {
  const inputParagraph = paragraph.value;
  const wordCount = inputParagraph.trim().split(/\s+/).filter(Boolean).length;
  const charCount = inputParagraph.length;
  const wordCountSpan = document.getElementById('word-count');
  const charCountSpan = document.getElementById('char-count');
  wordCountSpan.textContent = `${wordCount} ${wordCount === 1 ? 'word' : 'words'}`;
  charCountSpan.textContent = `| ${charCount} ${charCount === 1 ? 'character' : 'characters'}`;
  // Add CSS styles to the word and character count
  wordCountSpan.style.fontWeight = 'bold';
  wordCountSpan.style.color = '#4285f4';
  wordCountSpan.style.marginTop = '10px';
  wordCountSpan.style.marginLeft = '5px';
  charCountSpan.style.fontWeight = 'bold';
  charCountSpan.style.color = '#4caf50';
  charCountSpan.style.marginTop = '10px';
  charCountSpan.style.marginLeft = '5px';
}

paragraph.addEventListener('input', () => {
    countWordsAndChars();
});