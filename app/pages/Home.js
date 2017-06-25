import React from 'react'
import Page from '../pages/Page'

class Home extends React.Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink(),
    }
  }

  pageTitle = () => {
    return 'Home | reactGo'
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
        <div>Home</div>
      </Page>
    )
  }
}

export default Home
