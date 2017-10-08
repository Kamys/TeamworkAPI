function Main() {
    getTask();
}

function addTask() {
    var json = {"todo-item": {"content": "My task"}};
    action("POST", 'tasklists/728451/tasks.json', json);
    getTask();
}

function getTask() {
    action("GET", '/tasklists/728451/tasks.json');
}

function action(type, action, json) {
    $.ajax({
        type: type,
        url: 'https://hnkntoc.eu.teamwork.com/' + action,
        headers: {"Authorization": "BASIC " + getKey()},
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(json),
        success: function (response) {
            var listTodo = response["todo-items"];
            if (listTodo === undefined) return;
            var $list = $("#list-todo");
            $list.empty();
            listTodo.forEach(function (t, num) {
                var TodoContent = t.content;
                $list.append('<p class="col-xs-12 col-md-3 col-lg-2">' + num + '. ' + TodoContent + '</p>');
            });

        }
    });
}

function getKey() {
    var key = "twp_blkrL1AIC7aKG8VedxEAKd23BK9K_eu";
    return window.btoa(key + ":xxx");
}