var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');


var mysql      = require('mysql');
var connection = mysql.createConnection({
  port     : 3306,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon'
});
 
connection.connect(function (err) {
    if (err) {
        console.log("Error in database connection");
    }
    console.log("connected as id " + connection.threadId);
    selectFrom();
});
 
// connection.query('SELECT * FROM products', function (error, results, fields) {
//   if (error) throw error;
//     console.log()
//   for (var i = 0; i < results.length; i++) {
//     console.log(results[i].item_id + " - " + results[i].product_name + " / " + results[i].department_name + " / $ " + results[i].price)
//   }
// });
 
//connection.end();

function selectFrom() {
    var select = 'SELECT * FROM products';
    connection.query(select, function(err, res) {
        if (err) throw err;
        console.log(res)

        var table = new Table({
            head: ['ID', 'Product Name','Department Name','Price','Quantity']
        
        });
         
        // table is an Array, so you can `push`, `unshift`, `splice` and friends 
        for(var i=0;i<res.length;i++){
            var productArr = [];
            for (var key in res[i]) {
                productArr.push(res[i][key]);
                // table is an Array, so you can `push`, `unshift`, `splice` and friends 
            }
            table.push(productArr);
            
        }
        console.log(table.toString());
        // connection.end()
        orderDetails();
    } )
}
function orderDetails() {
    inquirer.prompt ([
    {
        type: 'input',
        name: 'item_id',
        message: 'Which item would you like? (Please enter the id number.)'
    },
    {
        type: 'input',
        name: 'quantity', //5
        message: 'Please enter quantity:'
    }

]).then (function (answer) {
    //console.log(answer)
    var select = 'SELECT * FROM products WHERE item_id = ?' //1
    var item_id = parseInt(answer.item_id)
    //console.log(mode);
    //console.log(select);
    connection.query(select, item_id, function(err,res) {
        if (err) throw err;
       var price = res[0].price; //$15
       var quantity = res[0].stock_quantity; //99999
       if(quantity /*99999*/ >= parseInt(answer.quantity)/* 5 */) {
           var newStockQuantity = res[0].stock_quantity - parseInt(answer.quantity)
           connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: newStockQuantity}, {item_id: item_id}],
           function (err, data) {
                var p = res[0].price * parseInt(answer.quantity);
                console.log(p)
           })

       }else{
           console.log('Insufficient quantity.')
       }
       connection.end()
       
      
        // inquirer.prompt([
        //     {
        //         type: 'type',
        //         name: 'stock_quantity',
        //         message: 'How many would you like?'
        //     }]).then (function (answer) {
        //         var givenQuantity = parseInt(answer.stock_quantity);
        //         console.log(" Order Total $ " + parseInt(answer.stock_quantity) * parseInt(price))
        //         inquirer.prompt([
        //             {
        //                 type: 'type',
        //                 name: 'stock_quantity',
        //                 message: 'Place order? Y or N'
        //             }]).then (function (answer) {
        //                 if (givenQuantity <= quantity) {
        //                     console.log('Thanks for placing your order.')
        //                 } 
        //                 else {
        //                     console.log('We apologize. We do not have enough of that item at this time. Please place another order.')
        //                 }
                        
        //             })
        //     })
    })
})
}
/* PSEUDO CODE: Now I just need to code in the following...

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

The customer's order is being fulfilled as far as the console log response goes, but I need to code in the subtractions from the stock quantity and logging the new total.

*/

// inquirer.prompt ([
//     {
//         type: 'type',
//         name: 'item_id',
//         message: 'Which item would you like? (Please enter the id number.)'
//     }
// ]).then (function (answer) {
//     //console.log(answer)
//     var select = 'SELECT * FROM products WHERE item_id = ?'
//     var item_id = answer.item_id
//     //console.log(mode);
//     //console.log(select);
//     connection.query(select, item_id, function(err,res) {
//         if (err) throw err;
//        var price = res[0].price;
//        var quantity = res[0].stock_quantity
      
//         inquirer.prompt([
//             {
//                 type: 'type',
//                 name: 'stock_quantity',
//                 message: 'How many would you like?'
//             }]).then (function (answer) {
//                 var givenQuantity = parseInt(answer.stock_quantity);
//                 console.log(" Order Total $ " + parseInt(answer.stock_quantity) * parseInt(price))
//                 inquirer.prompt([
//                     {
//                         type: 'type',
//                         name: 'stock_quantity',
//                         message: 'Place order? Y or N'
//                     }]).then (function (answer) {
//                         if (givenQuantity <= quantity) {
//                             console.log('Thanks for placing your order.')
//                         } 
//                         else {
//                             console.log('We apologize. We do not have enough of that item at this time. Please place another order.')
//                         }
                        
//                     })
//             })
//     })
// })


