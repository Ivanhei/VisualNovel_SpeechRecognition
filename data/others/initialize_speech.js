var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
  'I wear clothes everyday',
  'I love to sing because it\'s fun',
  'where are you going',
  'can I call you tomorrow',
  'why did you talk while I was talking',
  'she enjoys reading books and playing games',
  'where are you going',
  'have a great day',
  'she sells seashells on the seashore'
];

function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

function checkLength(str1, str2) {
  var words_str1 = str1.split(' ');
  var words_str2 = str2.split(' ');
  if(words_str2.length != words_str1.length) {
    return 0;
  } else {
    return 1;
  }
}

function findDiff(str1, str2) {
  var diff = [];
  str2.split(' ').forEach(function(val, i) {
    if(val != str1.split(' ')[i]) {diff.push(val);}
    });
  return diff;
}

function alertwindow() {alert("Test");}

function testSpeech() {
	var phrase = phrases[randomPhrase()];
	// To ensure case consistency while checking with the returned output text
	phrase = phrase.toLowerCase();
	var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
	var recognition = new SpeechRecognition();
	var speechRecognitionList = new SpeechGrammarList();
	speechRecognitionList.addFromString(grammar, 1);
	recognition.grammars = speechRecognitionList;
	recognition.lang = 'en-US';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;

	recognition.start();

	recognition.onresult = function(event) {
	// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
	// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
	// It has a getter so it can be accessed like an array
	// The first [0] returns the SpeechRecognitionResult at position 0.
	// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
	// These also have getters so they can be accessed like arrays.
	// The second [0] returns the SpeechRecognitionAlternative at position 0.
	// We then return the transcript property of the SpeechRecognitionAlternative object 
		var speechResult = event.results[0][0].transcript.toLowerCase();
		var phrase_words = phrase.split(' ');
		if(speechResult === phrase) {
			resultPara.textContent = 'I heard the correct phrase!';
			resultPara.style.background = 'lime';
			comPara.textContent = 'Perfect!';
		} 
		else {
			var mispronunced = findDiff(speechResult, phrase);
			phrasePara.textContent = "";
			resultPara.textContent = 'That didn\'t sound right.';
			resultPara.style.background = 'red';
			//Newly added code... detecting the difference between the results and the phrase
			if(checkLength(speechResult, phrase)) {
				comPara.textContent = "You have mispronounced the following word(s): " + mispronunced.toString();
			} 
			else {
				comPara.textContent = "Sentence length doesn't match, please try again.";
			}
			phrase_words.forEach(function(val, i) {
				if(val == mispronunced[i]) {phrasePara.textContent += val + " ";}
				else {phrasePara.textContent += val + " "}
			});
		 }


		console.log('Confidence: ' + event.results[0][0].confidence);
	}

	recognition.onspeechend = function() {
		recognition.stop();
		testBtn.disabled = false;
		testBtn.textContent = 'Start new test';
	}

	recognition.onerror = function(event) {
		diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
	}

	recognition.onaudiostart = function(event) {
		//Fired when the user agent has started to capture audio.
		console.log('SpeechRecognition.onaudiostart');
	}

	recognition.onaudioend = function(event) {
		//Fired when the user agent has finished capturing audio.
		console.log('SpeechRecognition.onaudioend');
	}

	recognition.onend = function(event) {
		//Fired when the speech recognition service has disconnected.
		console.log('SpeechRecognition.onend');
	}

	recognition.onnomatch = function(event) {
		//Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
		console.log('SpeechRecognition.onnomatch');
	}

	recognition.onsoundstart = function(event) {
		//Fired when any sound — recognisable speech or not — has been detected.
		console.log('SpeechRecognition.onsoundstart');
	}

	recognition.onsoundend = function(event) {
		//Fired when any sound — recognisable speech or not — has stopped being detected.
		console.log('SpeechRecognition.onsoundend');
	}

	recognition.onspeechstart = function (event) {
		//Fired when sound that is recognised by the speech recognition service as speech has been detected.
		console.log('SpeechRecognition.onspeechstart');
	}
	recognition.onstart = function(event) {
		//Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
		console.log('SpeechRecognition.onstart');
	}
}