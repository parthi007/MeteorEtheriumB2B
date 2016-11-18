var source = "" + 
"contract test {\n" +
"   function multiply(uint a) returns(uint d) {\n" +
"       return a * 7;\n" +
"   }\n" +
"}\n";

// Construct Multiply Contract Object and contract instance
var contractInstance;

// When the template is rendered
Template['components_purchaseContract'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});


Template['components_purchaseContract'].events({

	/**
	On "Create New Contract" click
	
	@event (click .btn-default)
	*/

	"click .btn-info": function(event, template){ // Create Contract
	
        TemplateVar.set('state', {isMining: true});
        
        web3.eth.defaultAccount = web3.eth.coinbase;
        
      
        var transactionObject = {
            data: PurchaseContract.bytecode, 
            gasPrice: web3.eth.gasPrice,
            gas: 500000,
            from: web3.eth.accounts[0]
        };
        
        
        web3.eth.estimateGas(transactionObject, function(err, estimateGas){
           
            if(!err)
                transactionObject.gas = estimateGas * 10;
            
            PurchaseContract.new(transactionObject, 
                                 function(err, contract){
                if(err)
                    return TemplateVar.set(template, 'state', {isError: true, error: String(err)});
                
                if(contract.address) {
                    TemplateVar.set(template, 'state', {isMined: true, address: contract.address});
                    contractInstance = contract;
                }
            });
        });
	},

});
