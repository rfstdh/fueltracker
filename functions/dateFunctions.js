//need fixed year so only month and day will be compared
const YEAR = 2022;

const SPRING_START = new Date(YEAR,3,23);
const SUMMER_START = new Date(YEAR,6,22);
const AUTUMN_START = new Date(YEAR,9,21);
const WINTER_START = new Date(YEAR,12,22);


export const checkSeason = (seasonNumber, currentDate) => {
    currentDate = currentDate.split("-")
    let currentDay = currentDate[0]
    let currentMonth = currentDate[1]
    let dateWithoutYear = new Date(YEAR, currentMonth, currentDay);
    switch (seasonNumber) {
        case 1:
            return SPRING_START <= dateWithoutYear && dateWithoutYear < SUMMER_START
        case 2:
            return SUMMER_START <= dateWithoutYear && dateWithoutYear < AUTUMN_START    
        case 3:
            return AUTUMN_START <= dateWithoutYear && dateWithoutYear < WINTER_START    
        case 4:
            return WINTER_START <= dateWithoutYear || dateWithoutYear < SPRING_START        
        default:
            return true;
    }
}