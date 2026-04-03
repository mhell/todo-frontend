import React from 'react';

const UserList = ({children}) => {
  return (
    <div className="card shadow-sm item-list mt-4">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Users</h5>
      </div>
      <div className="card-body">
        <div className="list-group">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserList;