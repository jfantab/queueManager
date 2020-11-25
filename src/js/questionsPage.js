const questionInputElement = document.querySelector('input:first-child')
const submitInputElement = document.querySelector('input[value="Submit"]')
const nameInputElement = document.querySelector('#nameInput')
const labsSelector = document.querySelector('#labsSelector')
const labsFilter = document.querySelector('#labsFilter')
const clearLabsFilter = document.querySelector('#clearFilter')

const questionParent = document.querySelector('#questionParent')
const spanElement = document.querySelector('span')

const headers = new Headers()
headers.set("content-type", "application/json")

const WORD_LIMIT = 200
let currentLab = "Choose"

const createQuestionElement = (text, currentId, numVotes, name, lab) => {
    const el = document.createElement('div')
    el.classList.add('question')
    el.classList.add('flex-row')
    el.setAttribute('data-value', currentId.toString())
    el.innerHTML += `
                     <div class='arrow-container'>
                        <button id='up-arrow-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                        <span data-value=${numVotes.toString()} id="numVotes">${numVotes}</span>
                     </div>
                     <div class="labId flex-column">
                        <p>Lab ${lab}</p>
                     </div>
                     <h5>${name}:</h5>
                     <div class="question-text flex-row">
                        <p>${text}</p>
                     </div>
                     <button id="clear-question">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                        </svg>
                     </button>
    `

    el.querySelector('#up-arrow-button').addEventListener('click', handleUpvote)
    el.querySelector('#clear-question').addEventListener('click', () => {
        el.style.backgroundColor = '#FFFF00'
        el.querySelector('#clear-question').toggleAttribute('disabled')
    })
    return el
}

const handleUpvote = (event) => {
    const questionParent = event.currentTarget.parentNode.parentNode
    const voteSpan = questionParent.querySelector('span')
    const currentId = parseInt(questionParent.dataset.value)
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
}

const addQuestionToServer = (name, lab) => {
    //send question to server & database
    const currentId = (questionParent.childNodes.length === undefined) ? Number(0) :
        questionParent.childNodes.length++
    const text = questionInputElement.value
    fetch(`/questions/${currentId}`, {
        headers,
        method: "POST",
        body: JSON.stringify({
            lab: lab,
            name: name,
            questions: text
        })
    })
        .then(() => {
            questionParent.appendChild(createQuestionElement(text, currentId, 0, name, lab))

            questionInputElement.removeAttribute('disabled')
            questionInputElement.value = ""

            spanElement.textContent = '0'
            spanElement.dataset.value = '0'
        })
        .catch(err => console.log(err))

}

const processUserInput = (event) => {
    if (event.key === 'Enter') {
        if (questionInputElement.value !== "" && nameInputElement.value !== "")
            associateNameWithQuestion(event)
        return
    } else if (event.key === 'Backspace') {
        if (parseInt(spanElement.dataset.value) !== 0)
            spanElement.dataset.value = parseInt(spanElement.dataset.value) - 1
    } else if (event.key.match(/[a-zA-Z0-9]/))
        spanElement.dataset.value = parseInt(spanElement.dataset.value) + 1

    spanElement.textContent = parseInt(spanElement.dataset.value)
    if (parseInt(spanElement.dataset.value) >= WORD_LIMIT)
        questionInputElement.toggleAttribute('disabled')
}

const associateNameWithQuestion = (event) => {
    if (questionInputElement.value !== "" &&
        event.key === 'Enter' &&
        labsSelector.value !== "Choose") {

        addQuestionToServer(nameInputElement.value, labsSelector.value)
        nameInputElement.value = ""
        labsSelector.value = "Choose"

    }
}

const renderAllOrFiltered = (d) =>
    questionParent.appendChild(createQuestionElement(d.question, d.id, d.votes, d.name, d.lab))


const getQuestions = () => {
    fetch('/questions')
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => data.forEach(d => renderAllOrFiltered(d)))
}

const filterLabs = () => {
    if(labsFilter.value !== "Choose") {
        currentLab = labsFilter.value
        fetch(`/questions/${currentLab}`)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(data => {
                questionParent.innerHTML = ""
                data.forEach(d => renderAllOrFiltered(d))
            })
    }
}

const main = () => {

    window.onload = () => {
        //fetch call to grab and reload questions
        getQuestions()

        submitInputElement.addEventListener('click', () => {
            if (questionInputElement.value !== "" &&
                nameInputElement.value !== "" &&
                labsSelector.value !== "Choose") {

                addQuestionToServer(nameInputElement.value, labsSelector.value)
                questionInputElement.value = ""
                nameInputElement.value = ""

            }
        })

        nameInputElement.addEventListener('keydown', associateNameWithQuestion)

        questionInputElement.addEventListener('keydown', processUserInput)

        labsFilter.addEventListener('click', filterLabs)

        clearLabsFilter.addEventListener('click', () =>{
            questionParent.innerHTML = ""
            labsFilter.value = "Choose"
            currentLab = labsFilter.value
            getQuestions()
        })

        setInterval(() => {
            questionParent.innerHTML = "";
            (currentLab === "Choose") ? getQuestions() : filterLabs()
        }, 5000)
    }

}

main()