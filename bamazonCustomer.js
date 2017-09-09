var mysql = require("mysql");
var require = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: "root",
    password: "root",
    database: "greatBay_DB"
});

connection.connect(function(error){
    if (error) throw error;

    start();
});

function start(){
    inquirer
    .prompt({
        name: "selectItem",
        type: "rawlist",
        message:"Please select the product you would like to purchase:",
        choices: 
    })
}