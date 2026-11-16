function checkCompatibility() {
    const bloodGroup = document.getElementById("bloodGroup").value;
    const result = document.getElementById("result");

    const compatibility = {
        "A+": "A+, A-, O+, O-",
        "A-": "A-, O-",
        "B+": "B+, B-, O+, O-",
        "B-": "B-, O-",
        "AB+": "A+, A-, B+, B-, AB+, AB-, O+, O-",
        "AB-": "A-, B-, AB-, O-",
        "O+": "O+, O-",
        "O-": "O-"
    };

    if (bloodGroup === "") {
        result.innerHTML = "Please select a blood group.";
    } else {
        result.innerHTML =
            `✅ Compatible Donor Blood Groups:<br>${compatibility[bloodGroup]}`;
    }
}

document.getElementById("donorFormElement").addEventListener("submit", function(event){

    event.preventDefault();

    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value;

    // Age Validation
    if(age < 18){

        alert(
            "😊 Good initiative!\n\n" +
            "We appreciate your willingness to help others through blood donation.\n\n" +
            "However, you must be at least 18 years old to register as a blood donor."
        );

        return;
    }

    // Phone Number Validation
    if(phone.length !== 10){

        alert(
            "📞 Please enter a valid 10-digit phone number."
        );

        return;
    }

    // Success Message
    alert(
        "❤️ Thank You for Registering as a Blood Donor! 🩸\n\n" +
        "We sincerely appreciate your willingness to step forward and help others.\n\n" +
        "Your decision to donate blood can save lives, support patients in emergencies, and bring hope to families in need.\n\n" +
        "Thank you for becoming a part of the BloodConnect community.\n\n" +
        "Together, we can make a difference, one donation at a time."
    );

    this.reset();

});
async function findDonors() {

    const searchResults =
        document.getElementById("searchResults");

    searchResults.innerHTML =
        "<p>Loading donors...</p>";

    try {

        const response =
            await fetch("https://randomuser.me/api/?results=8");

        const data =
            await response.json();

        const bloodGroups = [
            "A+","A-","B+","B-",
            "AB+","AB-","O+","O-"
        ];

        let output = "";

        data.results.forEach((donor, index) => {

            output += `
                <div class="result-card">

                    <div class="donor-info">

                        <h4>
                            👤 ${donor.name.first}
                            ${donor.name.last}
                        </h4>

                        <p>
                            🩸 Blood Group:
                            ${bloodGroups[index]}
                        </p>

                        <p>
                            📍 City:
                            ${donor.location.city}
                        </p>

                    </div>

                    <button onclick="requestContact()">
                        Request Contact
                    </button>

                </div>
            `;
        });

        searchResults.innerHTML = output;

    }

    catch(error){

        searchResults.innerHTML =
            "<p>Unable to load donor data.</p>";

        console.log(error);
    }
}
function requestContact(){

    alert(
        "✅ Contact Request Sent!\n\n" +
        "To protect donor privacy, contact information is not displayed publicly.\n\n" +
        "The donor will be notified about your request."
    );
}
