const tipButtons = document.querySelectorAll('.tip-button')

//Percorre todos os botões (permite vários botões na página)
tipButtons.forEach((button) => {
  let coin = button.querySelector('.coin')

// Quanto maior o número, mais lenta será a animação
  coin.maxMoveLoopCount = 90

  button.addEventListener('click', () => {
    if (button.clicked) return

    button.classList.add('clicked')

// Espere para começar a jogar a moeda por causa da animação de inclinação do botão
    setTimeout(() => {
// Aleatorize as velocidades de inversão apenas por diversão
      coin.sideRotationCount = Math.floor(Math.random() * 5) * 90
      coin.maxFlipAngle = (Math.floor(Math.random() * 4) + 3) * Math.PI
      button.clicked = true
      flipCoin()
    }, 50)
  })

  const flipCoin = () => {
    coin.moveLoopCount = 0
    flipCoinLoop()
  }

  const resetCoin = () => {
    coin.style.setProperty('--coin-x-multiplier', 0)
    coin.style.setProperty('--coin-scale-multiplier', 0)
    coin.style.setProperty('--coin-rotation-multiplier', 0)
    coin.style.setProperty('--shine-opacity-multiplier', 0.4)
    coin.style.setProperty('--shine-bg-multiplier', '50%')
    coin.style.setProperty('opacity', 1)
// Atraso para dar algum tempo à animação de redefinição antes que você possa clicar novamente
    setTimeout(() => {
      button.clicked = false
    }, 300)
  }

  const flipCoinLoop = () => {
    coin.moveLoopCount++
    let percentageCompleted = coin.moveLoopCount / coin.maxMoveLoopCount
    coin.angle = -coin.maxFlipAngle * Math.pow((percentageCompleted - 1), 2) + coin.maxFlipAngle

// Calcula a escala e a posição da moeda movendo-se no ar
    coin.style.setProperty('--coin-y-multiplier', -11 * Math.pow(percentageCompleted * 2 - 1, 4) + 11)
    coin.style.setProperty('--coin-x-multiplier', percentageCompleted)
    coin.style.setProperty('--coin-scale-multiplier', percentageCompleted * 0.6)
    coin.style.setProperty('--coin-rotation-multiplier', percentageCompleted * coin.sideRotationCount)

// Calcula os valores de escala e posição para as diferentes faces da moeda
// A matemática usa funções de onda sen/cos para simular o movimento circular do giro 3D
    coin.style.setProperty('--front-scale-multiplier', Math.max(Math.cos(coin.angle), 0))
    coin.style.setProperty('--front-y-multiplier', Math.sin(coin.angle))

    coin.style.setProperty('--middle-scale-multiplier', Math.abs(Math.cos(coin.angle), 0))
    coin.style.setProperty('--middle-y-multiplier', Math.cos((coin.angle + Math.PI / 2) % Math.PI))

    coin.style.setProperty('--back-scale-multiplier', Math.max(Math.cos(coin.angle - Math.PI), 0))
    coin.style.setProperty('--back-y-multiplier', Math.sin(coin.angle - Math.PI))

    coin.style.setProperty('--shine-opacity-multiplier', 4 * Math.sin((coin.angle + Math.PI / 2) % Math.PI) - 3.2)
    coin.style.setProperty('--shine-bg-multiplier', -40 * (Math.cos((coin.angle + Math.PI / 2) % Math.PI) - 0.5) + '%')

//Repetir loop de animação
    if (coin.moveLoopCount < coin.maxMoveLoopCount) {
      if (coin.moveLoopCount === coin.maxMoveLoopCount - 6) button.classList.add('shrink-landing')
      window.requestAnimationFrame(flipCoinLoop)
    } else {
      button.classList.add('coin-landed')
      coin.style.setProperty('opacity', 0)
      setTimeout(() => {
        button.classList.remove('clicked', 'shrink-landing', 'coin-landed')
        setTimeout(() => {
          resetCoin()
        }, 300)
      }, 1500)
    }
  }
})