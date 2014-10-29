/**
 *
 * Created by Matthias on 10/6/14.
 * Destroyed by Nico on 10/29/14.
 */

var clear;

GameLogic = {
  process_input: function(input)
  {
    console.log("input: " + input);
    var text_arr  = get_text().split("");
    var input_arr = input.split("");

    var r   = [];
    var g;

    var correct_input = [];
    var locked_index = 0;
    var correct_words = 0;

    word_len = get_text().split(" ")[correct_words].length;
    for( i = 0; i < input_arr.length; i++)
    {
      if( text_arr[i] == input_arr[i] )
      {
        correct_input.push(input_arr[i])
        if( input_arr[i] == ' ' )
        {
            clear = true;
            correct_words++;
        }
      }
      else
      {
        r.push(text_arr[i]);
      }
    }
    g = text_arr.join("").substr(input.length);

    return {advance: clear, black:correct_input.join(""), red:r.join(""), gray:g};
  }
};

function get_text()
{
   return "The quick brown fox jumped over the slow lazy dog"
}
