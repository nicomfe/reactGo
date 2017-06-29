import React, { Component } from 'react'
import Page from '../pages/Page'

class About extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink(),
    }
  }

  pageTitle = () => {
    return 'About | reactGo'
  }

  pageMeta = () => {
    return [
      { name: 'description', content: 'A reactGo example of life' },
    ]
  }

  pageLink = () => {
    return []
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        About page
      </Page>
    )
  }
}

export default About
