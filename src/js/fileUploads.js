const wholeTable = document.querySelector("tbody")
const template = document.getElementById("tableTemplate")

const convertToElements = (info) => {
    for (let key in info){
        let clone = template.content.cloneNode(true)
        let entries = clone.querySelectorAll("td")
        let button = clone.querySelector("a")
        entries[0].textContent = info[key].filename
        entries[1].textContent = info[key].mimetype
        entries[2].textContent = parseInt(info[key].size) / 1000
        button.setAttribute("href", `http://localhost:8080/downloadFile/${info[key].filename}`)
        
        wholeTable.appendChild(clone)
    }
}

window.onload = () => {
    fetch(`http://localhost:8080/getAllFiles`)
        .then((response) => (response.ok ? response.json() : Promise.reject()))
        .then((data) => {
            convertToElements(data)
        })
}