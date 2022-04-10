import React from "react";
import Swal from 'sweetalert2'

function App() {
  const [gifts,setGifts] = React.useState([
    // {id: 2,complete: false, gift: "Telefono", to: "Rocio", amount: 6, date: "2022-09-17"},
    // {id: 3,complete: true, gift: "Ropa", to: "Elisa", amount: 4, date: "2022-09-17"},
    // {id: 4,complete: false, gift: "Gorra", to: "Butti", amount: 3, date: "2022-09-17"},
  ]);

  
  React.useEffect(() => {
    const gifts = JSON.parse(localStorage.getItem('gifts'));
    if (gifts) {
     setGifts(gifts);
    }
  }, []);


  React.useEffect(() => {
    localStorage.setItem('gifts', JSON.stringify(gifts));
  }, [gifts]);



  const getHTML = (gift) => {
    return`<div class="form-control w-full">
    <label class="label" htmlFor="setGiftInputModal">
      <span class="label-text">What is the gift?</span>
      <span class="label-text-alt"></span>
    </label>
    <input type="text" value="${gift.gift}" id="setGiftInputModal" class="input bg-slate-300 input-bordered w-full max-w-xs" />
  </div>
  <div class="form-control w-full">
    <label class="label" htmlFor="setToInputModal">
      <span class="label-text">Who is the receiver?</span>
      <span class="label-text-alt"></span>
    </label>
    <input type="text" value="${gift.to}" id="setToInputModal" class="input bg-slate-300 input-bordered w-full max-w-xs" />
  </div>
  <div class="form-control w-full">
    <label class="label" htmlFor="setDateInputModal">
      <span class="label-text">Date of Party?</span>
      <span class="label-text-alt"></span>
    </label>
    <input type="date" value="${gift.date}" id="setDateInputModal" class="input bg-slate-300 input-bordered w-full max-w-xs" />
  </div>
  <div class="form-control w-full">
    <label class="label" htmlFor="setPriceInputModal">
      <span class="label-text">Gift price?</span>
      <span class="label-text-alt"></span>
    </label>
    <input type="text" value="${gift.price}" id="setPriceInputModal" class="input bg-slate-300 input-bordered w-full max-w-xs" />
  </div>
  <div class="form-control flex w-full">
    <label class="label" htmlFor="setAmountInputModal">
      <span class="label-text">Amount?</span>
    </label>
    <input id="setAmountInputModal" value="${gift.amount}" type="range" min="1" max="10" class="range range-xs w-full" step="1" />
    <div class="w-full flex justify-between text-xs px-2">
      <span>|1</span>
      <span>|2</span>
      <span>|3</span>
      <span>|4</span>
      <span>|5</span>
      <span>|6</span>
      <span>|7</span>
      <span>|8</span>
      <span>|9</span>
      <span>|10</span>
    </div>
  </div>`
  }
  const getIdFromIcon = (event) => {
    if(event.target.nodeName === "path"){
      return event.target.parentNode.dataset.id;
    }else{
      return event.target.dataset.id;
    }
  } 
  const getIndexFromIcon = (event) => {
    if(event.target.nodeName === "path"){
      return event.target.parentNode.dataset.index;
    }else{
      return event.target.dataset.index;
    }
  } 


  function removeGift(event){
    const giftId = getIdFromIcon(event);

    const filtered = gifts.filter(function(value){
      return value.id !== parseInt(giftId);
    });
    setGifts(filtered)
  }

  function editGift(event){
    // const giftId = getIdFromIcon(event);
    const giftIndex = getIndexFromIcon(event);
    Swal.fire({
      title: 'Submit your Github username',
      html: getHTML(gifts[giftIndex]),
      showCancelButton: true,
      confirmButtonText: 'Edit gift',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const gift = Swal.getPopup().querySelector('#setGiftInputModal').value
        const to = Swal.getPopup().querySelector('#setToInputModal').value
        const date = Swal.getPopup().querySelector('#setDateInputModal').value
        const amount = Swal.getPopup().querySelector('#setAmountInputModal').value
        const price = Swal.getPopup().querySelector('#setPriceInputModal').value
        if (!to || !gift|| !date|| !amount) {
          Swal.showValidationMessage(`Please enter correct info!`)
        }
        return { gift: gift, to: to, date: date, amount: amount, price: price }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        let updatedGifts = [...gifts];
        console.log(event.target)
        updatedGifts[parseInt(giftIndex)].gift = result.value.gift;
        updatedGifts[parseInt(giftIndex)].to = result.value.to;
        updatedGifts[parseInt(giftIndex)].amount = result.value.amount;
        updatedGifts[parseInt(giftIndex)].date = result.value.date;
        updatedGifts[parseInt(giftIndex)].price = parseInt(result.value.price);
        setGifts(updatedGifts);
      }
    })

  }

  function completeGift(event){
    const giftIndex = getIndexFromIcon(event);
    let updatedGifts = [...gifts];
    console.log(event.target)
    updatedGifts[parseInt(giftIndex)].complete = !updatedGifts[parseInt(giftIndex)].complete;
    setGifts(updatedGifts)
  }
  function addGift(event){
    event.preventDefault();
    const setAmountInput = event.target.elements.setAmountInput;
    const setGiftInput = event.target.elements.setGiftInput;
    const setToInput = event.target.elements.setToInput;
    const setDateInput = event.target.elements.setDateInput;
    const setPriceInput = event.target.elements.setPriceInput;

    if(setGiftInput.value && setToInput.value && setDateInput.value){
      setGifts(prevGifts=> [...prevGifts,{id: Math.round(Math.random() * 1000),complete: false, gift: setGiftInput.value, to: setToInput.value, amount: setAmountInput.value, date: setDateInput.value, price: parseInt(setPriceInput.value) }])
    }

    return;
  }




  function resetForm(event){
    event.preventDefault();
    console.log(event.target.elements)
    const setAmountInput = event.target.elements.setAmountInput;
    const setGiftInput = event.target.elements.setGiftInput;
    const setPriceInput = event.target.elements.setPriceInput;
    const setToInput = event.target.elements.setToInput;
    const setDateInput = event.target.elements.setDateInput;
    
    setAmountInput.value = 1;
    setGiftInput.value = "";
    setPriceInput.value = "";
    setToInput.value = "";
    setDateInput.value = "";

  }
  function sumarGifts(gifts){
    let sumatoria = 0;

    gifts.forEach(element => {
      sumatoria+= element.price * element.amount;
    });

    return sumatoria;
  }
  return (
    <>
      <div className="mx-auto px-4 grid gap-x-4 grid-cols-1 md:grid-cols-3 pt-8 h-full">
        <div className="card w-full">
          <form onSubmit={addGift} onReset={resetForm} className="card-body">
            <h2 className="card-title">Gifts list!</h2>
            <div className="form-control w-full">
              <label className="label" htmlFor="setGiftInput">
                <span className="label-text">What is the gift?</span>
                <span className="label-text-alt"></span>
              </label>
              <input type="text" placeholder="Type here" id="setGiftInput" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="setToInput">
                <span className="label-text">Who is the receiver?</span>
                <span className="label-text-alt"></span>
              </label>
              <input type="text" placeholder="Type here" id="setToInput" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="setDateInput">
                <span className="label-text">Date of Party?</span>
                <span className="label-text-alt"></span>
              </label>
              <input type="date" id="setDateInput" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="setPriceInput">
                <span className="label-text">Gift price?</span>
                <span className="label-text-alt"></span>
              </label>
              <input type="number" id="setPriceInput" placeholder="$100 (only numbers)" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control flex w-full">
              <label className="label" htmlFor="setAmountInput">
                <span className="label-text">Amount?</span>
              </label>
              <input id="setAmountInput" type="range" min="1" max="10" className="range range-xs w-full" step="1" />
              <div className="w-full flex justify-between text-xs px-2">
                <span>|1</span>
                <span>|2</span>
                <span>|3</span>
                <span>|4</span>
                <span>|5</span>
                <span>|6</span>
                <span>|7</span>
                <span>|8</span>
                <span>|9</span>
                <span>|10</span>
              </div>
            </div>
            <div className="card-actions">
              <input type="submit" className="btn btn-primary" value="Add task" />
              <input type="reset" className="btn btn-ghost" value="Reset input" />
            </div>
          </form>
        </div>


        {/* list of gifts */}
        <div className="text-white col-span-2">
          <h1 className="text-xl tracking-wide font-semibold text-teal-400 underline underline-offset-4">Total: ${sumarGifts(gifts)}</h1>
          {gifts.map((gift,index)=>(
            <div key={gift.id} className={ gift.complete === true? "alert shadow-lg alert-success text-white mt-2 " : "alert shadow-lg alert-error text-white mt-2" }>
            <div>
              {gift.complete === true
              ? <button className="tooltip tooltip-info" data-tip="Set task not completed">
                  <svg data-index={index} onClick={completeGift} xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6 transition ease-in-out delay-150 hover:scale-150 duration-300 hover:cursor-pointer" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              : <button className="tooltip tooltip-info" data-tip="Set task completed">
                  <svg data-index={index} onClick={completeGift} xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6 transition ease-in-out delay-150 hover:scale-150 duration-300 hover:cursor-pointer" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              }
              <div>
                <h3 className="font-bold break-words">{gift.gift} ({gift.amount}) - To: {gift.to} - Cost: {gift.amount * gift.price}</h3>
                <div className="text-xs">Limit date: {gift.date}</div>
              </div>
            </div>
            <div className="flex-none">
              <button data-id={gift.id} onClick={editGift} className="btn btn-sm hover:text-white  hover:scale-110 duration-300">
              <svg data-id={gift.id} data-index={index} onClick={editGift} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              </button>
              <div className="tooltip tooltip-warning tooltip-left" data-tip="Task deleted not come back from dead!">
              <button data-id={gift.id} onClick={removeGift} className="btn btn-sm hover:text-white  hover:scale-110 duration-300">
              <svg data-id={gift.id} onClick={removeGift} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path onClick={removeGift} strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              </button>
              </div>
            </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default App;
