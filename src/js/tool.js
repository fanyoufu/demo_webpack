const updateDom = (id, content) =>{
    window.document.getElementById(id).innerHTML = content + Date.now()
}
module.exports = {
  updateDom
}
