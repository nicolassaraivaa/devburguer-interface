import {ContainerButton} from './styles'
import PropTypes from 'prop-types'
 
export function Button({children}){
    return(
        <ContainerButton>{children}</ContainerButton>
    )
}

Button.propTypes = {
    children: PropTypes.string
}