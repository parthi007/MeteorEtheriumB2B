
var contractInstance;

//var contractAddress = "0xace605f83a8a72352aea25b156d26223e1f08d7d";
var contractAddress;//= "0xace605f83a8a72352aea25b156d26223e1f08d7d";
var buyer;// = "0x9fd7d85b54c37f4f9f86d0bb357223f9930eae89";
var validator;// = "0xe5a0fbb551a47c52bad21e86cf56efa1e6cd5e69";

Template['components_createOrder'].onRendered(function(){
	
	TemplateVar.set('status', {notyet: true});

});

Template['components_createOrder'].helpers({

	'contractAddr': function(){
		return contractAddress;
	},

});

Template['components_createOrder'].events({

	"click #createOrderbtn": function(event, template){ 
		
		contractAddress = template.find("#contractAddress").value;
		contractInstance = web3.eth.contract(PurchaseContract.abi).at(contractAddress);
		//var buyer = template.find("#buyerAddress").value;
		//var buyer = template.find("#buyerAddress").value;
		//var validator = template.find("#validatorAddress").value;
		var purchaseValue = (parseFloat(template.find("#purchaseValue").value))*2000000000000000000000;

		 var transactionObject = {
		            data: PurchaseContract.bytecode, 
		            from: web3.eth.accounts[0]
	        };

		contractInstance.CreateOrder.sendTransaction(validator,buyer,purchaseValue,transactionObject, function(err,txAddress){

			if(err)
				return TemplateVar.set(template, 'status', {erred: true,error:String(err)});
			else
			{
				
				var inter = setInterval(function() {
					var pending = web3.eth.getBlock("pending").transactions.length;
					if(pending==0){
						TemplateVar.set(template, 'status', {isMined: true});
						clearInterval(inter);
					}
				},1000)
				return TemplateVar.set(template, 'status', {initiated: true,result:txAddress});
			}
		});
	
	},
	"change #category-select": function (event, template) {
        buyer = $(event.currentTarget).val();
        console.log("buyer : " + buyer);
        // additional code to do what you want with the category
    },
	"change #category-select1": function (event, template) {
        validator = $(event.currentTarget).val();
        console.log("validator : " + validator);
        // additional code to do what you want with the category
    }
   });
