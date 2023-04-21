import { useContext, useState } from 'react'
import './createGoal.styles.scss'


import { goalTypes } from '../../utils/userData/userDataFunctions';
import { UserContext } from '../../contexts/user.context'
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/Button.component';
import { updateRemoteUserData } from '../../utils/firebase/firebase.utils';
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
        goalDays: [false, false, false, false, false, false, false, true],
    });

    const days = ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday", "Sunday", "Any Day"]
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

    const handleDropDownChange = (event) => {
        const e = event.target;
        const { options } = e;
        const newOption = options[e.selectedIndex].value;
        setFormInput(old => ({ ...old, typeSelect: newOption }));
    };

    const handleGoalDayChange = (event) => {
        const { id, checked } = event.target;
        const index = parseInt(id);
        (index === 7) ? goalDays = [false, false, false, false, false, false, false, true] : goalDays[7] = false;
        goalDays[index] = checked;
        setFormInput(old => ({ ...old, goalDays: goalDays }));
    };


    const submitGoal = async (event) => {
        event.preventDefault();
        setLoading(true);
        let updatedUser = { ...currentUser };
        console.log(updatedUser);
        updatedUser.userData.goals.push(formInput);
        console.log(updatedUser)
        setCurrentUser(updatedUser);
        await updateRemoteUserData(userAuthId, currentUser.userData);
        navigate('/');

    }

    return (
        <>

            <div className='create-goal-container'>
                <form onSubmit={submitGoal}>
                    <h2 className='create-goal-header'>Create a new goal:</h2>
                    <label htmlFor='type-select' className='goal-type-label'>Goal Type</label>
                    <select id='type-select' name='typeSelect' onChange={handleDropDownChange}>
                        {
                            goalTypes.map((type, i) => {
                                return (
                                    <option key={`${type}-${i}`} value={type}>{`${type}`}</option>
                                )
                            })
                        }
                    </select>
                    <FormInput label='Title' required value={title} name='title' onChange={handleChange} />
                    <FormInput label='Description' required value={description} name='description' onChange={handleChange} />
                    <FormInput label='Weekly Interval' type='number' required value={weeklyInterval} name='weeklyInterval' onChange={handleChange} />
                    <div className='goal-days-container'>
                        {
                            days.map((day, i) => {
                                return (
                                    <div key={`${day}${i}`} className='day-container nowrap'>
                                        <input id={`${i}`} type='checkbox' checked={goalDays[i]} onChange={handleGoalDayChange} />
                                        <label htmlFor={`${i}`}>{`${day}`}</label>
                                    </div>
                                )
                            })
                        }


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