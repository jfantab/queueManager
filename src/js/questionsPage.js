const questionInputElement = document.querySelector('input:first-child')
const submitInputElement = document.querySelector('input[value="Submit"]')
const questionParent = document.querySelector('.questionParent')
const spanElement = document.querySelector('span')

const WORD_LIMIT = 200

const createQuestionElement = () => {
    const el = document.createElement('div')
    el.classList.add('question')
    el.classList.add('flex-row')
    return el
}

const appendQuestionToHTML = (v) => {
    const el = createQuestionElement()
    el.innerHTML += `<p>${v}</p>`
    questionInputElement.value = ""
    questionParent.appendChild(el)
}

const addQuestion = () => {
    const headers = new Headers()
    headers.set("content-type", "application/json")

    //send question to server & database
    fetch('/questions', {
        headers,
        method: "POST",
        body: JSON.stringify({
            questions: questionInputElement.value
        })
    })
        .then(() => {
            appendQuestionToHTML(questionInputElement.value)
            questionInputElement.removeAttribute('disabled')
            spanElement.textContent = '0'
            spanElement.dataset.value = '0'
        })
        .catch(err => console.log(err))

}

const main = () => {

    window.onload = () => {
        //fetch call to grab and reload questions
        fetch('/questions')
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(data => {
                data.forEach(d => appendQuestionToHTML(d))
            })
            .then(() => {

                questionInputElement.addEventListener('keydown', (event) => {
                    if(event.key === 'Enter') {
                        if(questionInputElement.value.length !== 0)
                            addQuestion()
                        return
                    }
                    else if(event.key === 'Backspace')
                        spanElement.dataset.value = parseInt(spanElement.dataset.value) - 1
                    else if(event.key.match(/[a-zA-Z0-9]/))
                        spanElement.dataset.value = parseInt(spanElement.dataset.value) + 1

                    spanElement.textContent = parseInt(spanElement.dataset.value)
                    if(parseInt(spanElement.dataset.value) >= WORD_LIMIT)
                        questionInputElement.toggleAttribute('disabled')
                })

                submitInputElement.addEventListener('click', addQuestion)

            })
    }

}

main()