import React, { Component } from 'react';

import styled from 'styled-components';

import spinner from './LoadingSpinner.gif';

const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`;

const Card = styled.div`
    box-shadow: 0 1px 3px rgba(255, 0, 0, 0.5), 0 1px 2px rgba(255, 205, 0, 0.9);
    transition: all 0.3s cubic-bezier(0.26, 0.8, .25, 1);
    
    cursor: pointer;    

    &:hover {
        box-shadow: 0 14px 28px rgba(255, 0, 0, 0.5), 0 5px 10px rgba(255, 205, 0, 0.9);
    }

    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
`;

export default class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: ''
    };

    componentDidMount() {
        const {name, url} = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        this.setState({ 
            name,
            imageUrl,
            pokemonIndex,
            imageLoading: true,
            tooManyRequests: false,
         });
    }

    render() {                 

        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <Card className="card">                    
                    <h5 className="card-header">
                        {this.state.pokemonIndex}
                    </h5>
                    {this.state.imageLoading ? (
                        <img src={spinner} style={{width: '5em', height: '5em' }} className="card-img-top rounded mx-auto d-block mt-2" alt="loading-spinner"></img>
                    ) : null}
                    <Sprite className="card-img-top rounded mx-auto mt-2"
                    onLoad={() => this.setState({imageLoading: false})}
                    onError={() => this.setState({tooManyRequests: true})}
                    src={this.state.imageUrl} 
                    style={
                        this.state.tooManyRequests ? { display: "none" } : this.state.imageLoading ? null : { display: "block" }
                    }/>
                    {this.state.tooManyRequests ? (<h6 className="mx-auto"><span className="badge badge-danger mt-2">Too many requests</span></h6>) : null}                    
                    <div className="card-body mx-auto">
                        <h6 className="card-title">
                            {this.state.name.toLowerCase().split(' ').map(
                                letter => letter.charAt(0)
                                                .toUpperCase() 
                                        + letter.substring(1))
                                                .join(' ')}
                        </h6>
                    </div>                 
                </Card>
            </div>
        )
    }
}


