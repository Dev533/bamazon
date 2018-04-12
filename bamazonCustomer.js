var mysql = require('mysql');
var inquirer = require('inquirer');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  port     : 3306,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon'
});
 
connection.connect();
 /*
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 */
//connection.end();

function selectFrom() {
    var select = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res)
    })
}

/* PSEUDO CODE: In the inquirer prompt below, I need to add something that provides a list of the items to choose from so that the user can know what they are choosing when they enter one of the item_ids 1 - 10. 

Currently, if someone chooses a number from 1 through 10, it will return an item. At least this part of the app is working.

I am getting an error after it returns the item, so I need to figure out that bug.

Then, I need code prompting the customer the second question of how many units they want of the item. Then, I need to code a subtraction of the amount the user wants to order from the inventory amount.

*/

inquirer.prompt ([
    {
        type: 'type',
        name: 'item_id',
        message: 'Which item would you like?'
    }
]).then (function (answer) {
    //console.log(answer)
    var select = 'SELECT * FROM products WHERE item_id = ?'
    var mode = answer.item_id
    //console.log(mode);
    //console.log(select);
    connection.query(select, mode, function(err,res) {
        if (err) throw err;
        console.log(res[0].product_name)
        console.log(res[0].department_name)
        console.log(res[0].price)
        inquirer.prompt([
            {
                type: 'type',
                name: 'stock_quantity',
                message: 'How many would you like?'
            }.then (function (answer) {
                // var available = 
            })
        
        ])
    })
})


