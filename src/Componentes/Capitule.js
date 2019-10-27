import React, {useState, useEffect} from 'react';
import { Grid, Embed, Image, Button, Icon, Menu, Divider, Header } from 'semantic-ui-react';
import Comments from './Comments'

export default function Capitule( {match} ){

    const [imagen, setImagen] = useState([]);
    const [datos, setDatos] = useState([]);
    const [activeItem, setActiveItem] = useState("1");
    const [title, setTitle] = useState("");
    const [nextPag, setNextPag] = useState([]);
    const [prevPag, setPrevPag] = useState([]);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    useEffect( () => {
        fetchEpisode(`https://kitsu.io/api/edge/anime/${match.params.id}/episodes?page[limit]=1&page[offset]=${match.params.id2}`);
    },[]);

    const fetchEpisode = async (episode) => {
        const fetchAnim = await fetch(episode);
        const datos = await fetchAnim.json();

        setDatos(datos.data[0].attributes);
        setImagen(datos.data[0].attributes.thumbnail);
        setTitle(datos.data[0].attributes.titles.en_us);

        setNextPag(datos.links.next);
        setPrevPag(datos.links.prev);
    }



    return (
        <React.Fragment>

        <Divider horizontal>
            <Header color="violet" as='h4'>
                <Icon name='bar chart' />
                {`Capitulo ${match.params.id2}`}
            </Header>
        </Divider>        
        <Embed
            id='O6Xo21L0ybE'
            placeholder= {imagen.original}
            source='youtube'
        />

        <Divider hidden/>

        <Grid className = "Cap">
            <Grid.Row>
                <Menu attached='bottom' tabular>
                    <Menu.Item
                        color = {activeItem == "1" ? "violet" : "black"}
                        name='1'
                        active={activeItem === '1'}
                        onClick={handleItemClick}
                    >
                        <Icon name = "play circle"/>
                        Opcion 1
                    </Menu.Item>

                    <Menu.Item
                        name='2'
                        color = {activeItem == "2" ? "violet" : "black"}
                        active={activeItem === '2'}
                        onClick={handleItemClick}
                    >
                        <Icon name = "play circle"/>
                        Opcion 2
                    </Menu.Item>

                    <Menu.Item
                        color = {activeItem == "3" ? "violet" : "black"}
                        name='3'
                        active={activeItem === '3'}
                        onClick={handleItemClick}
                    >
                        <Icon name = "play circle"/>
                        Opcion 3
                    </Menu.Item>

                    <Menu.Item
                        color = {activeItem == "4" ? "violet" : "black"}
                        name='4'
                        active={activeItem === '4'}
                        onClick={handleItemClick}
                    >
                        <Icon name = "play circle"/>
                        Opcion 4
                    </Menu.Item>


                    <Menu.Item
                        name='5'
                        color = {activeItem == "5" ? "violet" : "black"}
                        active={activeItem === '5'}
                        onClick={handleItemClick}
                    >
                        <Icon name = "play circle"/>
                        Opcion 5
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item
                        name='reportar'
                        active={activeItem === 'report'}
                        onClick={handleItemClick}
                        >
                        <Icon name="info circle" />
                        Reportar
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Grid.Row>
            <Grid.Row color = "black">
                <Grid.Column width ={3}>
                 <Image src = {imagen.original} />
                </Grid.Column>
                <Grid.Column width = {13}>
                    <Header color="violet">{title}</Header>
                    {datos.synopsis}
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="six" centered color= "black">
                <Grid.Column >
                        <Button 
                        onClick = {() => fetchEpisode(prevPag)}
                        icon labelPosition='left' color="violet">
                            Capitulo Anterior
                            <Icon name='left arrow' />
                        </Button>
                    </Grid.Column>

                    <Grid.Column >
                        <Button icon labelPosition='left' color="violet">
                            Lista de Capitulos
                            <Icon name='list' />
                        </Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Button 
                        onClick = {() => fetchEpisode(nextPag)}
                        icon labelPosition='right' color="violet">
                            Siguiente Capitulo
                            <Icon name='right arrow' />
                        </Button>
                    </Grid.Column>            
            </Grid.Row>



            <Grid.Row>
                <Grid.Column width={16}>
                     <Comments />
                </Grid.Column>

                <Grid.Column>

                </Grid.Column>
            </Grid.Row>
        </Grid>
        </React.Fragment>
    );
}