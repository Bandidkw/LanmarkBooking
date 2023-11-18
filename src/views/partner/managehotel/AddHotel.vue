<template>
    <div class="grid px-10 mt-3">
      <div class="col-12 lg:col-12 ">
        <center class="text-xl">เพิ่มข้อมูล hotel</center>
        <form class="w-full ">
          <div class="flex flex-wrap -mx-3 mb-6 w-full">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                ชื่อโรงแรม :
              </label>
              <input
                class="appearance-none block w-full  text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="000-000-0000">
            </div>
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                เบอร์โทรศัพท์ :
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password" type="text" placeholder="000-000-0000" >
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                ที่อยู่ :
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane" >
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                ตำบล :
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane" >
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                อำเภอ :
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane" >
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                จังหวัด :
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane" >
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                ประเภท :
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="Jane" >
            </div>
            <div class="w-1/3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    สิ่งอำนวยความสะดวก :
                </label>
            </div>
            <div class="w-1/3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    สิ่งที่น่าสนใจใกล้สถานที่ :
                </label>
            </div>
            <div class="w-1/3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    การรับรอง :
                </label>
            </div>
          </div>
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-1/3">
              <button @click="addadmin" class="w-full px-4 py-2 bg-blue-500 text-white text-center hover:bg-purple-400 rounded" type="button">เพิ่มข้อมูล</button>
            </div>
            <div class="md:w-1/3"></div>
          </div>
  
        </form>
      </div>
    </div>
  </template>
  
  <script>  
  export default {
    name: 'AddAdmin',
    data(){
      return {
      
      }
    },
    methods: {
      
    },
  };
  </script>
  
  