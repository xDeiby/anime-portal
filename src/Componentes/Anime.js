import React,{ useState, useEffect } from "react";
import './App.css'
import { Grid, Image, Label, Table, Divider, Icon, Header, Embed, Button, Menu} from 'semantic-ui-react'
import Episodes from "./Episodes";
//import Comment from './Comments'

export default function Anime ( {match} ){

    const [datos, setDatos] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [imgs2, setImgs2] = useState([]);
    const [activeItem, setActiveItem] = useState("Trailer");

    const handleItemClick = (e, { name }) => setActiveItem(name);

    useEffect( () => {
        fetchAnime();
    },[]);

    const fetchAnime = async () => {
        const fetchAnim = await fetch(`https://kitsu.io/api/edge/anime/${match.params.id}`);
        const anime = await fetchAnim.json();

        setDatos(anime.data.attributes);
        setImgs(anime.data.attributes.posterImage);
        setImgs2(anime.data.attributes.coverImage);
    }


    return (

      <React.Fragment>
        <Grid className= "Grids">
          <Grid.Row>
              <Grid.Column width={4} textAlign="center">
                <Image  size="medium" src = {imgs.original} />
                <Button fluid color={datos.status === "finished"? "red" : "green"}>
                  <Icon name ="play"/>
                 {datos.status}
                </Button>
              </Grid.Column>
              <Grid.Column width={12}>
                  <Header color="violet" as="h1">{datos.slug}</Header >
                  <Label as='a' tag>
                    New
                  </Label>
                  <Label as='a' color='red' tag>
                    Upcoming
                  </Label>
                  <Label as='a' color='teal' tag>
                    Featured
                  </Label>            
                  <React.Fragment>
                    <Divider horizontal>
                      <Header color="violet" as='h4'>
                        <Icon name='info circle' />
                        Synopsis
                      </Header>
                    </Divider>

                    <p>
                      {datos.synopsis}
                    </p>
                    <Button circular color="purple" fluid> <Icon name="play circle"/>View Episodes</Button>
                  </React.Fragment>
              </Grid.Column>
        </Grid.Row> 
        <Grid.Row>
        <Divider horizontal>
                      <Header color="violet" as='h4'>
                        <Icon name='bar chart' />
                        Specifications
                      </Header>
                    </Divider>
                    <Table definition inverted>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell width={2}>Start Date</Table.Cell>
                          <Table.Cell>{datos.startDate}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>End Date</Table.Cell>
                          <Table.Cell>{datos.endDate ? datos.endDate : "-"}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Rating Rank</Table.Cell>
                          <Table.Cell>{datos.ratingRank}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Age Rating</Table.Cell>
                          <Table.Cell>{datos.ageRating}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Status</Table.Cell>
                          <Table.Cell>{datos.status}</Table.Cell>
                        </Table.Row>                         
                        <Table.Row>
                          <Table.Cell>Age Rating Guide</Table.Cell>
                          <Table.Cell>{datos.ageRatingGuide}</Table.Cell>
                        </Table.Row> 
                        <Table.Row>
                          <Table.Cell>Episodes</Table.Cell>
                          <Table.Cell>{datos.episodeCount}</Table.Cell>
                        </Table.Row>                      
                       </Table.Body>
                    </Table>        
                    
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={3}>
            <Menu  secondary vertical fluid inverted>
                    <Menu.Item
                      name='Trailer'
                      active={activeItem === 'Trailer'}
                      onClick={handleItemClick}
                    />
                    <Menu.Item
                      name='Episodes'
                      active={activeItem === 'Episodes'}
                      onClick={handleItemClick}
                    />
                    <Menu.Item
                      name='Relationships'
                      active={activeItem === 'Relationships'}
                      onClick={handleItemClick}
                    />
              </Menu>
        </Grid.Column>
        <Grid.Column width={13}>
          <Divider horizontal>
                      <Header color="violet" as='h4'>
                        <Icon name='bar chart' />
                        {`Trailer ${datos.slug}`}
                      </Header>
                    </Divider>
            { activeItem === "Trailer" ?
            <Embed
              id={datos.youtubeVideoId}
              placeholder= {imgs2 ? imgs2.original : imgs.original}
              source='youtube'
            /> 
            :
            <Episodes anime = {`https://kitsu.io/api/edge/anime/${match.params.id}/episodes?page[limit]=20&page[offset]=0`}/>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
    
    );
}

/*
  </Grid.Row>
          <Comment />
        <Grid.Row>
*/

