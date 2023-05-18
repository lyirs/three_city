<!--
 * @Author: 
 * @Date: 2022-11-07 15:55:28
 * @LastEditTime: 2022-11-10 17:56:18
 * @Description: 
-->
<template>
  <div class="home">
    <Scene :eventList="eventList"></Scene>
    <BigScreen :dataInfo="dataInfo" :eventList="eventList"></BigScreen>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, onMounted, ref } from "vue";
// import testVertex from "@/shader/test/vertex.glsl";
import Scene from "@/components/Scene.vue";
import BigScreen from "@/components/BigScreen.vue";
import { getSmartCityInfo, getSmartCityList } from "@/api/api";
import gsap from "gsap";

const dataInfo: any = reactive({
  iot: { number: 100, name: "", unit: "" },
  event: { number: 100, name: "", unit: "" },
  test: { number: 100, name: "", unit: "" },
  power: { number: 100, name: "", unit: "" },
});

onMounted(async () => {
  changeInfo();
  getEventList();
  setInterval(() => {
    changeInfo();
    getEventList();
  }, 10000);
});

const changeInfo = async () => {
  let res = await getSmartCityInfo();

  for (let key in dataInfo) {
    dataInfo[key].name = res.data.data[key].name;
    dataInfo[key].unit = res.data.data[key].unit;
    gsap.to(dataInfo[key] as any, {
      number: res.data.data[key].number,
      duration: 1,
    });
  }
};

const eventList: any = ref([]);

const getEventList = async () => {
  let res = await getSmartCityList();
  eventList.value = res.data.list;
};
</script>
