import React from "react";
const Hrportal = () => (
  <main /* className="col-span-2" */>
    <div class="container">
      <div class="nav-buttons">
        <button class="nav-button">View Job Applications</button>
        <button class="nav-button">View Applicants</button>
        <button class="nav-button">Manage Jobs</button>
        <button class="nav-button">Manage Locations</button>
        <button class="nav-button">Manage Departments</button>
      </div>

      <div class="card">
        <h2>The Published Jobs</h2>
        <p>5</p>
      </div>
      <div class="card">
        <h2>Jobs Yet to be Published</h2>
        <p>3</p>
      </div>
      <div class="card">
        <h2>Total Applications</h2>
        <p>100</p>
      </div>
    </div>
  </main>
);

export default Hrportal;
