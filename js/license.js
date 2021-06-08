var urlParams = new URLSearchParams(window.location.search);

var licenseYearElement = document.querySelector("#licenseYear")
var licensorElement = document.querySelector("#licensor")

if (urlParams.get("year") == null) {
	licenseYearElement.textContent = new Date().getFullYear()
} else {
	licenseYearElement.textContent = urlParams.get("year")
}

if (urlParams.get("licensor") != null) {
	licensorElement.textContent = urlParams.get("licensor")
}
