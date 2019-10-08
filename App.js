import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,AsyncStorage} from 'react-native';

export default class App extends React.Component{
  constructor(props){
    super(props);
  }
  
  state = {
    count : 0,
    isloaded:false
  }
  componentWillMount= async ()=>{
    await this.getAsyncStroge()
    this.setState({isloaded:true})
  }

  coffePlusCount = ()=>{
    this.setState({count : this.state.count+1 },()=>{
      this.setAsyncStroge()
    })
  }

  coffeMinusCount=()=>{
    if(this.state.count>0){
      this.setState({count:this.state.count-1},()=>{
        this.setAsyncStroge()
      })
    }
  }

  setAsyncStroge = async () =>{
      try{
        await AsyncStorage.setItem('coffeCount',this.state.count+"")
      }catch(err){
        console.log(err)
      }
  }

  getAsyncStroge = async() =>{
      try{
        const value= await AsyncStorage.getItem('coffeCount')
        if(value == null){
              console.log('boş geldi')
        }else{
          this.setState({count:parseInt(value,10)})
        }
      }catch(err){
          console.log(err)
        }
  }


  render(){
    if(this.state.isloaded){
      return (
        <View style={styles.container}>
          <View style={styles.plusminusStyle}>
            <TouchableOpacity
              onPress={this.coffePlusCount}
            >
            <Image 
                   style={styles.imgStyle}
                   source={require('./assets/plus.png')}
                      />
           </TouchableOpacity>
           </View>
           <View>
              <Image
                style={styles.coffeStyle}
                source={require('./assets/coffe.png')}
              />
              <Text style={styles.textStyle}>{this.state.count}</Text>
           </View>
           <View style={styles.plusminusStyle}>
             <TouchableOpacity
                onPress={this.coffeMinusCount}
              >
               <Image
                  style={styles.imgStyle}
                  source={require('./assets/minus.png')}
               />
             </TouchableOpacity>
           </View>
          
        </View>
      );
      }else{
        return(
          <Text>hata</Text>
        )
        
      }
    }

     
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
    
  },
  plusminusStyle:{
    padding:40

  },
  imgStyle:{
    width:50,
    height:50
  },
  coffeStyle:{
    width:100,
    height:100
  },
  textStyle:{
    fontSize:20,
    paddingLeft:40
    
    
  }
  
});
