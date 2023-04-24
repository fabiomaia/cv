const _EVENTS = [
  { "name": "FIFA World Cup", "period": 0.25 },
  { "name": "UEFA European Championship", "period": 0.25 },
  { "name": "New Year", "period": 1 },
  { "name": "Christmas", "period": 1 },
  { "name": "Meteor Shower / comets / etc", "period": 1 },
]

function compute(age, expectancy) {
	const arr = []
	for(const e of _EVENTS ) {
		console.log(e)
		const times = (expectancy - age) / e.period 
		arr.push({ "name": e.name, "times": times })
	}
	console.log(arr)
	return arr
}

const getAge = birthday => Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e+10)

document.getElementById('submit').addEventListener('click', function () {
	const birthday = new Date(document.getElementById('birthday').value)
	const age = getAge(birthday)
	console.log(birthday, age)
	const expectancy = 80
	const results = compute(age, expectancy)
	for(const r of results) {
		console.log(`You will witness ${r.name} ${r.times} more times`)

	}
})
