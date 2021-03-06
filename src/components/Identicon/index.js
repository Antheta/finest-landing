import { useEffect, useRef } from "react"
import { useEthers } from "@usedapp/core"
import styled from "@emotion/styled"
import Jazzicon from "@metamask/jazzicon"

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
`

const Identicon = (props) => {
  const ref = useRef()
  const { account } = useEthers()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ""
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  return <StyledIdenticon {...props} ref={ref} />
}

export default Identicon