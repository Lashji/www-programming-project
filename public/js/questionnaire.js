const createBtn = document.getElementById('create-new-question-btn');
const hook = document.getElementById('create-questionnaire-hook');
const optionsList = document.getElementById('options-list');
const optionsLabel = document.getElementById('option-label');
const addOptionBtn = document.getElementById('add-option-btn');
const optionHook = document.getElementById('optionHook');
const options = [];
let optionCount = 0;
let questionCount = 0;

if (optionCount == 0) {
    optionsLabel.innerHTML =
        '<h4>Options: </h4><span>No options added yet</span>';
}

addOptionBtn.addEventListener('click', () => {
    addOption(optionHook, addOptionBtn.value);
});

const questionTemplate = (questionCount) =>
    `
        <div class="questionnaireContainer">

            <label for="questiontitle">Question title: </label>
            <input class='form-control' type='text' name='questiontitle[${questionCount}]' id='question-title'>

            <label for="points${questionCount}}">Max points: </label>
                <input class="form-control" type="number" id="points${questionCount}" name="points[${questionCount}]" required>

            <div class="form-group">
                <label id="option-label" for="options-list">Options:</label>
                <ul id="optionHook${questionCount}" name="options-list" class="list-group">

                </ul>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="form-group">
                        <div id='create-option-hook'>
                            <label for="option">Option: </label>
                            <input id="option-input${questionCount}" class="form-control" type="text" required>
                            <label for="hint">Hint (optional): </label>
                            <input class="form-control" type="text" id="hint${questionCount}">
                            <input class="radio-inline addOptionRbutton" value="true" type="radio" name="optionRadio${questionCount}"
                                id="optionRadio-true" checked="true" required>
                            <label for="optionRadio-true">True</label>
                            <input class="radio-inline addOptionRbutton" value="false" type="radio" name="optionRadio${questionCount}"
                                id="optionRadio-false" required>
                            <label for="optionRadio-false">False</label>
                            <button id="add-option-btn${questionCount}" type="button" value='${questionCount}' class="btn btn-block btn-success"
                                id="create-new-option-button">Add
                                option
                                <i class="fa fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;

const optionTemplate = ({
    title,
    hint,
    selected
}) => {
    // for templateLiteral
    let selectedTrue = selected === 0;

    return `
    <div class='form-group row'>

    <div class='col'>
    <input class="form-control" type='text' name='option[${questionCount}][${optionCount}]' id='optionq${questionCount}-o${optionCount}' value='${title}'>
    </div>

    <div class='col'>
    <input class="form-control" type='text' name='option[${questionCount}][${optionCount}]' id='hint-q${questionCount}-o${optionCount}' value='${hint}'>
    </div>


    <div class='col'>
    <input type='radio' name='option[${questionCount}][${optionCount}]' value='true' ${
        selectedTrue ? 'checked=true' : ''
    } >
    <label for='r-${optionCount}'> True</label>

    <input type='radio' name='option[${questionCount}][${optionCount}]' value='false' ${
        !selectedTrue ? 'checked=true' : ''
    }>
    <label for='r-${optionCount}'> False</label>
    </div>

    <div class='col'><button type="button" class="btn btn-danger" id="remove${questionCount}"><i class="fa fa-minus-square"></i></button></div>
    </div>
    `;
};

createBtn.addEventListener('click', () => {
    questionCount++;

    let html = document.createElement('div');
    html.innerHTML = questionTemplate(questionCount);
    hook.appendChild(html);
    let newBtn = document.getElementById(`add-option-btn${questionCount}`);
    let newhook = document.getElementById(`optionHook${questionCount}`);

    newBtn.addEventListener('click', () => {
        addOption(newhook, newBtn.value);
    });
});

const addOption = (hook, questionId) => {
    console.log('adding option');
    let values = getValues(questionId);
    let html = document.createElement('div');
    html.innerHTML = optionTemplate(values);
    hook.appendChild(html);
    optionCount++;
    optionsLabel.innerHTML = '<h4>Options: </h4>';
};

const getValues = (questionId) => {
    console.log('question id: ', questionId);
    let optionTitle = document.getElementById(`option-input${questionId}`);
    let hint = document.getElementById(`hint${questionId}`);
    let radioButtons = document.getElementsByName(`optionRadio${questionId}`);
    let radioBtn;

    // TODO: Fix this at some point. Im checking the radiobutton check twice
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            radioBtn = radioButtons[i];
        }
    }

    return {
        title: optionTitle.value,
        hint: hint.value,
        selected: radioButtons[0].checked ? 0 : 1,
    };
};

window.onload = () => {
    const form = document.getElementById('create-form');

    form.onsubmit = (e) => {
        e.preventDefault();

        let rbuttons = document.getElementsByClassName('addOptionRbutton');
        for (let i in rbuttons) {
            if (rbuttons[i].tagName === 'INPUT')
                rbuttons[i].removeAttribute('name');
        }

        e.currentTarget.submit();
    };
};
