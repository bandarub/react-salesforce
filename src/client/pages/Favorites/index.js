import React,{Component} from 'react'


class Favorites extends Component{
    constructor(props) {
        super(props);
        this.state = {
          favorites: null,
          searchInput:"",
          filteredProperties:[]
        };
      }
    
     componentDidMount() {
        fetch('http://localhost:8080/favorites')
          .then(response => response.json())
          .then(data => this.setState({ favorites: data,filteredProperties:data }));
      }
    render(){
        return <div>
            Favorites
        </div>
    }
}

export default Favorites