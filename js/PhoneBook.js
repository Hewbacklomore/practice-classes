class PhoneBook {
    #contacts = [];
    #searchedUsers = [];
    list = null;
    #listContacts = null;
    personId = [];
    #ATTRS = {
        dataIdBtnCall: 'data-id-btn',
        dataIconBtnCall: 'data-id-icon',
        dataIdBtnDelete: 'data-id-delete',
        dataIdIconBtnDelete: 'data-id-icon-delete'
    }
    #callDuration = null;
    
    


    constructor(users, listSelector) {
       console.log(users);
        // Validate users
        if(!users.length) throw new Error('there are no users')
        if(typeof listSelector !== 'string') throw new Error('invalid selector')

        this.list = document.querySelector(listSelector)
        
        // add users to contacts
        users.forEach(user => {
            this.addContact(user)
        }) 
        // add event listeners to contact book
       
        this.#setEvents()
    }

    addContact(person) {
        
        const validPerson = Object.keys(person)
        if(validPerson.length === 0) throw new Error('the object is emphty')

        const idContant = person.id;
        this.personId.push(idContant)

        const user = new User(person)
        this.createBoxContacts(user)
       
        this.#contacts.push(person)
        
    }

    call(contactId) {

        // find contact in this.#contacts and make a call
        
        console.log(contactId);

        this.#contacts.forEach(contact => {
            if(contact.id == contactId) {
                console.log(`You call to ${contact.name}`);
                this.#createElementCall(contact)
                
            }
        })

        
    }

    removeContact(contactId, person) {

        // will remove contact from this.#contacts

        console.log(person);

        this.#contacts.forEach(contact => {
            if(contact.id == contactId) {
                console.log(`The person ${contact.name} has been deleted`);
                person.style.display = 'none'
            }
        })
        
    }

    createBoxContacts(person) {
        
        if(!person) throw new Error('there is no person')

        const box = document.createElement('ul')
        box.classList.add('contacts__persons')
        this.#listContacts = box;

    
        for(let i = 0; i < this.personId.length; i++) {


        box.innerHTML = ` <li class="list-group-item d-flex justify-content-between align-items-center" data-user-id="${this.personId[i]}">
        <span id="result" class="contacts__contact">${person.name}</span>
        <div class="contacts__btn">
            <button ${this.#ATTRS.dataIdBtnCall}="${this.personId[i]}" type="button" class="btn btn-success">
                <i ${this.#ATTRS.dataIconBtnCall}="${this.personId[i]}" class="bi bi-telephone"></i>
            </button>

            <button ${this.#ATTRS.dataIdBtnDelete}="${this.personId[i]}" type="button" class="btn btn-danger">
                <i ${this.#ATTRS.dataIdIconBtnDelete}="${this.personId[i]}" class="bi bi-trash"></i>
            </button>
        </div>
    </li>`

        this.list.append(box);
        }

    }
    #setEvents() {
      console.log(this.personId);
        // Will add event listeners to contact book
        const btnCall = document.querySelectorAll('.btn-success');
        const deletedBtn = document.querySelector('btn-danger')

        const btn = document.querySelectorAll('.contacts__btn');

        btn.forEach(btns => {
           
            btns.addEventListener('click', this.#eventOnCallandDelete)
        })
       
      /*   deletedBtn.addEventListener('click', this.#eventOnRemove) */
    }

    #eventOnCallandDelete = (event) => {
        event.stopPropagation();

        console.log(event);
        
        if(event.target.className == 'bi bi-telephone') {
            const userIdBtn = +event.target.parentElement.parentElement.parentElement.getAttribute('data-user-id')
            console.log(userIdBtn);
            this.call(userIdBtn)
        }else if(event.target.className == 'btn btn-success') {
            const userIdIcon = +event.target.parentElement.parentElement.getAttribute('data-user-id')
            console.log(userIdIcon);
            this.call(userIdIcon)
        }else if(event.target.className == 'bi bi-trash') {
            const userIdBtn = +event.target.parentElement.parentElement.parentElement.getAttribute('data-user-id')
            const deletePersons = event.target.parentElement.parentElement.parentElement.parentElement
            console.log(userIdBtn);
            this.removeContact(userIdBtn, deletePersons)
        }else if(event.target.className == 'btn btn-danger') {
            console.log(event.target);
            const userIdIcon = +event.target.parentElement.parentElement.getAttribute('data-user-id')
            const deletePerson = event.target.parentElement.parentElement.parentElement
            console.log(deletePerson);
            this.removeContact(userIdIcon, deletePerson)
        }
            
    }

    #createElementCall(person) {
        
        const modalFade = document.querySelector('.modal')
        const modalBody = document.querySelector('.modal-body')

        modalFade.classList.add('show')
        modalFade.style.display = 'block'

        modalBody.innerHTML = `${person.name}`
        this.#modalClose(modalFade)
    }

    #modalClose(item) {
        const btnClose = document.querySelector('.btn-close')

        btnClose.addEventListener('click', () => {
            item.classList.add('hide')
            item.style.display = 'none'
        })
        
    }

    searchItem(searchElem) {

        this.#searchedUsers = this.#contacts.filter(contact => {
            return(contact.name.includes(searchElem) || 
                   contact.phone.includes(searchElem) )
               
        })
        this.createBoxContacts(this.#searchedUsers)
    }



    // your methods
    // All event handlers should be a separate private methods

    #eventOnInput() {
        // Event on input
      
    }

    #btnPhone() {
        // Event on btn
        
    }

    #eventOnSearch(person) {
        // Event on search

       
    }

    #eventOnItemBox(item, list, person) {

        // Event on list of person which was founded
        
        
    }

    #eventOnRemoved() {
        //Event on remove

        
    }

    

}


const phoneBook = new PhoneBook(users, '.contacts__content')

