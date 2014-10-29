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
    var b;
    var g;

    var correct_words = "";

    for( i = 0; i < input_arr.length; i++)
    {
      if( text_arr[i] == input_arr[i] )
      {
        if( input_arr[i] == ' ' )
        {
            clear = true;
            correct_words += input;
        }
      }
      else
      {
        r.push(text_arr[i]);
      }
    }
    g = get_text();
    b = correct_words + input;

    return {advance: clear, black:b, red:r.join(""), gray:g};
  }
};

function get_text()
{
   return "The quick brown fox jumped over the slow lazy dog"
}
