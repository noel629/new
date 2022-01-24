import Navbar from "../components/Navbar"

function Index() {
  return(
    <div>
        <Navbar />
        <h1 className="d-flex justify-content-center">ProAPP</h1>
        <p className="d-flex justify-content-center">We are a productivity app used to that have been used since <h3>1995</h3>, trusted brand!</p>
        <h1 className="d-flex justify-content-center">What do we offer to you?</h1>
        <p className="d-flex justify-content-center">We offer you the best service, no matter where you are from.<br/> We got a calendar to
        list down your upcoming events,<br/> a diary to write down memories and a todo list to be better as a person.<br/> <h3>NO KIAP</h3></p>

      </div>
  )
}

export default Index;