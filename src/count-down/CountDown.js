require("./count-down.less");

export default class CountDown{
    /**
     * Crée un nouveau compteur pour une date donnée
     * @param {string} containerSelector Id de  l'élément DOM dans lequel le compteur sera injecté
     * @param {string} dateEndString La date de fin du compteur au format "YYYY/MM/DD hh:mm:ss"
     */
    constructor(containerSelector,dateEndString){
        let me=this;
        let $container=document.getElementById(containerSelector);
        if(!$container){
            console.error(`l'élément DOM #${containerSelector} est introuvable`);
            return;
        }

        //créé le html et l'injecte
        this.$main=document.createElement("div");
        this.$main.innerHTML=require("./count-down.html");
        this.$main=this.$main.firstChild;
        $container.appendChild(this.$main);
        //référence les elements dom nécessaires
        let $days=me.$main.querySelector(".days");
        let $hours=me.$main.querySelector(".hours");
        let $minutes=me.$main.querySelector(".minutes");
        let $seconds=me.$main.querySelector(".seconds");

        var days,hours,minutes, seconds,reste;
        let debut=Math.floor(new Date().getTime());;
        let fin=Math.floor(new Date(dateEndString).getTime());

        let interv;
        function loop(){

            if(!me.$main.parentNode){
                //arrête la boucle si le machin n'est plus dans le DOM (si ajax etc...)
                console.log("le count down n'est plus dans le DOM")
                clearInterval(interv);
                return;
            }
            debut+=1000;
            let now=new Date();
            now.setTime(debut);

            let remain=(fin-debut)/1000;
            if(remain<0){
                remain=0;
                me.$main.classList.add("fini");
                return;
            }
            days=String(Math.floor(remain/(60*60*24))).padStart(2, '0');
            $days.textContent=String(days);
            reste=remain % (60*60*24);

            $hours.textContent=String(Math.floor(reste/(60*60))).padStart(2, '0');
            reste=reste % (60*60);
            $minutes.textContent=String(Math.floor(reste/(60))).padStart(2, '0');
            reste=reste % (60);
            $seconds.textContent=String(Math.floor(reste)).padStart(2, '0');
        }

        loop();
        interv = setInterval(function () {loop();}, 1000);}

}

window.CountDown=CountDown;