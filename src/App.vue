<script setup>

import { ref ,onMounted,computed,watch} from 'vue';

// 1n2Av32NlnSO38yvWK-kQxkL0A9o4kQiSbB8RPCcywwyfycffvieHAUq7  A FAT ID


const rev = ref("收入")
const outc = ref("支出")
//組合式寫法要包ref，趕羚羊終於能用V-model了
const Price = ref('')
// 輸入金額↑
const typeofmoney =ref('')
// 支出或收入類型
const title = ref('')
// 自訂輸入標題


//放入記帳資訊函式
function sendMSG(){
  
  if(typeofmoney.value=="收入"&&title.value!==""&&Price.value<0==false){
    localStorage.setItem(title.value+'收入',Price.value)
  }else if(typeofmoney.value=="支出"&&title.value!==""&&Price.value<0==false){
    localStorage.setItem(title.value+'支出',Price.value)
  }else{
    alert('輸入不完整請重新嘗試，項目、類型不可為空，金額不可小於等於0')
  }
}
//放入記帳資訊函式
  var RevKeys=[]//收入的名稱+金額

  var OutKeys=[]//支出的名稱+金額

// https://www.cnblogs.com/li-sir/p/11049907.html localtorage操作參考來源
function revArray(){
  //陣列宣告在for迴圈外才能刷新
    RevKeys.length = 0
    OutKeys.length = 0
    //清空陣列再讓下面的for去刷新
  for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i); //获取本地存储的Key
      if(key.substring(key.length-2)=='收入'){
        // console.log(key.substring(key.length-2)+'放到收入') 確認過可以分類支出跟收入
        //陣列放這裡面=每次重新宣告空陣列再把資料裝進去(刷新)
        RevKeys.push(key.substring(0,key.length-2)) //項目名稱 從0到倒數第二字
        RevKeys.push(localStorage.getItem(key)) //該項目的價格 陣列內穿插[項目,價格,項目,價格....]
        
      }else if(key.substring(key.length-2)=='支出'){
        OutKeys.push(key.substring(0,key.length-2)) //項目名稱 從0到倒數第二字
        OutKeys.push(localStorage.getItem(key)) //該項目的價格
        
      }
      // localKeys.push(key)//localkey陣列內放key
      // localKeysValue.push(localStorage.getItem(key)) //localkeyvalue陣列存value
      // console.log(localKeys[i]);
      // console.log(localKeysValue[i]);
      // console.log(localStorage.getItem(key));//所有value
    }
    console.log(RevKeys,OutKeys)
    console.log('--------------------------')
}
watch([title,Price,typeofmoney],revArray)//監聽多個響應數據的變化，有變化就渲染localStorage(收入、支出)到頁面上
function sumTotal(){
  let sumRev = 0,sumOut = 0, sumTotal = 0

  for(j=1;i<RevKeys.length;j+=2){
    sumRev+= parseFloat(RevKeys[j])
  }
  for(i=1;i<RevKeys.length;i+=2){
    sumOut+= parseFloat(OutKeys[i])
  }
  sumTotal = sumRev-sumOut
  console.log(sumTotal)
}


</script>

<template>
  <main class="app">
  <section class="greeting"> 
    <h2 class="title">
      請輸入收入或支出 </h2>
      <form action="">
      <input type="text" placeholder="項目名稱" v-model="title">
        <select v-model="typeofmoney">
        <option selected>{{ rev}}</option>
        <option >{{ outc}}</option>
        </select>
      <input type="number" v-model="Price" placeholder="金額" oninput="if(value<0)value=0">
      元
      <input type="button" value="記帳" @click="sendMSG">
      <p >{{title}} {{typeofmoney}} 總共 {{ Price}}元</p>
      <input type="button" value="測試local" @click="sumTotal">
    </form>
    <div class="account">
      <h1>收入</h1>
    <table>
        <tr v-for="item in RevKeys" >
          <td>
            {{ item }}
          </td>
        </tr>
    </table>
    <table>
      <tr v-for="price in RevPrice">
          <td>
            {{ price }}
          </td>
        </tr>
    </table>
    <h1>支出</h1>
    <table>
        <tr v-for="item in OutKeys " >
          <td>
            {{ item }}
          </td>
        </tr>
        <tr v-for="price in OutPrice">
          <td>
            {{ price }}
          </td>
        </tr>
    </table>
    </div>
    
  </section>
</main>
</template>

<style>
*{
  .greeting{
    width: 50vw;
    margin: 0 auto;
    background-color: blueviolet;
  }
}
p{
      font-size: 24pt;
      font-family: '標楷體';
    }
input{
  width: 100px;
}
h1{
  width: 100%;
}
table{
  background-color: aqua;
  display: grid;
  grid-template-columns:1fr 1fr;
}

</style>