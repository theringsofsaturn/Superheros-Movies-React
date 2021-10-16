import { Component } from 'react'
import Card from 'react-bootstrap/Card'

// this component will be about showing the details of the movie we pass to it as a prop

// in this component we're planning to do a FETCH with the movie prop
// every time you plan to fetch from a component, create a state object to hold the result

class Movie extends Component {

    timer = null

    // feel free to skip this!
    // constructor(props) {
    //     super(props)
    //     console.log("I'm the constructor!")
    //     // 1st use of the constructor: another way of declaring the initial state
    //     this.state = {
    //         movieDetails: null,
    //         test: false
    //     }
    //     // 2nd use of the constructor: bind 'this' to the event listeners
    //     this.toggleTest = this.toggleTest.bind(this)
    // }

    state = {
        // I want to store here all the movie details!
        movieDetails: null
    }

    fetchMovieDetails = async () => {
        try {
            let response = await fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movie)
            // initial fetch goes to --> http://www.omdbapi.com/?apikey=24ad60e9&s=Batman%20Begins
            let data = await response.json()
            console.log(data.Search[0])
            if (data.Search) {
                this.setState({
                    movieDetails: data.Search[0]
                })
            }
        } catch (error) {
            console.log(error)
            console.log(error)
        }
    }

    componentDidMount = () => {
        // we can initially fetch the movie details for the selected option in the dropdown!
        // this method just work in the MOUNTING phase!
        this.fetchMovieDetails()
        this.timer = setInterval(() => {
            console.log('another second passed away...')
        }, 1000)
    }

    componentDidUpdate = (prevProps, prevState) => {
        // componentDidUpdate gets automatically triggered EVERY TIME there's a change
        // in the PROPS or in the STATE of this component
        console.log('something changed!')

        // what is your goal?
        // the goal is to enter here when there's a PROP change 
        // NOT when there's a STATE change

        if (prevProps.movie !== this.props.movie) {
            this.fetchMovieDetails()
            // this is doing a setState
            // this is re-triggering componentDidUpdate
        }

        // GOLDEN RULE
        // in EVERY componentDidUpdate you're going to write in your life
        // IF you're setting the state into it
        // you ALWAYS want to have a condition (a HANDBRAKE)

        // this is for managing the life of a component ALREADY MOUNTED into the dom

        // componentDidUpdate is SUPER GENERIC! you need to narrow down the scenarios
        // in which you want to re-invokate your function, your fetch, everything
        // that can lead to a new setState()
    }

    toggleTest = () => {
        this.setState({
            test: true
        })
    }

    componentWillUnmount = () => {
        // performing some code a moment before the REMOVAL of this component from the DOM
        console.log('bye bye')
        // componentWillUnmount is mostly useful for closing pending connections or 
        // clearing intervals or timeouts
        clearInterval(this.timer)
        // it's like a WILL :) tells what to do before being removed
    }

    // render() fires again every time there's a change in the PROPS or in the STATE!
    render() {
        return (
            <div>
                {
                    this.state.movieDetails ? (
                        <Card onClick={this.toggleTest}>
                            <Card.Img variant="top" src={this.state.movieDetails.Poster} />
                            <Card.Body>
                                <Card.Title>{this.state.movieDetails.Title}</Card.Title>
                                <Card.Text>
                                    {this.state.movieDetails.Year} - {this.state.movieDetails.imdbID}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ) : (
                        <p className="text-light">LOADING...</p>
                    )
                }
            </div>
        )
    }
}

export default Movie