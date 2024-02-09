//Checkbox - checked - button 'PROCEED' shining

function checkFunction (){
    const checkBox = document.getElementById("check");
    const btn = document.getElementById("btn-change");
    
    if(checkBox.checked){
            btn.innerText ="";
            btn.classList.add("button-shining"); // comando per accendere il botone

            const creatTag = document.createElement("a"); // Creare il elemento
            creatTag.setAttribute("href","./benchmark.html") // Metere un atributo all'elemento <a>
            
            const textButton = document.createTextNode("PROCEED") // Creare un testo nel botone con il link
            creatTag.appendChild(textButton); // collegare il figlio testo all'elemento <a>
            
            const button = document.getElementById("btn-change");
            button.appendChild(creatTag);
        }else{
            btn.classList.remove("button-shining");
            const aElement = document.querySelector("a");

            if(aElement){
                btn.removeChild(aElement);
                btn.innerText = "PROCEED";
            };
        };
}; 