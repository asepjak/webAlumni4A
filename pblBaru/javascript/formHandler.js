document.getElementById("nextButton").addEventListener("click", function () {
    const form = document.getElementById("tracerStudyForm");
    if (form.checkValidity()) {
        // Save form data to localStorage
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            localStorage.setItem(key, value);
        }

        // Hide the tracerStudyForm and show the surveyForm
        form.style.display = "none";
        document.getElementById("surveyForm").style.display = "block";
    } else {
        alert("Harap isi semua data pribadi.");
    }
});

document.getElementById("surveyForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Save form data to localStorage
    const formData = new FormData(this);
    for (let [key, value] of formData.entries()) {
        localStorage.setItem(key, value);
    }

    // Simulate form submission (replace this with actual form submission logic)
    setTimeout(function () {
        // Redirect to the success page
        window.location.href = "../pages/success.html";
    }, 1000);
});
