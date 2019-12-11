const createBtn = document.getElementById("create-new-question-btn")
const hook = document.getElementById("create-questionnaire-hook")
const optionsList = document.getElementById("options-list")
const optionsLabel = document.getElementById("option-label")
const addOptionBtn = document.getElementById("add-option-btn")
const optionHook = document.getElementById("optionHook")
const options = []
let optionCount = 0


if (optionCount == 0) {
    optionsLabel.innerHTML = "<h4>Options: </h4><span>No options added yet</span>"
}


const questionnaireTemplate =
    `
 <div class='form-group'>
    <input class='form-control' type='text' name='question-title' id='question-title'>
    <div id='create-option-hook'>
    </div>
 </div>
`

const optionTemplate = ({
    title,
    hint,
    selected
}) => {

    // for templateLiteral
    let t = "true"
    let f = "false"

    return `
    <div class='form-group row'>

    <div class='col'>
    <input class="form-control" type='text' name='option${optionCount}' id='option${optionCount}' value='${title}'>
    </div>

    <div class='col'>
    <input class="form-control" type='text' name='hint${optionCount}' id='hint${optionCount}' value='${hint}'>
    </div>


    <div class='col'>
    <input type='radio' name='r${optionCount}' value='true' checked='${!selected?t:f}' >
    <label for='r-${optionCount}'> True</label>

    <input type='radio' name='r${optionCount}' value='false' checked='${selected?t:f}'>
    <label for='r-${optionCount}'> False</label>
    </div>

    </div>
    `
}

createBtn.addEventListener('click', () => {
    let html = document.createElement('div')
    html.innerHTML = questionnaireTemplate
    hook.appendChild(html)
})


addOptionBtn.addEventListener('click', () => {
    console.log("adding option")
    let values = getValues()
    console.log("Values ", values)
    let html = document.createElement("div")
    html.innerHTML = optionTemplate(values)
    optionHook.appendChild(html)
    optionCount++;
    optionsLabel.innerHTML = "<h4>Options: </h4>"

})

const getValues = () => {
    const optionTitle = document.getElementById("option-input")
    const hint = document.getElementById("hint")
    const radioButtons = document.getElementsByName("optionRadio")
    console.log(radioButtons)
    let radioBtn

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            radioBtn = radioButtons[i]
        }
    }

    return {
        title: optionTitle.value,
        hint: hint.value,
        selected: radioBtn.checked
    }
}
