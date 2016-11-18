/**
Template Controllers

@module Templates
*/

/**
The accounts template

@class [template] components_accounts
@constructor
*/

// when the template is rendered
Template["components_accounts"].onRendered(function(){
});

// template events
Template['components_accounts'].events({
});

// template handlebar helper methods
Template['components_accounts'].helpers({
	/**
    Convert Wei to Ether Values

    @method (fromWei)
    */

	'fromWei': function(weiValue, type){
		console.log(weiValue);
		console.log((weiValue/2000000000000000000000)+"BTC");
		//var res = (parseInt(web3.fromWei(weiValue, type)))/2000;
		var res= (weiValue/2000000000000000000000);
		console.log(res);
		/*console.log(web3.fromWei(weiValue, type));
		console.log(typeof web3.fromWei(weiValue, type));
		return web3.fromWei(weiValue, type).toString(10);*/
		return res.toLocaleString();
		//return web3.fromWei(weiValue, type).toString(10);
	},

    
	/**
    Get Eth Accounts

    @method (accounts)
    */

	'accounts': function(){
		return EthAccounts.find({});
	},
});
