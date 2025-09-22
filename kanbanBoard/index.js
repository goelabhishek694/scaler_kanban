const addBtn = document.querySelector(".add_btn");
const modalCont = document.querySelector(".modal_cont");
const modalPriorityColorCont = modalCont.querySelector(".priority_color_cont");
const modalTextArea = modalCont.querySelector(".textarea_cont");
const mainCont = document.querySelector(".main_cont");
const priorityColors = ["pink", "blue", "purple", "green"];
const removeBtn = document.querySelector(".remove_btn");
let isDelete = false;
const toolBoxPriorityColorCont = document.querySelector(
  ".toolbox_priority_cont"
);
let allTickets = localStorage.getItem("tickets") || [];
let isFromLS = false;

if (typeof allTickets == "string") {
  console.log("hellp");

  allTickets = JSON.parse(allTickets);
  populateUI();
}

function populateUI() {
  isFromLS = true;
  allTickets.forEach((ticketObj) => {
    const { uid, color, content } = ticketObj;
    createTicket(color, content, uid);
  });
  isFromLS = false;
}

addBtn.addEventListener("click", () => {
  modalCont.style.display = "flex";
});

removeBtn.addEventListener("click", () => {
  if (!isDelete) {
    removeBtn.style.color = "red";
  } else {
    removeBtn.style.color = "black";
  }
  isDelete = !isDelete;
});

toolBoxPriorityColorCont.addEventListener("click", function (e) {
  if (e.currentTarget == e.target) return;
  const priorityColorTicketsWanted = e.target.classList[1];
  const allTickets = document.querySelectorAll(".ticket_cont");
  console.log(allTickets);

  allTickets.forEach((ticketEle) => {
    if (ticketEle.children[0].classList[1] != priorityColorTicketsWanted) {
      ticketEle.style.display = "none";
    } else ticketEle.style.display = "block";
  });
});

toolBoxPriorityColorCont.addEventListener("dblclick", function () {
  const allTickets = document.querySelectorAll(".ticket_cont");
  allTickets.forEach((ticketEle) => {
    ticketEle.style.display = "block";
  });
});

modalPriorityColorCont.addEventListener("click", (e) => {
  if (e.currentTarget == e.target) return;
  const priorityColorWantedEle = e.target;
  Array.from(modalPriorityColorCont.children).forEach((ele) => {
    ele.classList.remove("active");
  });
  priorityColorWantedEle.classList.add("active");
});

modalCont.addEventListener("keypress", (e) => {
  if (e.key !== "Enter") return;
  const content = modalTextArea.value;
  const priorityColorEle =
    modalPriorityColorCont.getElementsByClassName("active")[0];
  const priorityColor = priorityColorEle.classList[1];

  modalCont.style.display = "none";
  createTicket(priorityColor, content);

  //reset the modal
  modalTextArea.value = "";
  priorityColorEle.classList.remove("active");
  modalPriorityColorCont.children[2].classList.add("active");
});

function createTicket(priorityColor, content, uuid) {
  const uid = uuid || new ShortUniqueId().rnd();
  console.log(uid);
  const ticketContainer = document.createElement("div");
  ticketContainer.setAttribute("class", "ticket_cont");
  ticketContainer.innerHTML = `<div class="ticket_color ${priorityColor}"></div>
            <div class="ticket_id">#${uid}</div>
            <div class="ticket_area">${content}</div>
            <div class="lock_unlock">
                <i class="fa-solid fa-lock"></i>
            </div>`;
  const lockBtn = ticketContainer.querySelector(".lock_unlock");
  const ticketArea = ticketContainer.querySelector(".ticket_area");
  const ticketColor = ticketContainer.querySelector(".ticket_color");

  addLockUnlock(ticketArea, lockBtn, uid);
  addPriorityChangeListeners(ticketColor, uid);
  deleteTicketListener(ticketContainer, uid);
  mainCont.appendChild(ticketContainer);

  if (isFromLS) return;

  const ticketObj = {
    uid,
    color: priorityColor,
    content,
  };
  allTickets.push(ticketObj);
  updateLocalStorage();
}

function addLockUnlock(ticketArea, lockBtn, uid) {
  let isLocked = true;
  lockBtn.addEventListener("click", function () {
    if (isLocked) {
      //unlock the ticket
      lockBtn.children[0].classList.remove("fa-lock");
      lockBtn.children[0].classList.add("fa-unlock");
      ticketArea.setAttribute("contenteditable", true);
    } else {
      //lock the ticket
      lockBtn.children[0].classList.remove("fa-unlock");
      lockBtn.children[0].classList.add("fa-lock");
      ticketArea.setAttribute("contenteditable", false);
    }

    let ticketObj = allTickets.find((ticket) => ticket.uid == uid);
    console.log(ticketObj);
    ticketObj.content = ticketArea.textContent;
    updateLocalStorage();

    isLocked = !isLocked;
  });
}

function addPriorityChangeListeners(ticketColor, uid) {
  ticketColor.addEventListener("click", (e) => {
    const currentColor = ticketColor.classList[1];
    const currentColorIdx = priorityColors.indexOf(currentColor);
    const nextColorIdx = (currentColorIdx + 1) % priorityColors.length;
    const nextColor = priorityColors[nextColorIdx];

    //remove the current color class
    ticketColor.classList.remove(currentColor);

    //add the next color class
    ticketColor.classList.add(nextColor);

    let ticketObj = allTickets.find((ticket) => ticket.uid == uid);
    ticketObj.color = nextColor;
    updateLocalStorage();

  });
}

function deleteTicketListener(ticketContainer, uid) {
  ticketContainer.addEventListener("click", function () {
    if (isDelete) ticketContainer.remove();
    let restOfTickets = allTickets.filter((ticket) => ticket.uid !== uid);
    allTickets = restOfTickets
    updateLocalStorage();
    return;
  });
}

function updateLocalStorage() {
  localStorage.setItem("tickets", JSON.stringify(allTickets));
}
