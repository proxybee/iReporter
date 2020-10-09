const basePath = "../";

const getUrl = window.location.href;
const url = new URL(getUrl);
const id = url.searchParams.get('incidentId');
const edit = document.getElementById('editBtn');
const back = document.getElementById('backBtn');

const userToken = window.localStorage.getItem("userToken");
if (!userToken) {
    window.location.href = `${basePath}sign-in.html`;
    body.style.display = "none";
    alert("You must be signed in to edit this incident, click Ok");
  }
  if (!id) {
    window.location.href = `${basePath}edit-view.html`;
}

(previewIncident = () => {
  //http://https://ireporterafrica.herokuapp.com

fetch(`http://localhost:4020/api/v1/incident/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'Application/JSON',
        'x-access-token': `${userToken}`
    },
})
.then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.error && data.error.expiredAt < Date.now()) {
      localStorage.clear()
      window.location.href = `${basePath}sign-in.html`;
    };
    if (data.error && data.success === false) {
      window.location.href = `${basePath}index.html`;
    };
    const date = data.created_date
    toString = date.slice(0,10);
    document.getElementById('edmedia').innerHTML = data.image || data.video;
    document.getElementById('creatby').innerHTML = data.createdby;
    document.getElementById('datecreated').innerHTML = toString;
    document.getElementById('postLocation').innerHTML = data.location;
    document.getElementById('subject').innerHTML = data.subject;
    document.getElementById('comment').innerHTML = data.comment;
  })
  .catch(error => console.log('Error:', error));
})();

const container = document.getElementById('postContainer')
edit.addEventListener('click', (e) => { 
      e.preventDefault()
      container.style.display = 'block';  
})

if (back) {
    back.addEventListener('click', () => { window.location.href = `${basePath}dashboardu.html` });
}

function updateComment(e) {
    e.preventDefault()

 const commentUp = {
   comment: document.getElementById('newcom').value,
   image: the_return.value,
   video: the_return.value,
   location: document.getElementById("result").placeholder
 }
 
   fetch(`https://ireporterafrica.herokuapp.com/api/v1/incidents/comment/${id}`, {
   method: "PATCH",
   body: JSON.stringify(commentUp),
   mode: 'cors',
   headers: {
       "Content-Type": 'Application/JSON',
       'x-access-token': `${userToken}`
   },
  })
 .then((res) => {
   return res.json();
   })
 .then((r) => {
  if (r.error && r.error.expiredAt < Date.now()) {
    localStorage.clear()
    window.location.href = `${basePath}sign-in.html`;
  };
  if (r.error && r.success === false) {
    window.location.href = `${basePath}index.html`;
  };
   if(r.status == 201) {
    container.style.display = 'none';
    document.getElementById('edmedia').innerHTML = r.image || r.video;
    document.getElementById('reporter').innerHTML = r.createdby;
    document.getElementById('modDate').innerHTML = r.modified_date;
    document.getElementById('postLocation').innerHTML = r.location;
    document.getElementById('comment').innerHTML = r.comment;
   
 }
   else {
    container.style.display = 'none';
    document.getElementById('created').innerText = "An error occurred while trying to update incident"; 
   }
 })
 .catch(error => {
   console.log("error message", error)
 })
}
document.getElementById("postContainer").addEventListener("submit", updateComment);
