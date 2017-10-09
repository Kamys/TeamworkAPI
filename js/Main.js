function Main() {
    showTask();
}

function addTask() {
    loaderStart();
    var json = {"todo-item": {"content": "My task"}};
    action("POST", 'tasklists/728526/tasks.json', json, function (response) {
        showTask(response);
        loaderStop();
    });

}
// id project - 215254
function showTask() {
    action("GET", '/tasklists/728526/tasks.json', '', function (response) {
        var listTodo = response["todo-items"];
        if (listTodo === undefined) return;
        var $list = $("#list-todo");
        $list.empty();
        listTodo.forEach(function (t, num) {
            var TodoContent = t.content;
            $list.append('<p class="col-xs-12 col-md-3 col-lg-2">' + num + '. ' + TodoContent + '</p>');
        });
    });
}

function action(type, action, data, processingToResult) {
    $.ajax({
        type: type,
        url: 'https://hnkntoc.eu.teamwork.com/' + action,
        headers: {"Authorization": "BASIC " + getKey()},
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data),
        success: processingToResult
    });
}

function getKey() {
    var key = "twp_blkrL1AIC7aKG8VedxEAKd23BK9K_eu";
    return window.btoa(key + ":xxx");
}

function loaderStart() {
    $("#btn-row").find("*").prop("disabled", true);
    $('.loader').css("display","block");
}

function loaderStop() {
    $("#btn-row").find("*").prop("disabled", false);
    $('.loader').css("display","none");
}