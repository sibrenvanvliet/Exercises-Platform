/** Modular Zeeguu Powered Text Input Exercise @author Martin Avagyan, Sibren van Vliet
 *  @initialize it using: new TextInputExercise();
 *  @customize it by using prototypal inheritance
 **/

import $ from 'jquery';
import Exercise from './exercise';
import Util from '../util';
import Settings from "../settings";

var TextInputExercise = function (data, index, size) {
	this.init(data, index, size);
	//TODO unbind method
};

TextInputExercise.prototype = Object.create(Exercise.prototype, {
	constructor: TextInputExercise,
	/************************** SETTINGS ********************************/
});


TextInputExercise.prototype.cacheCustomDom = function(){	
	this.$to            = this.$elem.find("#ex-to");
	this.$context       = this.$elem.find("#ex-context");
	this.$input         = this.$elem.find("#ex-main-input");
	this.$showSolution  = this.$elem.find("#show_solution");
	this.$checkAnswer   = this.$elem.find("#check_answer");
	this.$clickableText = this.$elem.find(".clickable-text");
	this.$nextExercise  = this.$elem.find('#next-exercise');
	this.$feedbackBtn   = this.$elem.find('#feedback');
};

TextInputExercise.prototype.enterKeyup = function(event){
	if(event.keyCode == 13){
		if(!this.getInstanceState())//If in the primary state of footer
			this.$checkAnswer.click();
		else //If in the secondary state of footer
			this.$nextExercise.click();
	}
};

TextInputExercise.prototype.giveHint = function() {
	// Reveal X letters of the answer, where X is the number of times the Hint button was clicked.
	var hint = this.answer.slice(0, this.hintsUsed);
	
	// Add dots after the revealed letters, to show how long the answer is.
	var hintWithDots = hint;
	for (var i = hint.length; i < this.answer.length; i++) {
		var character = this.answer.charAt(i);
		
		// Display spaces as spaces, not as dots
		if (character === ' ') {
			hintWithDots += character;
		} else {
			hintWithDots += '.';
		}
	}
	
	this.$input.val("").attr("placeholder", "Hint: " + hintWithDots).focus();
};

TextInputExercise.prototype.wrongAnswerAnimation = function(){
	this.shake.shakeElement(this.$input);
};

/**
 * Formats the string for comparing
 * @param {String}, text, to be formatted
 * @return {String}, the formatted string
 * removes numbers and symbols, multiple space, tabs, new lines are replaced by single space
 * */
TextInputExercise.prototype.formatStringForCheck = function (text) {
	return text.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "").replace(/\s\s+/g, ' ');
};

TextInputExercise.prototype.successCondition = function(){	
	// Check all the possible answers
	return this.$input.val().trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === this.answer.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "");
};

export default TextInputExercise;