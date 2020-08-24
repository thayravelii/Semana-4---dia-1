document.getElementById('btnSalvar').addEventListener('click',() => {
    if (document.querySelectorAll(':invalid').length > 0) {
      alert ("Os campos obrigatórios não foram preenchidos.")
    }
  })