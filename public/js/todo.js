$(function() {
  $("input[name='is_done']").click(function () {
    var doc_id = $(this).data('todo-id');

    if($(this).prop("checked")){
      $.ajax({
        url: "/todos/" + doc_id + "/complete",
        type: "PUT",
        data: {
          is_done: true
        }
      });
    } else {
      $.ajax({
        url: "/todos/" + doc_id + "/uncomplete",
        type: "PUT",
        data: {
          is_done: false
        }
      });
    }
  });

  $("li input[data-checked=true]").prop("checked", true);

}); // end document.ready