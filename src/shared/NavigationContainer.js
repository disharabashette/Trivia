import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Quiz from '../View/Quiz';
import Score from '../View/Score';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Quiz" component={Quiz}
                options={{
                    headerLeft: null,
                    headerTitleAlign: 'center',
                    headerTintColor: '#2996A2',
                }} />
            <Stack.Screen name="Score" component={Score}
                options={{
                    headerLeft: null,
                    headerTitleAlign: 'center',
                    headerTintColor: '#2996A2',
                }} />
        </Stack.Navigator>
    );
}

export default function AppNavigationContainer() {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    );
}