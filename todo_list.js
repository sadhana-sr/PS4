function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return ' ';
    }
}

function addTask(description, dueTime){
    //description = string : task description
    //dueTime = boolean : True (due date timestamp) or False
    clickcount++;

    task_list = document.getElementById('task_list')
    let i = document.createElement('li')
    i.innerHTML=description.value+'<span class="due">' +dueTime+'</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button>'
    
    //document.getElementsByClassName("due").innerHTML = 'yea'
    //console.log(dueTime.value)
    task_list.append(i)

    console.log(clickcount)
    if (clickcount>0){
        description.value=''
    }

    console.log(task_list)

    //const done_button = document.querySelectorAll('button.done')
    //console.log(done_button)
    //console.log(done_button.length)

    let done_button = document.querySelector('button.done')
    
    done_button.addEventListener('click', () => {
        i.remove()
    })
    
    
}

const desc = document.getElementById('task_description_input');
const dt = document.getElementById('duetime_input');
const dd = document.getElementById('duedate_input');




const add_task_button = document.getElementById('add_task'); //add task button

add_task_button.addEventListener('click',() => {
    const date_time = new Date(dateAndTimeToTimestamp(dd, dt))//.toLocaleDateString("en-US") //converts the unix time to regular time
    let yyyy = (date_time.getFullYear())
    let mm = ( 1+ date_time.getMonth())
    let date = (date_time.getDate())

    let hours = date_time.getHours();
    let minutes = "0" + date_time.getMinutes();
    let seconds = "0" + date_time.getSeconds();
    let ampm = ' AM';
    if (hours>12){
        let ampm = ' PM'
    }

    if (ampm = ' PM'){
        hours = hours-12
    }

    var formatted_date_time = 'due '+mm+'/'+date+'/'+yyyy+' '+hours+":"+minutes+":"+seconds+ampm
    console.log(formatted_date_time)
    if(formatted_date_time.includes('due NaN/NaN/NaN NaN:0NaN:0NaN')){
        formatted_date_time=' '
    }

    addTask(desc, formatted_date_time);
}) //run the function when the task button is clicked

desc.addEventListener('keypress',() => {
    if (event.key === 'Enter'){
        const date_time = new Date(dateAndTimeToTimestamp(dd, dt))//.toLocaleDateString("en-US") //converts the unix time to regular time
        let yyyy = (date_time.getFullYear())
        let mm = ( 1+ date_time.getMonth())
        let date = (date_time.getDate())
    
        let hours = date_time.getHours();
        let minutes = "0" + date_time.getMinutes();
        let seconds = "0" + date_time.getSeconds();
        let ampm = ' AM';
        if (hours>12){
            let ampm = ' PM'
        }
    
        if (ampm = ' PM'){
            hours = hours-12
        }
    
        var formatted_date_time = 'due '+mm+'/'+date+'/'+yyyy+' '+hours+":"+minutes+":"+seconds+ampm
        addTask(desc, formatted_date_time);
    
    }
}) //run the function when the enter buttons pressed

let clickcount = 0; // click count to know when to clear the input field
