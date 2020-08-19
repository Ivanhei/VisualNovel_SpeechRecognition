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
  'roast pork tenderloin',
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

var appetizer, main, beverage, flag_beverage = 0;

function Test() {
	alert("Test");
}

'honey-glazed onion rings',
  'smoked chicken quesadilla',
  'ancho chile shrimp tacos',
  'fried calamari'

function speech_Appetizer() {
	recognition_appetizer.start();
	recognition_appetizer.onresult = function(event) {
		var speechResult = event.results[0][0].transcript.toLowerCase();
		var flag_onion = -1;
		var flag_mango = -1;
		var flag_pineapple = -1;
		var flag_coffee = 0;
		var flag_smoothies = 0;
		speechResult.split(' ').forEach(function(val, i) {
			if (val == "juice") { flag_apple++; flag_mango++; flag_pineapple++; }
			if (val == "apple") flag_apple++;
			if (val == "mango") flag_mango++;
			if (val == "pineapple") flag_pineapple++;
			if (val == "iced" || val == "coffee") flag_coffee++;
			if (val == "smoothies") flag_smoothies++;
		});
		console.log('Confidence: ' + event.results[0][0].confidence);
	}
}
function speech_Main() {
	recognition_main.start();
	recognition_main.onresult = function(event) {
		var speechResult = event.results[0][0].transcript.toLowerCase();
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
			if (val == "iced" || val == "coffee") flag_coffee++;
			if (val == "smoothies") flag_smoothies++;
		});
		console.log('Confidence: ' + event.results[0][0].confidence);
	}
}

function speech_Beverage() {
	recognition_beverage.start();
	recognition_beverage.onresult = function(event) {
		var speechResult = event.results[0][0].transcript.toLowerCase();
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
			if (val == "smoothies") flag_smoothies++;
		});

		if (flag_apple) {
			beverage = "apple juice";
			flag_beverage++;
		} else if (flag_mango) {
			beverage = "mango juice";
			flag_beverage++;
		} else if (flag_pineapple) {
			beverage = "pineapple juice";
			flag_beverage++;
		} else if (flag_coffee) {
			beverage = "coffee";
			flag_beverage++;
		} else { beverage = "smoothies"; flag_beverage++; }

		console.log('Confidence: ' + event.results[0][0].confidence);
		console.log('Speech Received:' + speechResult);
		console.log('flag_apple = ' + flag_apple);
		console.log('flag_mango = ' + flag_mango);
		console.log('flag_pineapple = ' + flag_pineapple);
		console.log('flag_coffee = ' + flag_coffee);
		console.log('flag_smoothies = ' + flag_smoothies);
	}
}