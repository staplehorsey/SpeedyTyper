/**
 * Provides GameLogic class needed for:
 * - Requesting a game from the server
 * - Loading and iterating though the game text
 * - Determining the correctness of the user
 * - Rendering a win or loose
 *
 * Created by Matthias on 10/6/14.
 * @module game_logic
 */

/*
 * Global variables
 */
var clear;
  //stores if current line of text needs to be cleared
var correct_words = "";
  //only stores the correct words of the current line of text
var start_time = new Date().getTime();
  //used to calculate wpm
var wpm;
var total_keystrokes = 0;
var incorrect_keystrokes = 0;

const line_width = 60;
  //The default number of characters to be displayed on the screen


/**
 * Stores the state of the game and provides logic
 * for updating the user and opponent throughout the
 * game from beginning to end
 *
 * @Class GameLogic
 */
function GameLogic()
{
  this.game_text = "";
  this.current_line = "Looking for games to join";
  this.pos = 0;
  this.game_len = 0;
  this.correct_chars= 2;

  /**
   * Loads the game text the user will
   * be attempting to type a quickly as possible to win
   * @param text
   */
  this.init = function(text)
  {
    this.game_text = text;
    this.game_len  = text.split(" ").length;
    this.get_line();
  };

  /**
   * Takes all of the text from the input box and iterates over it while
   * comparing it to the known game text and determines if the user is correct
   * and should advance or incorrect and should not advance while rendering their mistake
   * in red. If the end of the current line of text is reached then the next one is acquired
   * until the game is won or lost
   * @param input the entire user input
   * @returns {{advance: *, black: string, red: string, gray: string, p: number}}
   *  black is the correct text, red is the incorrect text, gray is text yet to be completed by
   *  the user
   */
  this.process_input = function(input)
  {
    var text_arr  = this.current_line.split("");
    var input_arr = input.split("");

    var r   = [];
    var b = correct_words;
    var g;

    //compare the input to the game text and determine if the input needs to be cleared
    for( i = 0; i < input_arr.length; i++)
    {
      if( text_arr[i+correct_words.length] == input_arr[i] && r.length == 0)
      {
        //the user typed the correct char
        b += input_arr[i];
        if( input_arr[i] == ' ' || (correct_words.length + input.length) == this.current_line.length )
        {
          //Time to clear the display
          total_keystrokes += input_arr.length;
          clear = true;
          correct_words += input;
          input = "";
          wpm = this.calculate_wpm();
        }
      }
      else
      {
        //the user is incorrect
        total_keystrokes += input_arr.length;
        incorrect_keystrokes += input_arr.length;
        r.push(text_arr[i+correct_words.length]);
      }
    }//end text check

    if ( this.current_line.trim().length == correct_words.trim().length )
    {
      //The end of the current line has been reached and a new one is needed
      this.pos += correct_words.length;
      this.correct_chars += correct_words.length + 1;
      this.accuracy();
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

  /**
   * Gets the next line of text form the game text paragraph
   */
  this.get_line = function()
  {
    if( this.pos + 10 < this.game_text.length)
    {
      var i = 0;
      do
      {
        this.current_line = this.game_text.slice(this.pos, this.pos + line_width - i++);
      }while( this.current_line[line_width - i] != ' ' );
    }
  };

  /**
   * Update the line of text without checking if it will fit
   */
  this.update_line = function()
  {
    this.current_line = this.game_text.slice(this.pos, this.pos+line_width);
  };

  /**
   * Determines if the current user has locally won the game or not
   */
  this.get_game_status = function()
  {
    console.log("Correct Chars: " + this.correct_chars + " game len: " + this.game_len);
    return (this.correct_chars + 5 >= this.game_len);
  };

  /**
   * Determines the words per minute based off
   * of system time and number of characters typed
   * @returns {number}
   */
  this.calculate_wpm = function()
  {
    var end_time = new Date().getTime();
    var diff = end_time - start_time;
    diff = diff/60000; // Convert to Minutes
    total_entries = this.pos;
    var gwpm = (total_entries/5)/ diff; //Gross Words Per Minute

    return gwpm;
  };

  /**
   * Determines accuracy from number of characters correct and
   * renders it on the main page
   */
  this.accuracy = function ()
  {
    document.getElementById("accuracy").innerHTML = "Accuracy: "
    + (Math.round((((total_keystrokes-incorrect_keystrokes)/total_keystrokes)*100) * 100) / 100 ) + "%";
  };

}//end GameLogic

