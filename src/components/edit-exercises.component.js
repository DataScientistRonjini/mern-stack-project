import React, {Component, useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default function EditExercises({match}){
    const { id } = useParams();
    const userInputRef = useRef(null);
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    

    useEffect(() => {
        axios
          .get(`http://localhost:5000/exercises/${id}`)
          .then(response => {
            const { username, description, duration, date } = response.data;
            setUsername(username);
            setDescription(description);
            setDuration(duration);
            setDate(new Date(date));
          })
          .catch(error => {
            console.log(error);
          });
    
        axios
          .get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              const usernames = response.data.map(user => user.username);
              setUsers(usernames);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, [id]);
    

      const onChangeUsername = e => {
        setUsername(e.target.value);
      };
    
      const onChangeDescription = e => {
        setDescription(e.target.value);
      };
    
      const onChangeDuration = e => {
        setDuration(e.target.value);
      };
    
      const onChangeDate = date => {
        setDate(date);
      };
    
      const onSubmit = e => {
        e.preventDefault();
    
        const exercise = {
          username,
          description,
          duration,
          date
        };
    
        console.log(exercise);
    
        axios
          .post(`http://localhost:5000/exercises/update/${id}`, exercise)
          .then(res => {
            console.log(res.data, "test456");
          })
          .catch(err => {
            console.log(err);
          });
    
        window.location = '/';
      };

    
        return(
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label>Username:</label>
                        <select ref={userInputRef} required className='form-control' value={username} onChange={onChangeUsername}>
                            {
                                users.map(function(user){
                                    return <option key={user} value={user}>{user}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description:</label>
                        <input type="text" required className='form-control' value={description} onChange={onChangeDescription}/>

                    </div>
                    <div className='form-group'>
                        <label>Duration (in minutes):</label>
                        <input type="text" className='form-control' value={duration} onChange={onChangeDuration}/>
                    </div>
                    <div className='form-group'>
                            <label>Date:</label>
                            <div>
                                <DatePicker selected={date} onChange={onChangeDate}/>
                            </div>
                    </div>
                    <div className='form-group'>
                            <input type="submit" value="Edit Exercise Log" className='btn btn-primary'/>
                    </div>

                </form>
            </div>
        )

}