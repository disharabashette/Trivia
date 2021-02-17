import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
} from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { fetchQuestion } from '../store/Action';
import { shuffle } from '../utils/utils';
import { ROUTES } from '../utils/Routes';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionsData: [],
            index: 0,
            selectedOptionText: null,
            selectedOptionIndex: null,
        }
    }

    // RELOAD THE DATA BY USING GETDATA FUNCTION
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getData()
        });
    }

    // CLEAR THE MEMORY SPACE
    componentWillUnmount() {
        this._unsubscribe();
    }

    //FETCH THE QUESTIONS
    getData = async () => {
        const response = await this.props.fetchQuestion()
        const que = this.props?.questions
        que?.forEach(element => {
            let option = element?.incorrect_answers
            option?.push(element.correct_answer)
            shuffle(option)  // SHUFFEL THE OPTIONS
        });
        this.setState({
            questionsData: que,
            index: 0,
            selectedOptionText: null,
            selectedOptionIndex: null,
        })
    }

    onNext = () => {
        // SAVE THE ANSWER AND NAVIGATE TO SCORE PAGE
        const {
            index,
            questionsData,
            selectedOptionText } = this.state;

        if (index === questionsData?.length - 1) {
            const userAnswer = selectedOptionText
            const arr = Object.assign(questionsData[index], { userAnswer })
            var correct_ans = 0;
            questionsData?.forEach(ele => {
                if (ele.correct_answer === ele.userAnswer) {
                    correct_ans += 1;
                }
            })
            this.props.navigation.navigate(ROUTES.SCORECARD, {
                correct_ans,
                totalQue: questionsData?.length,
            })
        }
        // SAVE THE ANSWER AND DISPLAY THE NEXT QUESTION
        else {
            const userAnswer = selectedOptionText
            const arr = Object.assign(questionsData[index], { userAnswer })
            this.setState({
                index: index + 1,
                selectedOptionText: null,
                selectedOptionIndex: null,
            })
        }
    }

    render() {
        const {
            index,
            questionsData,
            selectedOptionIndex } = this.state;
        if (this.props.loder) {
            return <View style={styles.container}>
                <ActivityIndicator size='large' color='#2996A2' />
            </View>;
        }
        return (
            <View style={{ flex: 1, margin: 20 }}>

                {questionsData?.map((item, i) => (
                    <>
                        {i === index &&
                            <>
                                <View style={styles.questionView}>
                                    <Text style={styles.questionText}>
                                        {i + 1}. {item?.question}
                                    </Text>
                                    <View style={item?.difficulty === "easy" ? styles.easyLevelView : item?.difficulty === "medium" ? styles.mediumLevelView : styles.hardLevelView}>
                                        <Text style={item?.difficulty === "easy" ? styles.easyLevelText : item?.difficulty === "medium" ? styles.mediumLevelText : styles.hardLevelText}>
                                            {item?.difficulty?.toUpperCase()}
                                        </Text>
                                    </View>

                                </View>
                                <View style={styles.optionView}>
                                    <RadioForm animation={true} >
                                        {item?.incorrect_answers.map((obj, i) => {
                                            var onPress = (value, index) => {
                                                this.setState({
                                                    selectedOptionText: value,
                                                    selectedOptionIndex: index
                                                })
                                            }
                                            return (
                                                <RadioButton key={i} >
                                                    <RadioButtonInput
                                                        obj={obj}
                                                        index={i}
                                                        isSelected={selectedOptionIndex === i}
                                                        onPress={() => onPress(obj, i)}
                                                        buttonInnerColor={'#2996A1'}
                                                        buttonOuterColor={selectedOptionIndex === i ? '#b5dbe3' : '#000'}
                                                        buttonSize={30}
                                                        buttonStyle={{}}
                                                        buttonWrapStyle={{ marginLeft: 10 }}
                                                    />
                                                    <Text style={styles.optionText}>
                                                        {obj}
                                                    </Text>
                                                </RadioButton>
                                            )
                                        })}
                                    </RadioForm>
                                </View>

                            </>
                        }
                    </>

                ))}
                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={() => this.onNext()}
                        style={index === questionsData?.length - 1 ? styles.submitButton : styles.nextButton}>
                        <Text style={index === questionsData?.length - 1 ? styles.submitText : styles.nextText}>
                            {index === questionsData?.length - 1 ? 'Submit' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    questionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: "wrap",
        flexShrink: 1
    },
    questionText: {
        alignSelf: 'center',
        width: "90%"
    },
    optionView: {
        marginTop: 20
    },
    optionText: {
        alignSelf: 'center',
        marginLeft: 20
    },
    hardLevelView: {
        padding: 10,
        backgroundColor: '#f9ecec',
        borderRadius: 10,
    },
    hardLevelText: {
        color: '#990000',
        textAlign: 'center',
    },
    mediumLevelView: {
        padding: 10,
        backgroundColor: '#fff9e6',
        borderRadius: 10
    },
    mediumLevelText: {
        color: '#cc9900',
        textAlign: 'center',
    },
    easyLevelView: {
        padding: 10,
        backgroundColor: '#ecf9ec',
        borderRadius: 10
    },
    easyLevelText: {
        color: '#006600',
        textAlign: 'center',
    },

    bottomView: {
        width: '100%',
        alignItems: 'center'
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: '#daedf1',
        borderRadius: 10
    },
    nextText: {
        color: '#2996A1',
        textAlign: 'center',
        margin: 10
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#2996A1',
        borderRadius: 10
    },
    submitText: {
        color: '#daedf1',
        textAlign: 'center',
        margin: 10
    }
})

function mapStateToProps(state) {
    return {
        loder: state.loder,
        questions: state.questions.questions
    };
}

export default connect(
    mapStateToProps,
    {
        fetchQuestion
    },
)(Quiz);