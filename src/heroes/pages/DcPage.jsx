import { useState } from "react"
import { HeroList } from "../components/HeroList"

export const DcPage = () => {

  const [bolean, setBolean] = useState(false);

  return (
    <>
      <h1>DC Comics</h1>
      <hr />
      <button onClick={() => setBolean(!bolean)}>{ JSON.stringify(bolean) }</button>
      <HeroList publisher={'DC Comics'} />
    </>
  )
}
