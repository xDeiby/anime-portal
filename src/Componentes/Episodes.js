import React,{ useState, useEffect } from "react";
import {List, Segment, Icon, Button, Popup, Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom';


function Episodes (props){

    const {history} = props;

    const [episodes, setEpisodes] = useState([]);

    useEffect( () => {
        fetchEpisodes();
    },[]);

    const fetchEpisodes = async () => {
        const fetchAnim = await fetch(`https://kitsu.io/api/edge/anime/${props.id_anime}/episodes?page[limit]=20&page[offset]=0`);
        const datos = await fetchAnim.json();

        setEpisodes(datos.data);
    }


    return (
        <Segment inverted>
        <List divided inverted animated relaxed>
            {episodes.map( (ep) => (
                <Popup
                key = {ep.id}
                trigger={
                    <List.Item>
                        <List.Content floated="right">
                            <Button 
                            onClick = { () => history.push(`/animes/${props.id_anime}/episode/${ep.attributes.number}`)}
                            circular 
                            color="violet"
                            >
                                <Icon name = "play circle outline" />
                                Play
                            </Button>
                        </List.Content>
                        <List.Content floated="left">
                            <List.Header>
                                {`Episode ${ep.attributes.number}:  ${ep.attributes.titles.en_us}`}
                            </List.Header>
                        </List.Content>
                    </List.Item> 
                }
                >
                    <Popup.Header>Resume</Popup.Header>
                    <Popup.Content >
                        {ep.attributes.thumbnail ? 
                        <Image src = {ep.attributes.thumbnail.original}/>
                        :
                        <p>Imagen no disponible</p>
                        }
                        
                        {ep.attributes.synopsis ?
                        ep.attributes.synopsis
                        :
                        <p>Resumen no disponible</p>
                        }
                    </Popup.Content>
                </Popup>))}
        </List>
      </Segment>
    );
}

export default withRouter(Episodes);