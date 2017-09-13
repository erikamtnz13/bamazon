var mysql = require('mysql');
var prompt = require('prompt');

prompt.start();

var con = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "bamazon_db"
})

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query('SELECT * FROM Products',function(err,rows){
	if(err) throw err;

	function manager() {
		console.log('1. View Products for Sale\n2. View low inventory\n3. Add to inventory\n4. Add new product');
		prompt.get(['chooseOption'], function(err, res) {
			parseInt(res.chooseOption);
			if (res.chooseOption == 1) {
				for (var i=0; i<rows.length; i++) {
					console.log("ID: " + rows[i].item_id + ", Product: " + rows[i].product_name + ", Department: " + rows[i].department_name + ", Price: $" + rows[i].price);
				}
				console.log("\n");
				manager();

			}else if (res.chooseOption == 2) {
				for (var i=0; i<rows.length; i++) {
					if (rows[i].stock_quantity < 5) {
						console.log("Only " + rows[i].stock_quantity + " " + rows[i].product_name + "s remaining.\n");
					}
				}
				manager();

			}else if (res.chooseOption == 3) {
				function addInv() {
					for (var i  = 0; i<rows.length; i++) {
						console.log("ID: " + rows[i].item_id + ", Product: " + rows[i].product_name + ", Stock Quantity: " + rows[i].stock_quantity);
						}
					prompt.get(["chooseIdToAdd"], function(err, res) {
						parseInt(res.chooseIdToAdd);
						res.chooseIdToAdd--;
						console.log("Adding more " + rows[res.chooseIdToAdd].product_name + "s")
							prompt.get(["howManyMore"], function(err, response) {
								parseInt(response.howManyMore);
								rows[res.chooseIdToAdd].stock_quantity = parseInt(rows[res.chooseIdToAdd].stock_quantity) + parseInt(response.howManyMore);
								console.log("There are now " + rows[res.chooseIdToAdd].stock_quantity + " " + rows[res.chooseIdToAdd].product_name + "s");					
                            })
                            
						return false;
					})
				}
				addInv();

				
			}else if (res.chooseOption == 4) {
				console.log(rows[rows.length-1]);
				prompt.get(["newProduct"], function(err, res) {
					console.log(rows.product_name)
					rows[rows.length + 1].product_name.push(res.newProduct)
					console.log(rows)
				})
				
			}else{
				console.log("Please enter a number between 1 and 4");
				manager();
			}
		})

	}
	manager()

})