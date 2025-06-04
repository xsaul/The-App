import { useState, useEffect } from 'react';
import { TrashFill, UnlockFill , Ban, ArrowUp, ArrowDown } from "react-bootstrap-icons";
import { formatDistanceToNow } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/users")
    .then((res) => res.json())
    .then((data) => {
      const formattedData = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
        lastSeen: new Date(user.last_seen).toISOString(),
      }));
      setContacts(formattedData);
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(tooltip => {
        new window.bootstrap.Tooltip(tooltip);
      });
    })
    .catch(err => console.error("Error fetching users:", err));
}, []);

  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const filteredContacts = (contacts || []).filter(contact =>
  (contact.name && contact.name.toLowerCase().includes(search.toLowerCase())) ||
  (contact.email && contact.email.toLowerCase().includes(search.toLowerCase()))
);

  const sortedContacts = [...filteredContacts].sort((a, b) => {
  const valueA = a[sortColumn] || ""; // Use an empty string if null
  const valueB = b[sortColumn] || "";
  const comparison = valueA.localeCompare(valueB);
  return sortOrder === 'asc' ? comparison : -comparison;
});

  const handleSort = (column) => {
    setSortOrder(sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const handleCheckboxChange = (id) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(contactId => contactId !== id) : [...prev, id]
    );
  };

const handleBlock = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch("http://localhost:5000/block-users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userId, userIds: selectedContacts }),
    });

    if (response.status === 403) {
      window.location.href = "/";
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to block users");
    }

    setContacts(prevContacts =>
      prevContacts.map(contact =>
        selectedContacts.includes(contact.id) ? { ...contact, isBlocked: true } : contact
      )
    );
    setSelectedContacts([]);
  } catch (error) {
    console.error("Error blocking users:", error);
  }
};

const handleUnblock = async () => {
  try {
    const response = await fetch("http://localhost:5000/unblock-users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIds: selectedContacts }),
    });
    if (response.status === 403) {
      alert("Your account is blocked. Redirecting to login.");
      window.location.href = "/";
      return;
    }
    if (!response.ok) {
      throw new Error("Failed to unblock users");
    }
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        selectedContacts.includes(contact.id) ? { ...contact, isBlocked: false } : contact
      )
    );
    setSelectedContacts([]);
  } catch (error) {
    console.error("Error unblocking users:", error);
  }
};

const handleDelete = async () => {
  try {
    const response = await fetch("http://localhost:5000/delete-users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIds: selectedContacts }),
    });
    if (response.status === 403) {
      alert("Your account is blocked. Redirecting to login.");
      window.location.href = "/";
      return;
    }
    if (!response.ok) {
      throw new Error("Failed to delete users");
    }
    setContacts(prevContacts => prevContacts.filter(contact => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};

  return (
<div className="container-fluid mt-4 px-4">
  <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-1 mb-3">
    <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
      <button className="btn btn-primary d-flex align-items-center" onClick={handleBlock}>
        <Ban className="me-2" /> Block
      </button>
      <button className="btn btn-primary d-flex align-items-center" onClick={handleUnblock}>
        <UnlockFill />
      </button>
      <button className="btn btn-danger d-flex align-items-center" onClick={handleDelete}>
        <TrashFill />
      </button>
    </div>
    <div className="mb-4 w-25 w-md-50">
      <input 
        type="text" 
        className="form-control" 
        placeholder="Filter by name or email" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>
  <div className="table-responsive">
    <table className="table table-striped w-100">
      <thead>
        <tr>
          <th scope="col" onClick={() => handleSort('name')} className="cursor-pointer">
            Name {sortColumn === 'name' && (sortOrder === 'asc' ? <ArrowUp className='cursor-pointer'/> : <ArrowDown className='cursor-pointer'/>)}
          </th>
          <th scope="col">Email</th>
          <th scope="col">Last seen</th>
        </tr>
      </thead>
      <tbody>
        {sortedContacts.map((contact, index) => (
          <tr key={index}>
            <td style={{ color: contact.isBlocked ? "red" : "black" }}>
              <input type="checkbox" className="form-check-input me-2 mb-2" checked={selectedContacts.includes(contact.id)}
                  onChange={() => handleCheckboxChange(contact.id)}/>
  {contact.name} {contact.isBlocked ? "(Blocked)" : ""}
            <br />
              <small>{contact.title}, {contact.company}</small>
            </td>
            <td>{contact.email}</td>
            <td style={{cursor: "pointer"}} data-bs-toggle="tooltip" data-bs-placement="top" title={new Date(contact.lastSeen).toLocaleString()}>
              {formatDistanceToNow(new Date(contact.lastSeen), { addSuffix: true })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ContactList;