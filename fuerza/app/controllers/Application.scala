package controllers

import play.api._
import play.api.mvc._

class Application extends Controller {

  def index = Action {
    Ok(views.html.dashboard.home("Your new application is ready."))
  }

}
