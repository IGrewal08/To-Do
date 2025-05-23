const storage = (function() {
    const myStorage = [];
    let completedTodos = 0;

    function getStorage() {
        return myStorage;
    }

    function addProject(Object) {
        myStorage.push(Object);
    }

    function appendTodos() {
        completedTodos += 1;
    }

    function getCompletedTodos() {
        return completedTodos;
    }

    /* pass in the some parameter to find project you want to delete */
    /* project.name is passed, iterate through myStorage until you find match and then remove */
    function deleteProject(objectName) {
        for (let i = 0; i <= myStorage.length; i++) {
            if(myStorage[i].name === objectName) {
                myStorage.splice(i, 1);
            }
        }
    }

    return {
        getStorage: getStorage,
        addProject: addProject,
        deleteProject: deleteProject,
        appendTodos: appendTodos,
        getCompletedTodos: getCompletedTodos
    };
    
})();

/* Import at DOM */
export default storage;