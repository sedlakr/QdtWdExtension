// content.js
function convertTimeFormat(text, isSummary = false) {
  let regex;
  if (!isSummary) {
    regex = /^Hours:\s*(\d+)([,.](\d+))?/g
  }
  else {
    regex = /^(-?\d+)([,.](\d+))?/g
  }

  if (/\d+h \d+m/.test(text) || /-\d+h \d+m/.test(text)) { 
    return text; 
  }

  return text.replace(regex, (_match, hours, _separator, decimals) => {
    let minutes = decimals ? Math.round((parseInt(decimals) / Math.pow(10, decimals.length)) * 60) : 0;
    return `${hours}h ${minutes}m`;
  });
}

function updateTimes() {
  document.querySelectorAll('*').forEach(node => {
    if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
      let newText = convertTimeFormat(node.textContent);
      if (newText !== node.textContent) {
        node.textContent = newText;
      }
    }
  });

  document.querySelectorAll('[data-automation-id="summarizedListItemValue"]').forEach(node => {
    let newText = convertTimeFormat(node.textContent, true);
      if (newText !== node.textContent) {
        node.textContent = newText;
      }
  });

}
console.log("Running QdtWdExtension");
globalThis.updateTime = updateTimes;

setInterval(()=>{
	updateTimes();
}, 1000)
