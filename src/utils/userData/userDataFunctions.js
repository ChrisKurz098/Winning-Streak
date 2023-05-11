
import moment from 'moment/moment';

export const userDataTemplate = {
    score: 0,
    tokens: 0,
    totalStreak: 0,
    rank: "C",
    vacationMode: false,
    goals: [],
};

export const defaultGoalState = {
    typeSelect: 'other',
    title: '',
    weeklyInterval: 1,
    numberOfDays: 1,
    startDate: moment().format("MM/DD/YYYY"),
    lastInterval: moment().format("MM/DD/YYYY"),
    intervalCounter: 1,
    currentStreak: 0,
    missedGoalCounter: 0,
    totalMissedGoalCounter: 0,
    goalDays: [false, false, false, false, false, false, false, true],
    daysCompleted: [false, false, false, false, false, false, false],
}

export const goalTypes = [
    "Other",
    "Community Involvement",
    "Creativity",
    "Educational",
    "Environment",
    "Exercise",
    "Finance",
    "Fitness",
    "Health",
    "Hobbies",
    "Home",
    "Outdoors",
    "Politics",
    "Relationships",
    "Self-Care",
    "Social Life",
    "Spirituality",
    "Technology",
    "Time Management",
    "Work",
];

export const daysArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Any Day"]
//icon attribute: <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/gowi" title="GOWI">GOWI</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/kosonicon" title="kosonicon">kosonicon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/prosymbols-premium" title="Prosymbols Premium">Prosymbols Premium</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/kornkun" title="kornkun">kornkun</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/vectors-tank" title="Vectors Tank">Vectors Tank</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/anggara" title="Anggara">Anggara</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
/*
usersData example:

userData: {
    points: INT,
    rank: STR,
    goals: [
        goalName1: {
            title: STR | What the goal is (set by user)
            startDate: date, | This value is set when the goal is first initiated
            currentStreak: INT, | This keeps track of the current consecutive times the goal was done on time
            missedGoalCounter: INT, | This keeps track of the times the user missed this goal since the last time is was completed
            totalMissedGoalCounter: INT, | this keeps track of the totla number of thime this goal was missed
            weeklyInterval: INT | This is a fixed value set by the user. Determines how many weeks in between completing goal. ie 1= every week, 2 = every 2 weeks, etc
            numberOfDays: INT 0-7, | this is a fixed value set by the user. Represents how many times the goal is done on each weekly interval
            goalDays: [INT], | this is a fixed value set by the user. represents the day of the week Mon(1) - Sun(7) or 0 which is no particular day set. This is an array, array.length = numberOfDays

            lastDate: DATE  |  This indicated the last day you finished or failed a streak
            daysCompleted: [INT]  | This will switch each day you select as competed to true (index 0-6). This shopuld change the index from false to a date
    }
}
*/
