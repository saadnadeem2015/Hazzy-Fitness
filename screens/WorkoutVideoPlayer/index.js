import React, { useCallback, useRef, useState } from "react";
import { Alert, Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Video from "react-native-video";
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native'
import { BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR } from "../../assets/colors";
import { Icon } from "react-native-elements";
import { globalStyles } from "../../assets/fonts";
import FillButton from "../../components/FillButton";
import { GOOD1, MODERATE2, POOR2, SUBSTITUTE } from "../../assets/images";
const { width, height } = Dimensions.get('screen');

const WorkoutVideoPlayer = ({ route }) => {
    const { workouts } = route.params;
    //const Video
    const [state, setState] = useState({
        isVisible: false,
    })
    const workoutListRef = useRef(null);


    const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
        /* if(viewableItems[0]){
            if(viewableItems[0].isViewable){
                setState({...state, isVisible: true})
            }
        } */

    }, []);

    const VideoPlayer = ({ url, poster, style }) => {
        console.log(url, poster);
        const [paused, setpaused] = useState(true);
        const [isMute, setIsMute] = useState(true);
        return (
            <VisibilitySensor onChange={(isVisible) => {
                /* return (
                    console.log(isVisible),
                    isVisible ? setpaused(false) : setpaused(true)
                ) */
            }
            }
            >
                <Pressable onPress={() => { setpaused(!paused) }}>
                    <Video
                        source={{ uri: url }}
                        style={style}
                        onError={(e) => console.log(e)}
                        resizeMode={'contain'}
                        repeat={true}
                        paused={paused}
                        poster={poster}
                        muted={isMute}
                    />
                    {
                        paused ? (
                            <View style={{ width: width,height:height, position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name="play" type="ionicon" color="white" size={68} />
                            </View>
                        ) : null
                    }

                    <Pressable onPress={()=>{setIsMute(!isMute)}} style={{ width: 20, height: 20, position: 'absolute', bottom: 10,right:10, justifyContent: 'center', alignItems: 'center',elevation:100 }}>
                        <Icon name={isMute?"volume-high-sharp":"volume-mute-sharp"} type="ionicon" color="white" size={20} />
                    </Pressable>
                    
                </Pressable>
            </VisibilitySensor>
        )
    }

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 55
    }

    const RenderExerciseItem = ({ index,item,onSubstitute }) => {
        const [activeIndexNumber, setActiveIndexNumber] = useState(0);
        const excerciseScrollRef = useRef(null);
        const [heights,setHeights] = useState(height);
        console.log("item==>", item)
        console.log(item?.exercise_media ? "true" : "false")
        return (
            <View style={{height:height,width: width,}}>
                <ScrollView style={{flex:4}} ref={excerciseScrollRef} horizontal decelerationRate={'fast'}
                onLayout={e=>{let {x, y, width, height} = e.nativeEvent.layout;setHeights(height);}}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width}
                    snapToAlignment={"start"}
                    viewabilityConfig={0}
                    onScroll={e => {
                        let slide = Math.round(e.nativeEvent.contentOffset.x/e.nativeEvent.layoutMeasurement.width );
                        setActiveIndexNumber(slide);
                        }}>
                    {
                        item?.exercise_media && item?.exercise_media?.map(media => <VideoPlayer poster={item?.poster} style={{ width: width, height: heights }} url={media?.media_file} />)
                    }
                    {
                        item?.exercise && item?.exercise?.exercise_media?.map(media => <VideoPlayer poster={item?.poster} style={{ width: width, height: heights }} url={media?.media_file} />)
                    }
                </ScrollView>
                <View style={{ width: width,padding:15,justifyContent:'center',backgroundColor:'rgba(0,0,0,0.7)' }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        {item?.exercise_media && item?.exercise_media?.map((media,index) => <View style={{ width: 10, height: 10, borderRadius: 5, marginHorizontal: 2, backgroundColor: index==activeIndexNumber ? PRIMARY_COLOR :PRIMARY_COLOR+"AA"  }} />)}
                        {item?.exercise && item?.exercise?.exercise_media?.map((media,index) => <View style={{ width: 10, height: 10, borderRadius: 5, marginHorizontal: 2, backgroundColor: index==activeIndexNumber ? PRIMARY_COLOR :PRIMARY_COLOR+"AA" }} />)}
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                            <Text style={[{ color: PRIMARY_COLOR, fontSize: 16 }, globalStyles.semiBold]}>
                                {item?.exercise_media ? item?.title : item?.exercise?.title}
                            </Text>
                            <Text style={[{ color: WHITE_COLOR, fontSize: 16 }, globalStyles.semiBold]}>
                                {item?.sets} Set/{item?.reps} Reps
                            </Text>
                        </View>
                        <Pressable onPress={()=>{onSubstitute(item?.exercise?.substitute)}} style={{flexDirection:'row',alignItems:'center',borderRadius:5,borderWidth:1,borderColor:PRIMARY_COLOR,padding:5}}>
                            <Text style={[{ color: PRIMARY_COLOR, fontSize: 13 }, globalStyles.regular]}>Substitute</Text>
                            <Image source={SUBSTITUTE} style={{width:15,height:15}}/>
                        </Pressable>
                    </View>
                    <View style={{width:'100%',height:2,backgroundColor:'#333333',marginVertical:15}}/>
                    {index==workouts.length-1 && <>
                    <Text style={[{ color: PRIMARY_COLOR, fontSize: 16,alignSelf:'center' }, globalStyles.semiBold]}>You reach end of the all exercises</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                        <Text style={[{ color: WHITE_COLOR, fontSize: 16 }, globalStyles.semiBold]}>Rate workout</Text>
                        <View style={{flexDirection:'row'}}>
                            <Image resizeMode="contain" source={GOOD1} style={{width:25,height:25,marginHorizontal:5}}/>
                            <Image resizeMode="contain" source={MODERATE2} style={{width:25,height:25,marginHorizontal:5}}/>
                            <Image resizeMode="contain" source={POOR2} style={{width:25,height:25,marginHorizontal:5}}/>
                        </View>
                    </View>
                    <FillButton onPress={()=>{Alert.alert("Success!!","Your rating is saved")}} title={"Submit"} style={{backgroundColor:PRIMARY_COLOR,marginTop:20,width:'80%',height:45}}/>
                    </>}
                </View>
            </View>

        )
    }

    const onSubstitute = (substitute) =>{
        console.log(substitute);
        if(!substitute){
            Alert.alert("Alert!!","There is no substitute for this workout.")
        } else {
            let data = workouts.filter((item,index)=>{
                if(item?.id == substitute){
                    workoutListRef?.current.scrollToIndex({animated:true,index:index})
                   return {index:index,item:item}
                }
            })
            if(data.length==0){
                Alert.alert("Alert!!","There is no substitute for this workout.")
            }
            console.log(data);
            //workoutListRef?.current.scrollToIndex({animated:true,index:data?.index})
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: BLACK_COLOR }}>
            <FlatList
                ref={workoutListRef}
                decelerationRate={'fast'}
                showsVerticalScrollIndicator={false}
                snapToInterval={height}
                snapToAlignment={"start"}
                initialScrollIndex={0}
                disableIntervalMomentum
                viewabilityConfig={_viewabilityConfig}
                style={{ flex: 1 }}
                data={workouts}
                renderItem={({ item,index }) => <RenderExerciseItem item={item} index={index} onSubstitute={(substitute)=>{onSubstitute(substitute)}}/>}
            />
        </View>
    )
}

export default WorkoutVideoPlayer;