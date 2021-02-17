import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { ROUTES } from '../utils/Routes';

class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correct_ans: props?.route?.params?.correct_ans,
            totalQue: props?.route?.params?.totalQue
        }
    }

    render() {
        const { correct_ans, totalQue } = this.state
        return (
            <View style={styles.container}>
                <Text style={{ color: correct_ans <= 3 ? '#cc0000' : '#006600' }}>
                    {correct_ans <= 3 ? 'Better Luck Next Time !!!' : 'Congrulation !!!'}
                </Text>
                <View style={[styles.scoreView, { backgroundColor: correct_ans <= 3 ? '#f2d9d9' : '#c2f0c2' }]}>
                    <Text style={styles.scoreText}>
                        You Score
                    </Text>
                    <Text style={styles.scoreText}>
                        {correct_ans + ' / ' + totalQue}
                    </Text>
                </View>
                <TouchableOpacity style={styles.restartButton}
                    onPress={() =>
                        this.props.navigation.navigate(ROUTES.QUIZPAGE)
                    }>
                    <Text style={styles.restartText}>
                        Restart Test
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Score;

const styles = StyleSheet.create({
    container: {
        marginTop: 'auto',
        marginBottom: 'auto',
        alignItems: 'center'
    },
    scoreText: {
        marginBottom: 5,
        color: '#248f8f',
        textAlign: 'center'
    },
    scoreView: {
        padding: 20,
        borderRadius: 10,
        marginTop: 20
    },
    restartButton: {
        marginTop: 20,
        backgroundColor: '#2996A2',
        borderRadius: 10
    },
    restartText: {
        color: '#FFFFFF',
        textAlign: 'center',
        margin: 10
    },
})