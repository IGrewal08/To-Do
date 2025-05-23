
import { compareDesc } from "date-fns";

export function calHome(index, storage) {
    switch(index) {
        case 0: return calProjectsTodos(storage);
        case 1: return calTodos(storage);
    }
}

function calProjectsTodos(storage) {
    const projTodo = [0, 0];
    storage.getStorage().forEach(project => {
        projTodo[0] += 1;
        const todoArr = project.todo;
        todoArr.forEach(todoObject => {
            projTodo[1] += 1;
        });
    });
    return projTodo;
}

function calTodos(storage) {
    const completed = [0, 0];
    const today = new Date();
    storage.getStorage().forEach(project => {
        project.todo.forEach(todoObject => {
            let compare = compareDesc(today.toLocaleDateString(), todoObject.dueDate.toLocaleDateString());
            if (compare === 0) {
                completed[0] += 1;
            }
        });
    });
    completed[1] = storage.getCompletedTodos();

    return completed;
}