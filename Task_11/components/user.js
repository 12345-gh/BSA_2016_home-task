var newId = function () {
    var id = 0;
    return function () {
        return id = id + 1;
    }
}();

class User{
    constructor(name){
        this.name = name;
        this.id = newId();
    }
}

export default User