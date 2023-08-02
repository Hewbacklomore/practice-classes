class CallController {

    #callHistory = []
    curruntcALL = null

    constructor() {
        this.startCall('4324324324');
        this.#setEvents();
    }


    startCall(phone) {
        
        if(!Call.validatePhone(phone)) throw new Error('invalid number')

        this.curruntcALL = new Call(phone)

    }

   
    endCall() {

        if(this.curruntcALL === null) throw new Error('there wasnt a call')

        this.#callHistory = this.curruntcALL

        this.curruntcALL.state = Call.CALL_STATUSES.disconnected
        
    }

    get callHistory() {
        return this.#callHistory
    }

    #setEvents() {
        
        
    }
}


const callController = new CallController()

        
