import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
// import data from '../assets/employees.json';
import { employeeContext } from '../App';

const ListEmployee = () => {
  
    const {employee, setEmployee} = useContext(employeeContext);

    const navigator = useNavigate();

    const addEmployeeFunction = () => {
        navigator('/addEmployee');
    }

    //function to update employee details
    
    const updateEmployee = (id) => {
        navigator(`/updateEmployee/${id}`)
    }    

    function deleteEmployee(id){
        const list = employee.filter((_,i) => i !== id);
        setEmployee(list);
    }
    
    return (
        
        <div className='container'>
            <h1 className="text-center"> Employees List </h1>
            <button className='btn btn-primary mb-2' onClick={addEmployeeFunction}>
                Add Employee
            </button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Job Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map((employee, i) => 
                            <tr key={i+1}>
                                <td>{i+1}</td>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.job_title}</td>
                                <td>
                                    <button className="btn btn-info me-4 ms-4" onClick={() => updateEmployee(i+1)}>
                                        Update
                                    </button>
                                
                                    <button className='btn btn-danger' onClick={() => deleteEmployee(i)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>                           
                        )
                    }
                </tbody>
            </table>
        </div>
        
    )
}

export default ListEmployee;