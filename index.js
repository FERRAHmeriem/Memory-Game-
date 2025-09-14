const moves=document.querySelector(".moves");
const times=document.querySelector(".times");
const gamecontainer=document.querySelector(".game-container");
const controls=document.querySelector(".control-game");
const start = document.querySelector('#start');
const stop = document.querySelector("#stop");
const result = document.querySelector("#result");
let vo ;
let cards;
let interval;
let firstitm =false ;
let seconditm =false ;
let seconds = 0 , minutes= 0;
let countemoves=0 , countewin =0
const items =[
    {name : "antilope" , image : "antilope.png"},
    {name : "buffle" , image : "buffle.png"},
    {name : "cheval" , image : "cheval.png"},
    {name : "chevre" , image : "chevre.png"},
    {name : "crocodile" , image : "crocodile.png"},
    {name : "crocodile2" , image : "crocodile2.png"},
    {name : "flamant" , image : "flamant.png"},
    {name : "girafe" , image : "girafe.png"},
    {name : "guepard" , image : "guepard.png"},
    {name : "herisson" , image : "herisson.png"},
    {name : "hippopotame" , image : "hippopotame.png"},
    {name : "lapin" , image : "lapin.png"},
    {name : "lapin2" , image : "lapin2.png"},
    {name : "lelephant" , image : "lelephant.png"},
    {name : "lelephant2" , image : "lelephant2.png"},
    {name : "mouton" , image : "mouton.png"},
    {name : "porc" , image : "porc.png"},
    {name : "raton-laveur" , image : "raton-laveur.png"},
    {name : "renard" , image : "renard.png"},
    {name : "renne" , image : "renne.png"},
    {name : "sanglier" , image : "sanglier.png"},
    {name : "tigre" , image : "tigre.png"},
    {name : "vache" , image : "vache.png"},
    {name : "zebre" , image : "zebre.png"},
    {name : "antilope" , image : "antilope.png"},
    {name : "buffle" , image : "buffle.png"},
    {name : "cheval" , image : "cheval.png"},
    {name : "crocodile2" , image : "crocodile2.png"},
    {name : "flamant" , image : "flamant.png"},
    {name : "girafe" , image : "girafe.png"},
    {name : "guepard" , image : "guepard.png"},
    {name : "lelephant" , image : "lelephant.png"},
    {name : "renard" , image : "renard.png"},
    {name : "renne" , image : "renne.png"},
    {name : "tigre" , image : "tigre.png"},
    {name : "vache" , image : "vache.png"},
];

const timegnrt = ()=> {
    seconds += 1 ;
    if (seconds> 60 ) {
        minutes+=1 ;
        seconds =0 ;
    }
    let secondsvalue = seconds <10 ? `0${seconds}` : seconds ;
    let minutesvalue = minutes <10 ? `0${minutes}` : minutes  ;
  times.innerHTML=`<span>Time:</span>${minutesvalue}:${secondsvalue}`;
}
const countermoves = ()=> {
countemoves+=1;
moves.innerHTML=`<span>Moves:</span> ${countemoves}` ;
};

//random objects
const RandomObjects = (size=4 )=> {
let tmparr = [...items];
let cardValues =[];
size = (size*size)/2;
for (let i =0 ;i < size ; i++){
    const Rndmindex = Math.floor(Math.random()*tmparr.length);
    cardValues.push(tmparr[Rndmindex]);
    tmparr.splice(Rndmindex,1);
}
return cardValues;
};

const Mtrxgenerator = (cardValues , size=4 ) =>{
gamecontainer.innerHTML="";
cardValues=[...cardValues , ...cardValues];
cardValues.sort(()=> Math.random()-0.5);
for(let i = 0 ; i< size * size ; i++){
    gamecontainer.innerHTML += `
    <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="before"> ? </div>
        <div class="after"> <img src="/img/${cardValues[i].image}" alt=""> </div>
    </div>
`;

}
gamecontainer.style.gridTemplateColumns=`repeat(${size},auto)`;
cards = document.querySelectorAll(".card-container");
cards.forEach((card)=> {
    card.addEventListener('click',()=>{
        if (!card.classList.contains("matched")){
            card.classList.add("flipped");
            if (!firstitm){
                firstitm=card;
                firstcardvalue = card.getAttribute("data-card-value");
            } else {
                countermoves();
                seconditm= card;
               let secondcardvalue = card.getAttribute("data-card-value");
                if (firstcardvalue==secondcardvalue){
                    firstitm.classList.add("matched");
                    seconditm.classList.add("matched");
                    firstitm = false ;
                    countewin+=1;
                    if (countewin === Math.floor(cardValues.length / 2)){
                        result.innerHTML=`
                        <h2>You Won </h2>
                        <h4>Moves : ${countemoves}</h4>
                        `;
                        stpgame();
                    }
                }else {
                    let [tmpfirst,tmpsecond]= [firstitm,seconditm];
                    firstitm=false;
                    seconditm= false;
                      delay = setTimeout(()=>{
                      tmpfirst.classList.remove("flipped");
                      tmpsecond.classList.remove("flipped");
                    },1000);
                }
            }
        }
    });
});
};
const initialise = () => {
    result.innerHTML='';
    countewin=0;
    let cardValues = RandomObjects();
    console.log(cardValues),
    Mtrxgenerator(cardValues);
 };
 //start
 start.addEventListener('click', () => {
    console.log('yes')
    countemoves =0;
    seconds= 0;
    minutes = 0;
    controls.classList.add("hide");
    start.classList.add("hide");
    stop.classList.remove("hide");
    interval = setInterval(timegnrt , 1000);
    moves.innerHTML=`<span>Moves:</span>${countemoves}`;
    initialise();
 });
 stop.addEventListener('click', 
 (stpgame = () => {
    controls.classList.remove("hide");
    start.classList.remove("hide");
    stop.classList.add("hide");
    clearInterval(interval);
 }));
 
