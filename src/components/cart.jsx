import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Cart extends Component{

    state={
        cart:[]
    }

    componentDidMount(){
        let cart=localStorage.getItem("cartItems");
        if(cart)
        {
            cart=JSON.parse(cart);
            this.setState({cart});
        }
    }

    componentDidUpdate(){
        localStorage.setItem("cartItems",JSON.stringify(this.state.cart));
    }

    incrementCart=(index)=>{
        let cart=[...this.state.cart];

        if(cart.length)
        { 
            cart[index].qty+=1;
        }

        this.setState({cart});
    }

    decrementCart=(index)=>{
        let cart=[...this.state.cart];

        if(cart.length)
        { 
            if(cart[index].qty>1)
            {
                cart[index].qty-=1;
            }
            else{
                cart.splice(index,1);
            }
            
        }
        this.setState({cart});
    }


    render(){
        let {cart}=this.state;
        let count=cart.length;
        let mrp=0;
        cart.map(c=>mrp+=c.price);
        let discount=0;
        cart.map(c=>discount+=c.discount);
        let orderTotal=mrp-discount;
       
        return( 
            <div className="row">
                <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12">
                    <div className="blank">Order Summary</div>
                    <table className="table table-sm tableorder">
                        <thead>
                          <tr><td>Item ({count})</td><td>Qty</td><td>Price</td></tr>
                        </thead>
                      <tbody>
                      {cart.map((item,index)=>{
                         return <tr key={index}><td>{item.name} </td><td><button onClick={()=>this.incrementCart(index)}> <i className="fa fa-plus"></i></button> <output>{item.qty}</output> <button onClick={()=>this.decrementCart(index)}> <i className="fa fa-minus"></i></button></td><td>${item.price*item.qty}</td></tr>
                         })}
                      </tbody>
                    </table>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div className="blank"><Link to="/"><i className="fa fa-angle-double-left"></i> Go Back</Link></div>
                        <table className="total">
                            <thead>
                            <tr><th>Total</th></tr>
                            </thead>
                            <tbody>
                         <tr><td>Items {count}</td><td>${mrp}</td></tr>
                        <tr><td>Discount</td><td>${discount}</td></tr>
                        <tr><td>Type disc</td><td>$0</td></tr>
                         <tr className="tFooter"><td>Order total</td><td>${orderTotal}</td></tr>
                            </tbody>
                            
                        </table>
                  
                </div>
            </div>
           
   
        );
       
    }
}

export default Cart;