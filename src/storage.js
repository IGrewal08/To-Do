const storage = (function() {
    const myStorage = [];

    function getStorage() {
        return myStorage;
    }

    function addProject(Object) {
        myStorage.push(Object);
    }

    /* pass in the some parameter to find project you want to delete */
    /* project.name is passed, iterate through myStorage until you find match and then remove */
    function deleteProject() {
        
    }

    return {
        getStorage: getStorage,
        addProject: addProject,
        deleteProject: deleteProject
    };
    
})();

/* Import at DOM */
export default storage;