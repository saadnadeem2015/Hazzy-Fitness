import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { LIGHT_TEXT_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { globalStyles } from "../../assets/fonts";

const Donut = ({height=150,width=150,targetAmount=0,leftToSpendAmount=0}) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

/*   const leftToSpendAmount = 200;
  const targetAmount = 1000; */

  const spentAmount = targetAmount - leftToSpendAmount;
  const percentage = (spentAmount / targetAmount) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;
  

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height={height} width={width} viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={WHITE_COLOR}
              fill="transparent"
              strokeWidth="15"
              strokeLinecap="round"
            />
            {leftToSpendAmount<0 && <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={"#EA4335"}
              fill="transparent"
              strokeWidth="15"
              strokeLinecap="round"
            />}
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={PRIMARY_COLOR}
              fill="transparent"
              strokeWidth="15"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={styles.text}>
            <Text style={[{color:LIGHT_TEXT_COLOR,fontSize:12},globalStyles.regular]}>Goal</Text>
            <Text style={[{color:PRIMARY_COLOR,fontSize:22},globalStyles.semiBold]}>{targetAmount}</Text>
            <Text style={[{color:LIGHT_TEXT_COLOR,fontSize:12},globalStyles.regular]}>Kcal</Text>
        </View>
       
      </View>
    </View>
  );
};

export default Donut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    fontWeight: "600",
    fontSize: 18,
    color: "#394867",
    alignItems:'center'
  },
});