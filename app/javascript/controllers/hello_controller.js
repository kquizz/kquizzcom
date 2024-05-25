import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  greet() {
    this.element.textContent = "Hello World!"
    alert("Hello World!")
  }
}
