const createBtn = document.getElementById('create-new-question-btn');
const hook = document.getElementById('create-questionnaire-hook');
const optionsList = document.getElementById('options-list');
const optionsLabel = document.getElementById('option-label');
const addOptionBtn = document.getElementById('add-option-btn');
const optionHook = document.getElementById('optionHook');
const options = [];
let optionCount = 0;
let questionCount = 0;



const questionTemplate = (questionCount) =>
    `
        <div class="questionnaireContainer" id="questionRow${questionCount}">

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
                            <div class="row">
                                <div class="col">
                                    <button id="add-option-btn${questionCount}" type="button" value='${questionCount}' class="btn addOptionBtn btn-block btn-success"
                                    id="create-new-option-button">Add
                                    option
                                    <i class="fa fa-plus"></i></button>
                                    </div>
                                    <div class="col">
                                    <button type="button" id="removeq${questionCount}" value="${questionCount}" class="btn questionRemoveBtn btn-danger">Delete question <i class="fa fa-minus-square"></i></button>
                                   </div>
                                </div>
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
    <div class='form-group row' id="optionRow${optionCount}">

    <div class='col'>
    <input class="form-control option-title" type='text' name='option[${questionCount}][${optionCount}]' id='optionq${questionCount}-o${optionCount}' value='${title}'>
    </div>

    <div class='col'>
    <input class="form-control option-hint" type='text' name='option[${questionCount}][${optionCount}]' id='hint-q${questionCount}-o${optionCount}' value='${hint}'>
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

    <div class='col'><button type="button" class="btn optionRemoveBtn btn-danger" value="${optionCount}" id="remove${optionCount}"><i class="fa fa-minus-square"></i></button></div>
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
    addDeleteQuestionFunctionality()
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
    addDeleteOptionFunctionality()
    optionCount++;
};

const addButtonOption = (btn, questionID) => {
    let html = document.createElement('div');
    html.innerHTML = questionTemplate(questionID);
    hook.appendChild(html);
    let newhook = document.getElementById(`optionHook${questionID}`);

    btn.addEventListener('click', () => {
        console.log("inside eventlistenter")
        addOption(newhook, btn.value);
    })

}

const addDeleteQuestionFunctionality = () => {
    const btn = document.getElementById(`removeq${questionCount}`)
    const row = document.getElementById(`questionRow${questionCount}`)
    console.log("removeBTn", btn)

    btn.addEventListener('click', () => {
        row.parentElement.removeChild(row)
    })
}

const addDeleteQuestionToBtn = (btn, questionCount) => {
    const row = document.getElementById(`questionRow${questionCount}`)
    console.log("removeBTn", btn)

    btn.addEventListener('click', () => {
        row.parentElement.removeChild(row)
    })
}

const addDeleteOptionFunctionality = () => {

    const btn = document.getElementById(`remove${optionCount}`)
    const row = document.getElementById(`optionRow${optionCount}`)
    console.log("removeBTn", btn)

    btn.addEventListener('click', () => {
        row.parentElement.removeChild(row)
    })

}

const addDeleteOptionToBtn = (btn, optionCount) => {
    // console.log("BTN => ", btn)
    // btn = document.getElementById(`remove${optionCount}`)
    const row = document.getElementById(`optionRow${optionCount}`)

    btn.addEventListener('click', () => {
        row.parentElement.removeChild(row)
    })

}



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

const applyButtonFunctionality = () => {

    const optionBtns = document.getElementsByClassName("optionRemoveBtn")
    const questionBtns = document.getElementsByClassName("questionRemoveBtn")
    const addBtns = document.getElementsByClassName("addOptionBtn")

    for (let i = 0; i < optionBtns.length; i++) {

        if (optionBtns[i].tagName === "BUTTON") {
            addDeleteOptionToBtn(optionBtns[i], i)
        }

    }


    for (let i = 0; i < questionBtns.length; i++) {
        if (questionBtns[i].tagName === "BUTTON") {
            addDeleteQuestionToBtn(questionBtns[i], i)
        }
    }


    for (let i = 0; i < addBtns.length; i++) {
        if (addBtns[i].tagName === "BUTTON") {
            console.log("add loop")
            // addButtonOption(addBtns[i], i)
        }
    }

    // console.log("optionBtns => ", optionBtns)
    // console.log("questionBtns =>   ", questionBtns)
    console.log("addBtns =>   ", addBtns)

}


window.onload = () => {

    const updateform = document.getElementById('update-form');
    if (updateform) {
        console.log("updateform")

        applyButtonFunctionality()

        updateform.onsubmit = (e) => {
            e.preventDefault();

            let rbuttons = document.getElementsByClassName('addOptionRbutton');
            for (let i in rbuttons) {
                console.log("rbutton => ", rbuttons[i])
                if (rbuttons[i].tagName === 'INPUT')
                    rbuttons[i].removeAttribute('name');
            }

            if (validate())
                e.currentTarget.submit();
        };
    }


    const createform = document.getElementById('create-form');
    if (createform) {
        console.log("createform")

        createform.onsubmit = (e) => {
            e.preventDefault();


            let validation = validate()
            if (validation === true) {

                let rbuttons = document.getElementsByClassName('addOptionRbutton');
                for (let i in rbuttons) {
                    if (rbuttons[i].tagName === 'INPUT')
                        rbuttons[i].removeAttribute('name');
                }

                e.currentTarget.submit();
            } else {
                console.log(validation)
            }
        };
    }
};


// TODO: Validate form input
const validate = () => {

    let options = document.getElementsByClassName("option-title")

    for (let i in options) {
        console.log(options[i].value)
    }

    let error = ""
    if (error) {
        return error
    }
    return false
}
