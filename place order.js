const btnCard=document.querySelector('#card-icon');
const card=document.querySelector('.card');
const btuClose=document.querySelector('#card-close');

btnCard.addEventListener('click',()=>{
    card.classList.add('card-active')
});

btuClose.addEventListener('click',()=>{
    card.classList.remove('card-active')
});

document.addEventListener('DOMContentLoaded',loadice);

function loadice(){
    loadContent();
}

function loadContent(){
    //Remove Food Items Form Cart
    let btnRemove=document.querySelectorAll('.card-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeitem)
    });

    //product item change event
    let QtyElement=document.querySelectorAll('.card-quantity');
    QtyElement.forEach((btn)=>{
        btn.addEventListener('change',ChangeQty)
    });

    //product cart
    let cartBtn=document.querySelectorAll('.add-card');
    cartBtn.forEach((btn)=>{
        btn.addEventListener('click',addCart)
    });

    updateTotal()
   
}

//Remove item //remove the Cart-Box
function removeitem(){
    if(confirm('Are Your Sure to Remove'))
        {
            let title=this.parentElement.querySelector('.card-ice-title').innerHTML ;
            itemList=itemList.filter(el=>el.title!=title)
    this.parentElement.remove();
    //recall function
    loadContent();
}
}

//change Quantity
function ChangeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent()
}

let itemList=[]

//add cart
function addCart(){
    let ice=this.parentElement;
    let title=ice.querySelector('.ice-title').innerHTML;
    let price=ice.querySelector('.ice-price').innerHTML;
    let imgSrc=ice.querySelector('.ice1').src;

    // console.log(title,price,imgSrc);

    newProduct={title,price,imgSrc}
    //Check Product already Exist in cart
    if(itemList.find((el)=>el.title==newProduct.title))
    {
        alert("Product Already added in Cart")
        return;
    }
    else{
        itemList.push(newProduct)
        
    }

    let newProductElement=createCartProduct(title,price,imgSrc);

    let element=document.createElement('div');
    element.innerHTML=newProductElement;

    let cartBasket=document.querySelector('.card-content');

    cartBasket.append(element);
    //recall function
    loadContent();
}

function createCartProduct(title,price,imgSrc){
    return`
    
     <div class="card-box">
                <img src="${imgSrc}" class="card-img">
                <div class="detail-box">
                    <div class="card-ice-title">${title}</div>
                    <div class="price-box">
                        <div class="card-price">${price}</div>
                        <div class="card-amt">${price}</div>
                    </div>
                    <input type="number" value="1" class="card-quantity">
                </div>
                <ion-icon name="trash" class="card-remove"></ion-icon>
            </div>
            `;
}

//total

function updateTotal(){
    const cartItems=document.querySelectorAll('.card-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;

    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.card-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.card-quantity').value;
        total+=(price*qty);
        product.querySelector('.card-amt').innerText="Rs."+(price*qty);

    });
    totalValue.innerHTML='Rs.'+total;

    

    //Add Product Count in Card icon

    const cardCount=document.querySelector('#card-count');
    let count=itemList.length;
    cardCount.innerHTML=count;

    if(count==0){
        cardCount.style.display='none';
    }
    else{
        cardCount.style.display='block';
    }
}