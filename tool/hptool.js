const headphones = [];
console.log('yo');
async function loadHeadphones() {
    const response = await fetch('./headphones.json');
    const names = await response.json();
    console.log(names);
}

loadHeadphones();