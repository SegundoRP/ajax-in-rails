import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["items", "form", "input"]
  static values = { position: String }

  connect() {
    console.log(this.element)
    console.log(this.itemsTarget)
    console.log(this.formTarget)
    console.log(this.inputTarget.value)
  }

  send(event) {
    event.preventDefault()
    console.log(this.inputTarget.value)
    fetch(this.formTarget.action, {
      method: "POST",
      headers: {

        "Content-Type": "application/json",
                 "X-CSRF-Token": document.querySelector("[name='csrf-token']").content },

      body: JSON.stringify({review: {"content": this.inputTarget.value}})
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        // if (data.inserted_item) {
        //   this.itemsTarget.insertAdjacentHTML(this.positionValue, data.inserted_item)
        //   window.scrollTo(0, this.itemsTarget.scrollHeight)
        // }
        //   this.formTarget.outerHTML = data.form
      })
  }
}
