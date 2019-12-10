const createBtn = document.getElementById("create-new-question-btn")
const hook = document.getElementById("create-questionnaire-hook")
const optionsList = document.getElementById("options-list")
let optionCount = 0

const questionnaireTemplate =
    `
 <div class='form-group'>
    <input class='form-control' type='text' name='question-title' id='question-title'>
    <div id='create-option-hook'>
    </div>
 </div>
`

const optionTemplate =
    `
    <div class='form-group'>
        <input type='text' name='option${optionCount}' id='option${optionCount}'>
    </div>
    `

createBtn.addEventListener('click', () => {
    console.log(hook)
    let html = document.createElement('div')
    html.innerHTML = questionnaireTemplate
    hook.appendChild(html)
})
