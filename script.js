function start() {
    function compte(){
        time.style.color = `rgb(${220 - time_value}, 0, ${time_value+55})`
        time_value === 0 ? Fin() : time.innerHTML = time_value + ' secondes restantes'
        time_value --
    }
    if (startbutton.value === 'Commencer'){
        score_value = 0
        time_value = 200
        décompte = setInterval(compte, interval)
        startbutton.value = 'Passer'
    }else{
        clearInterval(décompte)
        interval /= 1.15
        décompte = setInterval(compte, interval)
    }
    Update()
}
function Update() {
    let table = [
        Math.ceil((Math.random()) * 100),
        Math.random() > 0.5 ? '+' : '-',
        Math.ceil((Math.random()) * 100),
        Math.random() > 0.5 ? '+' : '-',
        Math.ceil((Math.random()) * 100)
    ]
    for (i of [0, 1, 2, 3, 4]) document.getElementById(`a${i}`).value = table[i]
    let div = document.querySelectorAll("button")
    div.forEach(elt => {
        elt.disabled = false;
        elt.style.background = "white";
    })
    let t = random([0, 1, 2, 3])
    x = eval(table.join(''))
    div[t[0]].innerHTML = (-1 * (Math.round(Math.random() * 20)))
    div[t[1]].innerHTML = x
    div[t[2]].innerHTML = Math.round(parseFloat(x) + (Math.random() * 70))
    div[t[3]].innerHTML = Math.round(parseFloat(x) - (Math.random() * 50))
}
function random(tab) {
    for (i = tab.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var t = tab[i]
        tab[i] = tab[j]
        tab[j] = t
    }
    return tab
}
function Submit(r){
    if (x === +r.innerHTML){
        time.innerHTML = (time_value = (time_value<245) ? time_value+11 : 255) + ' secondes restantes'
        score.innerHTML = ++score_value
        Update()
    }else {
        score.innerHTML = --score_value
        r.style.background = "rgb(204, 94, 94)"
        r.disabled = true
    }
}
function Fin() {
    clearInterval(décompte)
    time.innerHTML = '0 secondes restantes'
    score.style.cssText = "color:yellow; font-size:2em"
    startbutton.value = 'Recommencer'
    startbutton.replaceWith(startbutton = startbutton.cloneNode(false))
    startbutton.addEventListener("click", ()=>window.location.reload())
    document.querySelectorAll("button").forEach(elt => elt.disabled = true)
}
let startbutton = document.querySelector("#start")
let score = document.querySelector("#score")
let time = document.querySelector("#temps")
let interval = 1000
let décompte, time_value, score_value

startbutton.addEventListener("click", start)
document.querySelectorAll("button").forEach(elt => elt.addEventListener("click", (e) => {
    e.preventDefault
    Submit(elt)
}))