// import React, { useState } from 'react';
// import "./Service.css"
// export default function AssignTo() {

//   const assignees = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis', 'David Wilson','Emily Davis', 'David Wilson','Emily Davis', 'David Wilson','Emily Davis', 'David Wilson'];
//   const [inputValue, setInputValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [assignList,setAssignList]=useState([]);


//    const fetchUserAPI =async()=>{

//     try {
//      const  response= await axios.get(`http://localhost:5000/api/users/search?searchTerm=${inputValue}`)

//      console.log(response)
//     } catch (error) {
//       console.log(error)
//     }
//    }



//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);

//     if (value.trim()) {
//       const filteredSuggestions = assignees
//         .filter((assignee) =>
//           assignee.toLowerCase().includes(value.toLowerCase())
//         )
//         .slice(0, 5); 

//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const addAssigneesToList=(data)=>{
//    setAssignList([...assignList , data])

//   }

//   const deleteAssigneesFromList=(data)=>{
//    const newData=assignList.filter((item)=>{
//     return item!==data
//    })
//    setAssignList([...newData])
//   }

//   console.log(assignList)
//   return (
//     <>
    
//     <div className="task_c_display_assigns">
//   {assignList.length > 0 ? (
//     assignList.map((item) => (
//       <div className="task_c_display_assigns_item" key={item}> 
//         <span className="s1">{item}</span>
//         <span className="s2" onClick={()=>deleteAssigneesFromList(item)}>X</span>
//       </div>
//     ))
//   ) : (
//     ""
//   )}
// </div>

//         <div className="task_c_assign">
//           <label style={{width:"15vh"}}>Assign to</label>
//           <input
//         type="text"
//         // its css is in the taskcreate.css file
//         className="task_c_title_input"
//         placeholder="Add an assignee"
//         value={inputValue}
//         onChange={handleInputChange}
//         required
//       />
      
//       {suggestions.length > 0 && (
//         <div className="suggestions-list">
//           {suggestions.map((suggestion, index) => (
//             <div key={index} className="suggestion-item">

//        <div className='suggestion_item_logo'>VY</div>
//        <div className='suggestion_item_email'>vyadav99x1@gmail.com</div>
//        <button className='suggestion_item_button' disabled={assignList.includes(suggestion)} style={{backgroundColor:assignList.includes(suggestion)? "rgb(238, 236, 236)":"", cursor:assignList.includes(suggestion)?"not-allowed":"" }} onClick={()=>addAssigneesToList(suggestion)}>Assign</button>
//             </div>
//           ))}
//         </div>
//       )}
          
//         </div>





//       {/* <input
//         type="text"
//         // its css is in the taskcreate.css file
//         className="task_c_title_input"
//         placeholder="Add an assignee"
//         value={inputValue}
//         onChange={handleInputChange}
//         required
//       />
      
//       {suggestions.length > 0 && (
//         <div className="suggestions-list">
//           {suggestions.map((suggestion, index) => (
//             <div key={index} className="suggestion-item">

//        <div className='suggestion_item_logo'>VY</div>
//        <div className='suggestion_item_email'>vyadav99x1@gmail.com</div>
//        <button className='suggestion_item_button' onClick={()=>addAssigneesToList(suggestion)}>Assign</button>
//             </div>
//           ))}
//         </div>
//       )} */}
//     </>
//   );
// }


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./Service.css";

export default function AssignTo() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [assignList, setAssignList] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchUserAPI = async () => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/search?searchTerm=${inputValue}`);
      setSuggestions(response.data.results || []); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 
  const debouncedFetchUserAPI = useCallback(debounce(fetchUserAPI, 500), [inputValue]);

 
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.trim()) {
      debouncedFetchUserAPI();
    }
  }, [inputValue, debouncedFetchUserAPI]);

  const addAssigneesToList = (data) => {
    setAssignList([...assignList, data]);
  };

  const deleteAssigneesFromList = (data) => {
    const newData = assignList.filter((item) => item !== data);
    setAssignList([...newData]);
  };

  console.log(assignList)

  return (
    <>
     
      <div className="task_c_display_assigns" style={{display:assignList.length>0?"flex":"none"}}>
        {assignList.length > 0 && assignList.map((item, index) => (
          <div className="task_c_display_assigns_item" key={index}>
            <span className="s1">{item.name}</span>
            <span className="s2" onClick={() => deleteAssigneesFromList(item)}>X</span>
          </div>
        ))}
      </div>

      {/* Input for adding assignee */}
      <div className="task_c_assign">
        <label style={{ width: "15vh" }}>Assign to</label>
        <input
          type="text"
          className="task_c_title_input"
          placeholder="Add an assignee"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
        
   
        {loading ? (
          <div>Loading...</div>
        ) : suggestions.length > 0 && (
          <div className="suggestions-list" style={{display:inputValue===""?"none":""}}>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                <div className='suggestion_item_logo'>{(suggestion.name).substr(0,2).toUpperCase()}</div>
                <div className='suggestion_item_email'>{suggestion.email}</div>
                <button 
                  className='suggestion_item_button'
                  disabled={assignList.includes(suggestion)}
                  style={{ 
                    backgroundColor: assignList.includes(suggestion) ? "rgb(238, 236, 236)" : "", 
                    cursor: assignList.includes(suggestion) ? "not-allowed" : "pointer" 
                  }} 
                  onClick={() => addAssigneesToList(suggestion)}>
                  Assign
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

