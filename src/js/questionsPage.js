const questionInputElement = document.querySelector('input:first-child')
const questionParent = document.querySelector('.questionParent')
const spanElement = document.querySelector('span')

const main = () => {
    
    questionInputElement.addEventListener('keydown', (event) => {
        if(event.key === 'Backspace')
            spanElement.dataset.value = parseInt(spanElement.dataset.value) - 1
        else /*if(event.key.match(/[A-Z0-9]+/))*/
            spanElement.dataset.value = parseInt(spanElement.dataset.value) + 1

        spanElement.textContent = parseInt(spanElement.dataset.value)
        if(parseInt(spanElement.dataset.value) >= 10)
            questionInputElement.toggleAttribute('disabled')
    })

    document.querySelector('input[value="Submit"]').addEventListener('click', () => {
        const el = document.createElement('div')
        el.classList.add('question')
        el.textContent = questionInputElement.value
        questionInputElement.value = ""
        questionParent.appendChild(el)
        questionInputElement.removeAttribute('disabled')
        spanElement.textContent = '0'
        spanElement.dataset.value = '0'
    })

}

main()