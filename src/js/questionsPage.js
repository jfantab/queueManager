const questionInputElement = document.querySelector('input:first-child')
const submitQuestionElement = document.querySelector('#submitQuestion')
const nameInputElement = document.querySelector('#nameInput')
const labsSelector = document.querySelector('#labsSelector')
const labsFilter = document.querySelector('#labsFilter')
const clearLabsFilter = document.querySelector('#clearFilter')

const questionParent = document.querySelector('#questionParent')
const spanElement = document.querySelector('span')

const linkParent = document.querySelector('#links')
const linkInput = document.querySelector('#linkInput input:first-child')
const submitLinkElement = document.querySelector('#submitLink')

const questionErrorMessage = document.querySelector('#question-error')
const linkErrorMessage = document.querySelector('#link-error')

const headers = new Headers()
headers.set("content-type", "application/json")

const WORD_LIMIT = 200
let currentLab = "Choose"

/* FUNCTIONS TO CONTACT SERVER AND UPDATE FRONTEND */

const renderQuestions = (data) =>
    data.forEach(d => questionParent.appendChild(createQuestionElement(d)))

const getAllQuestions = () =>
    fetch('/questions')
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
            questionErrorMessage.style.visibility = "hidden"
            renderQuestions(data)
        })

const getAllLinks = () =>
    fetch('/links')
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => data.forEach(d => createLinkElement(d)))

const deleteQuestion = (id) => {
    fetch(`/questions/delete/${id}`, {
        headers,
        method: 'DELETE'
    })
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
            questionParent.innerHTML = ""
            renderQuestions(data)
        })
}

const createQuestionElement = (d) => {
    const text = d.question
    const currentId = d.id
    const numVotes = d.votes
    const name = d.name
    const lab = d.lab
    const highlighted = d.highlighted
    const el = document.createElement('div')
    el.classList.add('question')
    el.classList.add('flex-row')
    el.setAttribute('data-value', currentId.toString())
    el.innerHTML += `
                     <div class='arrow-container flex-column'>
                         <div class="labId flex-column">
                            <p>Lab ${lab}</p>
                         </div>
                         <p><strong>${name}:</strong></p>
                        <button id='up-arrow-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                        <span data-value=${numVotes.toString()} id="numVotes">${numVotes}</span>
                     </div>
                     <div class="question-text">
                        <p>${text}</p>
                     </div>
                     <button class="clear-question">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                        </svg>
                     </button>
    `

    el.style.backgroundColor = (highlighted) ? '#ffff00' : '#ffffff'
    if(highlighted)
        el.querySelector('.clear-question').toggleAttribute('disabled')

    el.querySelector('#up-arrow-button').addEventListener('click', handleUpvote)
    el.querySelector('.clear-question').addEventListener('click', () => highlightQuestion(el))
    return el
}

const createLinkElement = (data) => {
    let l = new URL(data.link)
    const el = document.createElement('div')
    el.classList.add('flex-row')
    el.classList.add('link')
    el.innerHTML += `
        <a href=${l} target="_blank">${l}</a>
    `
    linkParent.appendChild(el)
}

const addQuestionToServer = (name, lab) => {
    //send question to server & database
    const currentId = (questionParent.childNodes.length === undefined) ? Number(0) :
        ++questionParent.childNodes.length
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
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
            questionErrorMessage.style.visibility = "hidden"
            questionParent.appendChild(createQuestionElement(data))

            questionInputElement.removeAttribute('disabled')
            questionInputElement.value = ""

            spanElement.textContent = '0'
            spanElement.dataset.value = '0'
        })
        .catch(err => {
            console.log(err)
            questionErrorMessage.style.visibility = "visible"
        })

}

const highlightQuestion = (el) => {
    const isHighlighted = el.style.backgroundColor === "#ffff00"
    fetch(`/questions/highlight/${el.dataset.value}`, {
        headers,
        method: "POST",
        body: JSON.stringify({
            highlighted: (!isHighlighted)
        })
    })
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
            el.style.backgroundColor = (!data.highlighted) ? '#ffffff' : '#ffff00'
            if(isHighlighted)
                el.querySelector('.clear-question').toggleAttribute('disabled')
        })
        .catch(err => console.log(err))

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
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
            const newVoteCount = parseInt(data.votes)
            voteSpan.dataset.value = newVoteCount.toString()
            voteSpan.textContent = newVoteCount.toString()
        })
        .catch(err => console.log(err))
}

const addLinkToServer = () => {
    const _link = linkInput.value
    fetch(`/links`, {
        headers,
        method: "POST",
        body: JSON.stringify({
            link: _link
        })
    })
        .then(response => response.ok ? response.json() : Promise.reject()) //TODO — unexpected token L in position 0
        .then(data => {
            linkErrorMessage.style.visiblity = "hidden"
            createLinkElement(data)
            linkInput.value = ""
        })
        .catch(err => {
            console.log(err)
            linkErrorMessage.style.visibility = "visible"
        })
}

/* EVENT LISTENERS AND ASSOCIATED HELPER FUNCTIONS */

const processUserQuestion = (event) => {
    if (event.key === 'Enter') {
        if (questionInputElement.value !== "" &&
            nameInputElement.value !== "" &&
            labsSelector.value !== "Choose")
            finalizeInput()
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
        labsSelector.value !== "Choose")
        finalizeInput()
}

const filterLabs = () => {
    if(labsFilter.value !== "Choose") {
        currentLab = labsFilter.value
        fetch(`/questions/${currentLab}`)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(data => {
                questionParent.innerHTML = ""
                renderQuestions(data)
            })
    }
    else
        clearLabs()
}

const clearLabs = () =>{
    questionParent.innerHTML = ""
    labsFilter.value = "Choose"
    currentLab = labsFilter.value
    getAllQuestions()
}

const finalizeInput = () => {
    if (questionInputElement.value !== "" &&
        nameInputElement.value !== "" &&
        labsSelector.value !== "Choose") {
        addQuestionToServer(nameInputElement.value, labsSelector.value)
        questionInputElement.value = ""
        nameInputElement.value = ""
    }
}

/* MAIN */

const main = () => {

    window.onload = () => {
        //fetch call to grab and reload questions
        getAllQuestions()

        getAllLinks()

        submitQuestionElement.addEventListener('click', finalizeInput)

        nameInputElement.addEventListener('keydown', associateNameWithQuestion)

        questionInputElement.addEventListener('keydown', processUserQuestion)

        labsFilter.addEventListener('click', filterLabs)

        clearLabsFilter.addEventListener('click', clearLabs)

        submitLinkElement.addEventListener('click', addLinkToServer)

        linkInput.addEventListener('keydown', (event) => {
            if(event.key === "Enter")
                addLinkToServer()
        })

        setInterval(() => {
            questionParent.innerHTML = "";
            (currentLab === "Choose") ? getAllQuestions() : filterLabs()
        }, 5000)

    }

}

main()