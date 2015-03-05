$(function() {

  $("li input[data-checked=true]").prop("checked", true);
  $(".complete_number").html(checkedBoxes());
  $(".incomplete_number").html(uncheckedBoxes());

  $("input[name='is_done']").click(function () {
    var doc_id = $(this).data('todo-id');
    
    $(this).closest("li").addClass("completed");

    if($(this).prop("checked")){

      $.ajax({
        url: "/todos/" + doc_id + "/complete",
        type: "PUT",
        data: {
          is_done: true
        }
      });
    } else {
      $(this).closest("li").removeClass("completed");

      $.ajax({
        url: "/todos/" + doc_id + "/uncomplete",
        type: "PUT",
        data: {
          is_done: false
        }
      });
    }

    $(".complete_number").html(checkedBoxes());
    $(".incomplete_number").html(uncheckedBoxes());
  });
}); // end document.ready

function uncheckedBoxes(){
  var checkList = $("input[type=checkbox]").length;
  var checked = $(':checked').length;
  var unchecked = checkList - checked;

  return unchecked;
}

function checkedBoxes() {
  var checked = $(':checked').length;

  return checked;
}

