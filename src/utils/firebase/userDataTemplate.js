export const userDataTemplate = {
    points: 0,
    rank: "C",
    goals: {},
};

/*
usersData example:

userData: {
    points: INT,
    rank: STR,
    goals: {
        goalName1: {
            startDate: date, | This value is set when the goal is first initiated
            currentStreak: INT, | This keeps track of the current consecutive times the goal was done on time
            missedGoalCounter: INT, | This keeps track of the times the user missed this goal since the last time is was completed
            totalMissedGoalCounter: INT, | this keeps track of the totla number of thime this goal was missed
            weeklyInterval: INT | This is a fixed value set by the user. Determines how many weeks in between completing goal. ie 1= every week, 2 = every 2 weeks, etc
            numberOfDays: INT 0-7, | this is a fixed value set by the user. Represents how many times the goal is done on each weekly interval
            goalDays: [INT], | this is a fixed value set by the user. represents the day of the week Mon(1) - Sun(7) or 0 which is no particular day set. This is an array, array.length = numberOfDays
        }
    }
}
*/
