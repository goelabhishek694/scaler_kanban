const addTaskBtn = document.querySelector(".add_btn");
const removeTaskBtn = document.querySelector(".remove_btn");
let isDelete = false;
const modalCont = document.querySelector(".modal_cont");
const modalTextArea = modalCont.getElementsByClassName("textarea_cont")[0];
const modalPriorityColorCont = modalCont.getElementsByClassName(
  "priority_color_cont"
)[0];
const mainCont = document.querySelector(".main_cont");
const priorityColors = ["pink", "blue", "purple", "green"];
const toolBoxPriorityColorCont = document.querySelector(
  ".toolbox_priority_cont"
);
let allTickets = JSON.parse(localStorage.getItem("allTickets")) || [];
let isFromLS = false;

isFromLS = true;
allTickets.forEach((ticket) => {
  const { content, priorityColor, uid } = ticket;
  createTicket(priorityColor, uid, content);
});
isFromLS = false;

toolBoxPriorityColorCont.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) return;
  const priorityColorTicketsWanted = e.target.classList[1];
  const allTickets = Array.from(mainCont.children);
  console.log(allTickets);
  allTickets.forEach((ticketEle) => {
    if (ticketEle.children[0].classList[1] == priorityColorTicketsWanted) {
      ticketEle.style.display = "block";
    } else ticketEle.style.display = "none";
  });
});

toolBoxPriorityColorCont.addEventListener("dblclick", function (e) {
  if (e.target == e.currentTarget) return;
  const allTickets = Array.from(mainCont.children);
  allTickets.forEach((ticketEle) => {
    ticketEle.style.display = "block";
  });
});

addTaskBtn.addEventListener("click", () => {
  modalCont.style.display = "flex";
});

removeTaskBtn.addEventListener("click", () => {
  if (isDelete) {
    removeTaskBtn.style.color = "black";
  } else {
    removeTaskBtn.style.color = "red";
  }
  isDelete = !isDelete;
});

modalPriorityColorCont.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) return;

  let selectedPriority = e.target;
  let allPriorityColors = modalPriorityColorCont.children;

  for (let i = 0; i < allPriorityColors.length; i++) {
    allPriorityColors[i].classList.remove("active");
  }
  selectedPriority.classList.add("active");
});

modalCont.addEventListener("keypress", (e) => {
  if (e.key != "Enter") return;
  //create a ticket
  const content = modalTextArea.value;
  const priorityColorEle =
    modalPriorityColorCont.getElementsByClassName("active")[0];
  const priorityColor = priorityColorEle.classList[1];
  const uid = new ShortUniqueId().rnd();

  modalCont.style.display = "none";
  createTicket(priorityColor, uid, content);

  //reset modal
  modalTextArea.value = "";
  priorityColorEle.classList.remove("active");
  modalPriorityColorCont
    .getElementsByClassName("purple")[0]
    .classList.add("active");
});

function createTicket(priorityColor, uid, content) {
  const ticketContainer = document.createElement("div");
  ticketContainer.setAttribute("class", "ticket_cont");
  ticketContainer.innerHTML = `<div class="ticket_color ${priorityColor}"></div>
            <div class="ticket_id">#${uid}</div>
            <div class="ticket_area">${content}</div>
            <div class="lock_unlock">
                <i class="fa-solid fa-lock"></i>
            </div>`;
  const priorityColorEle = ticketContainer.querySelector(".ticket_color");
  const lockUnlockBtn = ticketContainer.querySelector(".lock_unlock");
  const ticketArea = ticketContainer.querySelector(".ticket_area");
  addPriorityChangeListeners(priorityColorEle, uid);
  addLockUnlockListeners(lockUnlockBtn, ticketArea, uid);
  deleteListeners(ticketContainer, uid);
  if (!isFromLS) {
    const ticketObj = {
      priorityColor,
      uid,
      content,
    };
    allTickets.push(ticketObj);
    localStorage.setItem("allTickets", JSON.stringify(allTickets));
  }
  mainCont.appendChild(ticketContainer);
}

function addPriorityChangeListeners(priorityColorEle, uid) {
  console.log(priorityColorEle);

  priorityColorEle.addEventListener("click", function () {
    let currColor = priorityColorEle.classList[1];
    let currColorIdx = priorityColors.indexOf(currColor);
    let nextColor = priorityColors[(currColorIdx + 1) % priorityColors.length];
    priorityColorEle.classList.remove(currColor);
    priorityColorEle.classList.add(nextColor);
    let ticketObj = allTickets.find(ticket => ticket.uid == uid);
    ticketObj.priorityColor = nextColor;
    updateLocalStorage();
  });

}

function addLockUnlockListeners(lockUnlockBtn, ticketArea, uid) {
  lockUnlockBtn.addEventListener("click", () => {
    const button = lockUnlockBtn.children[0]?.classList[1];
    //lock button -> unlock it and make ticketArea editable
    if (button == "fa-lock") {
      lockUnlockBtn.children[0].classList.remove("fa-lock");
      lockUnlockBtn.children[0].classList.add("fa-unlock");
      ticketArea.setAttribute("contenteditable", true);
    } else {
      //unlock button -> lock it and make ticketArea non-editable
      lockUnlockBtn.children[0].classList.remove("fa-unlock");
      lockUnlockBtn.children[0].classList.add("fa-lock");
      ticketArea.setAttribute("contenteditable", false);
    }
    let ticketObj = allTickets.find(ticket => ticket.uid == uid);
    ticketObj.content = ticketArea.textContent;
    updateLocalStorage();
  });
}

function deleteListeners(ticketContainer, uid) {
  ticketContainer.addEventListener("click", function () {
    if (isDelete) {
      ticketContainer.remove();
    let restOfTickets = allTickets.filter(ticket => ticket.uid !== uid);
    console.log(restOfTickets);
    
    allTickets = restOfTickets;
    updateLocalStorage();
    }
  });
}

function updateLocalStorage(){
    localStorage.setItem("allTickets", JSON.stringify(allTickets));
}