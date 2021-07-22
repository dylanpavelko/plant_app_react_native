import React, {useState} from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { AppRegistry, StyleSheet, View, Text } from "react-native";

function GrowthStage(props) {
  var stage = props.value;
  var plant_stages = props.plant_stages;
  if(stage < 10)
    return ('Germination')
  else if(stage < 20)
    return ('Leaf Development')
  else
    return ('Growing')
}

function StageDescription(props) {
  var stage = props.value;
  var stages = props.stages;
  var bbch = getLastStage(stage, stages);
  if(bbch != null){
    return bbch[1];
  }
  
}

function getLastStage(c, plant_stages){
  if(plant_stages.length > 0){
    var bbch_code = 0;
    var bbch_desc = "";
    for(let stage in plant_stages){
      if(c[0] >= plant_stages[stage].code){
        bbch_code = plant_stages[stage].code;
        bbch_desc = plant_stages[stage].description;
      }else{
        console.log(c[0]);
        console.log("vs");
        console.log(parseInt(plant_stages[stage].code));
      }
    }
    console.log(c[0]);
    console.log("bbch code");
    console.log(bbch_code);
    console.log(bbch_desc);
    return [bbch_code, bbch_desc]
  }
  else{
    return null;
  }
}

export default function BBCHSlider(props) {
  const [value, setValue] = useState(props.value)
  const [plantStages, setStages] = useState(props.plant_stages)

    return (
      <View style={styles.container}>
        <Text><GrowthStage value={value} stages={plantStages} /> -  <StageDescription value={value} stages={plantStages} /></Text>
        <Text>
          BBCH Code: {value} 
        </Text>
        <Slider
          caption="Growth Stage"
          value={value}
          maximumTrackTintColor="#d3d3d3"
          minimumTrackTintColor="#18cd58"
          thumbTintColor="#129840"
          step={1}
          minimumValue={0}
          maximumValue={100}
          onValueChange={value => setValue(value)}
        />

      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    width: 300,
    alignItems: "stretch",
    justifyContent: "center"
  }
});


