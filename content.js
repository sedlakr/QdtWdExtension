
// content.js
function convertTimeFormat(text) {
  const regex = /Hours:\s*(\d+)(,(\d))?/g;
  return text.replace(regex, (match, hours, decimals) => {
    let minutes = Math.round((parseInt(decimals) / 10) * 60);
	if(Number.isNaN(minutes)){
		minutes=0;
	}
    return `${hours}h ${minutes}m`;
  });
}

function updateTimes() {
  document.querySelectorAll('*').forEach(node => {
    if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
		debugger;
      let newText = convertTimeFormat(node.textContent);
      if (newText !== node.textContent) {
        node.textContent = newText;
      }
    }
  });
}
console.log("running script");
globalThis.updateTime = updateTimes;

setInterval(()=>{
	updateTimes();
}, 1000)