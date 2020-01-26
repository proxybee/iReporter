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
    // alert("You must be signed in to edit this incident, click Ok");
  }
  if (!id) {
    window.location.href = `${basePath}adedit-view.html`;
}

(previewIncident = () => {
  //e.preventDefault()

fetch(`http://localhost:4020/api/v1/admin/incidents/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'Application/JSON',
        'x-access-token': `${userToken}`
    },
}).then((res) => {
    return res.json();
  }).then((data) => {
    if (data.status == '500' && data.error.name == "TokenExpiredError") {
      localStorage.clear()
      window.location.href = `${basePath}sign-in.html`;
    }
    document.getElementById('edmedia').innerHTML = data.image || data.video;
    document.getElementById('creatby').innerHTML = data.createdby;
    document.getElementById('datecreated').innerHTML = data.created_date;
    document.getElementById('postLocation').innerHTML = data.location;
    document.getElementById('subject').innerHTML = data.subject;
    document.getElementById('comment').innerHTML = data.comment;
  }).catch(error => console.log('Error:', error));
})();
if (back) {
    back.addEventListener('click', () => { window.location.href = `${basePath}admin.html` });
}

  const reject = document.getElementById('rejBtn')
  const investigate = document.getElementById('invBtn')
  const resolve = document.getElementById('resBtn')

//   for(let i = 0; i < statusBtn.length; i++){
//     if(status[i].clicked){
//        statusValue = status[i].value;
//        break;
//     }
// }
  
  const statData = {status: reject.value}

 updateStatus = (e) => {
  e.preventDefault()
   fetch(`http://localhost:4020/api/v1/incidents/status/${id}`, {
   method: "PATCH",
   mode: 'cors',
   body: JSON.stringify(statData),
   headers: {
       "Content-Type": 'Application/JSON',
       'x-access-token': `${userToken}`
   },
  }).then((res) => {
   return res.json();
   }).then((r) => {
    console.log('hhhhhhhhhhhh', r)
    if(r.message) {
      alert('This incident has been closed, click ok to go back')
      window.location.href = `${basePath}/admin.html`;
      } 
    if(r.status == 'rejected'){
    window.location.href = `${basePath}/admin.html`;
    } 
 }).catch(error => {
  console.log("error message", error);
 });
 
};


if (reject) {
  reject.addEventListener('click', updateStatus);
};

const statData1 = {status: investigate.value}
updateStatus1 = (e) => {
  e.preventDefault()
   fetch(`http://localhost:4020/api/v1/incidents/status/${id}`, {
   method: "PATCH",
   mode: 'cors',
   body: JSON.stringify(statData1),
   headers: {
       "Content-Type": 'Application/JSON',
       'x-access-token': `${userToken}`
   },
  }).then((res) => {
   return res.json();
   }).then((r) => {
    console.log('hhhhhhhhhhhh', r)
    if(r.message) {
      alert('This incident has been closed, click ok to go back')
      window.location.href = `${basePath}/admin.html`;
      } 
    if(r.status == 'investigating'){
    window.location.href = `${basePath}/admin.html`;
    } 
 }).catch(error => {
  console.log("error message", error);
 });
 
};

if (investigate) {
  investigate.addEventListener('click', updateStatus1);
};

const statData2 = {status:resolve.value}
updateStatus2 = (e) => {
  e.preventDefault()
   fetch(`http://localhost:4020/api/v1/incidents/status/${id}`, {
   method: "PATCH",
   mode: 'cors',
   body: JSON.stringify(statData2),
   headers: {
       "Content-Type": 'Application/JSON',
       'x-access-token': `${userToken}`
   },
  }).then((res) => {
   return res.json();
   }).then((r) => {
    console.log('hhhhhhhhhhhh', r)
    if(r.message) {
      alert('This incident has been closed, click ok to go back')
      window.location.href = `${basePath}/admin.html`;
      } 
    if(r.status =='resolved'){
    window.location.href = `${basePath}/admin.html`;
    } 
 }).catch(error => {
  console.log("error message", error);
 });
 
};

if (resolve) {
  resolve.addEventListener('click', updateStatus2);
};

const remove = document.getElementById('delBtn');
deleteIncident = () => {
   //e.preventDefault()

return fetch(`http://localhost:4020/api/v1/incidents/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'Application/JSON',
        'x-access-token': `${userToken}`
    },
}).then((res) => {
    if (res.status == '500' && res.error.name == "TokenExpiredError") {
      localStorage.clear()
      window.location.href = `${basePath}sign-in.html`;
    }
    window.location.href = `${basePath}admin.html`
  }).catch(error => {
    console.log("error message", error);
   });
}
remove.addEventListener('click', deleteIncident);