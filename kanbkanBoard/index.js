const addTaskBtn = document.querySelector(".add_btn");
const modalCont = document.querySelector(".modal_cont");
const modalTextArea = modalCont.getElementsByClassName("textarea_cont")[0];
const modalPriorityColorCont = modalCont.getElementsByClassName("priority_color_cont")[0];
const mainCont =  document.querySelector(".main_cont");


addTaskBtn.addEventListener("click", () => {
    modalCont.style.display = "flex";
});

modalPriorityColorCont.addEventListener("click", (e) => {
    if(e.target == e.currentTarget) return;

    let selectedPriority = e.target;
    let allPriorityColors = modalPriorityColorCont.children;
    
    for(let i=0;i<allPriorityColors.length;i++){
        allPriorityColors[i].classList.remove("active");
    }
    selectedPriority.classList.add("active");
})

modalCont.addEventListener("keypress", (e) =>{
    if(e.key != "Enter") return;
    //create a ticket
    const content = modalTextArea.value;
    const priorityColorEle = modalPriorityColorCont.getElementsByClassName("active")[0];
    const priorityColor = priorityColorEle.classList[1];
    const uid = new ShortUniqueId().rnd();

    modalCont.style.display = "none";
    createTicket(priorityColor, uid, content);

    //reset modal
    modalTextArea.value = "";
    priorityColorEle.classList.remove("active");
    modalPriorityColorCont.getElementsByClassName("blue")[0].classList.add("active");

})

function createTicket(priorityColor, uid, content){
    const ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket_cont");
    ticketContainer.innerHTML = `<div class="ticket_color ${priorityColor}"></div>
            <div class="ticket_id">#${uid}</div>
            <div class="ticket_area">${content}</div>
            <div class="lock_unlock">
                <i class="fa-solid fa-lock"></i>
            </div>`;
    mainCont.appendChild(ticketContainer)
}