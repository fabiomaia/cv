async function loadData() {
	const data = await (await fetch('./data.json')).json();
	console.log(data);
}

loadData()
