class PhoneBook {
    #contacts = [];
    #searchedUsers = [];
    #contactList = null;
    #itemsBox = null;
    #input = document.querySelector('.form-control')
    


    constructor(users) {
        // Validate users
        if(!users.length) throw new Error('there are no users')
        
        // add users to contacts
        users.forEach(user => {
            this.addContact(user)
        }) 
        // add event listeners to contact book
        this.#alarm()
        this.#setEvents()
    }

    addContact(user) {
    
        if(!Array.isArray(this.#contacts)) return []
       
         this.#contacts.push(
            new User(user)
        )
        
    }

    call(contactName) {

        // find contact in this.#contacts and make a call
        
         const everyPerson = this.#contacts.filter(contact => contact.name === contactName)

        if(!everyPerson) throw new Error('error')

         this.#input.value = ''

        alert(`You calling to ${contactName}`)

    }

    removeContact(contactName) {

        // will remove contact from this.#contacts

        if(this.#contacts == []) throw new Error('there are not contacts')

        const removedPerson = this.#contacts.filter(contact => contact.name !== contactName)

        if(!removedPerson) throw new Error('there is noi person')
        this.#eventOnRemoved()

        
        
    }

    searchItem(searchElem) {

        this.#searchedUsers = this.#contacts.filter(contact => {
            return(contact.name.includes(searchElem) || 
                   contact.phone.includes(searchElem) )
               
        })
        this.addFindedPerson(this.#searchedUsers)
    }

    addFindedPerson(person) {
        
        const parentBox = document.createElement('ul');
        parentBox.classList.add('contacts__finded');
        
        const inputList = document.querySelector('.input-group');
        this.#contactList = document.querySelector('.contacts__contact'); 
        inputList.append(parentBox)

        this.#itemsBox = document.createElement('li');
        this.#itemsBox.classList.add('contacts__finded_item');
        this.#itemsBox.style.cursor = 'pointer';
        this.#itemsBox.style.listStyle = 'none';
        
        
        // Will add and delete this.#searchedUsers on input of search

        person.forEach(item=> {
            this.#itemsBox.innerHTML = `${item.name},  ${item.phone},  ${item.email}`
            this.#eventOnItemBox(this.#itemsBox, this.#contactList, item)
            this.#eventOnSearch(item)
            this.removeContact(item)
            
        })

        parentBox.append(this.#itemsBox)
         
    }

    #setEvents() {
      
        // Will add event listeners to contact book
        
        this.#eventOnInput();
        this.#btnPhone();
        
    }

    // your methods
    // All event handlers should be a separate private methods

    #eventOnInput() {
        // Event on input
        const listGroup = document.querySelector('.list-group');
        const secondInputElement =  listGroup.childNodes[1].childNodes[1];
        
        this.#input.addEventListener('input', () => {


           if(this.#input.value !== '' && this.#input.value !== null) {
                this.searchItem(this.#input.value)
           }else {
              this.#itemsBox.style.display = 'none' 
               secondInputElement.innerHTML = 'An item'
              
           }
        })
    }

    #btnPhone() {
        // Event on btn
        const btnPhone = document.querySelector('.btn-success');

        btnPhone.addEventListener('click', (e)=> {
         const inputElement =  e.target.closest('[data-user-id="1"]').childNodes[1];
   
            this.call(inputElement.textContent)
            inputElement.innerHTML = ''
            this.#itemsBox.style.display = 'none'
       
        })
    }

    #eventOnSearch(person) {
        // Event on search

        const contactSearch = document.querySelector('.input-group-text');

        contactSearch.addEventListener('click', ()=> {
            this.#contactList.innerHTML = `${person.name}`
           
        })
    }

    #eventOnItemBox(item, list, person) {

        // Event on list of person which was founded
        
        item.addEventListener('click', ()=> {
            list.innerHTML = `${person.name}`
            this.#input.value = `${person.name}`
        })
    }

    #eventOnRemoved() {
        //Event on remove

        const deletedBtn = document.querySelector('.btn-danger')

        deletedBtn.addEventListener('click', ()=> {
            this.#contactList.innerHTML = ''
        })
    }

    #alarm() {

        const mainBlock = document.querySelector('.contacts');
        const mainText = document.querySelector('.text-center')
        const block = document.createElement('div')
        const paragraphText = document.createElement('p');
        block.classList.add('alarm')
        paragraphText.classList.add('text')

        paragraphText.textContent = 'write the first word of the person from caps lock'
        block.append(paragraphText)

        const timerId = setTimeout(() => {
            mainBlock.style.display = 'none'
            mainText.append(block)
            block.style.display = 'block'
        }, 1000)

         setTimeout(() => {
            clearTimeout(timerId)
            mainBlock.style.display = 'block'
            block.style.display = 'none'
        }, 4000) 
    }

}


const phoneBook = new PhoneBook(users)

