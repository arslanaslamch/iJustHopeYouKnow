import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AboutScreen } from './AboutScreen';
import { ContactScreen } from './ContactScreen';
import { HomeScreen } from './HomeScreen';

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
	return(
		<Drawer.Navigator>
			<Drawer.Screen name="HomeScreen" component="{HomeScreen}" />
			<Drawer.Screen name="AboutScreen" component="{AboutScreen}" />
			<Drawer.Screen name="ContactScreen" component="{ContactScreen}" />
		</Drawer.Navigator>
	);
}