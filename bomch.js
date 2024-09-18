let form = document.querySelector("form");
let title = document.querySelector("input#title");
let output = document.querySelector(".output");
let results = [];

if (localStorage.getItem("tasks")) {
    results = JSON.parse(localStorage.tasks);
    addelementstopage(results);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (title.value != "") {
        let task = {
            id: Date.now(),
            title: title.value,
            completed: false,
        };
        results.push(task);
        addelementstopage(results);
        localStorage.tasks = JSON.stringify(results);
        title.value = "";
    }
});

output.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        results = results.filter((ele) => {
            return ele.id != e.target.parentElement.getAttribute("data-id");
        });
        e.target.parentElement.remove();
        localStorage.tasks = JSON.stringify(results);
    }
    if (e.target.classList.contains("result")) {
        e.target.classList.toggle("done");
        results.forEach((ele) => {
            if (e.target.getAttribute("data-id") == ele.id) {
                ele.completed == false ? ele.completed = true : ele.completed = false;
            }
        });
        localStorage.tasks = JSON.stringify(results);
    }
});

function addelementstopage(arr) {
    output.innerHTML = "";
    arr.forEach(ele => {
        let result = document.createElement("div");
        result.className = "result";
        if (ele.completed) {
            result.classList.add("done");
        }
        result.append(document.createTextNode(ele.title));
        let delbutton = document.createElement("button");
        delbutton.className = "del";
        delbutton.append(document.createTextNode("Delete"));
        result.append(delbutton);
        result.setAttribute("data-id", ele.id);
        output.append(result);
    });
}

