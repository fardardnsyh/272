import { EditSquareIcon } from '@/components/SVG/24x24';
import {
    LinearGradient,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from '@/components/Shared/styled';
import { GLOBAL_STYLESHEET } from '@/constants/Stylesheet';
import { router } from 'expo-router';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { useState } from 'react';
import { StatusBar as RNStatusBar, StyleSheet } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import ExpensesScreen from './ExpensesScreen';
import SavingsScreen from './SavingsScreen';

export default function PlansScreen() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'expenses', title: 'Expenses' },
        { key: 'savings', title: 'Savings' },
    ]);
    const handleNavigation = () => {
        router.push('/plans/new-plan');
    };

    function renderTabBar() {
        return (
            <View className='px-5'>
                <View className='w-full bg-purple-100 rounded-full p-1.5 flex flex-row space-x-1.5 mb-5'>
                    {routes.map((route, i) => {
                        return (
                            <View
                                className='flex-grow flex items-center justify-center rounded-full'
                                style={{
                                    backgroundColor: index === i ? '#fff' : 'rgb(243 232 255)',
                                }}
                                key={route.title}
                            >
                                <TouchableOpacity
                                    onPress={() => setIndex(i)}
                                    className='w-full flex items-center justify-center px-5 py-2.5 rounded-full'
                                >
                                    <Text
                                        style={GLOBAL_STYLESHEET.suprapower}
                                        className='text-base'
                                    >
                                        {route.title}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }

    const renderScene = SceneMap({
        expenses: ExpensesScreen,
        savings: SavingsScreen,
    });

    return (
        <SafeAreaView className='bg-white relative h-full'>
            <ExpoStatusBar style='dark' />
            <View style={styles.parentView} className='bg-white space-y-5 flex-1 flex flex-col'>
                <View className='flex px-5 flex-row justify-between items-center pt-2.5'>
                    <View className='flex flex-col'>
                        <Text style={GLOBAL_STYLESHEET.suprapower} className='text-lg'>
                            My Plans
                        </Text>
                    </View>
                </View>

                <TabView
                    navigationState={{
                        index,
                        routes,
                    }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                />
            </View>
            <LinearGradient
                className='rounded-full justify-center items-center space-y-4 absolute right-5 bottom-5'
                colors={['#c084fc', '#9333ea']}
            >
                <TouchableOpacity
                    className='items-center w-[55px] h-[55px] justify-center rounded-full p-3 '
                    onPress={handleNavigation}
                >
                    <EditSquareIcon stroke={'#fff'} />
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    parentView: {
        paddingTop: RNStatusBar.currentHeight,
    },
});
