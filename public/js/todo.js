$(function() {
  $("input[name='is_done']").click(function () {
    var doc_id = $(this).data('todo-id');

    if($(this).prop("checked")){
      $.ajax({
        type: "PUT",
        data: {
          is_done: true
        },
        url: "/todos/" + doc_id + "/complete"
      });
      alert("sent PUT request to " + "/todos/" + doc_id + "/complete");
    } else {
      $.ajax({
        type: "PUT",
        data: {
          is_done: false
        },
        url: "/todos/" + doc_id + "/uncomplete"
      });
      alert("sent PUT request to " + "/todos/" + doc_id + "/uncomplete");
    }
  });

  $("li input[data-checked=true]").prop("checked", true);

}); // end document.ready