import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Movie from './components/Movie'
// import {Form} from 'react-bootstrap'

// functional components don't have a state object
// for having a state object we need a class component

class App extends Component {
  state = {
    movieTitle: 'The Flash',
    showMovieSection: true,
  }

  render() {
    // the render() method fires again every time there's a change in the STATE!
    return (
      <div className="App pt-3">
        <Container>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Choose your movie!</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    this.setState({
                      movieTitle: e.target.value,
                    })
                  }
                  value={this.state.movieTitle}
                >
                  <option>Batman Begins</option>
                  <option>Wonder Woman</option>
                  <option>Man of Steel</option>
                  <option>The Flash</option>
                </Form.Control>
              </Form.Group>
              <Button
                variant="danger"
                onClick={() =>
                  this.setState({
                    showMovieSection: false,
                  })
                }
              >
                Remove movie
              </Button>
            </Col>
          </Row>
          {this.state.showMovieSection && (
            <Row className="justify-content-center text-dark">
              <Col xs={12} md={6}>
                <Movie movie={this.state.movieTitle} />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    )
  }
}

export default App
