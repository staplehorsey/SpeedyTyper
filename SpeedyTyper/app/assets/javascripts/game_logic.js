/**
 *
 * Created by Matthias on 10/6/14.
 */

//var GameLogic = GameLogic || {};

GameLogic = {
  process_input: function(input)
  {
    console.log("input: " + input);
    var text_arr  = get_text().split("");
    var input_arr = input.split("");

    var b = [];
    var r   = [];
    var g;

    var i;
    var correct_input = 0;

    for( i = 0; i < input_arr.length; i++ )
    {
      if( text_arr[i] == input_arr[i] )
      {
        b.push(text_arr[i]);
        correct_input ++;
      }
      else
      {
        r.push(input_arr[i]);
      }
    }
    g = text_arr.join("").substr(correct_input,text_arr.length);

    var a = (r.length == 0);

    return {advance: a, black:b.join(""), red:r.join(""), gray:g};
  }
};

function get_text()
{
   return "The quick brown fox jumped over the slow lazy dog"
}