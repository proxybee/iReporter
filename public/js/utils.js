let 
tableBody = document.querySelector("#tableBody"),
rfTableBody= document.querySelector("#tableBodyOne"),
totalRows = tableBody.querySelectorAll("tr"),
rfTotalRows = rfTableBody.querySelectorAll("tr"),
totalRowsLength = totalRows.length, 
// || rfTotalRows.length,
// tableDatas = tableBody.innerHTML || rfTableBody.innerHTML,
tableData = totalRows
myTable = document.querySelector(".myTable");
// console.log('tabledata01', tableData)


// console.log(tableData[1].innerHTML)
// console.log(tableBody.rows[1].innerHTML) 


(function() {

  function Pagination() {
       
    // let tableData = []
    // for ( let i = 0; i < totalRowsLength; i++ ) {
    //   tableData.push(totalRows[i] || rfTotalRows) 
    // }
    // const prevButton = document.getElementById('button_prev');
    const rf_prevButton = document.getElementById('rf_button_prev');
    // const nextButton = document.getElementById('button_next');
    const rf_nextButton = document.getElementById('rf_button_next');
    // const clickPageNumber = document.querySelectorAll('.clickPageNumber');

    // let tableData = totalRows || rfTotalRows
    let current_page = 1;
    let records_per_page = 5;
    
    this.init = async function() {
        changePage(1);
        pageNumbers();
        selectedPage();
        clickPage();
        addEventListeners();
   }
    
    let addEventListeners = function() {
        // prevButton.addEventListener('click', prevPage);
        // nextButton.addEventListener('click', nextPage);
        rf_prevButton.addEventListener('click', prevPage);
        rf_nextButton.addEventListener('click', nextPage);
    }
          
    let selectedPage = function() {
        // let page_number = document.getElementById('page_number');
        let rfpage_number = document.getElementById('rf_page_number');
        // let pageNum = page_number.length
        let pageNum = rfpage_number.length
        for (let i = 0; i < pageNum ; i++) {
            if (i == current_page - 1) {
                page_number[i].style.opacity = "1.0";
            } 
            else {
                page_number[i].style.opacity = "0.5";
            }
        }   
    }  
    
    let checkButtonOpacity = function() {
    //   current_page == 1 ? prevButton.classList.remove('active') : prevButton.classList.add('active');
    //   current_page == numPages() ? nextButton.classList.remove('active') : nextButton.classList.add('active');
    current_page == 1 ? rf_prevButton.classList.remove('active') : rf_prevButton.classList.add('active');
    current_page == numPages() ? rf_nextButton.classList.remove('active') : rf_nextButton.classList.add('active');
    }

    let changePage = function(page) {
        console.log('should get here')

        if (page < 1) {
            page = 1;
        } 
        if (page > (numPages() -1)) {
            page = numPages();
        }
        let Start = (page - 1) * records_per_page,
            End = Start + records_per_page;

        console.log('start', Start, 'end', End)
        // tableBody.innerHTML = "";
        rfTableBody.innerHTML = "";
        // console.log('table body: ', tableBody)
        // console.log('tableDATA', tableData[1])
          
         for(let i = (page -1) * records_per_page; i < (page * records_per_page) && i < tableData.length; i++) { 
            if(i>= Start && i <= End)
            // tableBody.innerHTML += tableData[i].innerHTML
            rfTableBody.innerHTML += tableData[i].innerHTML             
        }
        checkButtonOpacity();
        selectedPage();
    }

    let prevPage = function() {
        console.log('we get here!!')
        if(current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    let nextPage = function() {
        if(current_page < numPages()) {
            current_page++;
            changePage(current_page);
        } 
    }

    let clickPage = function() {
        document.addEventListener('click', function(e) {
            if(e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                current_page = e.target.textContent;
                changePage(current_page);
            }
        });
    }

    let pageNumbers = function() {
        let
        //  pageNumber = document.getElementById('page_number'),
        rfpageNumber = document.getElementById('rf_page_number'),
        paginationBlock = document.getElementsByClassName("pagination-block");
        // pageNumber.innerHTML = ""
        rfpageNumber.innerHTML = "";

        for(let i = 1; i < numPages() + 1; i++) {
            // if(totalRowsLength < records_per_page) {
            //     paginationBlock.style.display="none"
            // }  
            // pageNumber.innerHTML += "<span class='clickPageNumber page-item page-link'>" + i + "</span>"
            rfpageNumber.innerHTML += "<span class='clickPageNumber page-item page-link'>" + i + "</span>";
        }
    }

    let numPages = function() {
        return Math.ceil(totalRowsLength / records_per_page);  
    }
    // tableData = []
 }
let pagination = new Pagination();
pagination.init();
})();




