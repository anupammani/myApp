import React,{Component} from 'react';
import {Link} from "react-router-dom";

class Home extends Component{

    state={
        products:[],cartItems:[],message:""
    }

    async componentDidMount(){
        let promise=await fetch("https://api.myjson.com/bins/qhnfp");

        if(promise.ok)
        {
            let products=await promise.json();

            this.setState({products});
        }

        let cartItems=localStorage.getItem("cartItems");
        if(cartItems)
        {
            cartItems=JSON.parse(cartItems);
            this.setState({cartItems});
        }
       
    }

    componentDidUpdate(){
       
    }

    clearTimer=null;

    addToCart=(item)=>{
        let cartItems=this.state.cartItems;
        let index=cartItems.indexOf(item);

        if(index===-1)
        {
            item.qty=1;
            cartItems.push(item);
        }
        else{
            cartItems[index].qty+=1;
        }
        let message=`${item.name} Added to cart.`;
        this.setState({cartItems,message});
        localStorage.setItem("cartItems",JSON.stringify(cartItems));

        if(this.clearTimer)
        {
           clearTimeout(this.clearTimer);
        }

        this.clearTimer=setTimeout(()=>{
            this.setState({message:""});
        },1500);
    }

   

    render(){
        let {products,message,cartItems}=this.state;
        let count=cartItems.length;
        return (
          <React.Fragment>
          <nav className="navbar bg-light ">
            <div className="container">
                <div className="col">All Items</div>
                <div className="col">&nbsp;{message && <span className="message">{message}</span>} </div>
        <div className="col text-right"><Link to="/cart" className="btn btn-sm btn-primary">Go to cart <i className="fa fa-cart-plus"></i> <span className=" badge badge-info">{count}</span></Link></div>
            </div>
        </nav>
          <div className="row">
            {products.map((item, index) => {
              let mrp = item.price - item.discount;
              let strike = item.discount ? <strike>${item.price}</strike> : "";
              let discount = parseInt((item.discount / item.price) * 100);
              return (
                <div
                  key={item.id}
                  className="col-sm-12 col-md-6 col-lg-4 col-xl-3 "
                >
                  <div className="myCard">
                    {item.discount !== 0 && (
                      <span className="discount ">{discount}% off</span>
                    )}
                    <table>
                      <tr>
                        <td colSpan="2" className="">
                          <img
                            src="dummy.png"
                          />
                        </td>
                      </tr>
                      <tr className="tFooter">
                        <td colSpan="2">{item.name}</td>
                      </tr>
                      <tr className="tFooter ">
                        <td>
                          {strike} ${mrp}
                        </td>
                        <td className="text-right">
                          <button type="button" className="btn btn-outline-info btn-sm" onClick={()=>this.addToCart(item)}>
                            <i className="fa fa-shopping-cart"></i>
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
          </React.Fragment>
        );
    }
}

export default Home;