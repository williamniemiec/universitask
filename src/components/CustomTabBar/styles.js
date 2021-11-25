import { StyleSheet } from 'react-native';
import colors from '../../colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '15%'
  },
  middleTab: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: colors.secondary,
    width: 100,
    borderRadius: 50,
    bottom: 15,
    borderWidth: 10,
    borderColor: '#fff'
  },
  main: {
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    color: colors.lightText
  },
  focused: {
    color: colors.focused,
    fontWeight: 'bold'
  }
});
