//Botão para adicionar classe hide para mudar de pagina

function onOff() {
    var a = document.querySelector("#modal")

    a.classList.toggle("hide")






    var b = document.querySelector("body")

    b.classList.toggle("hideScroll")

    var c = document.querySelector("#modal")

    c.classList.toggle("addScroll")
}


function checkFields(event) {

    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link",

    ]


    const isEmpty = valuesToCheck.find(function (value) {

        const checkIfisString = typeof event.target[value].value === "string"
        const checkIfisEmpty = !event.target[value].value.trim()
        if (checkIfisString && checkIfisEmpty) {
            return true
        }
    })

    if (isEmpty) {
        event.preventDefault()
        window.alert("Por favor, preencha todos os campos")
    }


}

function Deletar() {
    db.run(` DELETE FROM ideias WHERE id = ?`, [7], function (err) {
        if (err) return console.log(err)

        console.log("DELETEI", this)
    })
}

