let allNotes = [];

const allNotesDemo = [
  {
    id: 1,
    text: "Bring onions",
  },
  {
    id: 2,
    text: "Get a bath",
  },
  {
    id: 3,
    text: "Sleep",
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
    };
    allNotes.push(note);
    //   console.log(allNotes);
    displayItems(allNotes);
    randId++;
    document.getElementById("emptyInput").style.display = "none";
  }
  else{
    document.getElementById("emptyInput").style.display = "flex";
  }
});

// displayItems(allNotesDemo);

function displayItems(itemsToDisplay) {
  const mainContainer = document.getElementById("viewContent");
  console.log(itemsToDisplay);
  if (itemsToDisplay) {
    let display = itemsToDisplay.map(function (item) {
      console.log(item);
      return `<p id="note-${item.id}">Note: ${item.text} <button type="button" onclick="editItem(${item.id})">Edit</button> <button type="button" onclick="deleteItem(${item.id})">Delete</button> </p>`;
    });
    // console.log(display.join(""));
    mainContainer.innerHTML = display.join("");
  } else {
    mainContainer.innerHTML = "<p>Nothing to display</p>";
  }
}

function deleteItem(itemId) {
  console.log(itemId, "will be deleted");
  allNotes = allNotes.filter(function (note) {
    console.log(note.id);
    if (note.id !== itemId) {
      console.log(note.id, itemId);
      return note;
    }
  });
  //   console.log(allNotes);
  displayItems(allNotes);
}

function editItem() {
    
}
