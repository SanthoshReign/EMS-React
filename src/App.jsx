import './App.css'
import Employee from './components/Employee.jsx';
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ListEmployee from './components/ListEmployee.jsx'
import React, { useState } from 'react';

//import stuffs for routing purpose from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const employeeContext = React.createContext();

function App() {
  const [employee, setEmployee] = useState([]);

    /*the below code for fetching employees data from an api using AXIOS*/
  // useEffect(() => {
  //     axios.get('https://api.slingacademy.com/v1/sample-data/files/employees.json')
  //     .then(response => 
  //         {
  //             // console.log(response)
  //             setEmployee(response.data)
  //         }
  //     )
  //     .catch((error) =>
  //         console.log(error)
  //     )
  // }, [])
  //[] empty array as dependency means it will render only once
  //[employee] re-render every time changes happen in employee state

  return(
    <employeeContext.Provider value={{employee, setEmployee}}>
      <BrowserRouter>
        <Header/>
        {/* routes is a parent container and individual route is the children container */}
        <Routes>
          {/* the below route is for base url http://localhost:3000 */}
          <Route path='/' element={<ListEmployee/>}></Route>

          {/* the below route is for url http://localhost:3000/employee */}
          <Route path='/employee' element={<ListEmployee/>}></Route>

          {/* the below route is for url http://localhost:3000/addEmployee  */}
          <Route path='/addEmployee' element={<Employee/>}></Route>

          {/* the below route is for url http://localhost:3000/updateEmployee/:id  */}
          <Route path='/updateEmployee/:id' element={<Employee/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </employeeContext.Provider>
  )
}


export default App;
