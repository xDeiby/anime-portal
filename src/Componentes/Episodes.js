import React,{ useState, useEffect } from "react";
import {List, Segment, Icon, Button, Popup, Image} from 'semantic-ui-react'


export default function Episodes ( {anime} ){

    const [episodes, setEpisodes] = useState([]);

    useEffect( () => {
        fetchEpisodes();
    },[]);

    const fetchEpisodes = async () => {
        const fetchAnim = await fetch(anime);
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
                            <Button circular color="violet">
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
                        <Image src = {ep.attributes.thumbnail.original}/>
                        {ep.attributes.synopsis}
                    </Popup.Content>
                </Popup>))}
        </List>
      </Segment>
    );
}

