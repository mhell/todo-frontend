import "./User.css";
import React, { useState } from 'react';
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../common/Header.jsx";
import Form from "./Form.jsx";
import { usePersons } from "../../context/PersonContext.jsx";

const User = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { persons } = usePersons();

  const handleNewPerson = () => {

  }

  return (
    <div id="user" className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header title="Users" subtitle="Manage users" onToggleSidebar={() => setIsSidebarOpen(true)} />
        <div className="container-lg dashboard-content">
          <div className="row">
            <div className="col-lg-11 col-xl-10 mx-auto">
              <Form header="Add User" onSave={handleNewPerson}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default User