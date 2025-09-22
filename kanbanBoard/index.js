const addBtn = document.querySelector(".add_btn");
const modalCont = document.querySelector(".modal_cont");
const modalPriorityColorCont = modalCont.querySelector(".priority_color_cont");
const modalTextArea = modalCont.querySelector(".textarea_cont");
const mainCont = document.querySelector(".main_cont");
const priorityColors = ["pink", "blue", "purple", "green"];

addBtn.addEventListener("click", () => {
    modalCont.style.display = "flex";
});

modalPriorityColorCont.addEventListener("click", (e) => {
    if(e.currentTarget == e.target) return;
    const priorityColorWantedEle = e.target;
    Array.from(modalPriorityColorCont.children).forEach((ele) =>{
        ele.classList.remove("active");
    });
    priorityColorWantedEle.classList.add("active");
});

modalCont.addEventListener("keypress", (e) => {
    if(e.key!=="Enter") return;
    const content = modalTextArea.value;
    const priorityColorEle = modalPriorityColorCont.getElementsByClassName("active")[0]
    const priorityColor = priorityColorEle.classList[1];

    modalCont.style.display = "none";
    createTicket(priorityColor, content);

    //reset the modal
    modalTextArea.value = "";
    priorityColorEle.classList.remove("active");
    modalPriorityColorCont.children[2].classList.add("active");
});

function createTicket(priorityColor, content){
    const uid = new ShortUniqueId().rnd();
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

    addLockUnlock(ticketArea, lockBtn);
    addPriorityChangeListeners(ticketColor);
    mainCont.appendChild(ticketContainer);
}

function addLockUnlock(ticketArea, lockBtn){
    let isLocked = true;
    lockBtn.addEventListener("click", function(){
        if(isLocked){
            //unlock the ticket
            lockBtn.children[0].classList.remove("fa-lock");
            lockBtn.children[0].classList.add("fa-unlock");
            ticketArea.setAttribute("contenteditable", true);
        }else{
            //lock the ticket
            lockBtn.children[0].classList.remove("fa-unlock");
            lockBtn.children[0].classList.add("fa-lock");
            ticketArea.setAttribute("contenteditable", false);
        }
        isLocked = !isLocked;
    })
}

function addPriorityChangeListeners(ticketColor){
    ticketColor.addEventListener("click", (e) => {
        const currentColor = ticketColor.classList[1];
        const currentColorIdx = priorityColors.indexOf(currentColor);
        const nextColorIdx = ( currentColorIdx +1 ) % priorityColors.length;
        const nextColor = priorityColors[nextColorIdx];

        //remove the current color class 
        ticketColor.classList.remove(currentColor);

        //add the next color class
        ticketColor.classList.add(nextColor);
    })
}