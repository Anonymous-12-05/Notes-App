
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'


const NotePage = () => {
  const params = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  });

  let getNote = async () => {
    try {
      let response = await fetch(`/api/notes/${params.id}`);
      let data = await response.json();
      console.log(data);
      setNote(data);
    } catch (error) {
      console.error("Error retrieving note:", error);
    }
  };  

  return (
    <div>
      {note?.body}
    </div>
  );
};

export default NotePage;