import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  },[params.id]);

  const getNote = async () => {
    try {
      if(params.id==='new') return
      const response = await fetch(`/api/notes/${params.id}`);
      const data = await response.json();
      console.log(data);
      setNote(data);
    } catch (error) {
      console.error("Error retrieving note:", error);
    }
  }; 

  const createNote = async () => {
    try {
      fetch(`/api/notes/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }
  
  const updateNote = async () => {
    try {
      const response = await fetch(`/api/notes/${params.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      });
      if (response.ok) {
        console.log("Note updated successfully!");
      } else {
        console.error("Error updating note:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  const handleTextareaChange = (e) => {
    setNote({ ...note, body: e.target.value }); // Update only the 'body' property
  };

  
  const deleteNote = async () => {
    try {
      const response = await fetch(`/api/notes/${params.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/');
      if (response.ok) {
        console.log("Note updated successfully!");
      } else {
        console.error("Error updating note:", response.statusText);
      }
      
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  const handleSubmit = () => {
    if(params.id!=='new' && note.body===""){
      deleteNote();
    }
    else if(params.id!=='new'){
      updateNote();
    }
    else if(params.id==='new' && note.body!==null){
        createNote();
    }
    
    navigate('/'); // Navigate to the desired route
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {params.id!=='new'?(<button onClick={deleteNote} >Delete</button>):<button onClick={handleSubmit}>Done</button>}
        

      </div>
      <textarea
        onChange={handleTextareaChange}
        value={note?.body || ""} // Use 'value' instead of 'defaultValue'
      ></textarea>
    </div>
  );
};

export default NotePage;
