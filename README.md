# Intel Sustainability Summit: Event Check-in App

The check-in page welcomes attendees, tracks the three sustainability teams, and saves attendance in the browser.

## Example Reflection Responses

Personalize these drafts to match what you learned while building and testing the project.

### What I Understand Better

I understand better how a form event connects user input to updates across a page. When someone checks in, the JavaScript reads the name and team, adds the attendee to an array, saves the updated array in localStorage, and redraws the total, team standings, progress bar, and roster. I also learned why the name is trimmed and checked for duplicates before it is saved.

### What I Could Explain in an Interview

I could explain how the app prevents the browser's normal form submission, then uses the selected team to update the right team count. The progress bar uses the total divided by the 50-person goal to calculate its width. The app serializes the attendee array with JSON for localStorage and reads it back when the page loads. I would also explain the limitation: localStorage belongs to one browser, so a real company-wide check-in shared across devices needs a server or shared database.

### Real-World Demo Scenario

I would demonstrate the app at an Intel sustainability summit check-in desk. I would enter an attendee's name, select their assigned team, and show the personalized welcome, updated attendance total, team turnout, and attendee roster. After checking in enough sample attendees to reach 50, I would show the goal celebration and the leading team highlight. I would explain that this prototype saves data on the current device, so a live multi-device event would need shared storage.
