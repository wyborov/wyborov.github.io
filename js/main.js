ToBase64 = function (u8) {
    return btoa(String.fromCharCode.apply(null, u8));
}

FromBase64 = function (str) {
    return atob(str).split('').map(function (c) { return c.charCodeAt(0); });
}

window.addEventListener('load', async (event) => {
	a = new URL(window.location.href);
	data = await Promise.all(a.searchParams.getAll("d").map((i) => {
		if (i != null) {
			return fetch("https://tinyurl.com/"+i).then((e) => {
				let b = new URL(e.url);
				return b.searchParams.get("d")
			});
		}
	}));

	var unpacked = pako.inflate(new Uint8Array(FromBase64(data.join('').replace(/ /g, '+'))))
	document.querySelector("#content").innerHTML = new TextDecoder().decode(unpacked)
	if (a.pathname == "/") {
		document.querySelector("#switch").innerHTML = "<a href='/light.html"+a.search+"'>Jasny motyw</a>"
	} else {
		document.querySelector("#switch").innerHTML = "<a href='/"+a.search+"'>Ciemny motyw</a>"
	}
});
