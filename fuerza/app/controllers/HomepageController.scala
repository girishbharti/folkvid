package controllers

import play.api._
import play.api.mvc._
import play.api.libs.iteratee.Enumerator
import scala.concurrent.ExecutionContext.Implicits.global

class HomepageController extends Controller {

  def login = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  /**
   * This function takes file name and return file content
   */
  def sendVideoFile: Action[AnyContent] = Action {
    val file = new java.io.File("/tmp/fileToServe.pdf")
    val fileContent: Enumerator[Array[Byte]] = Enumerator.fromFile(file)

    Result(
      header = ResponseHeader(200),
      body = fileContent)
  }

  def listOfVideos: Action[AnyContent] = Action {
    val file = new java.io.File("/tmp/fileToServe.pdf")
    val fileContent: Enumerator[Array[Byte]] = Enumerator.fromFile(file)

    Result(
      header = ResponseHeader(200),
      body = fileContent)
  }

  
  
}