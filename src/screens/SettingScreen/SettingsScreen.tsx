import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from '@reduxjs/toolkit/query';

//Контекст
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useAuth } from '../../contexts/auth/AuthContext';
//Reduce
import { useSelector, useDispatch } from 'react-redux';
import { onLightTheme, onDarkTheme } from '../../redux/slices/themeSlice';

import Button from '../../components/commonComponents/buttons/Button';

/** Настройки */
function SettingScreen() {
  const { backgroundColor, colorText, changeTheme } = useTheme();

  return (
    <View style={[styles.container, backgroundColor]}>
      <View
        style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
        <Button
          text={'Светлая'}
          onClick={() => {
            //dispatch(onLightTheme());
            changeTheme('light');
          }}
        />
        <Text style={[styles.textNameButtonContainer, colorText]}>
          {'тема'}
        </Text>
        <Button
          text={'Темная'}
          onClick={() => {
            //dispatch(onDarkTheme());
            changeTheme('dark');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  containerButtons: {
    marginTop: 20,
    alignItems: 'center',
    width: '90%',
    padding: 20,
    borderRadius: 20,
  },
  textNameButtonContainer: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(0,0,0,1)',
    paddingVertical: 17,
  },
  containerClientInfo: {
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
    padding: 20,
    borderRadius: 20,
  },
  containerTextClientInfo: {
    color: 'rgba(0,0,0,1)',
    paddingBottom: 20,
    width: '100%',
  },
  text: {
    paddingVertical: 17,
    color: 'rgba(0,0,0,1)',
    fontSize: 17,
  },
  containerAuthBitton: {
    //flexDirection: 'row',
  },
  buttonAuth: {
    marginVertical: 15,
  },
});

export default SettingScreen;
