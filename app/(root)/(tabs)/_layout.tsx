import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6B21A8", // purple,
        tabBarStyle: {
          height: 75,  
          paddingBottom: 10,
          paddingTop:5,    
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="myproducts"
        options={{
          title: "My-Products",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="seedling" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: "Sales",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="sellcast" color={color} size={size} />
          ),
        }}
      />
     
     
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cart-plus" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Order",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-basket" color={color} size={size} />
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
