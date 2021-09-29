const taskList = document.getElementById('task_list');
const descrInput = document.getElementById('task_description_input');
const dateInput = document.getElementById('duedate_input');
const timeInput = document.getElementById('duetime_input');
const addTaskBtn = document.getElementById('add_task');

addTask('Learn to wrap gifts', 1639944400000);
addTask('Set clock backward for DST', 1636304400000);

addTaskBtn.addEventListener('click', addTaskFromInput); // make the "Add Task" button work

descrInput.addEventListener('keydown', function(e){ // adding a keyboard shortcut
    if(e.key === 'Enter'){
        addTaskFromInput();
    }
});

function addTask(description, dueTime=null){ // adding to-do items
    const item = document.createElement('li');
    taskList.append(item);
    item.textContent = description;

    if(dueTime){
        const due = document.createElement('span');
        item.append(due);
        due.classList.add('due');
        const date = new Date(dueTime);
        let hour = date.getHours();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        due.textContent = 'due ' + (date.getMonth()+1) + '/' + date.getDate() + 
        '/'+date.getFullYear() + ' ' + hour + ':' + min + ':' + sec + ' ' + ampm;
    }

    const btn = document.createElement('button');
    item.append(btn);
    btn.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'done');
    btn.setAttribute('type', 'button')
    btn.textContent = 'Done';
    btn.addEventListener('click', () => {
        item.remove();
    });
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime!=null) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function addTaskFromInput(){
    addTask(descrInput.value, dateAndTimeToTimestamp(dateInput, timeInput));
    descrInput.value = ''; // clearing the task description input element
}
