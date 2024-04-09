import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//Контекст
import { useTheme } from '../contexts/theme/ThemeContext';
// Изображения
import imgHome from '../assets/images/home-1-svgrepo-com.png';
import imgSettings from '../assets/images/setting-svgrepo-com.png';
// Screens
import TaskListScreen from '../screens/TaskListScreen/TaskListScreen';
import SettingScreen from '../screens/SettingScreen/SettingsScreen';
// Компоненты
import TabBarIcon from './components/TabBarIcon';
// Хуки
import { useKeyboardListeners } from '../hooks/keyboardHooks';

/**
 * Главный компонент - точка входа приложения, управляющий навигацией и скринами.
 *
 * @component
 * @returns {React.Component} Главный компонент приложения.
 */
function MainNavigator() {
  const Tab = createBottomTabNavigator();

  const { backgroundColor, theme } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

  useKeyboardListeners((state: boolean) => setKeyboardOpen(state));

  return (
    <View style={[styles.container, backgroundColor]}>
      <Tab.Navigator
        initialRouteName="TaskListScreen"
        screenOptions={{
          tabBarLabel: () => null,
          tabBarStyle: {
            backgroundColor: theme === 'light' ? '#d7d7d9' : '#262729',
            opacity: keyboardOpen && Platform.OS === 'android' ? 0 : 1,
            width: screenWidth,
            position: 'absolute',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderWidth: 0,
            paddingTop: 10,
            paddingBottom: insets.bottom,
            overflow: 'hidden',
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: theme === 'light' ? '#000000' : '#ffffff',
          tabBarInactiveTintColor: theme === 'light' ? '#000000' : 'rgba(255, 255, 255,0.5)',
        }}>
        <Tab.Screen
          name="TaskListScreen"
          component={TaskListScreen}
          options={{
            tabBarLabel: 'Главная',
            tabBarIcon: ({ color }) => <TabBarIcon imgSource={imgHome} color={color} />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarLabel: 'Настройки',
            tabBarIcon: ({ color }) => <TabBarIcon imgSource={imgSettings} color={color}/>,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default MainNavigator;
