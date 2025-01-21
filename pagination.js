const projectsContainer = document.querySelector(".container")
import data from "./data.js";

const params = new URLSearchParams(document.location.search);
let currentPage = params.get("page");
if(!currentPage){
    currentPage = 1;
}
const itemsPerPage = 5;
const totalPages = Math.ceil(data.length / itemsPerPage);

function createProject(projectData){
    // create project container
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';
    // create project heading
    const projectTitle = document.createElement('h3');
    projectTitle.textContent = projectData.title;
    projectDiv.appendChild(projectTitle);
    // create project body
    const projectDescription = document.createElement('p');
    projectDescription.textContent = projectData.description;
    projectDiv.appendChild(projectDescription);
    // create link
    const projectLink = document.createElement('a');
    projectLink.href = projectData.link;
    projectLink.textContent = 'View Project';
    projectLink.target = '_blank';
    projectDiv.appendChild(projectLink);

    return projectDiv
}

function generatePagination(){
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear previous pagination

    // Prev button
    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.className = currentPage === 1 ? 'prev disabled' : 'prev';
    prevButton.innerHTML = '&laquo; Prev';
    prevButton.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevButton);

    // page
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.className = i === currentPage ? 'page-number active' : 'page-number';
        pageLink.innerText = i;
        pageLink.onclick = () => changePage(i);
        pagination.appendChild(pageLink);
    }
    // next button
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.className = currentPage === totalPages ? 'next disabled' : 'next';
    nextButton.innerHTML = 'Next &raquo;';
    nextButton.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextButton);
}

function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    displayItems(currentPage);
    generatePagination();
}
// console.log("page")
function displayItems(page) {
    projectsContainer.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const pagedItems = data.slice(start, end);
    pagedItems.forEach(el=>{
        const projectDiv = createProject(el)
        projectsContainer.appendChild(projectDiv);
    })
}
// debugger;
displayItems(currentPage)
generatePagination();
