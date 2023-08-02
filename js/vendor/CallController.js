class CallController {

    #callHistory = []
    curruntcALL = null

    constructor() {
        this.startCall('4324324324');
        this.#setEvents();
    }


    startCall(phone) {
        if(typeof phone !== 'string' && !phone) throw new Error('invalid number')

        this.curruntcALL = new Call(phone)

    }

   
    endCall() {
        this.curruntcALL.state = Call.CALL_STATUSES.disconnected
    }

    #setEvents() {
        
        
    }
}


const callController = new CallController()

        
