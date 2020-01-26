const basePath = "../";

const userToken = window.localStorage.getItem("userToken");

if (!userToken) {
  window.location.href = `${basePath}sign-in.html`;
  body.style.display = "none";
  alert("You must be signed in to view Dashboard, click Ok");
}

function getIncidents() {
  // e.preventDefault()
  fetch("https://ireporterafrica.herokuapp.com/api/v1/admin/incidents", {
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
      console.log('hhhhhhhh', r)
      if (r.status == '500' && r.error.name == "TokenExpiredError") {
        localStorage.clear()
        window.location.href = `${basePath}sign-in.html`;
      }
      if (r.status == 204 || r.status == 400) {
        document.getElementById(
          "errormsg"
        ).innerText = `You do not have any Incidents Yet, Create one here ${basePath}index.html`;
      }

      let totalIncidents = 0;
      let totalredFlags = 0;
      let totalInterventions = 0;

      let tableR = document.getElementById("tflag");
      let tableI = document.getElementById("tflagi");
      // let tbodyR = document.getElementById("tableBody");

      // we had stored the attributes to be filled in the rows using the data-attributes of the thead
      // so we grab the thead (for the data attributes)
      // and grab the tbody so we can append our new rows to them

      // we sort the data by id so it lines up neatly in asc order :)
      // then we iterate

      r.rows
        .sort((d1, d2) => d1.id - d2.id)
        .forEach((incident, i) => {
          ++totalIncidents;
          // Check for the incident type, whether redFlag or intervention

          if (r.rows[i].type === "redFlag") {
            ++totalredFlags;
            // we create a new row on the body of the table
            let newRow = tableR.insertRow(tableR.rows.length);

            // we want to create as many cells as there are on the header
            // We are leaving out the last row? For our button later :)
            for (var j = 0; j < tableR.rows[0].cells.length - 1; j++) {
              let newCell = newRow.insertCell(j);
              // text to be inserted in the cell?
              // the order is an object in the format {id: c98ae954-e0d6-48bd-9a3c-63a96989af09, createdBy: '4a6a27dc-5a72-478f-bf86-9f4199498e3f', type: 'Aba', ...}
              // for the first cell in the header
              let newText = document.createTextNode(
                incident[tableR.rows[0].cells[j].dataset.name]
              );
              newCell.appendChild(newText);
              window.location.insertRow;
            }
            let btn = document.createElement("button");
            let tag = document.createElement("a");
            btn.innerText = "Update";
            tag.appendChild(btn);
            n = tableR.rows[0].cells.length - 1;
            let newCell = newRow.insertCell(n);
            newCell.appendChild(tag);

            btn.onclick = e => {
              // e.preventDefault();
              tag.href = `${basePath}adedit-view.html?incidentId=${incident.id}`;
            };
          } else if (r.rows[i].type === "intervention") {
            ++totalInterventions;
            // we create a new row on the body of the table
            let newRow = tableI.insertRow(tableI.rows.length);

            // we want to create as many cells as there are on the header
            // We are leaving out the last row? For our button later :)
            for (var k = 0; k < tableI.rows[0].cells.length - 1; k++) {
              let newCell = newRow.insertCell(k);
              // text to be inserted in the cell?
              // the order is an object in the format {id: c98ae954-e0d6-48bd-9a3c-63a96989af09, createdBy: '4a6a27dc-5a72-478f-bf86-9f4199498e3f', type: 'Aba', ...}
              // for the first cell in the header
              let newText = document.createTextNode(
                incident[tableI.rows[0].cells[k].dataset.name]
              );
              newCell.appendChild(newText);
              window.location.insertRow;
            }
            let btn = document.createElement("button");
            let tag = document.createElement("a");
            btn.innerText = "Update";
            tag.appendChild(btn);
            n = tableR.rows[0].cells.length - 1;
            let newCell = newRow.insertCell(n);
            newCell.appendChild(tag);

            btn.onclick = e => {
              // e.preventDefault();
              tag.href = `${basePath}adedit-view.html?incidentId=${incident.id}`;
            };
          }
          document.getElementById("incidentsT").innerHTML = totalIncidents;
          document.getElementById("redFlagT").innerHTML = totalredFlags;
          document.getElementById("interT").innerHTML = totalInterventions;
        });
    });
  try {
    error => {
      console.log("error message:", error);
    };
  } catch (err) {
    window.location = `${basePath}index.html`;
    console.error(err);
  }
}
getIncidents();
