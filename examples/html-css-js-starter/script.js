const messageText = document.querySelector('.message-text')
const changeMessageButton = document.querySelector('.change-message-button')

changeMessageButton.addEventListener('click', () => {
  messageText.textContent = 'You changed the page with JavaScript.'
})
