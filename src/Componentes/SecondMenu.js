import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export default class MenuExampleVerticalSecondary extends Component {
  state = { activeItem: 'Trailer' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu  secondary vertical fluid inverted>
        <Menu.Item
          name='Trailer'
          active={activeItem === 'Trailer'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Episodes'
          active={activeItem === 'Episodes'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Relationships'
          active={activeItem === 'Relationships'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}
