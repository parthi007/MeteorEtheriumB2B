contract PurchaseContract {
    uint public value;
    address public seller;
    address public buyer;
    address public Validator;
    enum State { Created, Validated, Confirmed,Completed, Cancelled }
    State public state;

    function PurchaseContract() {
        seller = msg.sender;
	
    }
    modifier require(bool _condition) {
        if (!_condition) throw;
        _
    }

    modifier onlyBuyer() {
        if (msg.sender != buyer) throw;
        _
    }

    modifier onlySeller() {
        if (msg.sender != seller) throw;
        _
    }

    modifier onlyValidator() {
        if (msg.sender != Validator) throw;
        _
    }

    modifier inState(State _state) {
        if (state != _state) throw;
        _
    }

    event created();	
    event cancelled();
    event purchaseConfirmed();
    event itemReceived();
    event purchaseValidated();

    function CreateOrder(address contractValidator, address Customer, uint purchaseValue)
	onlySeller
	{
		created();
		buyer = Customer;
		Validator = contractValidator;
		value=purchaseValue;
		state = State.Created;
		
	}	

    function Cancel()
        onlyBuyer
        inState(State.Created)
    {
        cancelled();
        state = State.Cancelled;
        if (!buyer.send(this.balance))
            throw;
    }

	function validatePurchase()
		onlyValidator
		inState(State.Created)
		{
			if(msg.sender==Validator)
			{
				purchaseValidated();
				state=State.Validated;
			}

		}


    function confirmPurchase()
        inState(State.Validated)
        
    {
        
	if(msg.sender==buyer)
	{
	      	buyer = msg.sender;
        	state = State.Confirmed;
		purchaseConfirmed();
	}
	else
		throw;
    }

    function confirmReceived()
        onlyBuyer
        inState(State.Confirmed)
    {
	if(value<=msg.value)
	{
        itemReceived();
        state = State.Completed;
	
        if (!seller.send(value))
            throw;
	if(this.balance>0)
	{
		if(!buyer.send(this.balance))
			throw;
	}
	}
	else
	throw;
    }

    function() {
        throw;
    }
}
