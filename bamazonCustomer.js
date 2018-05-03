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
 
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
    console.log()
  for (var i = 0; i < results.length; i++) {
    console.log(results[i].item_id + " - " + results[i].product_name + " / " + results[i].department_name + " / $ " + results[i].price)
  }
});
 
//connection.end();

function selectFrom() {
    var select = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res)
    })
}

/* PSEUDO CODE: Now I just need to code in the following...

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

The customer's order is being fulfilled as far as the console log response goes, but I need to code in the subtractions from the stock quantity and logging the new total.

*/

inquirer.prompt ([
    {
        type: 'type',
        name: 'item_id',
        message: 'Which item would you like? (Please enter the id number.)'
    }
]).then (function (answer) {
    //console.log(answer)
    var select = 'SELECT * FROM products WHERE item_id = ?'
    var item_id = answer.item_id
    //console.log(mode);
    //console.log(select);
    connection.query(select, item_id, function(err,res) {
        if (err) throw err;
       var price = res[0].price;
       var quantity = res[0].stock_quantity
       var id = res[0].item_id

        inquirer.prompt([
            {
                type: 'type',
                name: 'stock_quantity',
                message: 'How many would you like?'
            }]).then (function (answer) {
                var givenQuantity = parseInt(answer.stock_quantity);
                console.log(" Order Total $ " + parseInt(answer.stock_quantity) * parseInt(price))
                inquirer.prompt([
                    {
                        type: 'type',
                        name: 'stock_quantity',
                        message: 'Place order? Y or N'
                    }]).then (function (answer) {
                        if (givenQuantity <= quantity) {
                            console.log('Thanks for placing your order.')
                            var newQuantity = quantity - givenQuantity
                            connection.query("update products SET stock_quantity = " + newQuantity + " WHERE item_id = " + id, function(err, res) {
                                if(err) throw err
                                console.log("Your order is being processed...")
                            } )
                        } 
                        else {
                            console.log('We apologize. We do not have enough of that item at this time. Please place another order.')
                        }
                        
                    })
            })
    })
})


