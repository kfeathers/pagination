'use strict';

const studentList = document.querySelector('.student-list');
const students = studentList.children;
const mainDiv = document.querySelector('.page');
const studentsPerPage = 10;

// Create pagination div
const div = document.createElement('div');
const ul = document.createElement('ul');
const listItem = document.createElement('li');
const listChildren = ul.children;
const pages = Math.ceil(students.length / studentsPerPage);
div.className = 'pagination';
div.appendChild(ul);

// creat error message
function errorMessage() {
  const h3 = document.createElement('p');
  h3.innerHTML = 'Sorry, there\'s no matches';
  mainDiv.insertBefore(h3, ul.nextSibling);
}

// Create search form and add html to .page-header
function createSeachForm() {
  const searchForm = document.createElement('div');
  const pageHeader = document.querySelector('.page-header');
  searchForm.className = 'student-search';
  searchForm.innerHTML = '<input placeholder="Search for students..."><button>Search</button>';
  pageHeader.appendChild(searchForm);
  document.querySelector('button').addEventListener('click', findMatches);
}


// Display only 10 students on per page
function showTenStudents() {
  for(let i = 0; i < students.length; i++) {
    let student = students[i];
    if(i <= 9 && i >= 0) {
      student.style.display = '';
    } else {
      student.style.display = 'none';
    }
  }
}


// Calculate the number of pages needed and add the appropriate number of links to the bottom of the page
function calulateNumberPages() {
  const numberLinks = Math.ceil(students.length / studentsPerPage);

  for(let i = 0; i < numberLinks; i++) {
    const li = document.createElement('li');
    const listLink = document.createElement('a');
    listLink.setAttribute('href', '#');
    listLink.textContent = i + 1;
    li.appendChild(listLink);
    ul.appendChild(li);
    listLink.addEventListener("click", onActivePage);

    if( 1 === i + 1 ) {
      listLink.className = 'active';
    }

  }

  mainDiv.insertBefore(div, ul.nextSibling);
}

// set active link and disp
function onActivePage() {
  const currentPage = this.innerText;

  // Hide students
  for(let i = 0; i < students.length; i++) {
		students[i].style.display = 'none';
	};

  // set active class on pagination link
  let lis = document.getElementsByClassName("pagination")[0];

  for (let i = 0; i < lis.length; i++) {
      if (lis[i].children[0].textContent === currentPage) {
          lis[i].children[0].classList.add("active");
      } else {
          lis[i].children[0].classList.remove("active");
      }
  }

	//Find what page number and display students on page specific
	const end = currentPage * studentsPerPage;
	const start = end - studentsPerPage;
	for(let i = start; i <= end; i++) {
		if(students[i].style.display = 'block') {
      students[i].style.display = '';
    }
	};
};


function findMatches() {
    const searchInput = document.querySelector('input').value;
    const studentsMatch = [];

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
    if (studentsMatch.length === 0) {
        errorMessage();
    }
    removePaginationLinks();
}

// remove pagination links
function removePaginationLinks() {
  ul.remove();
}




showTenStudents();
createSeachForm();
calulateNumberPages();
