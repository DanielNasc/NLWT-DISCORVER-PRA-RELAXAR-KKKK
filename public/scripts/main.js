import Modal from './modal.js'

const modal = Modal()

//QUERYSELECTORS
const checkButtons = document.querySelectorAll('.actions a.check')
const delButton = document.querySelectorAll('.actions a.delete')
const modalButton = document.querySelector('.modal button')
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')

//ABRIR MODAL
function handleClick(event, check = false){
    event.preventDefault()
    const questionId = event.target.dataset.id

    const text = check ? 'Marcar como lida': 'Excluir'
    const action = check ? 'check': 'delete'
    const form = document.querySelector('.modal form')
    const roomID = document.querySelector('#room-id').dataset.id

    form.setAttribute('action', `/question/${roomID}/${questionId}/${action}`)


    modalTitle.innerHTML = text
    //Ela fez de outro jeito, usando variaveis, mas eu prefiro assim (soa melhor)
    modalDescription.innerHTML = check? 'Você deseja marcar esta pergunta como lida?' : 'Você deseja excluir esta pergunta?'
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`

    //Remover ou adicionar classe red
    check? modalButton.classList.remove('red') : modalButton.classList.add('red')

    modal.open()
}

delButton.forEach(deleteBtn =>{
    deleteBtn.addEventListener('click',(event)=>{ handleClick( event) })
})

checkButtons.forEach(button=>{
    button.addEventListener('click', (event)=>{ handleClick(event, true) 
    })
})
