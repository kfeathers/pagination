'use strict';

const studentList = document.querySelector('.student-list');
const students = studentList.children;
const mainDiv = document.querySelector('.page');
const studentsPerPage = 10;
const paragraph = document.createElement('p');
paragraph.className = 'message';

// Create pagination div
const div = document.createElement('div');
const paginationUl = document.createElement('ul');
const listItem = document.createElement('li');
const listChildren = paginationUl.children;
div.className = 'pagination';
div.appendChild(paginationUl);

// Create search form and add html to .page-header
const searchForm = document.createElement('div');
const pageHeader = document.querySelector('.page-header');
searchForm.className = 'student-search';
searchForm.innerHTML = '<input placeholder="Search for students..."><button>Search</button>';
pageHeader.appendChild(searchForm);
document.querySelector('button').addEventListener('click', findMatches);



// Display only 10 students on per page
function showTenStudents() {
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        if (i <= 9 && i >= 0) {
            student.style.display = '';
        } else {
            student.style.display = 'none';
        }
    }
}


// Calculate the number of pages needed and add the appropriate number of links to the bottom of the page
function calulateNumberPages() {
    const numberLinks = Math.ceil(students.length / studentsPerPage);

    for (let i = 0; i < numberLinks; i++) {
        const li = document.createElement('li');
        const listLink = document.createElement('a');
        listLink.setAttribute('href', '#');
        listLink.textContent = i + 1;
        li.appendChild(listLink);
        paginationUl.appendChild(li);
        listLink.addEventListener("click", onActivePage);
        // if first page is 1 add active class to link
        if (1 === i + 1) {
            listLink.className = 'active';
        }

    }

    mainDiv.insertBefore(div, paginationUl.nextSibling);
}

// set active link and disp
function onActivePage() {
    const currentPage = this.innerText;
    const paginationLinks = document.getElementsByClassName("pagination")[0].children[0].children;

    // Hide students
    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    };

    // set active class on pagination link
    for (let i = 0; i < paginationLinks.length; i++) {
        if (paginationLinks[i].children[0].textContent === currentPage) {
            paginationLinks[i].children[0].classList.add("active");
        } else {
            paginationLinks[i].children[0].classList.remove("active");
        }
    }

    //Find what page number and display students on page specific
    for (let i = 0; i < students.length; i++) {
        if (i <= currentPage * studentsPerPage && i >= (currentPage - 1) * studentsPerPage) {
            students[i].style.display = '';
        }
    }

};

function findMatches() {
    const searchInput = document.querySelector('input').value;
    const studentsMatch = [];

    // if no value in input...show 10 students and pagination links
    if (searchInput === '') {
        showTenStudents();
        paragraph.style.display = 'none';
        paginationUl.style.display = 'block';
    } else {
        // else...show search results
        for (let i = 0; i < students.length; i++) {
            const studentName = document.getElementsByTagName('h3');
            if (studentName[i].innerHTML.indexOf(searchInput) !== -1) {
                students[i].style.display = '';
                studentsMatch.push(i);
                console.log(studentsMatch);
            } else {
                students[i].style.display = 'none';
            }
        }

        // error meesage if zero results
        if (studentsMatch.length === 0) {
            // Clear input field after submiting
            document.querySelector('input').value = '';
            paragraph.innerHTML = 'Sorry, there\'s no matches. Search for a different name or click the search button to show all students';
            mainDiv.insertBefore(paragraph, pageHeader.nextSibling);
        }

        // hide pagination
        paginationUl.style.display = 'none';
    }

}

showTenStudents();
calulateNumberPages();
