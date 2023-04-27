import { useContext, useState } from 'react'
import './createGoal.styles.scss'


import { goalTypes } from '../../utils/userData/userDataFunctions';
import { UserContext } from '../../contexts/user.context'
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/Button.component';
import { daysArray } from '../../utils/userData/userDataFunctions';
import { useNavigate } from 'react-router-dom';


const CreateGoal = () => {
    const { currentUser, setCurrentUser, userAuthId } = useContext(UserContext)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const [formInput, setFormInput] = useState({
        typeSelect: 'other',
        title: '',
        description: '',
        weeklyInterval: 1,
        numberOfDays: 1,
        startDate: new Date(Date.now()),
        currentStreak: 0,
        missedGoalCounter: 0,
        totalMissedGoalCounter: 0,
        goalDays: [false, false, false, false, false, false, false, true],

        lastDate: new Date(Date.now()),
        daysCompleted: [false, false, false, false, false, false, false],
    });


    let {
        title,
        description,
        weeklyInterval,
        goalDays,
        numberOfDays
    } = formInput;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInput(old => ({ ...old, [name]: value }));
    };

    const handleDropDownChange = (event) => {
        const e = event.target;
        const { options } = e;
        const newOption = options[e.selectedIndex].value;
        setFormInput(old => ({ ...old, typeSelect: newOption }));
    };

    const handleGoalDayChange = (e, i) => {
        const { checked } = e.target;
        (i === 7) ? goalDays = [false, false, false, false, false, false, false, true] : goalDays[7] = false;
        goalDays[i] = checked;
        setFormInput(old => ({ ...old, goalDays: goalDays }));
    };


    const submitGoal = async (event) => {
        event.preventDefault();
        setLoading(true);
        let updatedUser = { ...currentUser };
        updatedUser.userData.goals.push(formInput);
        setCurrentUser(updatedUser);
        navigate('/');
    }

    return (
        <>

            <div className='create-goal-container'>
                <form onSubmit={submitGoal}>
                    <h2 className='create-goal-header'>Create a new goal:</h2>

                    <label htmlFor='type-select' className='goal-type-label'>Goal Type</label>
                    <span className='select-container'>
                        <img alt='goal icon' src={`icons/${formInput.typeSelect}.png`} />
                        <select id='type-select' name='typeSelect' required onChange={handleDropDownChange}>
                            {
                                goalTypes.map((type, i) => {
                                    return (
                                        <option key={`${type}-${i}`} value={type}>{`${type}`}</option>
                                    )
                                })
                            }
                        </select>
                    </span>
                    <FormInput label='Title'  value={title} name='title' onChange={handleChange} />
                    <FormInput label='Description'  value={description} name='description' onChange={handleChange} />
                    <FormInput label='Weekly Interval' type='number'  value={weeklyInterval} name='weeklyInterval' onChange={handleChange} />
                    <div className='goal-days-container'>
                        {
                            daysArray.map((day, i) => {
                                return (
                                    <div key={`${day}${i}`} className='day-container nowrap'>
                                        <input id={`${i}`}  type='checkbox' checked={goalDays[i]} onChange={(e) => handleGoalDayChange(e,i)} />
                                        <label htmlFor={`${i}`}>{`${day}`}</label>
                                    </div>
                                )
                            })
                        }

                        <div style={{ display: (formInput.goalDays[7]) ? 'block' : 'none' }}>
                            <FormInput label='Days per weekly interval:' type='number' min="1" max="7"  value={numberOfDays} name='numberOfDays' onChange={handleChange} />
                        </div>
                    </div>

                    <div className="buttons-container">
                        {(loading) ? (<Button type='button'>Updating...</Button>) : (<Button type='submit'>Add New Goal</Button>)}
                    </div>
                </form>
            </div>
        </>
    )
};

export default CreateGoal;