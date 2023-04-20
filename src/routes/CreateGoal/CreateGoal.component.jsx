import { useContext, useState } from 'react'
import './createGoal.styles.scss'

import { UserContext } from '../../contexts/user.context'
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/Button.component';


const CreateGoal = () => {
    const { currentUser, setCurrenUser } = useContext(UserContext)


    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        weeklyInterval: 1,
        numberOfDays: 1,
        goalDays: [false,false,false,false,false,false,false,true],
    });
    let {
        title,
        description,
        weeklyInterval,
        goalDays,
    } = formInput;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInput(old => ({ ...old, [name]: value }));
    };

   const handleGoalDayChange = (event) => {
    
    const { id, checked } = event.target;
    const index = parseInt(id);
   (index === 7) ?   goalDays = [false,false,false,false,false,false,false,true] : goalDays[7] = false;
   goalDays[index] = checked;
   setFormInput(old => ({ ...old, goalDays: goalDays }));

    };


    const submitGoal = () => {
        console.log('Submit Goal')
    }
    return (
        <div className='create-goal-container'>
            <h2>Create a new goal</h2>
            <form onSubmit={submitGoal}>
                <FormInput label='Title' required value={title} name='title' onChange={handleChange} />
                <FormInput label='Description' required value={description} name='description' onChange={handleChange} />
                <FormInput label='Weekly Interval' type='number' required value={weeklyInterval} name='weeklyInterval' onChange={handleChange} />
                <FormInput label='Which days?' required value={''} name='goalDays'/>
                <div className='goal-days-container'>
                    <input id={"0"} type='checkbox' checked={goalDays[0]}  onChange={handleGoalDayChange} />
                    <label htmlFor='0'>Monday</label>
                    <input id={"1"} type='checkbox'  checked={goalDays[1]} onChange={handleGoalDayChange} />
                    <label htmlFor='1'>Tuesday</label>
                    <input id={"2"} type='checkbox'  checked={goalDays[2]} onChange={handleGoalDayChange} />
                    <label htmlFor='2'>Wednsday</label>
                    <input id={"3"} type='checkbox'  checked={goalDays[3]} onChange={handleGoalDayChange} />
                    <label htmlFor='3'>Thursday</label>
                    <input id={"4"} type='checkbox'  checked={goalDays[4]} onChange={handleGoalDayChange} />
                    <label htmlFor='4'>Friday</label>
                    <input id={"5"} type='checkbox' checked={goalDays[5]} onChange={handleGoalDayChange} />
                    <label htmlFor='5'>Saturday</label>
                    <input id={"6"} type='checkbox' checked={goalDays[6]}  onChange={handleGoalDayChange} />
                    <label htmlFor='6'>Sunday</label>
                    <input id={"7"} type='checkbox' checked={goalDays[7]}  onChange={handleGoalDayChange} />
                    <label htmlFor='7'>Any Day</label>
                </div>

                <div className="buttons-container">
                    <Button type='submit'>Add New Goal</Button>
                </div>
            </form>
        </div>
    )
};

export default CreateGoal;