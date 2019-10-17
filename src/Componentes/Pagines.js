import React, {useState, useEffect} from 'react';
import { Card, Popup, Image, Rating, Pagination } from 'semantic-ui-react';


const numCards = 18;
const cantAnimes = 10000;

export default function ListAnime (props){

    const {history} = props;

    const [pagAct, setPagAct] = useState(0)
    const [anime, setAnime] = useState([]);

    useEffect( () => {
        fetchAnimes(pagAct);
    }, []);

    const fetchAnimes = async(pagina) => {
        const fetchAnime = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=${numCards}&page[offset]=${pagina*numCards}`);
        const arrays = await fetchAnime.json();

        setAnime(arrays.data);
    }

    console.log(pagAct);

    return (

        <React.Fragment>
            <Card.Group itemsPerRow = {6}>
            {anime.map( obj => (
                <Popup
                    inverted
                    key = {obj.id}
                    trigger={
                        <Card onClick = { () => history.push(`/animes/${obj.id}`) }>
                            <Image src= {obj.attributes.posterImage.medium} />
                            <Card.Content>
                                <Card.Header>{obj.attributes.slug}</Card.Header>
                            </Card.Content>
                        </Card>
                    }
                >
                    <Popup.Header>{obj.attributes.slug}</Popup.Header>
                    <Popup.Content >
                    <Rating icon='star' defaultRating={5} maxRating={7} />
                    </Popup.Content>
                </Popup>))}
        </Card.Group>
        <Pagination
         defaultActivePage={pagAct+1}
         activePage = {pagAct}
         totalPages={ Math.ceil(cantAnimes / numCards) }
         firstItem = {null}
         lastItem = {null}
         onPageChange = {(e, pageInfo) => { setPagAct(pageInfo.activePage, fetchAnimes(pagAct)) }}
         boundaryRange = {8}
        />    
        </React.Fragment>
    );


}