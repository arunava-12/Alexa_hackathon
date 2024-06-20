document.addEventListener("DOMContentLoaded", function() {
  // Function to dynamically fill hostel options
  function fillHostelOptions() {
    const hostels = [
      "Paari", "Kaari", "Oori", "Adhiyaman", "Nelson Mandela", "Manoranjitham",
      "Mullai", "Thamarai", "Malligai", "Sannasi", "Began", "Pierre Fauchard",
      "M Block", "Senbagam", "ESQ", "Kalpana Chawla", "Meenakshi", "NRI Premium",
      "Green Pearl"
    ]; 
    const select = document.getElementById("hostelName");
    const querySelect = document.getElementById("searchHostelName");

    // Clear existing options
    select.innerHTML = "";
    querySelect.innerHTML = "";

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select hostel";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption.cloneNode(true));
    querySelect.appendChild(defaultOption.cloneNode(true));

    // Add hostel options
    hostels.forEach(function(hostel) {
      const option = document.createElement("option");
      option.value = hostel;
      option.text = hostel;
      select.appendChild(option.cloneNode(true));
      querySelect.appendChild(option.cloneNode(true));
    });
  }

  // Function to handle form submission for adding entries
  document.getElementById('entryForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const hostelName = document.getElementById('hostelName').value;
    const hostelRoomNo = document.getElementById('hostelRoomNo').value;
  
    fetch('/addEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, hostelName, hostelRoomNo })
    })
    .then(response => response.json())
    .then(data => {
      alert('Entry added successfully');
      document.getElementById('entryForm').reset();
    })
    .catch(error => console.error('Error:', error));
  });

  // Function to handle search by name button click
  document.getElementById('searchNameButton').addEventListener('click', function() {
    const name = document.getElementById('searchName').value;
    
    fetch(`/searchByName/${name}`)
      .then(response => response.json())
      .then(data => {
        displayResults(data);
      })
      .catch(error => console.error('Error:', error));
  });

  // Function to handle search by hostel and room number button click
  document.getElementById('searchHostelButton').addEventListener('click', function() {
    const hostelName = document.getElementById('searchHostelName').value;
    const roomNo = document.getElementById('searchRoomNo').value;
    
    fetch(`/searchByRoom/${hostelName}/${roomNo}`)
      .then(response => response.json())
      .then(data => {
        displayResults(data);
      })
      .catch(error => console.error('Error:', error));
  });

  // Function to display search results
  function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';
    const resultsContent = document.getElementById('searchResultsContent');
    resultsContent.innerHTML = '';

    if (data.length === 0) {
      resultsContent.innerHTML = '<p>No results found</p>';
      return;
    }

    const list = document.createElement('ul');
    
    data.forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `Name: ${entry.name}, Email: ${entry.email}, Hostel: ${entry.hostelName}, Room: ${entry.hostelRoomNo}`;
      list.appendChild(listItem);
    });
  
    resultsContent.appendChild(list);
  }

  // Function to toggle search method
  document.querySelectorAll('input[name="searchType"]').forEach(function(input) {
    input.addEventListener('change', function() {
      const searchByNameGroup = document.getElementById('searchByNameGroup');
      const searchByHostelGroup = document.getElementById('searchByHostelGroup');

      if (input.value === 'name') {
        searchByNameGroup.style.display = 'block';
        searchByHostelGroup.style.display = 'none';
      } else if (input.value === 'hostel') {
        searchByNameGroup.style.display = 'none';
        searchByHostelGroup.style.display = 'block';
      }
    });
  });

  // Initialize the page
  fillHostelOptions();
});
