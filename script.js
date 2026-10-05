const checkInForm = document.getElementById('checkInForm');
const attendeeNameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');
const greeting = document.getElementById('greeting');
const attendeeCount = document.getElementById('attendeeCount');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.getElementById('progressBar');
const rosterCount = document.getElementById('rosterCount');
const emptyRoster = document.getElementById('emptyRoster');
const attendeeList = document.getElementById('attendeeList');

const teamNames = {
	water: 'Team Water Wise',
	zero: 'Team Net Zero',
	power: 'Team Renewables'
};

let attendees = JSON.parse(localStorage.getItem('summitAttendees')) || [];

function updateAttendance() {
	const teamCounts = {
		water: 0,
		zero: 0,
		power: 0
	};

	attendeeCount.textContent = attendees.length;
	progressContainer.setAttribute('aria-valuenow', attendees.length);
	progressBar.style.width = `${attendees.length * 2}%`;
	rosterCount.textContent = attendees.length === 1
		? '1 person'
		: `${attendees.length} people`;
	emptyRoster.hidden = attendees.length > 0;
	attendeeList.innerHTML = '';

	for (let index = 0; index < attendees.length; index++) {
		const attendee = attendees[index];
		teamCounts[attendee.team]++;

		const listItem = document.createElement('li');
		const name = document.createElement('span');
		const team = document.createElement('span');

		name.textContent = attendee.name;
		team.textContent = teamNames[attendee.team];
		team.className = `attendee-team ${attendee.team}`;
		listItem.append(name, team);
		attendeeList.appendChild(listItem);
	}

	document.getElementById('waterCount').textContent = teamCounts.water;
	document.getElementById('zeroCount').textContent = teamCounts.zero;
	document.getElementById('powerCount').textContent = teamCounts.power;
}

checkInForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const name = attendeeNameInput.value.trim();
	const team = teamSelect.value;
	if (!name) {
		greeting.textContent = 'Please enter an attendee name.';
		greeting.className = 'error-message';
		greeting.style.display = 'block';
		attendeeNameInput.focus();
		return;
	}

	const matchingName = attendees.some(function (attendee) {
		return attendee.name.toLowerCase() === name.toLowerCase();
	});

	if (matchingName) {
		greeting.textContent = `${name} is already checked in.`;
		greeting.className = 'error-message';
		greeting.style.display = 'block';
		attendeeNameInput.focus();
		return;
	}

	if (attendees.length >= 50) {
		greeting.textContent = 'The summit has reached its 50-person check-in limit.';
		greeting.className = 'error-message';
		greeting.style.display = 'block';
		return;
	}

	attendees.push({ name: name, team: team });
	localStorage.setItem('summitAttendees', JSON.stringify(attendees));
	updateAttendance();

	greeting.textContent = `Welcome, ${name}! You are checked in with ${teamNames[team]}.`;
	greeting.className = 'success-message';
	greeting.style.display = 'block';
	checkInForm.reset();
	attendeeNameInput.focus();
});

updateAttendance();
