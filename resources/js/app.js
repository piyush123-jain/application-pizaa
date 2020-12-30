
// insert admin 
import { InItAdmin } from './admin';
import { moment } from "moment";

// create connection with socket
const socket = io();
var currentStatus;

// set totalqty into localStorage
$(document).ready(function () {
  
  // check this is admin room or not 
  let adminArea = window.location.pathname;
  if(adminArea.includes('admin')){
    socket.emit('join','admin_room');
  }
  //end check this is admin room or not 



  $(".alert-success").show();
    setTimeout(()=>{
      
      $(".alert-success").hide(1000);
  },3000)
        

    $('.item_add_to_cart').hide();
    $('.successMessage').hide();
      $('.item_add_to_cart_error').hide();
    
    // ajax call from client to server
    $.ajax({
      url : `http://localhost:3100/cart_data`, // Url of backend (can be python, php, etc..)
      type: "GET", // data type (can be get, post, put, delete)
      success: function(response, textStatus, jqXHR) {
        
        response.cartItem;
        },
      error: function ( errorThrown) {
          return null;    
      }
    });
  
    });
  
  
  // select add to cart button
  let addToCart = document.querySelectorAll('.add_to_cart');
  addToCart.forEach((btn)=>{

  btn.addEventListener('click',(e)=>{
  
    // return message from server
      var Status_from_server = postFunction(JSON.parse(btn.dataset.pizaa),'POST','/update_cart')
      if(!Status_from_server)
        {
  
            $('.item_add_to_cart').show(1000);
            setTimeout(()=>{
            $('.item_add_to_cart').hide(1000);
            },3000)
        }
        else{
            // error show and hide
            $('.item_add_to_cart_error').show(1000);
            setTimeout(()=>{
              $('.item_add_to_cart_error').hide(1000);
            },3000);
        }
  
  })
  })
  
  
  
  $(".orderBtn").click(function() {
    $('html, body').animate({
        scrollTop: $("#scroll_to_order").offset().top
    }, 2000);
});
  //  post function
  function postFunction(pizaa,type,url){ 
    // ajax call from client to server
  $.ajax({
    url : `http://localhost:3100${url}`, // Url of backend (can be python, php, etc..)
    type: type, // data type (can be get, post, put, delete)
    data : pizaa, // data in json format
    success: function(response, textStatus, jqXHR) {
      
        return true;
      },
    error: function ( errorThrown) {
        return false;    
    }
  });
  }
  
  InItAdmin(socket);
  // custom select box

  var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
// end custom select box
const order = JSON.parse(document.getElementById("hidden_value").value);

let status  = document.getElementsByClassName('status_line');

// socket work 
  if(order)
  {
    socket.emit('join',`order_${order._id}`);
  }

socket.on('updated_data',(data)=>{
  const updateOrder = order
  updateOrder.status = data.status

 $('.successMessage').show(2000);
 setTimeout(()=>{
   $('.successMessage').hide(2000);
  },4000)
  updateStatus(updateOrder);
})

// update Status 
updateStatus(order)

function updateStatus(updateOrder){ 
  // match status 
  for(var i= 0;i<status.length;i++)
  {

  if(status[i].dataset.status == updateOrder.status )
  {
    status[i].classList.remove('current');
    status[i+1].classList.add('current');
  }
  else
  {
    status[i].classList.add('actived_class');
    
  }
}
}




