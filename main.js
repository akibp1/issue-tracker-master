document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  if(description === "" || severity === "" || assignedTo == ""){
    window.alert("You have to fill the input fields")
  }
  else{
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => +issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const remainingIssues = issues.filter( issue=> issue.id != id ) 
  console.log(delete remainingIssues );
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();

}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  if(issues.length > 0){
    const openIssues = issues.filter(issue => issue.status == "Open");
    const closedIssues = issues.filter(issue => issue.status =='Closed');
    document.getElementById('issues_left_value').innerText = openIssues.length;
    document.getElementById('total_issue_value').innerText = issues.length;
    document.getElementById('issues_done_value').innerText = closedIssues.length;
  }
  else{
    document.getElementById('issues_left_value').innerText = "";
    document.getElementById('total_issue_value').innerText = "";
    document.getElementById('issues_done_value').innerText = "";
  }
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  style="overflow:hidden;"
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    let statusDesc = `<h3 id="status" style="overflow:hidden"> ${description} </h3>`
    let closeBtn = `<a href='javascript:void();' onclick="closeIssue(${id})" class="btn btn-warning">Close</a>`
    if(status === 'Closed'){
      statusDesc = `<h3 id="status" style="overflow:hidden"><strike> ${description} </strike></h3>`
      closeBtn = `<a href='javascript:void();' disabled class="btn btn-warning">Close</a>`
    }
        issuesList.innerHTML +=   `<div class="well">
                                  <h6>Issue ID: ${id} </h6>
                                  <p><span class="label label-info"> ${status} </span></p>
                                  ${statusDesc}
                                  <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                  <p style="overflow:hidden"><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                  ${closeBtn}
                                  <a href='javascript:void();' onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                  </div>`;                     
                              
  }
}