/*
* Implementation of the Game Logic
* Created by Matthias on 10/6/14.
*/

var clear;
var correct_words = "";
var start_time = new Date().getTime();
var wpm;
var total_keystrokes = 0;
var incorrect_keystrokes = 0;

const line_width = 60;

/**
* @description This Function Implements the GameLogic and processes the text input and
*   records it to the screen.
* @return The inputted characters and their status.
*
*/
function GameLogic()
{
  this.game_text = "";
  this.current_line = "Looking for games to join";
  this.game_status = false;
  this.pos = 0;

  this.init = function(text)
  {
    this.game_text = text;
    this.get_line();
  };

  this.process_input = function(input)
  {
    var text_arr  = this.current_line.split("");
    var input_arr = input.split("");

    var r   = [];
    var b = correct_words;
    var g;

    for( i = 0; i < input_arr.length; i++)
    {
      if( text_arr[i+correct_words.length] == input_arr[i] && r.length == 0)
      {
        b += input_arr[i];
        if( input_arr[i] == ' ' || (correct_words.length + input.length) == this.current_line.length )
        {
          total_keystrokes += input_arr.length;
          clear = true;
          correct_words += input;
          input = "";
          wpm = calculate_wpm();
        }
      }
      else
      {
        total_keystrokes += input_arr.length;
        incorrect_keystrokes += input_arr.length;
        r.push(text_arr[i+correct_words.length]);
      }
    }

    console.log("Line len: " + this.current_line.trim() + " correct: " + correct_words.trim());
    if ( this.current_line.trim().length == correct_words.trim().length )
    {
      this.pos += correct_words.length;
      accuracy();
      this.get_line();
      text_arr = this.current_line.split("");
      correct_words = '';
      clear = true;
      r = [];
      b = [];
    }

    g = text_arr.slice(correct_words.length+input.length).join("");

    return {advance: clear, black:b, red:r.join(""), gray:g, p:this.pos};
  };

  this.get_line = function()
  {
    if(this.pos+line_width < this.game_text.length)
    {
      this.current_line = this.game_text.slice(this.pos, this.pos+line_width);
      console.log("Updated line: " + this.current_line);
    }
  };

  this.update_line = function()
  {
    console.log("Pos: " + this.pos);

    this.current_line = this.game_text.slice(this.pos, this.pos+line_width);
    console.log("Updated line: " + this.current_line);
  };
}

/**
 * @description Calculated the gross words per minute and displays them.
 * @return  gwpm - the gross words per minute
 */
function calculate_wpm()
{
  var end_time = new Date().getTime();
  var diff = end_time - start_time;
  diff = diff/60000; // Convert to Minutes
  total_entries = correct_words.length;
  var gwpm = (total_entries/5)/ diff; //Gross Words Per Minute

  return gwpm;

}

/**
* @description Displays the accracy at the end of the game.
*/
function accuracy()
{
  document.getElementById("accuracy").innerHTML = "Accuracy: "
     + (Math.round((((total_keystrokes-incorrect_keystrokes)/total_keystrokes)*100) * 100) / 100 ) + "%";
}
