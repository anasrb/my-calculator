// Variables globales
// Eléments mémoire et écran
const memoireELT = document.querySelector("#memoire");
const ecranELT = document.querySelector("#ecran");

// On stock la valeur de l'ecran "précedent"
let precedent = 0;

// On stock l'affichage
let affichage = "";

// On stock l'opération
let operation = null;

// On initialise la mémoire
let memoire;

window.onload = () => {
    // On écoute les clicks sur les touches
    let touches = document.querySelectorAll("span");

    for(let touche of touches){
        touche.addEventListener("click" , gererTouches);

    }

    // On écoute les touches du clavier
    document.addEventListener("keydown" , gererTouches);

    // Récuperation de la mémoire depuis le stockage local
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if(memoire != 0) memoireELT.style.display = "initial;"
}

function gererTouches(event){
    let touche;
    // On liste les touches autorisés
    const listeTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape"];
    // On vérifie si on a l'évènement "keydown"
    if(event.type === "keydown"){
        // On compare la touche appuyée aux touches autorisées
        if(listeTouches.includes(event.key)){
            // On empêche l'utilisation "par défaut" de la touche
            event.preventDefault();
            // On stocke la touche choisie dans la variable touche
            touche = event.key;
        }
    }else{
        touche = this.innerText;
    }

   

//    On verifie c'est chiffre ou point
     if(parseFloat(touche) >= 0 || touche === "."){
        //  On met à joir la valeur d'affichage et on affiche sur l'écran
        affichage = (affichage === "") ? touche.toString() : affichage + touche.toString();
        ecranELT.innerText = affichage;
     }
     else{
         switch(touche){
            //  Touche c rénitialise tout
             case "C":
             case "Escape":    
            precedent = 0;
            affichage = "";
            operation = null
            ecranELT.innerText = 0;
             break;
            //  Calculs
                case "+":
                case"-":
                case"*":
                case"/":
                // On calcule la valeur de l'étape précedente
                 precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent,parseFloat(affichage),operation);
                //   On met à jour l'ecran
                  ecranELT.innerText = precedent;
                //   On stock l'opération
                  operation = touche;
                //   On réinitialise la variable de l'affichage
                  affichage = "";
            break;
                  case "=":
                      case "enter":
                    //   On calcule la valeur résultat de l'étape précédente
                    precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent,parseFloat(affichage),operation);
                     //   On met à jour l'ecran
                  ecranELT.innerText = precedent;
                  
                  //   On stock le résultat de la variable de l'affichage
                    affichage = precedent;
                    // On réinitialise precedent
                    precedent =0;
                break;
                // On gére la mémoire
                case "M+":
                    // On stock (en additionnant) à la valeur en memoire
                    localStorage.memoire  = (localStorage.memoire) ? parseFloat(localStorage.memoire) + parseFloat(affichage) : parseFloat(affichage);
                    // On affiche le M
                    memoireELT.style.display = "initial";
                break;
                case "MC":
                    // On efface la mémoire 
                    localStorage.memoire = 0;
                    // On efface le M
                    memoireELT.style.display = "none";
                break;
                case "MR":
                        // On récupere la valeur sockée  
                    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
                    affichage =  memoire;
                    ecranELT.innerText = memoire;
                break;
              default:
                break;


                    


         }
     }
}

function calculer(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;

}