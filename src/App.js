import logo from './logo.svg';
import './App.css';
import { createClient } from "urql"
import { useEffect, useState } from 'react'

const APIURL = "https://api.thegraph.com/subgraphs/name/kitfud/foundationappsubgraph"

const query = `
{
  tokens(first: 5) {
    id
    tokenID
    contentURI
    tokenIPFSPath
  }
  users(first: 5) {
    id
    tokens {
      id
    }
    created {
      id
    }
  }
}

`

const client = createClient({
  url: APIURL
})

function App() {
  const [tokens, setTokens] = useState(null)

  async function fetchData() {
    const response = await client.query(query).toPromise()
    console.log('response', response)
    setTokens(response.data.tokens)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      {tokens?.map((token, _index) => (
        <div key={_index}>
          <a href={token.contentURI}>CONTENT_URI</a>
          <p>{token.tokenID}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
