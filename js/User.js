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
   
    get email() {
        return this.email
    }
   


    // your methods
}

