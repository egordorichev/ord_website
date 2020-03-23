let events = [];

function makeEvent(name, a, ar, ac, b, br, bc) {
    return {
        name : name,
        a : a,
        ar : ar,
        ac : ac,
        b : b,
        br : br,
        bc : bc
    }
}

events[1] = makeEvent("Home.", "Kitchen.", "Eggs.", 2, "Porch.", "Sunny.", 2);
events[2] = makeEvent("Newspaper.", "News.", "Headline.", 3, "Politics.", "Boring.", 2);
events[3] = makeEvent("Warlock.", "Hero?", "Needed!", 6, "What?", "Evil.", 6);
events[6] = makeEvent("Prepare.", "Brave.", "Sword.", 7, "Cautious.", "Sword.", 7);
events[7] = makeEvent("Home.", "Stay.", "Lazy.", 7, "Leave.", "Forest.", 8);
events[8] = makeEvent("Bird.", "Feed.", "Seed.", 9, "Sing.", "Duet.", 9);
events[9] = makeEvent("Goblin.", "Fight.", "Harmless.", 10, "Chat.", "Distracted.", 10);
events[10] = makeEvent("Tower.", "Climb.", "Steep.", 11, "Approach.", "Brooding.", 11);
events[11] = makeEvent("Warlock!", "Fight.", "Charge.", 12, "Run.", "Scary!", 12);
events[12] = makeEvent("Forcefield!", "Break.", "Strong.", 12, "Why?", "Demo.", 13);
events[13] = makeEvent("Continue?", "Yes!", "Cool.", "https://store.steampowered.com/app/1079000/Ord/", "Nah.", "Tricked.", "https://store.steampowered.com/app/1079000/Ord/");

let choiceHeader = document.getElementById("ch");
let choiceA = document.getElementById("ca");
let choiceB = document.getElementById("cb");
let choiceAAnswer = document.getElementById("caa");
let choiceBAnswer = document.getElementById("cba");
let choice;
let selectedA;

function displayChoice(id) {
    choice = events[id];

    if (!choice) {
        return;
    }

    choiceAAnswer.innerHTML = "";
    choiceBAnswer.innerHTML = "";

    choiceHeader.innerHTML = choice.name;
    choiceA.innerHTML = choice.a;
    choiceB.innerHTML = choice.b;
		choiceHeader.classList.remove("hidden");

		setTimeout(function() {
			choiceA.classList.remove("hidden");
		}, 100);


		choiceA.classList.add("choice_active");
		choiceB.classList.add("choice_active");

		setTimeout(function() {
			choiceB.classList.remove("hidden");
		}, 200);
}

function choose(a) {
    if (!choice) {
        return;
    }

		setTimeout(function() {
			choiceBAnswer.classList.add("answer_active");
		}, 400);

		choiceA.classList.add("hidden");
		choiceB.classList.add("hidden");

		setTimeout(function() {
	    choiceA.innerHTML = "";
	    choiceB.innerHTML = "";
				choiceA.classList.remove("choice_active");
				choiceB.classList.remove("choice_active");

	    selectedA = a;

	    let to;
			choiceAAnswer.classList.add("answer_active");

	    if (!a) {
	        choiceAAnswer.innerHTML = choice.b;
	        choiceBAnswer.innerHTML = choice.br;

	        to = choice.bc;
	    } else {
	        choiceAAnswer.innerHTML = choice.a;
	        choiceBAnswer.innerHTML = choice.ar;

	        to = choice.ac;
	    }

	    if (typeof to === "string") {
	        setTimeout(function() {
	            window.open(to, "_blank");
	            displayChoice(1);
	        }, 500);
	    }
		}, 300);
}

let going = false;

function next() {
    if (choiceAAnswer.innerHTML !== "" && typeof choice.ac !== "string" && !going) {
			going = true;
			choiceAAnswer.classList.remove("answer_active");
			choiceBAnswer.classList.remove("answer_active");
	    choiceHeader.classList.add("hidden");

			setTimeout(function() {
				displayChoice(selectedA ? choice.ac : choice.bc);
				going = false;
			}, 400);
    }
}

window.addEventListener('touchstart', next);
document.body.addEventListener('click', next, true);

displayChoice(1);