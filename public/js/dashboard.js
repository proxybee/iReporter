const basePath = "../";
let loader = document.querySelector('.loading'),
container = document.querySelector('#home')
incidentData = document.querySelector("#tableBody").innerHTML,
redFlagData = document.querySelector("#tableBodyOne").innerHTML
//page = document.querySelector('.page-link').value
const paginationBlock = document.querySelector(".pagination-block")
const getUrl = window.location.href;
const url = new URL(getUrl);
const pageNum = url.searchParams.get('page-link');
const page =  pageNum > 1 ? url.searchParams.get('page-link') : 1;



const userToken = window.localStorage.getItem("userToken");
const getUserToken = setTimeout(() => {
  if(!userToken || userToken === undefined) {
    window.location.href = `${basePath}sign-in.html`
  } else
 // window.open(`${basePath}sign-in.html`, '_self')
 container.style.display = 'block';
 loader.style.display = 'none';
  // return userToken
}, 3000)


function getIncidents() {
  // e.preventDefault()
  return fetch(`https://ireporterafrica.herokuapp.com/api/v1/incidents/${page}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "Application/JSON",
      "x-access-token": `${userToken}`
    }
  })
    .then(function(res) {
      return res.json();
    })
    .then(r => {
     // console.log(r.pages)
      if (r.status == 204 || r.status == 400) {
        document.getElementById(
          "errormsg"
        ).innerText = `You do not have any Incidents Yet, Create one here ${basePath}index.html`;
      }
      if (r.error && r.error.expiredAt < Date.now()) {
        localStorage.clear()
        window.location.href = `${basePath}sign-in.html`;
      };
      if (r.error && r.success === false) {
        window.location.href = `${basePath}index.html`;
      };
      let totalredFlags = 0;
      let totalInterventions = 0;

      let tableR = document.getElementById("tflag");
      let tableI = document.getElementById("tflagi");
      paginationBlock.innerHTML = r.pages;
      // let tbodyR = document.getElementById("tableBody");

      // we had stored the attributes to be filled in the rows using the data-attributes of the thead
      // so we grab the thead (for the data attributes)
      // and grab the tbody so we can append our new rows to them

      // we sort the data by id so it lines up neatly in asc order :)
      // then we iterate

      r.rows
        .sort((d1, d2) => d1.id - d2.id)
        .forEach((incident, i) => {
          // Check for the incident type, whether redFlag or intervention
          const tr = document.createElement('tr');
          const mediaUrl = r.rows[i].image || r.rows[i].video
          const date = r.rows[i].created_date,
          toString = date.slice(0,10);
          if (r.rows[i].type === "redFlag") {
            ++totalredFlags;
                tableR.appendChild(tr);
                tr.innerHTML = `
            <tr>
              <td>${r.rows[i].id}</td>
              <td>${r.rows[i].subject}</td>
              <td>${r.rows[i].comment}</td>
              <td>${mediaUrl}</td>
              <td>${r.rows[i].location}</td>
              <td>${r.rows[i].status}</td>
              <td>${toString}</td>
              <th scope="row"><button class="btn btn-sm m-0"><a href="${basePath}edit-view.html?incidentId=${incident.id}">update</a></button></th>

        </tr>
      `;
        }
                if (r.rows[i].type === "intervention") {
                  ++totalInterventions;
                  tableI.appendChild(tr);
                    tr.innerHTML = `
                    <tr>
                    <td>${r.rows[i].id}</td>
                    <td>${r.rows[i].subject}</td>
                    <td>${r.rows[i].comment}</td>
                    <td>${mediaUrl}</td>
                    <td>${r.rows[i].location}</td>
                    <td>${r.rows[i].status}</td>
                    <td>${toString}</td>
                    <th scope="row"><button class="btn btn-sm m-0"><a href="${basePath}edit-view.html?incidentId=${incident.id}">update</a></button></th>
                    
              </tr>
          `;
                }
          document.getElementById("incidentsT").innerHTML = r.totalCount;
          document.getElementById("redFlagsT").innerHTML = totalredFlags;
          document.getElementById("interT").innerHTML = totalInterventions;
        });
        
    })

.catch (err => {
  if(err && success === false){
    window.location.href = `${basePath}index.html`
  //console.error('error message', err)
  }
})

}
getIncidents();

