import './App.css'
import { useState } from 'react'
import * as yup from "yup"
import success from '../src/assets/icon-success-check.svg'
function App() {
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    message:'',
    queryType:'',
    ruleAcceptance:false
  })
  const userSchema=yup.object().shape({
    firstName:yup.string().required(),
    lastName:yup.string().required(),
    email:yup.string().email("Must be a valid email").required('Email is required'),
    message:yup.string().required(),
    queryType:yup.string().required("Please select a query type"),
    ruleAcceptance:yup.boolean()
  })
  async function testValidation() {
    try {
      await userSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setIsSubmitted(true);
    } catch (err) {
      const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          setIsSubmitted(false); 
      }
     
    }
  
  function onHandleSubmit(event){
    event.preventDefault()
    console.log(formData)
    testValidation()
   
  }
function onHandleChange(event){
  var value=event.target.value;
  const key=event.target.name;
  const type=event.target.type
  if(type=='checkbox'){
    value=event.target.checked
  }
  
  setFormData({
    ...formData,
    [key]:value
  })
  
  setErrors({ ...errors, [event.target.name]: '' });
}



  return (
    <main>
      <form onSubmit={onHandleSubmit} >
        <h1>Contact us</h1>
        <div id="name">
          <div className="name">
          <label htmlFor="firstname">First Name <span className="req"></span></label>
        <input type="text" id="firstname" value={formData.firstName} name="firstName"
         onChange={onHandleChange}  
         style={{
          borderColor: errors.firstName? 'red' : '#ccc',
          borderWidth: '1px',
          borderStyle: 'solid',
        }} /> 
          {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>} 
        
          </div>
        <div className="name">
        <label htmlFor="lastname">Last Name <span className="req"></span></label>
        <input type="text" id="lastname"  value={formData.lastName} name="lastName"
         onChange={onHandleChange} 
         style={{
          borderColor: errors.lastName? 'red' : '#ccc',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
       />
       {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        
        </div>
        
        </div>
        <div id="email">
        <label htmlFor="email">Email Address <span className="req"></span></label>
        <input type="email" id="email" value={formData.email} name="email" 
        onChange={onHandleChange} 
        style={{
          borderColor: errors.email ? 'red' : '#ccc',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
        
        />
       {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
       
        <div id="query">
       <label htmlFor="">Query Type <span className="req"></span></label>
       <div id="Query">
       <div className="query">
        <input type="radio" name="queryType" value="General Enquiry"  onChange={onHandleChange}/>
        <label htmlFor="">General Enquery</label>
        </div>
        <div className="query">
        <input type="radio" name="queryType" value="Support Request"  onChange={onHandleChange}/>
        <label htmlFor="">Support Request</label>

        </div>
        </div>
        {errors.queryType && <span style={{ color: 'red' }}>{errors.queryType}</span>}

       </div>
       <div id="message">
       <label htmlFor="message">Message <span className="req"></span></label>
        <textarea name="message" id="message" value={formData.message}
         onChange={onHandleChange} 
         style={{
          borderColor: errors.message ? 'red' : '#ccc',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
        ></textarea>
       {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
        
       </div>
     <div id="rule">
     <input type="checkbox" name="ruleAcceptance"  onChange={onHandleChange} />
     <label htmlFor="ruleAcceptance">I consent to being contacted by the team</label><br />
     
      </div>             
       
        <button id="submit" disabled={!formData.ruleAcceptance}>Submit</button>
      </form>
      {isSubmitted && <div className='submitted'>
        <label><img src={success} /> Message Sent</label>
        <label>Thanks for completing the form!.We&apos;ll be in touch soon!</label></div>}
    </main>
  ) 
}

export default App
