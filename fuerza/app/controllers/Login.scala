package controllers

import play.api._
import play.api.mvc._

class Login extends Controller {

  def login = Action {
    Ok(views.html.index("Your new application is ready."))
  }

}
