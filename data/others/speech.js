var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases_appetizer = [
  'honey-glazed onion rings',
  'smoked chicken quesadilla',
  'ancho chile shrimp tacos',
  'fried calamari'
];
var phrases_main = [
  'microbrew battered halibut',
  'braised boneless short ribs',
  'grilled pork tenderloin',
  'pistachio crusted salmon',
  'lobster mac and cheese'
];
var phrases_beverage = [
  'apple juice',
  'mango juice',
  'pineapple juice',
  'iced coffee',
  'smoothies'
];

var grammar_appetizer = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrases_appetizer +';';
var grammar_main = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrases_main +';';
var grammar_beverage = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrases_beverage +';';

var recognition_appetizer = new SpeechRecognition();
var recognition_main = new SpeechRecognition();
var recognition_beverage = new SpeechRecognition();

var speechRecognitionList_appetizer = new SpeechGrammarList();
var speechRecognitionList_main = new SpeechGrammarList();
var speechRecognitionList_beverage = new SpeechGrammarList();

speechRecognitionList_appetizer.addFromString(grammar_appetizer, 1);
speechRecognitionList_main.addFromString(grammar_main, 1);
speechRecognitionList_beverage.addFromString(grammar_beverage, 1);

recognition_appetizer.grammars = speechRecognitionList_appetizer;
recognition_appetizer.lang = 'en-US';
recognition_appetizer.interimResults = false;
recognition_appetizer.maxAlternatives = 1;
recognition_main.grammars = speechRecognitionList_main;
recognition_main.lang = 'en-US';
recognition_main.interimResults = false;
recognition_main.maxAlternatives = 1;
recognition_beverage.grammars = speechRecognitionList_beverage;
recognition_beverage.lang = 'en-US';
recognition_beverage.interimResults = false;
recognition_beverage.maxAlternatives = 1;

var appetizer, main, beverage, flag_appetizer, flag_main, flag_beverage, flag = 0;;

function Test() {
	alert("Test");
}

function speech_Appetizer() {
	recognition_appetizer.start();
	recognition_appetizer.onresult = function(event) {
		var speechResult = event.results[0][0].transcript.toLowerCase();
		flag_appetizer = 0;
		var flag_onion = -1;
		var flag_quesadilla = -1;
		var flag_taco = -1;
		var flag_calamari = 0;
		speechResult.split(' ').forEach(function(val, i) {
			if (val == "honey-glazed" || val == "onion" || val == "rings" || val == "ring" && flag_onion != 1) flag_onion++;
			if (val == "smoked" || val == "chicken" && flag_quesadilla != 1) flag_quesadilla++;
			if (val == "ancho" || val == "chile" || val == "shrimp" && flag_taco != 1) flag_taco++;
			if (val == "quesadilla") flag_quesadilla = 1;
			if (val == "taco" || val == "tacos") flag_taco = 1;
			if (val == "calamari") flag_calamari = 1;
		});

		if (flag_onion == 1) {
			appetizer = "honey-glazed onion rings";
			flag_appetizer++;
		} else if (flag_quesadilla == 1) {
			appetizer = "smoked chicken quesadilla";
			flag_appetizer++;
		} else if (flag_taco == 1) {
			appetizer = "ancho chile shrimp tacos";
			flag_appetizer++;
		} else if (flag_calamari == 1) {
			appetizer = "fried calamari";
			flag_appetizer++;
		} else {flag_appetizer = 0;}
		console.log('Confidence: ' + event.results[0][0].confidence);
		console.log('Speech Received:' + speechResult);
		flag = 1;
	}
}

function speech_Main() {
	recognition_main.start();
	recognition_main.onresult = function(event) {
		var speechResult = event.results[0][0].transcript.toLowerCase();
		flag_main = 0;
		var flag_halibut = -1;
		var flag_ribs = -2;
		var flag_tenderloin = -1;
		var flag_salmon = -1;
		var flag_lobster = -2;
		speechResult.split(' ').forEach(function(val, i) {
			if (val == "microbrew" || val == "battered" && flag_halibut != 1) flag_halibut++;
			if (val == "braised" || val == "boneless" || val == "short" && flag_ribs != 1) flag_ribs++;
			if (val == "grilled" || val == "pork" && flag_tenderloin != 1) flag_tenderloin++;
			if (val == "pistachio" || val == "crusted" && flag_salmon != 1) flag_salmon++;
			if (val == "lobster" || val == "mac" || val == "and" || val == "cheese" && flag_lobster != 1) flag_lobster++;
			if (val == "halibut") flag_halibut = 1;
			if (val == "ribs") flag_ribs = 1;
			if (val == "tenderloin") flag_tenderloin = 1;
			if (val == "salmon") flag_salmon = 1;
		});

		if (flag_halibut == 1) {
			main = "microbrew battered halibut";
			flag_main++;
		} else if (flag_ribs == 1) {
			main = "braised boneless short ribs";
			flag_main++;
		} else if (flag_tenderloin == 1) {
			main = "roast pork tenderloin";
			flag_main++;
		} else if (flag_salmon == 1) {
			main = "pistachio crusted salmon";
			flag_main++;
		} else if (flag_lobster == 1) {
			main = "lobster mac and cheese";
			flag_main++;
		} else {flag_main = 0;}
		console.log('Confidence: ' + event.results[0][0].confidence);
		console.log('Speech Received:' + speechResult);
		flag = 2;
	}
}

function speech_Beverage() {
	recognition_beverage.start();
	recognition_beverage.onresult = function(event) {
		var speechResult = event.results[0][0].transcript.toLowerCase();
		flag_beverage = 0;
		var flag_apple = -1;
		var flag_mango = -1;
		var flag_pineapple = -1;
		var flag_coffee = 0;
		var flag_smoothies = 0;
		speechResult.split(' ').forEach(function(val, i) {
			if (val == "juice") { flag_apple++; flag_mango++; flag_pineapple++; }
			if (val == "apple") flag_apple++;
			if (val == "mango") flag_mango++;
			if (val == "pineapple") flag_pineapple++;
			if (val == "iced" || val == "coffee" && flag_coffee != 1) flag_coffee++;
			if (val == "smoothies" || val == "smoothie") flag_smoothies++;
		});

		if (flag_apple == 1) {
			beverage = "apple juice";
			flag_beverage++;
		} else if (flag_mango == 1) {
			beverage = "mango juice";
			flag_beverage++;
		} else if (flag_pineapple == 1) {
			beverage = "pineapple juice";
			flag_beverage++;
		} else if (flag_coffee == 1) {
			beverage = "coffee";
			flag_beverage++;
		} else if (flag_smoothies == 1) {
			beverage = "smoothies"; flag_beverage++;
		} else {flag_beverage = 0;}

		console.log('Confidence: ' + event.results[0][0].confidence);
		console.log('Speech Received:' + speechResult);
		flag = 3;
	}
}