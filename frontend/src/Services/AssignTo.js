import React, { useState } from 'react';
import "./Service.css"
export default function AssignTo() {

  const assignees = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis', 'David Wilson','Emily Davis', 'David Wilson','Emily Davis', 'David Wilson','Emily Davis', 'David Wilson'];
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim()) {
      const filteredSuggestions = assignees
        .filter((assignee) =>
          assignee.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5); 

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <input
        type="text"
        className="task_c_title_input"
        placeholder="Add an assignee"
        value={inputValue}
        onChange={handleInputChange}
        required
      />
      
      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">

       <div className='suggestion_item_logo'>VY</div>
       <div className='suggestion_item_email'>vyadav99x1@gmail.com</div>
       <button className='suggestion_item_button'>Assign</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
