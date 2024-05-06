// const { data } = require("autoprefixer");

let allNotes = [];

const allNotesDemo = [
    {
        id: 100,
        text: "Bring onions",
        time: new Date()
    },
    {
        id: 200,
        text: "Get a bath",
        time: new Date()
    },
    {
        id: 300,
        text: "Sleep",
        time: new Date()
    },
];
let randId = 1;

document.getElementById("addBtn").addEventListener("click", function () {
    const userText = document.getElementById("addText").value;
    document.getElementById("addText").value = "";
    if (userText !== "") {
        let note = {
            id: randId,
            text: userText,
            time: new Date()
        };
        allNotes.push(note);
        //   console.log(allNotes);
        displayItems(note);
        randId++;
        document.getElementById("emptyInput").style.display = "none";
    } else {
        document.getElementById("emptyInput").style.display = "block";
    }
});

// displayItems(allNotes);
//  Test details
displayItems(allNotesDemo[0]);
displayItems(allNotesDemo[1]);
displayItems(allNotesDemo[2]);

function displayItems(newNote) {
    const mainContainer = document.getElementById("viewContent");
    let itemRow;

    // existingItemRow = ;

    //  remove the no notes text added in delete button, while displaying note
    const noNotesAvailable = document.getElementById("noNoteAvailable");
    if (noNotesAvailable) {
        mainContainer.removeChild(noNotesAvailable);
    }

    if (document.getElementById(`note-${newNote.id}`)) {
        itemRow = document.getElementById(`note-${newNote.id}`);
    } else {
        itemRow = document.createElement("div");
        itemRow.id = `note-${newNote.id}`;
        itemRow.classList.add(
            "h-full",
            "w-36",
            "bg-white",
            "drop-shadow-lg",
            "rounded-lg",
        );
    }

    const itemText = document.createElement("span");
    itemText.innerText = newNote.text;
    itemText.classList.add("cursor-default");

    const itemTextContainer = document.createElement("div");
    itemTextContainer.classList.add(
        "min-h-20",
        "h-full",
        "p-2",
        "font-bold",
        "tracking-normal",
        "text-blue-900"
    );

    const itemOperations = document.createElement("div");
    itemOperations.classList.add("flex", "justify-end", "p-2");
    // display: flex;
    // flex-wrap: wrap;
    // flex-direction: row;
    // justify-content: flex-end;

    const timeStampText = document.createElement("p");
    timeStampText.id = `timeStamp-${newNote.id}`;
    timeStampText.classList.add(
        "text-xs",
        "text-slate-400"
    )
    // timeStampText.classList.add(
    //     "text-xs",
    //     "max-w-16"
    // )
    // const creationTimeStamp = new Date();


    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.innerHTML = `<img src="icons/icons8-pencil-96.png" class="h-6 me-1" alt="Edit" srcset="">`;
    // editBtn.onclick = editItem(item.id);
    editBtn.onclick = function () {
        itemRow.innerHTML = "";

        const textBox = document.createElement("textarea");
        textBox.value = newNote.text;

        // const itemTextContainer = document.createElement("div");
        textBox.classList.add(
            "h-38",
            "w-full",
            "bg-transparent",
            "rounded-t-lg",
            "focus:border-b",
            "p-2",
            "focus:outline-0",
            "focus:border-gray-900",
            "resize-none"
        );
        // console.log(allNotes);

        const saveCancelOperations = document.createElement("div");
        saveCancelOperations.classList.add("flex", "justify-end");

        const saveBtn = document.createElement("button");
        saveBtn.type = "button";
        saveBtn.innerHTML = `<img src="icons/icons8-checkmark-480.png" class="h-5 me-2" alt="Save" srcset="">`;
        // editBtn.onclick = editItem(item.id);
        saveBtn.onclick = function () {
            if (textBox.value !== "") {
                newNote.text = textBox.value;
                newNote.time = new Date();
                itemRow.innerHTML = "";
                // console.log(allNotes);
                displayItems(newNote);
            } else {
                itemRow.innerHTML = "";
                displayItems(newNote);
            }
        };

        const cancelBtn = document.createElement("button");
        cancelBtn.type = "button";
        cancelBtn.innerHTML = `<img src="icons/icons8-cancel-480.png" class="h-6 scale-110  me-2" alt="Cancel" srcset="">`;
        // editBtn.onclick = editItem(item.id);
        cancelBtn.onclick = function () {
            itemRow.innerHTML = "";
            displayItems(newNote);
        };

        itemRow.appendChild(textBox);
        textBox.focus();
        saveCancelOperations.appendChild(saveBtn);
        saveCancelOperations.appendChild(cancelBtn);
        itemRow.appendChild(saveCancelOperations);

        // mainContainer.appendChild(itemRowNew);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerHTML = `<img src="icons/icons8-dustbin-64.png" class="h-6 me-1" alt="Delete" srcset="">`;
    // deleteBtn.onclick = `deleteItem(${item.id})`;
    deleteBtn.onclick = function () {
        // console.log(newNote.id, "will be deleted");
        allNotes = allNotes.filter((note) => note.id !== newNote.id);
        // console.log(allNotes);
        mainContainer.removeChild(document.getElementById(`note-${newNote.id}`));
        if (mainContainer.innerHTML === "") {
            noNotes();
        }
    };

    itemTextContainer.appendChild(itemText);
    itemRow.appendChild(itemTextContainer);
    itemOperations.appendChild(timeStampText);
    itemOperations.appendChild(editBtn);
    itemOperations.appendChild(deleteBtn);
    itemRow.appendChild(itemOperations);
    if (!document.getElementById(`note-${newNote.id}`)) {
        mainContainer.appendChild(itemRow);
    }

    console.log(allNotes);
}

//  remove the error text after clicking on button when the textbox is empty
document.getElementById("addText").addEventListener("focus", function () {
    document.getElementById("emptyInput").style.display = "none";
});

//   display that no notes are available
function noNotes() {
    const mainContainer = document.getElementById("viewContent");
    const spanText = document.createElement("span");
    spanText.id = "noNoteAvailable";
    spanText.innerText = "No notes available";
    spanText.classList.add(
        "mt-4",
        "text-sm",
        'text-slate-400'
    );
    mainContainer.appendChild(spanText);
}
// noNotes();

// setInterval(1000, displayItems().displayTimeStamp());

//  timestamp when the note is created or edited
function timeSince() {

    if (allNotesDemo.length) {
        allNotesDemo.map(function (note) {
            let timeStampTag = document.getElementById(`timeStamp-${note.id}`);
            timeStampTag.innerHTML = timeSinceCalculate(note.time);
        })
    }
    if (allNotes.length) {
        allNotes.map(function (note) {
            let timeStampTag = document.getElementById(`timeStamp-${note.id}`);
            timeStampTag.innerHTML = timeSinceCalculate(note.time);
        })
    }
}

function timeSinceCalculate(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return (Math.floor(interval)>1)? `${Math.floor(interval)} years ago` : `${Math.floor(interval)} year ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return (Math.floor(interval)>1)? `${Math.floor(interval)} months ago` : `${Math.floor(interval)} month ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return (Math.floor(interval)>1)? `${Math.floor(interval)} days ago` : `${Math.floor(interval)} day ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return (Math.floor(interval)>1)? `${Math.floor(interval)} hours ago` : `${Math.floor(interval)} hour ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
        return (Math.floor(interval)>1)? `${Math.floor(interval)} minutes ago` : `${Math.floor(interval)} minute ago`;
    }
    return (Math.floor(seconds)>1)? `${Math.floor(seconds)} seconds ago` : `${Math.floor(seconds)} second ago`;
    // return Math.floor(seconds) + " seconds";
}

timeSince();
setInterval(timeSince, 1000);