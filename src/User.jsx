import React,{ useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CallIcon from '@mui/icons-material/Call';
import LockIcon from '@mui/icons-material/Lock';
import './User.css'


const url = 'https://randomuser.me/api/';
function User(){
    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState(null)
    const [title, setTitle] = useState('name')
    const [value, setValue] = useState('random person')

    const GetData=async()=>{
        const response= await fetch(url);
        const data = await response.json();
       
       const person = data.results[0]
       const { phone, email } = person
       const { large: image } = person.picture
       const { password } = person.login
       const { first, last } = person.name
       const {
         dob: { age },
       } = person
       const {
         street: { number, name },
       } = person.location
   
       const newPerson = {
         image,
         phone,
         email,
         password,
         age,
         street: `${number} ${name}`,
         name: `${first} ${last}`,
       }

       setLoading(false)
       setPerson(newPerson)
       setTitle('name')
       setValue(newPerson.name)
        
    }
    useEffect(()=>{
       GetData();
    },[])

    
    const handleValue = (e) => {
        if (e.target.classList.contains('icon')) {
          const newValue = e.target.dataset.id
         
          setTitle(newValue)
        setValue(person[newValue])
        }
      }

    return(
        <>
            <div className='maindiv'>
                <div className='imgdiv'>
                    <img src={(person && person.image)} />
                </div>
                <div className='contentdiv'>
                      <div className='namediv'>
                          <h5 style={{color: '#808080c7'}}>my {title} is</h5>
                          <h3 className='sssaaa'>{value}</h3>
                      </div>
                          <div className='icondiv'>
                          <button className='icon' data-id='name' onMouseOver={handleValue}>
                            <PersonIcon />
                          </button>
                          <button  className='icon' data-id='email' onMouseOver={handleValue}>
                            <MailIcon />
                          </button>
                          <button className='icon' data-id='age' onMouseOver={handleValue}>
                            <CalendarTodayIcon />
                          </button>
                          <button className='icon' data-id='street' onMouseOver={handleValue}>
                            <LocationCityIcon />
                          </button>
                          <button className='icon' data-id='phone' onMouseOver={handleValue}>
                            <CallIcon />
                         </button>
                         <button className='icon' data-id='password' onMouseOver={handleValue}>
                           <LockIcon />
                          </button>
                     </div>
                          <button className='btn' type='button' onClick={GetData}>
            {loading ? 'loading...' : 'random user'}
          </button>

                </div>
            </div>
        </>
    )
}

export default User;