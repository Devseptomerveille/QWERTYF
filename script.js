
// Cette fonction va afficher le score de l'utilisateur
function afficheResultat(score, nombreMotsPro) {
    let spanScore = document.querySelector(".zoneScore span")
    let affichageScore = ` ${score} / ${nombreMotsPro} `

    spanScore.innerText = affichageScore


}
/*
// l'utilisateur doit faire le choix entre le mot et la phrase
function choisirPhraseOuMot() {
    let choix = prompt("faite un choix entre la liste de: mot ou phrase")
    while (choix !== "mot" && choix !== "phrase") {
        choix = prompt("faite un choix entre la liste de: mot ou phrase")
    }
    return choix
}

// en fonction du choix porté par l'utilisateur la boucle si dessous sera executé
function lanceBoucledeJeu(listedePropositions) {
    let score = 0
    for (i = 0; i < listedePropositions.length; i++) {
        let motUtilisateur = prompt("entrez le mot: " + listedePropositions[i])
        if (motUtilisateur === listedePropositions[i]) {
            score++
        }
    }
    return score
}*/

// cette fonction fera apparaitre les propositions des mot ou phrase
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

// fonction qui vas permettre de construire et d'afficher l'email
function afficherEmail(nom, email, score) {
    let mailTo = `mailto:${email}? subject = share of the score Qwertyfax&body=hello, I'm ${nom} and I just realized the score of ${score} on the site QwertyFax`
    location.href = mailTo
}

// fonction de validation des information dans le formulaire
function validerNom(nom) {
    if (nom.length < 2) {
        throw new error("the name is so small")
    }
}
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9_-]+@[a-z0-9_-]+\\.[a-z0-9_-]+")
    if (!emailRegExp.test(email)) {
        throw new error("the email is not valid")
    }

}
function afficherMessageErreur(message) {
    let spanErreurMessage = document.getElementById("erreurMessage")
   if(!spanErreurMessage){
    let popup = document.querySelector(".popup")

    spanErreurMessage = document.createElement("span")
    spanErreurMessage.id="erreurMessage"
   
    popup.append(spanErreurMessage)
   }
   spanErreurMessage.innerText = message
   
}

function gererformulaire(scoreEmail) {
    try {
        let balisenom = document.getElementById("nom")
        let nom = balisenom.value
        validerNom(nom)
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur(erreur.message)
        afficherEmail(nom, email, scoreEmail)
    } catch(erreur) {
        afficherMessageErreur(erreur.message)
    }
}


// fonction principal donnant une representation structuré de ce que fera notre code 
let score = 0
let i = 0 // initialisation du compteur apres un click de validation
let listeProposition = listeMots
function lancerjeu() {
    //let choix = choisirPhraseOuMot()
    //cette variable contiendra le score de l'utilisateur

    // ici on fait appel a la balise qui vas permettre de valider le mot entre par le user et on l'affecte un evenement
    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")
    //  let zoneScore = document.querySelector(".zoneScore span")
    afficherProposition(listeProposition[i])
    btnValiderMot.addEventListener("click", () => {
        console.log(inputEcriture.value)
        if (inputEcriture.value === listeProposition[i]) {
            score++

        }
        i++

        afficheResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {

            afficherProposition("the game is over")
            btnValiderMot.Disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }
    })

    /* if (choix === 'mot') {
         score = lanceBoucledeJeu(listeMots)
         nombreMotsPro = listeMots.length
     } else {
         score = lanceBoucledeJeu(listephrases)
         nombreMotsPro = listephrases.length
     }*/

}

let listebnRadio = document.querySelectorAll(".optionSource input")

for (let index = 0; index < listebnRadio.length; index++) {

    listebnRadio[index].addEventListener("change", (event) => {
        // le console.log fera apparaitre la valeur du changement emis lors du click
        console.log(event.target.value)
        //ici on a la condition qui vas deteminer si c'est la liste de mot ou de phrase qui va apparaitre et juste apres sera affiché les propositions
        if (event.target.value === "1") {
            listeProposition = listeMots;
            i = 1
        } else {
            listeProposition = listephrases
        }
       // console.log('Compteur ', i);
        console.log(listeProposition);

        afficherProposition(listeProposition[i])
    })

    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gererformulaire(scoreEmail)
    })

    afficheResultat(score, i)
}



