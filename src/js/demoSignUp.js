const demoInputElement = document.querySelector('input:first-child');
const demoParent = document.querySelector('.demoParent');

const main = () => {
    document.querySelector('input[value="Submit"]').addEventListener('click', () => {
        const el = document.createElement('li');
        el.classList.add('li');
        el.textContent = demoInputElement.value;
        demoInputElement.value = "";
        demoParent.appendChild(el);
        demoInputElement.removeAttribute('disabled');
    })

}

main();
