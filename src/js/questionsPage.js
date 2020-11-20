const questionInputElement = document.querySelector('input:first-child')
const submitInputElement = document.querySelector('input[value="Submit"]')
const questionParent = document.querySelector('.questionParent')
const spanElement = document.querySelector('span')

const headers = new Headers()
headers.set("content-type", "application/json")

const WORD_LIMIT = 200

const createQuestionElement = (numVotes) => {
    const el = document.createElement('div')
    el.classList.add('question')
    el.classList.add('flex-row')
    el.innerHTML += `
                <div class='arrow-container'>
                    <button id='up-arrow-button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <span data-value="0" id="numVotes">${numVotes}</span>
                </div>
    `
    return el
}

const appendQuestionToHTML = (v, currentId, numVotes) => {
    const el = createQuestionElement(numVotes)
    el.setAttribute("data-value", `${currentId}`)
    el.innerHTML += `<p>${v}</p>`
    questionInputElement.value = ""
    questionParent.appendChild(el)

    const upArrow = el.childNodes[1].querySelector('#up-arrow-button')
    upArrow.addEventListener('click', (event) => {
        const questionParent = event.currentTarget.parentNode.parentNode
        const voteSpan = questionParent.querySelector('span')
        const currentId = questionParent.dataset.value
        fetch(`/questions/vote/${currentId}`, {
            headers,
            method: "POST",
            body: JSON.stringify({
                votes: parseInt(voteSpan.dataset.value)
            })
        })
            .then(() => {
                const newVoteCount = parseInt(voteSpan.dataset.value) + 1
                voteSpan.dataset.value = newVoteCount.toString()
                voteSpan.textContent = newVoteCount.toString()
            })
    })

}

const addQuestion = () => {
    //send question to server & database
    const currentId = (questionParent.childNodes.length === undefined) ? Number(0) :
                        questionParent.childNodes.length++
    fetch(`/questions/${currentId}`, {
        headers,
        method: "POST",
        body: JSON.stringify({
            questions: questionInputElement.value
        })
    })
        .then(() => {
            appendQuestionToHTML(questionInputElement.value, currentId)
            questionInputElement.removeAttribute('disabled')
            spanElement.textContent = '0'
            spanElement.dataset.value = '0'
        })
        .catch(err => console.log(err))

}

const processUserInput = (event) => {
    if(event.key === 'Enter') {
        if(questionInputElement.value.length !== 0)
            addQuestion()
        return
    }
    else if(event.key === 'Backspace') {
        if(parseInt(spanElement.dataset.value) !== 0)
            spanElement.dataset.value = parseInt(spanElement.dataset.value) - 1
    }
    else if(event.key.match(/[a-zA-Z0-9]/))
        spanElement.dataset.value = parseInt(spanElement.dataset.value) + 1

    spanElement.textContent = parseInt(spanElement.dataset.value)
    if(parseInt(spanElement.dataset.value) >= WORD_LIMIT)
        questionInputElement.toggleAttribute('disabled')
}

const main = () => {

    window.onload = () => {
        //fetch call to grab and reload questions
        fetch('/questions')
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(data => {
                data.forEach(d => appendQuestionToHTML(d.question, d.id, d.votes))
            })

        submitInputElement.addEventListener('click', addQuestion)

        questionInputElement.addEventListener('keydown', processUserInput)
    }

}

main()