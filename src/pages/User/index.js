import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Autor,
} from './style';
import api from '../../services/api';

class User extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('user').name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func,
        }).isRequired,
    };

    state = {
        stars: [],
    };
    async componentDidMount() {
        const {navigation} = this.props;
        const user = navigation.getParam('user');
        
        const response = await api.get(`/users/${user.login}/starred`);
        this.setState({stars: response.data});        
    }
    render() {
        const {navigation} = this.props;
        const user = navigation.getParam('user');
        const {stars} = this.state;

        return (
            <Container>
                <Header>
                    <Avatar source={{uri: user.avatar}} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>
                <Stars
                    data={stars}
                    keyExtractor={(star) => String(star.id)}
                    renderItem={({item}) => (
                        <Starred>
                            <OwnerAvatar
                                source={{uri: item.owner.avatar_url}}
                            />
                            <Info>
                                <Title>{item.name}</Title>
                                <Autor>{item.owner.login}</Autor>
                            </Info>
                        </Starred>
                    )}
                />
            </Container>
        );
    }
}

export default User;
