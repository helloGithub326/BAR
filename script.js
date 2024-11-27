companyNameHeader = document.getElementById("company-name");
altitudeHeader = document.getElementById("altitude");
rocketFuelLevelHeader = document.getElementById("rocket-fuel-level");
rocketAILevelHeader = document.getElementById("rocket-ai-level");
switchHeader = document.getElementById("switch");
achieveModal = document.getElementById("achieve-modal");
openModal = document.getElementById("achieve");
span = document.getElementsByClassName("close")[0];
none = document.getElementById("none");
moon = document.getElementById("moon");
mars = document.getElementById("mars");
companyName = localStorage.getItem("company-name");
altitude = localStorage.getItem("altitude");
rocketFuelLevel = localStorage.getItem("rocket-fuel-level");
rocketAILevel = localStorage.getItem("rocket-ai-level");
on = false;

//Achievements
none.style.display = "block";
moon.style.display = "none";
mars.style.display = "none";

//Modal
openModal.onclick = function() {
  achieveModal.style.display = "block";
}

span.onclick = function() {
  achieveModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == achieveModal) {
    achieveModal.style.display = "none";
  }
}

//Local Storage Checking and Making
if(companyName == null){
    companyName = "Unnamed";
    localStorage.setItem("company-name", companyName);
}
companyNameHeader.innerText = `Company Name: ${companyName}`;

if(altitude == null){
    altitude = "0";
    localStorage.setItem("altitude", altitude);
}
altitudeHeader.innerText = `Altitude: ${altitude}m`;

if(rocketFuelLevel == null){
    rocketFuelLevel = 1;
    localStorage.setItem("rocket-fuel-level", rocketFuelLevel);
}
rocketFuelLevelHeader.innerText = `Rocket Fuel Level: ${rocketFuelLevel}`;

if(rocketAILevel == null){
    rocketAILevel = 1;
    localStorage.setItem("rocket-ai-level", rocketAILevel);
}
rocketAILevelHeader.innerText = `Rocket AI Level: ${rocketAILevel}`;

//Functions
function changeCompanyName(){
    companyName = prompt("New company name:")
    if(companyName == null){
        //pass
    }else if(companyName == ""){
        alert("Invalid Input");
    }else{
        companyNameHeader.innerText = `Company Name: ${companyName}`;
    }
    localStorage.setItem("company-name", companyName)
}

function onOff(){
    if(on){
        on = false;
        switchHeader.innerText = "Turn on rocket AI";
    }else{
        on = true;
        switchHeader.innerText = "Turn off rocket AI";
    }
}

function goHigher(){
    altitude = parseInt(parseInt(altitude) + parseInt(10**(rocketFuelLevel-1)));
    altitudeHeader.innerText = `Altitude: ${altitude}m`;
    localStorage.setItem("altitude", altitude);
}

function isFocused() {
    return document.hasFocus() || document.getElementById("iframe").contentWindow.document.hasFocus();
}

function upgradeRocketFuel(){
    var minimumAltitude = 10**(parseInt(rocketFuelLevel)+1);
    if(altitude >= minimumAltitude){
        if(parseInt(rocketAILevel) > parseInt(rocketFuelLevel)){
            rocketFuelLevel++;
            localStorage.setItem("rocket-fuel-level", rocketFuelLevel);
            rocketFuelLevelHeader.innerText = `Rocket Fuel Level: ${rocketFuelLevel}`;
            alert("Rocket Fuel Upgraded, relaunching rocket");
            altitude = 0
            altitudeHeader.innerText = `Altitude: ${altitude}m`;
            localStorage.setItem("altitude", altitude);
        }else{
            alert(`You need a minimum rocket AI level of ${parseInt(rocketFuelLevel)+1}`);
        }
    }else{
        alert(`You need to reach the altitude of ${minimumAltitude}m, which is ${minimumAltitude - altitude}m higher`);
    }
}

function upgradeRocketAI(){
    var minimumAltitude = 10**(parseInt(rocketAILevel)+1)
    if(altitude >= minimumAltitude){
        rocketAILevel++;
        localStorage.setItem("rocket-ai-level", rocketAILevel);
        rocketAILevelHeader.innerText = `Rocket AI Level: ${rocketAILevel}`;
        alert("Rocket AI Upgraded (Need at least level 4 for AI to function), relaunching rocket");
        altitude = 0
        altitudeHeader.innerText = `Altitude: ${altitude}m`;
        localStorage.setItem("altitude", altitude);
    }else{
        alert(`You need to reach the altitude of ${minimumAltitude}m, which is ${minimumAltitude - altitude}m higher(Need at least level 4 for AI to function)`);
    }
}

function resetData(){
    let choice = confirm("Are you sure you want to reset all your data?");
    if (choice){
    alert("Reset successful");
    localStorage.setItem("altitude", 0);
    altitude = localStorage.getItem("altitude");
    localStorage.clear();
    location.reload();
    localStorage.clear();
    location.reload();
    }
}

//Rocket AI
var autoHigher = setInterval(function(){
    if(isFocused()){
        if(rocketAILevel >= 2){
            if(on){
                altitude = parseInt(parseInt(altitude) + parseInt(10**(rocketAILevel-4)));
                altitudeHeader.innerText = `Altitude: ${altitude}m`;
                localStorage.setItem("altitude", altitude);
            }
        }
    }
}, 1);

//Achievements
var achievements = setInterval(function(){
    if(altitude >= 384400000){
        none.style.display = "none";
        moon.style.display = "block";
        if(altitude >= 54600000000){
            mars.style.display = "block";
        }
    }else{
        none.style.display = "block";
        moon.style.display = "none";
        mars.style.display = "none";
    }
}, 1);

//Keypresses
document.body.onkeyup = function(e){
    if (e.keyCode == 191) {
        let option = prompt("Settings Panel - Option? (Reset=Reset all data)").toLowerCase();
        if (option == "reset"){
            resetData();
        }else{
            alert("Incorrect option");
        }
    }
}