import {  useContext,  useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import data from '../assets/employees.json';
import { employeeContext } from '../App';


const Employee = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [job_title, setJobTitle] = useState('');

    const {employee, setEmployee} = useContext(employeeContext);

    //form validation
    const [errors, setErrors] = useState(
        {
            first_name:'',
            last_name: '',
            email: '',
            phone: '',
            job_title: ''
        }
    )
    //use useParams hook to get the id as parameter
    const {id} = useParams();

    //navigate to /employees page when add employee button is clicked
    const navigate = useNavigate();

    //function for dynamically changing the title of employee component i.e. same component for both
    //adding and updating
    function changePageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }
    
    const handleSubmitButton = (e) => {
        e.preventDefault(); //to stop default re-rendering process

        if(formValidation()){
            const newEmployee = {first_name, last_name, email, phone, job_title};
            console.log(newEmployee);
            if(!id){
                setEmployee((emp) => [...emp, newEmployee]);
                navigate('/employee');
            }else{
                console.log(employee);
                //id is one more than index because of convenience. that is why id-1 for index
                employee[id-1]=newEmployee;          
                navigate('/employee');
            }
        }

    }    
    function formValidation(){
        let valid = true;

        const errorsCopy = {...errors} //spread operator is used to copy objects and paste it in another object

        //first name validation
        if(first_name.trim()){
            errorsCopy.first_name='';
        }else{
            errorsCopy.first_name='First name is required!';
        }
        //last name validation
        if(last_name.trim()){
            errorsCopy.last_name='';
        }else{
            errorsCopy.last_name='Last name is required!';
            valid = false;
        }
        //email validation
        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email='Email is required!';
            valid = false;
        }
        //Phone number is required
        if(phone!=null ){
            errorsCopy.phone='';
        }else{
            errorsCopy.phone='Phone number is required';
            valid = false;
        }
        //job title validation
        if(job_title.trim()){
            errorsCopy.job_title = '';
        }else{
            errorsCopy.job_title = 'Job title is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }
  return (
    <div className='container mt-5'>
        <div className="row">
            <div className="card col-md-6 offset-md-3">
                {
                    changePageTitle()
                }
                <div className="card-body">
                    <form action="">
                        <div className='form-group mb-3'>
                            <label className='form-label fw-bold'>First Name</label>
                            <input 
                                type="text" 
                                placeholder={employee[id-1] ? employee[id-1].first_name : 'Enter Employee First Name'}
                                className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                value={first_name} //first_name is a state variable we have created
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.first_name && <div className='invalid-feedback'>{errors.first_name}</div>}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-bold'>Last Name</label>
                            <input 
                                type="text" 
                                placeholder={employee[id-1] ? employee[id-1].last_name :'Enter Employee Last Name'}
                                /* "is-invalid" and "invalid-feedback" are the bootstrap classes for form validation */
                                className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                value={last_name}//last_name is a state variable we have created
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.last_name && <div className='invalid-feedback'>{errors.last_name}</div>}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-bold'>Email</label>
                            <input 
                                type="email" 
                                placeholder={employee[id-1] ? employee[id-1].email :'Enter Employee Email Id'}       
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email} //email is a state variable we have created
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-bold'>Phone</label>
                            <input 
                                type="Number" 
                                placeholder= {employee[id-1] ? employee[id-1].phone :'Enter Employee Mobile Number'}                              
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                value={phone} //phone is a state variable we have created
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label fw-bold'>Job Title</label>
                            <input 
                                type="text" 
                                placeholder={employee[id-1] ? employee[id-1].job_title :'Enter Employee Job Title'}                               
                                className={`form-control ${errors.job_title ? 'is-invalid' : ''}`}
                                value={job_title} //job_title is a state variable we have created
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                            {errors.job_title && <div className='invalid-feedback'>{errors.job_title}</div>}
                        </div>
                        <button 
                            type='submit' 
                            className='btn btn-success'
                            onClick={handleSubmitButton}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Employee;