const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {
    new() {
        return this._isAdmin() || this._isMember();
    }
    create() {
        return this.new(); 
    }
    edit() {
        
        return (this._isAdmin() || this._isOwner(this.user, this.record));
    }
    update() {
        return this.edit();
    }
    destroy() {
        
        return (this._isAdmin() || this._isOwner(this.user.id, this.record));
    }
}