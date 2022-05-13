const addButton = document.querySelector("#add_button");

//function declaration for using local storage
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];   //empty array for storing/upadting data
    console.log(notes);
    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })
    console.log(notes);
    
    //for adding data to localStorage = setItem()
    //for getting data from localStorage = getItem()
    localStorage.setItem('notes', JSON.stringify(notes));
    //JSON.stringify used for converting...
    //array into string or JSON format.
    
    // BECAUSE you cannot store array or object inside local storage
    // it requires data as string type

}


//function for adding new note
const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="newNote" >
        <div class="operation">
            <button class="update"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="main ${ text ? "" : "hidden" } "> </div>
        <textarea class="${ text ? "hidden" : "" } "> </textarea>
        
    </div> `;

    note.insertAdjacentHTML('afterbegin', htmlData);
    document.body.appendChild(note);
    //appendChild -> appends the last child of a node


    //getting refrences of all operation buttons or functionalities
    const editButton = note.querySelector('.update');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    //deleting the node
    delButton.addEventListener('click', () => {
        note.remove(note);
        updateLSData();
    } );

    //toggle between main and textarea using update/edit button

    textarea.value = text;
    mainDiv.innerHTML = text;

        editButton.addEventListener('click', () => {
        mainDiv.classList.toggle ('hidden');
        textarea.classList.toggle ('hidden');
    });

    textarea.addEventListener('change', (event)=> {
            const value = event.target.value;
            mainDiv.innerHTML = value;

            //for updating/saving into local storage
            updateLSData();
    });

    

}



//getting previous saved data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

//loop for converting/set data into individual notes
if(notes) { notes.forEach ((note) => addNewNote(note) )};

addButton.addEventListener('click', () => addNewNote() );