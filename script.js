const checkInForm = document.getElementById('checkInForm');
const attendeeNameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');
const greeting = document.getElementById('greeting');
const attendeeCount = document.getElementById('attendeeCount');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.getElementById('progressBar');
const capacityMessage = document.getElementById('capacityMessage');
const rosterCount = document.getElementById('rosterCount');
const emptyRoster = document.getElementById('emptyRoster');
const attendeeList = document.getElementById('attendeeList');
const teamLead = document.getElementById('teamLead');

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
	progressBar.style.width = `${attendees.length / 50 * 100}%`;
	capacityMessage.textContent = attendees.length >= 50
		? 'Summit is at capacity'
		: `${50 - attendees.length} spots available`;
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

	const teamKeys = ['water', 'zero', 'power'];
	let highestCount = 0;

	for (let index = 0; index < teamKeys.length; index++) {
		const teamKey = teamKeys[index];
		const count = teamCounts[teamKey];
		const share = attendees.length === 0 ? 0 : Math.round(count / attendees.length * 100);
		const teamCard = document.querySelector(`.team-card.${teamKey}`);
		const teamProgress = teamCard.querySelector('.team-progress');

		document.getElementById(`${teamKey}Count`).textContent = count;
		document.getElementById(`${teamKey}Share`).textContent = `${share}% of turnout`;
		document.getElementById(`${teamKey}Bar`).style.width = `${share}%`;
		teamProgress.setAttribute('aria-valuenow', share);
		highestCount = Math.max(highestCount, count);
	}

	if (highestCount === 0) {
		teamLead.textContent = 'Ready to welcome you';
	} else {
		const leaders = teamKeys.filter(function (teamKey) {
			return teamCounts[teamKey] === highestCount;
		});

		for (let index = 0; index < teamKeys.length; index++) {
			const teamKey = teamKeys[index];
			const standing = document.getElementById(`${teamKey}Standing`);
			standing.textContent = teamCounts[teamKey] === highestCount
				? (leaders.length > 1 ? 'Tied for lead' : 'Leading')
				: 'In the race';
		}

		if (leaders.length > 1) {
			teamLead.textContent = 'It’s a tie at the top';
		} else {
			teamLead.textContent = `${teamNames[leaders[0]]} is leading`;
		}
	}
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
