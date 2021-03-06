const PROJECT_ID = 215254;

function Main() {
    getTaskList(showTaskList);
}

function addTask() {
    loaderStart();

    var taskContent = $("#taskContent").val();
    var taskDescription = $("#taskDescription").val()

    var json = {
        "todo-item":
        {
            "content": taskContent,
            "description": taskDescription
        }
    };
    action("POST", 'tasklists/728526/tasks.json', json, function (response) {
        getTask(function (response) {
            var listTodo = response["todo-items"];
            if (listTodo === undefined) return;
            var $list = $("#list-todo");
            $list.empty();
            listTodo.forEach(function (t, num) {
                var TodoContent = t.content;
                $list.append(
                    '<div class="card col-xs-5 col-md-3 col-lg-2"><div class="card-block"> ' + num + '. ' + TodoContent + '</div></div>'
                );
            });
        }, response);
        loaderStop();
    });
}

function getTaskList(processingToResult) {
    action("GET", '/projects/' + PROJECT_ID + '/tasklists.json', '', processingToResult);
}

function getTask(taskListsId, processingToResult) {
    action("GET", '/tasklists/' + taskListsId + '/tasks.json', '', processingToResult);
}

function showTask(response) {
    var listTodo = response["todo-items"];
    if (listTodo === undefined) return;
    var $list = $("#list-todo");
    $list.empty();
    listTodo.forEach(function (t, num) {
        var todoContent = t.content;
        var todoDescription = t.description;
        var lastChanged = new Date(t["last-changed-on"]);
        var html = '<div class="card col-xs-5 col-md-3 col-lg-3">\
        <div class="card-block">\
          <h4 class="card-title">'+ num + '. ' + todoContent + '</h4>\
          <h6 class="card-subtitle mb-2 text-muted">'+ lastChanged + '</h6>\
          <p class="card-text">'+ todoDescription + '</p>\
        </div>\
      </div>';
        $list.append(html);

    });
};

function createLabelTaskList(taskName) {
    var label = document.createElement('label');
    label.className = 'btn btn-primary';
    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'options');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('checked', '');
    label.innerText = taskName;
    label.appendChild(input);
    return label;
}

function showTaskList(response) {
    response['tasklists'].forEach(function (t) {
        var taskLists = $('#taskLists');
        var labelTaskList = createLabelTaskList(t.name);
        labelTaskList.setAttribute('onclick', 'getTask(' + t.id + ', showTask)');
        taskLists[0].appendChild(labelTaskList);
    })

}

function action(type, action, data, processingToResult) {
    $.ajax({
        type: type,
        url: 'https://hnkntoc.eu.teamwork.com/' + action,
        headers: { "Authorization": "BASIC " + getKey() },
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
    $('.loader').css("display", "block");
}

function loaderStop() {
    $("#btn-row").find("*").prop("disabled", false);
    $('.loader').css("display", "none");
}