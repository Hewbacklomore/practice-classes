class User {
    #id = null
    name= null
    phone = null
    email = null
    website = null
    constructor({id, name, phone, email, website}) {
        // put data to fields
        this.#id = id
        this.name = name
        this.phone = phone
        this.email = email
        this.website = website
    }


    static isUser(obj) {
        
        return obj instanceof User
    }

    get id() {
        return this.#id
    }
    get name() {
        return this.name
    }
    get phone() {
        return this.phone
    }
    get email() {
        return this.email
    }
    get website() {
        return this.website
    }


    // your methods
}

