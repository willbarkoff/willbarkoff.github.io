$(document).ready(function () {
	var urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get("year") == null) {
		$("#licenseYear").text(new Date().getFullYear())
	} else {
		$("#licenseYear").text(urlParams.get("year"))
	}

	if (urlParams.get("licensor") != null) {
		$("#licensor").text(urlParams.get("licensor"))
	}
})