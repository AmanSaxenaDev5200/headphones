const headphones = [];
console.log('yo');
async function loadHeadphones() {
    const response = await fetch('https://raw.githubusercontent.com/yd24/cf-project/main/tool/headphones.json');
    const names = await response.json();
    console.log(names);
}

loadHeadphones();