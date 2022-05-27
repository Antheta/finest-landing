// ** Core JWT Import
import useJwt from '../../@core/auth/jwt/useJwt'

function Jwt() {
    const jwt = useJwt({})

    return jwt
}

export default Jwt