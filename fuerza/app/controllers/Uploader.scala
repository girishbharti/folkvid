package controllers

import play.api._
import play.api.mvc._
import play.mvc.BodyParser.MultipartFormData
import scala.reflect.io.File
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

class Uploader extends Controller {

  /**
   * This action returns upload page
   */
  def uploadpage = Action {
    Ok(views.html.uploader("File uploader"))
  }

  /**
   * This action handles file upload and provide action
   */
  def upload(): Action[AnyContent] = Action.async { request =>
    request.body.asMultipartFormData.get.file("picture").map { picture =>
      import java.io.File
      val filename = picture.filename
      val contentType = picture.contentType
      picture.ref.moveTo(new File("/tmp/" + filename))
      val file = new File("/tmp/" + filename )
      val size = file.length()
      
      Future(Ok("File uploaded with name: " + filename + ", contentType: " + contentType + ", Size: " + size))
    }.getOrElse {
      Future(Ok("Error in file upload"))
    }
  }

  
  
}
