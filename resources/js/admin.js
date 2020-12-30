import axios from 'axios';
import moment from 'moment';

export function InItAdmin(socket){

    socket.on('updated_data',(data)=>{
        console.log(data);  
    
    })

    
    const orderTableBody = document.querySelector('#orderTableBody');
let orders = [];
let markup  ;

// call ajax request
axios.get('/admin',{
    headers:{"X-Requested-With":"XMLHttpRequest"}
}).then(res=>{
    orders = res.data
    markup = generateMarkup(orders)
    orderTableBody.innerHTML = markup

}).catch(err=>{
    console.log(err);
})

// fetch item name and qty 
function renderItems(items)
{

    let parsedItems = Object.values(items);
    return parsedItems.map((menuitem)=>{

       return `
            <p>${menuitem.item.name} 
                -
             ${menuitem.qty} pcs</p>
        `
        // and last join it together
    }).join('') 
}
// genrate list 
function generateMarkup(orders)
{

        return orders.map(order =>{
            return `
            <tr>
            <td>
            <p>${order._id}</p>
            <div>${renderItems(order.items)}</div>
            </td>
            <td>${order.customerId.name}</td>
            <td>${order.phone}</td>

                <td>
                    <div>
                        <form action="/admin/order/status" method="post">
                        <input type="hidden" name="orderId" value="${order._id}>
                        <div class="custom-select" style="width:200px;">
                        <select name="status" onchange="this.form.submit()">
                        <option value="order_placed"
                                ${order.status === 'order_placed' ?'selected':''}>Placed</option>
                        <option value="confirmed"
                                ${order.status === 'confirmed' ?'selected':''}>Confirmed</option>
                        <option value="prepared"
                                ${order.status === 'prepared' ?'selected':''}>Prepared</option>
                        <option value="delivered"
                                ${order.status === 'delivered' ?'selected':''}>Delivered</option>
                        <option value="completed"
                                ${order.status === 'completed' ?'selected':''}>Completed</option>
                        </select> 
                        </div>
                        

                                    </form>
                    <div>
                </td>
                <td>${moment(order.createdAt).format('hh:mm A')}</td>
            </tr>
        `
        })
}

  
}
