import {useEffect} from 'react'
import {connect} from 'react-redux'

const Auth = (props) => {

    return <div>
        <p>Auth Component</p>
    </div>
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Auth)