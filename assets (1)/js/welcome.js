//Checkbox - checked - button 'PROCEED' shining


function checkFunction (){
    const checkBox = document.getElementById("check");
    const btn = document.getElementById("btn-change");

        if(checkBox.checked){
            btn.classList.add("button-shining")
        }else{
            btn.classList.remove("button-shining")
        }
}; 

