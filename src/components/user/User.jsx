import "./User.css";
import React, { useEffect, useState } from 'react';
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../common/Header.jsx";
import AlertBar from "../common/AlertBar.jsx";
import Form from "./Form.jsx";
import UserList from "./UserList.jsx";
import UserListItem from "./UserListItem.jsx";
import { usePersons } from "../../context/PersonContext.jsx";
import { useConfirmation } from "../../hooks/useConfirmation.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const User = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const { persons, getAll, isLoading, error, create, update, remove } = usePersons();
  const { confirm, confirmModal } = useConfirmation();
  const { logout } = useAuth();

  useEffect(() => {
    getAll();
  }, []);

  const handleNewPerson = async (person) => {
    await create(person);
  }

  const handleUpdatePerson = async (person, isCurrentUser) => {
    if (isCurrentUser) {
      confirm(async (ok) => {
        if (ok) {
          await update(person);
          logout();
        }
      }, {
        title: "Confirm",
        message: "Are you sure? This will log you out.",
        confirmText: "Ok",
        cancelText: "Cancel",
      });
    } else {
      await update(person);
      setEditUser(null);
    }
  }

  const handleRemovePerson = async (person) => {
    confirm((ok) => ok && remove(person.id));
  }

  return (
    <div id="user" className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header title="Users" subtitle="Manage users" onToggleSidebar={() => setIsSidebarOpen(true)} >
          {isLoading && <div class="loader"></div>}
          {error && <AlertBar message={error.message} key={error.timestamp} />}
        </Header>
        <div className="container-lg dashboard-content">
          <div className="row">
            <div className="col-lg-11 col-xl-10 mx-auto">
              <Form header="Add User" onSave={handleNewPerson}/>
              <UserList>
                {persons.map((person) => 
                  <UserListItem key={person.id} person={person} isEditing={editUser === person.id}
                   onToggleEdit={() => setEditUser(editUser !== person.id ? person.id : null)}
                   onSave={handleUpdatePerson}
                   onRemove={handleRemovePerson} />
                )}
              </UserList>
            </div>
          </div>
        </div>
      </main>
      {confirmModal}
    </div>
  );
};

export default User