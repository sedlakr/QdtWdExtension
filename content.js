
// content.js
function convertTimeFormat(text) {
  const regex = /Hours:\s*(\d+)([,.](\d+))?/g;
  return text.replace(regex, (_match, hours, _separator, decimals) => {
    let minutes = Math.round((parseInt(decimals) / Math.pow(10, decimals.length)) * 60);
	if(Number.isNaN(minutes)){
		minutes=0;
	}
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
}
console.log("Running QdtWdExtension");
globalThis.updateTime = updateTimes;

setInterval(()=>{
	updateTimes();
}, 1000)
