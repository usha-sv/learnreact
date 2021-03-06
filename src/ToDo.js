import React,{Component} from 'react';
import  "./ToDo.css"
function ToDoList(props){
    const items = props.items;
    const listItems = items.map(item =>
    {
       return <div className="list" key={item.key} >
          <p>
         <input type="text" id={item.key} value={item.text} onChange={(e)=>{
             props.setUpdate(e.target.value,item.key)}}/>
        <span>
       
        <button class="delete" onClick={() => {
            props.deleteItem(item.key)
        }} >Del</button>


        </span>
     </p>
     
    </div>})
    return (
        <div>{listItems}</div>
    )
  }

class ToDo extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            currentItem:{
              text:''
               }
        }
          this.addItem = this.addItem.bind(this);
          this.handleInput = this.handleInput.bind(this);
          this.deleteItem = this.deleteItem.bind(this);
          this.setUpdate = this.setUpdate.bind(this);
    }
    addItem(e){
        e.preventDefault();
        const newItem = this.state.currentItem;
        if(newItem.text !==""){
          const items = [...this.state.items, newItem];//destructuring asssignment
        this.setState({
          items: items,
          currentItem:{
            text:'',
            key:''

          }
        })
        }
        //else{
        //    return(<p>Can't add empty items</p>)
        //}
      }
      deleteItem(key){
        const filteredItems= this.state.items.filter(item =>
          item.key!==key);
        this.setState({
          items: filteredItems
        })
    
      }
      setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }
      handleInput(entered){
        this.setState({
          currentItem:{
            text: entered.target.value,
            key: Date.now()

          }
        })
      }

   render(){
       console.log("Inside Render")
       return(
           <div class="ToDo">
                <form id="todoForm" >
                    <h1>To-Do App</h1><br/>
                    <input type="text" placeholder="Enter your text" 
                    value={this.state.currentItem.text} 
                    onChange={this.handleInput}/>
                    <button onClick={this.addItem} type="submit">Add</button>
                </form>
                <p>{this.state.items.text}</p>
                <ToDoList items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate} />

            </div>
       );
   } 
}
//<button onClick={(e)=>{this.addItem(e)} } type="submit">Add</button>

export default ToDo;

