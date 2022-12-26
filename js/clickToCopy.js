const button = document.querySelector('.email');

const clickToCopy = (e) => {
  e.preventDefault();
  copyToClipboard("hi@juanmartingarcia.com");
  e.target.textContent = 'Copied!';
  e.target.classList.remove('underline');
  setTimeout(() => { e.target.textContent = 'email'; e.target.classList.add('underline') }, 1600);
}

// Copy to clipboard function, taken from https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript/
const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}

button.addEventListener('click', clickToCopy);