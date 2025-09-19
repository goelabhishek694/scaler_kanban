const addBtn = document.querySelector(".add_btn");
const modalCont = document.querySelector(".modal_cont");
const modalPriorityColorCont = modalCont.querySelector(".priority_color_cont");
const modalTextArea = modalCont.querySelector(".textarea_cont");
const mainCont = document.querySelector(".main_cont");


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
    mainCont.appendChild(ticketContainer);
}