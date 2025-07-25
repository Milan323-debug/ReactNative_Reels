import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeScreen = ({children}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: 'black',}}>
      {children}
    </View>
  )
}

export default SafeScreen