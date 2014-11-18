/**
 *
 * Created by Matthias on 10/6/14.
 */

//var GameLogic = GameLogic || {};

var correct_idx = 0;
var wrong_idx   = 0;
var para_idx    = 0;
var old_idx     = 0;

var game_para = get_text();
    //will need to be shared somehow

GameLogic = {
  process_input: function(input)
  {

    var text_arr  = game_para.split("");
    var input_arr = input.split("");

    var advance = false;

    if( input.length > 0 || correct_idx > 0)
    {
      if( input.length > old_idx)
      {
        if (text_arr[correct_idx + para_idx] == ' ')
        {
            advance = true;
            para_idx += correct_idx + 1;
            correct_idx = 0;
            wrong_idx = 0;
        }
        else
        {
          if (text_arr[ correct_idx + para_idx ] == input_arr[input.length-1])
          {
            correct_idx++;
          }
          else
          {
            wrong_idx++;
          }
        }
      }
      else if(wrong_idx > 0)
      {
        wrong_idx--;
      }
      else
      {
        correct_idx--;
      }
    }

    var adj_idx = para_idx + correct_idx;

    var b = game_para.substr(0, adj_idx);
    var r = input.substr(correct_idx, wrong_idx );
    var g = game_para.substr(correct_idx+para_idx, game_para.length);

    old_idx = (advance) ? 0 : input.length;
    return {advance: advance, black:b, red:r, gray:g};
  }
};

function get_text()
{
   return "The quick brown fox jumped over the slow lazy dog"
}