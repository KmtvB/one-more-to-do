
class Task {
    constructor(text, status) {
        this.text = text || '';
        this.status = status || null;
        this.id = Math.floor(Math.random() * (100000 - 1)) + 1;
    }
    changeTaskStatus(page, lineNumber, newStatus) {
        let tasksPages = this.state.tasksPages;
        tasksPages[page][lineNumber].done = newStatus;
        this.setState({
            tasksPages: tasksPages,
        });
    }
}

class TaskPage {
    constructor(title, tasks) {
        this.title = title || '';
        this.tasks = tasks || [];
    }
    addNewTask(text, status) {
        this.tasks.push(Task(text, status));
    }
    

    changeAllPageTaskStatus(page, newStatus) {
        let tasksPages = this.state.tasksPages;
        for (let i = 0; i < tasksPages[page].length; i++)
            tasksPages[page][i].done = newStatus;
        this.setState({
            tasksPages: tasksPages,
        });
    }
    editTaskText(page, lineNumber, newText) {
        let tasksPages = this.state.tasksPages;
        tasksPages[page][lineNumber].text = newText;
        this.setState({
            tasksPages: tasksPages,
        });
    }
    editTitle(page, newTitle) {
        this.setState({
            titles: this.state.titles.map((title, index) => index === page ? newTitle : title),
        });
    }
    deleteTasks(page, linesNumber) {
        let tasksPages = this.state.tasksPages;
        let restLines = [];
        for (let i = 0; i < tasksPages[page].length; i++)
            if (linesNumber.indexOf(i) === -1)
                restLines.push(tasksPages[page][i]);
        if (restLines.length === 0)
            this.deletePage(page);
        else {
            tasksPages[page] = restLines;
            this.setState({
                tasksPages: tasksPages,
            });
        }
    }
    deletePage(page) {
        let tasksPages = this.state.tasksPages;
        tasksPages.splice(page, 1);
        page = page > 0 ? --page : 0;
        if (tasksPages.length === 0) {
            this.addPage();
        } else {
            this.setState({
                tasksPages: tasksPages,
            });
        }
    }
}

class TasksModel {
    constructor(tasksPages) {
        this.pages = tasksPages || [];
    }
    addPage(title, tasks) {
        this.pages.push(TaskPage(title || '', tasks || []))
    }
}