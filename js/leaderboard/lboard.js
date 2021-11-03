const tabs = document.querySelectorAll(".lboard_tabs ul li");
const today = document.querySelector(".today");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const items = document.querySelector(".lboard_item");


tabs.forEach(function (tab){
    tab.addEventListener("click",function (){
        const concurrent = tab.getAttribute("data-li");


        tabs.forEach(function (tab){
            tab.classList.remove("active");
        })
        tab.classList.add("active");

        items.forEach(function (items){
           items.style.display = "none";
        })

        if (concurrent === "today"){
            today.style.display = "block";
        }
        else if (concurrent === "month"){
            month.style.display = "block";
        }
        else{
            year.style.display = "block";
        }
    })
})